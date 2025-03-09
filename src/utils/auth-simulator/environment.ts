
/**
 * Détecte si l'application est exécutée dans l'environnement Lovable/preview
 */
export const isPreviewEnvironment = (): boolean => {
  return typeof window !== 'undefined' && 
         (window.location.hostname.includes('lovableproject.com') || 
          window.top !== window.self);
};
