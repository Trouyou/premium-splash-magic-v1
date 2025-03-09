
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';

interface SelectionCardProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick?: () => void;
  isDraggable?: boolean;
  isDroppable?: boolean;
  category?: string;
}

const SelectionCard: React.FC<SelectionCardProps> = ({
  id,
  title,
  icon,
  selected,
  onClick,
  isDraggable = false,
  isDroppable = false,
  category,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled: !isDraggable,
  });
  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  } : undefined;

  return (
    <motion.div
      ref={isDraggable ? setNodeRef : undefined}
      style={style}
      whileTap={!isDraggable ? { scale: 0.98 } : undefined}
      whileHover={{ scale: isDraggable ? 1.05 : 1 }}
      className={`relative flex flex-col items-center justify-center p-4 bg-[#EDE6D6] rounded-lg transition-all
        ${selected ? 'ring-2 ring-[#D11B19] shadow-md' : isDroppable ? 'border-2 border-dashed border-[#2A5D50] bg-opacity-70' : 'hover:shadow-sm'}
        ${isDragging ? 'cursor-grabbing shadow-lg' : isDraggable ? 'cursor-grab shadow-sm' : 'cursor-pointer'}`}
      onClick={!isDraggable && onClick ? onClick : undefined}
      layoutId={`card-${id}`}
      {...(isDraggable ? { ...attributes, ...listeners } : {})}
    >
      {category && (
        <span className="absolute top-1 left-1 text-[10px] text-[#4A5568] opacity-70 font-['AvantGarde_Bk_BT']">
          {category}
        </span>
      )}
      
      <div className="text-[#2A5D50] mb-2 text-2xl">
        {icon}
      </div>
      <p className="font-['AvantGarde_Bk_BT'] text-sm text-[#000000] text-center">
        {title}
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

export default SelectionCard;
