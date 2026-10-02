import React, { useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductService } from '../services/commerceService';
import { Product } from '../types/commerce';
import { Heart, ShoppingBag, Trash2, ArrowRight, Eye } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    navigate, 
    formatMoney, 
    showToast,
    setQuickViewProduct
  } = useStore();

  const wishlistProducts = useMemo(() => {
    return wishlist
      .map(id => ProductService.getById(id))
      .filter((p): p is Product => Boolean(p));
  }, [wishlist]);

  const handleMoveToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultVariant = product.variants.find(v => v.stockQuantity > 0) || product.variants[0];
    addToCart(product, defaultVariant.id, 1);
    toggleWishlist(product.id);
    showToast(`Moved "${product.name}" to your shopping bag`, 'success');
  };

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#77736B] mb-3 uppercase tracking-wider">
          <button onClick={() => navigate('/')} className="hover:text-[#111111] transition-colors">Home</button>
          <span>/</span>
          <span className="text-[#111111] font-semibold">Wishlist</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#DDD8CF] mb-10">
          <div>
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#B08A45] block mb-1">
              Personal Vault
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#111111]">
              Saved Wishlist ({wishlistProducts.length})
            </h1>
          </div>
          {wishlistProducts.length > 0 && (
            <button
              onClick={() => navigate('/shop')}
              className="text-xs font-medium text-[#77736B] hover:text-[#111111] underline transition-colors"
            >
              Continue Browsing Collection
            </button>
          )}
        </div>

        {/* Content */}
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#DDD8CF] rounded-2xl p-8 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#F7F5F0] border border-[#DDD8CF] flex items-center justify-center mx-auto mb-4 text-[#77736B]">
              <Heart className="w-7 h-7 stroke-1" />
            </div>
            <h3 className="font-serif text-2xl font-normal text-[#111111] mb-2">
              Your Wishlist is Empty
            </h3>
            <p className="text-xs text-[#77736B] leading-relaxed max-w-sm mx-auto mb-6">
              Save your favorite blazers, heavyweight hoodies, and bespoke garments here to review or move to your shopping bag anytime.
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="px-6 py-3 bg-[#111111] hover:bg-[#222222] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 text-[#D0B16A]" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => {
              const activeVariants = product.variants.filter(v => v.stockQuantity > 0);
              const inStock = activeVariants.length > 0;

              return (
                <div
                  key={product.id}
                  className="group bg-white border border-[#DDD8CF] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image Area */}
                    <div 
                      onClick={() => navigate(`/products/${product.slug}`)}
                      className="relative aspect-3/4 bg-[#E8E4DC] overflow-hidden cursor-pointer"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Top Action Buttons */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-red-500 hover:bg-white shadow-xs transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
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

                      {!inStock && (
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-2xs flex items-center justify-center">
                          <span className="text-white text-xs font-semibold tracking-wider uppercase px-3 py-1 bg-black/80 rounded">
                            Sold Out
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="p-4">
                      <div className="flex items-center justify-between text-[11px] text-[#77736B] uppercase tracking-wider mb-1">
                        <span>{product.categoryName}</span>
                        <span>{product.style}</span>
                      </div>

                      <h3 
                        onClick={() => navigate(`/products/${product.slug}`)}
                        className="font-serif text-base font-semibold text-[#111111] group-hover:text-[#B08A45] transition-colors cursor-pointer truncate"
                      >
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

                      {/* Available sizes */}
                      <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#77736B]">
                        <span>Sizes:</span>
                        {product.variants.map(v => (
                          <span 
                            key={v.size}
                            className={`px-1 rounded ${v.stockQuantity > 0 ? 'text-[#111111] font-semibold' : 'text-[#77736B]/50 line-through'}`}
                          >
                            {v.size}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 pt-0">
                    <button
                      disabled={!inStock}
                      onClick={(e) => handleMoveToCart(product, e)}
                      className={`w-full py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        inStock 
                          ? 'bg-[#111111] hover:bg-[#222222] text-white' 
                          : 'bg-[#DDD8CF] text-[#77736B] cursor-not-allowed'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{inStock ? 'Move to Bag' : 'Out of Stock'}</span>
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

export default WishlistPage;
