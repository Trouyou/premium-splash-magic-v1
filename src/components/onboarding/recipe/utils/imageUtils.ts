
import { CATEGORY_FALLBACKS, DEFAULT_IMAGE } from './constants';
import { Recipe } from '../types';

// Get a fallback image based on recipe category
export const getFallbackImage = (recipe: Recipe): string => {
  const category = recipe.categories[0]?.toLowerCase();
  return CATEGORY_FALLBACKS[category] || DEFAULT_IMAGE;
};

// Verify if an image URL is valid for a recipe
export const verifyRecipeImage = async (imageUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    return response.ok && response.headers.get('Content-Type')?.startsWith('image/');
  } catch (error) {
    console.error(`Failed to verify image: ${imageUrl}`, error);
    return false;
  }
};

// Load and verify recipe image with fallback
export const loadRecipeImage = async (recipe: Recipe): Promise<string> => {
  if (!recipe.image) return getFallbackImage(recipe);
  
  const isValid = await verifyRecipeImage(recipe.image);
  if (!isValid) {
    console.warn(`Invalid image for recipe ${recipe.name}, using fallback`);
    return getFallbackImage(recipe);
  }
  
  return recipe.image;
};

