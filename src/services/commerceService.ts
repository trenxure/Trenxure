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
  INITIAL_REVIEWS,
  CATEGORIES_DATA 
} from '../data/seedData';
import { 
  FirestoreCategoryService, 
  FirestoreProductService, 
  FirestoreOrderService, 
  FirestoreCouponService, 
  FirestoreCollectionService,
  FirestoreHomepageService,
  FirestoreSettingsService,
  CategoryData,
  CollectionData,
  HomepageContentData,
  StoreSettingsData,
  INITIAL_COLLECTIONS,
  DEFAULT_HOMEPAGE,
  DEFAULT_SETTINGS
} from './firestoreService';
import { auth, db, doc, runTransaction } from '../lib/firebase';

const KEYS = {
  PRODUCTS: 'trenxure_products_v1',
  CATEGORIES: 'trenxure_categories_v1',
  COLLECTIONS: 'trenxure_collections_v1',
  HOMEPAGE: 'trenxure_homepage_v1',
  SETTINGS: 'trenxure_settings_v1',
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

// ----------------- Category Service -----------------
const initialCategoriesList: CategoryData[] = CATEGORIES_DATA.map(c => ({
  id: c.id,
  name: c.name,
  subtitle: c.subtitle || 'Curated Category',
  description: c.description || 'Exclusive luxury garments.',
  itemCount: c.itemCount || 0,
  image: c.image,
  active: true
}));

export const CategoryService = {
  getAll: (): CategoryData[] => {
    return safeGet<CategoryData[]>(KEYS.CATEGORIES, initialCategoriesList);
  },

  getById: (id: string): CategoryData | undefined => {
    const categories = CategoryService.getAll();
    return categories.find(c => c.id === id);
  },

  create: async (categoryData: Omit<CategoryData, 'itemCount'> & { itemCount?: number }): Promise<CategoryData> => {
    if (!categoryData.id || !categoryData.name) {
      throw new Error('Category ID and name are required.');
    }

    const newCategory: CategoryData = {
      ...categoryData,
      itemCount: categoryData.itemCount || 0,
      active: categoryData.active !== undefined ? categoryData.active : true
    };

    // 1. Authoritative Firestore write FIRST
    await FirestoreCategoryService.save(newCategory);

    // 2. ONLY upon successful Firestore persistence, update local cache
    const categories = CategoryService.getAll();
    const existingIndex = categories.findIndex(c => c.id === newCategory.id);
    if (existingIndex > -1) {
      categories[existingIndex] = newCategory;
    } else {
      categories.unshift(newCategory);
    }
    safeSet(KEYS.CATEGORIES, categories);

    return newCategory;
  },

  update: async (id: string, updates: Partial<CategoryData>): Promise<CategoryData> => {
    const categories = CategoryService.getAll();
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error(`Category "${id}" not found.`);
    }

    const updatedCategory: CategoryData = { ...categories[index], ...updates };

    // 1. Authoritative Firestore write FIRST
    await FirestoreCategoryService.save(updatedCategory);

    // 2. ONLY upon successful Firestore persistence, update local cache
    categories[index] = updatedCategory;
    safeSet(KEYS.CATEGORIES, categories);

    return updatedCategory;
  },

  delete: async (id: string): Promise<boolean> => {
    // 1. Authoritative Firestore delete FIRST
    await FirestoreCategoryService.delete(id);

    // 2. ONLY upon successful Firestore deletion, update local cache
    const categories = CategoryService.getAll();
    const filtered = categories.filter(c => c.id !== id);
    safeSet(KEYS.CATEGORIES, filtered);

    return true;
  },

  syncWithFirestore: async (): Promise<CategoryData[]> => {
    try {
      const remoteCategories = await FirestoreCategoryService.getAll();
      if (remoteCategories && remoteCategories.length > 0) {
        safeSet(KEYS.CATEGORIES, remoteCategories);
        return remoteCategories;
      }
    } catch (e) {
      console.warn('Sync categories with Firestore failed:', e);
    }
    return CategoryService.getAll();
  }
};

CategoryService.syncWithFirestore().catch(() => {});

