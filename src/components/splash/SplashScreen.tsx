import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoImage from '../LogoImage';

interface SplashScreenProps {
  duration?: number;
  onComplete?: () => void;
}

const SPLASH_ANIMATION = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 }
};

const LOGO_ANIMATION = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const SplashScreen: React.FC<SplashScreenProps> = ({ duration = 3000, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          {...SPLASH_ANIMATION}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-eatly-light to-white"
        >
          <div className="relative w-full max-w-md mx-auto px-4">
            <motion.div
              {...LOGO_ANIMATION}
              className="relative z-10"
            >
              <LogoImage variant="splash" className="w-full h-auto" />
            </motion.div>

            {/* Effet de lumière radiale */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full max-w-md bg-gradient-radial from-eatly-light/30 to-transparent opacity-60" />
            </div>

            {/* Effet de profondeur */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.1, scale: 1.1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 blur-xl"
            >
              <LogoImage variant="splash" className="w-full h-auto" />
            </motion.div>

            {/* Particules subtiles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 mix-blend-overlay"
            >
              <div className="absolute inset-0 bg-noise opacity-10" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen; 