
import React from 'react';
import { motion } from 'framer-motion';
import { useDraggable } from '@dnd-kit/core';
import { Check } from 'lucide-react';

interface EquipmentItemProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  selected: boolean;
  category: string;
  onClick?: () => void;
}

const EquipmentItem: React.FC<EquipmentItemProps> = ({
  id,
  name,
  icon,
  selected,
  category,
  onClick,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });
  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: isDragging ? 10 : 1,
  } : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      whileHover={{ scale: 1.05, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
      className={`relative flex flex-col items-center justify-center p-3 bg-[#EDE6D6] rounded-lg
        ${selected ? 'ring-2 ring-[#D11B19] shadow-md' : 'hover:shadow-sm'}
        ${isDragging ? 'cursor-grabbing shadow-lg opacity-80' : 'cursor-grab'}`}
      onClick={onClick}
      {...attributes}
      {...listeners}
    >
      <div className="text-[#2A5D50] mb-2 text-2xl">
        {icon}
      </div>
      <p className="font-['AvantGarde_Bk_BT'] text-sm text-[#000000] text-center">
        {name}
      </p>
      
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

export default EquipmentItem;
