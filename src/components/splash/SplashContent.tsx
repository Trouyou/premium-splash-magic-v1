
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import LogoImage from '../LogoImage';

const SplashContent = () => {
  return (
    <>
      {/* Élément graphique subtil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        className="absolute top-0 right-0 w-1/5 h-[30%] opacity-5"
      />
      
      {/* Ligne horizontale subtile */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.15 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute top-[85%] left-0 w-full h-px bg-eatly-secondary opacity-15 origin-left"
      />
      
      {/* Logo de la marmite */}
      <div className="w-full flex justify-center items-center">
        <Suspense fallback={null}>
          <LogoImage />
        </Suspense>
      </div>
      
      {/* Textes */}
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="font-avantgarde text-5xl tracking-wider text-eatly-secondary mt-6 md:text-4xl sm:text-3xl"
      >
        eatly
      </motion.h1>
      
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="font-playfair text-2xl leading-normal opacity-90 mt-5 md:text-xl sm:text-lg"
      >
        Vos repas sur mesure
      </motion.h2>
      
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="w-10 h-0.5 bg-gradient-to-r from-eatly-primary to-eatly-secondary mt-4 relative"
      >
        <div className="absolute inset-0 bg-radial-gradient-white opacity-30" />
      </motion.div>
      
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
