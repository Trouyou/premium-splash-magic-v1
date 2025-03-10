
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
  
  // Format the name to ensure no truncation - add line breaks for long names
  const formattedName = formatEquipmentName(name);

  // Animation effect when selected
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
        "transition-all duration-300 ease-in-out",
        "rounded-full w-[90px] h-[90px] md:w-[100px] md:h-[100px]",
        "border-2 shadow-sm hover:shadow",
        selected 
          ? "bg-[#EDE6D6] border-[#D11B19] border-[3px] transform scale-105 shadow-md" 
          : "bg-white border-[#EDE6D6]",
        justSelected && "animate-[selectPop_0.3s_forwards]"
      )}
      style={selected ? { boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(209, 27, 25, 0.2)" } : {}}
      data-id={id}
      data-name={name}
    >
      <div className="text-[#2A5D50] mb-2 equipment-icon" style={{ 
        height: '40px', 
        display: 'flex', 
        alignItems: 'center' 
      }}>
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      </div>
      
      <div className="equipment-name font-['AvantGarde_Bk_BT'] text-xs text-[#2A5D50] text-center w-full mt-1 flex flex-col justify-center min-h-[36px] overflow-visible break-words px-1">
        {formattedName.split('\n').map((line, i) => (
          <span key={i} className="leading-tight whitespace-normal">{line}</span>
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
