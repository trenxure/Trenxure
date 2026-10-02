import React, { useState } from 'react';
import { BrandLogo } from '../brand/BrandLogo';
import { useStore } from '../../context/StoreContext';
import { SizeGuideModal } from '../common/SizeGuideModal';
import { Instagram, Facebook, Video, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useStore();
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  return (
    <footer className="bg-[#F7F5F0] border-t border-[#DDD8CF] pt-16 pb-10 text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#DDD8CF]">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4 pr-4">
            <BrandLogo className="h-12 w-auto max-h-12" alt="TRENXURE" />
            <p className="text-xs text-[#77736B] leading-relaxed max-w-sm mt-3">
              Elevating everyday fashion through bespoke art, premium fabric selections, and unapologetic self-expression.
            </p>
          </div>

          {/* Col 2: SHOP */}
          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-[#111111] mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs text-[#77736B]">
              <li>
                <button 
                  onClick={() => navigate('/shop?category=blazers&gender=Men')} 
                  className="hover:text-[#111111] transition-colors"
                >
                  Men's Blazers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/shop?category=blazers&gender=Women')} 
                  className="hover:text-[#111111] transition-colors"
                >
                  Women's Blazers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/shop?category=hoodies')} 
                  className="hover:text-[#111111] transition-colors"
                >
                  Hoodies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/shop?category=t-shirts')} 
                  className="hover:text-[#111111] transition-colors"
                >
                  T-Shirts
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/custom-look')} 
                  className="hover:text-[#B08A45] font-medium transition-colors"
                >
                  Custom Printed Look
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: ABOUT */}
          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-[#111111] mb-4">
              ABOUT
            </h4>
            <ul className="space-y-2.5 text-xs text-[#77736B]">
              <li>
                <button 
                  onClick={() => navigate('/about')} 
                  className="hover:text-[#111111] transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/about#craft')} 
                  className="hover:text-[#111111] transition-colors"
                >
                  Why Trenxure
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/lookbook')} 
                  className="hover:text-[#111111] transition-colors"
                >
                  Editorial Lookbook
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/contact')} 
                  className="hover:text-[#111111] transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: HELP */}
          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-[#111111] mb-4">
              HELP
            </h4>
            <ul className="space-y-2.5 text-xs text-[#77736B]">
              <li>
                <button 
                  onClick={() => setSizeGuideOpen(true)} 
                  className="hover:text-[#111111] transition-colors text-left"
                >
                  Size Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/contact#shipping')} 
                  className="hover:text-[#111111] transition-colors text-left"
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/contact#returns')} 
                  className="hover:text-[#111111] transition-colors text-left"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/contact#faqs')} 
                  className="hover:text-[#111111] transition-colors text-left"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: CONTACT */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-[#111111] mb-4">
              CONTACT
            </h4>
            <div className="space-y-2 text-xs text-[#77736B]">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B08A45]" />
                <a href="mailto:info@trenxure.pk" className="hover:text-[#111111] transition-colors">info@trenxure.pk</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B08A45]" />
                <a href="tel:+923001234567" className="hover:text-[#111111] transition-colors">+92 300 1234567</a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B08A45]" />
                <span>Karachi, Pakistan</span>
              </p>
            </div>

            <div className="pt-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#111111] block mb-2">
                FOLLOW US
              </span>
              <div className="flex items-center gap-3 text-[#111111]">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-1.5 hover:text-[#B08A45] transition-colors" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-1.5 hover:text-[#B08A45] transition-colors" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="p-1.5 hover:text-[#B08A45] transition-colors" aria-label="TikTok">
                  <Video className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-1.5 hover:text-[#B08A45] transition-colors" aria-label="YouTube">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar matching screenshot */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#77736B]">
          <p>© 2025 Trenxure. All rights reserved.</p>

          {/* Payment badges matching screenshot */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-white border border-[#DDD8CF] rounded text-[10px] font-bold tracking-wider text-blue-900">
              VISA
            </span>
            <span className="px-2 py-0.5 bg-white border border-[#DDD8CF] rounded text-[10px] font-bold tracking-wider text-red-600">
              MC
            </span>
            <span className="px-2 py-0.5 bg-white border border-[#DDD8CF] rounded text-[10px] font-bold tracking-wider text-[#111111]">
              COD
            </span>
            <span className="px-2 py-0.5 bg-white border border-[#DDD8CF] rounded text-[10px] font-bold tracking-wider text-red-700">
              JazzCash
            </span>
          </div>
        </div>
      </div>

      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </footer>
  );
};
