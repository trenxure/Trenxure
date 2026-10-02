import React from 'react';
import { HeroSection } from '../components/storefront/HeroSection';
import { CategoryGrid } from '../components/storefront/CategoryGrid';
import { NewArrivals } from '../components/storefront/NewArrivals';
import { StyleGrid } from '../components/storefront/StyleGrid';
import { WhyTrenxure } from '../components/storefront/WhyTrenxure';
import { LookbookSection } from '../components/storefront/LookbookSection';
import { CustomLookBanner } from '../components/storefront/CustomLookBanner';
import { InstagramFeed } from '../components/storefront/InstagramFeed';

export const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CategoryGrid />
      <NewArrivals />
      <StyleGrid />
      <WhyTrenxure />
      <LookbookSection />
      <CustomLookBanner />
      <InstagramFeed />
    </main>
  );
};
