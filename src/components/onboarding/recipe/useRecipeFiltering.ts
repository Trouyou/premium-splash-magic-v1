
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
  
  // Filter recipes based on all criteria
  const filteredRecipes = useMemo(() => {
    let results = [...recipes];
    
    // Apply dietary preference filter
    if (onboardingData.dietaryPreferences.length > 0) {
      if (!onboardingData.dietaryPreferences.includes('omnivore')) {
        results = results.filter(recipe => 
          recipe.dietaryOptions.some(option => 
            onboardingData.dietaryPreferences.includes(option)
          )
        );
      }
    }
    
    // Apply equipment filter
    if (onboardingData.kitchenEquipment.length > 0) {
      results = results.filter(recipe => {
        if (!recipe.requiredEquipment || recipe.requiredEquipment.length === 0) {
          return true;
        }
        
        return recipe.requiredEquipment.every(equipment => 
          onboardingData.kitchenEquipment.includes(equipment)
        );
      });
    }
    
    // Apply cooking time filter
    if (onboardingData.cookingTime === 'quick' || selectedTimeFilter === 'quick') {
      results = results.filter(recipe => recipe.cookingTime <= 15);
    } else if (onboardingData.cookingTime === 'standard' || selectedTimeFilter === 'medium') {
      results = results.filter(recipe => recipe.cookingTime <= 30);
    } else if (selectedTimeFilter === 'long') {
      results = results.filter(recipe => recipe.cookingTime <= 60);
    }
    
    // Apply category filter
    if (selectedCategory) {
      switch (selectedCategory) {
        case 'rapide':
          results = results.filter(recipe => recipe.cookingTime <= 15);
          break;
        case 'equilibre':
          results = results.filter(recipe => recipe.categories.includes('Équilibré') || recipe.categories.includes('Healthy'));
          break;
        case 'gourmand':
          results = results.filter(recipe => recipe.categories.includes('Gourmand'));
          break;
        case 'monde':
          results = results.filter(recipe => 
            recipe.categories.some(cat => 
              ['Italien', 'Mexicain', 'Asiatique', 'Indien', 'Méditerranéen', 'Moyen-Orient', 'Thaïlandais', 'Français', 'Hawaïen', 'Suisse'].includes(cat)
            )
          );
          break;
      }
    }
    
    // Apply search filter
    if (debouncedSearchTerm) {
      const searchTermLower = debouncedSearchTerm.toLowerCase();
      results = results.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTermLower) ||
        recipe.mainIngredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTermLower)
        ) ||
        recipe.categories.some(category => 
          category.toLowerCase().includes(searchTermLower)
        )
      );
    }
    
    // Apply favorites filter
    if (showOnlyFavorites) {
      results = results.filter(recipe => favoriteRecipes.includes(recipe.id));
    }
    
    return results;
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

  // Calculate visible recipes based on pagination
  const visibleRecipes = useMemo(() => {
    return filteredRecipes.slice(0, page * recipesPerPage);
  }, [filteredRecipes, page, recipesPerPage]);

  // Simulate loading state for UI smoothness
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [filteredRecipes.length]);

  // Track loaded images for UI
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
