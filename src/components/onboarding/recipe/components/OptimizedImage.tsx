
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DEFAULT_IMAGE } from '../utils/constants';

interface OptimizedImageProps {
  src: string;
  alt: string;
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
  fallbackSrc?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  onLoad,
  onError,
  className,
  fallbackSrc = DEFAULT_IMAGE
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);
  
  const handleLoad = () => {
    setHasLoaded(true);
    if (onLoad) onLoad();
  };
  
  const handleError = () => {
    // Si nous avons déjà une erreur et utilisons déjà l'image de fallback, ne rien faire
    if (hasError && imgSrc === fallbackSrc) {
      if (onError) onError();
      return;
    }

    // Si nous avons une erreur mais n'utilisons pas encore l'image de fallback
    if (!hasError || (hasError && imgSrc !== fallbackSrc)) {
      setHasError(true);
      
      // Si nous n'avons pas encore atteint le maximum de tentatives, essayer de recharger l'image originale
      if (retryCount < 1 && imgSrc === src) {
        setRetryCount(prev => prev + 1);
        
        // Force le navigateur à recharger l'image en ajoutant un timestamp
        const timestamp = new Date().getTime();
        const imageWithTimestamp = `${src}?t=${timestamp}`;
        setImgSrc(imageWithTimestamp);
      } else {
        // Si nous avons atteint le maximum de tentatives ou si ce n'est pas l'image originale, 
        // utiliser l'image de fallback
        setImgSrc(fallbackSrc);
      }
    }
    
    if (onError) onError();
  };

  return (
    <motion.img
      src={imgSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
      className={`${className} ${hasLoaded ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};

export default React.memo(OptimizedImage);
