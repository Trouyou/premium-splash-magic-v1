import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '@/context/OnboardingContext';
import { useIsIOS } from '@/hooks/use-ios-detection';
import { slideUpVariants } from '@/utils/ios-animations';

// Import screens
import WelcomeScreen from './screens/WelcomeScreen';
import HouseholdScreen from './screens/HouseholdScreen';
import DietaryPreferencesScreen from './screens/DietaryPreferencesScreen';
import NutritionalGoalsScreen from './screens/NutritionalGoalsScreen';
import KitchenEquipmentScreen from './screens/KitchenEquipmentScreen';
import CookingTimeScreen from './screens/CookingTimeScreen';
import FavoriteRecipesScreen from './screens/FavoriteRecipesScreen';
import HealthAppsScreen from './screens/HealthAppsScreen';
import FinalScreen from './screens/FinalScreen';

const OnboardingFlow: React.FC = () => {
  const {
    onboardingData,
    currentStep,
    totalSteps,
    setHouseholdSize,
    toggleDietaryPreference,
    toggleKitchenEquipment,
    toggleFavoriteRecipe,
    setCookingTime,
    toggleNutritionalGoal,
    toggleHealthApp,
    nextStep,
    prevStep,
    completeOnboarding
  } = useOnboarding();

  const isIOS = useIsIOS();

  const renderScreen = () => {
    // Welcome screen (step 0)
    if (currentStep === 0) {
      return <WelcomeScreen onStart={nextStep} />;
    }
    
    // 1. Household Size screen
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
    
    // 2. Dietary Preferences screen
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
    
    // 3. Nutritional Goals screen
    if (currentStep === 3) {
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
    
    // 4. Kitchen Equipment screen (moved here)
    if (currentStep === 4) {
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
    
    // 5. Cooking Time screen (after equipment)
    if (currentStep === 5) {
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
    
    // 6. Favorite Recipes screen
    if (currentStep === 6) {
      return (
        <FavoriteRecipesScreen
          currentStep={currentStep}
          totalSteps={totalSteps}
          favoriteRecipes={onboardingData.favoriteRecipes}
          toggleFavoriteRecipe={toggleFavoriteRecipe}
          onboardingData={onboardingData}
          onNext={nextStep}
          onPrev={prevStep}
        />
      );
    }
    
    // 7. Health Apps screen (nouvelle étape)
    if (currentStep === 7) {
      return (
        <HealthAppsScreen
          currentStep={currentStep}
          totalSteps={totalSteps}
          connectedApps={onboardingData.connectedHealthApps}
          toggleHealthApp={toggleHealthApp}
          onNext={nextStep}
          onPrev={prevStep}
        />
      );
    }
    
    // 8. Final screen
    if (currentStep === 8) {
      return <FinalScreen onComplete={completeOnboarding} />;
    }
    
    return null;
  };

  return (
    <div className={`min-h-screen bg-white ${isIOS ? 'ios-vh-fix ios-momentum-scroll' : ''}`}>
      <div className={`w-full max-w-4xl mx-auto py-8 px-4 ${isIOS ? 'ios-scroll-container' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={isIOS ? slideUpVariants : undefined}
            initial="hidden"
            animate="visible"
            exit="exit"
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
