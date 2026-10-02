import { 
  Product, 
  ProductVariant, 
  Order, 
  OrderStatus, 
  CustomerProfile, 
  Coupon, 
  CartItem, 
  ShippingAddress,
  PaymentMethod,
  Review
} from '../types/commerce';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_CUSTOMERS, 
  INITIAL_COUPONS,
  INITIAL_REVIEWS 
} from '../data/seedData';

const KEYS = {
  PRODUCTS: 'trenxure_products_v1',
  ORDERS: 'trenxure_orders_v1',
  CUSTOMERS: 'trenxure_customers_v1',
  COUPONS: 'trenxure_coupons_v1',
  REVIEWS: 'trenxure_reviews_v1',
  CART: 'trenxure_cart_v1',
  WISHLIST: 'trenxure_wishlist_v1',
  CURRENT_USER: 'trenxure_current_user_v1'
};

function safeGet<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (err) {
    console.warn(`Error reading ${key} from storage:`, err);
    return fallback;
  }
}

function safeSet<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Error writing ${key} to storage:`, err);
  }
}

// ----------------- Product Service -----------------
export const ProductService = {
  getAll: (): Product[] => {
    return safeGet<Product[]>(KEYS.PRODUCTS, INITIAL_PRODUCTS);
  },

  getBySlug: (slug: string): Product | undefined => {
    const products = ProductService.getAll();
    return products.find(p => p.slug === slug);
  },

  getById: (id: string): Product | undefined => {
    const products = ProductService.getAll();
    return products.find(p => p.id === id);
  },

  getByCategory: (categoryId: string): Product[] => {
    const products = ProductService.getAll();
    return products.filter(p => p.categoryId === categoryId && p.status === 'active');
  },

  getByCollection: (collectionId: string): Product[] => {
    const products = ProductService.getAll();
    return products.filter(p => p.collectionIds.includes(collectionId as any) && p.status === 'active');
  },

  create: (productData: Omit<Product, 'id' | 'createdAt'>): Product => {
    const products = ProductService.getAll();
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    products.unshift(newProduct);
    safeSet(KEYS.PRODUCTS, products);
    return newProduct;
  },

  update: (id: string, updates: Partial<Product>): Product | null => {
    const products = ProductService.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updates };
    safeSet(KEYS.PRODUCTS, products);
    return products[index];
  },

  delete: (id: string): boolean => {
    const products = ProductService.getAll();
    const filtered = products.filter(p => p.id !== id);
    if (filtered.length === products.length) return false;
    safeSet(KEYS.PRODUCTS, filtered);
    return true;
  },

  adjustStock: (productId: string, variantId: string, quantityChange: number): boolean => {
    const products = ProductService.getAll();
    const product = products.find(p => p.id === productId);
    if (!product) return false;
    const variant = product.variants.find(v => v.id === variantId);
    if (!variant) return false;

    const newStock = variant.stockQuantity + quantityChange;
    if (newStock < 0) return false; // Prevent negative stock
    variant.stockQuantity = newStock;
    safeSet(KEYS.PRODUCTS, products);
    return true;
  }
};

// ----------------- Order Service -----------------
export const OrderService = {
  getAll: (): Order[] => {
    return safeGet<Order[]>(KEYS.ORDERS, INITIAL_ORDERS);
  },

  getById: (id: string): Order | undefined => {
    const orders = OrderService.getAll();
    return orders.find(o => o.id === id || o.orderNumber === id);
  },

  createOrder: (params: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: ShippingAddress;
    items: CartItem[];
    couponCode?: string;
    paymentMethod: PaymentMethod;
  }): { success: boolean; order?: Order; error?: string } => {
    if (!params.items || params.items.length === 0) {
      return { success: false, error: 'Cannot create order with an empty cart.' };
    }

    // 1. Authoritative price recalculation & Stock check
    const products = ProductService.getAll();
    let calculatedSubtotal = 0;
    const orderItems = [];

    for (const cartItem of params.items) {
      const liveProduct = products.find(p => p.id === cartItem.productId);
      if (!liveProduct) {
        return { success: false, error: `Product ${cartItem.productName} is no longer available.` };
      }
      const liveVariant = liveProduct.variants.find(v => v.id === cartItem.variantId);
      if (!liveVariant) {
        return { success: false, error: `Variant for ${cartItem.productName} is unavailable.` };
      }
      if (liveVariant.stockQuantity < cartItem.quantity) {
        return { 
          success: false, 
          error: `Insufficient stock for ${cartItem.productName} (${cartItem.size}). Only ${liveVariant.stockQuantity} available.` 
        };
      }

      const itemTotal = liveVariant.price * cartItem.quantity;
      calculatedSubtotal += itemTotal;

      orderItems.push({
        productId: liveProduct.id,
        variantId: liveVariant.id,
        name: liveProduct.name,
        sku: liveVariant.sku,
        color: liveVariant.color,
        size: liveVariant.size,
        price: liveVariant.price,
        quantity: cartItem.quantity,
        image: liveProduct.images[0] || cartItem.image
      });
    }

    // 2. Shipping calculation: Free over Rs. 10,000, otherwise Rs. 350
    const shippingFee = calculatedSubtotal >= 10000 ? 0 : 350;

    // 3. Discount calculation
    let discount = 0;
    if (params.couponCode) {
      const couponRes = CouponService.validate(params.couponCode, calculatedSubtotal);
      if (couponRes.valid) {
        discount = couponRes.discount;
      }
    }

    const total = Math.max(0, calculatedSubtotal + shippingFee - discount);

    // 4. Decrement inventory atomically
    for (const item of orderItems) {
      ProductService.adjustStock(item.productId, item.variantId, -item.quantity);
    }

    // 5. Generate Order
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `TRX-${randomSuffix}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: params.customerName,
      customerEmail: params.customerEmail,
      customerPhone: params.customerPhone,
      shippingAddress: params.shippingAddress,
      items: orderItems,
      subtotal: calculatedSubtotal,
      shippingFee,
      discount,
      couponCode: params.couponCode,
      total,
      paymentMethod: params.paymentMethod,
      paymentStatus: params.paymentMethod === 'cod' ? 'pending' : 'paid',
      status: 'confirmed',
      statusHistory: [
        {
          status: 'pending',
          timestamp: new Date().toISOString(),
          note: `Order placed via ${params.paymentMethod.toUpperCase()}`
        },
        {
          status: 'confirmed',
          timestamp: new Date().toISOString(),
          note: 'Inventory allocated and order confirmed.'
        }
      ],
      trackingNumber: `TCS-${Math.floor(100000000 + Math.random() * 900000000)}`,
      createdAt: new Date().toISOString()
    };

    const orders = OrderService.getAll();
    orders.unshift(newOrder);
    safeSet(KEYS.ORDERS, orders);

    return { success: true, order: newOrder };
  },

  updateStatus: (orderId: string, newStatus: OrderStatus, note?: string): Order | null => {
    const orders = OrderService.getAll();
    const order = orders.find(o => o.id === orderId || o.orderNumber === orderId);
    if (!order) return null;

    order.status = newStatus;
    if (newStatus === 'delivered' && order.paymentMethod === 'cod') {
      order.paymentStatus = 'paid';
    }
    order.statusHistory.push({
      status: newStatus,
      timestamp: new Date().toISOString(),
      note: note || `Order updated to ${newStatus}`
    });

    safeSet(KEYS.ORDERS, orders);
    return order;
  }
};

