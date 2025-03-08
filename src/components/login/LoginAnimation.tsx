
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import AnimatedBackground from './AnimatedBackground';

const LoginAnimation = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden px-8">
      {/* Fond blanc */}
      <AnimatedBackground />

      {/* Logo centré et agrandi */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex items-center justify-center"
      >
        {imageError ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-eatly-primary font-avantgarde text-6xl py-8"
          >
            eatly
          </motion.div>
        ) : (
          <motion.img 
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="/lovable-uploads/24f50b86-9d7d-412b-8a05-4ebb531f0b26.png" 
            alt="Eatly Logo" 
            className={cn(
              "w-auto h-[300px] max-w-full will-change-transform will-change-opacity gpu-accelerated",
              !imageLoaded && "invisible"
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
      </motion.div>
    </div>
  );
};

export default LoginAnimation;
