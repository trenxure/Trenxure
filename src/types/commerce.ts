export type CategoryId = 'blazers' | 'hoodies' | 't-shirts' | 'coats' | 'pants' | 'shirts';

export type StyleTag = 'Abstract' | 'Floral' | 'Luxury' | 'Geometric' | 'Graffiti' | 'Marble' | 'Ethnic';

export type CollectionSlug = 'formal' | 'casual' | 'cargo' | 'sports' | 'new-arrivals' | 'best-sellers' | 'seasonal';

export type ProductStatus = 'active' | 'draft' | 'archived';

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  color: string;
  colorHex: string;
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  price: number; // in PKR
  stockQuantity: number;
  reservedQuantity: number;
  lowStockThreshold: number;
  active: boolean;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  customerCity?: string;
  rating: number; // 1-5
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  tagline: string;
  description: string;
  categoryId: CategoryId;
  categoryName: string;
  collectionIds: CollectionSlug[];
  style: StyleTag;
  gender: 'Men' | 'Women' | 'Unisex';
  basePrice: number; // in PKR
  compareAtPrice?: number;
  status: ProductStatus;
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  images: string[];
  variants: ProductVariant[];
  material: string;
  fit: string;
  careInstructions: string[];
  reviewsCount: number;
  averageRating: number;
  createdAt: string;
}

export interface CartItem {
  id: string; // unique item id
  productId: string;
  variantId: string;
  productName: string;
  productSlug: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  maxStock: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'packed' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export type PaymentMethod = 'cod' | 'card' | 'jazzcash';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  variantId: string;
  name: string;
  sku: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. TRX-89421
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  status: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
  trackingNumber?: string;
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  isActive: boolean;
  expiryDate?: string;
  description: string;
}

export interface LookbookHotspot {
  id: string;
  xPercent: number; // 0-100
  yPercent: number; // 0-100
  productId: string;
  label: string;
  price: number;
}

export interface LookbookItem {
  id: string;
  title: string;
  season: string;
  subtitle: string;
  image: string;
  photographer?: string;
  location?: string;
  hotspots: LookbookHotspot[];
  featuredGarments: string[];
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  ordersCount: number;
  totalSpent: number;
  savedAddresses: ShippingAddress[];
  wishlist: string[]; // product IDs
  joinedDate: string;
}
