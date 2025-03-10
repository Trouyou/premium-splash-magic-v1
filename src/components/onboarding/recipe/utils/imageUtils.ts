
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
    
    const response = await fetch(imageUrl, { method: 'HEAD' });
    return response.ok && response.headers.get('Content-Type')?.startsWith('image/');
  } catch (error) {
    return false;
  }
};

// Fetch a unique recipe image using Unsplash source
export const fetchUniqueRecipeImage = async (recipeName: string): Promise<string> => {
  try {
    // Prepare search query from recipe name
    const searchTerms = recipeName
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .split(' ')
      .filter(word => word.length > 2)
      .join(' ');
      
    // Add descriptive food-related keywords
    const searchQuery = `${searchTerms} food dish recipe cooking`;
    
    // Add random seed to ensure we get different images even for similar queries
    const randomSeed = Math.floor(Math.random() * 10000);
    
    // Construct direct Unsplash source URL with random seed
    const imageUrl = `https://source.unsplash.com/featured/?${encodeURIComponent(searchQuery)}&random=${randomSeed}`;
    
    // Check if image is already used
    if (usedImageUrls.has(imageUrl)) {
      // Try again with a different random seed
      return fetchUniqueRecipeImage(recipeName);
    }
    
    // If not used, return it and add to used set
    usedImageUrls.add(imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error fetching unique image:", error);
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

// Force unique images for all recipes
export const ensureUniqueImages = async (recipes: Recipe[]): Promise<void> => {
  const imageMap = new Map<string, number>();
  
  // First pass: count image occurrences
  recipes.forEach(recipe => {
    if (recipe.image) {
      const count = imageMap.get(recipe.image) || 0;
      imageMap.set(recipe.image, count + 1);
    }
  });
  
  // Second pass: fix duplicates
  const promises = recipes.map(async recipe => {
    if (!recipe.image || imageMap.get(recipe.image) > 1) {
      // This image is either missing or duplicated, fetch a new one
      recipe.image = await fetchUniqueRecipeImage(recipe.name);
    }
  });
  
  await Promise.all(promises);
};

// Main function to load and verify recipe images
export const loadRecipeImage = async (recipe: Recipe): Promise<string> => {
  // Case 1: Recipe has no image - get a new unique one
  if (!recipe.image) {
    const newImage = await fetchUniqueRecipeImage(recipe.name);
    if (newImage) {
      return newImage;
    }
    return getFallbackImage(recipe);
  }
  
  // Case 2: Recipe has an image but it's a duplicate
  if (usedImageUrls.has(recipe.image) && recipe.image !== DEFAULT_IMAGE) {
    // Get a new unique image
    const newImage = await fetchUniqueRecipeImage(recipe.name);
    if (newImage) {
      return newImage;
    }
  }
  
  // Case 3: Recipe has a potentially unique image but needs validation
  const isValid = await verifyRecipeImage(recipe.image);
  if (!isValid) {
    // If invalid, get a new image
    const newImage = await fetchUniqueRecipeImage(recipe.name);
    if (newImage) {
      return newImage;
    }
    
    // If new image fetch fails, use category fallback
    return getFallbackImage(recipe);
  }
  
  // Case 4: Recipe has a valid, unique image
  usedImageUrls.add(recipe.image);
  return recipe.image;
};
