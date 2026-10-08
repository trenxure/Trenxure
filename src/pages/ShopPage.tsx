import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductService, CategoryService } from '../services/commerceService';
import { CategoryId, StyleTag, CollectionSlug } from '../types/commerce';
import { 
  Filter, 
  ChevronDown, 
  X, 
  ShoppingBag, 
  Heart, 
  Eye, 
  SlidersHorizontal,
  ArrowUpDown,
  Search
} from 'lucide-react';

export interface ShopPageProps {
  initialCategory?: string;
  initialCollection?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({ 
  initialCategory, 
  initialCollection 
}) => {
  const { 
    currentPath, 
    navigate, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct,
    formatMoney,
    products: allProducts,
    categories: allCategories
  } = useStore();

  // Parse query params from URL if present
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection || 'all');
  const [maxPrice, setMaxPrice] = useState<number>(35000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  // Sync state when props or URL params change
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
    if (initialCollection) {
      setSelectedCollection(initialCollection);
    }
  }, [initialCategory, initialCollection]);

  // Sync state with URL params on navigation
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const categoryParam = url.searchParams.get('category');
      const styleParam = url.searchParams.get('style');
      const collectionParam = url.searchParams.get('collection');
      const genderParam = url.searchParams.get('gender');
      const searchParam = url.searchParams.get('search');

      if (categoryParam) setSelectedCategory(categoryParam);
      if (styleParam) setSelectedStyle(styleParam);
      if (collectionParam) setSelectedCollection(collectionParam);
      if (genderParam) setSelectedGender(genderParam);
      if (searchParam) setSearchQuery(searchParam);
    } catch {
      // Fallback
    }
  }, [currentPath]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      if (product.status !== 'active') return false;

      // Category filter
      if (selectedCategory !== 'all' && product.categoryId !== selectedCategory) {
        return false;
      }

      // Style filter
      if (selectedStyle !== 'all' && product.style !== selectedStyle) {
        return false;
      }

      // Gender filter
      if (selectedGender !== 'all' && product.gender !== selectedGender && product.gender !== 'Unisex') {
        return false;
      }

      // Collection filter
      if (selectedCollection !== 'all' && !product.collectionIds.includes(selectedCollection as CollectionSlug)) {
        return false;
      }

      // Max price
      if (product.basePrice > maxPrice) {
        return false;
      }

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.tagline.toLowerCase().includes(q) ||
          product.categoryName.toLowerCase().includes(q) ||
          product.style.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.basePrice - b.basePrice;
      if (sortBy === 'price-high') return b.basePrice - a.basePrice;
      if (sortBy === 'rating') return b.averageRating - a.averageRating;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [allProducts, selectedCategory, selectedStyle, selectedGender, selectedCollection, maxPrice, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedStyle('all');
    setSelectedGender('all');
    setSelectedCollection('all');
    setMaxPrice(35000);
    setSearchQuery('');
    setSortBy('featured');
    navigate('/shop');
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedStyle !== 'all' || 
    selectedGender !== 'all' || 
    selectedCollection !== 'all' || 
    maxPrice < 35000 || 
    searchQuery.trim() !== '';

  const categoriesList = useMemo(() => {
    const rawCategories = allCategories.filter(c => c.active !== false);
    return [
      { id: 'all', label: 'All Garments' },
      ...rawCategories.map(c => ({ id: c.id, label: c.name }))
    ];
  }, [allCategories]);

  const stylesList: { id: string; label: string }[] = [
    { id: 'all', label: 'All Styles' },
    { id: 'Abstract', label: 'Abstract' },
    { id: 'Floral', label: 'Floral' },
    { id: 'Luxury', label: 'Luxury Baroque' },
    { id: 'Geometric', label: 'Geometric' },
    { id: 'Graffiti', label: 'Graffiti Street' },
    { id: 'Marble', label: 'Marble' },
    { id: 'Ethnic', label: 'Ethnic Tapestry' },
  ];

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#77736B] mb-2 uppercase tracking-wider">
            <button onClick={() => navigate('/')} className="hover:text-[#111111]">Home</button>
            <span>/</span>
            <span className="text-[#111111] font-semibold">Shop Collection</span>
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="text-[#B08A45] font-semibold capitalize">{selectedCategory}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#DDD8CF]">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111]">
                {selectedCategory !== 'all' 
                  ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Collection` 
                  : selectedStyle !== 'all' 
                  ? `${selectedStyle} Print Artworks` 
                  : 'All Garments & Bespoke Editions'}
              </h1>
              <p className="text-xs text-[#77736B] mt-1 max-w-xl leading-relaxed">
                {selectedCategory === 'blazers' && 'Sculpted single and double-breasted statement blazers in Italian cotton-viscose and bespoke velvet.'}
                {selectedCategory === 'pants' && 'Architectural pleated trousers and heavyweight street cargos engineered for fluid drape and movement.'}
                {selectedCategory === 't-shirts' && '280 GSM luxury combed cotton tees featuring museum-grade silkscreen and digital artwork.'}
                {selectedCategory === 'hoodies' && '420 GSM custom-milled French terry with metallic stipple art and drop-shoulder silhouettes.'}
                {selectedCategory === 'coats' && 'Wool-cashmere blend tailored overcoats featuring historic regional tapestry prints.'}
                {selectedCategory === 'all' && `Showing ${filteredProducts.length} handcrafted designer pieces from Karachi & Lahore ateliers`}
              </p>
            </div>

            {/* Mobile Filter & Sort Triggers */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-[#DDD8CF] rounded text-xs font-semibold uppercase tracking-wider text-[#111111]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {hasActiveFilters && '•'}</span>
              </button>

              <div className="flex items-center gap-2 bg-white border border-[#DDD8CF] rounded px-3 py-1.5 text-xs">
                <span className="text-[#77736B]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-semibold text-[#111111] focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Grid: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Filters Sidebar (Desktop + Mobile drawer) */}
          <div className={`
            md:block 
            ${isFilterSidebarOpen 
              ? 'fixed inset-0 z-50 bg-[#F7F5F0] p-6 overflow-y-auto block' 
              : 'hidden'}
          `}>
            {isFilterSidebarOpen && (
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#DDD8CF] md:hidden">
                <h3 className="font-serif text-lg font-bold">Filter Products</h3>
                <button onClick={() => setIsFilterSidebarOpen(false)} className="p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            <div className="space-y-6">
              {/* Active filters clear */}
              {hasActiveFilters && (
                <div className="flex items-center justify-between pb-4 border-b border-[#DDD8CF]">
                  <span className="text-xs font-semibold text-[#111111]">Active Filters</span>
                  <button
                    onClick={resetFilters}
                    className="text-xs text-[#B08A45] hover:underline font-medium"
                  >
                    Reset All
                  </button>
                </div>
              )}

              {/* Search Within Catalog */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2.5">
                  Search
                </h4>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search catalog..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-white border border-[#DDD8CF] rounded text-xs focus:outline-none focus:border-[#B08A45]"
                  />
                  <Search className="w-3.5 h-3.5 text-[#77736B] absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Categories Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2.5">
                  Garment Category
                </h4>
                <div className="space-y-1.5 text-xs">
                  {categoriesList.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`block w-full text-left px-2.5 py-1.5 rounded transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-[#111111] text-white font-medium'
                          : 'text-[#77736B] hover:text-[#111111] hover:bg-[#E9E1D4]/40'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Art Style Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2.5">
                  Art Style Print
                </h4>
                <div className="space-y-1.5 text-xs">
                  {stylesList.map(style => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`block w-full text-left px-2.5 py-1.5 rounded transition-colors ${
                        selectedStyle === style.id
                          ? 'bg-[#111111] text-white font-medium'
                          : 'text-[#77736B] hover:text-[#111111] hover:bg-[#E9E1D4]/40'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2.5">
                  Gender
                </h4>
                <div className="flex gap-2">
                  {['all', 'Men', 'Women'].map(gender => (
                    <button
                      key={gender}
                      onClick={() => setSelectedGender(gender)}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded border transition-colors ${
                        selectedGender === gender
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-white text-[#77736B] border-[#DDD8CF] hover:border-[#111111]'
                      }`}
                    >
                      {gender === 'all' ? 'All' : gender}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                  <span>Max Price</span>
                  <span className="tabular-nums text-[#B08A45]">{formatMoney(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="35000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#111111] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#77736B] mt-1">
                  <span>Rs. 5,000</span>
                  <span>Rs. 35,000</span>
                </div>
              </div>

              {isFilterSidebarOpen && (
                <button
                  onClick={() => setIsFilterSidebarOpen(false)}
                  className="w-full py-3 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider rounded mt-4 md:hidden"
                >
                  Apply Filters ({filteredProducts.length} items)
                </button>
              )}
            </div>
          </div>

          {/* Product Grid (Col 2-4) */}
          <div className="md:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-[#DDD8CF] rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F7F5F0] flex items-center justify-center text-[#77736B] mx-auto mb-4">
                  <Search className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#111111] mb-2">
                  No Matching Creations Found
                </h3>
                <p className="text-xs text-[#77736B] max-w-sm mx-auto mb-6">
                  Try adjusting your search criteria, selecting a different print style, or increasing your price filter.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#B08A45] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredProducts.map((product) => {
                  const inWish = isInWishlist(product.id);

                  return (
                    <div
                      key={product.id}
                      className="group flex flex-col justify-between"
                    >
                      {/* Image Container with Badges */}
                      <div className="relative aspect-3/4 rounded-xl overflow-hidden bg-white mb-3 shadow-xs transition-shadow group-hover:shadow-md">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-104 cursor-pointer"
                          onClick={() => navigate(`/products/${product.slug}`)}
                          referrerPolicy="no-referrer"
                        />

                        {product.newArrival && (
                          <span className="absolute top-2.5 left-2.5 bg-[#111111] text-[#F7F5F0] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs select-none">
                            NEW
                          </span>
                        )}

                        {/* Wishlist button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full transition-all duration-200 shadow-xs ${
                            inWish 
                              ? 'bg-white text-red-500 opacity-100' 
                              : 'bg-white/80 text-[#77736B] hover:text-[#111111] opacity-0 group-hover:opacity-100'
                          }`}
                          aria-label="Wishlist"
                        >
                          <Heart className={`w-3.5 h-3.5 ${inWish ? 'fill-current' : ''}`} />
                        </button>

                        {/* Quick View Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(product);
                          }}
                          className="absolute bottom-2.5 left-2.5 right-2.5 py-2 bg-white/95 backdrop-blur-xs text-[#111111] text-[10px] font-semibold uppercase tracking-wider rounded opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1.5 shadow-md hover:bg-[#111111] hover:text-white"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Quick View</span>
                        </button>
                      </div>

                      {/* Info Container */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-[10px] text-[#77736B] uppercase tracking-wider block">
                            {product.categoryName} · {product.style}
                          </span>
                          <h3 
                            onClick={() => navigate(`/products/${product.slug}`)}
                            className="font-serif text-sm font-medium text-[#111111] hover:text-[#B08A45] transition-colors cursor-pointer truncate"
                            title={product.name}
                          >
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-semibold text-[#111111] tabular-nums">
                              {formatMoney(product.basePrice)}
                            </span>
                            {product.compareAtPrice && (
                              <span className="text-[11px] text-[#77736B] line-through tabular-nums">
                                {formatMoney(product.compareAtPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Shopping Bag Quick Action */}
                        <button
                          onClick={() => addToCart(product)}
                          className="p-1.5 text-[#111111] hover:text-[#B08A45] hover:bg-[#E9E1D4]/50 rounded transition-colors shrink-0"
                          aria-label="Add to bag"
                          title="Add to bag"
                        >
                          <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
