
import React from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  onLoad,
  onError,
  className
}) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={onLoad}
      onError={onError}
      className={className}
    />
  );
};

export default React.memo(OptimizedImage);
