
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Recipe } from '../../types';
import { DEFAULT_IMAGE } from '../../utils/constants';
import { FilteringOptions, FilteringResult } from './types';
import { 
  filterByDietaryPreferences, 
  filterByEquipment, 
  filterByTime, 
  filterByCategory,
  filterByDietary,
  filterByDifficulty,
  filterByCalorie,
  filterBySearchTerm,
  filterByFavorites
} from './filterHelpers';
import { enhanceRecipesWithImages } from './imageHelpers';

export const useRecipeFiltering = (
  recipes: Recipe[],
  onboardingData: {
    dietaryPreferences: string[];
    cookingTime: string;
    nutritionalGoals: string[];
    kitchenEquipment: string[];
  },
  favoriteRecipes: string[],
  debouncedSearchTerm: string,
  selectedTimeFilter: string,
  selectedCategory: string | null,
  selectedDietary: string | null,
  selectedDifficulty: string | null,
  selectedCalorie: string | null,
  showOnlyFavorites: boolean,
  page: number,
  recipesPerPage: number
): FilteringResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  
  // Optimized filtering with useMemo to prevent unnecessary recalculations
  const filteredRecipes = useMemo(() => {
    // Apply all filters in sequence
    let filtered = [...recipes];
    
    // Apply onboarding data filters
    filtered = filterByDietaryPreferences(filtered, onboardingData.dietaryPreferences);
    filtered = filterByEquipment(filtered, onboardingData.kitchenEquipment);
    
    // Apply user-selected filters
    filtered = filterByTime(filtered, selectedTimeFilter);
    filtered = filterByCategory(filtered, selectedCategory);
    filtered = filterByDietary(filtered, selectedDietary);
    filtered = filterByDifficulty(filtered, selectedDifficulty);
    filtered = filterByCalorie(filtered, selectedCalorie);
    
    // Apply search term filter
    filtered = filterBySearchTerm(filtered, debouncedSearchTerm);
    
    // Apply favorites filter
    filtered = filterByFavorites(filtered, showOnlyFavorites, favoriteRecipes);
    
    return filtered;
  }, [
    recipes, 
    onboardingData.dietaryPreferences,
    onboardingData.kitchenEquipment,
    debouncedSearchTerm, 
    selectedTimeFilter, 
    selectedCategory,
    selectedDietary,
    selectedDifficulty,
    selectedCalorie,
    showOnlyFavorites, 
    favoriteRecipes
  ]);

  // Ensure each recipe has a valid image
  const enhancedRecipes = useMemo(() => {
    return enhanceRecipesWithImages(filteredRecipes);
  }, [filteredRecipes]);

  // Calculate visible recipes based on pagination with useMemo
  const visibleRecipes = useMemo(() => {
    return enhancedRecipes.slice(0, page * recipesPerPage);
  }, [enhancedRecipes, page, recipesPerPage]);

  // Optimized loading state with delayed resolution for UI
  useEffect(() => {
    setIsLoading(true);
    
    // Reduced loading time to improve user experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [filteredRecipes.length]);

  // Mark all images as loaded to prevent infinite loading states
  useEffect(() => {
    if (visibleRecipes.length === 0) return;
    
    const newImagesLoaded: Record<string, boolean> = {};
    visibleRecipes.forEach(recipe => {
      newImagesLoaded[recipe.id] = true;
    });
    
    // Set without delay to avoid UI flicker
    setImagesLoaded(prev => ({...prev, ...newImagesLoaded}));
  }, [visibleRecipes]);

  return {
    filteredRecipes: enhancedRecipes,
    visibleRecipes,
    isLoading,
    imagesLoaded
  };
};

// Re-export types for easier imports
export * from './types';
