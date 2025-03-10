
import { CATEGORY_FALLBACKS, DEFAULT_IMAGE } from './constants';
import { Recipe } from '../types';

// Track which images have been used to prevent duplicates
const usedImageUrls = new Set<string>();

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

// Fetch a new image from Unsplash based on recipe name
export const fetchNewRecipeImage = async (recipeName: string): Promise<string> => {
  try {
    // Convert recipe name to search query (e.g., "Pad Thaï au poulet" -> "authentic pad thai chicken dish")
    const searchQuery = recipeName
      .toLowerCase()
      .replace(/[^\w\s]/gi, '') // Remove special characters
      .split(' ')
      .filter(word => word.length > 2) // Remove short words
      .join(' ');
      
    // Add descriptive keywords for better image results
    const enhancedQuery = `${searchQuery} food dish recipe authentic`;
    
    // Use Unsplash source URL directly with search query
    // Format: https://source.unsplash.com/featured/?query
    const unsplashUrl = `https://source.unsplash.com/featured/?${encodeURIComponent(enhancedQuery)}`;
    
    // Force Unsplash to give us a random image by adding a cache-busting parameter
    const uniqueUrl = `${unsplashUrl}&random=${Date.now()}`;
    
    // Fetch the image to get the final URL after redirects
    const response = await fetch(uniqueUrl);
    
    // Get the final URL after redirects (this will be a unique image URL)
    const finalImageUrl = response.url;
    
    // Check if this image has been used for another recipe
    if (usedImageUrls.has(finalImageUrl)) {
      console.log(`Image duplicate detected for ${recipeName}, trying again...`);
      // Try again with a different random parameter
      return fetchNewRecipeImage(recipeName);
    }
    
    // Add this image to our used images set
    usedImageUrls.add(finalImageUrl);
    
    return finalImageUrl;
  } catch (error) {
    console.error(`Failed to fetch new image for recipe: ${recipeName}`, error);
    return '';
  }
};

// Initialize the set of used images from existing recipes
export const initializeUsedImagesTracker = (recipes: Recipe[]): void => {
  recipes.forEach(recipe => {
    if (recipe.image && recipe.image !== DEFAULT_IMAGE) {
      usedImageUrls.add(recipe.image);
    }
  });
  console.log(`Initialized used images tracker with ${usedImageUrls.size} images`);
};

// Load and verify recipe image with fallback
export const loadRecipeImage = async (recipe: Recipe): Promise<string> => {
  // If the recipe has no image, get a fallback
  if (!recipe.image) {
    return getFallbackImage(recipe);
  }
  
  // Check if this image is a duplicate (used by another recipe)
  // We can't check this perfectly without knowing all recipes, but we can check against our tracked set
  if (usedImageUrls.has(recipe.image) && usedImageUrls.size > 1) {
    console.log(`Duplicate image detected for recipe: ${recipe.name}, fetching new image...`);
    const newImage = await fetchNewRecipeImage(recipe.name);
    
    if (newImage) {
      // Update the recipe's image in our app state (this doesn't modify the original data)
      recipe.image = newImage;
      return newImage;
    }
  }
  
  // If not a duplicate, verify the image is valid
  const isValid = await verifyRecipeImage(recipe.image);
  
  if (!isValid) {
    console.warn(`Invalid image for recipe ${recipe.name}, fetching new image...`);
    const newImage = await fetchNewRecipeImage(recipe.name);
    
    if (newImage) {
      // Update the recipe's image in our app state
      recipe.image = newImage;
      return newImage;
    }
    
    // If we couldn't get a new image, use a fallback
    return getFallbackImage(recipe);
  }
  
  // Image is valid and not a duplicate, add it to used images
  usedImageUrls.add(recipe.image);
  return recipe.image;
};
