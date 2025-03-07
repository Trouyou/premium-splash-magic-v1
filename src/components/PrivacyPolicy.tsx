
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PrivacyPolicy = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Préchargement du SVG et animation
  useEffect(() => {
    // Activer l'animation après un délai minimal pour garantir le bon affichage
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Logo Eatly SVG avec animations optimisées */}
      <div className="mb-[30px] relative">
        <motion.svg
          width="auto"
          height="auto"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            "w-[140px] md:w-[160px] lg:w-[180px] mx-auto", 
            "will-change-transform will-change-opacity gpu-accelerated"
          )}
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
          style={{ 
            filter: "drop-shadow(0px 6px 14px rgba(0, 0, 0, 0.08))"
          }}
        >
          <path
            d="M50 100h100c10 0 10-10 10-20h-120c0 10 0 20 10 20z"
            fill="#D11B19"
          />
          <path
            d="M40 80h120c0-30-50-40-60-40s-60 10-60 40z"
            fill="#9C1B1A"
          />
          <circle cx="100" cy="40" r="5" fill="black" />
        </motion.svg>
      </div>

      {/* Titre "Confidentialité" avec ajustement d'espacement */}
      <motion.h2 
        className="text-xl md:text-2xl font-semibold text-center text-[#9C1B1A] mb-4"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        Confidentialité
      </motion.h2>

      <motion.hr 
        className="w-20 border-[#EDE6D6] mb-5"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      />

      {/* Texte explicatif avec largeur optimisée */}
      <motion.p 
        className="text-gray-700 text-center px-4 max-w-[80%] leading-relaxed mb-6"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        Eatly respecte votre vie privée. Voulez-vous partager des données
        d'utilisation anonymes pour améliorer votre expérience ?
      </motion.p>

      {/* Boutons avec animations et alignement responsive */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-5 mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <motion.button 
          className="w-[160px] px-6 py-3 bg-gray-600 text-white rounded-md"
          whileHover={{ opacity: 0.9, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
        >
          Refuser
        </motion.button>
        <motion.button 
          className="w-[160px] px-6 py-3 bg-[#D11B19] text-white rounded-md"
          whileHover={{ opacity: 0.9, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
        >
          Accepter
        </motion.button>
      </motion.div>

      {/* Lien vers la politique de confidentialité */}
      <motion.p 
        className="text-center mt-6 text-sm text-[#9C1B1A] cursor-pointer hover:underline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        En savoir plus sur notre politique de confidentialité
      </motion.p>
    </div>
  );
};

export default PrivacyPolicy;
