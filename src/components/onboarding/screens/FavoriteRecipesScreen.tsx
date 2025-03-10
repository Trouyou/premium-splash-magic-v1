
import React from 'react';
import ProgressBar from '../ProgressBar';
import NavigationButtons from '../NavigationButtons';
import RecipeFilters from '../recipe/RecipeFilters';
import RecipeResults from '../recipe/RecipeResults';
import RecipeScreenHeader from '../recipe/components/RecipeScreenHeader';
import { useFavoriteRecipes } from '../recipe/hooks/useFavoriteRecipes';
import { allCategories, timePresets } from '../recipe/utils/constants';

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
  const {
    searchTerm,
    setSearchTerm,
    showFilters,
    setShowFilters,
    showOnlyFavorites,
    setShowOnlyFavorites,
    selectedTimeFilter,
    setSelectedTimeFilter,
    selectedCategory,
    setSelectedCategory,
    filterOptions,
    debouncedSearchTerm,
    filteredRecipes,
    visibleRecipes,
    isLoading,
    imagesLoaded,
    recipesReady,
    handleLoadMore,
    handleReset,
    validateForNextStep
  } = useFavoriteRecipes({ favoriteRecipes, onboardingData });

  const handleNext = () => {
    if (validateForNextStep()) {
      onNext();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <RecipeScreenHeader 
        title="Vos recettes favorites 🍽️"
        description="Sélectionnez les plats qui vous font envie pour personnaliser vos recommandations."
      />
      
      {/* Search and Filter Controls */}
      <RecipeFilters 
        filterOptions={filterOptions}
        setSearchTerm={setSearchTerm}
        setSelectedTimeFilter={setSelectedTimeFilter}
        setSelectedCategory={setSelectedCategory}
        setShowFilters={setShowFilters}
        setShowOnlyFavorites={setShowOnlyFavorites}
        showFilters={showFilters}
        showOnlyFavorites={showOnlyFavorites}
        handleReset={handleReset}
        favoriteRecipesCount={favoriteRecipes.length}
        timePresets={timePresets}
        categories={allCategories}
        totalResults={filteredRecipes.length}
        searchTerm={debouncedSearchTerm}
      />
      
      {/* Recipe Results */}
      <RecipeResults
        isLoading={isLoading || !recipesReady}
        filteredRecipes={filteredRecipes}
        visibleRecipes={visibleRecipes}
        favoriteRecipes={favoriteRecipes}
        toggleFavoriteRecipe={toggleFavoriteRecipe}
        imagesLoaded={imagesLoaded}
        handleReset={handleReset}
        handleLoadMore={handleLoadMore}
      />
      
      <NavigationButtons
        onNext={handleNext}
        onPrev={onPrev}
        isFirstStep={false}
        isLastStep={false}
        nextLabel="Continuer"
        nextDisabled={isLoading || !recipesReady}
      />
    </div>
  );
};

export default FavoriteRecipesScreen;
