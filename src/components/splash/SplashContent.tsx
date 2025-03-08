
import { motion } from 'framer-motion';
import { Suspense, useState } from 'react';
import { cn } from '@/lib/utils';

const SplashContent = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <>
      {/* Élément graphique subtil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        className="absolute top-0 right-0 w-1/5 h-[30%] opacity-5"
      />
      
      {/* Ligne horizontale subtile en haut - symmétrique avec celle du bas */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.15 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute top-[15%] left-0 w-full h-px bg-eatly-secondary opacity-15 origin-left"
      />
      
      {/* Logo de la marmite */}
      <div className="w-full flex justify-center items-center relative">
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
              className="text-eatly-primary font-avantgarde text-6xl py-16"
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
                "w-auto h-[280px] md:h-[320px] pot-shadow will-change-transform will-change-opacity gpu-accelerated py-16",
                !imageLoaded && "invisible"
              )}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
        </Suspense>
      </div>
      
      {/* Ligne horizontale subtile en bas */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.15 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute top-[85%] left-0 w-full h-px bg-eatly-secondary opacity-15 origin-left"
      />
      
      {/* Indicateur de chargement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{ 
          delay: 1.2, 
          duration: 0.5, 
          rotate: { 
            repeat: Infinity, 
            duration: 1.5, 
            ease: 'linear' 
          } 
        }}
        className="w-9 h-9 border-2 border-eatly-primary/10 border-t-eatly-primary/90 rounded-full absolute bottom-[60px] left-1/2 -translate-x-1/2"
      />
    </>
  );
};

export default SplashContent;
