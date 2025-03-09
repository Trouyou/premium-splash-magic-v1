
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '@/context/OnboardingContext';

// Import screens
import WelcomeScreen from './screens/WelcomeScreen';
import HouseholdScreen from './screens/HouseholdScreen';
import DietaryPreferencesScreen from './screens/DietaryPreferencesScreen';
import KitchenEquipmentScreen from './screens/KitchenEquipmentScreen';
import CookingTimeScreen from './screens/CookingTimeScreen';
import NutritionalGoalsScreen from './screens/NutritionalGoalsScreen';
import FinalScreen from './screens/FinalScreen';

const OnboardingFlow: React.FC = () => {
  const {
    onboardingData,
    currentStep,
    totalSteps,
    setHouseholdSize,
    toggleDietaryPreference,
    toggleKitchenEquipment,
    setCookingTime,
    toggleNutritionalGoal,
    nextStep,
    prevStep,
    completeOnboarding
  } = useOnboarding();

  const renderScreen = () => {
    if (currentStep === 0) {
      return <WelcomeScreen onStart={nextStep} />;
    }
    
    if (currentStep === 1) {
      return (
        <HouseholdScreen
          currentStep={currentStep}
          totalSteps={totalSteps}
          householdSize={onboardingData.householdSize}
          setHouseholdSize={setHouseholdSize}
          onNext={nextStep}
          onPrev={prevStep}
        />
      );
    }
    
    if (currentStep === 2) {
      return (
        <DietaryPreferencesScreen
          currentStep={currentStep}
          totalSteps={totalSteps}
          preferences={onboardingData.dietaryPreferences}
          togglePreference={toggleDietaryPreference}
          onNext={nextStep}
          onPrev={prevStep}
        />
      );
    }
    
    if (currentStep === 3) {
      return (
        <KitchenEquipmentScreen
          currentStep={currentStep}
          totalSteps={totalSteps}
          equipment={onboardingData.kitchenEquipment}
          toggleEquipment={toggleKitchenEquipment}
          onNext={nextStep}
          onPrev={prevStep}
        />
      );
    }
    
    if (currentStep === 4) {
      return (
        <CookingTimeScreen
          currentStep={currentStep}
          totalSteps={totalSteps}
          cookingTime={onboardingData.cookingTime}
          setCookingTime={setCookingTime}
          onNext={nextStep}
          onPrev={prevStep}
        />
      );
    }
    
    if (currentStep === 5) {
      return (
        <NutritionalGoalsScreen
          currentStep={currentStep}
          totalSteps={totalSteps}
          goals={onboardingData.nutritionalGoals}
          toggleGoal={toggleNutritionalGoal}
          onNext={nextStep}
          onPrev={prevStep}
        />
      );
    }
    
    if (currentStep === 6) {
      return <FinalScreen onComplete={completeOnboarding} />;
    }
    
    return null;
  };

  const getSlideDirection = (index: number) => {
    if (index < currentStep) return -1; // Slide left
    if (index > currentStep) return 1; // Slide right
    return 0; // No slide
  };
  
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <div className="w-full max-w-4xl mx-auto py-8 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: getSlideDirection(currentStep) * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: getSlideDirection(currentStep) * -100 }}
            transition={{ duration: 0.35, ease: [0.4, 0.0, 0.2, 1] }}
            className="w-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingFlow;