// ----------------- Coupon Service -----------------
export const CouponService = {
  getAll: (): Coupon[] => {
    return safeGet<Coupon[]>(KEYS.COUPONS, INITIAL_COUPONS);
  },

  validate: (code: string, subtotal: number): { valid: boolean; discount: number; message: string } => {
    const coupons = CouponService.getAll();
    const coupon = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive);

    if (!coupon) {
      return { valid: false, discount: 0, message: 'Invalid or expired promotional code.' };
    }

    if (subtotal < coupon.minOrderValue) {
      return { 
        valid: false, 
        discount: 0, 
        message: `Code requires a minimum cart value of Rs. ${coupon.minOrderValue.toLocaleString()}.` 
      };
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = Math.round((subtotal * coupon.discountValue) / 100);
    } else {
      discount = coupon.discountValue;
    }

    return { 
      valid: true, 
      discount, 
      message: `Coupon applied: Rs. ${discount.toLocaleString()} savings!` 
    };
  }
};

// ----------------- Reviews Service -----------------
export const ReviewService = {
  getByProduct: (productId: string): Review[] => {
    const reviews = safeGet<Review[]>(KEYS.REVIEWS, INITIAL_REVIEWS);
    return reviews.filter(r => r.productId === productId);
  },

  addReview: (reviewData: Omit<Review, 'id' | 'date'>): Review => {
    const reviews = safeGet<Review[]>(KEYS.REVIEWS, INITIAL_REVIEWS);
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    reviews.unshift(newReview);
    safeSet(KEYS.REVIEWS, reviews);
    return newReview;
  }
};
