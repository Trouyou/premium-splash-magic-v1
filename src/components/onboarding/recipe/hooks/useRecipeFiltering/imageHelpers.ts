
import { Recipe } from '../../types';
import { DEFAULT_IMAGE } from '../../utils/constants';

export const ensureRecipeHasValidImage = (recipe: Recipe): Recipe => {
  if (!recipe.image || recipe.image === '') {
    return {
      ...recipe,
      image: DEFAULT_IMAGE
    };
  }
  return recipe;
};

export const enhanceRecipesWithImages = (recipes: Recipe[]): Recipe[] => {
  return recipes.map(ensureRecipeHasValidImage);
};
