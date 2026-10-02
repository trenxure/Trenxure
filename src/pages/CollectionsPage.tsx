import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';

interface CapsuleCollection {
  id: string;
  slug: string;
  season: string;
  title: string;
  tagline: string;
  description: string;
  textiles: string;
  categoryFilter?: string;
  collectionFilter?: string;
  heroImage: string;
  featuredProducts: {
    name: string;
    category: string;
    price: string;
    image: string;
    slug: string;
  }[];
}

const CAPSULES: CapsuleCollection[] = [
  {
    id: 'capsule-1',
    slug: 'imperial-silk',
    season: 'Autumn / Winter 2025',
    title: 'The Imperial Silk & Velvet Capsule',
    tagline: 'Regal botanical motifs with Italian velvet and pure viscose silk linings.',
    description: 'A study in evening elegance. Hand-rendered Mughal floristry and baroque scrolls meet razor-sharp shoulder construction and satin peak lapels. Designed for galas, stage performances, and high-stakes creative gatherings.',
    textiles: '70% Combed Cotton, 30% Fine Viscose, Cotton-Silk Velvet with Pure Cupro Lining',
    categoryFilter: 'blazers',
    collectionFilter: 'formal',
    heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    featuredProducts: [
      {
        name: 'Abstract Print Blazer',
        category: 'Blazers',
        price: 'Rs. 15,000',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
        slug: 'abstract-print-blazer'
      },
      {
        name: 'Floral Print Blazer',
        category: 'Blazers',
        price: 'Rs. 15,000',
        image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80',
        slug: 'floral-print-blazer'
      },
      {
        name: 'Geometric Print Blazer',
        category: 'Blazers',
        price: 'Rs. 15,000',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
        slug: 'geometric-print-blazer'
      }
    ]
  },
  {
    id: 'capsule-2',
    slug: 'street-monolith',
    season: 'Year-Round Capsule',
    title: 'Street Monolith & Architectural Terry',
    tagline: 'Substantial 420 GSM French terry hoodies and double-pleated cargos.',
    description: 'Constructed for longevity and weight. Custom-milled looped cotton with metallic pigment stipple prints and drop-shoulder silhouettes. Finished with raw cord drawstrings and deep architectural pockets.',
    textiles: '420 GSM Custom-Milled 100% French Terry & 320 GSM Twill Cotton',
    categoryFilter: 'hoodies',
    collectionFilter: 'casual',
    heroImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    featuredProducts: [
      {
        name: 'Architects of Tomorrow Hoodie',
        category: 'Hoodies',
        price: 'Rs. 9,500',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
        slug: 'architects-of-tomorrow-hoodie'
      },
      {
        name: 'Golden Ratio Abstract Hoodie',
        category: 'Hoodies',
        price: 'Rs. 9,500',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
        slug: 'golden-ratio-hoodie'
      },
      {
        name: 'Pleated Cargo Trousers',
        category: 'Pants',
        price: 'Rs. 9,500',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
        slug: 'pleated-cargo-trousers'
      }
    ]
  },
  {
    id: 'capsule-3',
    slug: 'graphic-monuments',
    season: 'Limited Edition 2025',
    title: 'Graphic Monuments & Heavyweight Tees',
    tagline: '280 GSM luxury combed jersey featuring museum-grade silkscreen art.',
    description: 'A celebration of modern printmaking. High-definition pigment prints that age gracefully with each wear, set against dense, zero-fade ring-spun cotton. Each tee features a bespoke neckline ribbing that never curls.',
    textiles: '280 GSM 100% Combed Compact Cotton with Lycra-Reinforced Rib Collar',
    categoryFilter: 't-shirts',
    collectionFilter: 'new-arrivals',
    heroImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    featuredProducts: [
      {
        name: 'Renaissance Fracture Tee',
        category: 'T-Shirts',
        price: 'Rs. 4,800',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
        slug: 'renaissance-fracture-tee'
      },
      {
        name: 'Nocturnal Calligraphy Tee',
        category: 'T-Shirts',
        price: 'Rs. 4,800',
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
        slug: 'nocturnal-calligraphy-tee'
      }
    ]
  }
];

