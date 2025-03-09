
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
    <div className="w-full max-w-2xl mx-auto px-4 pb-16">
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
      
      <div className="overflow-y-auto max-h-[calc(100vh-200px)] pb-8">
        {Object.entries(groupedEquipment).map(([category, items]) => (
          <EquipmentCategory
            key={category}
            category={category}
            items={items}
            selectedEquipment={selectedEquipment}
            onToggleEquipment={handleToggleEquipment}
          />
        ))}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white py-4 border-t border-gray-200">
        <div className="container max-w-2xl mx-auto px-4">
          <EquipmentCounter count={selectedEquipment.length} />
          
          <NavigationButtons
            onNext={onNext}
            onPrev={onPrev}
            isFirstStep={false}
            isLastStep={false}
            nextLabel="Continuer"
          />
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes selectPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.12); }
          100% { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
};

export default KitchenEquipmentScreen;
