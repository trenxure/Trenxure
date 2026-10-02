import React, { useState } from 'react';

export interface BrandLogoProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  priority?: boolean;
  alt?: string;
}

/**
 * Single source of truth for TRENXURE logo.
 * Exact asset file: public/assets/brand/Trenxure-logo.png
 */
const BRAND_LOGO_SRC = '/assets/brand/Trenxure-logo.png';

/**
 * TRENXURE BrandLogo Component.
 * Uses only ONE fixed asset path: /assets/brand/Trenxure-logo.png
 * Never searches for alternative files or falls back to any generated SVG, CSS, text, or icon.
 * Displays a clear development error if the asset cannot be loaded.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  width,
  height,
  className = '',
  priority = false,
  alt = 'TRENXURE'
}) => {
  const [loadError, setLoadError] = useState(false);

  if (loadError) {
    return (
      <div 
        role="alert"
        className="inline-flex items-center px-3 py-1.5 border border-red-500/60 bg-red-950/30 text-red-400 text-xs font-mono rounded"
      >
        <span>Error: Failed to load TRENXURE logo from {BRAND_LOGO_SRC}</span>
      </div>
    );
  }

  return (
    <img
      src={BRAND_LOGO_SRC}
      alt={alt}
      width={width}
      height={height}
      className={`object-contain ${className}`}
      loading={priority ? 'eager' : 'lazy'}
      onError={() => {
        console.error(`[BrandLogo Error] Failed to load brand logo from "${BRAND_LOGO_SRC}". Verify public/assets/brand/Trenxure-logo.png exists.`);
        setLoadError(true);
      }}
    />
  );
};

export default BrandLogo;
