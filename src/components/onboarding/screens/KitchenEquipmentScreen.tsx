
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProgressBar from '../ProgressBar';
import NavigationButtons from '../NavigationButtons';
import EquipmentCategory from '../EquipmentCategory';
import SelectedEquipmentBar from '../SelectedEquipmentBar';
import { kitchenEquipment, groupEquipmentByCategory } from '@/data/kitchenEquipment';

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
  const containerRef = useRef<HTMLDivElement>(null);
  
  const groupedEquipment = groupEquipmentByCategory(kitchenEquipment);
  
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

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.overflowY = 'auto';
      containerRef.current.style.maxHeight = 'calc(100vh - 240px)';
      containerRef.current.style.scrollBehavior = 'smooth';
      
      (containerRef.current.style as any)['-webkit-overflow-scrolling'] = 'touch';
      containerRef.current.style.paddingBottom = '160px';
    }
  }, []);
  
  const clearAllEquipment = () => {
    selectedEquipment.forEach(id => {
      toggleEquipment(id);
    });
    setSelectedEquipment([]);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto px-3 pb-20">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-black mb-2">
          Quels équipements avez-vous ?
        </h2>
        <p className="font-['AvantGarde_Bk_BT'] text-[#4A5568] mb-4">
          Pour adapter nos recettes à vos outils
        </p>
      </motion.div>
      
      <div 
        ref={containerRef} 
        className="equipment-container" 
        style={{
          maxHeight: 'calc(100vh - 240px)',
          overflowY: 'auto',
          paddingBottom: '160px',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch' as any,
        }}
      >
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
      
      <SelectedEquipmentBar 
        selectedEquipment={selectedEquipment} 
        onRemoveItem={handleToggleEquipment}
        onClearAll={clearAllEquipment}
      />
      
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
