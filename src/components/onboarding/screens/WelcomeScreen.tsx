
import React from 'react';
import { motion } from 'framer-motion';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="relative mb-8">
        <motion.img 
          src="/images/marmite-logo.png"
          alt="Eatly"
          width={120}
          height={120}
          className="mx-auto"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#D11B19]/20">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke="currentColor" strokeWidth="2"/>
            <path d="M22 2C16.48 2 12 6.48 12 12" stroke="currentColor" strokeWidth="2"/>
            <path d="M2 2C7.52 2 12 6.48 12 12" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </motion.div>
      </div>
      
      <motion.h1 
        className="font-['Playfair_Display'] text-3xl font-medium text-black mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Bienvenue chez Eatly
      </motion.h1>
      
      <motion.p 
        className="font-['AvantGarde_Bk_BT'] text-xl text-[#2A5D50] mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Personnalisons ensemble votre expérience culinaire
      </motion.p>
      
      <motion.p 
        className="font-['AvantGarde_Bk_BT'] text-base text-[#4A5568] mb-12 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Quelques questions pour adapter parfaitement nos recettes à vos besoins
      </motion.p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="bg-[#D11B19] text-white py-3 px-8 rounded-lg font-['AvantGarde_Bk_BT'] text-lg shadow-md hover:bg-[#9C1B1A] transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        onClick={onStart}
      >
        Commencer
      </motion.button>
      
      <motion.div
        className="mt-12 text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 5, 0] }}
        transition={{ delay: 1.2, duration: 1.5, repeat: Infinity, repeatType: "loop" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
