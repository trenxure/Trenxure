import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CustomLookBanner: React.FC = () => {
  const { navigate } = useStore();

  return (
    <section className="py-8 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Textured Banner matching screenshot */}
        <div 
          className="relative rounded-2xl overflow-hidden bg-[#111111] text-white p-8 sm:p-12 md:p-16 border border-[#B08A45]/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(176, 138, 69, 0.15) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        >
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#B08A45]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text */}
          <div className="space-y-2 text-center sm:text-left z-10">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#F7F5F0]">
              Create Your Own Look
            </h2>
            <p className="font-serif text-sm sm:text-base text-[#D0B16A]/90 italic">
              Custom prints. Your style. Our craft.
            </p>
          </div>

          {/* Right Button matching screenshot */}
          <div className="z-10 shrink-0">
            <button
              onClick={() => navigate('/custom-look')}
              className="px-8 py-3.5 bg-transparent hover:bg-[#B08A45] text-[#F7F5F0] hover:text-[#111111] border border-[#B08A45] text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center gap-2 group shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D0B16A] group-hover:text-[#111111]" />
              <span>Design Your Own</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
