
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";
import { mockRecipes } from '../data/mockRecipes';
import { DEFAULT_IMAGE } from '../utils/constants';
import { useRecipeFiltering } from '../useRecipeFiltering';
import { RecipeFilterOptions } from '../types';

interface UseFavoriteRecipesProps {
  favoriteRecipes: string[];
  onboardingData: {
    dietaryPreferences: string[];
    cookingTime: string;
    nutritionalGoals: string[];
    kitchenEquipment: string[];
  };
}

export const useFavoriteRecipes = ({ favoriteRecipes, onboardingData }: UseFavoriteRecipesProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  
  // Active filter options (applied)
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDietary, setSelectedDietary] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCalorie, setSelectedCalorie] = useState<string | null>(null);
  
  // Pending filter options (not yet applied)
  const [pendingTimeFilter, setPendingTimeFilter] = useState('all');
  const [pendingCategory, setPendingCategory] = useState<string | null>(null);
  const [pendingDietary, setPendingDietary] = useState<string | null>(null);
  const [pendingDifficulty, setPendingDifficulty] = useState<string | null>(null);
  const [pendingCalorie, setPendingCalorie] = useState<string | null>(null);
  
  const [page, setPage] = useState(1);
  const [recipesReady, setRecipesReady] = useState(false);
  const recipesPerPage = 8;
  
  // Initialize pending filters from active filters
  useEffect(() => {
    setPendingTimeFilter(selectedTimeFilter);
    setPendingCategory(selectedCategory);
    setPendingDietary(selectedDietary);
    setPendingDifficulty(selectedDifficulty);
    setPendingCalorie(selectedCalorie);
  }, [selectedTimeFilter, selectedCategory, selectedDietary, selectedDifficulty, selectedCalorie]);
  
  // Ensure recipes have valid images
  useEffect(() => {
    const prepareRecipes = () => {
      // Make sure all recipes have a valid default image if their image is missing or invalid
      const recipesWithValidImages = mockRecipes.map(recipe => {
        if (!recipe.image || recipe.image === '') {
          return { ...recipe, image: DEFAULT_IMAGE };
        }
        return recipe;
      });
      
      // Set recipes as ready
      setRecipesReady(true);
    };
    
    // Call function to prepare recipes
    prepareRecipes();
  }, []);
  
  // Debounce search input for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Custom handler for setting time filter (pending)
  // Renamed from setSelectedTimeFilter to handleTimeFilterChange
  const handleTimeFilterChange = (value: string) => {
    setPendingTimeFilter(value);
  };

  // Custom handler for setting category (pending)
  // Renamed from setSelectedCategory to handleCategoryChange
  const handleCategoryChange = (value: string | null) => {
    setPendingCategory(value);
  };

  // Custom handler for setting dietary filter (pending)
  // Renamed from setSelectedDietary to handleDietaryChange
  const handleDietaryChange = (value: string | null) => {
    setPendingDietary(value);
  };

  // Custom handler for setting difficulty filter (pending)
  // Renamed from setSelectedDifficulty to handleDifficultyChange
  const handleDifficultyChange = (value: string | null) => {
    setPendingDifficulty(value);
  };

  // Custom handler for setting calorie filter (pending)
  // Renamed from setSelectedCalorie to handleCalorieChange
  const handleCalorieChange = (value: string | null) => {
    setPendingCalorie(value);
  };

  // Apply pending filters to active filters
  const applyFilters = () => {
    // Apply all pending filters
    if (selectedTimeFilter !== pendingTimeFilter) {
      setSelectedTimeFilter(pendingTimeFilter);
    }
    if (selectedCategory !== pendingCategory) {
      setSelectedCategory(pendingCategory);
    }
    if (selectedDietary !== pendingDietary) {
      setSelectedDietary(pendingDietary);
    }
    if (selectedDifficulty !== pendingDifficulty) {
      setSelectedDifficulty(pendingDifficulty);
    }
    if (selectedCalorie !== pendingCalorie) {
      setSelectedCalorie(pendingCalorie);
    }
    
    // Hide filters after applying
    setShowFilters(false);
    
    // If there are filters applied, show a toast confirmation
    if (pendingTimeFilter !== 'all' || pendingCategory || pendingDietary || pendingDifficulty || pendingCalorie) {
      toast("Filtres appliqués avec succès", {
        position: "top-center",
      });
    }
  };

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
    selectedDietary,
    selectedDifficulty,
    selectedCalorie,
    showOnlyFavorites,
    page,
    recipesPerPage
  );

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleReset = () => {
    // Reset active filters
    setSearchTerm('');
    setSelectedTimeFilter('all');
    setSelectedCategory(null);
    setSelectedDietary(null);
    setSelectedDifficulty(null);
    setSelectedCalorie(null);
    
    // Reset pending filters
    setPendingTimeFilter('all');
    setPendingCategory(null);
    setPendingDietary(null);
    setPendingDifficulty(null);
    setPendingCalorie(null);
    
    setShowFilters(false);
    setPage(1);
  };

  const validateForNextStep = () => {
    if (favoriteRecipes.length === 0) {
      toast("Ajoutez au moins une recette pour personnaliser votre expérience.", {
        position: "top-center",
      });
      return false;
    }
    return true;
  };

  // Active filter options
  const filterOptions: RecipeFilterOptions = {
    searchTerm: debouncedSearchTerm,
    timeFilter: selectedTimeFilter,
    categoryFilter: selectedCategory,
    dietaryFilter: selectedDietary,
    difficultyFilter: selectedDifficulty,
    calorieFilter: selectedCalorie,
    showOnlyFavorites
  };

  // Pending filter options
  const pendingFilterOptions: RecipeFilterOptions = {
    searchTerm: debouncedSearchTerm,
    timeFilter: pendingTimeFilter,
    categoryFilter: pendingCategory,
    dietaryFilter: pendingDietary,
    difficultyFilter: pendingDifficulty,
    calorieFilter: pendingCalorie,
    showOnlyFavorites
  };

  return {
    searchTerm,
    setSearchTerm,
    showFilters,
    setShowFilters,
    showOnlyFavorites,
    setShowOnlyFavorites,
    selectedTimeFilter,
    // Return the new handler names
    setSelectedTimeFilter: handleTimeFilterChange, 
    selectedCategory,
    setSelectedCategory: handleCategoryChange,
    selectedDietary,
    setSelectedDietary: handleDietaryChange,
    selectedDifficulty,
    setSelectedDifficulty: handleDifficultyChange,
    selectedCalorie,
    setSelectedCalorie: handleCalorieChange,
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
  };
};
