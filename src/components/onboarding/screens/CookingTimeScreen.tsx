
import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import ProgressBar from '../ProgressBar';
import NavigationButtons from '../NavigationButtons';

interface CookingTimeScreenProps {
  currentStep: number;
  totalSteps: number;
  cookingTime: string;
  setCookingTime: (time: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const CookingTimeScreen: React.FC<CookingTimeScreenProps> = ({
  currentStep,
  totalSteps,
  cookingTime,
  setCookingTime,
  onNext,
  onPrev,
}) => {
  const timeOptions = [
    { id: 'express', label: 'Express', description: 'Moins de 15 min' },
    { id: 'quick', label: 'Rapide', description: '15-30 min' },
    { id: 'standard', label: 'Standard', description: '30-45 min' },
    { id: 'gourmet', label: 'Gastronomique', description: 'Plus de 45 min' },
  ];
  
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
          Combien de temps souhaitez-vous cuisiner ?
        </h2>
        <p className="font-['AvantGarde_Bk_BT'] text-[#4A5568]">
          Nos recettes s'adapteront à votre emploi du temps
        </p>
      </motion.div>
      
      <div className="flex justify-center mb-10">
        <motion.div 
          className="text-5xl text-[#2A5D50]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Clock size={60} />
        </motion.div>
      </div>
      
      <motion.div
        className="space-y-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {timeOptions.map((option) => (
          <motion.div
            key={option.id}
            whileTap={{ scale: 0.98 }}
            className={`relative p-4 rounded-lg cursor-pointer transition-all
              ${cookingTime === option.id 
                ? 'bg-[#EDE6D6] shadow-md' 
                : 'bg-white border border-gray-200 hover:border-[#D11B19]'}`}
            onClick={() => setCookingTime(option.id)}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full mr-3 flex-shrink-0 border-2 ${
                cookingTime === option.id 
                  ? 'border-[#D11B19] bg-[#D11B19]' 
                  : 'border-gray-300'
              }`}>
                {cookingTime === option.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </motion.div>
                )}
              </div>
              
              <div>
                <h3 className="font-['AvantGarde_Bk_BT'] font-medium text-lg">{option.label}</h3>
                <p className="text-[#4A5568] text-sm">{option.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <NavigationButtons
        onNext={onNext}
        onPrev={onPrev}
        isFirstStep={false}
        isLastStep={false}
      />
    </div>
  );
};

export default CookingTimeScreen;
