import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { OrderService, ProductService } from '../services/commerceService';
import { 
  Package, 
  Heart, 
  MapPin, 
  User, 
  Clock, 
  ShoppingBag, 
  Trash2, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, formatMoney, navigate, showToast } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'profile'>('orders');

  const orders = OrderService.getAll();
  const wishlistProducts = wishlist.map(id => ProductService.getById(id)).filter(Boolean);

  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      fullName: 'Hamza Tariq',
      phone: '+92 300 8492019',
      addressLine1: 'House 42, Street 7, Phase 6 DHA',
      city: 'Karachi',
      province: 'Sindh',
      postalCode: '75500',
      isDefault: true
    }
  ]);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    city: 'Karachi',
    province: 'Sindh',
    postalCode: ''
  });

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.fullName || !newAddress.addressLine1) return;
    setAddresses(prev => [...prev, { ...newAddress, id: `addr-${Date.now()}`, isDefault: false }]);
    setShowAddressModal(false);
    setNewAddress({ fullName: '', phone: '', addressLine1: '', city: 'Karachi', province: 'Sindh', postalCode: '' });
    showToast('New shipping address saved', 'success');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'packed':
      case 'processing':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-2xl border border-[#DDD8CF] p-6 sm:p-8 mb-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#111111] text-[#D0B16A] flex items-center justify-center font-serif text-2xl font-bold">
              HT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-[#111111]">Hamza Tariq</h1>
                <span className="px-2.5 py-0.5 bg-[#B08A45]/15 text-[#B08A45] border border-[#B08A45]/30 text-[10px] font-bold uppercase tracking-wider rounded-full">
                  VIP Patron
                </span>
              </div>
              <p className="text-xs text-[#77736B]">hamza.tariq@example.com · +92 300 8492019 · Karachi, Pakistan</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate('/admin')}
              className="px-4 py-2 bg-[#E9E1D4] hover:bg-[#DDD8CF] text-[#111111] text-xs font-semibold uppercase tracking-wider rounded transition-colors"
            >
              Open Admin Console
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-[#DDD8CF] mb-8 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all shrink-0 ${
              activeTab === 'orders'
                ? 'border-[#111111] text-[#111111] bg-white rounded-t-lg'
                : 'border-transparent text-[#77736B] hover:text-[#111111]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all shrink-0 ${
              activeTab === 'wishlist'
                ? 'border-[#111111] text-[#111111] bg-white rounded-t-lg'
                : 'border-transparent text-[#77736B] hover:text-[#111111]'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all shrink-0 ${
              activeTab === 'addresses'
                ? 'border-[#111111] text-[#111111] bg-white rounded-t-lg'
                : 'border-transparent text-[#77736B] hover:text-[#111111]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Addresses ({addresses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all shrink-0 ${
              activeTab === 'profile'
                ? 'border-[#111111] text-[#111111] bg-white rounded-t-lg'
                : 'border-transparent text-[#77736B] hover:text-[#111111]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Preferences</span>
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-[#DDD8CF] text-center">
                <Package className="w-12 h-12 text-[#77736B] mx-auto mb-3" />
                <h3 className="font-serif text-xl font-bold text-[#111111]">No Orders Yet</h3>
                <p className="text-xs text-[#77736B] mt-1 mb-6">Discover our latest statement prints and blazers.</p>
                <button
                  onClick={() => navigate('/shop')}
                  className="px-6 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider rounded"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-2xl border border-[#DDD8CF] p-6 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DDD8CF]">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-lg font-bold text-[#111111]">{ord.orderNumber}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusBadge(ord.status)}`}>
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#77736B] mt-0.5">
                        Placed on {new Date(ord.createdAt).toLocaleDateString()} · Payment: <strong className="uppercase">{ord.paymentMethod}</strong> ({ord.paymentStatus})
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xs text-[#77736B] block">Total Amount</span>
                      <span className="font-serif text-lg font-bold text-[#111111] tabular-nums">{formatMoney(ord.total)}</span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-[#F7F5F0] rounded-lg">
                        <img src={item.image} alt={item.name} className="w-12 h-14 object-cover rounded bg-white shrink-0" />
                        <div className="min-w-0">
                          <p className="font-serif text-xs font-bold text-[#111111] truncate">{item.name}</p>
                          <p className="text-[10px] text-[#77736B]">Size: {item.size} · Qty: {item.quantity}</p>
                          <p className="text-[10px] font-semibold tabular-nums text-[#B08A45]">{formatMoney(item.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions & Tracking Note */}
                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                    {ord.trackingNumber ? (
                      <p className="text-[#77736B]">
                        TCS Express Tracking: <strong className="text-[#111111] font-mono">{ord.trackingNumber}</strong>
                      </p>
                    ) : (
                      <p className="text-[#77736B]">Preparation in progress at atelier.</p>
                    )}

                    <button
                      onClick={() => navigate(`/order-confirmation?orderNumber=${ord.orderNumber}`)}
                      className="text-xs font-semibold text-[#B08A45] hover:text-[#111111] flex items-center gap-1"
                    >
                      <span>View Full Order Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-[#DDD8CF] text-center">
                <Heart className="w-12 h-12 text-[#77736B] mx-auto mb-3" />
                <h3 className="font-serif text-xl font-bold text-[#111111]">Your Wishlist is Empty</h3>
                <p className="text-xs text-[#77736B] mt-1 mb-6">Save your favorite prints and styles to revisit anytime.</p>
                <button
                  onClick={() => navigate('/shop')}
                  className="px-6 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider rounded"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlistProducts.map(prod => prod && (
                  <div key={prod.id} className="bg-white rounded-xl border border-[#DDD8CF] p-4 flex flex-col justify-between">
                    <div>
                      <div className="aspect-3/4 rounded-lg overflow-hidden bg-[#F7F5F0] mb-3 relative">
                        <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                        <button
                          onClick={() => toggleWishlist(prod.id)}
                          className="absolute top-2 right-2 p-1.5 bg-white rounded-full text-red-500 shadow-xs"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="font-serif text-sm font-bold text-[#111111] truncate">{prod.name}</h4>
                      <p className="text-xs font-semibold tabular-nums text-[#111111] mt-0.5">{formatMoney(prod.basePrice)}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#DDD8CF] flex gap-2">
                      <button
                        onClick={() => addToCart(prod)}
                        className="flex-1 py-2 bg-[#111111] hover:bg-[#B08A45] text-white text-[10px] font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-1 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold text-[#111111]">Saved Delivery Addresses</h3>
              <button
                onClick={() => setShowAddressModal(true)}
                className="px-4 py-2 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#B08A45] transition-colors"
              >
                + Add New Address
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map(addr => (
                <div key={addr.id} className="bg-white p-6 rounded-2xl border border-[#DDD8CF] shadow-xs relative">
                  {addr.isDefault && (
                    <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      Default Shipping
                    </span>
                  )}
                  <h4 className="font-serif text-base font-bold text-[#111111] mb-1">{addr.fullName}</h4>
                  <p className="text-xs text-[#77736B] leading-relaxed">
                    {addr.addressLine1} <br />
                    {addr.city}, {addr.province} {addr.postalCode} <br />
                    Pakistan
                  </p>
                  <p className="text-xs text-[#111111] mt-2 font-medium">Contact: {addr.phone}</p>
                </div>
              ))}
            </div>

            {/* Add Address Modal */}
            {showAddressModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setShowAddressModal(false)} />
                <div className="bg-white rounded-2xl border border-[#DDD8CF] p-6 max-w-md w-full relative z-10 shadow-2xl">
                  <h3 className="font-serif text-xl font-bold mb-4">Add Shipping Address</h3>
                  <form onSubmit={handleAddAddress} className="space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={newAddress.fullName}
                      onChange={e => setNewAddress({ ...newAddress, fullName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border rounded bg-[#F7F5F0]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone (+92 300 1234567)"
                      value={newAddress.phone}
                      onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border rounded bg-[#F7F5F0]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Street Address & House No."
                      value={newAddress.addressLine1}
                      onChange={e => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                      className="w-full px-3 py-2 text-xs border rounded bg-[#F7F5F0]"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="w-full px-3 py-2 text-xs border rounded bg-[#F7F5F0]"
                      />
                      <input
                        type="text"
                        placeholder="Postal Code"
                        value={newAddress.postalCode}
                        onChange={e => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                        className="w-full px-3 py-2 text-xs border rounded bg-[#F7F5F0]"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddressModal(false)}
                        className="flex-1 py-2 border text-xs font-semibold rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-[#111111] text-white text-xs font-semibold rounded"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Profile */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DDD8CF] max-w-2xl space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#111111]">Account Details & Preferences</h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#111111] block mb-1">Full Name</label>
                <input type="text" defaultValue="Hamza Tariq" className="w-full px-3 py-2 border rounded bg-[#F7F5F0]" />
              </div>
              <div>
                <label className="font-bold text-[#111111] block mb-1">Email Address</label>
                <input type="email" defaultValue="hamza.tariq@example.com" disabled className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="font-bold text-[#111111] block mb-1">Phone Number</label>
                <input type="tel" defaultValue="+92 300 8492019" className="w-full px-3 py-2 border rounded bg-[#F7F5F0]" />
              </div>
              <div>
                <label className="font-bold text-[#111111] block mb-1">Preferred Currency</label>
                <input type="text" defaultValue="PKR (Pakistani Rupee)" disabled className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-500" />
              </div>
            </div>

            <button
              onClick={() => showToast('Preferences updated successfully', 'success')}
              className="px-6 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#B08A45] transition-colors"
            >
              Save Profile Changes
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
