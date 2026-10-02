import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { LOOKBOOK_DATA } from '../data/seedData';
import { ProductService } from '../services/commerceService';
import { Sparkles, ShoppingBag, Eye, MapPin, ArrowRight } from 'lucide-react';

export const LookbookPage: React.FC = () => {
  const { navigate, addToCart, formatMoney } = useStore();
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  const filteredLooks = selectedSeason === 'all'
    ? LOOKBOOK_DATA
    : LOOKBOOK_DATA.filter(l => l.season.includes(selectedSeason));

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#B08A45] block mb-2">
            EDITORIAL ARCHIVE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#111111] mb-4">
            The Trenxure Lookbook
          </h1>
          <p className="text-sm text-[#77736B] leading-relaxed">
            Real people. Real style. Shot across historic architecture and modern lofts in Lahore, Karachi, and Islamabad. Hover or tap the pins to discover each individual garment.
          </p>

          {/* Season Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {['all', 'Autumn/Winter', 'Spring/Summer', 'Capsule'].map(season => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all ${
                  selectedSeason === season
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-white text-[#77736B] border-[#DDD8CF] hover:border-[#111111]'
                }`}
              >
                {season === 'all' ? 'All Seasons' : season}
              </button>
            ))}
          </div>
        </div>

        {/* Spreads Grid */}
        <div className="space-y-16">
          {filteredLooks.map((look, index) => (
            <div 
              key={look.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image with Interactive Hotspots (7 cols) */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl bg-white aspect-4/5 group">
                <img
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Hotspot Pins */}
                {look.hotspots.map((hs) => {
                  const targetProduct = ProductService.getById(hs.productId);
                  const isHovered = activeHotspotId === hs.id;

                  return (
                    <div
                      key={hs.id}
                      className="absolute z-20"
                      style={{ top: `${hs.yPercent}%`, left: `${hs.xPercent}%` }}
                    >
                      {/* Pulse Pin */}
                      <button
                        onClick={() => setActiveHotspotId(isHovered ? null : hs.id)}
                        onMouseEnter={() => setActiveHotspotId(hs.id)}
                        className="relative w-7 h-7 rounded-full bg-[#111111]/90 text-[#D0B16A] border-2 border-white flex items-center justify-center shadow-lg transition-transform hover:scale-125 focus:outline-none"
                        aria-label={`View ${hs.label}`}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#D0B16A] animate-ping absolute" />
                        <span className="text-[10px] font-bold">+</span>
                      </button>

                      {/* Hotspot Card Popup */}
                      {isHovered && targetProduct && (
                        <div 
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 bg-white border border-[#DDD8CF] p-3 rounded-lg shadow-xl animate-in fade-in zoom-in-95 duration-150 z-30"
                          onMouseLeave={() => setActiveHotspotId(null)}
                        >
                          <img
                            src={targetProduct.images[0]}
                            alt={targetProduct.name}
                            className="w-full h-24 object-cover rounded mb-2"
                          />
                          <p className="font-serif text-xs font-bold text-[#111111] truncate">
                            {targetProduct.name}
                          </p>
                          <p className="text-xs font-semibold tabular-nums text-[#B08A45] mb-2">
                            {formatMoney(targetProduct.basePrice)}
                          </p>
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => navigate(`/products/${targetProduct.slug}`)}
                              className="flex-1 py-1.5 bg-[#111111] text-white text-[10px] font-semibold uppercase tracking-wider rounded text-center hover:bg-[#B08A45] transition-colors"
                            >
                              View
                            </button>
                            <button
                              onClick={() => addToCart(targetProduct)}
                              className="p-1.5 border border-[#DDD8CF] hover:bg-[#F7F5F0] rounded text-[#111111]"
                              title="Add to bag"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Editorial Description (5 cols) */}
              <div className="lg:col-span-5 space-y-5 lg:px-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B08A45]">
                  <span>{look.season}</span>
                  <span>•</span>
                  <span>{look.subtitle}</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#111111] leading-tight">
                  {look.title}
                </h2>

                {look.location && (
                  <p className="flex items-center gap-1.5 text-xs text-[#77736B]">
                    <MapPin className="w-3.5 h-3.5 text-[#B08A45]" />
                    <span>Location: {look.location}</span>
                  </p>
                )}

                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                    Featured Garments in this Look:
                  </h4>
                  <div className="space-y-2">
                    {look.hotspots.map((hs) => {
                      const prod = ProductService.getById(hs.productId);
                      if (!prod) return null;

                      return (
                        <div
                          key={hs.id}
                          className="flex items-center justify-between p-3 bg-white border border-[#DDD8CF] rounded-lg group"
                        >
                          <div>
                            <p className="font-serif text-xs font-bold text-[#111111]">
                              {prod.name}
                            </p>
                            <p className="text-[11px] text-[#77736B] tabular-nums">
                              {formatMoney(prod.basePrice)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => addToCart(prod)}
                              className="px-3 py-1.5 bg-[#111111] hover:bg-[#B08A45] text-white text-[10px] font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              <span>Add</span>
                            </button>
                            <button
                              onClick={() => navigate(`/products/${prod.slug}`)}
                              className="p-1.5 text-[#77736B] hover:text-[#111111]"
                              title="Details"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
