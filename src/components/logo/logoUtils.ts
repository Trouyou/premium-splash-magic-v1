
import { useCallback } from 'react';

// Get the appropriate logo source based on variant and lovableId
export const useLogoSource = (lovableId?: string, variant: 'default' | 'confidentiality' | 'splash' = 'default') => {
  return useCallback(() => {
    if (lovableId) {
      return `/lovable-uploads/${lovableId}.png`;
    }
    
    switch (variant) {
      case 'confidentiality':
        return '/lovable-uploads/4304d601-682c-472c-ace9-1149b80c6b24.png';
      case 'splash':
        return '/lovable-uploads/76f1327b-1b0e-40de-8959-98f93dad884d.png';
      default:
        return '/lovable-uploads/Logo_Eatly_Original_TraitTransparent_1.png';
    }
  }, [lovableId, variant]);
};

// Get container classes based on variant and className
export const getContainerClasses = (variant: 'default' | 'confidentiality' | 'splash', className: string = '') => {
  switch (variant) {
    case 'confidentiality':
      return 'w-full flex justify-center items-center py-2';
    case 'splash':
      return `w-full h-full flex justify-center items-center ${className}`;
    default:
      return `w-full flex justify-center items-center py-8 sm:py-12 md:py-16 ${className}`;
  }
};

// Get image container classes based on variant
export const getImageContainerClasses = (variant: 'default' | 'confidentiality' | 'splash') => {
  switch (variant) {
    case 'confidentiality':
      return 'relative w-full max-w-[240px] sm:max-w-[280px] aspect-[1/1]';
    case 'splash':
      return 'relative w-full max-w-[400px] sm:max-w-[500px] aspect-[1/1] will-change-transform';
    default:
      return 'relative w-full max-w-[320px] sm:max-w-[400px] aspect-[1/1]';
  }
};

// Get image sizes based on variant for responsive loading
export const getImageSizes = (variant: 'default' | 'confidentiality' | 'splash') => {
  switch (variant) {
    case 'confidentiality':
      return "(max-width: 640px) 240px, 280px";
    case 'splash':
      return "(max-width: 640px) 400px, 500px";
    default:
      return "(max-width: 640px) 320px, 400px";
  }
};
