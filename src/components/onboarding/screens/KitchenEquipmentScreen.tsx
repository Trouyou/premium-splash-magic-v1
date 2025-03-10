
import React, { useState } from 'react';
import { motion } from 'framer-motion';

import ProgressBar from '../ProgressBar';
import NavigationButtons from '../NavigationButtons';
import EquipmentCategory from '../EquipmentCategory';
import EquipmentCounter from '../EquipmentCounter';
import { groupEquipmentByCategory } from '@/data/kitchenEquipment';

interface KitchenEquipmentScreenProps {
  currentStep: number;
  totalSteps: number;
  equipment: string[];
  toggleEquipment: (equipment: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const KitchenEquipmentScreen: React.FC<KitchenEquipmentScreenProps> = ({
  currentStep,
  totalSteps,
  equipment,
  toggleEquipment,
  onNext,
  onPrev,
}) => {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(equipment || []);
  
  const groupedEquipment = groupEquipmentByCategory();
  
  const handleToggleEquipment = (equipmentId: string) => {
    setSelectedEquipment(prev => {
      const isSelected = prev.includes(equipmentId);
      const newSelection = isSelected
        ? prev.filter(id => id !== equipmentId)
        : [...prev, equipmentId];
      toggleEquipment(equipmentId);
      return newSelection;
    });
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-black mb-2">
          Quels équipements avez-vous ?
        </h2>
        <p className="font-['AvantGarde_Bk_BT'] text-[#4A5568]">
          Pour adapter nos recettes à vos outils
        </p>
      </motion.div>
      
      {Object.entries(groupedEquipment).map(([category, items]) => (
        <EquipmentCategory
          key={category}
          category={category}
          items={items}
          selectedEquipment={selectedEquipment}
          onToggleEquipment={handleToggleEquipment}
        />
      ))}
      
      <EquipmentCounter count={selectedEquipment.length} />
      
      <NavigationButtons
        onNext={onNext}
        onPrev={onPrev}
        isFirstStep={false}
        isLastStep={false}
        nextLabel="Continuer"
      />
    </div>
  );
};

export default KitchenEquipmentScreen;
