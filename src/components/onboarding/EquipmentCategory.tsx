
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
      className="mb-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="font-['AvantGarde_Bk_BT'] text-lg text-[#4A5568] mb-4 sticky top-0 bg-white py-2 z-[5]">
        {category}
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
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
