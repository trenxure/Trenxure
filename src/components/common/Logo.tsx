import React from 'react';
import { BrandLogo } from '../brand/BrandLogo';

export interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isDark?: boolean;
}

/**
 * Universal TRENXURE Brand Logo
 * Uses the BrandLogo component which renders the original supplied image asset.
 * Contains no generated marks, no split text, and no SVG approximations.
 */
export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeClasses = size === 'sm' 
    ? 'h-10 w-auto max-h-10' 
    : size === 'lg' 
    ? 'h-16 w-auto max-h-16' 
    : size === 'xl' 
    ? 'h-24 w-auto max-h-24' 
    : 'h-12 w-auto max-h-12';

  return (
    <div className={`flex items-center select-none ${className}`}>
      <BrandLogo className={sizeClasses} />
    </div>
  );
};

export const TrenxureEmblem: React.FC<{ className?: string; isDark?: boolean; size?: string }> = ({
  className = 'h-12 w-auto'
}) => {
  return <BrandLogo className={className} />;
};

export { Logo as TrenxureCircleLogo };
