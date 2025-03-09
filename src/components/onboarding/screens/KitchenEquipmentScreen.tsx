import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CookingPot, 
  Utensils, 
  Thermometer, 
  Cherry, 
  Microwave, 
  UtensilsCrossed, 
  Knife, 
  Scale, 
  Gauge, 
  ChefHat, 
  ScrollText 
} from 'lucide-react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

import ProgressBar from '../ProgressBar';
import NavigationButtons from '../NavigationButtons';
import EquipmentItem from '../EquipmentItem';
import EquipmentDropZone from '../EquipmentDropZone';
import EquipmentCategory from '../EquipmentCategory';

interface KitchenEquipmentScreenProps {
  currentStep: number;
  totalSteps: number;
  equipment: string[];
  toggleEquipment: (equipment: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface Equipment {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
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
  
  const kitchenEquipment: Equipment[] = [
    // Appareils électriques
    { id: 'thermomix', name: 'Thermomix', icon: <CookingPot />, category: 'Appareils électriques' },
    { id: 'blender', name: 'Blender / Mixeur', icon: <Cherry />, category: 'Appareils électriques' },
    { id: 'robot', name: 'Robot pâtissier', icon: <ChefHat />, category: 'Appareils électriques' },
    { id: 'airfryer', name: 'Air Fryer', icon: <CookingPot />, category: 'Appareils électriques' },
    { id: 'steamer', name: 'Cuiseur vapeur', icon: <CookingPot />, category: 'Appareils électriques' },
    { id: 'microwave', name: 'Four à micro-ondes', icon: <Microwave />, category: 'Appareils électriques' },
    
    // Ustensiles essentiels
    { id: 'knife', name: 'Couteau de chef', icon: <Knife />, category: 'Ustensiles essentiels' },
    { id: 'cuttingboard', name: 'Planche à découper', icon: <ScrollText />, category: 'Ustensiles essentiels' },
    { id: 'whisk', name: 'Fouet', icon: <UtensilsCrossed />, category: 'Ustensiles essentiels' },
    { id: 'spatula', name: 'Spatule', icon: <Utensils />, category: 'Ustensiles essentiels' },
    { id: 'woodenspoons', name: 'Cuillères en bois', icon: <Utensils />, category: 'Ustensiles essentiels' },
    { id: 'strainer', name: 'Passoire', icon: <Utensils />, category: 'Ustensiles essentiels' },
    
    // Équipements de cuisson
    { id: 'pan', name: 'Poêle antiadhésive', icon: <CookingPot />, category: 'Équipements de cuisson' },
    { id: 'saucepan', name: 'Casserole', icon: <CookingPot />, category: 'Équipements de cuisson' },
    { id: 'pot', name: 'Faitout/marmite', icon: <CookingPot />, category: 'Équipements de cuisson' },
    { id: 'wok', name: 'Wok', icon: <CookingPot />, category: 'Équipements de cuisson' },
    { id: 'bakingdish', name: 'Plat à gratin', icon: <CookingPot />, category: 'Équipements de cuisson' },
    { id: 'caketin', name: 'Moule à gâteau', icon: <CookingPot />, category: 'Équipements de cuisson' },
    
    // Outils de mesure et préparation
    { id: 'scale', name: 'Balance de cuisine', icon: <Scale />, category: 'Outils de mesure et préparation' },
    { id: 'measuringcup', name: 'Verre doseur', icon: <Gauge />, category: 'Outils de mesure et préparation' },
    { id: 'mixingbowls', name: 'Bols de préparation', icon: <CookingPot />, category: 'Outils de mesure et préparation' },
    { id: 'grater', name: 'Râpe', icon: <Utensils />, category: 'Outils de mesure et préparation' },
    { id: 'rollingpin', name: 'Rouleau à pâtisserie', icon: <ScrollText />, category: 'Outils de mesure et préparation' },
    { id: 'thermometer', name: 'Thermomètre de cuisine', icon: <Thermometer />, category: 'Outils de mesure et préparation' },
  ];
  
  const groupedEquipment = kitchenEquipment.reduce<Record<string, Equipment[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && over.id === 'your-equipment') {
      if (!selectedEquipment.includes(active.id as string)) {
        const newSelectedEquipment = [...selectedEquipment, active.id as string];
        setSelectedEquipment(newSelectedEquipment);
        toggleEquipment(active.id as string);
      }
    } else if (over && over.id === 'available-equipment') {
      const newSelectedEquipment = selectedEquipment.filter(id => id !== active.id);
      setSelectedEquipment(newSelectedEquipment);
      toggleEquipment(active.id as string);
    }
  };
  
  const selectedEquipmentItems = kitchenEquipment.filter(item => 
    selectedEquipment.includes(item.id)
  );
  
  const availableEquipmentItems = kitchenEquipment.filter(item => 
    !selectedEquipment.includes(item.id)
  );
  
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
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
        <p className="font-['AvantGarde_Bk_BT'] text-[#4A5568]">
          Pour adapter nos recettes à vos outils
        </p>
      </motion.div>
      
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <EquipmentDropZone 
          id="your-equipment" 
          title="Vos équipements" 
          equipmentCount={selectedEquipmentItems.length}
        >
          {selectedEquipmentItems.length === 0 ? (
            <div className="flex items-center justify-center h-[100px] text-[#4A5568] text-sm opacity-50">
              Faites glisser vos équipements ici
            </div>
          ) : (
            <SortableContext items={selectedEquipmentItems.map(item => item.id)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {selectedEquipmentItems.map(item => (
                  <EquipmentItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    icon={item.icon}
                    selected={true}
                    category={item.category}
                    onClick={() => toggleEquipment(item.id)}
                  />
                ))}
              </div>
            </SortableContext>
          )}
        </EquipmentDropZone>
        
        <EquipmentDropZone
          id="available-equipment"
          title="Équipements disponibles"
        >
          {Object.entries(groupedEquipment).map(([category, items]) => (
            <EquipmentCategory key={category} title={category}>
              {items
                .filter(item => !selectedEquipment.includes(item.id))
                .map(item => (
                  <EquipmentItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    icon={item.icon}
                    selected={false}
                    category={item.category}
                    onClick={() => toggleEquipment(item.id)}
                  />
                ))
              }
            </EquipmentCategory>
          ))}
        </EquipmentDropZone>
      </DndContext>
      
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
