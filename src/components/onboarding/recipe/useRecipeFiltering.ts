
import { useCallback, useEffect, useState } from 'react';
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
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [visibleRecipes, setVisibleRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  // Function to filter recipes based on diet, time, and search term
  const filterRecipesByUserPreferences = useCallback(() => {
    // Start with all recipes
    let results = [...recipes];
    
    // Filter by dietary preferences if any are selected
    if (onboardingData.dietaryPreferences.length > 0) {
      // Special case: if omnivore is selected, include all options
      if (onboardingData.dietaryPreferences.includes('omnivore')) {
        // No filtering needed for omnivore
      } else {
        // Filter to include only recipes that match at least one of the selected preferences
        results = results.filter(recipe => 
          recipe.dietaryOptions.some(option => 
            onboardingData.dietaryPreferences.includes(option)
          )
        );
      }
    }
    
    // Filter by cooking time preference
    if (onboardingData.cookingTime === 'quick') {
      results = results.filter(recipe => recipe.cookingTime <= 15);
    } else if (onboardingData.cookingTime === 'standard') {
      results = results.filter(recipe => recipe.cookingTime <= 30);
    }
    // For 'extended' time, include all recipes
    
    // Apply time preset filter
    if (selectedTimeFilter === 'quick') {
      results = results.filter(recipe => recipe.cookingTime <= 15);
    } else if (selectedTimeFilter === 'medium') {
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
    
    // If show only favorites is active, filter accordingly
    if (showOnlyFavorites) {
      results = results.filter(recipe => favoriteRecipes.includes(recipe.id));
    }
    
    return results;
  }, [
    recipes, 
    onboardingData, 
    debouncedSearchTerm, 
    selectedTimeFilter, 
    selectedCategory, 
    showOnlyFavorites, 
    favoriteRecipes
  ]);

  // Update filtered recipes when search term or filters change
  useEffect(() => {
    const filtered = filterRecipesByUserPreferences();
    setFilteredRecipes(filtered);
    setVisibleRecipes(filtered.slice(0, page * recipesPerPage));
  }, [filterRecipesByUserPreferences, page, recipesPerPage]);

  // Simulate loading data
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Preload recipe images
  useEffect(() => {
    const preloadImages = () => {
      filteredRecipes.forEach(recipe => {
        const img = new Image();
        img.onload = () => {
          setImagesLoaded(prev => ({ ...prev, [recipe.id]: true }));
        };
        img.onerror = () => {
          setImagesLoaded(prev => ({ ...prev, [recipe.id]: false }));
        };
        img.src = recipe.image;
      });
    };
    
    if (!isLoading) {
      preloadImages();
    }
  }, [filteredRecipes, isLoading]);

  return {
    filteredRecipes,
    visibleRecipes,
    isLoading,
    imagesLoaded
  };
};
