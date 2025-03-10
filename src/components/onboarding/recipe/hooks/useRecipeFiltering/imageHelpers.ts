
import { Recipe } from '../../types';
import { DEFAULT_IMAGE, CATEGORY_FALLBACKS } from '../../utils/constants';

/**
 * Ensures that a recipe has a valid image by checking if the image is empty or undefined.
 * If the image is missing, it assigns a fallback image based on the recipe's category.
 */
export const ensureRecipeHasValidImage = (recipe: Recipe): Recipe => {
  if (!recipe.image || recipe.image === '') {
    // Get a category-based fallback image
    const fallbackImage = getCategoryBasedImage(recipe);
    return {
      ...recipe,
      image: fallbackImage
    };
  }
  return recipe;
};

/**
 * Selects a fallback image based on the recipe's category.
 * This provides more relevant images than using a single default for all recipes.
 */
export const getCategoryBasedImage = (recipe: Recipe): string => {
  if (!recipe.categories || recipe.categories.length === 0) {
    return DEFAULT_IMAGE;
  }
  
  // Try to find a matching fallback for the first category
  const categoryLower = recipe.categories[0].toLowerCase();
  const fallbackImage = CATEGORY_FALLBACKS[categoryLower];
  
  return fallbackImage || DEFAULT_IMAGE;
};

/**
 * Applies image enhancement to an array of recipes, ensuring each has a valid image.
 */
export const enhanceRecipesWithImages = (recipes: Recipe[]): Recipe[] => {
  return recipes.map(ensureRecipeHasValidImage);
};

/**
 * Ensures that no duplicate images are assigned to recipes in the visible set.
 * This helps create a more varied visual experience.
 */
export const ensureUniqueImages = (recipes: Recipe[]): Recipe[] => {
  const usedImages = new Set<string>();
  
  return recipes.map(recipe => {
    // If the recipe already has a unique image, keep it
    if (recipe.image && recipe.image !== DEFAULT_IMAGE && !usedImages.has(recipe.image)) {
      usedImages.add(recipe.image);
      return recipe;
    }
    
    // Otherwise, assign a category-based image
    const enhancedRecipe = ensureRecipeHasValidImage(recipe);
    
    // Make sure we're not reusing the same image if possible
    if (usedImages.has(enhancedRecipe.image)) {
      // Try to find an alternative image from the same category
      const alternativeImage = findAlternativeImage(recipe, Array.from(usedImages));
      if (alternativeImage) {
        enhancedRecipe.image = alternativeImage;
        usedImages.add(alternativeImage);
      }
    } else {
      usedImages.add(enhancedRecipe.image);
    }
    
    return enhancedRecipe;
  });
};

/**
 * Attempts to find an alternative image for a recipe that hasn't been used yet.
 */
const findAlternativeImage = (recipe: Recipe, usedImages: string[]): string | null => {
  if (!recipe.categories || recipe.categories.length === 0) {
    return null;
  }
  
  // Get all potential category matches
  const categoryOptions = recipe.categories
    .map(category => category.toLowerCase())
    .filter(category => CATEGORY_FALLBACKS[category])
    .map(category => CATEGORY_FALLBACKS[category]);
  
  // Find first alternative that hasn't been used
  const alternative = categoryOptions.find(image => !usedImages.includes(image));
  
  return alternative || null;
};
