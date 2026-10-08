import React, { useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { CategoryService } from '../../services/commerceService';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const { navigate, categories: allCategories } = useStore();

  const featuredCategories = useMemo(() => {
    const all = allCategories.filter(c => c.active !== false);
    return all.slice(0, 3);
  }, [allCategories]);

  return (
    <section className="py-12 md:py-16 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Horizontal Rule matching screenshot */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111] whitespace-nowrap">
              Shop by Category
            </h2>
            <div className="h-[1px] bg-[#DDD8CF] flex-1 max-w-xs sm:max-w-md" />
          </div>

          <button
            onClick={() => navigate('/shop')}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#111111] hover:text-[#B08A45] transition-colors shrink-0"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Categories Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featuredCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/shop?category=${cat.id}`)}
              className="group relative rounded-2xl overflow-hidden aspect-4/5 bg-white shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300" />

              {/* Bottom Content Card matching screenshot */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#E9E1D4] font-sans">
                    {cat.subtitle}
                  </p>
                </div>

                {/* Circle Arrow Action Button */}
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-[#111111] group-hover:scale-110 shadow-lg">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
