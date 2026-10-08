import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { OrderService, CouponService } from '../services/commerceService';
import { PaymentMethod, ShippingAddress } from '../types/commerce';
import { BrandLogo } from '../components/brand/BrandLogo';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Lock, 
  ArrowRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, formatMoney, navigate, clearCart, showToast } = useStore();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [shippingType, setShippingType] = useState<'standard' | 'priority'>('standard');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: user?.displayName || '',
    phone: '',
    email: user?.email || '',
    addressLine1: '',
    addressLine2: '',
    city: 'Karachi',
    province: 'Sindh',
    postalCode: '75500',
    country: 'Pakistan'
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || user.displayName || '',
        email: prev.email || user.email || ''
      }));
    }
  }, [user]);

  const citiesPakistan = [
    { city: 'Karachi', province: 'Sindh' },
    { city: 'Lahore', province: 'Punjab' },
    { city: 'Islamabad', province: 'Federal Capital' },
    { city: 'Rawalpindi', province: 'Punjab' },
    { city: 'Faisalabad', province: 'Punjab' },
    { city: 'Multan', province: 'Punjab' },
    { city: 'Peshawar', province: 'Khyber Pakhtunkhwa' },
    { city: 'Quetta', province: 'Balochistan' },
    { city: 'Sialkot', province: 'Punjab' },
    { city: 'Gujranwala', province: 'Punjab' },
  ];

  if (cart.length === 0) {
    return (
      <div className="bg-[#F7F5F0] min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="font-serif text-3xl font-bold mb-2">No Items to Checkout</h2>
        <p className="text-xs text-[#77736B] mb-6">Your shopping bag is currently empty.</p>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-3 bg-[#111111] text-white text-xs font-semibold uppercase tracking-widest"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  // Calculations
  const FREE_SHIPPING_THRESHOLD = 10000;
  const baseShippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 350;
  const shippingFee = shippingType === 'priority' ? baseShippingFee + 500 : baseShippingFee;

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
  const grandTotal = Math.max(0, cartSubtotal + shippingFee - discountAmount);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName || !formData.phone || !formData.email || !formData.addressLine1) {
      setErrorMessage('Please complete all required shipping fields.');
      return;
    }

    setIsProcessing(true);

    try {
      const res = await OrderService.createOrder({
        userId: user ? user.uid : undefined,
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: formData,
        items: cart,
        couponCode: appliedCoupon?.code,
        paymentMethod: paymentMethod
      });

      if (res.success && res.order) {
        clearCart();
        showToast(`Order ${res.order.orderNumber} placed successfully!`, 'success');
        navigate(`/order-confirmation?orderNumber=${res.order.orderNumber}`);
      } else {
        setErrorMessage(res.error || 'Failed to place order. Please review your cart.');
      }
    } catch (err) {
      console.error('Order creation error:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Failed to securely record order in database.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="flex justify-center mb-4">
            <button onClick={() => navigate('/')} className="hover:opacity-90 transition-opacity">
              <BrandLogo className="h-12 w-auto max-h-12" alt="TRENXURE" priority />
            </button>
          </div>
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#B08A45] block mb-1">
            SECURE CHECKOUT
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#111111]">
            Delivery & Payment
          </h1>
          <p className="text-xs text-[#77736B] flex items-center justify-center gap-1.5 mt-2">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-bit Encrypted · Real-Time Order Verification</span>
          </p>
        </div>

        {errorMessage && (
          <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Form Details (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Customer Contact */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DDD8CF] shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#DDD8CF]">
                  <span className="w-6 h-6 rounded-full bg-[#111111] text-[#D0B16A] text-xs font-bold flex items-center justify-center">1</span>
                  <h3 className="font-serif text-lg font-bold text-[#111111]">Contact Information</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hamza Tariq"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs bg-[#F7F5F0] border border-[#DDD8CF] rounded focus:outline-none focus:border-[#B08A45]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block mb-1">
                      Phone Number (For Courier SMS) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs bg-[#F7F5F0] border border-[#DDD8CF] rounded focus:outline-none focus:border-[#B08A45]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block mb-1">
                    Email Address (For Order Receipt & Tracking) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="hamza@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#F7F5F0] border border-[#DDD8CF] rounded focus:outline-none focus:border-[#B08A45]"
                  />
                </div>
              </div>

              {/* Step 2: Delivery Address */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DDD8CF] shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#DDD8CF]">
                  <span className="w-6 h-6 rounded-full bg-[#111111] text-[#D0B16A] text-xs font-bold flex items-center justify-center">2</span>
                  <h3 className="font-serif text-lg font-bold text-[#111111]">Shipping Address in Pakistan</h3>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block mb-1">
                    Street Address & House/Apartment No. *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House 42, Street 7, Phase 6 DHA"
                    value={formData.addressLine1}
                    onChange={e => setFormData({ ...formData, addressLine1: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-[#F7F5F0] border border-[#DDD8CF] rounded focus:outline-none focus:border-[#B08A45]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block mb-1">
                      City *
                    </label>
                    <select
                      value={formData.city}
                      onChange={e => {
                        const selCity = e.target.value;
                        const match = citiesPakistan.find(c => c.city === selCity);
                        setFormData({
                          ...formData,
                          city: selCity,
                          province: match ? match.province : formData.province
                        });
                      }}
                      className="w-full px-3 py-2.5 text-xs bg-[#F7F5F0] border border-[#DDD8CF] rounded focus:outline-none focus:border-[#B08A45]"
                    >
                      {citiesPakistan.map(c => (
                        <option key={c.city} value={c.city}>{c.city}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block mb-1">
                      Province
                    </label>
                    <input
                      type="text"
                      value={formData.province}
                      onChange={e => setFormData({ ...formData, province: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs bg-[#F7F5F0] border border-[#DDD8CF] rounded focus:outline-none focus:border-[#B08A45]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      placeholder="75500"
                      value={formData.postalCode}
                      onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs bg-[#F7F5F0] border border-[#DDD8CF] rounded focus:outline-none focus:border-[#B08A45]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Shipping Method */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DDD8CF] shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#DDD8CF]">
                  <span className="w-6 h-6 rounded-full bg-[#111111] text-[#D0B16A] text-xs font-bold flex items-center justify-center">3</span>
                  <h3 className="font-serif text-lg font-bold text-[#111111]">Delivery Speed</h3>
                </div>

                <div className="space-y-3">
                  <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    shippingType === 'standard' ? 'border-[#111111] bg-[#F7F5F0] shadow-xs' : 'border-[#DDD8CF]'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingType === 'standard'}
                        onChange={() => setShippingType('standard')}
                        className="accent-[#111111]"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#111111]">Standard Express (2 - 4 Business Days)</p>
                        <p className="text-[11px] text-[#77736B]">TCS / Leopards courier with live online tracking</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold tabular-nums text-[#111111]">
                      {baseShippingFee === 0 ? 'FREE' : formatMoney(350)}
                    </span>
                  </label>

                  <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    shippingType === 'priority' ? 'border-[#111111] bg-[#F7F5F0] shadow-xs' : 'border-[#DDD8CF]'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingType === 'priority'}
                        onChange={() => setShippingType('priority')}
                        className="accent-[#111111]"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#111111]">Priority Overnight Rush (Next Day in Karachi & Lahore)</p>
                        <p className="text-[11px] text-[#77736B]">Dispatched same day in signature luxury rigid dustbox</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold tabular-nums text-[#B08A45]">
                      {formatMoney(baseShippingFee + 500)}
                    </span>
                  </label>
                </div>
              </div>

              {/* Step 4: Payment Method */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DDD8CF] shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#DDD8CF]">
                  <span className="w-6 h-6 rounded-full bg-[#111111] text-[#D0B16A] text-xs font-bold flex items-center justify-center">4</span>
                  <h3 className="font-serif text-lg font-bold text-[#111111]">Payment Method</h3>
                </div>

                <div className="space-y-3">
                  {/* COD */}
                  <label className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod' ? 'border-[#111111] bg-[#F7F5F0] shadow-xs' : 'border-[#DDD8CF]'
                  }`}>
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-[#111111] mt-0.5"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-[#B08A45]" />
                          <p className="text-xs font-bold text-[#111111]">Cash on Delivery (COD)</p>
                        </div>
                        <p className="text-[11px] text-[#77736B] mt-0.5">Pay in cash to the delivery rider upon receiving your package.</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white border border-[#DDD8CF] px-2 py-0.5 rounded text-[#111111]">
                      POPULAR
                    </span>
                  </label>

                  {/* Card */}
                  <label className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'card' ? 'border-[#111111] bg-[#F7F5F0] shadow-xs' : 'border-[#DDD8CF]'
                  }`}>
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="accent-[#111111] mt-0.5"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#B08A45]" />
                          <p className="text-xs font-bold text-[#111111]">Credit or Debit Card</p>
                        </div>
                        <p className="text-[11px] text-[#77736B] mt-0.5">Visa, MasterCard, or UnionPay processed securely.</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-[9px] font-bold bg-white border border-[#DDD8CF] px-1.5 py-0.5 rounded text-blue-900">VISA</span>
                      <span className="text-[9px] font-bold bg-white border border-[#DDD8CF] px-1.5 py-0.5 rounded text-red-600">MC</span>
                    </div>
                  </label>

                  {/* JazzCash / EasyPaisa */}
                  <label className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'jazzcash' ? 'border-[#111111] bg-[#F7F5F0] shadow-xs' : 'border-[#DDD8CF]'
                  }`}>
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'jazzcash'}
                        onChange={() => setPaymentMethod('jazzcash')}
                        className="accent-[#111111] mt-0.5"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-[#B08A45]" />
                          <p className="text-xs font-bold text-[#111111]">JazzCash / EasyPaisa Mobile Wallet</p>
                        </div>
                        <p className="text-[11px] text-[#77736B] mt-0.5">Instant mobile account debit via biometric OTP.</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold bg-white border border-[#DDD8CF] px-1.5 py-0.5 rounded text-red-700">
                      JazzCash
                    </span>
                  </label>
                </div>
              </div>

            </div>

            {/* Right Column: Order Review & Placement (5 cols) */}
            <div className="lg:col-span-5 sticky top-24 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DDD8CF] shadow-xs space-y-6">
                <h3 className="font-serif text-xl font-bold text-[#111111] pb-3 border-b border-[#DDD8CF]">
                  Order Items ({cart.reduce((s, i) => s + i.quantity, 0)})
                </h3>

                {/* Items preview */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.image} alt={item.productName} className="w-12 h-14 object-cover rounded bg-[#F7F5F0] shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-xs font-bold text-[#111111] truncate">{item.productName}</p>
                        <p className="text-[11px] text-[#77736B]">Size: {item.size} · Qty: {item.quantity}</p>
                      </div>
                      <span className="text-xs font-semibold tabular-nums text-[#111111]">
                        {formatMoney(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo code input */}
                <div className="pt-4 border-t border-[#DDD8CF]">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-[#F7F5F0] border border-[#DDD8CF] rounded uppercase tracking-wider focus:outline-none focus:border-[#B08A45]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-[#111111] text-white hover:bg-[#B08A45] text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
                  {appliedCoupon && (
                    <p className="text-[11px] text-emerald-800 font-medium mt-1">
                      ✓ Code {appliedCoupon.code} applied (-{formatMoney(appliedCoupon.discount)})
                    </p>
                  )}
                </div>

                {/* Calculation breakdown */}
                <div className="space-y-2 text-xs text-[#77736B] pt-4 border-t border-[#DDD8CF]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="tabular-nums text-[#111111] font-semibold">{formatMoney(cartSubtotal)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount</span>
                      <span className="tabular-nums font-semibold">-{formatMoney(appliedCoupon.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span className="tabular-nums text-[#111111] font-semibold">
                      {shippingFee === 0 ? 'FREE' : formatMoney(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#111111] pt-3 border-t border-[#DDD8CF]">
                    <span>Total Amount</span>
                    <span className="tabular-nums text-[#B08A45]">{formatMoney(grandTotal)}</span>
                  </div>
                </div>

                {/* Place Order CTA */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-[#111111] hover:bg-[#B08A45] disabled:bg-gray-400 text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group"
                >
                  {isProcessing ? (
                    <span>Allocating Inventory & Placing Order...</span>
                  ) : (
                    <>
                      <span>Confirm & Place Order ({formatMoney(grandTotal)})</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-[#77736B] flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Includes 14-day hassle-free doorstep exchange guarantee</span>
                </p>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
