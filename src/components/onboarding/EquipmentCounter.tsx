
import React from 'react';

interface EquipmentCounterProps {
  count: number;
}

const EquipmentCounter: React.FC<EquipmentCounterProps> = ({ count }) => {
  return (
    <div className="text-center mt-6 mb-4">
      <p className="font-['AvantGarde_Bk_BT'] text-base text-[#2A5D50]">
        {count} équipement{count !== 1 ? 's' : ''} sélectionné{count !== 1 ? 's' : ''}
      </p>
    </div>
  );
};

export default EquipmentCounter;
