import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { CouponService } from '../../services/commerceService';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    cartSubtotal, 
    formatMoney,
    navigate 
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 10000;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = CouponService.validate(couponCode, cartSubtotal);
    if (res.valid) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), discount: res.discount });
      setCouponError('');
    } else {
      setCouponError(res.message);
    }
  };

  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F5F0] border-l border-[#DDD8CF] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#DDD8CF] flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#111111]" />
              <h2 className="font-serif text-xl font-bold uppercase tracking-wider text-[#111111]">
                Shopping Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#77736B] hover:text-[#111111] hover:bg-[#F7F5F0] rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#E9E1D4]/60 px-6 py-3 border-b border-[#DDD8CF]">
            {remainingForFreeShipping > 0 ? (
              <p className="text-xs text-[#111111] font-medium mb-1.5 flex items-center justify-between">
                <span>Add <span className="font-bold text-[#B08A45]">{formatMoney(remainingForFreeShipping)}</span> more for Free Shipping</span>
                <span className="text-[10px] text-[#77736B]">{Math.round(freeShippingProgress)}%</span>
              </p>
            ) : (
              <p className="text-xs text-[#111111] font-medium mb-1.5 flex items-center gap-1.5 text-emerald-800">
                <Sparkles className="w-3.5 h-3.5 text-[#B08A45]" />
                <span>You've unlocked <strong>FREE Express Shipping</strong> across Pakistan!</span>
              </p>
            )}
            <div className="w-full bg-[#DDD8CF] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#B08A45] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-[#E9E1D4]/50 flex items-center justify-center text-[#77736B] mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#111111] mb-2">Your Bag is Empty</h3>
                <p className="text-xs text-[#77736B] max-w-xs mb-6">
                  Explore our luxury printed blazers, statement hoodies, and bespoke artisanal collections.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="px-6 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#B08A45] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 p-3 bg-white border border-[#DDD8CF] rounded-md transition-shadow hover:shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-20 h-24 object-cover rounded bg-[#F7F5F0] shrink-0"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=300&q=80';
                    }}
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 
                          onClick={() => {
                            setIsCartOpen(false);
                            navigate(`/products/${item.productSlug}`);
                          }}
                          className="font-serif text-sm font-bold text-[#111111] hover:text-[#B08A45] transition-colors cursor-pointer truncate"
                        >
                          {item.productName}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#77736B] hover:text-red-600 transition-colors p-0.5"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-[#77736B] mt-1">
                        <span>Size: <strong className="text-[#111111]">{item.size}</strong></span>
                        <span>·</span>
                        <span>{item.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F7F5F0]">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-[#DDD8CF] bg-[#F7F5F0] rounded">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#E9E1D4] text-[#111111] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#E9E1D4] text-[#111111] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-semibold text-xs tabular-nums text-[#111111]">
                        {formatMoney(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer calculation & CTAs */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#DDD8CF] space-y-3">
              {/* Promo form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. TRENXURE10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-[#DDD8CF] bg-[#F7F5F0] focus:outline-none focus:border-[#B08A45] uppercase tracking-wider"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E9E1D4] text-[#111111] hover:bg-[#DDD8CF] text-xs font-semibold tracking-wider transition-colors"
                >
                  Apply
                </button>
              </form>
              {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
              {appliedCoupon && (
                <div className="flex justify-between items-center text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded">
                  <span>Code <strong>{appliedCoupon.code}</strong> applied</span>
                  <span>-{formatMoney(appliedCoupon.discount)}</span>
                </div>
              )}

              {/* Subtotal breakdown */}
              <div className="space-y-1.5 pt-2 border-t border-[#DDD8CF] text-xs">
                <div className="flex justify-between text-[#77736B]">
                  <span>Subtotal</span>
                  <span className="tabular-nums text-[#111111] font-medium">{formatMoney(cartSubtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="tabular-nums font-medium">-{formatMoney(appliedCoupon.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#77736B]">
                  <span>Estimated Shipping</span>
                  <span className="tabular-nums text-[#111111] font-medium">
                    {remainingForFreeShipping === 0 ? 'FREE' : formatMoney(350)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#111111] pt-2 border-t border-[#DDD8CF]">
                  <span>Total</span>
                  <span className="tabular-nums text-[#B08A45]">
                    {formatMoney(grandTotal + (remainingForFreeShipping === 0 ? 0 : 350))}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full py-3.5 bg-[#111111] hover:bg-[#B08A45] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full py-2.5 text-center text-xs font-medium text-[#77736B] hover:text-[#111111] transition-colors"
                >
                  View Full Cart Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
