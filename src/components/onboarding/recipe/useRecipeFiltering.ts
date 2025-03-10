
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Recipe } from './types';
import { DEFAULT_IMAGE } from './utils/constants';

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
  selectedDietary: string | null,
  selectedDifficulty: string | null,
  selectedCalorie: string | null,
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
      // Dietary preferences filter (from onboarding data)
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
      // Cooking time filter - applied based on selected filter
      .filter(recipe => {
        switch (selectedTimeFilter) {
          case 'ultra-quick':
            return recipe.cookingTime <= 10;
          case 'quick':
            return recipe.cookingTime <= 15;
          case 'medium':
            return recipe.cookingTime >= 15 && recipe.cookingTime <= 30;
          case 'long':
            return recipe.cookingTime > 30;
          default:
            return true;
        }
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
          case 'plat-principal':
            const mainDishCategories = ['Plat principal', 'Plat', 'Repas complet'];
            return recipe.categories.some(cat => mainDishCategories.includes(cat));
          case 'dessert':
            const dessertCategories = ['Dessert', 'Gourmandise', 'Pâtisserie', 'Sucré'];
            return recipe.categories.some(cat => dessertCategories.includes(cat));
          default:
            return true;
        }
      })
      // Dietary filter (from explicit selection)
      .filter(recipe => {
        if (!selectedDietary) return true;
        
        switch (selectedDietary) {
          case 'vegetarian':
            return recipe.dietaryOptions.includes('vegetarien');
          case 'vegan':
            return recipe.dietaryOptions.includes('vegan');
          case 'gluten-free':
            return recipe.dietaryOptions.includes('sans-gluten');
          case 'keto':
            return recipe.dietaryOptions.includes('keto') || recipe.dietaryOptions.includes('low-carb');
          case 'high-protein':
            return recipe.dietaryOptions.includes('proteine') || (recipe.protein && recipe.protein > 20);
          default:
            return true;
        }
      })
      // Difficulty filter
      .filter(recipe => {
        if (!selectedDifficulty || !recipe.difficulty) return true;
        
        switch (selectedDifficulty) {
          case 'easy':
            return recipe.difficulty === 'facile' || recipe.difficulty === 'easy';
          case 'medium':
            return recipe.difficulty === 'moyen' || recipe.difficulty === 'medium';
          case 'advanced':
            return recipe.difficulty === 'difficile' || recipe.difficulty === 'advanced' || recipe.difficulty === 'hard';
          default:
            return true;
        }
      })
      // Calorie filter
      .filter(recipe => {
        if (!selectedCalorie || !recipe.calories) return true;
        
        switch (selectedCalorie) {
          case 'light':
            return recipe.calories < 300;
          case 'medium':
            return recipe.calories >= 300 && recipe.calories <= 600;
          case 'high':
            return recipe.calories > 600;
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
    return filteredRecipes.map(recipe => {
      if (!recipe.image || recipe.image === '') {
        return {
          ...recipe,
          image: DEFAULT_IMAGE
        };
      }
      return recipe;
    });
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
