
import { motion } from 'framer-motion';
import { Suspense, useState } from 'react';
import { cn } from '@/lib/utils';

const SplashContent = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Logo animation variants
  const logoVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut" 
      }
    }
  };

  // Subtle pulse animation for the logo
  const pulsate = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        repeat: Infinity,
        repeatDelay: 0.5
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      {imageError ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-eatly-primary font-avantgarde text-6xl"
        >
          eatly
        </motion.div>
      ) : (
        <motion.div
          initial="initial"
          animate="animate"
          variants={logoVariants}
        >
          <motion.img 
            animate="animate"
            variants={pulsate}
            src="/lovable-uploads/ba204c1d-73b7-42d1-94db-5a7b94ae3ff8.png" 
            alt="Eatly Logo" 
            className={cn(
              "w-auto h-[280px] md:h-[320px] will-change-transform will-change-opacity gpu-accelerated",
              !imageLoaded && "invisible"
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        </motion.div>
      )}
      
      {/* Simple, subtle loading spinner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="w-8 h-8 border-2 border-eatly-primary/10 border-t-eatly-primary/60 rounded-full absolute bottom-12 left-1/2 -translate-x-1/2"
        style={{ animation: 'spin 1.2s linear infinite' }}
      />
    </div>
  );
};

export default SplashContent;
