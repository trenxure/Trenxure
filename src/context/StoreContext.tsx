import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem, Product } from '../types/commerce';
import { 
  ProductService, 
  CategoryService, 
  CollectionService, 
  HomepageService, 
  SettingsService 
} from '../services/commerceService';
import { 
  CategoryData, 
  CollectionData, 
  HomepageContentData, 
  StoreSettingsData,
  DEFAULT_HOMEPAGE,
  DEFAULT_SETTINGS
} from '../services/firestoreService';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface StoreContextType {
  // Reactive Commerce State
  categories: CategoryData[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryData[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  collections: CollectionData[];
  setCollections: React.Dispatch<React.SetStateAction<CollectionData[]>>;
  homepageContent: HomepageContentData;
  setHomepageContent: React.Dispatch<React.SetStateAction<HomepageContentData>>;
  storeSettings: StoreSettingsData;
  setStoreSettings: React.Dispatch<React.SetStateAction<StoreSettingsData>>;
  refreshCatalog: () => Promise<void>;

  cart: CartItem[];
  addToCart: (product: Product, variantId?: string, quantity?: number) => boolean;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  currentPath: string;
  navigate: (path: string) => void;

  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;

  // Currency helper
  formatMoney: (amount: number) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Reactive Commerce Catalog State
  const [categories, setCategories] = useState<CategoryData[]>(() => CategoryService.getAll());
  const [products, setProducts] = useState<Product[]>(() => ProductService.getAll());
  const [collections, setCollections] = useState<CollectionData[]>(() => CollectionService.getAll());
  const [homepageContent, setHomepageContent] = useState<HomepageContentData>(() => HomepageService.getContent());
  const [storeSettings, setStoreSettings] = useState<StoreSettingsData>(() => SettingsService.getSettings());

  const refreshCatalog = useCallback(async () => {
    try {
      const [cats, prods, cols, home, settings] = await Promise.all([
        CategoryService.syncWithFirestore(),
        ProductService.syncWithFirestore(),
        CollectionService.syncWithFirestore(),
        HomepageService.syncWithFirestore(),
        SettingsService.syncWithFirestore()
      ]);
      if (cats && cats.length > 0) setCategories(cats);
      if (prods && prods.length > 0) setProducts(prods);
      if (cols && cols.length > 0) setCollections(cols);
      if (home) setHomepageContent(home);
      if (settings) setStoreSettings(settings);
    } catch (err) {
      console.warn('Refresh catalog sync failed:', err);
    }
  }, []);

  // Initial Sync from Firestore on Mount
  useEffect(() => {
    refreshCatalog();
  }, [refreshCatalog]);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('trenxure_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('trenxure_wishlist_v1');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-3'];
    } catch {
      return ['prod-1', 'prod-3'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Routing state
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    try {
      localStorage.setItem('trenxure_cart_v1', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('trenxure_wishlist_v1', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (product: Product, variantId?: string, quantity: number = 1): boolean => {
    const targetVariant = variantId 
      ? product.variants.find(v => v.id === variantId)
      : product.variants.find(v => v.stockQuantity > 0) || product.variants[0];

    if (!targetVariant) {
      showToast('This item is currently out of stock.', 'error');
      return false;
    }

    if (targetVariant.stockQuantity < 1) {
      showToast(`Selected size (${targetVariant.size}) is sold out.`, 'error');
      return false;
    }

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.variantId === targetVariant.id);
      if (existingIndex > -1) {
        const item = prevCart[existingIndex];
        const newQty = item.quantity + quantity;
        if (newQty > targetVariant.stockQuantity) {
          showToast(`Only ${targetVariant.stockQuantity} items left in stock.`, 'info');
          const updated = [...prevCart];
          updated[existingIndex].quantity = targetVariant.stockQuantity;
          return updated;
        }
        const updated = [...prevCart];
        updated[existingIndex].quantity = newQty;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `cart-${targetVariant.id}-${Date.now()}`,
          productId: product.id,
          variantId: targetVariant.id,
          productName: product.name,
          productSlug: product.slug,
          color: targetVariant.color,
          size: targetVariant.size,
          price: targetVariant.price,
          quantity: Math.min(quantity, targetVariant.stockQuantity),
          image: product.images[0],
          maxStock: targetVariant.stockQuantity
        };
        return [...prevCart, newItem];
      }
    });

    setIsCartOpen(true);
    showToast(`Added ${product.name} (${targetVariant.size}) to your bag!`, 'success');
    return true;
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === itemId) {
          if (quantity > item.maxStock) {
            showToast(`Maximum available stock is ${item.maxStock}`, 'info');
            return { ...item, quantity: item.maxStock };
          }
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const product = products.find(p => p.id === productId) || ProductService.getById(productId);
      const name = product ? product.name : 'Item';
      if (exists) {
        showToast(`${name} removed from your wishlist`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast(`${name} added to your wishlist!`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const formatMoney = (amount: number) => {
    const curr = storeSettings.currency || 'PKR';
    const prefix = curr.includes('PKR') || curr.includes('Rs') ? 'Rs. ' : `${curr} `;
    return `${prefix}${amount.toLocaleString()}`;
  };

  return (
    <StoreContext.Provider
      value={{
        categories,
        setCategories,
        products,
        setProducts,
        collections,
        setCollections,
        homepageContent,
        setHomepageContent,
        storeSettings,
        setStoreSettings,
        refreshCatalog,

        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        currentPath,
        navigate,
        toasts,
        showToast,
        dismissToast,
        formatMoney
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
