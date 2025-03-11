
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WelcomeMessageProps {
  userName: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ userName }) => {
  const [greeting, setGreeting] = useState<string>('');
  const [timePhrase, setTimePhrase] = useState<string>('');
  
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      
      if (hour >= 5 && hour < 12) {
        setGreeting('Bonjour');
        setTimePhrase('Que voulez-vous préparer pour le petit-déjeuner ?');
      } else if (hour >= 12 && hour < 14) {
        setGreeting('Bon appétit');
        setTimePhrase('Envie d\'une recette pour le déjeuner ?');
      } else if (hour >= 14 && hour < 18) {
        setGreeting('Bonjour');
        setTimePhrase('Une petite faim pour le goûter ?');
      } else if (hour >= 18 && hour < 22) {
        setGreeting('Bonsoir');
        setTimePhrase('Que voulez-vous préparer pour le dîner ?');
      } else {
        setGreeting('Bonsoir');
        setTimePhrase('Envie d\'un petit encas nocturne ?');
      }
    };
    
    updateGreeting();
    
    // Mettre à jour le message si l'utilisateur laisse la page ouverte longtemps
    const interval = setInterval(updateGreeting, 60 * 60 * 1000); // mise à jour toutes les heures
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="mb-6">
      <motion.h1 
        className="text-2xl md:text-3xl font-bold font-playfair mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {greeting}, <span className="text-[#D11B19]">{userName}</span> !
      </motion.h1>
      <motion.p 
        className="text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {timePhrase}
      </motion.p>
    </div>
  );
};

export default WelcomeMessage;
