import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductService } from '../services/commerceService';
import { Search, SlidersHorizontal, X, Heart, Eye, ShoppingBag, ArrowRight } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const { navigate, formatMoney, toggleWishlist, isInWishlist, setQuickViewProduct, addToCart, showToast } = useStore();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Check URL search param
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const q = url.searchParams.get('q') || url.searchParams.get('search');
      if (q) setQuery(q);
    } catch {
      // ignore
    }
  }, []);

  const allProducts = useMemo(() => ProductService.getAll(), []);

  const searchResults = useMemo(() => {
    return allProducts.filter(p => {
      if (p.status !== 'active') return false;

      // Query filter
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesCategory = p.categoryName.toLowerCase().includes(q);
        const matchesStyle = p.style.toLowerCase().includes(q);
        const matchesMaterial = p.material.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesStyle && !matchesMaterial) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) {
        return false;
      }

      // Style filter
      if (selectedStyle !== 'all' && p.style !== selectedStyle) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.basePrice - b.basePrice;
      if (sortBy === 'price-high') return b.basePrice - a.basePrice;
      if (sortBy === 'rating') return b.averageRating - a.averageRating;
      return 0;
    });
  }, [allProducts, query, selectedCategory, selectedStyle, sortBy]);

  const popularSearches = [
    'Abstract Blazer',
    'Heavyweight Hoodie',
    'Velvet',
    'Pleated Cargo',
    'Floral Print',
    'Oversized T-Shirt',
    'Tapestry Coat'
  ];

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#77736B] mb-3 uppercase tracking-wider">
          <button onClick={() => navigate('/')} className="hover:text-[#111111] transition-colors">Home</button>
          <span>/</span>
          <span className="text-[#111111] font-semibold">Search Archive</span>
        </div>

        {/* Search Hero Input */}
        <div className="max-w-3xl mb-10">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#B08A45] block mb-2">
            Catalog Exploration
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#111111] mb-6">
            Search The Archive
          </h1>

          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by garment, print art, fabric, or style..."
              className="w-full pl-12 pr-10 py-4 bg-white border border-[#DDD8CF] focus:border-[#B08A45] rounded-xl text-base text-[#111111] placeholder:text-[#77736B]/60 shadow-xs outline-none transition-colors"
              autoFocus
            />
            <Search className="w-5 h-5 text-[#77736B] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[#77736B] hover:text-[#111111]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick search tags */}
          <div className="flex items-center gap-2 flex-wrap mt-3 text-xs text-[#77736B]">
            <span className="font-semibold text-[#111111]">Popular:</span>
            {popularSearches.map(term => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="hover:text-[#B08A45] transition-colors underline decoration-[#DDD8CF] underline-offset-2"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="pb-6 mb-8 border-b border-[#DDD8CF] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#111111] mr-1">Category:</span>
            {['all', 'blazers', 'pants', 't-shirts', 'hoodies', 'coats'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors capitalize ${
                  selectedCategory === cat
                    ? 'bg-[#111111] text-white font-semibold'
                    : 'bg-white border border-[#DDD8CF] text-[#77736B] hover:text-[#111111]'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-[#77736B]">
            <span>{searchResults.length} results found</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort search results"
              className="bg-white border border-[#DDD8CF] rounded-lg px-3 py-1.5 text-xs text-[#111111] outline-none"
            >
              <option value="featured">Featured Order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {searchResults.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#DDD8CF] rounded-2xl p-8 max-w-xl mx-auto">
            <p className="font-serif text-2xl text-[#111111] mb-2">No Garments Found</p>
            <p className="text-xs text-[#77736B] mb-6">
              We couldn't find any matches for "{query}". Try browsing our complete ready-to-wear catalog.
            </p>
            <button
              onClick={() => { setQuery(''); setSelectedCategory('all'); }}
              className="px-6 py-2.5 bg-[#111111] hover:bg-[#222222] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((product) => {
              const inWishlist = isInWishlist(product.id);
              const defaultVariant = product.variants.find(v => v.stockQuantity > 0) || product.variants[0];

              return (
                <div
                  key={product.id}
                  onClick={() => navigate(`/products/${product.slug}`)}
                  className="group bg-white border border-[#DDD8CF] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-3/4 bg-[#E8E4DC] overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                        loading="lazy"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                          inWishlist 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white/90 text-[#111111] hover:bg-white'
                        }`}
                        title="Wishlist"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuickViewProduct(product);
                        }}
                        className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between text-[11px] text-[#77736B] uppercase tracking-wider mb-1">
                        <span>{product.categoryName}</span>
                        <span>{product.style}</span>
                      </div>
                      <h3 className="font-serif text-base font-semibold text-[#111111] group-hover:text-[#B08A45] transition-colors truncate">
                        {product.name}
                      </h3>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-serif text-base font-bold text-[#111111] tabular-nums">
                          {formatMoney(product.basePrice)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-xs text-[#77736B] line-through tabular-nums">
                            {formatMoney(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, defaultVariant.id, 1);
                        showToast(`Added ${product.name} to shopping bag`, 'success');
                      }}
                      className="w-full py-2 bg-[#F7F5F0] hover:bg-[#111111] hover:text-white border border-[#DDD8CF] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchPage;
