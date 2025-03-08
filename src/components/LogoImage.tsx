
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
  
  const logoSrc = useLogoSrc(lovableId, variant);

  const handleImageError = useCallback(() => {
    console.error('Erreur de chargement du logo');
    setImageError(true);
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    setIsLoaded(false);
    const img = document.createElement('img');
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
  }, [logoSrc, handleImageLoad, handleImageError]);

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
          <LogoError />
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
