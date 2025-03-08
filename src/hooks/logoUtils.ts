import { useCallback } from 'react';

const DEFAULT_LOGOS = {
  default: '/lovable-uploads/Logo_Eatly_Original_TraitTransparent_1.png',
  confidentiality: '/lovable-uploads/4304d601-682c-472c-ace9-1149b80c6b24.png',
  splash: '/lovable-uploads/76f1327b-1b0e-40de-8959-98f93dad884d.png'
};

/**
 * Hook to get the logo source path based on variant and ID
 */
export const useLogoSrc = (lovableId?: string, variant: 'default' | 'confidentiality' | 'splash' = 'default') => {
  const getLogoSrc = useCallback(() => {
    // If a specific ID is provided, use that
    if (lovableId) {
      return `/lovable-uploads/${lovableId}.png`;
    }
    
    // Otherwise use the default for the specified variant
    return DEFAULT_LOGOS[variant];
  }, [lovableId, variant]);

  return getLogoSrc();
};

/**
 * Utility function to preload an image
 */
export const preloadImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
  });
};
