
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Recipe } from './types';

interface OnboardingData {
  dietaryPreferences: string[];
  cookingTime: string;
  nutritionalGoals: string[];
  kitchenEquipment: string[];
}

export const useRecipeFiltering = (
  recipes: Recipe[], 
  onboardingData: OnboardingData,
  favoriteRecipes: string[],
  debouncedSearchTerm: string,
  selectedTimeFilter: string,
  selectedCategory: string | null,
  showOnlyFavorites: boolean,
  page: number,
  recipesPerPage: number
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  
  // Optimized filtering with useMemo to prevent unnecessary recalculations
  const filteredRecipes = useMemo(() => {
    // Start filtering process
    return recipes
      // Dietary preferences filter
      .filter(recipe => {
        if (onboardingData.dietaryPreferences.length === 0 || onboardingData.dietaryPreferences.includes('omnivore')) {
          return true;
        }
        return recipe.dietaryOptions.some(option => 
          onboardingData.dietaryPreferences.includes(option)
        );
      })
      // Equipment filter
      .filter(recipe => {
        // If no equipment requirements, skip this filter
        if (!recipe.requiredEquipment || recipe.requiredEquipment.length === 0 || onboardingData.kitchenEquipment.length === 0) {
          return true;
        }
        // Recipe requires only equipment that user has
        return recipe.requiredEquipment.every(equipment => 
          onboardingData.kitchenEquipment.includes(equipment)
        );
      })
      // Cooking time filter - applied based on selected filter or onboarding data
      .filter(recipe => {
        if (selectedTimeFilter === 'quick' || onboardingData.cookingTime === 'quick') {
          return recipe.cookingTime <= 15;
        } 
        if (selectedTimeFilter === 'medium' || onboardingData.cookingTime === 'standard') {
          return recipe.cookingTime <= 30;
        } 
        if (selectedTimeFilter === 'long') {
          return recipe.cookingTime <= 60;
        }
        return true;
      })
      // Category filter with optimized string comparisons
      .filter(recipe => {
        if (!selectedCategory) return true;
        
        switch (selectedCategory) {
          case 'rapide':
            return recipe.cookingTime <= 15;
          case 'equilibre':
            return recipe.categories.some(cat => 
              ['Équilibré', 'Healthy'].includes(cat)
            );
          case 'gourmand':
            return recipe.categories.includes('Gourmand');
          case 'monde':
            // Fixed array of world cuisines for optimization
            const worldCuisines = ['Italien', 'Mexicain', 'Asiatique', 'Indien', 
              'Méditerranéen', 'Moyen-Orient', 'Thaïlandais', 'Français', 'Hawaïen', 'Suisse',
              'Vietnamien', 'Japonais', 'Coréen', 'Espagnol', 'Grec', 'Maghrébin', 'Argentin',
              'Russe', 'Ukrainien'];
            return recipe.categories.some(cat => worldCuisines.includes(cat));
          default:
            return true;
        }
      })
      // Search term filter with optimized string operations
      .filter(recipe => {
        if (!debouncedSearchTerm) return true;
        
        const searchTermLower = debouncedSearchTerm.toLowerCase();
        
        // Check recipe name
        if (recipe.name.toLowerCase().includes(searchTermLower)) {
          return true;
        }
        
        // Check ingredients
        for (const ingredient of recipe.mainIngredients) {
          if (ingredient.toLowerCase().includes(searchTermLower)) {
            return true;
          }
        }
        
        // Check categories
        for (const category of recipe.categories) {
          if (category.toLowerCase().includes(searchTermLower)) {
            return true;
          }
        }
        
        return false;
      })
      // Favorites filter
      .filter(recipe => 
        !showOnlyFavorites || favoriteRecipes.includes(recipe.id)
      );
  }, [
    recipes, 
    onboardingData.dietaryPreferences,
    onboardingData.kitchenEquipment,
    onboardingData.cookingTime,
    debouncedSearchTerm, 
    selectedTimeFilter, 
    selectedCategory, 
    showOnlyFavorites, 
    favoriteRecipes
  ]);

  // Calculate visible recipes based on pagination with useMemo
  const visibleRecipes = useMemo(() => {
    return filteredRecipes.slice(0, page * recipesPerPage);
  }, [filteredRecipes, page, recipesPerPage]);

  // Optimized loading state with delayed resolution for UI
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [filteredRecipes.length]);

  // Track loaded images for UI - optimized with debouncing
  useEffect(() => {
    if (visibleRecipes.length === 0) return;
    
    const newImagesLoaded: Record<string, boolean> = {};
    visibleRecipes.forEach(recipe => {
      newImagesLoaded[recipe.id] = true;
    });
    
    // Set with a slight delay to avoid UI flicker
    const timer = setTimeout(() => {
      setImagesLoaded(prev => ({...prev, ...newImagesLoaded}));
    }, 100);
    
    return () => clearTimeout(timer);
  }, [visibleRecipes]);

  return {
    filteredRecipes,
    visibleRecipes,
    isLoading,
    imagesLoaded
  };
};
