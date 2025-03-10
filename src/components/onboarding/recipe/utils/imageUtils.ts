
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
  if (!imageUrl || !imageUrl.startsWith('http')) {
    return false;
  }
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch(imageUrl, { 
      method: 'HEAD', 
      signal: controller.signal 
    });
    
    clearTimeout(timeoutId);
    return response.ok && response.headers.get('Content-Type')?.startsWith('image/');
  } catch (error) {
    console.error("Error verifying image URL:", error);
    return false;
  }
};

// Fetch a unique recipe image using Unsplash source with optimized caching
export const fetchUniqueRecipeImage = async (recipeName: string): Promise<string> => {
  try {
    // Build search query with recipe name and randomization
    const searchTerms = recipeName
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .split(' ')
      .filter(word => word.length > 2)
      .join(' ');
    
    // Add food-related keywords for better results
    const searchQuery = `${searchTerms} food dish recipe`;
    
    // Add random seed to ensure different images for similar queries
    const randomSeed = Math.floor(Math.random() * 100000);
    
    // Construct direct Unsplash source URL with optimized parameters
    const imageUrl = `https://source.unsplash.com/featured/?${encodeURIComponent(searchQuery)}&random=${randomSeed}`;
    
    // Check if this URL is already used (unlikely with the random seed)
    if (usedImageUrls.has(imageUrl)) {
      // Generate a new random seed and try again
      return fetchUniqueRecipeImage(recipeName);
    }
    
    // Register as used and return
    usedImageUrls.add(imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error fetching unique image:", error);
    return '';
  }
};

// Initialize the image registry from existing recipes - optimized for performance
export const initializeUsedImagesTracker = (recipes: Recipe[]): void => {
  usedImageUrls.clear();
  
  // Use Set for O(1) lookup performance
  const recipeImages = new Set<string>();
  
  recipes.forEach(recipe => {
    if (recipe.image && recipe.image !== DEFAULT_IMAGE) {
      recipeImages.add(recipe.image);
    }
  });
  
  // Convert Set to usedImageUrls Set
  recipeImages.forEach(url => usedImageUrls.add(url));
};

// Ensure all recipes have unique images with optimized batching
export const ensureUniqueImages = async (recipes: Recipe[]): Promise<void> => {
  // Count image occurrences with a Map for O(1) lookup
  const imageMap = new Map<string, number>();
  
  // First pass: count occurrences O(n)
  recipes.forEach(recipe => {
    if (recipe.image) {
      imageMap.set(recipe.image, (imageMap.get(recipe.image) || 0) + 1);
    }
  });
  
  // Create a list of recipes needing new images
  const duplicateRecipes = recipes.filter(recipe => 
    !recipe.image || imageMap.get(recipe.image) > 1
  );
  
  // Use Promise.all for parallel execution
  await Promise.all(
    duplicateRecipes.map(async recipe => {
      recipe.image = await fetchUniqueRecipeImage(recipe.name);
      
      // If fetch failed, use category fallback
      if (!recipe.image) {
        recipe.image = getFallbackImage(recipe);
      }
    })
  );
};

// Main optimized function to load and verify recipe images
export const loadRecipeImage = async (recipe: Recipe): Promise<string> => {
  // Case 1: Recipe has no image - get a new unique one
  if (!recipe.image) {
    const newImage = await fetchUniqueRecipeImage(recipe.name);
    return newImage || getFallbackImage(recipe);
  }
  
  // Case 2: Recipe has a duplicated image
  if (usedImageUrls.has(recipe.image) && recipe.image !== DEFAULT_IMAGE) {
    const newImage = await fetchUniqueRecipeImage(recipe.name);
    return newImage || getFallbackImage(recipe);
  }
  
  // Case 3: Recipe has a potentially unique image that needs validation
  const isValid = await verifyRecipeImage(recipe.image);
  if (!isValid) {
    const newImage = await fetchUniqueRecipeImage(recipe.name);
    return newImage || getFallbackImage(recipe);
  }
  
  // Case 4: Recipe has a valid, unique image
  usedImageUrls.add(recipe.image);
  return recipe.image;
};
