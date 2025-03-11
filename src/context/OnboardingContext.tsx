
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

interface OnboardingData {
  householdSize: number;
  dietaryPreferences: string[];
  kitchenEquipment: string[];
  cookingTime: string;
  nutritionalGoals: string[];
  favoriteRecipes: string[];
  onboardingCompleted: boolean;
}

interface OnboardingContextType {
  onboardingData: OnboardingData;
  currentStep: number;
  totalSteps: number;
  setHouseholdSize: (size: number) => void;
  toggleDietaryPreference: (preference: string) => void;
  toggleKitchenEquipment: (equipment: string) => void;
  setCookingTime: (time: string) => void;
  toggleNutritionalGoal: (goal: string) => void;
  toggleFavoriteRecipe: (recipeId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const defaultOnboardingData: OnboardingData = {
  householdSize: 1,
  dietaryPreferences: [],
  kitchenEquipment: [],
  cookingTime: 'standard',
  nutritionalGoals: [],
  favoriteRecipes: [],
  onboardingCompleted: false,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(defaultOnboardingData);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  const navigate = useNavigate();
  const { user, setHasCompletedOnboarding } = useAuth();
  const { toast } = useToast();

  const setHouseholdSize = (size: number) => {
    setOnboardingData(prev => ({ ...prev, householdSize: size }));
  };

  const toggleDietaryPreference = (preference: string) => {
    setOnboardingData(prev => {
      const preferences = [...prev.dietaryPreferences];
      const index = preferences.indexOf(preference);
      
      if (index === -1) {
        preferences.push(preference);
      } else {
        preferences.splice(index, 1);
      }
      
      return { ...prev, dietaryPreferences: preferences };
    });
  };

  const toggleKitchenEquipment = (equipment: string) => {
    setOnboardingData(prev => {
      const equipments = [...prev.kitchenEquipment];
      const index = equipments.indexOf(equipment);
      
      if (index === -1) {
        equipments.push(equipment);
      } else {
        equipments.splice(index, 1);
      }
      
      return { ...prev, kitchenEquipment: equipments };
    });
  };

  const setCookingTime = (time: string) => {
    setOnboardingData(prev => ({ ...prev, cookingTime: time }));
  };

  const toggleNutritionalGoal = (goal: string) => {
    setOnboardingData(prev => {
      const goals = [...prev.nutritionalGoals];
      const index = goals.indexOf(goal);
      
      if (index === -1 && goals.length < 3) {
        goals.push(goal);
      } else if (index !== -1) {
        goals.splice(index, 1);
      }
      
      return { ...prev, nutritionalGoals: goals };
    });
  };

  const toggleFavoriteRecipe = (recipeId: string) => {
    setOnboardingData(prev => {
      const favorites = [...prev.favoriteRecipes];
      const index = favorites.indexOf(recipeId);
      
      if (index === -1) {
        favorites.push(recipeId);
      } else {
        favorites.splice(index, 1);
      }
      
      return { ...prev, favoriteRecipes: favorites };
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const completeOnboarding = () => {
    setOnboardingData(prev => ({ ...prev, onboardingCompleted: true }));
    
    console.log('Onboarding data saved:', onboardingData);
    
    // Mettre à jour l'état d'onboarding dans le contexte d'auth
    setHasCompletedOnboarding(true);
    
    toast({
      title: "Profil complété !",
      description: "Vos préférences ont été enregistrées avec succès.",
    });
    
    navigate('/dashboard');
  };

  const resetOnboarding = () => {
    setOnboardingData(defaultOnboardingData);
    setCurrentStep(1);
  };

  useEffect(() => {
    if (user) {
      console.log('User authenticated, onboarding context initialized');
    }
  }, [user]);

  return (
    <OnboardingContext.Provider
      value={{
        onboardingData,
        currentStep,
        totalSteps,
        setHouseholdSize,
        toggleDietaryPreference,
        toggleKitchenEquipment,
        setCookingTime,
        toggleNutritionalGoal,
        toggleFavoriteRecipe,
        nextStep,
        prevStep,
        completeOnboarding,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding doit être utilisé à l'intérieur d'un OnboardingProvider");
  }
  return context;
};
