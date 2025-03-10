
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ConsentDialog from './ConsentDialog';

interface FinalScreenProps {
  onComplete: () => void;
}

const FinalScreen: React.FC<FinalScreenProps> = ({ onComplete }) => {
  const [showConsent, setShowConsent] = useState(false);
  
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
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <motion.div 
        className="mb-8 relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img 
          src="/images/marmite-logo.png"
          alt="Eatly"
          width={120}
          height={120}
          className="mx-auto"
        />
        
        <motion.div
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-20 h-10"
          animate={{ y: [-5, 0, -5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#D11B19]/30">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke="currentColor" strokeWidth="2"/>
            <path d="M22 2C16.48 2 12 6.48 12 12" stroke="currentColor" strokeWidth="2"/>
            <path d="M2 2C7.52 2 12 6.48 12 12" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </motion.div>
      </motion.div>
      
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
