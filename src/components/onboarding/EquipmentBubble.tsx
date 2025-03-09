
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EquipmentBubbleProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const EquipmentBubble: React.FC<EquipmentBubbleProps> = ({
  id,
  name,
  icon,
  selected,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 ease-out",
        "rounded-full w-[90px] h-[90px] md:w-[100px] md:h-[100px]",
        "border-2 shadow-sm hover:shadow",
        selected 
          ? "bg-[#EDE6D6] border-[#D11B19]" 
          : "bg-white border-[#EDE6D6]"
      )}
    >
      <div className="text-[#2A5D50] mb-2">
        {icon}
      </div>
      <span className="text-center text-xs font-['AvantGarde_Bk_BT'] text-black mt-1 line-clamp-2">
        {name}
      </span>
    </motion.div>
  );
};

export default EquipmentBubble;
