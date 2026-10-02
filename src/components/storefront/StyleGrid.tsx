import React from 'react';
import { useStore } from '../../context/StoreContext';
import { STYLES_DATA } from '../../data/seedData';

export const StyleGrid: React.FC = () => {
  const { navigate } = useStore();

  return (
    <section className="py-12 md:py-16 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching screenshot */}
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111] whitespace-nowrap">
            Shop by Style
          </h2>
          <div className="h-[1px] bg-[#DDD8CF] flex-1 max-w-xs sm:max-w-md" />
        </div>

        {/* 7 Style items row matching screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {STYLES_DATA.map((style) => (
            <div
              key={style.name}
              onClick={() => navigate(`/shop?style=${style.name}`)}
              className="group cursor-pointer flex flex-col items-center"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-white shadow-xs border border-[#DDD8CF] mb-2.5 transition-all duration-300 group-hover:shadow-md group-hover:border-[#B08A45]">
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  referrerPolicy="no-referrer"
                />
              </div>

              <span className="font-serif text-xs sm:text-sm font-medium text-[#111111] group-hover:text-[#B08A45] transition-colors">
                {style.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
