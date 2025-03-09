
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationButtonsProps {
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextLabel?: string;
  prevLabel?: string;
  nextDisabled?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onNext,
  onPrev,
  isFirstStep,
  isLastStep,
  nextLabel = "Suivant",
  prevLabel = "Précédent",
  nextDisabled = false,
}) => {
  return (
    <div className="flex justify-between w-full mt-8">
      {!isFirstStep ? (
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 flex items-center text-[#4A5568] font-['AvantGarde_Bk_BT'] text-lg rounded transition-colors"
          onClick={onPrev}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          {prevLabel}
        </motion.button>
      ) : (
        <div></div>
      )}
      
      <motion.button
        whileTap={{ scale: 0.98 }}
        className={`px-6 py-3 flex items-center bg-[#D11B19] text-white font-['AvantGarde_Bk_BT'] text-lg rounded shadow transition-all hover:bg-[#9C1B1A] ${nextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={onNext}
        disabled={nextDisabled}
      >
        {isLastStep ? "Terminer" : nextLabel}
        {!isLastStep && <ArrowRight className="ml-2 h-5 w-5" />}
      </motion.button>
    </div>
  );
};

export default NavigationButtons;
