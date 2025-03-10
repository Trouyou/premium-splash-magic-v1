
import { useEffect } from 'react';
import { mockRecipes } from '../../data/mockRecipes';
import { DEFAULT_IMAGE } from '../../utils/constants';

export const useRecipePreparation = (
  setRecipesReady: (ready: boolean) => void
): void => {
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
  }, [setRecipesReady]);
};
