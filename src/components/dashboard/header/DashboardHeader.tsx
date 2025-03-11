
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
      
      <motion.div 
        className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 opacity-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <img 
          src="/lovable-uploads/bae62a19-a42c-4047-8b4c-c9ce60746ff3.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
};

export default DashboardHeader;
