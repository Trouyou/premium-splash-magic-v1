
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CookingPot, 
  Utensils, 
  Thermometer, 
  Cherry, 
  Microwave, 
  UtensilsCrossed, 
  Scale, 
  Gauge, 
  ChefHat, 
  ScrollText 
} from 'lucide-react';

import ProgressBar from '../ProgressBar';
import NavigationButtons from '../NavigationButtons';
import EquipmentBubble from '../EquipmentBubble';

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
    { 
      id: 'thermomix', 
      name: 'Thermomix', 
      icon: <CookingPot strokeWidth={1.5} size={32} />, 
      category: 'Appareils électriques' 
    },
    { 
      id: 'blender', 
      name: 'Blender / Mixeur', 
      icon: <Cherry strokeWidth={1.5} size={32} />, 
      category: 'Appareils électriques' 
    },
    { 
      id: 'robot', 
      name: 'Robot pâtissier', 
      icon: <ChefHat strokeWidth={1.5} size={32} />, 
      category: 'Appareils électriques' 
    },
    { 
      id: 'airfryer', 
      name: 'Air Fryer', 
      icon: <CookingPot strokeWidth={1.5} size={32} />, 
      category: 'Appareils électriques' 
    },
    { 
      id: 'steamer', 
      name: 'Cuiseur vapeur', 
      icon: <CookingPot strokeWidth={1.5} size={32} />, 
      category: 'Appareils électriques' 
    },
    { 
      id: 'microwave', 
      name: 'Four à micro-ondes', 
      icon: <Microwave strokeWidth={1.5} size={32} />, 
      category: 'Appareils électriques' 
    },
    
    // Ustensiles essentiels
    { 
      id: 'knife', 
      name: 'Couteau de chef', 
      icon: <UtensilsCrossed strokeWidth={1.5} size={32} />, 
      category: 'Ustensiles essentiels' 
    },
    { 
      id: 'cuttingboard', 
      name: 'Planche à découper', 
      icon: <ScrollText strokeWidth={1.5} size={32} />, 
      category: 'Ustensiles essentiels' 
    },
    { 
      id: 'whisk', 
      name: 'Fouet', 
      icon: <UtensilsCrossed strokeWidth={1.5} size={32} />, 
      category: 'Ustensiles essentiels' 
    },
    { 
      id: 'spatula', 
      name: 'Spatule', 
      icon: <Utensils strokeWidth={1.5} size={32} />, 
      category: 'Ustensiles essentiels' 
    },
    { 
      id: 'woodenspoons', 
      name: 'Cuillères en bois', 
      icon: <Utensils strokeWidth={1.5} size={32} />, 
      category: 'Ustensiles essentiels' 
    },
    { 
      id: 'strainer', 
      name: 'Passoire', 
      icon: <Utensils strokeWidth={1.5} size={32} />, 
      category: 'Ustensiles essentiels' 
    },
    
    // Équipements de cuisson
    { 
      id: 'pan', 
      name: 'Poêle antiadhésive', 
      icon: <CookingPot strokeWidth={1.5} size={32} />, 
      category: 'Équipements de cuisson' 
    },
    { 
      id: 'saucepan', 
      name: 'Casserole', 
      icon: <CookingPot strokeWidth={1.5} size={32} />, 
      category: 'Équipements de cuisson' 
    },
    { 
      id: 'pot', 
      name: 'Faitout/marmite', 
      icon: <CookingPot strokeWidth={1.5} size={32} />, 
      category: 'Équipements de cuisson' 
    },
    { 
      id: 'wok', 
      name: 'Wok', 
      icon: <CookingPot strokeWidth={1.5} size={32} />, 
      category: 'Équipements de cuisson' 
    },
    { 
      id: 'bakingdish', 
      name: 'Plat à gratin', 
      icon: <CookingPot strokeWidth={1.5} size={32} />, 
      category: 'Équipements de cuisson' 
    },
    { 
      id: 'caketin', 
      name: 'Moule à gâteau', 
      icon: <CookingPot strokeWidth={1.5} size={32} />, 
      category: 'Équipements de cuisson' 
    },
    
    // Outils de mesure et préparation
    { 
      id: 'scale', 
      name: 'Balance de cuisine', 
      icon: <Scale strokeWidth={1.5} size={32} />, 
      category: 'Outils de mesure et préparation' 
    },
    { 
      id: 'measuringcup', 
      name: 'Verre doseur', 
      icon: <Gauge strokeWidth={1.5} size={32} />, 
      category: 'Outils de mesure et préparation' 
    },
    { 
      id: 'mixingbowls', 
      name: 'Bols de préparation', 
      icon: <CookingPot strokeWidth={1.5} size={32} />, 
      category: 'Outils de mesure et préparation' 
    },
    { 
      id: 'grater', 
      name: 'Râpe', 
      icon: <Utensils strokeWidth={1.5} size={32} />, 
      category: 'Outils de mesure et préparation' 
    },
    { 
      id: 'rollingpin', 
      name: 'Rouleau à pâtisserie', 
      icon: <ScrollText strokeWidth={1.5} size={32} />, 
      category: 'Outils de mesure et préparation' 
    },
    { 
      id: 'thermometer', 
      name: 'Thermomètre de cuisine', 
      icon: <Thermometer strokeWidth={1.5} size={32} />, 
      category: 'Outils de mesure et préparation' 
    },
  ];
  
  const groupedEquipment = kitchenEquipment.reduce<Record<string, Equipment[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
  
  const handleToggleEquipment = (equipmentId: string) => {
    // Si l'équipement est déjà sélectionné, on le retire
    if (selectedEquipment.includes(equipmentId)) {
      const newSelectedEquipment = selectedEquipment.filter(id => id !== equipmentId);
      setSelectedEquipment(newSelectedEquipment);
      toggleEquipment(equipmentId); // On indique au contexte parent qu'il y a changement
    } 
    // Sinon, on l'ajoute
    else {
      const newSelectedEquipment = [...selectedEquipment, equipmentId];
      setSelectedEquipment(newSelectedEquipment);
      toggleEquipment(equipmentId); // On indique au contexte parent qu'il y a changement
    }
  };
  
  const selectedCount = selectedEquipment.length;
  
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
        <div key={category} className="mb-8">
          <h3 className="font-['AvantGarde_Bk_BT'] text-lg text-[#4A5568] mb-4">
            {category}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items.map(item => (
              <EquipmentBubble
                key={item.id}
                id={item.id}
                name={item.name}
                icon={item.icon}
                selected={selectedEquipment.includes(item.id)}
                onClick={() => handleToggleEquipment(item.id)}
              />
            ))}
          </div>
        </div>
      ))}
      
      <div className="text-center mt-6 mb-4">
        <p className="font-['AvantGarde_Bk_BT'] text-base text-[#2A5D50]">
          {selectedCount} équipement{selectedCount !== 1 ? 's' : ''} sélectionné{selectedCount !== 1 ? 's' : ''}
        </p>
      </div>
      
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
