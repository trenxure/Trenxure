import { Product, LookbookItem, Coupon, CustomerProfile, Order } from '../types/commerce';

// Luxury fashion photography matching the screenshot aesthetics
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Abstract Print Blazer',
    slug: 'abstract-print-blazer',
    sku: 'TRX-BLZ-ABS01',
    tagline: 'Signature vibrant abstract artwork on tailored structured cotton blend.',
    description: 'An unapologetic statement piece combining artisanal digital brushstrokes with structured Italian tailoring. Crafted with a premium cotton-viscose blend that breathes effortlessly while holding a sharp, razor-clean shoulder silhouette.',
    categoryId: 'blazers',
    categoryName: 'Blazers',
    collectionIds: ['formal', 'casual', 'new-arrivals', 'best-sellers'],
    style: 'Abstract',
    gender: 'Unisex',
    basePrice: 15000,
    compareAtPrice: 18500,
    status: 'active',
    featured: true,
    newArrival: true,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v-1-s', productId: 'prod-1', sku: 'TRX-BLZ-ABS01-S', color: 'Midnight Multi', colorHex: '#1E293B', size: 'S', price: 15000, stockQuantity: 14, reservedQuantity: 1, lowStockThreshold: 3, active: true },
      { id: 'v-1-m', productId: 'prod-1', sku: 'TRX-BLZ-ABS01-M', color: 'Midnight Multi', colorHex: '#1E293B', size: 'M', price: 15000, stockQuantity: 8, reservedQuantity: 0, lowStockThreshold: 3, active: true },
      { id: 'v-1-l', productId: 'prod-1', sku: 'TRX-BLZ-ABS01-L', color: 'Midnight Multi', colorHex: '#1E293B', size: 'L', price: 15000, stockQuantity: 4, reservedQuantity: 1, lowStockThreshold: 3, active: true },
      { id: 'v-1-xl', productId: 'prod-1', sku: 'TRX-BLZ-ABS01-XL', color: 'Midnight Multi', colorHex: '#1E293B', size: 'XL', price: 15000, stockQuantity: 2, reservedQuantity: 0, lowStockThreshold: 3, active: true },
    ],
    material: '70% Combed Cotton, 30% Fine Viscose with Silk-feel Lining',
    fit: 'Modern tailored fit with sculpted lapels and dual back vents',
    careInstructions: ['Dry clean recommended', 'Steam iron at medium heat', 'Do not bleach or tumble dry'],
    reviewsCount: 38,
    averageRating: 4.9,
    createdAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'prod-2',
    name: 'Floral Print Blazer',
    slug: 'floral-print-blazer',
    sku: 'TRX-BLZ-FLR02',
    tagline: 'Deep indigo botanical print with champagne gold accents.',
    description: 'Inspired by traditional Mughal botanical engravings re-imagined through contemporary European tailoring. The deep indigo ground features hand-rendered petal motifs that glow subtly under evening illumination.',
    categoryId: 'blazers',
    categoryName: 'Blazers',
    collectionIds: ['formal', 'seasonal', 'new-arrivals'],
    style: 'Floral',
    gender: 'Women',
    basePrice: 15000,
    compareAtPrice: 17500,
    status: 'active',
    featured: true,
    newArrival: true,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v-2-s', productId: 'prod-2', sku: 'TRX-BLZ-FLR02-S', color: 'Indigo Petal', colorHex: '#1E3A8A', size: 'S', price: 15000, stockQuantity: 12, reservedQuantity: 0, lowStockThreshold: 3, active: true },
      { id: 'v-2-m', productId: 'prod-2', sku: 'TRX-BLZ-FLR02-M', color: 'Indigo Petal', colorHex: '#1E3A8A', size: 'M', price: 15000, stockQuantity: 9, reservedQuantity: 2, lowStockThreshold: 3, active: true },
      { id: 'v-2-l', productId: 'prod-2', sku: 'TRX-BLZ-FLR02-L', color: 'Indigo Petal', colorHex: '#1E3A8A', size: 'L', price: 15000, stockQuantity: 5, reservedQuantity: 0, lowStockThreshold: 3, active: true },
    ],
    material: '100% Premium Twill Cotton with Satin Peak Lapels',
    fit: 'Slim contour silhouette with soft padded shoulders',
    careInstructions: ['Specialist dry clean only', 'Store in breathable garment bag'],
    reviewsCount: 24,
    averageRating: 4.8,
    createdAt: '2025-02-01T10:00:00Z'
  },
  {
    id: 'prod-3',
    name: 'Geometric Print Blazer',
    slug: 'geometric-print-blazer',
    sku: 'TRX-BLZ-GEO03',
    tagline: 'Bauhaus-inspired architectural tessellation in warm ochre & black.',
    description: 'Precision angles meet luxury comfort. Featuring mathematically balanced geometric blocks rendered in deep black, warm sand, and champagne gold. A favorite for creative directors, galas, and launch events.',
    categoryId: 'blazers',
    categoryName: 'Blazers',
    collectionIds: ['formal', 'casual', 'new-arrivals', 'best-sellers'],
    style: 'Geometric',
    gender: 'Unisex',
    basePrice: 15000,
    compareAtPrice: 19000,
    status: 'active',
    featured: true,
    newArrival: true,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v-3-s', productId: 'prod-3', sku: 'TRX-BLZ-GEO03-S', color: 'Ochre Bauhaus', colorHex: '#B45309', size: 'S', price: 15000, stockQuantity: 6, reservedQuantity: 0, lowStockThreshold: 2, active: true },
      { id: 'v-3-m', productId: 'prod-3', sku: 'TRX-BLZ-GEO03-M', color: 'Ochre Bauhaus', colorHex: '#B45309', size: 'M', price: 15000, stockQuantity: 11, reservedQuantity: 1, lowStockThreshold: 3, active: true },
      { id: 'v-3-l', productId: 'prod-3', sku: 'TRX-BLZ-GEO03-L', color: 'Ochre Bauhaus', colorHex: '#B45309', size: 'L', price: 15000, stockQuantity: 8, reservedQuantity: 0, lowStockThreshold: 3, active: true },
      { id: 'v-3-xl', productId: 'prod-3', sku: 'TRX-BLZ-GEO03-XL', color: 'Ochre Bauhaus', colorHex: '#B45309', size: 'XL', price: 15000, stockQuantity: 3, reservedQuantity: 0, lowStockThreshold: 2, active: true },
    ],
    material: 'Heavyweight Matte Cotton Satin (340 GSM)',
    fit: 'Relaxed tailored cut with notched lapels and horn buttons',
    careInstructions: ['Dry clean only', 'Keep away from direct high heat'],
    reviewsCount: 42,
    averageRating: 5.0,
    createdAt: '2025-02-10T10:00:00Z'
  },
  {
    id: 'prod-4',
    name: 'Graffiti Print Blazer',
    slug: 'graffiti-print-blazer',
    sku: 'TRX-BLZ-GRF04',
    tagline: 'High-contrast street calligraphy and spray-can typography on tailored black.',
    description: 'Raw urban energy transformed into high fashion. Curated graffiti scripts, splatter textures, and neon highlights fuse together over a triple-black base. Hand-finished detailing ensures every piece looks distinct.',
    categoryId: 'blazers',
    categoryName: 'Blazers',
    collectionIds: ['casual', 'new-arrivals'],
    style: 'Graffiti',
    gender: 'Men',
    basePrice: 15000,
    compareAtPrice: 18000,
    status: 'active',
    featured: true,
    newArrival: true,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1550246140-5119ae4790b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v-4-m', productId: 'prod-4', sku: 'TRX-BLZ-GRF04-M', color: 'Street Ink', colorHex: '#18181B', size: 'M', price: 15000, stockQuantity: 7, reservedQuantity: 0, lowStockThreshold: 2, active: true },
      { id: 'v-4-l', productId: 'prod-4', sku: 'TRX-BLZ-GRF04-L', color: 'Street Ink', colorHex: '#18181B', size: 'L', price: 15000, stockQuantity: 5, reservedQuantity: 1, lowStockThreshold: 2, active: true },
      { id: 'v-4-xl', productId: 'prod-4', sku: 'TRX-BLZ-GRF04-XL', color: 'Street Ink', colorHex: '#18181B', size: 'XL', price: 15000, stockQuantity: 4, reservedQuantity: 0, lowStockThreshold: 2, active: true },
    ],
    material: 'Pure Cotton Canvas with matte water-based HD pigmentation',
    fit: 'Modern boxy cut with dropped shoulder slope',
    careInstructions: ['Gentle cold wash inside out or dry clean', 'Iron on reverse'],
    reviewsCount: 19,
    averageRating: 4.7,
    createdAt: '2025-02-18T10:00:00Z'
  },
  {
    id: 'prod-5',
    name: 'Luxury Print Blazer',
    slug: 'luxury-print-blazer',
    sku: 'TRX-BLZ-LUX05',
    tagline: 'Baroque gold leaf filigree on midnight black velvet texture.',
    description: 'The pinnacle of evening opulence. Detailed baroque medallions, intricate acanthus scrolls, and gilded micro-filigree shimmer subtly on an ebony canvas. Perfect for formal dinners, award ceremonies, and red carpet moments.',
    categoryId: 'blazers',
    categoryName: 'Blazers',
    collectionIds: ['formal', 'new-arrivals', 'best-sellers', 'seasonal'],
    style: 'Luxury',
    gender: 'Unisex',
    basePrice: 15000,
    compareAtPrice: 22000,
    status: 'active',
    featured: true,
    newArrival: true,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v-5-s', productId: 'prod-5', sku: 'TRX-BLZ-LUX05-S', color: 'Royal Gold & Black', colorHex: '#B08A45', size: 'S', price: 15000, stockQuantity: 5, reservedQuantity: 0, lowStockThreshold: 2, active: true },
      { id: 'v-5-m', productId: 'prod-5', sku: 'TRX-BLZ-LUX05-M', color: 'Royal Gold & Black', colorHex: '#B08A45', size: 'M', price: 15000, stockQuantity: 9, reservedQuantity: 2, lowStockThreshold: 3, active: true },
      { id: 'v-5-l', productId: 'prod-5', sku: 'TRX-BLZ-LUX05-L', color: 'Royal Gold & Black', colorHex: '#B08A45', size: 'L', price: 15000, stockQuantity: 6, reservedQuantity: 0, lowStockThreshold: 2, active: true },
      { id: 'v-5-xl', productId: 'prod-5', sku: 'TRX-BLZ-LUX05-XL', color: 'Royal Gold & Black', colorHex: '#B08A45', size: 'XL', price: 15000, stockQuantity: 3, reservedQuantity: 1, lowStockThreshold: 2, active: true },
    ],
    material: 'Premium Cotton-Rich Velvet blend with hand-stitched silk lining',
    fit: 'Tailored regal silhouette with shawl lapel option',
    careInstructions: ['Professional dry clean only', 'Do not press with direct iron'],
    reviewsCount: 56,
    averageRating: 4.9,
    createdAt: '2025-02-22T10:00:00Z'
  },
  {
    id: 'prod-6',
    name: 'Architects of Tomorrow Heavyweight Hoodie',
    slug: 'architects-of-tomorrow-hoodie',
    sku: 'TRX-HD-ARCH06',
    tagline: 'Heavy 420 GSM French terry hoodie with metallic typography and art back print.',
    description: 'Designed for effortless warmth and street presence. Features double-layered hood without drawstrings for a streamlined brutalist silhouette, kangaroo pocket, and high-density puffed lettering across the chest and back.',
    categoryId: 'hoodies',
    categoryName: 'Hoodies',
    collectionIds: ['casual', 'best-sellers', 'seasonal'],
    style: 'Graffiti',
    gender: 'Unisex',
    basePrice: 9500,
    compareAtPrice: 12000,
    status: 'active',
    featured: true,
    newArrival: false,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v-6-s', productId: 'prod-6', sku: 'TRX-HD-ARCH06-S', color: 'Washed Oat', colorHex: '#E5E5E5', size: 'S', price: 9500, stockQuantity: 15, reservedQuantity: 0, lowStockThreshold: 4, active: true },
      { id: 'v-6-m', productId: 'prod-6', sku: 'TRX-HD-ARCH06-M', color: 'Washed Oat', colorHex: '#E5E5E5', size: 'M', price: 9500, stockQuantity: 20, reservedQuantity: 1, lowStockThreshold: 4, active: true },
      { id: 'v-6-l', productId: 'prod-6', sku: 'TRX-HD-ARCH06-L', color: 'Washed Oat', colorHex: '#E5E5E5', size: 'L', price: 9500, stockQuantity: 14, reservedQuantity: 0, lowStockThreshold: 4, active: true },
      { id: 'v-6-xl', productId: 'prod-6', sku: 'TRX-HD-ARCH06-XL', color: 'Washed Oat', colorHex: '#E5E5E5', size: 'XL', price: 9500, stockQuantity: 8, reservedQuantity: 0, lowStockThreshold: 3, active: true },
    ],
    material: '100% Organic Heavyweight French Terry Cotton (420 GSM)',
    fit: 'Oversized boxy drop-shoulder fit',
    careInstructions: ['Machine wash cold inside out', 'Hang dry in shade to preserve print vibrancy'],
    reviewsCount: 67,
    averageRating: 4.9,
    createdAt: '2025-01-05T10:00:00Z'
  },
  {
    id: 'prod-7',
    name: 'Atelier Noir High-Density Hoodie',
    slug: 'atelier-noir-hoodie',
    sku: 'TRX-HD-ATEL07',
    tagline: 'Deep onyx French terry hoodie with gold stipple typography.',
    description: 'Subtle elegance meets street couture. The Atelier Noir hoodie boasts a custom drop-needle cuff finish and high-precision silk-screened typographic emblems on both sleeves and chest.',
    categoryId: 'hoodies',
    categoryName: 'Hoodies',
    collectionIds: ['casual', 'seasonal'],
    style: 'Luxury',
    gender: 'Unisex',
    basePrice: 9500,
    compareAtPrice: 11500,
    status: 'active',
    featured: false,
    newArrival: false,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v-7-m', productId: 'prod-7', sku: 'TRX-HD-ATEL07-M', color: 'Charcoal Black', colorHex: '#18181B', size: 'M', price: 9500, stockQuantity: 12, reservedQuantity: 0, lowStockThreshold: 3, active: true },
      { id: 'v-7-l', productId: 'prod-7', sku: 'TRX-HD-ATEL07-L', color: 'Charcoal Black', colorHex: '#18181B', size: 'L', price: 9500, stockQuantity: 10, reservedQuantity: 0, lowStockThreshold: 3, active: true },
    ],
    material: '100% Combed Compact Cotton (400 GSM)',
    fit: 'Modern tailored athletic fit',
    careInstructions: ['Machine wash cold', 'Tumble dry low'],
    reviewsCount: 31,
    averageRating: 4.8,
    createdAt: '2025-01-20T10:00:00Z'
  },
  {
    id: 'prod-8',
    name: 'The Future is Female Statement Tee',
    slug: 'the-future-is-female-tee',
    sku: 'TRX-TEE-FEM08',
    tagline: '280 GSM heavyweight luxury cotton tee with vintage typography.',
    description: 'Heavyweight organic combed cotton cut in a vintage relaxed silhouette. Ribbed thick collar that retains its form through hundreds of washes without baconing.',
    categoryId: 't-shirts',
    categoryName: 'T-Shirts',
    collectionIds: ['casual', 'best-sellers'],
    style: 'Graffiti',
    gender: 'Women',
    basePrice: 5500,
    compareAtPrice: 6500,
    status: 'active',
    featured: true,
    newArrival: false,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v-8-s', productId: 'prod-8', sku: 'TRX-TEE-FEM08-S', color: 'Off-White Ivory', colorHex: '#F7F5F0', size: 'S', price: 5500, stockQuantity: 25, reservedQuantity: 2, lowStockThreshold: 5, active: true },
      { id: 'v-8-m', productId: 'prod-8', sku: 'TRX-TEE-FEM08-M', color: 'Off-White Ivory', colorHex: '#F7F5F0', size: 'M', price: 5500, stockQuantity: 30, reservedQuantity: 1, lowStockThreshold: 5, active: true },
      { id: 'v-8-l', productId: 'prod-8', sku: 'TRX-TEE-FEM08-L', color: 'Off-White Ivory', colorHex: '#F7F5F0', size: 'L', price: 5500, stockQuantity: 18, reservedQuantity: 0, lowStockThreshold: 5, active: true },
    ],
    material: '100% Ring-Spun Compact Cotton (280 GSM)',
    fit: 'Relaxed vintage boxy cut with drop shoulder',
    careInstructions: ['Machine wash cold with like colors', 'Warm iron if needed'],
    reviewsCount: 52,
    averageRating: 4.9,
    createdAt: '2025-01-12T10:00:00Z'
  },
  {
    id: 'prod-9',
    name: 'Grind & Be Kind Graphic Tee',
    slug: 'grind-and-be-kind-tee',
    sku: 'TRX-TEE-GRN09',
    tagline: 'Distressed typography on mineral-washed slate jersey.',
    description: 'An understated everyday staple with an unmistakable presence. Mineral enzyme washed for an ultra-soft broken-in feel right out of the box.',
    categoryId: 't-shirts',
    categoryName: 'T-Shirts',
    collectionIds: ['casual'],
    style: 'Abstract',
    gender: 'Unisex',
    basePrice: 5500,
    compareAtPrice: 6500,
    status: 'active',
    featured: false,
    newArrival: false,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v-9-s', productId: 'prod-9', sku: 'TRX-TEE-GRN09-S', color: 'Slate Heather', colorHex: '#64748B', size: 'S', price: 5500, stockQuantity: 14, reservedQuantity: 0, lowStockThreshold: 4, active: true },
      { id: 'v-9-m', productId: 'prod-9', sku: 'TRX-TEE-GRN09-M', color: 'Slate Heather', colorHex: '#64748B', size: 'M', price: 5500, stockQuantity: 22, reservedQuantity: 0, lowStockThreshold: 4, active: true },
      { id: 'v-9-l', productId: 'prod-9', sku: 'TRX-TEE-GRN09-L', color: 'Slate Heather', colorHex: '#64748B', size: 'L', price: 5500, stockQuantity: 19, reservedQuantity: 1, lowStockThreshold: 4, active: true },
      { id: 'v-9-xl', productId: 'prod-9', sku: 'TRX-TEE-GRN09-XL', color: 'Slate Heather', colorHex: '#64748B', size: 'XL', price: 5500, stockQuantity: 9, reservedQuantity: 0, lowStockThreshold: 3, active: true },
    ],
    material: '100% Combed Cotton with mineral wash finish',
    fit: 'Standard street fit',
    careInstructions: ['Cold wash', 'Do not tumble dry'],
    reviewsCount: 29,
    averageRating: 4.7,
    createdAt: '2025-01-18T10:00:00Z'
  },
  {
    id: 'prod-10',
    name: 'Marble Noir Silk-Touch Shirt',
    slug: 'marble-noir-shirt',
    sku: 'TRX-SHT-MRB10',
    tagline: 'Flowing Italian marble veins printed on ultra-fluid lyocell.',
    description: 'Liquid elegance. The fluid drape of high-grade lyocell catches natural movement like water, highlighting monochrome marble fractures interspersed with micro-gold veins.',
    categoryId: 'shirts',
    categoryName: 'Shirts',
    collectionIds: ['formal', 'casual', 'seasonal'],
    style: 'Marble',
    gender: 'Men',
    basePrice: 11500,
    compareAtPrice: 14000,
    status: 'active',
    featured: true,
    newArrival: true,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v-10-s', productId: 'prod-10', sku: 'TRX-SHT-MRB10-S', color: 'Carrara Noir', colorHex: '#1E293B', size: 'S', price: 11500, stockQuantity: 8, reservedQuantity: 0, lowStockThreshold: 2, active: true },
      { id: 'v-10-m', productId: 'prod-10', sku: 'TRX-SHT-MRB10-M', color: 'Carrara Noir', colorHex: '#1E293B', size: 'M', price: 11500, stockQuantity: 12, reservedQuantity: 1, lowStockThreshold: 3, active: true },
      { id: 'v-10-l', productId: 'prod-10', sku: 'TRX-SHT-MRB10-L', color: 'Carrara Noir', colorHex: '#1E293B', size: 'L', price: 11500, stockQuantity: 6, reservedQuantity: 0, lowStockThreshold: 2, active: true },
    ],
    material: '100% Sustainable Tencel Lyocell',
    fit: 'Cuban camp collar relaxed resort silhouette',
    careInstructions: ['Hand wash or delicate machine wash', 'Line dry in shade'],
    reviewsCount: 18,
    averageRating: 4.8,
    createdAt: '2025-02-14T10:00:00Z'
  },
  {
    id: 'prod-11',
    name: 'Ethnic Tapestry Bespoke Overcoat',
    slug: 'ethnic-tapestry-overcoat',
    sku: 'TRX-COT-ETH11',
    tagline: 'Heritage Indus kilim tapestry reinterpreted into an ankle-length winter coat.',
    description: 'A museum-grade garment blending centuries of regional textile geometry with contemporary trench tailoring. Double-breasted storm flap with pure horn buttons and cashmere-blend warmth.',
    categoryId: 'coats',
    categoryName: 'Coats',
    collectionIds: ['formal', 'seasonal', 'best-sellers'],
    style: 'Ethnic',
    gender: 'Women',
    basePrice: 28000,
    compareAtPrice: 34000,
    status: 'active',
    featured: true,
    newArrival: false,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v-11-s', productId: 'prod-11', sku: 'TRX-COT-ETH11-S', color: 'Tapestry Indigo', colorHex: '#312E81', size: 'S', price: 28000, stockQuantity: 4, reservedQuantity: 0, lowStockThreshold: 2, active: true },
      { id: 'v-11-m', productId: 'prod-11', sku: 'TRX-COT-ETH11-M', color: 'Tapestry Indigo', colorHex: '#312E81', size: 'M', price: 28000, stockQuantity: 6, reservedQuantity: 1, lowStockThreshold: 2, active: true },
      { id: 'v-11-l', productId: 'prod-11', sku: 'TRX-COT-ETH11-L', color: 'Tapestry Indigo', colorHex: '#312E81', size: 'L', price: 28000, stockQuantity: 3, reservedQuantity: 0, lowStockThreshold: 2, active: true },
    ],
    material: '70% Wool, 20% Cashmere, 10% Structured Cotton',
    fit: 'Tailored oversized trench fit with belt tie',
    careInstructions: ['Dry clean only by leather & coat specialist'],
    reviewsCount: 45,
    averageRating: 5.0,
    createdAt: '2024-12-10T10:00:00Z'
  },
  {
    id: 'prod-12',
    name: 'Pleated Architectural Cargo Trousers',
    slug: 'pleated-cargo-trousers',
    sku: 'TRX-PNT-CRG12',
    tagline: 'Double-pleated waist with clean origami cargo pockets and adjustable hems.',
    description: 'Elegance without sacrifice. Tailored trouser pleats at the waist transition into minimalist flush cargo compartments with magnetic closure snaps.',
    categoryId: 'pants',
    categoryName: 'Pants',
    collectionIds: ['cargo', 'casual'],
    style: 'Geometric',
    gender: 'Men',
    basePrice: 9500,
    compareAtPrice: 12000,
    status: 'active',
    featured: false,
    newArrival: true,
    bestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { id: 'v-12-s', productId: 'prod-12', sku: 'TRX-PNT-CRG12-S', color: 'Deep Sand', colorHex: '#D6C7B2', size: 'S', price: 9500, stockQuantity: 9, reservedQuantity: 0, lowStockThreshold: 3, active: true },
      { id: 'v-12-m', productId: 'prod-12', sku: 'TRX-PNT-CRG12-M', color: 'Deep Sand', colorHex: '#D6C7B2', size: 'M', price: 9500, stockQuantity: 14, reservedQuantity: 1, lowStockThreshold: 3, active: true },
      { id: 'v-12-l', productId: 'prod-12', sku: 'TRX-PNT-CRG12-L', color: 'Deep Sand', colorHex: '#D6C7B2', size: 'L', price: 9500, stockQuantity: 11, reservedQuantity: 0, lowStockThreshold: 3, active: true },
    ],
    material: '98% Heavyweight Cotton Twill, 2% Elastane',
    fit: 'Tapered carrot leg with adjustable ankle cinch',
    careInstructions: ['Machine wash cold', 'Iron inside out'],
    reviewsCount: 22,
    averageRating: 4.8,
    createdAt: '2025-02-05T10:00:00Z'
  }
];

