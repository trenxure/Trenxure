import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/commerce';
import { Sparkles, Check, ShoppingBag, ArrowRight, Palette, Layers, Scissors, Type } from 'lucide-react';

export const CustomLookPage: React.FC = () => {
  const { addToCart, formatMoney, navigate } = useStore();

  const garments = [
    { id: 'blazer', name: 'Tailored Printed Blazer', basePrice: 17500, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80' },
    { id: 'hoodie', name: 'Heavyweight French Terry Hoodie', basePrice: 11000, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80' },
    { id: 'tee', name: 'Luxury Vintage Heavyweight Tee', basePrice: 6500, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80' },
    { id: 'overcoat', name: 'Bespoke Tapestry Overcoat', basePrice: 32000, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80' },
  ];

  const colors = [
    { id: 'onyx', name: 'Midnight Onyx', hex: '#111111', text: 'text-white' },
    { id: 'ivory', name: 'Bone Ivory', hex: '#F7F5F0', text: 'text-black' },
    { id: 'navy', name: 'Royal Navy', hex: '#1E3A8A', text: 'text-white' },
    { id: 'sand', name: 'Warm Sand', hex: '#D6C7B2', text: 'text-black' },
    { id: 'spruce', name: 'Deep Forest', hex: '#1B4D3E', text: 'text-white' },
  ];

  const artPrints = [
    { id: 'abstract', name: 'Abstract Expression', style: 'Vibrant brushstrokes', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=80' },
    { id: 'floral', name: 'Mughal Botanical', style: 'Heritage indigo petals', image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80' },
    { id: 'geometric', name: 'Bauhaus Architectural', style: 'Clean ochre tessellation', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80' },
    { id: 'graffiti', name: 'Urban Calligraphy', style: 'Neon street tag spray', image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=400&q=80' },
    { id: 'marble', name: 'Carrara Noir Veins', style: 'Liquid monochrome stone', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80' },
    { id: 'ethnic', name: 'Indus Kilim Tapestry', style: 'Traditional geometry', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80' },
  ];

  const placements = [
    { id: 'all-over', name: 'Full Bespoke All-Over', extra: 2500, desc: 'Seamless pattern printed across entire garment exterior.' },
    { id: 'lapels', name: 'Lapels & Collar Accent', extra: 1000, desc: 'Contrasting artwork placed specifically on peak lapels or hood.' },
    { id: 'back', name: 'Back Statement Canvas', extra: 1500, desc: 'Large high-definition museum art print across center back.' },
  ];

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  // State
  const [selectedGarment, setSelectedGarment] = useState(garments[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedPrint, setSelectedPrint] = useState(artPrints[0]);
  const [selectedPlacement, setSelectedPlacement] = useState(placements[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [monogram, setMonogram] = useState('');

  const calculatedPrice = selectedGarment.basePrice + selectedPlacement.extra + (monogram ? 1000 : 0);

  const handleOrderCustomLook = () => {
    const customProduct: Product = {
      id: `custom-${Date.now()}`,
      name: `Bespoke ${selectedGarment.name} (${selectedPrint.name})`,
      slug: `custom-${selectedGarment.id}-${Date.now()}`,
      sku: `TRX-CUST-${Date.now().toString().slice(-6)}`,
      tagline: `Custom creation in ${selectedColor.name} featuring ${selectedPrint.name} print`,
      description: `Bespoke tailored creation featuring ${selectedPrint.name} print placed as ${selectedPlacement.name}. Monogram: ${monogram || 'None'}.`,
      categoryId: selectedGarment.id === 'blazer' ? 'blazers' : selectedGarment.id === 'hoodie' ? 'hoodies' : 't-shirts',
      categoryName: selectedGarment.name,
      collectionIds: ['formal'],
      style: 'Luxury',
      gender: 'Unisex',
      basePrice: calculatedPrice,
      status: 'active',
      featured: false,
      newArrival: false,
      bestSeller: false,
      images: [selectedGarment.image, selectedPrint.image],
      variants: [
        {
          id: `var-custom-${Date.now()}`,
          productId: `custom-${Date.now()}`,
          sku: `TRX-CUST-${selectedSize}`,
          color: selectedColor.name,
          colorHex: selectedColor.hex,
          size: selectedSize as any,
          price: calculatedPrice,
          stockQuantity: 99,
          reservedQuantity: 0,
          lowStockThreshold: 1,
          active: true
        }
      ],
      material: '100% Combed Cotton Blend tailored to bespoke specifications',
      fit: 'Custom Tailored Fit',
      careInstructions: ['Dry clean or delicate gentle wash'],
      reviewsCount: 1,
      averageRating: 5.0,
      createdAt: new Date().toISOString()
    };

    addToCart(customProduct, customProduct.variants[0].id, 1);
  };

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111111] text-[#D0B16A] text-[10px] font-semibold uppercase tracking-[0.25em] rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRENXURE BESPOKE ATELIER</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#111111] mb-3">
            Create Your Own Look
          </h1>
          <p className="text-xs sm:text-sm text-[#77736B] leading-relaxed">
            Custom prints. Your style. Our craft. Select your garment, select your artwork, personalize with your initials, and our Karachi artisans will handcraft your statement piece.
          </p>
        </div>

        {/* 2-Column Customizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left: Dynamic Live Canvas Preview (5 cols) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white aspect-4/5 border border-[#DDD8CF] group">
              {/* Garment Base Layer */}
              <img
                src={selectedGarment.image}
                alt={selectedGarment.name}
                className="w-full h-full object-cover transition-all duration-500"
              />

              {/* Print Texture Blend Simulation */}
              <div 
                className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none transition-all duration-700"
                style={{
                  backgroundImage: `url(${selectedPrint.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />

              {/* Tint overlay matching selected color */}
              <div 
                className="absolute inset-0 mix-blend-color opacity-30 pointer-events-none"
                style={{ backgroundColor: selectedColor.hex }}
              />

              {/* Monogram Badge if provided */}
              {monogram.trim() && (
                <div className="absolute bottom-6 left-6 bg-[#111111]/90 backdrop-blur-md border border-[#B08A45]/40 text-[#D0B16A] px-3 py-1.5 rounded font-serif italic text-xs tracking-widest">
                  Monogram: {monogram.toUpperCase()}
                </div>
              )}

              {/* Price & Summary Tag */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md border border-[#DDD8CF]">
                <span className="text-[10px] text-[#77736B] block uppercase tracking-wider">Estimated Price</span>
                <span className="font-serif text-base font-bold text-[#111111] tabular-nums">
                  {formatMoney(calculatedPrice)}
                </span>
              </div>
            </div>

            {/* Spec breakdown */}
            <div className="bg-white p-4 rounded-xl border border-[#DDD8CF] text-xs space-y-1 text-[#77736B]">
              <div className="flex justify-between">
                <span>Garment:</span>
                <strong className="text-[#111111]">{selectedGarment.name}</strong>
              </div>
              <div className="flex justify-between">
                <span>Color:</span>
                <strong className="text-[#111111]">{selectedColor.name}</strong>
              </div>
              <div className="flex justify-between">
                <span>Print Motif:</span>
                <strong className="text-[#111111]">{selectedPrint.name}</strong>
              </div>
              <div className="flex justify-between">
                <span>Placement:</span>
                <strong className="text-[#111111]">{selectedPlacement.name}</strong>
              </div>
              <div className="flex justify-between">
                <span>Tailored Size:</span>
                <strong className="text-[#111111]">{selectedSize}</strong>
              </div>
            </div>
          </div>

          {/* Right: Customization Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-[#DDD8CF] shadow-xs">
            
            {/* Step 1: Garment Selection */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#111111] text-[#D0B16A] text-xs font-bold flex items-center justify-center">1</span>
                <h3 className="font-serif text-lg font-bold text-[#111111]">Choose Silhouette</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {garments.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGarment(g)}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      selectedGarment.id === g.id
                        ? 'border-[#111111] bg-[#F7F5F0] shadow-xs'
                        : 'border-[#DDD8CF] hover:border-[#111111]'
                    }`}
                  >
                    <p className="font-serif text-xs font-bold text-[#111111]">{g.name}</p>
                    <p className="text-[11px] text-[#B08A45] font-semibold mt-1 tabular-nums">{formatMoney(g.basePrice)}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Base Color Selection */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#111111] text-[#D0B16A] text-xs font-bold flex items-center justify-center">2</span>
                <h3 className="font-serif text-lg font-bold text-[#111111]">Select Base Fabric Color</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-all ${
                      selectedColor.id === c.id
                        ? 'border-[#111111] bg-[#F7F5F0] shadow-xs font-semibold'
                        : 'border-[#DDD8CF] hover:border-[#111111]'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full border border-black/20 shadow-xs" style={{ backgroundColor: c.hex }} />
                    <span className="text-xs text-[#111111]">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Art Print Selection */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#111111] text-[#D0B16A] text-xs font-bold flex items-center justify-center">3</span>
                <h3 className="font-serif text-lg font-bold text-[#111111]">Choose Artwork Print Motif</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {artPrints.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPrint(p)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedPrint.id === p.id
                        ? 'border-[#111111] bg-[#F7F5F0] ring-1 ring-[#111111]'
                        : 'border-[#DDD8CF] hover:border-[#111111]'
                    }`}
                  >
                    <div className="w-full aspect-video rounded-lg overflow-hidden mb-2 bg-[#F7F5F0]">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="font-serif text-xs font-bold text-[#111111] truncate">{p.name}</p>
                    <p className="text-[10px] text-[#77736B] truncate">{p.style}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Print Placement */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#111111] text-[#D0B16A] text-xs font-bold flex items-center justify-center">4</span>
                <h3 className="font-serif text-lg font-bold text-[#111111]">Print Placement</h3>
              </div>
              <div className="space-y-2">
                {placements.map((plc) => (
                  <button
                    key={plc.id}
                    onClick={() => setSelectedPlacement(plc)}
                    className={`w-full p-3 text-left rounded-xl border transition-all flex items-center justify-between ${
                      selectedPlacement.id === plc.id
                        ? 'border-[#111111] bg-[#F7F5F0] shadow-xs'
                        : 'border-[#DDD8CF] hover:border-[#111111]'
                    }`}
                  >
                    <div>
                      <p className="font-serif text-xs font-bold text-[#111111]">{plc.name}</p>
                      <p className="text-[11px] text-[#77736B]">{plc.desc}</p>
                    </div>
                    <span className="text-xs font-semibold text-[#B08A45] shrink-0 tabular-nums">
                      +{formatMoney(plc.extra)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Size & Monogram */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block mb-2">
                  Select Size
                </label>
                <div className="flex gap-1.5">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`flex-1 py-2 text-xs font-semibold rounded border transition-colors ${
                        selectedSize === s
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-white text-[#111111] border-[#DDD8CF] hover:border-[#111111]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block mb-2">
                  Monogram Initials (+Rs. 1,000)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="e.g. H.T."
                  value={monogram}
                  onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 text-xs border border-[#DDD8CF] rounded bg-[#F7F5F0] uppercase tracking-widest focus:outline-none focus:border-[#B08A45]"
                />
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-[#DDD8CF]">
              <button
                onClick={handleOrderCustomLook}
                className="w-full py-4 bg-[#111111] hover:bg-[#B08A45] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all rounded-xl shadow-lg flex items-center justify-center gap-2 group"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Bespoke Creation to Bag ({formatMoney(calculatedPrice)})</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="text-[11px] text-center text-[#77736B] mt-2">
                Handcrafted & cured in Karachi atelier. Ships in 4-6 business days with personalized certificate.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
