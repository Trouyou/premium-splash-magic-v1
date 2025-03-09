
import React from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Leaf, Salad, WheatOff, Weight, Flame, Carrot, MilkOff, Fish } from 'lucide-react';
import ProgressBar from '../ProgressBar';
import NavigationButtons from '../NavigationButtons';
import SelectionCard from '../SelectionCard';

interface DietaryPreferencesScreenProps {
  currentStep: number;
  totalSteps: number;
  preferences: string[];
  togglePreference: (preference: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const DietaryPreferencesScreen: React.FC<DietaryPreferencesScreenProps> = ({
  currentStep,
  totalSteps,
  preferences,
  togglePreference,
  onNext,
  onPrev,
}) => {
  const dietaryOptions = [
    { id: 'omnivore', title: 'Omnivore', icon: <UtensilsCrossed /> },
    { id: 'vegetarian', title: 'Végétarien', icon: <Leaf /> },
    { id: 'vegan', title: 'Végan', icon: <Salad /> },
    { id: 'gluten-free', title: 'Sans gluten', icon: <WheatOff /> },
    { id: 'keto', title: 'Keto', icon: <Weight /> },
    { id: 'paleo', title: 'Paléo', icon: <Flame /> },
    { id: 'flexitarian', title: 'Flexitarien', icon: <Carrot /> },
    { id: 'lactose-free', title: 'Sans lactose', icon: <MilkOff /> },
    { id: 'mediterranean', title: 'Méditerranéen', icon: <Fish /> },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-black mb-2">
          Quel est votre régime alimentaire ?
        </h2>
        <p className="font-['AvantGarde_Bk_BT'] text-[#4A5568]">
          Sélectionnez une ou plusieurs options
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {dietaryOptions.map((option) => (
          <motion.div key={option.id} variants={itemVariants}>
            <SelectionCard
              id={option.id}
              title={option.title}
              icon={option.icon}
              selected={preferences.includes(option.id)}
              onClick={() => togglePreference(option.id)}
            />
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <NavigationButtons
          onNext={onNext}
          onPrev={onPrev}
          isFirstStep={false}
          isLastStep={false}
        />
      </motion.div>
    </div>
  );
};

export default DietaryPreferencesScreen;
