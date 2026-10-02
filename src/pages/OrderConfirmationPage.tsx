import React, { useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { OrderService } from '../services/commerceService';
import { CheckCircle2, Package, Truck, Clock, ArrowRight, Printer, Share2 } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { navigate, formatMoney } = useStore();

  // Extract order number from URL query
  const orderNumber = useMemo(() => {
    try {
      const url = new URL(window.location.href);
      return url.searchParams.get('orderNumber') || 'TRX-94821';
    } catch {
      return 'TRX-94821';
    }
  }, []);

  const order = useMemo(() => {
    return OrderService.getById(orderNumber) || OrderService.getAll()[0];
  }, [orderNumber]);

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-[#F7F5F0]">
        <h2 className="font-serif text-3xl font-bold mb-4">Order Not Found</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-[#111111] text-white text-xs font-semibold uppercase tracking-widest"
        >
          Return Home
        </button>
      </div>
    );
  }

  const steps = [
    { title: 'Order Placed', status: 'done', desc: 'Received by atelier' },
    { title: 'Confirmed', status: 'done', desc: 'Inventory allocated' },
    { title: 'Quality Inspection', status: order.status === 'confirmed' ? 'active' : 'done', desc: 'Handcrafted checks' },
    { title: 'Dispatched', status: order.status === 'shipped' || order.status === 'delivered' ? 'done' : 'upcoming', desc: 'TCS Courier pickup' },
    { title: 'Delivered', status: order.status === 'delivered' ? 'done' : 'upcoming', desc: 'Doorstep arrival' },
  ];

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Celebration Box */}
        <div className="bg-white rounded-2xl border border-[#DDD8CF] p-8 md:p-10 shadow-sm text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
          </div>

          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#B08A45] block mb-1">
            THANK YOU FOR YOUR PATRONAGE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#111111] mb-2">
            Order #{order.orderNumber} Confirmed
          </h1>
          <p className="text-xs text-[#77736B] max-w-md mx-auto leading-relaxed">
            We have dispatched an email confirmation to <strong>{order.customerEmail}</strong>. Our Karachi artisans have initiated preparation of your bespoke garment.
          </p>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 mt-6 border-t border-[#DDD8CF] text-xs">
            <div>
              <span className="text-[#77736B] block">Order Date</span>
              <strong className="text-[#111111]">{new Date(order.createdAt).toLocaleDateString()}</strong>
            </div>
            <div>
              <span className="text-[#77736B] block">Payment Method</span>
              <strong className="text-[#111111] uppercase">{order.paymentMethod} ({order.paymentStatus})</strong>
            </div>
            <div>
              <span className="text-[#77736B] block">Estimated Delivery</span>
              <strong className="text-[#B08A45]">2 - 4 Business Days</strong>
            </div>
            {order.trackingNumber && (
              <div>
                <span className="text-[#77736B] block">Courier Tracking</span>
                <strong className="text-[#111111] font-mono">{order.trackingNumber}</strong>
              </div>
            )}
          </div>
        </div>

        {/* Live Tracking Progress Timeline */}
        <div className="bg-white rounded-2xl border border-[#DDD8CF] p-6 md:p-8 shadow-sm mb-8">
          <h3 className="font-serif text-lg font-bold text-[#111111] mb-6">
            Live Package Status
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
            {steps.map((st, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 transition-all ${
                  st.status === 'done'
                    ? 'bg-[#111111] text-[#D0B16A]'
                    : st.status === 'active'
                    ? 'bg-[#B08A45] text-white ring-4 ring-[#B08A45]/20 animate-pulse'
                    : 'bg-[#F7F5F0] text-[#77736B] border border-[#DDD8CF]'
                }`}>
                  {st.status === 'done' ? '✓' : i + 1}
                </div>
                <p className="font-serif text-xs font-bold text-[#111111]">{st.title}</p>
                <p className="text-[10px] text-[#77736B] mt-0.5">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details & Receipt */}
        <div className="bg-white rounded-2xl border border-[#DDD8CF] p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#DDD8CF]">
            <h3 className="font-serif text-xl font-bold text-[#111111]">
              Itemized Receipt
            </h3>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 text-xs text-[#77736B] hover:text-[#111111] transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
          </div>

          {/* Items Table */}
          <div className="divide-y divide-[#DDD8CF]">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-4 first:pt-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-20 object-cover rounded-lg bg-[#F7F5F0] shrink-0"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#111111]">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#77736B]">
                      SKU: <span className="font-mono">{item.sku}</span> · Size: {item.size} · Color: {item.color}
                    </p>
                    <p className="text-xs text-[#77736B]">
                      Qty: {item.quantity} × {formatMoney(item.price)}
                    </p>
                  </div>
                </div>

                <span className="font-serif text-sm font-bold text-[#111111] tabular-nums">
                  {formatMoney(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Financial summary */}
          <div className="pt-4 border-t border-[#DDD8CF] space-y-2 text-xs text-[#77736B] max-w-xs ml-auto">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="tabular-nums text-[#111111] font-semibold">{formatMoney(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount ({order.couponCode}):</span>
                <span className="tabular-nums font-semibold">-{formatMoney(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Courier Delivery:</span>
              <span className="tabular-nums text-[#111111] font-semibold">
                {order.shippingFee === 0 ? 'FREE' : formatMoney(order.shippingFee)}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#111111] pt-2 border-t border-[#DDD8CF]">
              <span>Total Paid/Due:</span>
              <span className="tabular-nums text-[#B08A45]">{formatMoney(order.total)}</span>
            </div>
          </div>

          {/* Shipping Address snapshot */}
          <div className="pt-6 border-t border-[#DDD8CF] text-xs text-[#77736B]">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
              Delivering to:
            </h4>
            <p className="text-[#111111] font-medium">{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.addressLine1}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.province}, {order.shippingAddress.postalCode}</p>
            <p className="text-[#111111] mt-1">Contact: {order.shippingAddress.phone}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
          <button
            onClick={() => navigate('/account')}
            className="px-6 py-3 bg-white border border-[#DDD8CF] hover:border-[#111111] text-[#111111] text-xs font-semibold uppercase tracking-wider rounded transition-colors"
          >
            View All Orders in Account
          </button>

          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-[#111111] hover:bg-[#B08A45] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
