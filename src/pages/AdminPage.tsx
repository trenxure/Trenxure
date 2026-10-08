import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { ProductService, OrderService, CouponService, CategoryService } from '../services/commerceService';
import { CategoryData } from '../services/firestoreService';
import { Product, Order, OrderStatus, ProductVariant, Coupon } from '../types/commerce';
import { BrandLogo } from '../components/brand/BrandLogo';
import { 
  LayoutDashboard, 
  Package, 
  Boxes, 
  ShoppingBag, 
  Users, 
  Tag, 
  Settings, 
  ArrowLeft,
  Plus,
  Trash2,
  Edit,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Search,
  SlidersHorizontal,
  Save,
  RotateCcw,
  Layers,
  FolderTree,
  Sliders,
  Home,
  Copy,
  ExternalLink,
  Eye,
  X,
  Check,
  LogIn,
  LogOut,
  ShieldCheck,
  Lock
} from 'lucide-react';

type AdminTab = 
  | 'dashboard' 
  | 'products' 
  | 'categories' 
  | 'collections' 
  | 'inventory' 
  | 'variants' 
  | 'orders' 
  | 'customers' 
  | 'coupons' 
  | 'homepage' 
  | 'settings';

interface CategoryItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  itemCount: number;
  image: string;
  active: boolean;
}

interface CollectionItem {
  id: string;
  slug: string;
  title: string;
  season: string;
  description: string;
  productCount: number;
  active: boolean;
}

