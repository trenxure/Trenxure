import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { LOOKBOOK_DATA } from '../../data/seedData';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const LookbookSection: React.FC = () => {
  const { navigate } = useStore();
  const [scrollIndex, setScrollIndex] = useState(0);

  const handlePrev = () => {
    setScrollIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setScrollIndex(prev => Math.min(LOOKBOOK_DATA.length - 3, prev + 1));
  };

  return (
    <section className="py-16 md:py-24 bg-[#F7F5F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Navigation controls matching screenshot */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#111111] leading-tight">
                The Lookbook
              </h2>
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#77736B] mt-2">
                REAL PEOPLE. REAL STYLE.
              </p>
            </div>

            <button
              onClick={() => navigate('/lookbook')}
              className="px-6 py-3.5 bg-[#111111] hover:bg-[#B08A45] text-white text-xs font-semibold uppercase tracking-[0.16em] transition-all flex items-center gap-2 group shadow-sm"
            >
              <span>Explore Lookbook</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Slider controls matching screenshot */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handlePrev}
                disabled={scrollIndex === 0}
                className="w-9 h-9 rounded-full border border-[#DDD8CF] bg-white flex items-center justify-center text-[#111111] hover:border-[#111111] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Previous lookbook spread"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={scrollIndex >= LOOKBOOK_DATA.length - 3}
                className="w-9 h-9 rounded-full border border-[#DDD8CF] bg-white flex items-center justify-center text-[#111111] hover:border-[#111111] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Next lookbook spread"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Visual Grid matching screenshot */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {LOOKBOOK_DATA.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => navigate('/lookbook')}
                  className="group relative rounded-xl overflow-hidden aspect-9/16 bg-white shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Editorial Tag Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-white/90 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                      LOOKBOOK {idx + 1}
                    </span>
                  </div>

                  {/* Bottom Text Info */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[9px] text-[#D0B16A] uppercase tracking-wider">
                      {item.subtitle}
                    </p>
                    <p className="font-serif text-xs font-semibold text-white truncate">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