export const CATEGORIES_DATA = [
  {
    id: 'blazers',
    name: 'Blazers',
    subtitle: 'For Men & Women',
    description: 'Statement printed blazers crafted with Italian cuts and high-definition textile art.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
    itemCount: 5
  },
  {
    id: 'hoodies',
    name: 'Hoodies',
    subtitle: 'Stay Warm, Stay Bold',
    description: 'Heavyweight 420 GSM French terry hoodies with metallic stipple and puffed artwork.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
    itemCount: 2
  },
  {
    id: 't-shirts',
    name: 'T-Shirts',
    subtitle: 'Everyday Statement',
    description: 'Luxury 280 GSM combed cotton vintage cut tees built for lasting daily wear.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
    itemCount: 2
  },
  {
    id: 'coats',
    name: 'Coats',
    subtitle: 'Winter Grandeur',
    description: 'Wool-cashmere blend tailored overcoats featuring historic regional tapestry prints.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
    itemCount: 1
  },
  {
    id: 'pants',
    name: 'Pants',
    subtitle: 'Tailored Motion',
    description: 'Double-pleated architectural trousers and structured streetwear cargo silhouettes.',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80',
    itemCount: 1
  },
  {
    id: 'shirts',
    name: 'Shirts',
    subtitle: 'Liquid Elegance',
    description: 'Resort camp collars and silk-touch lyocell shirts with flowing marble textures.',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
    itemCount: 1
  }
];