export const AdminPage: React.FC = () => {
  const { navigate, formatMoney, showToast } = useStore();
  const { user, isAdmin, signInWithGoogle, logout, loading } = useAuth();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Core Data State
  const [products, setProducts] = useState<Product[]>(() => ProductService.getAll());
  const [orders, setOrders] = useState<Order[]>(() => OrderService.getAll());
  const [coupons, setCoupons] = useState<Coupon[]>(() => CouponService.getAll());

  // Search & Filter State in Products tab
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');

  // Inventory adjustment modal
  const [adjustModalProduct, setAdjustModalProduct] = useState<{ product: Product; variant: ProductVariant } | null>(null);
  const [stockDelta, setStockDelta] = useState<number>(5);

  // Full Product Create / Edit Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Order Detail Drawer/Modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Categories State & Edit Modal
  const [categories, setCategories] = useState<CategoryData[]>(() => CategoryService.getAll());
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Initial Sync from Firestore for All Entities
  useEffect(() => {
    CategoryService.syncWithFirestore().then(res => {
      if (res && res.length > 0) setCategories(res);
    });
    ProductService.syncWithFirestore().then(res => {
      if (res && res.length > 0) setProducts(res);
    });
    OrderService.syncWithFirestore().then(res => {
      if (res && res.length > 0) setOrders(res);
    });
    CouponService.syncWithFirestore().then(res => {
      if (res && res.length > 0) setCoupons(res);
    });
  }, []);

  // Collections State
  const [collections, setCollections] = useState<CollectionItem[]>([
    { id: 'c-1', slug: 'imperial-silk', title: 'The Imperial Silk & Velvet Capsule', season: 'Autumn / Winter 2025', description: 'Regal botanical motifs with Italian velvet and pure viscose silk linings.', productCount: 4, active: true },
    { id: 'c-2', slug: 'street-monolith', title: 'Street Monolith & Architectural Terry', season: 'Year-Round Capsule', description: 'Substantial 420 GSM French terry hoodies and double-pleated cargos.', productCount: 3, active: true },
    { id: 'c-3', slug: 'graphic-monuments', title: 'Graphic Monuments & Heavyweight Tees', season: 'Limited Edition 2025', description: '280 GSM luxury combed jersey featuring museum-grade silkscreen art.', productCount: 2, active: true },
    { id: 'c-4', slug: 'formal', title: 'Formal & Gala Suiting', season: 'Signature Permanent', description: 'Bespoke evening tailored blazers crafted for public appearances.', productCount: 3, active: true },
  ]);

  // Homepage Content Settings
  const [homepageContent, setHomepageContent] = useState({
    announcementText: 'Complimentary Bespoke Fitting in Karachi & Lahore · Worldwide Express Delivery',
    announcementActive: true,
    heroBadge: 'AUTUMN / WINTER 2025 EDITORIAL',
    heroHeadline: 'Art in Motion. Bespoke Printed Apparel.',
    heroSubtext: 'Bespoke tailoring, museum-grade art prints, and architectural outerwear constructed for modern royalty.',
    heroButtonText: 'Explore Collection',
    statementCardText: 'More Than Just Clothing — An Unapologetic Statement of Creative Identity.'
  });

  // Store Settings
  const [storeSettings, setStoreSettings] = useState({
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
    taxRatePercentage: 0
  });

  // New Coupon Form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponVal, setNewCouponVal] = useState(15);
  const [newCouponMin, setNewCouponMin] = useState(8000);

  // New Category Form
  const [newCatName, setNewCatName] = useState('');
  const [newCatSubtitle, setNewCatSubtitle] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // New Collection Form
  const [newColTitle, setNewColTitle] = useState('');
  const [newColSeason, setNewColSeason] = useState('');
  const [newColDesc, setNewColDesc] = useState('');

  // Metrics
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  }, [orders]);

  const totalOrdersCount = orders.length;

  const lowStockVariants = useMemo(() => {
    return products.flatMap(p => 
      p.variants.filter(v => v.stockQuantity <= v.lowStockThreshold).map(v => ({ product: p, variant: v }))
    );
  }, [products]);

  const allVariantsMatrix = useMemo(() => {
    return products.flatMap(p => 
      p.variants.map(v => ({ product: p, variant: v }))
    );
  }, [products]);

  // Handlers
  const handleAdjustStock = async () => {
    if (!adjustModalProduct) return;
    try {
      const success = await ProductService.adjustStock(
        adjustModalProduct.product.id,
        adjustModalProduct.variant.id,
        stockDelta
      );
      if (success) {
        setProducts(ProductService.getAll());
        showToast(`Stock updated for ${adjustModalProduct.product.name} (${adjustModalProduct.variant.size}): ${stockDelta > 0 ? '+' : ''}${stockDelta}`, 'success');
        setAdjustModalProduct(null);
      } else {
        showToast('Cannot reduce stock below 0.', 'error');
      }
    } catch (err) {
      console.error('Adjust stock error:', err);
      showToast(`Failed to update stock in Firestore: ${err instanceof Error ? err.message : 'Database error'}`, 'error');
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const updated = await OrderService.updateStatus(orderId, newStatus);
      if (updated) {
        setOrders(OrderService.getAll());
        if (selectedOrder?.id === orderId) {
          setSelectedOrder({ ...updated });
        }
        showToast(`Order status updated to ${newStatus.toUpperCase()}`, 'success');
      }
    } catch (err) {
      console.error('Update order status error:', err);
      showToast(`Failed to update order status: ${err instanceof Error ? err.message : 'Database error'}`, 'error');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this creation from the catalog?')) {
      try {
        await ProductService.delete(id);
        setProducts(ProductService.getAll());
        showToast('Product removed from catalog and Firestore', 'info');
      } catch (err) {
        console.error('Delete product error:', err);
        showToast(`Failed to delete product: ${err instanceof Error ? err.message : 'Database error'}`, 'error');
      }
    }
  };

  const handleDuplicateProduct = async (p: Product) => {
    const dup: Product = {
      ...p,
      id: `prod-${Date.now()}`,
      name: `${p.name} (Copy)`,
      slug: `${p.slug}-copy-${Date.now().toString().slice(-4)}`,
      sku: `${p.sku}-CPY`,
      createdAt: new Date().toISOString(),
      variants: p.variants.map(v => ({
        ...v,
        id: `v-${Date.now()}-${v.size.toLowerCase()}`,
        productId: `prod-${Date.now()}`
      }))
    };
    try {
      await ProductService.create(dup);
      setProducts(ProductService.getAll());
      showToast(`Duplicated: ${dup.name}`, 'success');
    } catch (err) {
      console.error('Duplicate product error:', err);
      showToast(`Failed to duplicate product: ${err instanceof Error ? err.message : 'Database error'}`, 'error');
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    const newC: Coupon = {
      code: newCouponCode.trim().toUpperCase(),
      discountType: 'percentage',
      discountValue: Number(newCouponVal),
      minOrderValue: Number(newCouponMin),
      isActive: true,
      description: `${newCouponVal}% off on orders above Rs. ${newCouponMin.toLocaleString()}`
    };

    try {
      await CouponService.create(newC);
      setCoupons(CouponService.getAll());
      setNewCouponCode('');
      showToast(`Coupon ${newC.code} activated in Firestore`, 'success');
    } catch (err) {
      console.error('Create coupon error:', err);
      showToast(`Failed to create coupon: ${err instanceof Error ? err.message : 'Database error'}`, 'error');
    }
  };

  const handleDeleteCoupon = async (code: string) => {
    try {
      await CouponService.delete(code);
      setCoupons(CouponService.getAll());
      showToast(`Coupon ${code} removed from Firestore`, 'info');
    } catch (err) {
      console.error('Delete coupon error:', err);
      showToast(`Failed to delete coupon: ${err instanceof Error ? err.message : 'Database error'}`, 'error');
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const catId = newCatName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const newCat: CategoryData = {
      id: catId,
      name: newCatName.trim(),
      subtitle: newCatSubtitle.trim() || 'Curated Category',
      description: newCatDesc.trim() || 'Handcrafted garments and bespoke editions.',
      itemCount: 0,
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
      active: true
    };
    try {
      await CategoryService.create(newCat);
      setCategories(CategoryService.getAll());
      setNewCatName('');
      setNewCatSubtitle('');
      setNewCatDesc('');
      showToast(`Category "${newCat.name}" created and saved to Firestore`, 'success');
    } catch (err) {
      console.error('Create category error:', err);
      showToast(`Failed to create category: ${err instanceof Error ? err.message : 'Database error'}`, 'error');
    }
  };

  const handleUpdateCategory = async (id: string, updates: Partial<CategoryData>) => {
    try {
      await CategoryService.update(id, updates);
      setCategories(CategoryService.getAll());
      showToast('Category updated and synced to Firestore', 'success');
    } catch (err) {
      console.error('Update category error:', err);
      showToast(`Failed to update category: ${err instanceof Error ? err.message : 'Database error'}`, 'error');
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete category "${name}"?`)) {
      try {
        await CategoryService.delete(id);
        setCategories(CategoryService.getAll());
        showToast(`Category "${name}" deleted from Firestore`, 'info');
      } catch (err) {
        console.error('Delete category error:', err);
        showToast(`Failed to delete category: ${err instanceof Error ? err.message : 'Database error'}`, 'error');
      }
    }
  };

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColTitle.trim()) return;
    const newCol: CollectionItem = {
      id: `col-${Date.now()}`,
      slug: newColTitle.toLowerCase().replace(/\s+/g, '-'),
      title: newColTitle.trim(),
      season: newColSeason.trim() || 'Seasonal Drop',
      description: newColDesc.trim() || 'Exclusive architectural capsule.',
      productCount: 0,
      active: true
    };
    setCollections([newCol, ...collections]);
    setNewColTitle('');
    setNewColSeason('');
    setNewColDesc('');
    showToast(`Collection "${newCol.title}" created`, 'success');
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (productSearch) {
        const q = productSearch.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.sku.toLowerCase().includes(q)) {
          return false;
        }
      }
      if (productCategoryFilter !== 'all' && p.categoryId !== productCategoryFilter) {
        return false;
      }
      return true;
    });
  }, [products, productSearch, productCategoryFilter]);

  // Authorization & Authentication Guard
  if (loading) {
    return (
      <div className="bg-[#111111] text-[#F7F5F0] min-h-screen flex flex-col justify-center items-center p-6 font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#D0B16A] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#D0B16A]">Verifying Atelier Credentials...</p>
        </div>
      </div>
    );
  }

  // 1. Anonymous / Unauthenticated Guard
  if (!user) {
    return (
      <div className="bg-[#111111] text-[#F7F5F0] min-h-screen flex flex-col justify-center items-center p-6 font-sans">
        <div className="max-w-md w-full bg-[#181818] border border-white/10 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="flex justify-center">
            <BrandLogo className="h-10 w-auto" />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-800 text-red-400 text-[10px] font-bold uppercase tracking-wider">
              <Lock className="w-3 h-3" />
              Restricted Atelier Console
            </div>
            <h1 className="font-serif text-2xl font-bold text-white">Administrator Access Required</h1>
            <p className="text-xs text-white/60 leading-relaxed">
              This administrative management interface is strictly restricted to the authorized atelier manager (<strong className="text-white">trenxure@gmail.com</strong>).
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <button
              onClick={() => signInWithGoogle()}
              className="w-full py-3 bg-[#B08A45] hover:bg-[#D0B16A] text-[#111111] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In with Administrator Account</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-2.5 border border-white/15 hover:bg-white/5 text-white/70 hover:text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Storefront</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Non-Admin Authenticated Customer Guard
  if (!isAdmin) {
    return (
      <div className="bg-[#111111] text-[#F7F5F0] min-h-screen flex flex-col justify-center items-center p-6 font-sans">
        <div className="max-w-md w-full bg-[#181818] border border-amber-900/40 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="flex justify-center">
            <BrandLogo className="h-10 w-auto" />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
              <AlertTriangle className="w-3 h-3" />
              Patron Account Detected
            </div>
            <h1 className="font-serif text-2xl font-bold text-white">Access Denied</h1>
            <p className="text-xs text-white/60 leading-relaxed">
              You are signed in as <strong className="text-[#D0B16A]">{user.email}</strong>. This account does not possess administrative clearance for the TRENXURE Commerce Console.
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <button
              onClick={() => logout().then(() => signInWithGoogle())}
              className="w-full py-3 bg-[#B08A45] hover:bg-[#D0B16A] text-[#111111] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <LogIn className="w-4 h-4" />
              <span>Switch to Admin Account (trenxure@gmail.com)</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-2.5 border border-white/15 hover:bg-white/5 text-white/70 hover:text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Storefront</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] text-[#F7F5F0] min-h-screen flex flex-col font-sans">
      
      {/* Admin Top Bar */}
      <header className="bg-[#181818] border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D0B16A] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Storefront</span>
          </button>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-3">
            <BrandLogo className="h-8 w-auto" />
            <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-white">
              TRENXURE Commerce Console
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-white/70">
          {user ? (
            <div className="flex items-center gap-2.5">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'Admin'} className="w-6 h-6 rounded-full border border-[#D0B16A]" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#B08A45] text-black font-bold flex items-center justify-center text-[10px]">
                  {user.displayName ? user.displayName.charAt(0) : 'A'}
                </div>
              )}
              <div className="hidden sm:block text-right">
                <span className="block text-white font-medium text-xs leading-tight">{user.displayName || user.email}</span>
                <span className="text-[10px] text-[#D0B16A] leading-tight block">
                  {isAdmin ? 'Verified Administrator' : 'Authenticated Patron'}
                </span>
              </div>
              <button
                onClick={() => logout()}
                className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-[10px] uppercase font-semibold transition-colors flex items-center gap-1"
                title="Sign Out"
              >
                <LogOut className="w-3 h-3" />
                <span className="hidden md:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => signInWithGoogle()}
              className="px-3 py-1.5 bg-[#B08A45] hover:bg-[#D0B16A] text-[#111111] font-bold rounded text-xs transition-colors flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In with Google</span>
            </button>
          )}
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            FIRESTORE LIVE
          </span>
        </div>
      </header>

      {/* Admin Body Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Dark Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#141414] border-r border-white/10 p-3 sm:p-4 space-y-1 shrink-0 overflow-y-auto">
          
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 px-3 py-2">
            Catalog & Inventory
          </div>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors ${
              activeTab === 'dashboard' ? 'bg-[#B08A45] text-[#111111]' : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors ${
              activeTab === 'products' ? 'bg-[#B08A45] text-[#111111]' : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors ${
              activeTab === 'categories' ? 'bg-[#B08A45] text-[#111111]' : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('collections')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors ${
              activeTab === 'collections' ? 'bg-[#B08A45] text-[#111111]' : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Collections ({collections.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors ${
              activeTab === 'inventory' ? 'bg-[#B08A45] text-[#111111]' : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>Inventory Ledger</span>
            {lowStockVariants.length > 0 && (
              <span className="ml-auto px-1.5 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] rounded font-mono font-bold">
                {lowStockVariants.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('variants')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors ${
              activeTab === 'variants' ? 'bg-[#B08A45] text-[#111111]' : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Product Variants ({allVariantsMatrix.length})</span>
          </button>

          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 px-3 pt-6 pb-2">
            Fulfillment & Commerce
          </div>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors ${
              activeTab === 'orders' ? 'bg-[#B08A45] text-[#111111]' : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors ${
              activeTab === 'customers' ? 'bg-[#B08A45] text-[#111111]' : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Customers</span>
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors ${
              activeTab === 'coupons' ? 'bg-[#B08A45] text-[#111111]' : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Coupons ({coupons.length})</span>
          </button>

          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 px-3 pt-6 pb-2">
            Storefront & Configuration
          </div>

          <button
            onClick={() => setActiveTab('homepage')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors ${
              activeTab === 'homepage' ? 'bg-[#B08A45] text-[#111111]' : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Homepage Content</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors ${
              activeTab === 'settings' ? 'bg-[#B08A45] text-[#111111]' : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Store Settings</span>
          </button>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#0D0D0D] overflow-y-auto">
          
          {/* 1. DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl font-bold text-white mb-1">Executive Dashboard</h2>
                <p className="text-xs text-white/60">Live metrics across sales, atelier order fulfillment, and stock health.</p>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#1A1A1A] p-5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-start text-xs text-white/60 mb-2">
                    <span>Total Realized Revenue</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="font-serif text-2xl font-bold text-white tabular-nums">
                    {formatMoney(totalRevenue)}
                  </p>
                  <p className="text-[10px] text-emerald-400 mt-1">Paid deliveries across Pakistan</p>
                </div>

                <div className="bg-[#1A1A1A] p-5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-start text-xs text-white/60 mb-2">
                    <span>Total Orders Placed</span>
                    <ShoppingBag className="w-4 h-4 text-[#D0B16A]" />
                  </div>
                  <p className="font-serif text-2xl font-bold text-white tabular-nums">
                    {totalOrdersCount}
                  </p>
                  <p className="text-[10px] text-white/50 mt-1">Active fulfillment pipeline</p>
                </div>

                <div className="bg-[#1A1A1A] p-5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-start text-xs text-white/60 mb-2">
                    <span>Active Products</span>
                    <Package className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="font-serif text-2xl font-bold text-white tabular-nums">
                    {products.length}
                  </p>
                  <p className="text-[10px] text-blue-400 mt-1">Across 6 luxury categories</p>
                </div>

                <div className="bg-[#1A1A1A] p-5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-start text-xs text-white/60 mb-2">
                    <span>Low Stock Variants</span>
                    <AlertTriangle className={`w-4 h-4 ${lowStockVariants.length > 0 ? 'text-amber-400' : 'text-emerald-400'}`} />
                  </div>
                  <p className={`font-serif text-2xl font-bold tabular-nums ${lowStockVariants.length > 0 ? 'text-amber-400' : 'text-white'}`}>
                    {lowStockVariants.length}
                  </p>
                  <p className="text-[10px] text-amber-400/80 mt-1">Restock threshold &le; 3 units</p>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="bg-[#1A1A1A] rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg font-bold text-white">Recent Orders Stream</h3>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-[#D0B16A] hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-white/50 font-semibold uppercase tracking-wider text-[10px]">
                        <th className="pb-3">Order</th>
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">City</th>
                        <th className="pb-3">Total</th>
                        <th className="pb-3">Payment</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-white/80">
                      {orders.slice(0, 5).map(o => (
                        <tr key={o.id} className="hover:bg-white/5">
                          <td className="py-3 font-mono font-bold text-white">{o.orderNumber}</td>
                          <td className="py-3">{o.customerName}</td>
                          <td className="py-3 text-white/60">{o.shippingAddress.city}</td>
                          <td className="py-3 font-bold font-mono text-white tabular-nums">{formatMoney(o.total)}</td>
                          <td className="py-3 uppercase text-[10px]">{o.paymentMethod}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#B08A45]/20 text-[#D0B16A]">
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. PRODUCTS TAB */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-white mb-1">Catalog Products</h2>
                  <p className="text-xs text-white/60">Create, edit, duplicate, and manage all luxury garments in the catalog.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setIsProductModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-[#B08A45] hover:bg-[#D0B16A] text-[#111111] text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Product</span>
                </button>
              </div>

              {/* Search & Filter Controls */}
              <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search name or SKU..."
                    className="w-full bg-black/50 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white outline-none focus:border-[#B08A45]"
                  />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-xs text-white/60">Category:</span>
                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#B08A45]"
                  >
                    <option value="all">All Categories</option>
                    <option value="blazers">Blazers</option>
                    <option value="pants">Pants</option>
                    <option value="t-shirts">T-Shirts</option>
                    <option value="hoodies">Hoodies</option>
                    <option value="coats">Coats</option>
                    <option value="shirts">Shirts</option>
                  </select>
                </div>
              </div>

              {/* Products List */}
              <div className="bg-[#1A1A1A] rounded-2xl border border-white/10 p-6 overflow-hidden">
                <div className="divide-y divide-white/5">
                  {filteredProducts.map(p => {
                    const totalUnits = p.variants.reduce((s, v) => s + v.stockQuantity, 0);
                    return (
                      <div key={p.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/5 px-3 rounded-lg transition-colors">
                        <div className="flex items-center gap-4">
                          <img src={p.images[0]} alt={p.name} className="w-14 h-16 object-cover rounded bg-white/10 shrink-0" />
                          <div>
                            <span className="text-[10px] text-[#D0B16A] uppercase tracking-wider font-semibold">
                              {p.categoryName} · {p.style} · {p.gender}
                            </span>
                            <h4 className="font-serif text-sm font-bold text-white">{p.name}</h4>
                            <p className="text-xs text-white/50 font-mono">SKU: {p.sku}</p>
                            <div className="flex gap-2 text-[11px] text-white/70 mt-1">
                              <span>Variants: {p.variants.length}</span>
                              <span>·</span>
                              <span className={totalUnits <= 5 ? 'text-amber-400 font-bold' : ''}>
                                Units in Stock: {totalUnits}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 justify-between md:justify-end">
                          <div className="text-right">
                            <span className="font-serif text-base font-bold text-white tabular-nums block">
                              {formatMoney(p.basePrice)}
                            </span>
                            <span className="text-[10px] text-emerald-400 uppercase font-mono">
                              {p.status}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingProduct(p);
                                setIsProductModalOpen(true);
                              }}
                              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                              title="Edit Product"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDuplicateProduct(p)}
                              className="p-2 text-white/70 hover:text-[#D0B16A] hover:bg-white/10 rounded transition-colors"
                              title="Duplicate Product"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-2 text-white/50 hover:text-red-400 hover:bg-white/10 rounded transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 3. CATEGORIES TAB */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl font-bold text-white mb-1">Categories Management</h2>
                <p className="text-xs text-white/60">Configure product department taxonomy, descriptions, and storefront visibility.</p>
              </div>

              {/* Add Category Form */}
              <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/10">
                <h3 className="font-serif text-lg font-bold text-white mb-4">Add New Garment Category</h3>
                <form onSubmit={handleCreateCategory} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-white/60 block mb-1">Category Name</label>
                    <input
                      type="text"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      placeholder="e.g. Silk Scarves & Pocket Squares"
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#B08A45]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/60 block mb-1">Subtitle / Tagline</label>
                    <input
                      type="text"
                      value={newCatSubtitle}
                      onChange={(e) => setNewCatSubtitle(e.target.value)}
                      placeholder="e.g. Pure Mulberry Silk"
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#B08A45]"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2 bg-[#B08A45] hover:bg-[#D0B16A] text-[#111111] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Category</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Categories Table */}
              <div className="bg-[#1A1A1A] rounded-2xl border border-white/10 overflow-hidden p-6">
                <div className="divide-y divide-white/5">
                  {categories.map((c) => (
                    <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img src={c.image} alt={c.name} className="w-12 h-12 object-cover rounded-lg bg-white/10 shrink-0" />
                        <div>
                          <h4 className="font-serif text-base font-bold text-white">{c.name}</h4>
                          <p className="text-xs text-[#D0B16A]">{c.subtitle}</p>
                          <p className="text-xs text-white/50 mt-0.5">{c.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/70 hidden sm:inline">
                          <strong>{c.itemCount}</strong> products linked
                        </span>
                        <button
                          onClick={() => handleUpdateCategory(c.id, { active: !c.active })}
                          className={`px-3 py-1 text-xs rounded font-semibold uppercase tracking-wider ${
                            c.active ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'
                          }`}
                        >
                          {c.active ? 'Active' : 'Hidden'}
                        </button>
                        <button
                          onClick={() => {
                            setEditingCategory(c);
                            setIsCategoryModalOpen(true);
                          }}
                          className="p-1.5 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white rounded border border-white/10 transition-colors"
                          title="Edit Category"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(c.id, c.name)}
                          className="p-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 rounded border border-red-800/40 transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. COLLECTIONS TAB */}
          {activeTab === 'collections' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl font-bold text-white mb-1">Collections & Capsules</h2>
                <p className="text-xs text-white/60">Organize seasonal capsules, limited run drops, and editorial lookbooks.</p>
              </div>

              {/* Add Collection Form */}
              <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/10">
                <h3 className="font-serif text-lg font-bold text-white mb-4">Create New Capsule Collection</h3>
                <form onSubmit={handleCreateCollection} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-white/60 block mb-1">Collection Title</label>
                    <input
                      type="text"
                      value={newColTitle}
                      onChange={(e) => setNewColTitle(e.target.value)}
                      placeholder="e.g. Royal Baroque Gala 2026"
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#B08A45]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/60 block mb-1">Season / Release Tag</label>
                    <input
                      type="text"
                      value={newColSeason}
                      onChange={(e) => setNewColSeason(e.target.value)}
                      placeholder="e.g. Spring / Summer 2026"
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#B08A45]"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2 bg-[#B08A45] hover:bg-[#D0B16A] text-[#111111] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Publish Capsule</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Collections Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {collections.map((col) => (
                  <div key={col.id} className="bg-[#1A1A1A] p-5 rounded-xl border border-white/10 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D0B16A]">
                          {col.season}
                        </span>
                        <h4 className="font-serif text-lg font-bold text-white">{col.title}</h4>
                      </div>
                      <span className="text-xs font-mono text-white/50">{col.slug}</span>
                    </div>
                    <p className="text-xs text-white/60">{col.description}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-xs text-white/60">{col.productCount} garments featured</span>
                      <button
                        onClick={() => navigate('/collections')}
                        className="text-xs text-[#D0B16A] hover:underline flex items-center gap-1"
                      >
                        <span>View on Storefront</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. INVENTORY TAB */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl font-bold text-white mb-1">Inventory Ledger</h2>
                <p className="text-xs text-white/60">Live stock counts per size/variant, low stock triggers, and restock actions.</p>
              </div>

              {/* Low Stock Warning Card */}
              {lowStockVariants.length > 0 && (
                <div className="bg-amber-950/30 border border-amber-800/60 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-amber-300">
                        {lowStockVariants.length} Variants Require Restocking
                      </p>
                      <p className="text-[11px] text-amber-400/80">
                        Items at or below low stock threshold (&le; 3 units).
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Inventory Table */}
              <div className="bg-[#1A1A1A] rounded-2xl border border-white/10 p-6 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-white/50 font-semibold uppercase tracking-wider text-[10px]">
                        <th className="pb-3">Product</th>
                        <th className="pb-3">Size / Color</th>
                        <th className="pb-3">SKU</th>
                        <th className="pb-3">Stock on Hand</th>
                        <th className="pb-3">Reserved</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Quick Restock</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-white/80">
                      {allVariantsMatrix.map(({ product, variant }) => {
                        const isLow = variant.stockQuantity <= variant.lowStockThreshold;
                        return (
                          <tr key={variant.id} className="hover:bg-white/5">
                            <td className="py-3 font-serif font-bold text-white flex items-center gap-3">
                              <img src={product.images[0]} alt="" className="w-8 h-10 object-cover rounded bg-white/10" />
                              <span>{product.name}</span>
                            </td>
                            <td className="py-3">
                              <span className="font-bold text-white">{variant.size}</span>
                              <span className="text-white/50 text-[10px] ml-1.5">({variant.color})</span>
                            </td>
                            <td className="py-3 font-mono text-white/60">{variant.sku}</td>
                            <td className="py-3 font-mono font-bold text-white tabular-nums">
                              {variant.stockQuantity}
                            </td>
                            <td className="py-3 font-mono text-white/50 tabular-nums">
                              {variant.reservedQuantity}
                            </td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                isLow ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                              }`}>
                                {isLow ? 'Low Stock' : 'Healthy'}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => setAdjustModalProduct({ product, variant })}
                                className="px-2.5 py-1 bg-white/10 hover:bg-[#B08A45] hover:text-[#111111] rounded text-[11px] font-semibold transition-colors"
                              >
                                Adjust Stock
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 6. PRODUCT VARIANTS TAB */}
          {activeTab === 'variants' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl font-bold text-white mb-1">Product Variants Matrix</h2>
                <p className="text-xs text-white/60">Granular control of sizes (S, M, L, XL, XXL), SKU allocations, and variant pricing.</p>
              </div>

              <div className="bg-[#1A1A1A] rounded-2xl border border-white/10 p-6 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map(p => (
                    <div key={p.id} className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover rounded" />
                        <div>
                          <h4 className="font-serif text-sm font-bold text-white truncate">{p.name}</h4>
                          <span className="text-[10px] text-[#D0B16A] uppercase font-mono">{p.sku}</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-white/5">
                        <span className="text-[10px] text-white/50 uppercase font-semibold">Variant Stock Levels:</span>
                        {p.variants.map(v => (
                          <div key={v.id} className="flex items-center justify-between text-xs py-1 px-2 bg-white/5 rounded">
                            <span className="font-bold text-white">Size {v.size}</span>
                            <span className="font-mono text-white/60">{v.sku}</span>
                            <span className="font-mono font-bold text-[#D0B16A]">{v.stockQuantity} units</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 7. ORDERS MANAGEMENT TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl font-bold text-white mb-1">Orders Fulfillment</h2>
                <p className="text-xs text-white/60">Process bespoke customer orders, assign courier dispatch, and generate packing summaries.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Orders List (7 cols) */}
                <div className="lg:col-span-7 bg-[#1A1A1A] rounded-2xl border border-white/10 p-5 space-y-3">
                  {orders.map(o => (
                    <div
                      key={o.id}
                      onClick={() => setSelectedOrder(o)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedOrder?.id === o.id
                          ? 'border-[#B08A45] bg-white/10'
                          : 'border-white/5 hover:border-white/20 bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm font-bold text-white">{o.orderNumber}</span>
                        <span className="capitalize text-[10px] font-bold px-2 py-0.5 rounded bg-[#B08A45]/20 text-[#D0B16A]">
                          {o.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-white/60">
                        <span>{o.customerName} ({o.shippingAddress.city})</span>
                        <span className="tabular-nums font-bold text-white">{formatMoney(o.total)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Selected Order Detail (5 cols) */}
                <div className="lg:col-span-5 bg-[#1A1A1A] rounded-2xl border border-white/10 p-6 space-y-4">
                  {selectedOrder ? (
                    <>
                      <div className="flex justify-between items-start pb-3 border-b border-white/10">
                        <div>
                          <h3 className="font-serif text-lg font-bold text-white">{selectedOrder.orderNumber}</h3>
                          <p className="text-xs text-white/50">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                        </div>
                        <span className="text-xs font-bold text-[#D0B16A] uppercase tabular-nums">
                          {formatMoney(selectedOrder.total)}
                        </span>
                      </div>

                      {/* Status Transition Control */}
                      <div>
                        <label className="text-xs text-white/60 block mb-1 font-semibold uppercase tracking-wider">Update Fulfillment Status</label>
                        <select
                          value={selectedOrder.status}
                          onChange={e => handleUpdateOrderStatus(selectedOrder.id, e.target.value as OrderStatus)}
                          className="w-full px-3 py-2 bg-black border border-white/20 rounded text-xs text-white focus:outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing (Atelier Tailoring)</option>
                          <option value="packed">Packed in Box</option>
                          <option value="shipped">Shipped via TCS</option>
                          <option value="delivered">Delivered to Customer</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      {/* Customer Info */}
                      <div className="text-xs text-white/70 space-y-1 bg-black/40 p-3 rounded-lg">
                        <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
                        <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
                        <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                        <p><strong>Address:</strong> {selectedOrder.shippingAddress.addressLine1}, {selectedOrder.shippingAddress.city}</p>
                        <p><strong>Payment:</strong> {selectedOrder.paymentMethod.toUpperCase()} ({selectedOrder.paymentStatus})</p>
                      </div>

                      {/* Items */}
                      <div>
                        <p className="text-xs font-bold text-white mb-2">Order Items:</p>
                        <div className="space-y-2">
                          {selectedOrder.items.map((it, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-2 bg-black/30 rounded">
                              <img src={it.image} alt={it.name} className="w-10 h-12 object-cover rounded" />
                              <div className="flex-1 text-xs">
                                <p className="font-serif font-bold text-white">{it.name}</p>
                                <p className="text-white/50 text-[10px]">Size: {it.size} · Qty: {it.quantity}</p>
                              </div>
                              <span className="text-xs font-mono font-bold text-white tabular-nums">
                                {formatMoney(it.price * it.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-16 text-white/40 text-xs">
                      Select an order on the left to inspect customer details and manage status.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 8. CUSTOMERS TAB */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl font-bold text-white mb-1">Customer Directory</h2>
                <p className="text-xs text-white/60">Track high-value clientele, bespoke tailoring measurements, and order history.</p>
              </div>

              <div className="bg-[#1A1A1A] rounded-2xl border border-white/10 p-6 overflow-hidden">
                <div className="divide-y divide-white/5">
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-base font-bold text-white">Hamza Tariq</h4>
                        <span className="px-2 py-0.5 rounded bg-[#B08A45]/20 text-[#D0B16A] text-[10px] font-bold uppercase">
                          VIP Atelier Patron
                        </span>
                      </div>
                      <p className="text-xs text-white/50">hamza.tariq@gmail.com · +92 300 8472911</p>
                      <p className="text-[11px] text-white/40 mt-1">DHA Phase 5, Karachi · Saved Sizes: L (Blazers), 34 (Pants)</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-white/50 block">Lifetime Spend:</span>
                      <span className="font-mono font-bold text-white text-base">Rs. 45,000</span>
                      <span className="text-[10px] text-emerald-400 block">3 orders placed</span>
                    </div>
                  </div>

                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-base font-bold text-white">Zara Ahmed</h4>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-white/70 text-[10px] font-bold uppercase">
                          Client
                        </span>
                      </div>
                      <p className="text-xs text-white/50">zara.ahmed@yahoo.com · +92 321 4455667</p>
                      <p className="text-[11px] text-white/40 mt-1">Gulberg III, Lahore · Saved Sizes: M (Hoodies)</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-white/50 block">Lifetime Spend:</span>
                      <span className="font-mono font-bold text-white text-base">Rs. 19,000</span>
                      <span className="text-[10px] text-emerald-400 block">2 orders placed</span>
                    </div>
                  </div>

                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-base font-bold text-white">Bilal Mansoor</h4>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-white/70 text-[10px] font-bold uppercase">
                          Client
                        </span>
                      </div>
                      <p className="text-xs text-white/50">bilal.m@hotmail.com · +92 333 1122334</p>
                      <p className="text-[11px] text-white/40 mt-1">F-7/2, Islamabad · Saved Sizes: XL (Tees)</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-white/50 block">Lifetime Spend:</span>
                      <span className="font-mono font-bold text-white text-base">Rs. 9,600</span>
                      <span className="text-[10px] text-emerald-400 block">1 order placed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 9. COUPONS TAB */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl font-bold text-white mb-1">Coupons & Promotions</h2>
                <p className="text-xs text-white/60">Configure discount codes, percentage cuts, and minimum qualifying cart totals.</p>
              </div>

              {/* Create Coupon Form */}
              <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/10">
                <h3 className="font-serif text-lg font-bold text-white mb-4">Create New Promo Code</h3>
                <form onSubmit={handleCreateCoupon} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs text-white/60 block mb-1">Coupon Code</label>
                    <input
                      type="text"
                      value={newCouponCode}
                      onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                      placeholder="e.g. VIP20"
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono uppercase outline-none focus:border-[#B08A45]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/60 block mb-1">Discount %</label>
                    <input
                      type="number"
                      min={1}
                      max={90}
                      value={newCouponVal}
                      onChange={(e) => setNewCouponVal(Number(e.target.value))}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#B08A45]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/60 block mb-1">Min Order Value (Rs.)</label>
                    <input
                      type="number"
                      min={0}
                      step={500}
                      value={newCouponMin}
                      onChange={(e) => setNewCouponMin(Number(e.target.value))}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#B08A45]"
                      required
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2 bg-[#B08A45] hover:bg-[#D0B16A] text-[#111111] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Activate Coupon</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Coupons List */}
              <div className="bg-[#1A1A1A] rounded-2xl border border-white/10 p-6 overflow-hidden">
                <div className="divide-y divide-white/5">
                  {coupons.map((c) => (
                    <div key={c.code} className="py-4 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-base font-bold text-white bg-white/10 px-2.5 py-1 rounded">
                            {c.code}
                          </span>
                          <span className="text-xs text-emerald-400 font-bold">
                            {c.discountValue}% OFF
                          </span>
                        </div>
                        <p className="text-xs text-white/60 mt-1">{c.description}</p>
                        {c.minOrderValue && (
                          <p className="text-[11px] text-white/40">Min spend: Rs. {c.minOrderValue.toLocaleString()}</p>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteCoupon(c.code)}
                        className="p-2 text-white/40 hover:text-red-400 transition-colors"
                        title="Delete coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 10. HOMEPAGE CONTENT TAB */}
          {activeTab === 'homepage' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl font-bold text-white mb-1">Homepage Content Management</h2>
                <p className="text-xs text-white/60">Configure announcement tickers, hero headlines, and editorial statements.</p>
              </div>

              <div className="bg-[#1A1A1A] rounded-2xl border border-white/10 p-6 space-y-6">
                
                {/* Announcement Ticker */}
                <div className="space-y-2 pb-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white uppercase tracking-wider">Top Announcement Banner</label>
                    <label className="flex items-center gap-2 text-xs text-white/70 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={homepageContent.announcementActive}
                        onChange={(e) => setHomepageContent({ ...homepageContent, announcementActive: e.target.checked })}
                        className="rounded"
                      />
                      <span>Active on Storefront</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={homepageContent.announcementText}
                    onChange={(e) => setHomepageContent({ ...homepageContent, announcementText: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#B08A45]"
                  />
                </div>

                {/* Hero Section */}
                <div className="space-y-4 pb-6 border-b border-white/10">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Hero Section Headlines</h3>
                  
                  <div>
                    <label className="text-[11px] text-white/60 block mb-1">Kicker Badge</label>
                    <input
                      type="text"
                      value={homepageContent.heroBadge}
                      onChange={(e) => setHomepageContent({ ...homepageContent, heroBadge: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#B08A45]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-white/60 block mb-1">Main Headline</label>
                    <input
                      type="text"
                      value={homepageContent.heroHeadline}
                      onChange={(e) => setHomepageContent({ ...homepageContent, heroHeadline: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#B08A45]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-white/60 block mb-1">Subtext / Editorial Narrative</label>
                    <textarea
                      value={homepageContent.heroSubtext}
                      onChange={(e) => setHomepageContent({ ...homepageContent, heroSubtext: e.target.value })}
                      rows={2}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#B08A45]"
                    />
                  </div>
                </div>

                {/* Save Content Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      localStorage.setItem('trenxure_homepage_content', JSON.stringify(homepageContent));
                      showToast('Homepage editorial copy updated successfully', 'success');
                    }}
                    className="px-6 py-2.5 bg-[#B08A45] hover:bg-[#D0B16A] text-[#111111] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Homepage Copy</span>
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* 11. SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl font-bold text-white mb-1">Store Settings</h2>
                <p className="text-xs text-white/60">Configure currency, checkout thresholds, payment gateways, and atelier contacts.</p>
              </div>

              <div className="bg-[#1A1A1A] rounded-2xl border border-white/10 p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/60 block mb-1">Store Name</label>
                    <input
                      type="text"
                      value={storeSettings.storeName}
                      onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/60 block mb-1">Base Currency</label>
                    <input
                      type="text"
                      value={storeSettings.currency}
                      onChange={(e) => setStoreSettings({ ...storeSettings, currency: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/60 block mb-1">Standard Shipping Fee (Rs.)</label>
                    <input
                      type="number"
                      value={storeSettings.shippingFeeStandard}
                      onChange={(e) => setStoreSettings({ ...storeSettings, shippingFeeStandard: Number(e.target.value) })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/60 block mb-1">Free Delivery Threshold (Rs.)</label>
                    <input
                      type="number"
                      value={storeSettings.freeShippingThreshold}
                      onChange={(e) => setStoreSettings({ ...storeSettings, freeShippingThreshold: Number(e.target.value) })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <label className="text-xs font-bold text-white uppercase tracking-wider block">Payment Gateways</label>
                  <div className="flex flex-col sm:flex-row gap-4 text-xs text-white/80">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={storeSettings.enableCashOnDelivery}
                        onChange={(e) => setStoreSettings({ ...storeSettings, enableCashOnDelivery: e.target.checked })}
                      />
                      <span>Cash on Delivery (COD - Pakistan nationwide)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={storeSettings.enableBankTransfer}
                        onChange={(e) => setStoreSettings({ ...storeSettings, enableBankTransfer: e.target.checked })}
                      />
                      <span>Direct IBFT / Bank Wire Transfer</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <label className="text-xs font-bold text-white uppercase tracking-wider block">Atelier Physical Locations</label>
                  <div>
                    <label className="text-[11px] text-white/50 block mb-1">Karachi Atelier</label>
                    <input
                      type="text"
                      value={storeSettings.atelierAddressKarachi}
                      onChange={(e) => setStoreSettings({ ...storeSettings, atelierAddressKarachi: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-white/50 block mb-1">Lahore Studio</label>
                    <input
                      type="text"
                      value={storeSettings.atelierAddressLahore}
                      onChange={(e) => setStoreSettings({ ...storeSettings, atelierAddressLahore: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => {
                      localStorage.setItem('trenxure_store_settings', JSON.stringify(storeSettings));
                      showToast('Store settings saved and published', 'success');
                    }}
                    className="px-6 py-2.5 bg-[#B08A45] hover:bg-[#D0B16A] text-[#111111] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Settings</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Stock Adjustment Modal */}
      {adjustModalProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1E1E1E] border border-white/20 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white">Adjust Variant Stock</h3>
            <p className="text-xs text-white/70">
              <strong>{adjustModalProduct.product.name}</strong> · Size: {adjustModalProduct.variant.size}
            </p>
            <div className="text-xs text-white/50 font-mono">
              Current Stock: <strong>{adjustModalProduct.variant.stockQuantity}</strong> units
            </div>

            <div>
              <label className="text-xs text-white/70 block mb-1 font-semibold">
                Units to Add (+) or Deduct (-)
              </label>
              <input
                type="number"
                value={stockDelta}
                onChange={(e) => setStockDelta(Number(e.target.value))}
                className="w-full px-3 py-2 bg-black border border-white/20 rounded text-sm text-white font-mono"
              />
            </div>

            <div className="flex gap-3 pt-3">
              <button
                onClick={() => setAdjustModalProduct(null)}
                className="flex-1 py-2 border border-white/20 rounded text-xs text-white hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleAdjustStock}
                className="flex-1 py-2 bg-[#B08A45] text-[#111111] font-bold rounded text-xs hover:bg-[#D0B16A]"
              >
                Commit Adjustment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Creation / Editing Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1E1E1E] border border-white/20 rounded-2xl max-w-2xl w-full p-6 space-y-4 my-8">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <h3 className="font-serif text-xl font-bold text-white">
                {editingProduct ? 'Edit Catalog Product' : 'Create New Luxury Creation'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);

                const name = formData.get('name') as string;
                const categoryId = formData.get('categoryId') as string;
                const basePrice = Number(formData.get('basePrice'));
                const compareAtPrice = Number(formData.get('compareAtPrice')) || undefined;
                const tagline = formData.get('tagline') as string;
                const description = formData.get('description') as string;
                const material = formData.get('material') as string;
                const fit = formData.get('fit') as string;
                const style = formData.get('style') as any;
                const gender = formData.get('gender') as any;
                const imageUrl = formData.get('imageUrl') as string;
                const sku = formData.get('sku') as string;

                try {
                  if (editingProduct) {
                    await ProductService.update(editingProduct.id, {
                      name,
                      categoryId: categoryId as any,
                      categoryName: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
                      basePrice,
                      compareAtPrice,
                      tagline,
                      description,
                      material,
                      fit,
                      style,
                      gender,
                      sku,
                      images: imageUrl ? [imageUrl] : editingProduct.images
                    });
                    showToast(`Updated "${name}" in Firestore`, 'success');
                  } else {
                    const newProduct: Product = {
                      id: `prod-${Date.now()}`,
                      name,
                      slug: name.toLowerCase().replace(/\s+/g, '-'),
                      sku: sku || `TRX-${categoryId.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-4)}`,
                      tagline,
                      description,
                      categoryId: categoryId as any,
                      categoryName: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
                      collectionIds: ['formal', 'new-arrivals'],
                      style,
                      gender,
                      basePrice,
                      compareAtPrice,
                      status: 'active',
                      featured: true,
                      newArrival: true,
                      bestSeller: false,
                      images: [imageUrl || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80'],
                      variants: [
                        { id: `v-${Date.now()}-s`, productId: `prod-${Date.now()}`, sku: `${sku}-S`, color: 'Classic Black', colorHex: '#111111', size: 'S', price: basePrice, stockQuantity: 8, reservedQuantity: 0, lowStockThreshold: 3, active: true },
                        { id: `v-${Date.now()}-m`, productId: `prod-${Date.now()}`, sku: `${sku}-M`, color: 'Classic Black', colorHex: '#111111', size: 'M', price: basePrice, stockQuantity: 12, reservedQuantity: 0, lowStockThreshold: 3, active: true },
                        { id: `v-${Date.now()}-l`, productId: `prod-${Date.now()}`, sku: `${sku}-L`, color: 'Classic Black', colorHex: '#111111', size: 'L', price: basePrice, stockQuantity: 6, reservedQuantity: 0, lowStockThreshold: 3, active: true },
                        { id: `v-${Date.now()}-xl`, productId: `prod-${Date.now()}`, sku: `${sku}-XL`, color: 'Classic Black', colorHex: '#111111', size: 'XL', price: basePrice, stockQuantity: 4, reservedQuantity: 0, lowStockThreshold: 3, active: true },
                      ],
                      material,
                      fit,
                      careInstructions: ['Dry clean recommended'],
                      reviewsCount: 0,
                      averageRating: 5.0,
                      createdAt: new Date().toISOString()
                    };
                    await ProductService.create(newProduct);
                    showToast(`Created creation "${name}" in Firestore`, 'success');
                  }

                  setProducts(ProductService.getAll());
                  setIsProductModalOpen(false);
                } catch (err) {
                  console.error('Save product error:', err);
                  showToast(`Failed to save product in Firestore: ${err instanceof Error ? err.message : 'Database error'}`, 'error');
                }
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 block mb-1 font-semibold">Garment Name</label>
                  <input
                    name="name"
                    defaultValue={editingProduct?.name || ''}
                    placeholder="e.g. Royal Velvet Midnight Blazer"
                    className="w-full bg-black/60 border border-white/20 rounded p-2 text-white outline-none focus:border-[#B08A45]"
                    required
                  />
                </div>
                <div>
                  <label className="text-white/70 block mb-1 font-semibold">SKU Code</label>
                  <input
                    name="sku"
                    defaultValue={editingProduct?.sku || ''}
                    placeholder="e.g. TRX-BLZ-ROY09"
                    className="w-full bg-black/60 border border-white/20 rounded p-2 text-white font-mono outline-none focus:border-[#B08A45]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-white/70 block mb-1 font-semibold">Category</label>
                  <select
                    name="categoryId"
                    defaultValue={editingProduct?.categoryId || 'blazers'}
                    className="w-full bg-black/60 border border-white/20 rounded p-2 text-white outline-none focus:border-[#B08A45]"
                  >
                    <option value="blazers">Blazers</option>
                    <option value="pants">Pants</option>
                    <option value="t-shirts">T-Shirts</option>
                    <option value="hoodies">Hoodies</option>
                    <option value="coats">Coats</option>
                    <option value="shirts">Shirts</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/70 block mb-1 font-semibold">Style</label>
                  <select
                    name="style"
                    defaultValue={editingProduct?.style || 'Luxury'}
                    className="w-full bg-black/60 border border-white/20 rounded p-2 text-white outline-none focus:border-[#B08A45]"
                  >
                    <option value="Luxury">Luxury</option>
                    <option value="Abstract">Abstract</option>
                    <option value="Floral">Floral</option>
                    <option value="Geometric">Geometric</option>
                    <option value="Graffiti">Graffiti</option>
                    <option value="Marble">Marble</option>
                    <option value="Ethnic">Ethnic</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/70 block mb-1 font-semibold">Gender</label>
                  <select
                    name="gender"
                    defaultValue={editingProduct?.gender || 'Unisex'}
                    className="w-full bg-black/60 border border-white/20 rounded p-2 text-white outline-none focus:border-[#B08A45]"
                  >
                    <option value="Unisex">Unisex</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 block mb-1 font-semibold">Base Price (Rs.)</label>
                  <input
                    name="basePrice"
                    type="number"
                    defaultValue={editingProduct?.basePrice || 15000}
                    className="w-full bg-black/60 border border-white/20 rounded p-2 text-white font-mono outline-none focus:border-[#B08A45]"
                    required
                  />
                </div>
                <div>
                  <label className="text-white/70 block mb-1 font-semibold">Compare At Price (Rs.)</label>
                  <input
                    name="compareAtPrice"
                    type="number"
                    defaultValue={editingProduct?.compareAtPrice || ''}
                    placeholder="Optional original price"
                    className="w-full bg-black/60 border border-white/20 rounded p-2 text-white font-mono outline-none focus:border-[#B08A45]"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/70 block mb-1 font-semibold">Tagline</label>
                <input
                  name="tagline"
                  defaultValue={editingProduct?.tagline || ''}
                  placeholder="One-line editorial hook"
                  className="w-full bg-black/60 border border-white/20 rounded p-2 text-white outline-none focus:border-[#B08A45]"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1 font-semibold">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingProduct?.description || ''}
                  rows={3}
                  className="w-full bg-black/60 border border-white/20 rounded p-2 text-white outline-none focus:border-[#B08A45]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 block mb-1 font-semibold">Fabric Composition</label>
                  <input
                    name="material"
                    defaultValue={editingProduct?.material || '70% Combed Cotton, 30% Fine Viscose'}
                    className="w-full bg-black/60 border border-white/20 rounded p-2 text-white outline-none focus:border-[#B08A45]"
                  />
                </div>
                <div>
                  <label className="text-white/70 block mb-1 font-semibold">Fit & Silhouette</label>
                  <input
                    name="fit"
                    defaultValue={editingProduct?.fit || 'Tailored fit with structured shoulder line'}
                    className="w-full bg-black/60 border border-white/20 rounded p-2 text-white outline-none focus:border-[#B08A45]"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/70 block mb-1 font-semibold">Primary Image URL</label>
                <input
                  name="imageUrl"
                  defaultValue={editingProduct?.images[0] || ''}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-black/60 border border-white/20 rounded p-2 text-white outline-none focus:border-[#B08A45]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-white/20 text-white rounded hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#B08A45] hover:bg-[#D0B16A] text-[#111111] font-bold rounded transition-colors"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Editing Modal */}
      {isCategoryModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1E1E1E] border border-white/20 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <h3 className="font-serif text-xl font-bold text-white">Edit Category</h3>
              <button
                onClick={() => {
                  setIsCategoryModalOpen(false);
                  setEditingCategory(null);
                }}
                className="p-1 text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const name = formData.get('name') as string;
                const subtitle = formData.get('subtitle') as string;
                const description = formData.get('description') as string;
                const image = formData.get('image') as string;

                await handleUpdateCategory(editingCategory.id, {
                  name,
                  subtitle,
                  description,
                  image: image || editingCategory.image
                });
                setIsCategoryModalOpen(false);
                setEditingCategory(null);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="text-white/70 block mb-1 font-semibold">Category Name</label>
                <input
                  name="name"
                  defaultValue={editingCategory.name}
                  className="w-full bg-black/60 border border-white/20 rounded p-2 text-white outline-none focus:border-[#B08A45]"
                  required
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1 font-semibold">Subtitle / Tagline</label>
                <input
                  name="subtitle"
                  defaultValue={editingCategory.subtitle}
                  className="w-full bg-black/60 border border-white/20 rounded p-2 text-white outline-none focus:border-[#B08A45]"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1 font-semibold">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingCategory.description}
                  rows={3}
                  className="w-full bg-black/60 border border-white/20 rounded p-2 text-white outline-none focus:border-[#B08A45]"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1 font-semibold">Cover Image URL</label>
                <input
                  name="image"
                  defaultValue={editingCategory.image}
                  className="w-full bg-black/60 border border-white/20 rounded p-2 text-white outline-none focus:border-[#B08A45]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsCategoryModalOpen(false);
                    setEditingCategory(null);
                  }}
                  className="px-4 py-2 border border-white/20 text-white rounded hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B08A45] hover:bg-[#D0B16A] text-[#111111] font-bold rounded transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPage;
