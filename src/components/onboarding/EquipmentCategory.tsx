
import React from 'react';

interface EquipmentCategoryProps {
  title: string;
  children: React.ReactNode;
}

const EquipmentCategory: React.FC<EquipmentCategoryProps> = ({
  title,
  children,
}) => {
  return (
    <div className="mb-6">
      <h3 className="font-['AvantGarde_Bk_BT'] text-lg text-[#4A5568] mb-3">
        {title}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {children}
      </div>
    </div>
  );
};

export default EquipmentCategory;
