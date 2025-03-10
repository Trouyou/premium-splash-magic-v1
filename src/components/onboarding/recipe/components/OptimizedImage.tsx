
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
  
  const handleLoad = () => {
    setHasLoaded(true);
    if (onLoad) onLoad();
  };
  
  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setHasError(true);
      setImgSrc(fallbackSrc);
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
