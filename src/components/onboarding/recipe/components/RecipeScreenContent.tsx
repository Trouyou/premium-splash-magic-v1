
import React from 'react';
import RecipeFilters from '../RecipeFilters';
import RecipeResults from '../RecipeResults';
import { useFavoriteRecipes } from '../hooks/favoriteRecipes';
import { 
  allCategories, 
  timePresets, 
  dietaryOptions, 
  difficultyOptions, 
  calorieOptions 
} from '../utils/constants';

interface RecipeScreenContentProps {
  favoriteRecipes: string[];
  toggleFavoriteRecipe: (recipeId: string) => void;
  onboardingData: {
    dietaryPreferences: string[];
    cookingTime: string;
    nutritionalGoals: string[];
    kitchenEquipment: string[];
  };
  validateAndProceed: () => void;
}

const RecipeScreenContent: React.FC<RecipeScreenContentProps> = ({
  favoriteRecipes,
  toggleFavoriteRecipe,
  onboardingData,
  validateAndProceed,
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
    selectedDietary,
    setSelectedDietary,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedCalorie,
    setSelectedCalorie,
    pendingFilterOptions,
    filterOptions,
    debouncedSearchTerm,
    filteredRecipes,
    visibleRecipes,
    isLoading,
    imagesLoaded,
    recipesReady,
    handleLoadMore,
    handleReset,
    validateForNextStep,
    applyFilters
  } = useFavoriteRecipes({ favoriteRecipes, onboardingData });

  const handleNext = () => {
    if (validateForNextStep()) {
      validateAndProceed();
    }
  };

  return (
    <>
      {/* Search and Filter Controls */}
      <RecipeFilters 
        filterOptions={filterOptions}
        pendingFilterOptions={pendingFilterOptions}
        setSearchTerm={setSearchTerm}
        setSelectedTimeFilter={setSelectedTimeFilter}
        setSelectedCategory={setSelectedCategory}
        setSelectedDietary={setSelectedDietary}
        setSelectedDifficulty={setSelectedDifficulty}
        setSelectedCalorie={setSelectedCalorie}
        setShowFilters={setShowFilters}
        setShowOnlyFavorites={setShowOnlyFavorites}
        showFilters={showFilters}
        showOnlyFavorites={showOnlyFavorites}
        handleReset={handleReset}
        applyFilters={applyFilters}
        favoriteRecipesCount={favoriteRecipes.length}
        timePresets={timePresets}
        categories={allCategories}
        dietaryOptions={dietaryOptions}
        difficultyOptions={difficultyOptions}
        calorieOptions={calorieOptions}
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
    </>
  );
};

export default RecipeScreenContent;
