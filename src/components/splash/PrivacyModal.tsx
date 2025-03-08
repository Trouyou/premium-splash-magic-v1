import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

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
      className="fixed inset-0 flex justify-center items-center bg-black/20 backdrop-blur-sm z-[10000]"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30, duration: 0.3 }}
        className="bg-white rounded-xl w-[90%] max-w-[500px] p-6 sm:p-8 shadow-lg flex flex-col items-center relative"
      >
        {/* Logo - Taille augmentée et espacement réduit */}
        <div className="flex justify-center mb-2 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: imageLoaded ? 1 : 0, 
              scale: imageLoaded ? 1 : 0.95 
            }}
            transition={{
              opacity: { duration: 0.3, ease: "easeOut" },
              scale: { 
                duration: 0.4, 
                ease: [0.34, 1.56, 0.64, 1]
              }
            }}
            className="w-[280px] sm:w-[300px] will-change-transform will-change-opacity"
          >
            <img 
              src="/lovable-uploads/4304d601-682c-472c-ace9-1149b80c6b24.png" 
              alt="Logo Eatly" 
              className="w-full h-auto transform-gpu"
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>
        </div>
        
        <h3 className="font-avantgarde text-2xl text-[#B22222] mb-2 text-center">Confidentialité</h3>
        <div className="w-full h-px bg-eatly-light my-2" />
        <p className="font-playfair text-base leading-relaxed opacity-90 mb-6 text-center max-w-[90%]">
          Eatly respecte votre vie privée. Voulez-vous partager des données d'utilisation anonymes pour améliorer votre expérience?
        </p>
        <div className="flex gap-4 sm:flex-row flex-col w-full justify-center">
          <motion.button 
            className="px-6 py-3 rounded-lg font-avantgarde text-base font-medium bg-gray-600 text-white min-w-[140px]"
            whileHover={{ opacity: 0.9, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={onDecline}
          >
            Refuser
          </motion.button>
          <motion.button 
            className="px-6 py-3 rounded-lg font-avantgarde text-base font-medium bg-[#C92626] text-white min-w-[140px]"
            whileHover={{ opacity: 0.9, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={onAccept}
          >
            Accepter
          </motion.button>
        </div>
        <a href="#" className="font-playfair text-sm text-[#B22222] mt-4 no-underline hover:underline">
          En savoir plus sur notre politique de confidentialité
        </a>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyModal;