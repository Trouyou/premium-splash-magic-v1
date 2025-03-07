
import { motion } from 'framer-motion';
import React from 'react';

interface SocialButtonProps {
  icon: React.ReactNode;
  provider: string;
  onClick: () => void;
}

const SocialButton = ({ icon, provider, onClick }: SocialButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-white border border-gray-300 rounded-lg hover:shadow-md transition-all"
    >
      <span className="text-gray-800">{icon}</span>
      <span className="font-avantgarde text-gray-700 text-sm">Continuer avec {provider}</span>
    </motion.button>
  );
};

export default SocialButton;
