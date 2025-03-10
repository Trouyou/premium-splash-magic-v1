
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ConsentDialog from './ConsentDialog';
import OptimizedImage from '../recipe/components/OptimizedImage';

interface FinalScreenProps {
  onComplete: () => void;
}

const FinalScreen: React.FC<FinalScreenProps> = ({ onComplete }) => {
  const [showConsent, setShowConsent] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConsent(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleAcceptConsent = () => {
    onComplete();
  };

  const handleDeclineConsent = () => {
    onComplete();
  };
  
  const handleLogoLoad = () => {
    setLogoLoaded(true);
  };
  
  const handleLogoError = () => {
    console.error("Failed to load Eatly logo");
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      {/* Logo en haut et centré */}
      <motion.div 
        className="fixed top-8 left-0 right-0 mx-auto w-32 h-32 flex items-center justify-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <OptimizedImage 
          src="/lovable-uploads/6a4af3aa-1beb-41d9-830e-823931a137d0.png"
          alt="Eatly"
          className={`w-full h-auto object-contain transition-opacity duration-300 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleLogoLoad}
          onError={handleLogoError}
          fallbackSrc="/placeholder.svg"
        />
      </motion.div>
      
      <div className="mt-32"></div> {/* Espace pour que le contenu ne soit pas caché par le logo */}
      
      <motion.h2
        className="font-['Playfair_Display'] text-2xl md:text-3xl text-black mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Merci ! Nous personnalisons votre expérience...
      </motion.h2>
      
      <motion.p
        className="font-['AvantGarde_Bk_BT'] text-[#4A5568] max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Découvrez vos recommandations personnalisées dans un instant
      </motion.p>
      
      <motion.div
        className="mt-12 relative w-24 h-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="absolute inset-0 border-4 border-[#EDE6D6] border-t-[#D11B19] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      
      {showConsent && (
        <ConsentDialog
          onAccept={handleAcceptConsent}
          onDecline={handleDeclineConsent}
        />
      )}
    </div>
  );
};

export default FinalScreen;
