
import { motion, AnimatePresence } from 'framer-motion';
import { useState, FC, useEffect, useCallback } from 'react';
import { CONTAINER_ANIMATION } from './logo/logoAnimations';
import { getContainerClasses, useLogoSource } from './logo/logoUtils';
import LogoError from './logo/LogoError';
import LogoImageContent from './logo/LogoImageContent';

interface LogoImageProps {
  className?: string;
  variant?: 'default' | 'confidentiality' | 'splash';
  lovableId?: string;
}

const LogoImage: FC<LogoImageProps> = ({ 
  className = '', 
  variant = 'default', 
  lovableId 
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const getLogoSrc = useLogoSource(lovableId, variant);
  const logoSrc = getLogoSrc();
  const containerClasses = getContainerClasses(variant, className);

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

  return (
    <motion.div
      variants={CONTAINER_ANIMATION}
      initial="initial"
      animate="animate"
      className={containerClasses}
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
