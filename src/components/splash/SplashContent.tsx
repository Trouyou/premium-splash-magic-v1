
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import LogoImage from '../LogoImage';

// Composant pour les lignes rouges
const RedLine = ({ delay = 0, top = false }) => (
  <motion.div
    initial={{ width: 0 }}
    animate={{ width: '60px' }}
    transition={{ 
      duration: 0.4, 
      ease: 'easeOut',
      delay: delay
    }}
    className={`absolute ${top ? 'top-[40px]' : 'bottom-[40px]'} left-1/2 transform -translate-x-1/2 h-[2px] bg-[#D11B19] w-[60px] sm:w-[40px]`}
  />
);

// Composant pour l'animation de vapeur
const SteamAnimation = () => (
  <div className="absolute w-full left-1/2 transform -translate-x-1/2 -top-6">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute left-1/2 transform -translate-x-1/2 w-6 h-8 rounded-full bg-white"
        initial={{ opacity: 0.5, y: 0 }}
        animate={{ 
          opacity: [0.5, 0.9, 0.5], 
          y: [0, -15, -30],
          x: [0, i === 0 ? -5 : i === 2 ? 5 : 0]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: i * 0.4,
          ease: "easeInOut"
        }}
        style={{ filter: "blur(8px)" }}
      />
    ))}
  </div>
);

const SplashContent = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center relative bg-white">
      {/* Ligne rouge supérieure */}
      <RedLine top={true} />
      
      {/* Logo de la marmite avec animation de vapeur */}
      <div className="w-full flex justify-center items-center relative">
        <Suspense fallback={null}>
          <SteamAnimation />
          <LogoImage />
        </Suspense>
      </div>
      
      {/* Ligne rouge inférieure */}
      <RedLine delay={0.15} />
      
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
    </div>
  );
};

export default SplashContent;
