import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductService, ReviewService } from '../services/commerceService';
import { SizeGuideModal } from '../components/common/SizeGuideModal';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  ChevronDown, 
  Plus, 
  Minus,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    formatMoney, 
    navigate,
    showToast 
  } = useStore();

  const product = useMemo(() => ProductService.getBySlug(slug), [slug]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Accordions
  const [openSection, setOpenSection] = useState<'desc' | 'materials' | 'fit' | 'shipping'>('desc');

  // Review Form state
  const [reviews, setReviews] = useState(() => product ? ReviewService.getByProduct(product.id) : []);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewCity, setReviewCity] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-[#F7F5F0]">
        <h2 className="font-serif text-3xl font-bold mb-4">Garment Not Found</h2>
        <p className="text-xs text-[#77736B] mb-6">The requested piece is no longer in our catalog or the link is incorrect.</p>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-3 bg-[#111111] text-white text-xs font-semibold uppercase tracking-widest"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const activeVariant = selectedVariantId 
    ? product.variants.find(v => v.id === selectedVariantId) || product.variants[0]
    : product.variants[0];

  const inWish = isInWishlist(product.id);
  const isOutOfStock = activeVariant.stockQuantity <= 0;
  const isLowStock = activeVariant.stockQuantity > 0 && activeVariant.stockQuantity <= 3;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    const newRev = ReviewService.addReview({
      productId: product.id,
      customerName: reviewName,
      customerCity: reviewCity || 'Pakistan',
      rating: reviewRating,
      title: reviewTitle || 'Verified Customer Review',
      comment: reviewComment,
      verifiedPurchase: true
    });

    setReviews(prev => [newRev, ...prev]);
    setShowReviewForm(false);
    setReviewName('');
    setReviewCity('');
    setReviewTitle('');
    setReviewComment('');
    showToast('Thank you! Your verified review has been published.', 'success');
  };

  const handleBuyNow = () => {
    const success = addToCart(product, activeVariant.id, quantity);
    if (success) {
      navigate('/checkout');
    }
  };

  const relatedProducts = ProductService.getAll()
    .filter(p => p.id !== product.id && (p.categoryId === product.categoryId || p.style === product.style))
    .slice(0, 4);

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#77736B] mb-8 uppercase tracking-wider">
          <button onClick={() => navigate('/')} className="hover:text-[#111111]">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/shop')} className="hover:text-[#111111]">Shop</button>
          <span>/</span>
          <button onClick={() => navigate(`/shop?category=${product.categoryId}`)} className="hover:text-[#111111]">{product.categoryName}</button>
          <span>/</span>
          <span className="text-[#111111] font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        {/* 2-Column Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Left: Sticky Image Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 items-start">
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:w-24 shrink-0 pb-2 md:pb-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 md:w-full aspect-3/4 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx ? 'border-[#B08A45]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="flex-1 w-full relative aspect-4/5 rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-103"
                referrerPolicy="no-referrer"
              />
              {product.newArrival && (
                <span className="absolute top-4 left-4 bg-[#111111] text-[#F7F5F0] text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                  NEW ARRIVAL
                </span>
              )}
            </div>
          </div>

          {/* Right: Sticky Details & Purchase Module (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-[#77736B] uppercase tracking-wider mb-2">
                <span>{product.categoryName} · {product.style} Style</span>
                <div className="flex items-center gap-1 text-[#B08A45]">
                  <Star className="w-4 h-4 fill-[#B08A45]" />
                  <span className="font-semibold text-[#111111]">{product.averageRating}</span>
                  <span>({reviews.length} reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#111111] leading-tight mb-2">
                {product.name}
              </h1>

              <p className="text-xs text-[#77736B] font-serif italic mb-4">
                {product.tagline}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 pb-6 border-b border-[#DDD8CF]">
                <span className="font-serif text-3xl font-bold text-[#111111] tabular-nums">
                  {formatMoney(activeVariant.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-[#77736B] line-through tabular-nums">
                    {formatMoney(product.compareAtPrice)}
                  </span>
                )}
                <span className="text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  In Stock & Ready to Ship
                </span>
              </div>
            </div>

            {/* Color Swatch */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2">
                <span>Color: <strong className="normal-case">{activeVariant.color}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-7 h-7 rounded-full border-2 border-[#111111] p-0.5 shadow-xs"
                  title={activeVariant.color}
                >
                  <div 
                    className="w-full h-full rounded-full" 
                    style={{ backgroundColor: activeVariant.colorHex }} 
                  />
                </div>
              </div>
            </div>

            {/* Size Selector + Size Guide */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2">
                <span>Select Size</span>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-xs text-[#B08A45] hover:text-[#111111] underline normal-case transition-colors"
                >
                  Size Guide & Measurements
                </button>
              </div>

              <div className="flex gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantId(v.id)}
                    disabled={v.stockQuantity === 0}
                    className={`min-w-12 h-12 px-3 flex flex-col items-center justify-center text-xs font-semibold rounded-lg border transition-all ${
                      activeVariant.id === v.id
                        ? 'border-[#111111] bg-[#111111] text-white shadow-sm'
                        : v.stockQuantity === 0
                        ? 'border-[#DDD8CF] bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        : 'border-[#DDD8CF] bg-white text-[#111111] hover:border-[#111111]'
                    }`}
                  >
                    <span>{v.size}</span>
                  </button>
                ))}
              </div>

              {/* Stock Notice */}
              {isLowStock && (
                <p className="text-[11px] text-amber-700 mt-2 font-medium">
                  ⚡ Limited stock: Only {activeVariant.stockQuantity} items remaining in size {activeVariant.size}.
                </p>
              )}
            </div>

            {/* Quantity Stepper & Add to Bag / Buy Now */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#DDD8CF] bg-white rounded-lg px-2">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="p-2 text-[#77736B] hover:text-[#111111]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(prev => Math.min(activeVariant.stockQuantity, prev + 1))}
                    className="p-2 text-[#77736B] hover:text-[#111111]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={() => addToCart(product, activeVariant.id, quantity)}
                  disabled={isOutOfStock}
                  className="flex-1 py-4 bg-[#111111] hover:bg-[#B08A45] disabled:bg-gray-400 text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 rounded-lg shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isOutOfStock ? 'Sold Out' : 'Add to Bag'}</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-4 border rounded-lg transition-colors bg-white ${
                    inWish ? 'border-red-500 text-red-500 bg-red-50' : 'border-[#DDD8CF] text-[#77736B] hover:text-[#111111]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWish ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Instant Buy Now */}
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="w-full py-3.5 bg-transparent hover:bg-white text-[#111111] border border-[#111111] text-xs font-semibold uppercase tracking-[0.2em] transition-all rounded-lg flex items-center justify-center gap-2"
              >
                <span>Instant Checkout (Buy Now)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Value Guarantees Grid */}
            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-[#DDD8CF] text-xs text-[#77736B]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B08A45] shrink-0" />
                <span>Free shipping over Rs. 10,000</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#B08A45] shrink-0" />
                <span>14-day hassle-free returns</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B08A45] shrink-0" />
                <span>Bespoke tailored quality check</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B08A45] shrink-0" />
                <span>Ultra HD fade-resistant pigment</span>
              </div>
            </div>

            {/* Collapsible Accordions */}
            <div className="border-t border-[#DDD8CF] pt-4 divide-y divide-[#DDD8CF]">
              {/* Description */}
              <div className="py-3">
                <button
                  onClick={() => setOpenSection(openSection === 'desc' ? ('' as any) : 'desc')}
                  className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-[#111111]"
                >
                  <span>Description & Art Narrative</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'desc' ? 'rotate-180' : ''}`} />
                </button>
                {openSection === 'desc' && (
                  <div className="pt-3 text-xs text-[#77736B] leading-relaxed space-y-2">
                    <p>{product.description}</p>
                    <p>Every piece is individually cured to lock pigment deep into the textile fibers, ensuring the colors remain radiant after repeated wear.</p>
                  </div>
                )}
              </div>

              {/* Material & Care */}
              <div className="py-3">
                <button
                  onClick={() => setOpenSection(openSection === 'materials' ? ('' as any) : 'materials')}
                  className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-[#111111]"
                >
                  <span>Fabric & Care Instructions</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'materials' ? 'rotate-180' : ''}`} />
                </button>
                {openSection === 'materials' && (
                  <div className="pt-3 text-xs text-[#77736B] leading-relaxed space-y-2">
                    <p><strong>Composition:</strong> {product.material}</p>
                    <p><strong>Care Guidelines:</strong></p>
                    <ul className="list-disc pl-4 space-y-1">
                      {product.careInstructions.map((inst, i) => (
                        <li key={i}>{inst}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Fit & Sizing */}
              <div className="py-3">
                <button
                  onClick={() => setOpenSection(openSection === 'fit' ? ('' as any) : 'fit')}
                  className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-[#111111]"
                >
                  <span>Fit & Tailoring Cut</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'fit' ? 'rotate-180' : ''}`} />
                </button>
                {openSection === 'fit' && (
                  <div className="pt-3 text-xs text-[#77736B] leading-relaxed space-y-1">
                    <p>{product.fit}</p>
                    <p>Designed true to standard international sizing. For an oversized runway fit, order one size up.</p>
                  </div>
                )}
              </div>

              {/* Shipping */}
              <div className="py-3">
                <button
                  onClick={() => setOpenSection(openSection === 'shipping' ? ('' as any) : 'shipping')}
                  className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-[#111111]"
                >
                  <span>Delivery & Free Returns</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                {openSection === 'shipping' && (
                  <div className="pt-3 text-xs text-[#77736B] leading-relaxed space-y-1">
                    <p>• Karachi: 1-2 business days via TCS Courier.</p>
                    <p>• Lahore, Islamabad & Nationwide: 2-3 business days.</p>
                    <p>• Cash on Delivery (COD) accepted nationwide.</p>
                    <p>• Return within 14 days in original unworn condition with tags attached.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Customer Reviews Section */}
        <div className="mt-20 pt-12 border-t border-[#DDD8CF]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
                Customer Reviews
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-[#B08A45]">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#111111]">{product.averageRating} out of 5</span>
                <span className="text-xs text-[#77736B]">({reviews.length} verified reviews)</span>
              </div>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-6 py-2.5 bg-white border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors rounded"
            >
              {showReviewForm ? 'Cancel Review' : 'Write a Review'}
            </button>
          </div>

          {/* Review submission form */}
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="bg-white p-6 rounded-xl border border-[#DDD8CF] mb-10 max-w-2xl space-y-4 animate-in fade-in duration-200">
              <h4 className="font-serif text-lg font-bold text-[#111111]">Share Your Experience</h4>
              
              <div>
                <label className="text-xs font-semibold text-[#111111] block mb-1">Your Rating</label>
                <div className="flex gap-2 text-[#B08A45]">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-current' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#111111] block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={reviewName}
                    onChange={e => setReviewName(e.target.value)}
                    placeholder="e.g. Asad Siddiqui"
                    className="w-full px-3 py-2 text-xs border border-[#DDD8CF] rounded bg-[#F7F5F0]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#111111] block mb-1">City</label>
                  <input
                    type="text"
                    value={reviewCity}
                    onChange={e => setReviewCity(e.target.value)}
                    placeholder="e.g. Lahore"
                    className="w-full px-3 py-2 text-xs border border-[#DDD8CF] rounded bg-[#F7F5F0]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#111111] block mb-1">Review Headline</label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={e => setReviewTitle(e.target.value)}
                  placeholder="e.g. Magnificent tailoring & vivid print!"
                  className="w-full px-3 py-2 text-xs border border-[#DDD8CF] rounded bg-[#F7F5F0]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#111111] block mb-1">Review Details *</label>
                <textarea
                  required
                  rows={3}
                  value={reviewComment}
                  onChange={e => setReviewComment(e.target.value)}
                  placeholder="Tell us about the fabric feel, shoulder cut, fit, and compliments received..."
                  className="w-full px-3 py-2 text-xs border border-[#DDD8CF] rounded bg-[#F7F5F0]"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#B08A45] transition-colors"
              >
                Submit Verified Review
              </button>
            </form>
          )}

          {/* Reviews list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.length === 0 ? (
              <p className="text-xs text-[#77736B]">No customer reviews yet. Be the first to review this piece!</p>
            ) : (
              reviews.map(rev => (
                <div key={rev.id} className="bg-white p-5 rounded-xl border border-[#DDD8CF] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#B08A45]">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#77736B]">{rev.date}</span>
                  </div>

                  <h4 className="font-serif text-sm font-bold text-[#111111]">{rev.title}</h4>
                  <p className="text-xs text-[#77736B] leading-relaxed">{rev.comment}</p>

                  <div className="flex items-center gap-1.5 pt-2 text-[10px] text-emerald-800 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Buyer · {rev.customerName} ({rev.customerCity})</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#DDD8CF]">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mb-8">
              Complete the Look
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {relatedProducts.map(rel => (
                <div
                  key={rel.id}
                  onClick={() => navigate(`/products/${rel.slug}`)}
                  className="group cursor-pointer"
                >
                  <div className="aspect-3/4 rounded-xl overflow-hidden bg-white mb-2 shadow-xs group-hover:shadow-md transition-shadow">
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="font-serif text-sm font-medium text-[#111111] group-hover:text-[#B08A45] transition-colors truncate">
                    {rel.name}
                  </h4>
                  <p className="text-xs font-semibold tabular-nums text-[#111111]">
                    {formatMoney(rel.basePrice)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <SizeGuideModal 
        isOpen={sizeGuideOpen} 
        onClose={() => setSizeGuideOpen(false)} 
        categoryName={product.categoryName} 
      />
    </div>
  );
};
