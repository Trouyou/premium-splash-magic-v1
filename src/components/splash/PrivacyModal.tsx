
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
            {/* Marmite Eatly - Logo correct basé sur l'image fournie */}
            <svg 
              viewBox="0 0 360 300" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              {/* Couvercle */}
              <ellipse cx="180" cy="90" rx="140" ry="30" fill="#B22222" />
              <ellipse cx="180" cy="90" rx="130" ry="25" fill="#E32B2B" />
              <ellipse cx="180" cy="90" rx="120" ry="20" fill="#D32F2F" />
              
              {/* Poignée du couvercle */}
              <circle cx="180" cy="70" r="15" fill="#222222" />
              <ellipse cx="180" cy="65" rx="12" ry="5" fill="#444444" />
              
              {/* Corps de la marmite */}
              <path 
                d="M40 90 L40 190 Q40 230 80 230 L280 230 Q320 230 320 190 L320 90" 
                fill="#E32B2B" 
              />
              <path 
                d="M40 90 L40 190 Q40 230 80 230 L280 230 Q320 230 320 190 L320 90" 
                stroke="#FFFFFF" 
                strokeWidth="2" 
                strokeOpacity="0.3"
              />
              
              {/* Reflet sur la marmite */}
              <path 
                d="M80 110 Q180 140 280 110 L280 200 Q180 180 80 200 Z" 
                fill="#D32F2F" 
              />
              
              {/* Poignées latérales */}
              <path 
                d="M40 140 Q10 140 10 160 Q10 180 40 180" 
                fill="#B22222" 
                stroke="#FFFFFF" 
                strokeWidth="2"
              />
              <path 
                d="M320 140 Q350 140 350 160 Q350 180 320 180" 
                fill="#B22222" 
                stroke="#FFFFFF" 
                strokeWidth="2"
              />
              
              {/* Texte "eatly" */}
              <text x="180" y="280" fontFamily="Arial" fontWeight="bold" fontSize="75" fill="#222222" textAnchor="middle">eatly</text>
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
