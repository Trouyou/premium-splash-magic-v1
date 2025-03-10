
import React from 'react';
import ProgressBar from '../ProgressBar';
import NavigationButtons from '../NavigationButtons';
import RecipeScreenHeader from '../recipe/components/RecipeScreenHeader';
import RecipeScreenContent from '../recipe/components/RecipeScreenContent';

interface FavoriteRecipesScreenProps {
  currentStep: number;
  totalSteps: number;
  favoriteRecipes: string[];
  toggleFavoriteRecipe: (recipeId: string) => void;
  onboardingData: {
    dietaryPreferences: string[];
    cookingTime: string;
    nutritionalGoals: string[];
    kitchenEquipment: string[];
  };
  onNext: () => void;
  onPrev: () => void;
}

const FavoriteRecipesScreen: React.FC<FavoriteRecipesScreenProps> = ({
  currentStep,
  totalSteps,
  favoriteRecipes,
  toggleFavoriteRecipe,
  onboardingData,
  onNext,
  onPrev,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <RecipeScreenHeader 
        title="Vos recettes favorites 🍽️"
        description="Sélectionnez les plats qui vous font envie pour personnaliser vos recommandations."
      />
      
      <RecipeScreenContent 
        favoriteRecipes={favoriteRecipes}
        toggleFavoriteRecipe={toggleFavoriteRecipe}
        onboardingData={onboardingData}
        validateAndProceed={onNext}
      />
      
      <NavigationButtons
        onNext={onNext}
        onPrev={onPrev}
        isFirstStep={false}
        isLastStep={false}
        nextLabel="Continuer"
        nextDisabled={false}
      />
    </div>
  );
};

export default FavoriteRecipesScreen;
