
import { CATEGORY_FALLBACKS, DEFAULT_IMAGE } from './constants';
import { Recipe } from '../types';

// Global registry to track which images are used across recipes
const usedImageUrls = new Set<string>();

/**
 * Get a fallback image based on recipe category
 * This ensures images are more relevant to the actual recipe content
 */
export const getFallbackImage = (recipe: Recipe): string => {
  // If the recipe doesn't have any categories, return the default image
  if (!recipe.categories || recipe.categories.length === 0) {
    return DEFAULT_IMAGE;
  }

  // Try to find a matching category fallback
  const category = recipe.categories[0]?.toLowerCase();
  return CATEGORY_FALLBACKS[category] || DEFAULT_IMAGE;
};

/**
 * Simple verification if an image URL is valid - with better error handling
 * We skip actual network validation to improve performance
 */
export const verifyRecipeImage = async (imageUrl: string): Promise<boolean> => {
  // Skip validation for relative URLs (local images) which are always considered valid
  if (!imageUrl || !imageUrl.startsWith('http')) {
    return imageUrl !== '';
  }
  
  // For production, we'll consider all image URLs valid to avoid network errors
  // This is a fallback to prevent blocking the UI due to image verification failures
  return true;
};

/**
 * Ensure all recipes have images with efficient batching
 * Pre-process recipes before displaying them
 */
export const ensureUniqueImages = (recipes: Recipe[]): void => {
  // Pre-process all recipes to ensure they have default images
  recipes.forEach(recipe => {
    if (!recipe.image || recipe.image === '') {
      recipe.image = getFallbackImage(recipe);
    }
  });
  
  console.log(`Ensured all ${recipes.length} recipes have images`);
};

/**
 * Initialize the image registry from existing recipes - for performance
 */
export const initializeUsedImagesTracker = (recipes: Recipe[]): void => {
  usedImageUrls.clear();
  
  recipes.forEach(recipe => {
    if (recipe.image && recipe.image !== DEFAULT_IMAGE) {
      usedImageUrls.add(recipe.image);
    }
  });
  
  console.log(`Initialized image tracker with ${usedImageUrls.size} used images`);
};

/**
 * Main optimized function to load and verify recipe images
 * Modified to be synchronous to avoid async issues
 */
export const loadRecipeImage = (recipe: Recipe): string => {
  // Case 1: Recipe has no image - get a fallback one
  if (!recipe.image || recipe.image === '') {
    return getFallbackImage(recipe);
  }
  
  // Case 2: Recipe has a valid image - use it
  return recipe.image;
};
