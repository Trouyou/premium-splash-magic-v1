
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const DashboardHeader = () => {
  const { user } = useAuth();
  const firstName = user?.firstName || 'Gourmand';

  return (
    <motion.div 
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#EDE6D6] to-white p-6 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative z-10">
        <motion.h1 
          className="text-3xl md:text-4xl font-playfair mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Bonjour, <span className="text-[#9C1B1A]">{firstName}</span> 👋
        </motion.h1>
        <motion.p 
          className="text-gray-600 font-avantgarde"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Découvrez vos recommandations personnalisées du jour
        </motion.p>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
