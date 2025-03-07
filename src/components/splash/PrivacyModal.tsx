
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
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-white rounded-xl w-[90%] max-w-[500px] p-9 shadow-lg flex flex-col items-center relative"
      >
        <div className="flex justify-center mb-5 w-full">
          {/* Logo Eatly SVG intégré avec animations optimisées */}
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
            {/* Nouveau logo marmite Eatly basé sur l'image fournie */}
            <svg 
              viewBox="0 0 360 300" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              {/* Couvercle */}
              <path 
                d="M320 160 L240 110 Q180 80 120 110 L40 160" 
                stroke="#FFFFFF" 
                strokeWidth="3" 
                fill="#E32B2B" 
              />
              <path 
                d="M320 160 L240 110 Q210 95 180 90 Q150 95 120 110 L40 160" 
                stroke="#FFFFFF" 
                strokeWidth="1" 
                fill="#B22222" 
              />
              <path 
                d="M185 90 Q190 70 180 60 Q170 55 160 65 Q155 75 165 90" 
                fill="#000000" 
              />
              
              {/* Corps de la marmite */}
              <path 
                d="M40 160 L40 190 Q40 210 60 215 L300 215 Q320 210 320 190 L320 160" 
                fill="#E32B2B" 
              />
              <path 
                d="M40 160 L40 190 Q40 210 60 215 L100 215 Q90 200 90 180 L75 160" 
                fill="#B22222" 
              />
              
              {/* Poignées */}
              <path 
                d="M40 180 Q20 180 20 165 Q20 150 40 150" 
                fill="#B22222" 
                stroke="#FFFFFF" 
                strokeWidth="1"
              />
              <path 
                d="M320 180 Q340 180 340 165 Q340 150 320 150" 
                fill="#B22222" 
                stroke="#FFFFFF" 
                strokeWidth="1"
              />
              
              {/* Texte "eatly" */}
              <text x="180" y="280" fontFamily="Arial" fontWeight="bold" fontSize="75" fill="#000000" textAnchor="middle">eatly</text>
            </svg>
          </motion.div>
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