// ----------------- Collection Service -----------------
export const CollectionService = {
  getAll: (): CollectionData[] => {
    return safeGet<CollectionData[]>(KEYS.COLLECTIONS, INITIAL_COLLECTIONS);
  },

  getById: (id: string): CollectionData | undefined => {
    const cols = CollectionService.getAll();
    return cols.find(c => c.id === id || c.slug === id);
  },

  create: async (colData: Omit<CollectionData, 'productCount'> & { productCount?: number }): Promise<CollectionData> => {
    const newCol: CollectionData = {
      ...colData,
      productCount: colData.productCount || 0,
      active: colData.active !== undefined ? colData.active : true
    };

    // 1. Authoritative Firestore write FIRST
    await FirestoreCollectionService.save(newCol);

    // 2. ONLY upon successful Firestore persistence, update local cache
    const cols = CollectionService.getAll();
    const existingIndex = cols.findIndex(c => c.id === newCol.id);
    if (existingIndex > -1) {
      cols[existingIndex] = newCol;
    } else {
      cols.unshift(newCol);
    }
    safeSet(KEYS.COLLECTIONS, cols);

    return newCol;
  },

  update: async (id: string, updates: Partial<CollectionData>): Promise<CollectionData> => {
    const cols = CollectionService.getAll();
    const index = cols.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error(`Collection "${id}" not found.`);
    }

    const updatedCol = { ...cols[index], ...updates };

    // 1. Authoritative Firestore write FIRST
    await FirestoreCollectionService.save(updatedCol);

    // 2. ONLY upon successful Firestore persistence, update local cache
    cols[index] = updatedCol;
    safeSet(KEYS.COLLECTIONS, cols);

    return updatedCol;
  },

  delete: async (id: string): Promise<boolean> => {
    // 1. Authoritative Firestore delete FIRST
    await FirestoreCollectionService.delete(id);

    // 2. ONLY upon successful Firestore deletion, update local cache
    const cols = CollectionService.getAll();
    const filtered = cols.filter(c => c.id !== id);
    safeSet(KEYS.COLLECTIONS, filtered);

    return true;
  },

  syncWithFirestore: async (): Promise<CollectionData[]> => {
    try {
      const remote = await FirestoreCollectionService.getAll();
      if (remote && remote.length > 0) {
        safeSet(KEYS.COLLECTIONS, remote);
        return remote;
      }
    } catch (e) {
      console.warn('Sync collections failed:', e);
    }
    return CollectionService.getAll();
  }
};

CollectionService.syncWithFirestore().catch(() => {});

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

  create: async (productData: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    // 1. Authoritative Firestore write FIRST
    await FirestoreProductService.save(newProduct);

    // 2. ONLY upon successful Firestore persistence, update local cache
    const products = ProductService.getAll();
    products.unshift(newProduct);
    safeSet(KEYS.PRODUCTS, products);

    return newProduct;
  },

  update: async (id: string, updates: Partial<Product>): Promise<Product> => {
    const products = ProductService.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`Product "${id}" not found.`);
    }

    const updatedProduct = { ...products[index], ...updates };

    // 1. Authoritative Firestore write FIRST
    await FirestoreProductService.save(updatedProduct);

    // 2. ONLY upon successful Firestore persistence, update local cache
    products[index] = updatedProduct;
    safeSet(KEYS.PRODUCTS, products);

    return updatedProduct;
  },

  delete: async (id: string): Promise<boolean> => {
    // 1. Authoritative Firestore delete FIRST
    await FirestoreProductService.delete(id);

    // 2. ONLY upon successful Firestore deletion, update local cache
    const products = ProductService.getAll();
    const filtered = products.filter(p => p.id !== id);
    safeSet(KEYS.PRODUCTS, filtered);

    return true;
  },

  adjustStock: async (productId: string, variantId: string, quantityChange: number): Promise<boolean> => {
    const products = ProductService.getAll();
    const product = products.find(p => p.id === productId);
    if (!product) return false;
    const variant = product.variants.find(v => v.id === variantId);
    if (!variant) return false;

    const newStock = variant.stockQuantity + quantityChange;
    if (newStock < 0) return false;
    variant.stockQuantity = newStock;

    // 1. Authoritative Firestore update FIRST
    await FirestoreProductService.save(product);

    // 2. Update local cache
    safeSet(KEYS.PRODUCTS, products);

    return true;
  },

  syncWithFirestore: async (): Promise<Product[]> => {
    try {
      const remoteProducts = await FirestoreProductService.getAll();
      if (remoteProducts && remoteProducts.length > 0) {
        safeSet(KEYS.PRODUCTS, remoteProducts);
        return remoteProducts;
      }
    } catch (e) {
      console.warn('Sync products with Firestore failed:', e);
    }
    return ProductService.getAll();
  }
};

ProductService.syncWithFirestore().catch(() => {});