export const STYLES_DATA = [
  { name: 'Abstract', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=500&q=80' },
  { name: 'Floral', image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=500&q=80' },
  { name: 'Luxury', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=500&q=80' },
  { name: 'Geometric', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=500&q=80' },
  { name: 'Graffiti', image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=500&q=80' },
  { name: 'Marble', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80' },
  { name: 'Ethnic', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80' },
];

export const LOOKBOOK_DATA: LookbookItem[] = [
  {
    id: 'look-1',
    title: 'Autumn/Winter 2024 Editorial',
    season: 'Autumn/Winter 2024',
    subtitle: 'Outfit 01 / The City Explorer',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    location: 'Lahore Arts Council & Old Anarkali',
    hotspots: [
      { id: 'hs-1', xPercent: 48, yPercent: 35, productId: 'prod-1', label: 'Abstract Print Blazer', price: 15000 },
      { id: 'hs-2', xPercent: 52, yPercent: 68, productId: 'prod-12', label: 'Pleated Cargo Trousers', price: 9500 }
    ],
    featuredGarments: ['Abstract Print Blazer', 'Pleated Cargo Trousers']
  },
  {
    id: 'look-2',
    title: 'The Contemporary Minimalist',
    season: 'Spring/Summer 2025',
    subtitle: 'Outfit 02 / The Gallery Patron',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=80',
    location: 'Karachi Contemporary Gallery',
    hotspots: [
      { id: 'hs-3', xPercent: 50, yPercent: 40, productId: 'prod-2', label: 'Floral Print Blazer', price: 15000 }
    ],
    featuredGarments: ['Floral Print Blazer', 'Tailored Cigarette Pants']
  },
  {
    id: 'look-3',
    title: 'Urban Street Architect',
    season: 'Autumn/Winter 2024',
    subtitle: 'Outfit 03 / Studio Nights',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    location: 'Islamabad Diplomatic Enclave',
    hotspots: [
      { id: 'hs-4', xPercent: 45, yPercent: 32, productId: 'prod-6', label: 'Architects of Tomorrow Hoodie', price: 9500 }
    ],
    featuredGarments: ['Architects of Tomorrow Hoodie']
  },
  {
    id: 'look-4',
    title: 'High-Society Noir Gala',
    season: 'Capsule Edition',
    subtitle: 'Outfit 04 / Midnight Symphony',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    location: 'Mohatta Palace Gardens',
    hotspots: [
      { id: 'hs-5', xPercent: 52, yPercent: 38, productId: 'prod-5', label: 'Luxury Print Blazer', price: 15000 }
    ],
    featuredGarments: ['Luxury Print Blazer']
  },
  {
    id: 'look-5',
    title: 'Architectural Geometric Edge',
    season: 'Autumn/Winter 2024',
    subtitle: 'Outfit 05 / Form Follows Art',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=80',
    location: 'Karachi Port Trust Heritage Quarter',
    hotspots: [
      { id: 'hs-6', xPercent: 48, yPercent: 40, productId: 'prod-3', label: 'Geometric Print Blazer', price: 15000 }
    ],
    featuredGarments: ['Geometric Print Blazer', 'Ethnic Tapestry Overcoat']
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1513094735237-8f2714d57c13?auto=format&fit=crop&w=500&q=80',
    likes: '6,472',
    caption: 'The magic of sunrise in NYC. Walking across the Brooklyn Bridge yet the city wakes up to an unforgettable experience. #TrenxureWorld'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80',
    likes: '4,891',
    caption: 'Pocket-sized inspiration. Behind the scenes of our Autumn drop.'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1550246140-5119ae4790b8?auto=format&fit=crop&w=500&q=80',
    likes: '5,120',
    caption: 'Classic sculptures meet raw modern streetwear.'
  },
  {
    id: 'ig-4',
    isBrandCard: true,
    caption: 'TRENXURE — Wear Your Statement.'
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500&q=80',
    likes: '3,840',
    caption: 'Mirror moments with the Abstract Blazer in Karachi.'
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80',
    likes: '7,315',
    caption: 'Golden hour warmth meets high-definition textile print.'
  },
  {
    id: 'ig-7',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=500&q=80',
    likes: '4,102',
    caption: 'Elegance in transit. Trench silhouettes for winter.'
  },
  {
    id: 'ig-8',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=80',
    likes: '8,924',
    caption: 'Bespoke tailoring, unapologetic self-expression.'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'TRENXURE10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 5000,
    isActive: true,
    description: '10% off on all orders above Rs. 5,000'
  },
  {
    code: 'WELCOME1500',
    discountType: 'fixed',
    discountValue: 1500,
    minOrderValue: 10000,
    isActive: true,
    description: 'Rs. 1,500 off on orders above Rs. 10,000'
  },
  {
    code: 'VIP20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 25000,
    isActive: true,
    description: 'Exclusive 20% off for Trenxure VIP Club members'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'TRX-94821',
    customerName: 'Hamza Tariq',
    customerEmail: 'hamza.tariq@example.com',
    customerPhone: '+92 300 8492019',
    shippingAddress: {
      fullName: 'Hamza Tariq',
      phone: '+92 300 8492019',
      email: 'hamza.tariq@example.com',
      addressLine1: 'House 42, Street 7, Phase 6 DHA',
      city: 'Karachi',
      province: 'Sindh',
      postalCode: '75500',
      country: 'Pakistan'
    },
    items: [
      {
        productId: 'prod-1',
        variantId: 'v-1-m',
        name: 'Abstract Print Blazer',
        sku: 'TRX-BLZ-ABS01-M',
        color: 'Midnight Multi',
        size: 'M',
        price: 15000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=500&q=80'
      }
    ],
    subtotal: 15000,
    shippingFee: 0,
    discount: 1500,
    couponCode: 'TRENXURE10',
    total: 13500,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    status: 'shipped',
    trackingNumber: 'TCS-902847291',
    statusHistory: [
      { status: 'pending', timestamp: '2025-02-24T14:30:00Z', note: 'Order placed by customer via Cash on Delivery' },
      { status: 'confirmed', timestamp: '2025-02-24T15:00:00Z', note: 'Phone verification confirmed by customer care' },
      { status: 'processing', timestamp: '2025-02-25T09:00:00Z', note: 'Garment passed quality assurance inspection' },
      { status: 'packed', timestamp: '2025-02-25T13:30:00Z', note: 'Packed in signature luxury gift box with dustbag' },
      { status: 'shipped', timestamp: '2025-02-26T10:00:00Z', note: 'Dispatched via TCS Express. Tracking: TCS-902847291' }
    ],
    createdAt: '2025-02-24T14:30:00Z'
  },
  {
    id: 'ord-2',
    orderNumber: 'TRX-94822',
    customerName: 'Ayesha Siddiqui',
    customerEmail: 'ayesha.siddiqui@example.com',
    customerPhone: '+92 321 4458921',
    shippingAddress: {
      fullName: 'Ayesha Siddiqui',
      phone: '+92 321 4458921',
      email: 'ayesha.siddiqui@example.com',
      addressLine1: 'Apartment 5B, Creek Vistas, Phase 8 DHA',
      city: 'Karachi',
      province: 'Sindh',
      postalCode: '75500',
      country: 'Pakistan'
    },
    items: [
      {
        productId: 'prod-5',
        variantId: 'v-5-s',
        name: 'Luxury Print Blazer',
        sku: 'TRX-BLZ-LUX05-S',
        color: 'Royal Gold & Black',
        size: 'S',
        price: 15000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=500&q=80'
      },
      {
        productId: 'prod-8',
        variantId: 'v-8-s',
        name: 'The Future is Female Statement Tee',
        sku: 'TRX-TEE-FEM08-S',
        color: 'Off-White Ivory',
        size: 'S',
        price: 5500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80'
      }
    ],
    subtotal: 20500,
    shippingFee: 0,
    discount: 2050,
    couponCode: 'TRENXURE10',
    total: 18450,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    status: 'delivered',
    trackingNumber: 'TCS-889102374',
    statusHistory: [
      { status: 'pending', timestamp: '2025-02-20T11:20:00Z' },
      { status: 'confirmed', timestamp: '2025-02-20T11:25:00Z', note: 'Payment settled via Visa' },
      { status: 'processing', timestamp: '2025-02-21T08:00:00Z' },
      { status: 'packed', timestamp: '2025-02-21T12:00:00Z' },
      { status: 'shipped', timestamp: '2025-02-21T16:00:00Z' },
      { status: 'delivered', timestamp: '2025-02-23T14:15:00Z', note: 'Delivered and signed by recipient' }
    ],
    createdAt: '2025-02-20T11:20:00Z'
  },
  {
    id: 'ord-3',
    orderNumber: 'TRX-94823',
    customerName: 'Zainab Malik',
    customerEmail: 'zainab.malik@example.com',
    customerPhone: '+92 333 9018472',
    shippingAddress: {
      fullName: 'Zainab Malik',
      phone: '+92 333 9018472',
      email: 'zainab.malik@example.com',
      addressLine1: 'Plot 118, Block G, Gulberg III',
      city: 'Lahore',
      province: 'Punjab',
      postalCode: '54000',
      country: 'Pakistan'
    },
    items: [
      {
        productId: 'prod-6',
        variantId: 'v-6-m',
        name: 'Architects of Tomorrow Heavyweight Hoodie',
        sku: 'TRX-HD-ARCH06-M',
        color: 'Washed Oat',
        size: 'M',
        price: 9500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=500&q=80'
      }
    ],
    subtotal: 9500,
    shippingFee: 350,
    discount: 0,
    total: 9850,
    paymentMethod: 'jazzcash',
    paymentStatus: 'paid',
    status: 'processing',
    statusHistory: [
      { status: 'pending', timestamp: '2025-02-27T18:00:00Z' },
      { status: 'confirmed', timestamp: '2025-02-27T18:05:00Z', note: 'Paid via JazzCash Wallet 0333****472' },
      { status: 'processing', timestamp: '2025-02-28T09:30:00Z', note: 'Handcrafted production in progress' }
    ],
    createdAt: '2025-02-27T18:00:00Z'
  }
];

export const INITIAL_CUSTOMERS: CustomerProfile[] = [
  {
    id: 'cust-1',
    name: 'Hamza Tariq',
    email: 'hamza.tariq@example.com',
    phone: '+92 300 8492019',
    city: 'Karachi',
    ordersCount: 3,
    totalSpent: 42500,
    savedAddresses: [
      {
        fullName: 'Hamza Tariq',
        phone: '+92 300 8492019',
        email: 'hamza.tariq@example.com',
        addressLine1: 'House 42, Street 7, Phase 6 DHA',
        city: 'Karachi',
        province: 'Sindh',
        postalCode: '75500',
        country: 'Pakistan'
      }
    ],
    wishlist: ['prod-3', 'prod-10'],
    joinedDate: '2024-11-12'
  },
  {
    id: 'cust-2',
    name: 'Ayesha Siddiqui',
    email: 'ayesha.siddiqui@example.com',
    phone: '+92 321 4458921',
    city: 'Karachi',
    ordersCount: 4,
    totalSpent: 68000,
    savedAddresses: [
      {
        fullName: 'Ayesha Siddiqui',
        phone: '+92 321 4458921',
        email: 'ayesha.siddiqui@example.com',
        addressLine1: 'Apartment 5B, Creek Vistas, Phase 8 DHA',
        city: 'Karachi',
        province: 'Sindh',
        postalCode: '75500',
        country: 'Pakistan'
      }
    ],
    wishlist: ['prod-1', 'prod-11'],
    joinedDate: '2024-10-04'
  },
  {
    id: 'cust-3',
    name: 'Zainab Malik',
    email: 'zainab.malik@example.com',
    phone: '+92 333 9018472',
    city: 'Lahore',
    ordersCount: 1,
    totalSpent: 9850,
    savedAddresses: [
      {
        fullName: 'Zainab Malik',
        phone: '+92 333 9018472',
        email: 'zainab.malik@example.com',
        addressLine1: 'Plot 118, Block G, Gulberg III',
        city: 'Lahore',
        province: 'Punjab',
        postalCode: '54000',
        country: 'Pakistan'
      }
    ],
    wishlist: ['prod-2'],
    joinedDate: '2025-01-22'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    customerName: 'Bilal Khan',
    customerCity: 'Islamabad',
    rating: 5,
    date: '2025-02-14',
    title: 'Outstanding statement piece!',
    comment: 'Wore this to an art gala in Islamabad. Received endless compliments. The fabric has serious weight and the shoulder cut is razor sharp.',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    customerName: 'Sara Merchant',
    customerCity: 'Karachi',
    rating: 5,
    date: '2025-02-18',
    title: 'The print resolution is magnificent',
    comment: 'The HD print claim is real—the colors are saturated yet matte, without any cheap plastic sheen. Packaging was top tier luxury box.',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    productId: 'prod-3',
    customerName: 'Daniyal Ahmed',
    customerCity: 'Lahore',
    rating: 5,
    date: '2025-02-02',
    title: 'Architectural perfection',
    comment: 'The geometric balance on this blazer is pure art. Sizing fits true to size. Delivery took only 48 hours to Gulberg.',
    verifiedPurchase: true
  }
];
