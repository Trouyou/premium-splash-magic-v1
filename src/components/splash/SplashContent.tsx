
import { motion } from 'framer-motion';
import { Suspense, useEffect, useState } from 'react';
import LogoImage from '../LogoImage';

const SplashContent = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const lineWidth = windowWidth < 768 ? '40px' : '60px';
  
  return (
    <>
      {/* Ligne horizontale supérieure */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: lineWidth, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="absolute top-[40px] left-1/2 -translate-x-1/2 h-[2px] bg-[#D11B19] origin-center no-reflow"
      />
      
      {/* Container principal centré verticalement et horizontalement */}
      <div className="w-full h-full flex justify-center items-center">
        {/* Logo de la marmite avec dimensions responsives */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            opacity: { duration: 0.6, ease: "easeOut" },
            scale: { duration: 0.8, ease: "easeOut" }
          }}
          className="relative w-[60%] md:w-[50%] lg:w-[40%] max-w-[400px]"
        >
          <Suspense fallback={null}>
            <LogoImage />
          </Suspense>
          
          {/* Animation de vapeur */}
          <div className="absolute w-full -top-10 left-0 flex justify-center">
            <motion.div
              animate={{
                y: [-5, -20, -15, -25, -5],
                opacity: [0.5, 0.7, 0.9, 0.7, 0.5],
                scale: [0.8, 1, 0.9, 1.1, 0.8]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
              className="w-[60%] h-20 bg-gradient-to-t from-transparent to-white/10 rounded-full blur-lg"
            />
            <motion.div
              animate={{
                y: [-8, -15, -25, -18, -8],
                opacity: [0.4, 0.6, 0.8, 0.6, 0.4],
                scale: [0.7, 0.9, 1.1, 0.9, 0.7]
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0.3
              }}
              className="w-[40%] h-16 absolute bg-gradient-to-t from-transparent to-white/10 rounded-full blur-lg"
            />
            <motion.div
              animate={{
                y: [-10, -22, -18, -28, -10],
                opacity: [0.3, 0.5, 0.7, 0.5, 0.3],
                scale: [0.6, 0.8, 1, 0.8, 0.6]
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0.6
              }}
              className="w-[30%] h-14 absolute bg-gradient-to-t from-transparent to-white/10 rounded-full blur-lg"
            />
          </div>
        </motion.div>
      </div>
      
      {/* Ligne horizontale inférieure avec delay */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: lineWidth, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
        className="absolute bottom-[40px] left-1/2 -translate-x-1/2 h-[2px] bg-[#D11B19] origin-center no-reflow"
      />
    </>
  );
};

export default SplashContent;
