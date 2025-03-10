
import React from 'react';
import { motion } from 'framer-motion';

interface RecipeScreenHeaderProps {
  title: string;
  description: string;
}

const RecipeScreenHeader: React.FC<RecipeScreenHeaderProps> = ({ title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-6"
    >
      <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-black mb-2">
        {title}
      </h2>
      <p className="font-['AvantGarde_Bk_BT'] text-[#4A5568] mb-4">
        {description}
      </p>
    </motion.div>
  );
};

export default RecipeScreenHeader;
