
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";
import { mockRecipes } from '../data/mockRecipes';
import { DEFAULT_IMAGE } from '../utils/constants';
import { useRecipeFiltering } from '../useRecipeFiltering';

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
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [recipesReady, setRecipesReady] = useState(false);
  const recipesPerPage = 8;
  
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

  const validateForNextStep = () => {
    if (favoriteRecipes.length === 0) {
      toast("Ajoutez au moins une recette pour personnaliser votre expérience.", {
        position: "top-center",
      });
      return false;
    }
    return true;
  };

  const filterOptions = {
    searchTerm: debouncedSearchTerm,
    timeFilter: selectedTimeFilter,
    categoryFilter: selectedCategory,
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
  };
};
