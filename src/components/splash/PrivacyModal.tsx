
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
  
  // Précharger le logo
  useEffect(() => {
    if (isVisible) {
      const img = new Image();
      img.src = "/lovable-uploads/e706ec0e-a8ca-4aaa-ae67-be497a1460ef.png";
      img.onload = () => setImageLoaded(true);
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
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-white rounded-xl w-[90%] max-w-[500px] p-9 shadow-lg flex flex-col items-center relative"
      >
        <div className="flex justify-center items-center mb-10 h-auto w-full">
          {/* Logo avec optimisations d'affichage et animations */}
          <motion.img 
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ 
              opacity: imageLoaded ? 1 : 0, 
              scale: imageLoaded ? 1 : 0.92 
            }}
            transition={{
              opacity: { duration: 0.35, ease: "easeOut" },
              scale: { 
                duration: 0.4, 
                ease: [0.34, 1.56, 0.64, 1] // cubic-bezier pour le léger rebond
              }
            }}
            src="/lovable-uploads/e706ec0e-a8ca-4aaa-ae67-be497a1460ef.png" 
            alt="Eatly Logo" 
            loading="eager"
            className={cn(
              "w-[120px] md:w-[140px] lg:w-[160px] h-auto block mx-auto mb-[40px]",
              "will-change-transform will-change-opacity"
            )}
            style={{ 
              boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.08)",
              objectFit: "contain", 
              aspectRatio: "auto"
            }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        <h3 className="font-avantgarde text-xl text-eatly-secondary mb-4 text-center">Confidentialité</h3>
        <div className="w-full h-px bg-eatly-light my-5" />
        <p className="font-playfair text-base leading-relaxed opacity-90 mb-7 text-center">
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
            className="px-7 py-3.5 rounded-lg font-avantgarde text-base font-medium bg-eatly-primary text-white"
            whileHover={{ opacity: 0.9, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={onAccept}
          >
            Accepter
          </motion.button>
        </div>
        <a href="#" className="font-playfair text-sm text-eatly-secondary mt-5 no-underline hover:underline">
          En savoir plus sur notre politique de confidentialité
        </a>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyModal;
