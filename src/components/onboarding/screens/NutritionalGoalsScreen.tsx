
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Scale, 
  TrendingDown, 
  TrendingUp, 
  Utensils, 
  Medal, 
  Globe, 
  ShoppingBasket,
  Leaf,
  Recycle
} from 'lucide-react';
import ProgressBar from '../ProgressBar';
import NavigationButtons from '../NavigationButtons';
import SelectionCard from '../SelectionCard';

interface NutritionalGoalsScreenProps {
  currentStep: number;
  totalSteps: number;
  goals: string[];
  toggleGoal: (goal: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const NutritionalGoalsScreen: React.FC<NutritionalGoalsScreenProps> = ({
  currentStep,
  totalSteps,
  goals,
  toggleGoal,
  onNext,
  onPrev,
}) => {
  const goalOptions = [
    { id: 'maintain', title: 'Maintien du poids', icon: <Scale /> },
    { id: 'lose', title: 'Perte de poids', icon: <TrendingDown /> },
    { id: 'gain', title: 'Prise de masse', icon: <TrendingUp /> },
    { id: 'balance', title: 'Équilibre nutritionnel', icon: <Utensils /> },
    { id: 'performance', title: 'Performance sportive', icon: <Medal /> },
    { id: 'discovery', title: 'Découverte culinaire', icon: <Globe /> },
    { id: 'local', title: 'Alimentation locale', icon: <ShoppingBasket /> },
    { id: 'eco', title: 'Impact écologique réduit', icon: <Leaf /> },
    { id: 'waste', title: 'Réduction du gaspillage', icon: <Recycle /> },
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
          Quels sont vos objectifs nutritionnels ?
        </h2>
        <p className="font-['AvantGarde_Bk_BT'] text-[#4A5568]">
          Sélectionnez vos priorités (maximum 3)
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-3 gap-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {goalOptions.map((option) => (
          <motion.div key={option.id} variants={itemVariants}>
            <SelectionCard
              id={option.id}
              title={option.title}
              icon={option.icon}
              selected={goals.includes(option.id)}
              onClick={() => toggleGoal(option.id)}
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

export default NutritionalGoalsScreen;