export const CollectionsPage: React.FC = () => {
  const { navigate } = useStore();

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#77736B] mb-3 uppercase tracking-wider">
          <button onClick={() => navigate('/')} className="hover:text-[#111111] transition-colors">Home</button>
          <span>/</span>
          <span className="text-[#111111] font-semibold">Collections</span>
        </div>

        {/* Page Title */}
        <div className="max-w-3xl pb-10 border-b border-[#DDD8CF] mb-12">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#B08A45] block mb-2">
            Curated Capsules & Editions
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#111111] leading-tight">
            The Atelier Collections
          </h1>
          <p className="text-sm text-[#77736B] mt-4 leading-relaxed max-w-2xl">
            Each TRENXURE collection is conceived as an architectural gallery. Textiles are sourced from historical mills, artwork is hand-rendered, and every silhouette is balanced for dramatic presence.
          </p>
        </div>

        {/* Capsules List */}
        <div className="space-y-16 lg:space-y-24">
          {CAPSULES.map((capsule, index) => {
            const isEven = index % 2 === 1;

            return (
              <section 
                key={capsule.id} 
                className="bg-white border border-[#DDD8CF] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  
                  {/* Hero Image Side */}
                  <div className={`lg:col-span-5 relative min-h-[360px] lg:min-h-[500px] overflow-hidden ${isEven ? 'lg:order-2' : ''}`}>
                    <img 
                      src={capsule.heroImage} 
                      alt={capsule.title} 
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 lg:p-8 text-white">
                      <span className="text-xs uppercase tracking-[0.2em] text-[#D0B16A] font-semibold mb-1">
                        {capsule.season}
                      </span>
                      <h3 className="font-serif text-2xl lg:text-3xl font-normal text-white">
                        {capsule.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content & Garments Side */}
                  <div className={`lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${isEven ? 'lg:order-1' : ''}`}>
                    <div>
                      <div className="flex items-center gap-3 text-xs text-[#77736B] uppercase tracking-wider mb-2">
                        <span>Capsule 0{index + 1}</span>
                        <span>·</span>
                        <span>{capsule.season}</span>
                      </div>
                      
                      <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111] mb-3">
                        {capsule.tagline}
                      </h2>

                      <p className="text-sm text-[#77736B] leading-relaxed mb-6">
                        {capsule.description}
                      </p>

                      <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#DDD8CF] mb-8">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#111111] block mb-1">
                          Fabric & Construction
                        </span>
                        <p className="text-xs text-[#77736B]">
                          {capsule.textiles}
                        </p>
                      </div>

                      {/* Featured Pieces in this Collection */}
                      <div className="mb-6">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#111111] mb-3">
                          Featured In This Capsule:
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {capsule.featuredProducts.map((p) => (
                            <div 
                              key={p.slug}
                              onClick={() => navigate(`/products/${p.slug}`)}
                              className="group cursor-pointer p-2.5 rounded-lg border border-[#DDD8CF]/80 hover:border-[#B08A45] hover:bg-[#F7F5F0]/60 transition-all"
                            >
                              <div className="aspect-3/4 rounded overflow-hidden bg-[#E8E4DC] mb-2">
                                <img 
                                  src={p.image} 
                                  alt={p.name} 
                                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                                  loading="lazy" 
                                />
                              </div>
                              <span className="text-[10px] text-[#77736B] uppercase block truncate">{p.category}</span>
                              <h5 className="font-serif text-xs font-semibold text-[#111111] truncate group-hover:text-[#B08A45] transition-colors">
                                {p.name}
                              </h5>
                              <span className="text-xs font-mono font-medium text-[#111111]">{p.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="pt-4 border-t border-[#DDD8CF] flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-xs text-[#77736B]">
                        Bespoke fitting available at Karachi & Lahore ateliers
                      </div>
                      <button
                        onClick={() => navigate(`/shop?category=${capsule.categoryFilter}`)}
                        className="w-full sm:w-auto px-6 py-3 bg-[#111111] hover:bg-[#222222] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0"
                      >
                        <span>Shop Entire Capsule</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#D0B16A]" />
                      </button>
                    </div>

                  </div>

                </div>
              </section>
            );
          })}
        </div>

        {/* Lookbook Callout Banner */}
        <div className="mt-16 p-8 lg:p-12 rounded-2xl bg-[#111111] text-white flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D0B16A] block mb-2">
              Editorial Showcase
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
              The Interactive Lookbook
            </h2>
            <p className="text-xs text-white/70 mt-2 leading-relaxed">
              Explore high-resolution editorial photography captured on location across architectural landmarks in Lahore and Karachi, with shoppable garment hotspots.
            </p>
          </div>
          <button
            onClick={() => navigate('/lookbook')}
            className="px-6 py-3.5 bg-[#B08A45] hover:bg-[#D0B16A] text-[#111111] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 shrink-0"
          >
            <span>Open Lookbook</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default CollectionsPage;
