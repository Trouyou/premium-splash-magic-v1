
import { motion, AnimatePresence } from 'framer-motion';
import { useState, FC, useEffect, useCallback } from 'react';
import { CONTAINER_ANIMATION } from '@/hooks/logoAnimations';
import { useLogoSrc } from '@/hooks/logoUtils';
import LogoError from './LogoError';
import LogoImageContent from './LogoImageContent';

interface LogoImageProps {
  className?: string;
  variant?: 'default' | 'confidentiality' | 'splash';
  lovableId?: string;
}

const LogoImage: FC<LogoImageProps> = ({ className = '', variant = 'default', lovableId }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  // Get the logo source with the specified ID or variant
  const logoSrc = useLogoSrc(lovableId, variant);
  const fallbackLogoSrc = useLogoSrc(undefined, variant); // Default fallback if ID-specific logo fails

  // Reset error state when source changes
  useEffect(() => {
    setImageError(false);
    setIsLoaded(false);
    setRetryCount(0);
  }, [logoSrc]);

  const handleImageError = useCallback(() => {
    console.error(`Erreur de chargement du logo: ${logoSrc}`);
    
    // Try one more time with a short delay (network glitch recovery)
    if (retryCount < 1) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        // Force re-render with the same source to retry
        setIsLoaded(false);
      }, 500);
      return;
    }
    
    // If we've already retried, mark as error
    setImageError(true);
  }, [logoSrc, retryCount]);

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Preload the image
  useEffect(() => {
    const img = new Image();
    img.src = logoSrc;
    
    if (img.complete) {
      handleImageLoad();
    } else {
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [logoSrc, handleImageLoad, handleImageError, retryCount]);

  const getContainerClasses = useCallback(() => {
    switch (variant) {
      case 'confidentiality':
        return 'w-full flex justify-center items-center py-2';
      case 'splash':
        return `w-full h-full flex justify-center items-center ${className}`;
      default:
        return `w-full flex justify-center items-center py-8 sm:py-12 md:py-16 ${className}`;
    }
  }, [variant, className]);

  return (
    <motion.div
      variants={CONTAINER_ANIMATION}
      initial="initial"
      animate="animate"
      className={getContainerClasses()}
    >
      <AnimatePresence mode="wait">
        {imageError ? (
          <LogoError variant={variant} />
        ) : (
          <LogoImageContent
            logoSrc={logoSrc}
            variant={variant}
            isLoaded={isLoaded}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LogoImage;
