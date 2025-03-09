
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatEquipmentName } from '@/data/kitchenEquipment';

interface EquipmentBubbleProps {
  id: string;
  name: string;
  svg: string;
  selected: boolean;
  onClick: () => void;
}

const EquipmentBubble: React.FC<EquipmentBubbleProps> = ({
  id,
  name,
  svg,
  selected,
  onClick,
}) => {
  const [justSelected, setJustSelected] = useState(false);
  const formattedName = formatEquipmentName(name);

  useEffect(() => {
    if (selected && !justSelected) {
      setJustSelected(true);
      const timer = setTimeout(() => {
        setJustSelected(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-4 cursor-pointer",
        "transition all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "rounded-full w-[90px] h-[90px] md:w-[100px] md:h-[100px]",
        "border-2 shadow-sm hover:shadow",
        selected 
          ? "bg-[#EDE6D6] border-[#D11B19] border-[3px] transform scale-105 shadow-md" 
          : "bg-white border-[#EDE6D6]",
        justSelected && "animate-[selectPop_0.3s_forwards]"
      )}
      style={selected ? { boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(209, 27, 25, 0.2)" } : {}}
      data-name={name}
    >
      <div className="text-[#2A5D50] mb-2">
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      </div>
      <div className="equipment-name font-['AvantGarde_Bk_BT'] text-[14px] leading-[16px] text-black text-center w-full h-[36px] flex flex-col justify-center overflow-visible mt-1.5">
        {formattedName.split('\n').map((line, i) => (
          <span key={i} className="line-clamp-1">{line}</span>
        ))}
      </div>
      
      {selected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-1 right-1 bg-[#D11B19] text-white rounded-full p-1"
        >
          <Check size={14} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default EquipmentBubble;
