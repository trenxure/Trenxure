import { 
  db, 
  auth,
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  query,
  where,
  handleFirestoreError, 
  OperationType 
} from '../lib/firebase';
import { 
  INITIAL_PRODUCTS, 
  CATEGORIES_DATA, 
  INITIAL_ORDERS, 
  INITIAL_COUPONS 
} from '../data/seedData';
import { Product, Order, Coupon } from '../types/commerce';

export interface CategoryData {
  id: string;
  name: string;
  subtitle?: string;
  description?: string;
  itemCount: number;
  image: string;
  active: boolean;
}

export interface CollectionData {
  id: string;
  slug: string;
  title: string;
  season: string;
  description: string;
  tagline?: string;
  textiles?: string;
  heroImage?: string;
  productCount: number;
  active: boolean;
}

export interface HomepageContentData {
  announcementText: string;
  announcementActive: boolean;
  heroBadge: string;
  heroHeadline: string;
  heroSubtext: string;
  heroButtonText: string;
  statementCardText: string;
}

export interface StoreSettingsData {
  storeName: string;
  currency: string;
  supportEmail: string;
  supportPhone: string;
  shippingFeeStandard: number;
  freeShippingThreshold: number;
  enableCashOnDelivery: boolean;
  enableBankTransfer: boolean;
  atelierAddressKarachi: string;
  atelierAddressLahore: string;
  taxRatePercentage: number;
  announcementText?: string;
  announcementEnabled?: boolean;
}

