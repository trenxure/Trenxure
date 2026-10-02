import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CouponService } from '../services/commerceService';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Sparkles } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    cartSubtotal, 
    formatMoney, 
    navigate,
    clearCart 
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

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
  const shippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 350;
  const grandTotal = Math.max(0, cartSubtotal + shippingFee - discountAmount);

  if (cart.length === 0) {
    return (
      <div className="bg-[#F7F5F0] min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-[#E9E1D4]/60 flex items-center justify-center text-[#77736B] mb-4">
          <ShoppingBag className="w-10 h-10 stroke-[1.2]" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#111111] mb-2">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs text-[#77736B] max-w-sm mb-6">
          Looks like you haven't added any designer blazers, hoodies, or bespoke creations yet.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="px-8 py-3.5 bg-[#111111] hover:bg-[#B08A45] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#DDD8CF]">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#111111]">
              Shopping Bag
            </h1>
            <p className="text-xs text-[#77736B] mt-1">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} garments in your bag
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-[#77736B] hover:text-red-600 transition-colors"
          >
            Clear Entire Bag
          </button>
        </div>

        {/* Free Shipping Bar */}
        <div className="bg-white p-4 rounded-xl border border-[#DDD8CF] mb-8">
          {remainingForFreeShipping > 0 ? (
            <p className="text-xs text-[#111111] mb-2">
              Add <strong className="text-[#B08A45]">{formatMoney(remainingForFreeShipping)}</strong> more to unlock <strong>FREE Express Shipping</strong> anywhere in Pakistan!
            </p>
          ) : (
            <p className="text-xs text-emerald-800 font-medium flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-[#B08A45]" />
              <span>You've unlocked <strong>FREE Shipping</strong> across Pakistan!</span>
            </p>
          )}
          <div className="w-full bg-[#E9E1D4] h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#B08A45] h-full transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* 2-Column: Cart Table + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Table (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#DDD8CF] p-6 shadow-xs overflow-hidden">
            <div className="divide-y divide-[#DDD8CF]">
              {cart.map((item) => (
                <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-20 h-24 object-cover rounded-lg bg-[#F7F5F0] shrink-0"
                    />
                    <div>
                      <h3 
                        onClick={() => navigate(`/products/${item.productSlug}`)}
                        className="font-serif text-base font-bold text-[#111111] hover:text-[#B08A45] cursor-pointer transition-colors"
                      >
                        {item.productName}
                      </h3>
                      <p className="text-xs text-[#77736B] mt-0.5">
                        Color: <span className="text-[#111111] font-medium">{item.color}</span> · Size: <span className="text-[#111111] font-medium">{item.size}</span>
                      </p>
                      <p className="text-xs font-semibold text-[#111111] mt-1 tabular-nums">
                        {formatMoney(item.price)} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#DDD8CF] rounded bg-[#F7F5F0]">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-[#E9E1D4] text-[#111111]"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-[#E9E1D4] text-[#111111]"
                        aria-label="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Line total */}
                    <span className="font-serif text-base font-bold text-[#111111] tabular-nums min-w-24 text-right">
                      {formatMoney(item.price * item.quantity)}
                    </span>

                    {/* Delete */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-[#77736B] hover:text-red-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#DDD8CF] p-6 shadow-xs space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#111111] pb-3 border-b border-[#DDD8CF]">
              Order Summary
            </h3>

            {/* Promo code */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block">
                Promotional Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. TRENXURE10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-[#DDD8CF] rounded bg-[#F7F5F0] uppercase tracking-wider focus:outline-none focus:border-[#B08A45]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#111111] text-white hover:bg-[#B08A45] text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
              {appliedCoupon && (
                <p className="text-[11px] text-emerald-800 font-medium">
                  ✓ Applied {appliedCoupon.code}: {formatMoney(appliedCoupon.discount)} discount
                </p>
              )}
            </form>

            {/* Calculations */}
            <div className="space-y-2.5 text-xs text-[#77736B] pt-4 border-t border-[#DDD8CF]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums text-[#111111] font-semibold">{formatMoney(cartSubtotal)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Discount</span>
                  <span className="tabular-nums font-semibold">-{formatMoney(appliedCoupon.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Standard Delivery</span>
                <span className="tabular-nums text-[#111111] font-semibold">
                  {shippingFee === 0 ? 'FREE' : formatMoney(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#111111] pt-3 border-t border-[#DDD8CF]">
                <span>Estimated Total</span>
                <span className="tabular-nums text-[#B08A45]">{formatMoney(grandTotal)}</span>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-[#111111] hover:bg-[#B08A45] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-lg transition-all flex items-center justify-center gap-2 group shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => navigate('/shop')}
              className="w-full text-center text-xs text-[#77736B] hover:text-[#111111] transition-colors"
            >
              ← Continue Shopping
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
