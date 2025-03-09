
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface SelectionCardProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const SelectionCard: React.FC<SelectionCardProps> = ({
  id,
  title,
  icon,
  selected,
  onClick,
}) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className={`relative flex flex-col items-center justify-center p-6 bg-[#EDE6D6] rounded-lg cursor-pointer transition-all
        ${selected ? 'ring-2 ring-[#D11B19] shadow-md transform translate-y-[-2px]' : 'hover:shadow-sm'}`}
      onClick={onClick}
      layoutId={`card-${id}`}
    >
      <div className="text-[#2A5D50] mb-3 text-3xl">
        {icon}
      </div>
      <p className="font-['AvantGarde_Bk_BT'] text-[#000000] text-center">
        {title}
      </p>
      
      {selected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-2 right-2 bg-[#D11B19] text-white rounded-full p-1"
        >
          <Check size={16} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default SelectionCard;
