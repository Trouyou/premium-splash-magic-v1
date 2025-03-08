import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface PrivacyModalProps {
  isVisible: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const PrivacyModal = ({ isVisible, onAccept, onDecline }: PrivacyModalProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      setImageLoaded(true);
    }
  }, [isVisible]);

  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-md z-[10000]"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ 
          type: 'spring',
          stiffness: 400,
          damping: 30,
          duration: 0.3,
          mass: 0.8
        }}
        className="bg-white/95 backdrop-blur-sm rounded-2xl w-[90%] max-w-[500px] p-6 sm:p-8 shadow-2xl flex flex-col items-center relative overflow-hidden"
      >
        {/* Effet de lumière d'ambiance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.4, 0.6, 0.4],
            background: [
              'radial-gradient(circle at 30% -20%, rgba(255,235,235,0.4) 0%, transparent 70%)',
              'radial-gradient(circle at 70% -20%, rgba(255,245,245,0.6) 0%, transparent 70%)',
              'radial-gradient(circle at 30% -20%, rgba(255,235,235,0.4) 0%, transparent 70%)'
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute inset-0 pointer-events-none"
          style={{ mixBlendMode: 'soft-light' }}
        />

        {/* Logo avec effet de profondeur */}
        <div className="relative flex justify-center mb-4 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ 
              opacity: imageLoaded ? 1 : 0, 
              scale: imageLoaded ? 1 : 0.95,
              y: imageLoaded ? 0 : 10
            }}
            transition={{
              opacity: { duration: 0.3, ease: "easeOut" },
              scale: { 
                duration: 0.4, 
                ease: [0.34, 1.56, 0.64, 1]
              },
              y: {
                duration: 0.3,
                ease: "easeOut"
              }
            }}
            className="w-[280px] sm:w-[300px] will-change-transform will-change-opacity"
          >
            <img 
              src="/lovable-uploads/4304d601-682c-472c-ace9-1149b80c6b24.png" 
              alt="Logo Eatly" 
              className="w-full h-auto transform-gpu"
              style={{
                filter: 'drop-shadow(0px 15px 30px rgba(209, 27, 25, 0.15))'
              }}
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>
        </div>
        
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="font-avantgarde text-2xl text-eatly-primary font-semibold tracking-tight mb-2 text-center relative z-10"
          style={{ textRendering: 'optimizeLegibility' }}
        >
          Confidentialité
        </motion.h3>

        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-eatly-primary/30 to-transparent my-2"
        />

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="font-playfair text-base leading-relaxed text-eatly-text-primary mb-6 text-center max-w-[90%] relative z-10"
          style={{ textRendering: 'optimizeLegibility' }}
        >
          Eatly respecte votre vie privée. Voulez-vous partager des données d'utilisation anonymes pour améliorer votre expérience?
        </motion.p>

        <div className="flex gap-4 sm:flex-row flex-col w-full justify-center relative z-10">
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="px-6 py-3 rounded-lg font-avantgarde text-base font-medium bg-gray-600/95 backdrop-blur-sm text-white min-w-[140px] hover:bg-gray-600 transition-all shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            onClick={onDecline}
            style={{ textRendering: 'optimizeLegibility' }}
          >
            Refuser
          </motion.button>
          <motion.button 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="px-6 py-3 rounded-lg font-avantgarde text-base font-medium bg-eatly-primary/95 backdrop-blur-sm text-white min-w-[140px] hover:bg-eatly-primary transition-all shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            onClick={onAccept}
            style={{ textRendering: 'optimizeLegibility' }}
          >
            Accepter
          </motion.button>
        </div>

        <motion.a 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          href="#" 
          className="font-playfair text-sm text-eatly-primary mt-4 no-underline hover:underline relative z-10 transition-colors hover:text-eatly-accent"
          style={{ textRendering: 'optimizeLegibility' }}
        >
          En savoir plus sur notre politique de confidentialité
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyModal;