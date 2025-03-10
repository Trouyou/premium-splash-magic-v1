
import { CATEGORY_FALLBACKS, DEFAULT_IMAGE } from './constants';
import { Recipe } from '../types';

// Global registry to track which images are used across recipes
const usedImageUrls = new Set<string>();

// Get a fallback image based on recipe category
export const getFallbackImage = (recipe: Recipe): string => {
  const category = recipe.categories[0]?.toLowerCase();
  return CATEGORY_FALLBACKS[category] || DEFAULT_IMAGE;
};

// Simple verification if an image URL is valid
export const verifyRecipeImage = async (imageUrl: string): Promise<boolean> => {
  try {
    // Only try to validate actual URLs
    if (!imageUrl || !imageUrl.startsWith('http')) {
      return false;
    }
    
    // Simple HEAD request to check if the image exists
    const response = await fetch(imageUrl, { method: 'HEAD' });
    return response.ok && response.headers.get('Content-Type')?.startsWith('image/');
  } catch (error) {
    return false;
  }
};

// Fetch a new recipe image using Unsplash source (client-side friendly)
export const fetchNewRecipeImage = async (recipeName: string): Promise<string> => {
  try {
    // Prepare search query from recipe name
    const searchTerms = recipeName
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .split(' ')
      .filter(word => word.length > 2)
      .join(' ');
      
    // Add descriptive food-related keywords
    const searchQuery = `${searchTerms} food dish recipe`;
    
    // Construct direct Unsplash source URL (doesn't require API key)
    const cacheBuster = `&cb=${Date.now()}`;
    const imageUrl = `https://source.unsplash.com/featured/?${encodeURIComponent(searchQuery)}${cacheBuster}`;
    
    // Return the URL directly - the actual image will be fetched when rendered
    return imageUrl;
  } catch (error) {
    return '';
  }
};

// Initialize the image registry from existing recipes
export const initializeUsedImagesTracker = (recipes: Recipe[]): void => {
  usedImageUrls.clear();
  recipes.forEach(recipe => {
    if (recipe.image && recipe.image !== DEFAULT_IMAGE) {
      usedImageUrls.add(recipe.image);
    }
  });
};

// Main function to load and verify recipe images
export const loadRecipeImage = async (recipe: Recipe): Promise<string> => {
  // Case 1: Recipe has no image - use fallback
  if (!recipe.image) {
    return getFallbackImage(recipe);
  }
  
  // Case 2: Recipe has an image but it's a duplicate
  if (usedImageUrls.has(recipe.image) && recipe.image !== DEFAULT_IMAGE) {
    // Try to get a new unique image
    const newImage = await fetchNewRecipeImage(recipe.name);
    if (newImage) {
      usedImageUrls.add(newImage);
      return newImage;
    }
  }
  
  // Case 3: Recipe has a unique image but needs validation
  const isValid = await verifyRecipeImage(recipe.image);
  if (!isValid) {
    // If invalid, try to get a new image
    const newImage = await fetchNewRecipeImage(recipe.name);
    if (newImage) {
      usedImageUrls.add(newImage);
      return newImage;
    }
    
    // If new image fetch fails, use category fallback
    return getFallbackImage(recipe);
  }
  
  // Case 4: Recipe has a valid, unique image
  usedImageUrls.add(recipe.image);
  return recipe.image;
};
