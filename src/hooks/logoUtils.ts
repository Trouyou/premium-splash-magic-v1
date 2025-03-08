
import { useCallback } from 'react';

/**
 * Hook to get the logo source path based on variant and ID
 */
export const useLogoSrc = (lovableId?: string, variant: 'default' | 'confidentiality' | 'splash' = 'default') => {
  const getLogoSrc = useCallback(() => {
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

  return getLogoSrc();
};
