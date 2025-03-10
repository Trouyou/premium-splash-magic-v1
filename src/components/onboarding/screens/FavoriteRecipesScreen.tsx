
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";
import ProgressBar from '../ProgressBar';
import NavigationButtons from '../NavigationButtons';
import RecipeFilters from '../recipe/RecipeFilters';
import RecipeResults from '../recipe/RecipeResults';
import { useRecipeFiltering } from '../recipe/useRecipeFiltering';
import { mockRecipes } from '../recipe/data/mockRecipes';
import { allCategories, timePresets } from '../recipe/utils/constants';
import { initializeUsedImagesTracker, ensureUniqueImages } from '../recipe/utils/imageUtils';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [imagesInitialized, setImagesInitialized] = useState(false);
  const recipesPerPage = 8;
  
  // Initialize the used images tracker and ensure unique images - optimized with state tracking
  useEffect(() => {
    const prepareRecipeImages = async () => {
      // Use a flag to prevent unnecessary re-initialization
      if (!imagesInitialized) {
        // Initialize the tracker with existing recipe images
        initializeUsedImagesTracker(mockRecipes);
        
        // Ensure all recipes have unique images
        await ensureUniqueImages(mockRecipes);
        
        setImagesInitialized(true);
      }
    };
    
    prepareRecipeImages();
  }, [imagesInitialized]);
  
  // Debounce search input for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Use the custom hook for recipe filtering
  const { 
    filteredRecipes, 
    visibleRecipes, 
    isLoading, 
    imagesLoaded 
  } = useRecipeFiltering(
    mockRecipes,
    onboardingData,
    favoriteRecipes,
    debouncedSearchTerm,
    selectedTimeFilter,
    selectedCategory,
    showOnlyFavorites,
    page,
    recipesPerPage
  );

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedTimeFilter('all');
    setSelectedCategory(null);
    setShowFilters(false);
    setPage(1);
  };

  const handleNext = () => {
    if (favoriteRecipes.length === 0) {
      toast("Ajoutez au moins une recette pour personnaliser votre expérience.", {
        position: "top-center",
      });
      return;
    }
    onNext();
  };

  const filterOptions = {
    searchTerm: debouncedSearchTerm,
    timeFilter: selectedTimeFilter,
    categoryFilter: selectedCategory,
    showOnlyFavorites
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-black mb-2">
          Vos recettes favorites 🍽️
        </h2>
        <p className="font-['AvantGarde_Bk_BT'] text-[#4A5568] mb-4">
          Sélectionnez les plats qui vous font envie pour personnaliser vos recommandations.
        </p>
      </motion.div>
      
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
        isLoading={isLoading || !imagesInitialized}
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
        nextDisabled={isLoading || !imagesInitialized}
      />
    </div>
  );
};

export default FavoriteRecipesScreen;
