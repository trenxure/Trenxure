import React from 'react';
import { INSTAGRAM_POSTS } from '../../data/seedData';
import { BrandLogo } from '../brand/BrandLogo';
import { ArrowUpRight, Heart } from 'lucide-react';

export const InstagramFeed: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching screenshot */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111]">
            Follow Us On Instagram
          </h2>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs font-semibold text-[#111111] hover:text-[#B08A45] transition-colors"
          >
            <span>@trenxure</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* 8-Tile Grid matching screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {INSTAGRAM_POSTS.map((post) => {
            if (post.isBrandCard) {
              return (
                <div
                  key={post.id}
                  className="aspect-square rounded-xl bg-[#0D0D0D] text-white p-3 flex items-center justify-center text-center shadow-xs border border-[#B08A45]/30 group cursor-pointer transition-transform duration-300 hover:scale-102"
                >
                  <BrandLogo className="w-20 h-auto max-h-16" />
                </div>
              );
            }

            return (
              <div
                key={post.id}
                className="group relative aspect-square rounded-xl overflow-hidden bg-white shadow-xs cursor-pointer border border-[#DDD8CF]/60"
              >
                <img
                  src={post.image}
                  alt="Trenxure Instagram look"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  referrerPolicy="no-referrer"
                />

                {/* Hover overlay with likes */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center text-white">
                  <div className="flex items-center gap-1 text-xs font-bold mb-1">
                    <Heart className="w-3.5 h-3.5 fill-[#D0B16A] text-[#D0B16A]" />
                    <span className="tabular-nums">{post.likes}</span>
                  </div>
                  <p className="text-[9px] line-clamp-2 text-white/90">
                    {post.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
