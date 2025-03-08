
import { motion } from 'framer-motion';
import { Suspense, useState } from 'react';
import { cn } from '@/lib/utils';

const SplashContent = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* Center logo with animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
        }}
        transition={{ 
          duration: 0.8,
          ease: "easeOut" 
        }}
        className="flex justify-center items-center"
      >
        <Suspense fallback={
          <div className="w-full h-[280px] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-eatly-primary/20 border-t-eatly-primary animate-spin rounded-full"></div>
          </div>
        }>
          {imageError ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-eatly-primary font-avantgarde text-7xl"
            >
              eatly
            </motion.div>
          ) : (
            <motion.img 
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: imageLoaded ? 1 : 0,
                scale: imageLoaded ? [1, 1.05, 1] : 0.95
              }}
              transition={{ 
                duration: 2,
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
              src="/lovable-uploads/ba204c1d-73b7-42d1-94db-5a7b94ae3ff8.png" 
              alt="Eatly Logo" 
              className={cn(
                "w-auto h-[340px] md:h-[400px] will-change-transform will-change-opacity gpu-accelerated",
                !imageLoaded && "invisible"
              )}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
        </Suspense>
      </motion.div>

      {/* Subtle loading indicator instead of text message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-8"
      >
        <div className="w-8 h-8 border-2 border-eatly-primary/10 border-t-eatly-primary/70 rounded-full animate-spin"></div>
      </motion.div>
    </div>
  );
};

export default SplashContent;
