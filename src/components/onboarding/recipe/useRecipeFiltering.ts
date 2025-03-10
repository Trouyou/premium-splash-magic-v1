
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Recipe } from './types';

interface OnboardingData {
  dietaryPreferences: string[];
  cookingTime: string;
  nutritionalGoals: string[];
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

  // Memoize the filtered recipes to avoid recalculation on every render
  const filteredRecipes = useMemo(() => {
    // Start with all recipes
    let results = [...recipes];
    
    // Filter by dietary preferences if any are selected
    if (onboardingData.dietaryPreferences.length > 0) {
      // Special case: if omnivore is selected, include all options
      if (!onboardingData.dietaryPreferences.includes('omnivore')) {
        // Filter to include only recipes that match at least one of the selected preferences
        results = results.filter(recipe => 
          recipe.dietaryOptions.some(option => 
            onboardingData.dietaryPreferences.includes(option)
          )
        );
      }
    }
    
    // Apply time filters - combine onboarding cooking time with selected time filter
    if (onboardingData.cookingTime === 'quick' || selectedTimeFilter === 'quick') {
      results = results.filter(recipe => recipe.cookingTime <= 15);
    } else if (onboardingData.cookingTime === 'standard' || selectedTimeFilter === 'medium') {
      results = results.filter(recipe => recipe.cookingTime <= 30);
    } else if (selectedTimeFilter === 'long') {
      results = results.filter(recipe => recipe.cookingTime <= 60);
    }
    // For 'extended' time or 'all', include all recipes
    
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
    
    // If show only favorites is active, filter accordingly
    if (showOnlyFavorites) {
      results = results.filter(recipe => favoriteRecipes.includes(recipe.id));
    }
    
    return results;
  }, [
    recipes, 
    onboardingData.dietaryPreferences, 
    onboardingData.cookingTime,
    debouncedSearchTerm, 
    selectedTimeFilter, 
    selectedCategory, 
    showOnlyFavorites, 
    favoriteRecipes
  ]);

  // Memoize visible recipes to avoid recalculation when other state changes
  const visibleRecipes = useMemo(() => {
    return filteredRecipes.slice(0, page * recipesPerPage);
  }, [filteredRecipes, page, recipesPerPage]);

  // Simulate loading data - only changes when the filteredRecipes actually change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [filteredRecipes.length]); // Only reload when the results count changes

  // Preload recipe images - optimized to run only when filteredRecipes change
  const preloadImages = useCallback(() => {
    const newImagesLoadedState: Record<string, boolean> = {};
    const imagePromises = filteredRecipes.map(recipe => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          newImagesLoadedState[recipe.id] = true;
          resolve();
        };
        img.onerror = () => {
          newImagesLoadedState[recipe.id] = false;
          resolve();
        };
        img.src = recipe.image;
      });
    });

    Promise.all(imagePromises).then(() => {
      setImagesLoaded(prev => ({...prev, ...newImagesLoadedState}));
    });
  }, [filteredRecipes]);
    
  useEffect(() => {
    if (!isLoading) {
      preloadImages();
    }
  }, [isLoading, preloadImages]);

  return {
    filteredRecipes,
    visibleRecipes,
    isLoading,
    imagesLoaded
  };
};
