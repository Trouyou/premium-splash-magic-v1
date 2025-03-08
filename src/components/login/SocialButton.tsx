
import { motion } from 'framer-motion';
import React from 'react';

interface SocialButtonProps {
  icon: React.ReactNode;
  provider: string;
  onClick: () => void;
  disabled?: boolean;
}

const SocialButton = ({ icon, provider, onClick, disabled = false }: SocialButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center justify-center py-3 px-4 bg-white border border-gray-300 rounded-lg transition-all h-12 mb-3 ${
        disabled ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'
      }`}
    >
      <div className="flex items-center justify-center">
        <span className="flex items-center justify-center w-5 h-5 mr-3">{icon}</span>
        <span className="font-avantgarde text-gray-700 text-sm">
          {disabled ? 'Chargement...' : `Continuer avec ${provider}`}
        </span>
      </div>
    </motion.button>
  );
};

export default SocialButton;
