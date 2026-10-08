import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigate } = useStore();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#B08A45] block">
              PREMIUM PRINTED APPAREL
            </span>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal leading-[1.05] tracking-tight text-[#111111]">
              Wear Your <br />
              <span className="italic font-normal">Statement.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#77736B] max-w-md font-sans leading-relaxed">
              Bold prints. Modern fits. Designed for those who stand out.
            </p>

            {/* CTAs matching screenshot */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/shop?gender=Men')}
                className="px-7 py-3.5 bg-[#111111] hover:bg-[#B08A45] text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all flex items-center gap-2 group shadow-sm"
              >
                <span>Shop Men</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => navigate('/shop?gender=Women')}
                className="px-7 py-3.5 bg-transparent hover:bg-white border border-[#111111] text-[#111111] text-xs font-semibold uppercase tracking-[0.18em] transition-all flex items-center gap-2 group"
              >
                <span>Shop Women</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Value Highlights matching screenshot */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#DDD8CF]/80 max-w-lg">
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#111111] leading-none mb-1">
                  100%
                </p>
                <p className="text-[10px] font-sans uppercase tracking-wider text-[#77736B]">
                  PURE COTTON BLEND
                </p>
              </div>

              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#111111] leading-none mb-1">
                  HD Print
                </p>
                <p className="text-[10px] font-sans uppercase tracking-wider text-[#77736B]">
                  FADE RESISTANT
                </p>
              </div>

              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#111111] leading-none mb-1">
                  Bespoke
                </p>
                <p className="text-[10px] font-sans uppercase tracking-wider text-[#77736B]">
                  LIMITED EDITIONS
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase matching screenshot */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white aspect-4/3 sm:aspect-16/11 group">
              <img
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85"
                alt="Models wearing Trenxure printed apparel"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
