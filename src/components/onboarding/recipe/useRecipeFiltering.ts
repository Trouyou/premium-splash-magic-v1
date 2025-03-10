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
  const [imageRetries, setImageRetries] = useState<Record<string, number>>({});
  
  const filteredRecipes = useMemo(() => {
    let results = [...recipes];
    
    if (onboardingData.dietaryPreferences.length > 0) {
      if (!onboardingData.dietaryPreferences.includes('omnivore')) {
        results = results.filter(recipe => 
          recipe.dietaryOptions.some(option => 
            onboardingData.dietaryPreferences.includes(option)
          )
        );
      }
    }
    
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
    
    if (onboardingData.cookingTime === 'quick' || selectedTimeFilter === 'quick') {
      results = results.filter(recipe => recipe.cookingTime <= 15);
    } else if (onboardingData.cookingTime === 'standard' || selectedTimeFilter === 'medium') {
      results = results.filter(recipe => recipe.cookingTime <= 30);
    } else if (selectedTimeFilter === 'long') {
      results = results.filter(recipe => recipe.cookingTime <= 60);
    }
    
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

  const visibleRecipes = useMemo(() => {
    return filteredRecipes.slice(0, page * recipesPerPage);
  }, [filteredRecipes, page, recipesPerPage]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [filteredRecipes.length]);

  const preloadImages = useCallback(() => {
    const visibleRecipeIds = new Set(visibleRecipes.map(recipe => recipe.id));
    const prioritizedRecipes = [
      ...visibleRecipes,
      ...filteredRecipes.filter(recipe => !visibleRecipeIds.has(recipe.id))
    ];
    
    const newImagesLoadedState: Record<string, boolean> = {};
    const newImageRetriesState: Record<string, number> = {...imageRetries};
    
    const batchSize = 5;
    let currentBatch = 0;
    
    const loadNextBatch = () => {
      const start = currentBatch * batchSize;
      const end = start + batchSize;
      const batch = prioritizedRecipes.slice(start, end);
      
      if (batch.length === 0) {
        setImagesLoaded(prev => ({...prev, ...newImagesLoadedState}));
        setImageRetries(newImageRetriesState);
        return;
      }
      
      const batchPromises = batch.map(recipe => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          
          img.onload = () => {
            newImagesLoadedState[recipe.id] = true;
            newImageRetriesState[recipe.id] = 0;
            resolve();
          };
          
          img.onerror = () => {
            const currentRetries = newImageRetriesState[recipe.id] || 0;
            if (currentRetries < 2) {
              newImageRetriesState[recipe.id] = currentRetries + 1;
              img.src = `${recipe.image}?retry=${currentRetries + 1}`;
            } else {
              newImagesLoadedState[recipe.id] = false;
              console.log(`Failed to load image for recipe: ${recipe.name} after ${currentRetries} retries`);
              resolve();
            }
          };
          
          img.src = recipe.image;
        });
      });
      
      Promise.all(batchPromises).then(() => {
        currentBatch++;
        setTimeout(loadNextBatch, 100);
      });
    };
    
    loadNextBatch();
  }, [filteredRecipes, visibleRecipes, imageRetries]);

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