export const INITIAL_COLLECTIONS: CollectionData[] = [
  { id: 'c-1', slug: 'imperial-silk', title: 'The Imperial Silk & Velvet Capsule', season: 'Autumn / Winter 2025', tagline: 'Regal botanical motifs with Italian velvet and pure viscose silk linings.', description: 'A study in evening elegance. Hand-rendered Mughal floristry and baroque scrolls meet razor-sharp shoulder construction and satin peak lapels.', textiles: '70% Combed Cotton, 30% Fine Viscose, Cotton-Silk Velvet with Pure Cupro Lining', heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80', productCount: 4, active: true },
  { id: 'c-2', slug: 'street-monolith', title: 'Street Monolith & Architectural Terry', season: 'Year-Round Capsule', tagline: 'Substantial 420 GSM French terry hoodies and double-pleated cargos.', description: 'Constructed for longevity and weight. Custom-milled looped cotton with metallic pigment stipple prints and drop-shoulder silhouettes.', textiles: '420 GSM Custom-Milled 100% French Terry & 320 GSM Twill Cotton', heroImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80', productCount: 3, active: true },
  { id: 'c-3', slug: 'graphic-monuments', title: 'Graphic Monuments & Heavyweight Tees', season: 'Limited Edition 2025', tagline: '280 GSM luxury combed jersey featuring museum-grade silkscreen art.', description: 'A celebration of modern printmaking. High-definition pigment prints that age gracefully with each wear.', textiles: '280 GSM 100% Combed Compact Cotton with Lycra-Reinforced Rib Collar', heroImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80', productCount: 2, active: true },
  { id: 'c-4', slug: 'formal', title: 'Formal & Gala Suiting', season: 'Signature Permanent', tagline: 'Bespoke evening tailored blazers crafted for public appearances.', description: 'Bespoke evening tailored blazers crafted for public appearances and creative gatherings.', textiles: 'Fine Italian Worsted Wool & Silk Brocade', heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80', productCount: 3, active: true },
];

export const DEFAULT_HOMEPAGE: HomepageContentData = {
  announcementText: 'Complimentary Bespoke Fitting in Karachi & Lahore · Worldwide Express Delivery',
  announcementActive: true,
  heroBadge: 'AUTUMN / WINTER 2025 EDITORIAL',
  heroHeadline: 'Art in Motion. Bespoke Printed Apparel.',
  heroSubtext: 'Bespoke tailoring, museum-grade art prints, and architectural outerwear constructed for modern royalty.',
  heroButtonText: 'Explore Collection',
  statementCardText: 'More Than Just Clothing — An Unapologetic Statement of Creative Identity.'
};

export const DEFAULT_SETTINGS: StoreSettingsData = {
  storeName: 'TRENXURE Luxury Apparel',
  currency: 'PKR (Rs.)',
  supportEmail: 'concierge@trenxure.com',
  supportPhone: '+92 300 1234567',
  shippingFeeStandard: 500,
  freeShippingThreshold: 10000,
  enableCashOnDelivery: true,
  enableBankTransfer: true,
  atelierAddressKarachi: 'Bespoke Studio 4B, Phase 6, DHA, Karachi, Pakistan',
  atelierAddressLahore: 'Atelier Suites, Block V, Gulberg III, Lahore, Pakistan',
  taxRatePercentage: 0,
  announcementText: 'Complimentary Express Insured Delivery Across Pakistan for Orders Above Rs. 10,000',
  announcementEnabled: true
};

// ---------------- CATEGORIES SERVICE ----------------
export const FirestoreCategoryService = {
  async getAll(): Promise<CategoryData[]> {
    const path = 'categories';
    try {
      const snap = await getDocs(collection(db, path));
      if (snap.empty) {
        const isCurrentAdmin = auth.currentUser?.email?.toLowerCase() === 'trenxure@gmail.com';
        if (isCurrentAdmin) {
          const initialList: CategoryData[] = CATEGORIES_DATA.map(c => ({
            id: c.id,
            name: c.name,
            subtitle: c.subtitle || 'Curated Category',
            description: c.description || 'Exclusive luxury garments.',
            itemCount: c.itemCount || 0,
            image: c.image,
            active: true
          }));
          for (const cat of initialList) {
            await setDoc(doc(db, path, cat.id), cat);
          }
          return initialList;
        }
        return CATEGORIES_DATA.map(c => ({
          id: c.id,
          name: c.name,
          subtitle: c.subtitle || 'Curated Category',
          description: c.description || 'Exclusive luxury garments.',
          itemCount: c.itemCount || 0,
          image: c.image,
          active: true
        }));
      }
      return snap.docs.map(d => d.data() as CategoryData);
    } catch (err) {
      console.warn('Falling back to local categories due to Firestore fetch error:', err);
      return CATEGORIES_DATA.map(c => ({
        id: c.id,
        name: c.name,
        subtitle: c.subtitle || 'Curated Category',
        description: c.description || 'Exclusive luxury garments.',
        itemCount: c.itemCount || 0,
        image: c.image,
        active: true
      }));
    }
  },

  async save(category: CategoryData): Promise<void> {
    const path = 'categories';
    try {
      await setDoc(doc(db, path, category.id), category, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `${path}/${category.id}`);
    }
  },

  async delete(categoryId: string): Promise<void> {
    const path = 'categories';
    try {
      await deleteDoc(doc(db, path, categoryId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `${path}/${categoryId}`);
    }
  }
};

// ---------------- COLLECTIONS SERVICE ----------------
export const FirestoreCollectionService = {
  async getAll(): Promise<CollectionData[]> {
    const path = 'collections';
    try {
      const snap = await getDocs(collection(db, path));
      if (snap.empty) {
        const isCurrentAdmin = auth.currentUser?.email?.toLowerCase() === 'trenxure@gmail.com';
        if (isCurrentAdmin) {
          for (const col of INITIAL_COLLECTIONS) {
            await setDoc(doc(db, path, col.id), col);
          }
        }
        return INITIAL_COLLECTIONS;
      }
      return snap.docs.map(d => d.data() as CollectionData);
    } catch (err) {
      console.warn('Falling back to seed collections:', err);
      return INITIAL_COLLECTIONS;
    }
  },

  async save(col: CollectionData): Promise<void> {
    const path = 'collections';
    try {
      await setDoc(doc(db, path, col.id), col, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `${path}/${col.id}`);
    }
  },

  async delete(colId: string): Promise<void> {
    const path = 'collections';
    try {
      await deleteDoc(doc(db, path, colId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `${path}/${colId}`);
    }
  }
};

// ---------------- PRODUCTS SERVICE ----------------
export const FirestoreProductService = {
  async getAll(): Promise<Product[]> {
    const path = 'products';
    try {
      const snap = await getDocs(collection(db, path));
      if (snap.empty) {
        const isCurrentAdmin = auth.currentUser?.email?.toLowerCase() === 'trenxure@gmail.com';
        if (isCurrentAdmin) {
          for (const prod of INITIAL_PRODUCTS) {
            await setDoc(doc(db, path, prod.id), prod);
          }
        }
        return INITIAL_PRODUCTS;
      }
      return snap.docs.map(d => d.data() as Product);
    } catch (err) {
      console.warn('Falling back to seed products:', err);
      return INITIAL_PRODUCTS;
    }
  },

  async save(product: Product): Promise<void> {
    const path = 'products';
    try {
      await setDoc(doc(db, path, product.id), product, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `${path}/${product.id}`);
    }
  },

  async delete(productId: string): Promise<void> {
    const path = 'products';
    try {
      await deleteDoc(doc(db, path, productId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `${path}/${productId}`);
    }
  }
};

// ---------------- ORDERS SERVICE ----------------
export const FirestoreOrderService = {
  async getAll(): Promise<Order[]> {
    const path = 'orders';
    try {
      const snap = await getDocs(collection(db, path));
      if (snap.empty) {
        return INITIAL_ORDERS;
      }
      return snap.docs.map(d => d.data() as Order);
    } catch (err) {
      console.warn('Falling back to seed orders:', err);
      return INITIAL_ORDERS;
    }
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    const path = 'orders';
    try {
      const q = query(collection(db, path), where('userId', '==', userId));
      const snap = await getDocs(q);
      return snap.docs.map(d => d.data() as Order);
    } catch (err) {
      console.warn('Could not fetch user orders from Firestore:', err);
      return [];
    }
  },

  async save(order: Order): Promise<void> {
    const path = 'orders';
    try {
      await setDoc(doc(db, path, order.id), order, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `${path}/${order.id}`);
    }
  },

  async delete(orderId: string): Promise<void> {
    const path = 'orders';
    try {
      await deleteDoc(doc(db, path, orderId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `${path}/${orderId}`);
    }
  }
};

// ---------------- COUPONS SERVICE ----------------
export const FirestoreCouponService = {
  async getAll(): Promise<Coupon[]> {
    const path = 'coupons';
    try {
      const snap = await getDocs(collection(db, path));
      if (snap.empty) {
        return INITIAL_COUPONS;
      }
      return snap.docs.map(d => d.data() as Coupon);
    } catch (err) {
      console.warn('Falling back to seed coupons:', err);
      return INITIAL_COUPONS;
    }
  },

  async save(coupon: Coupon): Promise<void> {
    const path = 'coupons';
    try {
      await setDoc(doc(db, path, coupon.code), coupon, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `${path}/${coupon.code}`);
    }
  },

  async delete(couponId: string): Promise<void> {
    const path = 'coupons';
    try {
      await deleteDoc(doc(db, path, couponId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `${path}/${couponId}`);
    }
  }
};

// ---------------- HOMEPAGE CONTENT SERVICE ----------------
export const FirestoreHomepageService = {
  async getContent(): Promise<HomepageContentData> {
    const path = 'settings';
    try {
      const snap = await getDoc(doc(db, path, 'homepage'));
      if (snap.exists()) {
        return snap.data() as HomepageContentData;
      }
      return DEFAULT_HOMEPAGE;
    } catch (err) {
      console.warn('Falling back to default homepage content:', err);
      return DEFAULT_HOMEPAGE;
    }
  },

  async saveContent(content: HomepageContentData): Promise<void> {
    const path = 'settings';
    try {
      await setDoc(doc(db, path, 'homepage'), content, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `${path}/homepage`);
    }
  }
};

// ---------------- STORE SETTINGS SERVICE ----------------
export const FirestoreSettingsService = {
  async getSettings(): Promise<StoreSettingsData> {
    const path = 'settings';
    try {
      const snap = await getDoc(doc(db, path, 'store_config'));
      if (snap.exists()) {
        return snap.data() as StoreSettingsData;
      }
      return DEFAULT_SETTINGS;
    } catch (err) {
      console.warn('Falling back to default settings:', err);
      return DEFAULT_SETTINGS;
    }
  },

  async saveSettings(settings: StoreSettingsData): Promise<void> {
    const path = 'settings';
    try {
      await setDoc(doc(db, path, 'store_config'), settings, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `${path}/store_config`);
    }
  }
};