// ----------------- Order Service with Transactional Inventory -----------------
export const OrderService = {
  getAll: (): Order[] => {
    return safeGet<Order[]>(KEYS.ORDERS, INITIAL_ORDERS);
  },

  getById: (id: string): Order | undefined => {
    const orders = OrderService.getAll();
    return orders.find(o => o.id === id || o.orderNumber === id);
  },

  getUserOrders: async (userId: string): Promise<Order[]> => {
    if (!userId) return [];
    try {
      const remote = await FirestoreOrderService.getUserOrders(userId);
      if (remote && remote.length > 0) {
        return remote;
      }
    } catch (e) {
      console.warn('Error fetching user orders from Firestore:', e);
    }
    const all = OrderService.getAll();
    return all.filter(o => o.userId === userId);
  },

  createOrder: async (params: {
    userId?: string | null;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: ShippingAddress;
    items: CartItem[];
    couponCode?: string;
    paymentMethod: PaymentMethod;
  }): Promise<{ success: boolean; order?: Order; error?: string }> => {
    if (!params.items || params.items.length === 0) {
      return { success: false, error: 'Cannot create order with an empty cart.' };
    }

    const currentSettings = SettingsService.getSettings();
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

    const freeThreshold = currentSettings.freeShippingThreshold || 10000;
    const baseShipping = currentSettings.shippingFeeStandard || 500;
    const shippingFee = calculatedSubtotal >= freeThreshold ? 0 : baseShipping;

    let discount = 0;
    if (params.couponCode) {
      const couponRes = CouponService.validate(params.couponCode, calculatedSubtotal);
      if (couponRes.valid) {
        discount = couponRes.discount;
      }
    }

    const total = Math.max(0, calculatedSubtotal + shippingFee - discount);
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `TRX-${randomSuffix}`;
    const effectiveUserId = params.userId || auth.currentUser?.uid || undefined;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      userId: effectiveUserId,
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
          note: 'Inventory allocated and order confirmed atomically.'
        }
      ],
      trackingNumber: `TCS-${Math.floor(100000000 + Math.random() * 900000000)}`,
      createdAt: new Date().toISOString()
    };

    try {
      // ATOMIC TRANSACTION: Check stock, deduct inventory, and write order simultaneously
      await runTransaction(db, async (transaction) => {
        // Step 1: Read all product documents first
        const productSnapshots = await Promise.all(
          orderItems.map(item => transaction.get(doc(db, 'products', item.productId)))
        );

        // Step 2: Validate all variant stock levels
        const updatedProducts: Product[] = [];
        for (let i = 0; i < orderItems.length; i++) {
          const item = orderItems[i];
          const snap = productSnapshots[i];

          if (!snap.exists()) {
            throw new Error(`Product "${item.name}" is no longer available in catalog.`);
          }

          const productData = snap.data() as Product;
          const variant = productData.variants.find(v => v.id === item.variantId);
          if (!variant) {
            throw new Error(`Variant for "${item.name}" (${item.size}) is unavailable.`);
          }

          if (variant.stockQuantity < item.quantity) {
            throw new Error(`Insufficient stock for "${productData.name}" (${variant.size}). Only ${variant.stockQuantity} remaining.`);
          }

          // Decrement stock in transaction
          variant.stockQuantity -= item.quantity;
          updatedProducts.push(productData);
        }

        // Step 3: Write updated product stock inside transaction
        for (const prod of updatedProducts) {
          transaction.set(doc(db, 'products', prod.id), prod, { merge: true });
        }

        // Step 4: Write order document inside transaction
        transaction.set(doc(db, 'orders', newOrder.id), newOrder);
      });

      // Synchronize local cache only after atomic transaction commits
      const localProducts = ProductService.getAll();
      for (const item of orderItems) {
        const prod = localProducts.find(p => p.id === item.productId);
        if (prod) {
          const v = prod.variants.find(va => va.id === item.variantId);
          if (v) v.stockQuantity = Math.max(0, v.stockQuantity - item.quantity);
        }
      }
      safeSet(KEYS.PRODUCTS, localProducts);

      const orders = OrderService.getAll();
      orders.unshift(newOrder);
      safeSet(KEYS.ORDERS, orders);

      return { success: true, order: newOrder };
    } catch (err) {
      console.error('Atomic order creation failed:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Transaction failed due to inventory contention.' 
      };
    }
  },

  updateStatus: async (orderId: string, newStatus: OrderStatus, note?: string): Promise<Order | null> => {
    const orders = OrderService.getAll();
    const order = orders.find(o => o.id === orderId || o.orderNumber === orderId);
    if (!order) return null;

    const updatedOrder: Order = {
      ...order,
      status: newStatus,
      paymentStatus: (newStatus === 'delivered' && order.paymentMethod === 'cod') ? 'paid' : order.paymentStatus,
      statusHistory: [
        ...order.statusHistory,
        {
          status: newStatus,
          timestamp: new Date().toISOString(),
          note: note || `Order updated to ${newStatus}`
        }
      ]
    };

    // 1. Authoritative Firestore write FIRST
    await FirestoreOrderService.save(updatedOrder);

    // 2. ONLY upon successful Firestore persistence, update local cache
    const index = orders.findIndex(o => o.id === orderId || o.orderNumber === orderId);
    if (index > -1) {
      orders[index] = updatedOrder;
    }
    safeSet(KEYS.ORDERS, orders);

    return updatedOrder;
  },

  syncWithFirestore: async (): Promise<Order[]> => {
    try {
      const remoteOrders = await FirestoreOrderService.getAll();
      if (remoteOrders && remoteOrders.length > 0) {
        safeSet(KEYS.ORDERS, remoteOrders);
        return remoteOrders;
      }
    } catch (e) {
      console.warn('Sync orders with Firestore failed:', e);
    }
    return OrderService.getAll();
  }
};

