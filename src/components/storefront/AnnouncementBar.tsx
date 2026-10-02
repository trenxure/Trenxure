import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#111111] text-[#F7F5F0] py-2 px-4 text-center border-b border-[#B08A45]/20 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-[0.2em]">
        <span>FREE SHIPPING ON ORDERS OVER RS. 10,000</span>
        <span className="text-[#D0B16A] inline-block">•</span>
        <span>EASY 14-DAY RETURNS</span>
      </div>
    </div>
  );
};
