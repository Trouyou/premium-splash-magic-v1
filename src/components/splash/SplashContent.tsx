
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import LogoImage from '../LogoImage';

const SplashContent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative">
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
      <div className="w-full flex justify-center items-center mb-16">
        <Suspense fallback={null}>
          <LogoImage />
        </Suspense>
      </div>
      
      {/* Indicateur de chargement - repositionné plus près du logo */}
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
        className="w-9 h-9 border-2 border-eatly-primary/10 border-t-eatly-primary/90 rounded-full mt-4"
      />
      
      {/* Ligne horizontale subtile en bas */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.15 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute top-[85%] left-0 w-full h-px bg-eatly-secondary opacity-15 origin-left"
      />
    </div>
  );
};

export default SplashContent;
