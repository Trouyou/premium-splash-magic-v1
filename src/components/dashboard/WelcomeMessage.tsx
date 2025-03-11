
import React from 'react';
import { motion } from 'framer-motion';

interface WelcomeMessageProps {
  userName: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ userName }) => {
  return (
    <motion.div 
      className="text-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1 
        className="text-2xl md:text-3xl font-bold font-playfair mb-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Bonjour, <span className="text-[#D11B19]">{userName}</span> 👋
      </motion.h1>
      <motion.p 
        className="text-lg text-gray-600 font-avantgarde"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Découvrez de nouvelles inspirations et les tendances du jour !
      </motion.p>
    </motion.div>
  );
};

export default WelcomeMessage;
