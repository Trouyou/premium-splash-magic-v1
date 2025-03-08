
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import LogoImage from './LogoImage';

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const SplashScreen = ({ onComplete, duration = 3000 }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            background: [
              'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)',
              'linear-gradient(135deg, #ffffff 0%, #fff5f5 100%)'
            ],
          }}
          exit={{ 
            opacity: 0,
            filter: 'brightness(1.2)',
            scale: 1.05
          }}
          transition={{
            duration: 0.8,
            background: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
          className="fixed inset-0 flex items-center justify-center bg-white z-50"
        >
          {/* Effet de lumière radiale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.4, 0.6, 0.4],
              scale: [1, 1.1, 1],
              background: [
                'radial-gradient(circle at center, rgba(255,235,235,0.8) 0%, transparent 70%)',
                'radial-gradient(circle at center, rgba(255,245,245,0.6) 0%, transparent 75%)',
                'radial-gradient(circle at center, rgba(255,235,235,0.8) 0%, transparent 70%)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="absolute inset-0"
            style={{ mixBlendMode: 'soft-light' }}
          />

          {/* Container du logo avec effet de profondeur amélioré */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              filter: [
                'drop-shadow(0px 20px 40px rgba(209, 27, 25, 0.2))',
                'drop-shadow(0px 30px 60px rgba(209, 27, 25, 0.25))',
                'drop-shadow(0px 20px 40px rgba(209, 27, 25, 0.2))'
              ]
            }}
            transition={{
              duration: 0.8,
              filter: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
            className="relative z-10 w-full max-w-[550px] aspect-square p-8"
          >
            <LogoImage 
              variant="splash" 
              className="transform-gpu"
            />
          </motion.div>

          {/* Effet de particules subtiles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.2, 0.3, 0.2],
              background: [
                'radial-gradient(circle at 30% 70%, rgba(209,27,25,0.05) 0%, transparent 50%)',
                'radial-gradient(circle at 70% 30%, rgba(209,27,25,0.08) 0%, transparent 50%)',
                'radial-gradient(circle at 30% 70%, rgba(209,27,25,0.05) 0%, transparent 50%)'
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="absolute inset-0 pointer-events-none"
            style={{ mixBlendMode: 'multiply' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
