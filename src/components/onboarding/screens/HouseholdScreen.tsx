
import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import ProgressBar from '../ProgressBar';
import NavigationButtons from '../NavigationButtons';

interface HouseholdScreenProps {
  currentStep: number;
  totalSteps: number;
  householdSize: number;
  setHouseholdSize: (size: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

const HouseholdScreen: React.FC<HouseholdScreenProps> = ({
  currentStep,
  totalSteps,
  householdSize,
  setHouseholdSize,
  onNext,
  onPrev,
}) => {
  const sizeOptions = [1, 2, 3, 4, 5, 6, 7, '8+'];
  
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
          Combien de personnes dans votre foyer ?
        </h2>
        <p className="font-['AvantGarde_Bk_BT'] text-[#4A5568]">
          Nous ajusterons les portions en conséquence
        </p>
      </motion.div>
      
      <div className="flex justify-center mb-10">
        <motion.div 
          className="text-5xl text-[#2A5D50]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Users size={60} />
        </motion.div>
      </div>
      
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-8" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {sizeOptions.map((size, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-['AvantGarde_Bk_BT'] transition-all
              ${householdSize === (size === '8+' ? 8 : size) 
                ? 'bg-[#D11B19] text-white shadow-md' 
                : 'bg-[#EDE6D6] text-[#4A5568] hover:bg-[#F5F3E7]'}`}
            onClick={() => setHouseholdSize(size === '8+' ? 8 : size as number)}
          >
            {size}
          </motion.button>
        ))}
      </motion.div>
      
      <NavigationButtons
        onNext={onNext}
        onPrev={onPrev}
        isFirstStep={currentStep === 1}
        isLastStep={false}
      />
    </div>
  );
};

export default HouseholdScreen;
