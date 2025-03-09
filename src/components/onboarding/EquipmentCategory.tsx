
import React from 'react';
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
    <div className="mb-8">
      <h3 className="font-['AvantGarde_Bk_BT'] text-lg text-[#4A5568] mb-4">
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
    </div>
  );
};

export default EquipmentCategory;
