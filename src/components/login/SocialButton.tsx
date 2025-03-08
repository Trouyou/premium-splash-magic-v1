
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
      whileHover={{ scale: 1.02, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full flex items-center justify-center py-3 px-4 bg-white border border-gray-300 rounded-lg hover:shadow-md transition-all h-14 mb-3"
    >
      <div className="flex items-center justify-center">
        <span className="flex items-center justify-center w-6 h-6 mr-4 transform-gpu">
          {icon}
        </span>
        <span className="font-avantgarde text-gray-800 text-base">
          Continuer avec {provider}
        </span>
      </div>
    </motion.button>
  );
};

export default SocialButton;