OrderService.syncWithFirestore().catch(() => {});

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
  },

  create: async (coupon: Coupon): Promise<Coupon> => {
    // 1. Authoritative Firestore write FIRST
    await FirestoreCouponService.save(coupon);

    // 2. ONLY upon Firestore success, update local cache
    const coupons = CouponService.getAll();
    const existingIndex = coupons.findIndex(c => c.code.toUpperCase() === coupon.code.toUpperCase());
    if (existingIndex > -1) {
      coupons[existingIndex] = coupon;
    } else {
      coupons.unshift(coupon);
    }
    safeSet(KEYS.COUPONS, coupons);

    return coupon;
  },

  delete: async (code: string): Promise<boolean> => {
    // 1. Authoritative Firestore delete FIRST
    await FirestoreCouponService.delete(code);

    // 2. ONLY upon Firestore success, update local cache
    const coupons = CouponService.getAll();
    const filtered = coupons.filter(c => c.code.toUpperCase() !== code.toUpperCase());
    safeSet(KEYS.COUPONS, filtered);

    return true;
  },

  syncWithFirestore: async (): Promise<Coupon[]> => {
    try {
      const remoteCoupons = await FirestoreCouponService.getAll();
      if (remoteCoupons && remoteCoupons.length > 0) {
        safeSet(KEYS.COUPONS, remoteCoupons);
        return remoteCoupons;
      }
    } catch (e) {
      console.warn('Sync coupons with Firestore failed:', e);
    }
    return CouponService.getAll();
  }
};

CouponService.syncWithFirestore().catch(() => {});

// ----------------- Homepage Content Service -----------------
export const HomepageService = {
  getContent: (): HomepageContentData => {
    return safeGet<HomepageContentData>(KEYS.HOMEPAGE, DEFAULT_HOMEPAGE);
  },

  saveContent: async (content: HomepageContentData): Promise<HomepageContentData> => {
    await FirestoreHomepageService.saveContent(content);
    safeSet(KEYS.HOMEPAGE, content);
    return content;
  },

  syncWithFirestore: async (): Promise<HomepageContentData> => {
    try {
      const remote = await FirestoreHomepageService.getContent();
      if (remote) {
        safeSet(KEYS.HOMEPAGE, remote);
        return remote;
      }
    } catch (e) {
      console.warn('Sync homepage content failed:', e);
    }
    return HomepageService.getContent();
  }
};

HomepageService.syncWithFirestore().catch(() => {});

// ----------------- Store Settings Service -----------------
export const SettingsService = {
  getSettings: (): StoreSettingsData => {
    return safeGet<StoreSettingsData>(KEYS.SETTINGS, DEFAULT_SETTINGS);
  },

  saveSettings: async (settings: StoreSettingsData): Promise<StoreSettingsData> => {
    await FirestoreSettingsService.saveSettings(settings);
    safeSet(KEYS.SETTINGS, settings);
    return settings;
  },

  syncWithFirestore: async (): Promise<StoreSettingsData> => {
    try {
      const remote = await FirestoreSettingsService.getSettings();
      if (remote) {
        safeSet(KEYS.SETTINGS, remote);
        return remote;
      }
    } catch (e) {
      console.warn('Sync store settings failed:', e);
    }
    return SettingsService.getSettings();
  }
};

SettingsService.syncWithFirestore().catch(() => {});

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
