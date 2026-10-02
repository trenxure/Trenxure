import React from 'react';
import { BrandLogo } from '../brand/BrandLogo';
import { Gem, ShieldCheck, Shirt, Truck } from 'lucide-react';

export const WhyTrenxure: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-[#F7F5F0] border-t border-[#DDD8CF]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading matching screenshot */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#111111]">
            Why Trenxure?
          </h2>
        </div>

        {/* 5-Column Grid matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
          
          {/* Card 1: PREMIUM PRINTS */}
          <div className="flex flex-col items-center text-center p-6 bg-transparent">
            <div className="w-12 h-12 rounded-full border border-[#DDD8CF] bg-white flex items-center justify-center text-[#B08A45] mb-4 shadow-xs">
              <Gem className="w-5 h-5 stroke-[1.4]" />
            </div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-[0.16em] text-[#111111] mb-1">
              PREMIUM PRINTS
            </h3>
            <p className="text-xs text-[#77736B]">
              Unique designs, high quality.
            </p>
          </div>

          {/* Card 2: MODERN DESIGNS */}
          <div className="flex flex-col items-center text-center p-6 bg-transparent">
            <div className="w-12 h-12 rounded-full border border-[#DDD8CF] bg-white flex items-center justify-center text-[#B08A45] mb-4 shadow-xs">
              <ShieldCheck className="w-5 h-5 stroke-[1.4]" />
            </div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-[0.16em] text-[#111111] mb-1">
              MODERN DESIGNS
            </h3>
            <p className="text-xs text-[#77736B]">
              Trendy & timeless.
            </p>
          </div>

          {/* Card 3: MADE FOR YOU */}
          <div className="flex flex-col items-center text-center p-6 bg-transparent">
            <div className="w-12 h-12 rounded-full border border-[#DDD8CF] bg-white flex items-center justify-center text-[#B08A45] mb-4 shadow-xs">
              <Shirt className="w-5 h-5 stroke-[1.4]" />
            </div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-[0.16em] text-[#111111] mb-1">
              MADE FOR YOU
            </h3>
            <p className="text-xs text-[#77736B]">
              Comfort meets style.
            </p>
          </div>

          {/* Card 4: PAKISTAN-WIDE DELIVERY */}
          <div className="flex flex-col items-center text-center p-6 bg-transparent">
            <div className="w-12 h-12 rounded-full border border-[#DDD8CF] bg-white flex items-center justify-center text-[#B08A45] mb-4 shadow-xs">
              <Truck className="w-5 h-5 stroke-[1.4]" />
            </div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-[0.16em] text-[#111111] mb-1">
              PAKISTAN-WIDE DELIVERY
            </h3>
            <p className="text-xs text-[#77736B]">
              Safe & trusted delivery.
            </p>
          </div>

          {/* Card 5: Luxury Statement Card matching screenshot with official brand logo */}
          <div className="flex flex-col items-center justify-center text-center p-6 bg-white border border-[#DDD8CF] rounded-xl shadow-xs group hover:shadow-md transition-shadow">
            <BrandLogo className="w-16 h-auto mb-2 transition-transform duration-300 group-hover:scale-105" />
            <p className="font-serif text-lg italic text-[#111111] font-normal leading-snug">
              More Than Just Clothing
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

