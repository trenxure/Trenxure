import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Star, Heart, Check, ShoppingBag, Eye } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    formatMoney,
    navigate 
  } = useStore();

  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const activeVariant = selectedVariantId 
    ? quickViewProduct.variants.find(v => v.id === selectedVariantId) || quickViewProduct.variants[0]
    : quickViewProduct.variants[0];

  const inWish = isInWishlist(quickViewProduct.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={() => setQuickViewProduct(null)} 
      />

      <div className="relative bg-[#F7F5F0] border border-[#DDD8CF] w-full max-w-3xl rounded-lg shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-[#111111] rounded-full transition-colors shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Images */}
          <div className="bg-white p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#DDD8CF]">
            <div className="relative aspect-4/5 overflow-hidden rounded bg-[#F7F5F0]">
              <img
                src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              {quickViewProduct.newArrival && (
                <span className="absolute top-3 left-3 bg-[#111111] text-[#F7F5F0] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">
                  NEW
                </span>
              )}
            </div>

            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-14 h-16 rounded overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImageIndex === idx ? 'border-[#B08A45]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#77736B] uppercase tracking-wider mb-2">
                <span>{quickViewProduct.categoryName}</span>
                <div className="flex items-center gap-1 text-[#B08A45]">
                  <Star className="w-3.5 h-3.5 fill-[#B08A45]" />
                  <span className="font-semibold text-[#111111]">{quickViewProduct.averageRating}</span>
                  <span className="text-[#77736B]">({quickViewProduct.reviewsCount})</span>
                </div>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#111111] leading-tight mb-2">
                {quickViewProduct.name}
              </h3>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif text-2xl font-bold text-[#111111]">
                  {formatMoney(activeVariant?.price || quickViewProduct.basePrice)}
                </span>
                {quickViewProduct.compareAtPrice && (
                  <span className="text-sm text-[#77736B] line-through">
                    {formatMoney(quickViewProduct.compareAtPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#77736B] leading-relaxed mb-6 line-clamp-3">
                {quickViewProduct.description}
              </p>

              {/* Size selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-2 text-[#111111]">
                  <span>Select Size</span>
                  <span className="text-[11px] text-[#B08A45] normal-case">
                    {activeVariant?.stockQuantity && activeVariant.stockQuantity <= 3 
                      ? `Only ${activeVariant.stockQuantity} left!` 
                      : 'In Stock'}
                  </span>
                </div>
                <div className="flex gap-2">
                  {quickViewProduct.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      disabled={v.stockQuantity === 0}
                      className={`min-w-10 h-10 px-3 flex items-center justify-center text-xs font-semibold rounded border transition-all ${
                        activeVariant?.id === v.id
                          ? 'border-[#111111] bg-[#111111] text-white shadow-xs'
                          : v.stockQuantity === 0
                          ? 'border-[#DDD8CF] bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                          : 'border-[#DDD8CF] bg-white text-[#111111] hover:border-[#111111]'
                      }`}
                    >
                      {v.size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#DDD8CF]">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    addToCart(quickViewProduct, activeVariant?.id);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 py-3 bg-[#111111] hover:bg-[#B08A45] text-white text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 border rounded transition-colors ${
                    inWish ? 'border-red-500 text-red-500 bg-red-50' : 'border-[#DDD8CF] text-[#77736B] hover:text-[#111111] bg-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWish ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => {
                  setQuickViewProduct(null);
                  navigate(`/products/${quickViewProduct.slug}`);
                }}
                className="w-full text-center text-xs font-medium text-[#77736B] hover:text-[#111111] transition-colors"
              >
                View Full Product Specifications →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
