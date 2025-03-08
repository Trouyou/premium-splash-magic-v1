
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface PrivacyModalProps {
  isVisible: boolean;
  onAccept: () => void;
  onRefuse: () => void;
}

const PrivacyModal = ({ isVisible, onAccept, onRefuse }: PrivacyModalProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      // Préchargement de l'image
      const img = new Image();
      img.src = '/lovable-uploads/6347b2be-e52a-437f-9bdd-adcafab9cde1.png';
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageError(true);
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-[10000]"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-white rounded-xl w-[90%] max-w-[500px] p-9 shadow-lg flex flex-col items-center relative"
      >
        <div className="flex justify-center mb-5 w-full">
          {imageError ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-eatly-primary font-avantgarde text-3xl mb-4"
            >
              eatly
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: imageLoaded ? 1 : 0, 
                scale: imageLoaded ? 1 : 0.95 
              }}
              transition={{
                opacity: { duration: 0.4, ease: "easeOut" },
                scale: { 
                  duration: 0.5, 
                  ease: [0.34, 1.56, 0.64, 1] // cubic-bezier pour le rebond élégant
                }
              }}
              className={cn(
                "w-[180px] md:w-[200px] lg:w-[220px] will-change-transform will-change-opacity gpu-accelerated"
              )}
            >
              <img 
                src="/lovable-uploads/6347b2be-e52a-437f-9bdd-adcafab9cde1.png" 
                alt="Logo Eatly" 
                className="w-full h-auto"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </motion.div>
          )}
        </div>
        
        <h3 className="font-avantgarde text-xl text-[#B22222] mb-2 text-center">Confidentialité</h3>
        <div className="w-full h-px bg-eatly-light my-3" />
        <p className="font-playfair text-base leading-relaxed opacity-90 mb-7 text-center max-w-[85%]">
          Eatly respecte votre vie privée. Voulez-vous partager des données d'utilisation anonymes pour améliorer votre expérience?
        </p>
        <div className="flex gap-6 sm:flex-row flex-col w-full justify-center">
          <motion.button 
            className="px-7 py-3.5 rounded-lg font-avantgarde text-base font-medium bg-gray-600 text-white"
            whileHover={{ opacity: 0.9, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={onRefuse}
          >
            Refuser
          </motion.button>
          <motion.button 
            className="px-7 py-3.5 rounded-lg font-avantgarde text-base font-medium bg-[#C92626] text-white"
            whileHover={{ opacity: 0.9, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={onAccept}
          >
            Accepter
          </motion.button>
        </div>
        <a href="#" className="font-playfair text-sm text-[#B22222] mt-5 no-underline hover:underline">
          En savoir plus sur notre politique de confidentialité
        </a>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyModal;
