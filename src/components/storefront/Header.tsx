import React, { useState, useRef, useEffect, useMemo } from 'react';
import { BrandLogo } from '../brand/BrandLogo';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { CategoryService } from '../../services/commerceService';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    cartCount, 
    setIsCartOpen, 
    wishlist, 
    setIsSearchOpen, 
    currentPath, 
    navigate,
    categories: storeCategories,
    collections: storeCollections
  } = useStore();
  const { user, isAdmin } = useAuth();
  const categories = useMemo(() => storeCategories.filter(c => c.active !== false), [storeCategories]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);

  const shopDropdownRef = useRef<HTMLDivElement>(null);
  const collectionsDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shopDropdownRef.current && !shopDropdownRef.current.contains(e.target as Node)) {
        setShopDropdownOpen(false);
      }
      if (collectionsDropdownRef.current && !collectionsDropdownRef.current.contains(e.target as Node)) {
        setCollectionsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItemClass = (path: string) => {
    const isActive = path === '/' ? currentPath === '/' : currentPath.startsWith(path);
    return `text-xs font-medium uppercase tracking-[0.16em] transition-colors relative py-1 ${
      isActive 
        ? 'text-[#111111] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#111111]' 
        : 'text-[#111111]/80 hover:text-[#111111]'
    }`;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#DDD8CF] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo & Wordmark */}
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-3 cursor-pointer group py-2 select-none"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('/'); }}
          aria-label="TRENXURE Home"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-black flex items-center justify-center shrink-0">
            <BrandLogo className="w-full h-full object-contain p-1" alt="TRENXURE" priority />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#111111] uppercase transition-colors group-hover:text-[#B08A45]">
            TRENXURE
          </span>
        </div>

        {/* Center: Desktop Navigation Bar in exact requested order */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          <button 
            onClick={() => navigate('/')} 
            className={navItemClass('/')}
          >
            Home
          </button>

          {/* Shop Dropdown / Mega Menu */}
          <div 
            className="relative" 
            ref={shopDropdownRef}
            onMouseEnter={() => setShopDropdownOpen(true)}
            onMouseLeave={() => setShopDropdownOpen(false)}
          >
            <button 
              onClick={() => {
                navigate('/shop');
                setShopDropdownOpen(false);
              }}
              className={`flex items-center gap-1.5 ${navItemClass('/shop')}`}
            >
              <span>Shop</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${shopDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {shopDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] bg-white border border-[#DDD8CF] shadow-xl p-6 rounded-md grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div>
                  <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#111111] mb-3 pb-1 border-b border-[#DDD8CF]">
                    Garment Categories
                  </h4>
                  <ul className="space-y-2 text-xs text-[#77736B]">
                    {categories.slice(0, 7).map((cat) => (
                      <li key={cat.id}>
                        <button 
                          onClick={() => { navigate(`/shop?category=${cat.id}`); setShopDropdownOpen(false); }} 
                          className="hover:text-[#B08A45] hover:translate-x-1 transition-all flex items-center justify-between w-full text-left"
                        >
                          <span>{cat.name}</span>
                          {cat.id === 'blazers' && (
                            <span className="text-[10px] text-[#B08A45] font-semibold">Bestseller</span>
                          )}
                        </button>
                      </li>
                    ))}
                    <li>
                      <button 
                        onClick={() => { navigate('/shop'); setShopDropdownOpen(false); }} 
                        className="text-[#B08A45] hover:underline font-semibold pt-1 block"
                      >
                        All Categories →
                      </button>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#111111] mb-3 pb-1 border-b border-[#DDD8CF]">
                    Curated Styles
                  </h4>
                  <ul className="space-y-2 text-xs text-[#77736B]">
                    <li>
                      <button 
                        onClick={() => { navigate('/shop?style=Abstract'); setShopDropdownOpen(false); }} 
                        className="hover:text-[#B08A45] hover:translate-x-1 transition-all block w-full text-left"
                      >
                        Abstract Digital Expression
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => { navigate('/shop?style=Luxury'); setShopDropdownOpen(false); }} 
                        className="hover:text-[#B08A45] hover:translate-x-1 transition-all block w-full text-left"
                      >
                        Baroque & Royal Gold Leaf
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => { navigate('/shop?style=Geometric'); setShopDropdownOpen(false); }} 
                        className="hover:text-[#B08A45] hover:translate-x-1 transition-all block w-full text-left"
                      >
                        Architectural Bauhaus
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => { navigate('/shop?style=Floral'); setShopDropdownOpen(false); }} 
                        className="hover:text-[#B08A45] hover:translate-x-1 transition-all block w-full text-left"
                      >
                        Heritage Mughal Botanicals
                      </button>
                    </li>
                  </ul>

                  <div className="mt-4 pt-3 border-t border-[#DDD8CF]">
                    <button 
                      onClick={() => { navigate('/custom-look'); setShopDropdownOpen(false); }}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#B08A45] hover:text-[#111111] transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Custom Bespoke Studio →</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Collections Dropdown */}
          <div 
            className="relative" 
            ref={collectionsDropdownRef}
            onMouseEnter={() => setCollectionsDropdownOpen(true)}
            onMouseLeave={() => setCollectionsDropdownOpen(false)}
          >
            <button 
              onClick={() => {
                navigate('/collections');
                setCollectionsDropdownOpen(false);
              }}
              className={`flex items-center gap-1.5 ${navItemClass('/collections')}`}
            >
              <span>Collections</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${collectionsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {collectionsDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white border border-[#DDD8CF] shadow-xl p-4 rounded-md space-y-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                {storeCollections.filter(c => c.active !== false).map((col) => (
                  <button 
                    key={col.id}
                    onClick={() => { navigate(`/collections/${col.slug}`); setCollectionsDropdownOpen(false); }} 
                    className="block w-full text-left px-3 py-2 text-xs text-[#111111] hover:bg-[#F7F5F0] hover:text-[#B08A45] rounded transition-colors font-medium truncate"
                  >
                    {col.title}
                  </button>
                ))}
                <button 
                  onClick={() => { navigate('/lookbook'); setCollectionsDropdownOpen(false); }} 
                  className="block w-full text-left px-3 py-2 text-xs text-[#B08A45] hover:bg-[#F7F5F0] rounded transition-colors font-semibold border-t border-[#DDD8CF] mt-2 pt-2"
                >
                  View Editorial Lookbook →
                </button>
              </div>
            )}
          </div>

          <button 
            onClick={() => navigate('/lookbook')} 
            className={navItemClass('/lookbook')}
          >
            Lookbook
          </button>

          <button 
            onClick={() => navigate('/about')} 
            className={navItemClass('/about')}
          >
            About
          </button>

          <button 
            onClick={() => navigate('/contact')} 
            className={navItemClass('/contact')}
          >
            Contact
          </button>

          <button 
            onClick={() => navigate('/admin')} 
            className={navItemClass('/admin')}
          >
            Admin
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-[#111111] hover:text-[#B08A45] transition-colors"
            aria-label="Search products"
          >
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* Account Profile */}
          <button
            onClick={() => navigate('/account')}
            className="p-1.5 text-[#111111] hover:text-[#B08A45] transition-colors relative flex items-center justify-center rounded-full"
            aria-label="Customer Account"
            title={user ? `Signed in as ${user.displayName || user.email}` : 'Sign In'}
          >
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={user.displayName || 'Account'} 
                className="w-6 h-6 rounded-full object-cover border border-[#D0B16A]" 
              />
            ) : user ? (
              <div className="w-6 h-6 rounded-full bg-[#111111] text-[#D0B16A] text-[10px] font-bold flex items-center justify-center border border-[#D0B16A]">
                {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
              </div>
            ) : (
              <User className="w-5 h-5 stroke-[1.5]" />
            )}
            {user && (
              <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${isAdmin ? 'bg-[#D0B16A]' : 'bg-emerald-500'} ring-1 ring-white`} />
            )}
          </button>

          {/* Wishlist */}
          <button
            onClick={() => navigate('/wishlist')}
            className="p-2 text-[#111111] hover:text-[#B08A45] transition-colors relative"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.5]" />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1 w-2 h-2 rounded-full bg-[#B08A45]" />
            )}
          </button>

          {/* Cart Icon with Counter matching screenshot badge 0 */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 text-[#111111] hover:text-[#B08A45] transition-colors relative flex items-center"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            <span className="ml-1 text-xs font-semibold tabular-nums text-[#111111]">
              {cartCount}
            </span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-[#111111] hover:text-[#B08A45] transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#F7F5F0] border-r border-[#DDD8CF] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#DDD8CF]">
                <div 
                  onClick={() => { navigate('/'); setMobileMenuOpen(false); }} 
                  className="flex items-center gap-2.5 cursor-pointer select-none"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-black flex items-center justify-center shrink-0">
                    <BrandLogo className="w-full h-full object-contain p-1" alt="TRENXURE" />
                  </div>
                  <span className="font-serif text-lg font-bold tracking-[0.18em] text-[#111111] uppercase">
                    TRENXURE
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#77736B] hover:text-[#111111]"
                  aria-label="Close mobile menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                <button
                  onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
                  className="block w-full text-left text-sm font-semibold uppercase tracking-wider text-[#111111]"
                >
                  Home
                </button>
                <button
                  onClick={() => { navigate('/shop'); setMobileMenuOpen(false); }}
                  className="block w-full text-left text-sm font-semibold uppercase tracking-wider text-[#111111]"
                >
                  Shop All Garments
                </button>
                <div className="pl-4 space-y-2 border-l border-[#DDD8CF] text-xs text-[#77736B]">
                  <button onClick={() => { navigate('/blazers'); setMobileMenuOpen(false); }} className="block py-1 hover:text-[#111111]">Statement Blazers</button>
                  <button onClick={() => { navigate('/pants'); setMobileMenuOpen(false); }} className="block py-1 hover:text-[#111111]">Pleated Pants & Cargos</button>
                  <button onClick={() => { navigate('/t-shirts'); setMobileMenuOpen(false); }} className="block py-1 hover:text-[#111111]">T-Shirts (280 GSM)</button>
                  <button onClick={() => { navigate('/hoodies'); setMobileMenuOpen(false); }} className="block py-1 hover:text-[#111111]">Heavyweight Hoodies (420 GSM)</button>
                  <button onClick={() => { navigate('/coats'); setMobileMenuOpen(false); }} className="block py-1 hover:text-[#111111]">Overcoats & Trench</button>
                </div>
                <button
                  onClick={() => { navigate('/collections'); setMobileMenuOpen(false); }}
                  className="block w-full text-left text-sm font-semibold uppercase tracking-wider text-[#111111]"
                >
                  Collections & Capsules
                </button>
                <button
                  onClick={() => { navigate('/wishlist'); setMobileMenuOpen(false); }}
                  className="block w-full text-left text-sm font-semibold uppercase tracking-wider text-[#111111]"
                >
                  Saved Wishlist ({wishlist.length})
                </button>
                <button
                  onClick={() => { navigate('/lookbook'); setMobileMenuOpen(false); }}
                  className="block w-full text-left text-sm font-semibold uppercase tracking-wider text-[#111111]"
                >
                  Lookbook
                </button>
                <button
                  onClick={() => { navigate('/custom-look'); setMobileMenuOpen(false); }}
                  className="block w-full text-left text-sm font-semibold uppercase tracking-wider text-[#B08A45]"
                >
                  Design Your Own Look ✨
                </button>
                <button
                  onClick={() => { navigate('/about'); setMobileMenuOpen(false); }}
                  className="block w-full text-left text-sm font-semibold uppercase tracking-wider text-[#111111]"
                >
                  About Our Craft
                </button>
                <button
                  onClick={() => { navigate('/contact'); setMobileMenuOpen(false); }}
                  className="block w-full text-left text-sm font-semibold uppercase tracking-wider text-[#111111]"
                >
                  Contact
                </button>
                <button
                  onClick={() => { navigate('/admin'); setMobileMenuOpen(false); }}
                  className="block w-full text-left text-sm font-semibold uppercase tracking-wider text-[#111111]"
                >
                  Admin
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#DDD8CF] space-y-3">
              <button
                onClick={() => { navigate('/admin'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#D0B16A]" />
                <span>Admin Commerce Panel</span>
              </button>
              <p className="text-[11px] text-center text-[#77736B]">Karachi · Lahore · Worldwide</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
