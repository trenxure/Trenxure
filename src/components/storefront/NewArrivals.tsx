import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductService } from '../../services/commerceService';
import { ShoppingBag, Heart, ArrowRight, Eye } from 'lucide-react';

export const NewArrivals: React.FC = () => {
  const { 
    navigate, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct,
    formatMoney 
  } = useStore();

  const products = ProductService.getAll().filter(p => p.newArrival).slice(0, 5);

  return (
    <section className="py-12 md:py-16 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Horizontal Line matching screenshot */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111] whitespace-nowrap">
              New Arrivals
            </h2>
            <div className="h-[1px] bg-[#DDD8CF] flex-1 max-w-xs sm:max-w-md" />
          </div>

          <button
            onClick={() => navigate('/shop?collection=new-arrivals')}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#111111] hover:text-[#B08A45] transition-colors shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5 Product Cards Grid matching screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {products.map((product) => {
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

                  {/* "NEW" badge matching screenshot */}
                  <span className="absolute top-2.5 left-2.5 bg-[#111111] text-[#F7F5F0] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs select-none">
                    NEW
                  </span>

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

                {/* Info Container matching screenshot */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 
                      onClick={() => navigate(`/products/${product.slug}`)}
                      className="font-serif text-sm font-medium text-[#111111] hover:text-[#B08A45] transition-colors cursor-pointer truncate"
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#111111] mt-0.5 tabular-nums">
                      {formatMoney(product.basePrice)}
                    </p>
                  </div>

                  {/* Shopping Bag Quick Action matching screenshot */}
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

      </div>
    </section>
  );
};
