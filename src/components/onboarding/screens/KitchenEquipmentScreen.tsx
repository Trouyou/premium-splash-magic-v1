
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Blender, Thermometer } from 'lucide-react';
import ProgressBar from '../ProgressBar';
import NavigationButtons from '../NavigationButtons';

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
}

const KitchenEquipmentScreen: React.FC<KitchenEquipmentScreenProps> = ({
  currentStep,
  totalSteps,
  equipment,
  toggleEquipment,
  onNext,
  onPrev,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [swiping, setSwiping] = useState(false);
  
  const kitchenEquipment: Equipment[] = [
    { id: 'thermomix', name: 'Thermomix', icon: <Thermometer /> },
    { id: 'blender', name: 'Blender / Mixeur', icon: <Blender /> },
    { id: 'robot', name: 'Robot pâtissier', icon: <Thermometer /> },
    { id: 'airfryer', name: 'Air Fryer', icon: <Thermometer /> },
    { id: 'steamer', name: 'Cuiseur vapeur', icon: <Thermometer /> },
    { id: 'convection', name: 'Four à convection', icon: <Thermometer /> },
    { id: 'induction', name: 'Plaques à induction', icon: <Thermometer /> },
    { id: 'oven', name: 'Four traditionnel', icon: <Thermometer /> },
    { id: 'basic', name: 'Ustensiles de base', icon: <Thermometer /> },
  ];
  
  const handleSwipe = (dir: number) => {
    if (swiping) return;
    
    setSwiping(true);
    setDirection(dir);
    
    // Process swipe action
    if (dir > 0) {
      // Swipe right - has equipment
      toggleEquipment(kitchenEquipment[currentIndex].id);
    }
    
    // Move to next card
    setTimeout(() => {
      setCurrentIndex(prev => {
        if (prev < kitchenEquipment.length - 1) {
          return prev + 1;
        }
        return prev;
      });
      setSwiping(false);
    }, 300);
  };
  
  const progressPercentage = ((currentIndex + 1) / kitchenEquipment.length) * 100;
  const isLastCard = currentIndex === kitchenEquipment.length - 1;
  
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
      
      <div className="flex justify-center items-center mb-3">
        <span className="font-['AvantGarde_Bk_BT'] text-[#4A5568]">
          {currentIndex + 1} / {kitchenEquipment.length}
        </span>
      </div>
      
      <div className="relative h-[340px] w-full flex justify-center items-center mb-6">
        {!isLastCard ? (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex gap-32 opacity-30 text-[#4A5568]">
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex flex-col items-center"
              >
                <X size={30} />
                <span>Non</span>
              </motion.div>
              <motion.div
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex flex-col items-center"
              >
                <Check size={30} />
                <span>Oui</span>
              </motion.div>
            </div>
          </div>
        ) : null}
        
        <AnimatePresence mode="wait">
          {currentIndex < kitchenEquipment.length && (
            <motion.div
              key={kitchenEquipment[currentIndex].id}
              className="bg-white rounded-xl shadow-lg p-8 w-[280px] h-[280px] flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ 
                opacity: 0, 
                x: direction > 0 ? 300 : -300, 
                rotate: direction > 0 ? 15 : -15 
              }}
              transition={{ 
                exit: { duration: 0.3 },
                default: { duration: 0.4 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -80) {
                  handleSwipe(-1);
                } else if (swipe > 80) {
                  handleSwipe(1);
                }
              }}
            >
              <div className="text-[#2A5D50] text-5xl mb-6">
                {kitchenEquipment[currentIndex].icon}
              </div>
              <h3 className="font-['AvantGarde_Bk_BT'] text-xl text-black mb-4">
                {kitchenEquipment[currentIndex].name}
              </h3>
              
              <div className="flex gap-4 mt-6">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-100 rounded-full p-3 text-gray-500"
                  onClick={() => handleSwipe(-1)}
                >
                  <X size={24} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#D11B19] rounded-full p-3 text-white"
                  onClick={() => handleSwipe(1)}
                >
                  <Check size={24} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden mb-8">
        <motion.div
          className="h-full bg-[#D11B19]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <NavigationButtons
        onNext={onNext}
        onPrev={onPrev}
        isFirstStep={false}
        isLastStep={false}
        nextLabel={isLastCard ? "Continuer" : "Passer"}
      />
    </div>
  );
};

export default KitchenEquipmentScreen;
