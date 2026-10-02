import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductService } from '../../services/commerceService';
import { Search, X, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigate, formatMoney } = useStore();
  const [query, setQuery] = useState('');

  const products = useMemo(() => ProductService.getAll(), []);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.style.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query, products]);

  if (!isSearchOpen) return null;

  const popularSearches = ['Abstract Print Blazer', 'Hoodies', 'Floral', 'Bespoke', 'Overcoat', 'T-Shirts'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
        onClick={() => setIsSearchOpen(false)} 
      />

      <div className="relative bg-[#F7F5F0] border border-[#DDD8CF] w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden z-10 animate-in fade-in slide-in-from-top-4 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#DDD8CF] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#B08A45] shrink-0" />
          <input
            type="text"
            placeholder="Search by print, style, blazer, hoodie, or fabric..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-[#111111] placeholder:text-[#77736B] text-sm focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-xs text-[#77736B] hover:text-[#111111] px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-[#77736B] hover:text-[#111111] rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results or Quick Suggestions */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs font-semibold text-[#77736B] uppercase tracking-wider mb-3">
                Trending Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-white border border-[#DDD8CF] hover:border-[#B08A45] text-xs text-[#111111] rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-8">
              <p className="font-serif text-lg text-[#111111]">No creations found matching "{query}"</p>
              <p className="text-xs text-[#77736B] mt-1">Try searching for "Blazer", "Geometric", or "Hoodie"</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-[#77736B] uppercase tracking-wider mb-2">
                Found {searchResults.length} Products
              </p>
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    navigate(`/products/${product.slug}`);
                  }}
                  className="flex items-center gap-4 p-3 bg-white hover:bg-[#E9E1D4]/40 border border-[#DDD8CF] rounded-lg cursor-pointer transition-colors group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-14 h-16 object-cover rounded bg-[#F7F5F0] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] text-[#77736B] uppercase tracking-widest">
                      <span>{product.categoryName}</span>
                      <span>·</span>
                      <span className="text-[#B08A45]">{product.style} Style</span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-[#111111] group-hover:text-[#B08A45] transition-colors truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs font-semibold tabular-nums text-[#111111]">
                      {formatMoney(product.basePrice)}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#77736B] group-hover:text-[#111111] group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Link */}
        {query.trim() && searchResults.length > 0 && (
          <div className="p-3 bg-[#E9E1D4]/50 border-t border-[#DDD8CF] text-center">
            <button
              onClick={() => {
                setIsSearchOpen(false);
                navigate(`/shop?search=${encodeURIComponent(query)}`);
              }}
              className="text-xs font-semibold text-[#111111] hover:text-[#B08A45] transition-colors"
            >
              View all results in Shop catalog →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
