
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const LogoImage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full flex justify-center items-center py-16"
    >
      {imageError ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-eatly-primary font-avantgarde text-5xl"
        >
          eatly
        </motion.div>
      ) : (
        <motion.img 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: imageLoaded ? 1 : 0, 
            scale: imageLoaded ? 1 : 0.95 
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut" 
          }}
          src="/lovable-uploads/ba204c1d-73b7-42d1-94db-5a7b94ae3ff8.png" 
          alt="Eatly Cocotte Rouge Logo" 
          className={cn(
            "w-auto h-[280px] md:h-[320px] pot-shadow will-change-transform will-change-opacity gpu-accelerated",
            !imageLoaded && "invisible"
          )}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}
    </motion.div>
  );
};

export default LogoImage;
