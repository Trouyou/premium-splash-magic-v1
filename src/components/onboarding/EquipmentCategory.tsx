
import React from 'react';
import { motion } from 'framer-motion';
import { Equipment } from '@/data/kitchenEquipment';
import EquipmentBubble from './EquipmentBubble';

interface EquipmentCategoryProps {
  category: string;
  items: Equipment[];
  selectedEquipment: string[];
  onToggleEquipment: (id: string) => void;
}

const EquipmentCategory: React.FC<EquipmentCategoryProps> = ({
  category,
  items,
  selectedEquipment,
  onToggleEquipment,
}) => {
  return (
    <motion.div 
      className="mb-10" // Adjusted vertical margin
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="font-['AvantGarde_Bk_BT'] text-lg text-[#4A5568] mb-5 sticky top-0 bg-white py-3 z-[5]">
        {category}
      </h3>
      {/* Grid with optimized gap and columns for better display */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map(item => (
          <EquipmentBubble
            key={item.id}
            id={item.id}
            name={item.name}
            svg={item.svg}
            selected={selectedEquipment.includes(item.id)}
            onClick={() => onToggleEquipment(item.id)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default EquipmentCategory;
