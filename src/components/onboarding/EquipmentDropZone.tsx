
import React from 'react';
import { motion } from 'framer-motion';
import { useDroppable } from '@dnd-kit/core';

interface EquipmentDropZoneProps {
  id: string;
  title: string;
  children: React.ReactNode;
  equipmentCount?: number;
}

const EquipmentDropZone: React.FC<EquipmentDropZoneProps> = ({
  id,
  title,
  children,
  equipmentCount,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-['AvantGarde_Bk_BT'] text-lg text-[#4A5568]">
          {title}
        </h3>
        {equipmentCount !== undefined && (
          <span className="text-sm text-[#4A5568]">
            {equipmentCount} équipement{equipmentCount !== 1 ? 's' : ''} sélectionné{equipmentCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>
      <motion.div
        ref={setNodeRef}
        animate={{
          backgroundColor: isOver ? 'rgba(237, 230, 214, 0.6)' : 'rgba(255, 255, 255, 0.5)',
          borderColor: isOver ? '#2A5D50' : 'rgba(203, 213, 225, 0.8)',
        }}
        className="min-h-[150px] w-full border-2 border-dashed rounded-lg p-4 transition-colors"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default EquipmentDropZone;
