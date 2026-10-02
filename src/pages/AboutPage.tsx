import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useStore();

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Brand Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#B08A45] block mb-3">
            THE TRENXURE STORY
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#111111] leading-tight mb-4">
            Unapologetic Art. <br />
            <span className="italic font-normal">Master Tailoring.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#77736B] leading-relaxed">
            Born from a desire to break away from sterile uniformity, TRENXURE bridges the gulf between fine museum art and razor-sharp Italian tailoring.
          </p>
        </div>

        {/* Hero Brand Imagery */}
        <div className="rounded-2xl overflow-hidden shadow-2xl mb-16 aspect-16/9 bg-white">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85"
            alt="Trenxure Atelier studio"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Narrative Chapters */}
        <div className="space-y-16">
          
          {/* Chapter 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5">
              <span className="font-mono text-xs text-[#B08A45] uppercase tracking-wider block mb-1">
                01. The Philosophy
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
                Wear Your Statement
              </h2>
            </div>
            <div className="md:col-span-7 text-xs sm:text-sm text-[#77736B] leading-relaxed space-y-3">
              <p>
                Clothing should never be an afterthought. In a world crowded with disposable fast-fashion and monochrome staples, TRENXURE was founded in Karachi with a clear calling: to produce garments that command the room without screaming.
              </p>
              <p>
                Every print begins as an original artistic concept—from Bauhaus architectural balance to century-old Mughal floral engravings and raw urban spray calligraphy.
              </p>
            </div>
          </div>

          {/* Chapter 2 with Visual */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-8 border-t border-[#DDD8CF]">
            <div className="md:col-span-7 text-xs sm:text-sm text-[#77736B] leading-relaxed space-y-3 md:order-1 order-2">
              <span className="font-mono text-xs text-[#B08A45] uppercase tracking-wider block mb-1">
                02. The Craftsmanship
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mb-2">
                High-Definition Textile Pigment
              </h2>
              <p>
                We use proprietary digital reactive and pigment printing technology that cures dyes directly into combed long-staple cotton and fine viscose fibers.
              </p>
              <p>
                The result? Rich, luminous shades that resist fading through sun and dry cleaning, retaining the tactile softness of raw natural textiles rather than rubbery plastic film.
              </p>
            </div>

            <div className="md:col-span-5 rounded-xl overflow-hidden aspect-4/3 bg-white shadow-md md:order-2 order-1">
              <img
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80"
                alt="Printed blazer craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Chapter 3: Ethical Atelier */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-8 border-t border-[#DDD8CF]">
            <div className="md:col-span-5">
              <span className="font-mono text-xs text-[#B08A45] uppercase tracking-wider block mb-1">
                03. The Atelier
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
                Master Pattern Cutters & Fair Living Wages
              </h2>
            </div>
            <div className="md:col-span-7 text-xs sm:text-sm text-[#77736B] leading-relaxed space-y-3">
              <p>
                All TRENXURE garments are constructed in our dedicated ateliers in Karachi and Lahore. Our tailors boast decades of bespoke bridal and gala suiting expertise.
              </p>
              <p>
                We reject mass-production sweatshops. Every team member works in safe, climate-controlled conditions with comprehensive living wages, healthcare, and education allowances for their families.
              </p>
            </div>
          </div>

        </div>

        {/* 3 Pillars Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
          <div className="bg-white p-6 rounded-xl border border-[#DDD8CF] text-center">
            <Award className="w-6 h-6 text-[#B08A45] mx-auto mb-3" />
            <h3 className="font-serif text-base font-bold text-[#111111] mb-1">Bespoke Precision</h3>
            <p className="text-xs text-[#77736B]">Individual shoulder padding, structured canvas interlinings, and clean lapel curves.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#DDD8CF] text-center">
            <ShieldCheck className="w-6 h-6 text-[#B08A45] mx-auto mb-3" />
            <h3 className="font-serif text-base font-bold text-[#111111] mb-1">Authentic Materials</h3>
            <p className="text-xs text-[#77736B]">100% combed cotton, French terry fleece, and silk-touch lyocell without synthetics.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#DDD8CF] text-center">
            <Heart className="w-6 h-6 text-[#B08A45] mx-auto mb-3" />
            <h3 className="font-serif text-base font-bold text-[#111111] mb-1">Ethical Atelier</h3>
            <p className="text-xs text-[#77736B]">Proudly made in Pakistan by valued artisans dedicated to world-class sartorial standards.</p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-[#111111] text-white p-8 sm:p-12 rounded-2xl text-center space-y-4 shadow-xl">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F7F5F0]">
            Experience Trenxure in Person
          </h2>
          <p className="text-xs text-[#D0B16A] max-w-md mx-auto">
            Browse our latest collection or design a one-of-a-kind bespoke piece in our interactive atelier.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/shop')}
              className="px-6 py-3 bg-white text-[#111111] hover:bg-[#B08A45] hover:text-white text-xs font-semibold uppercase tracking-widest transition-colors"
            >
              Shop Collection
            </button>
            <button
              onClick={() => navigate('/custom-look')}
              className="px-6 py-3 bg-transparent border border-white text-white hover:bg-white hover:text-[#111111] text-xs font-semibold uppercase tracking-widest transition-colors"
            >
              Design Bespoke Look
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
