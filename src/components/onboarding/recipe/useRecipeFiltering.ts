
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
  
  // Optimized filtering with useMemo for better performance
  const filteredRecipes = useMemo(() => {
    // Start with all recipes
    return recipes
      // Filter by dietary preferences
      .filter(recipe => {
        if (onboardingData.dietaryPreferences.length === 0 || onboardingData.dietaryPreferences.includes('omnivore')) {
          return true;
        }
        return recipe.dietaryOptions.some(option => 
          onboardingData.dietaryPreferences.includes(option)
        );
      })
      // Filter by equipment
      .filter(recipe => {
        if (!recipe.requiredEquipment || recipe.requiredEquipment.length === 0 || onboardingData.kitchenEquipment.length === 0) {
          return true;
        }
        return recipe.requiredEquipment.every(equipment => 
          onboardingData.kitchenEquipment.includes(equipment)
        );
      })
      // Filter by cooking time
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
      // Filter by category
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
            return recipe.categories.some(cat => 
              ['Italien', 'Mexicain', 'Asiatique', 'Indien', 'Méditerranéen', 'Moyen-Orient', 'Thaïlandais', 'Français', 'Hawaïen', 'Suisse'].includes(cat)
            );
          default:
            return true;
        }
      })
      // Filter by search term
      .filter(recipe => {
        if (!debouncedSearchTerm) return true;
        
        const searchTermLower = debouncedSearchTerm.toLowerCase();
        return (
          recipe.name.toLowerCase().includes(searchTermLower) ||
          recipe.mainIngredients.some(ingredient => 
            ingredient.toLowerCase().includes(searchTermLower)
          ) ||
          recipe.categories.some(category => 
            category.toLowerCase().includes(searchTermLower)
          )
        );
      })
      // Filter by favorites
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

  // Optimized loading state with useEffect and cleanup
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [filteredRecipes.length]);

  // Track loaded images for UI with useMemo to avoid unnecessary re-renders
  useEffect(() => {
    const newImagesLoaded: Record<string, boolean> = {};
    visibleRecipes.forEach(recipe => {
      newImagesLoaded[recipe.id] = true;
    });
    setImagesLoaded(newImagesLoaded);
  }, [visibleRecipes]);

  return {
    filteredRecipes,
    visibleRecipes,
    isLoading,
    imagesLoaded
  };
};
