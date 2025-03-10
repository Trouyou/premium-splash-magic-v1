
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
  
  // Use AbortController to prevent hanging requests
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch(imageUrl, { 
      method: 'HEAD', 
      signal: controller.signal,
      cache: 'force-cache' // Use cached response if available
    });
    
    clearTimeout(timeoutId);
    return response.ok && response.headers.get('Content-Type')?.startsWith('image/');
  } catch (error) {
    console.error("Error verifying image URL:", error);
    return false;
  }
};

// Generate keyword variations for better image search results
const generateSearchKeywords = (recipeName: string): string => {
  // Common food terms to enhance search
  const foodTerms = ['dish', 'food', 'meal', 'plate', 'cuisine', 'recipe'];
  
  // Clean the recipe name and extract main terms
  const nameTerms = recipeName
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .split(' ')
    .filter(word => word.length > 2);
  
  // If we have a very short or no name, use fallbacks
  if (nameTerms.length === 0) {
    return 'delicious food dish recipe';
  }
  
  // Add a random food term to the search
  const randomFoodTerm = foodTerms[Math.floor(Math.random() * foodTerms.length)];
  
  // Build the search query
  return [...nameTerms, randomFoodTerm, 'cooking'].join(' ');
};

// Fetch a unique recipe image using Unsplash source with optimized caching
export const fetchUniqueRecipeImage = async (recipeName: string): Promise<string> => {
  try {
    // Generate better search terms for more relevant results
    const searchQuery = generateSearchKeywords(recipeName);
    
    // Add random seed to ensure different images for similar queries
    const randomSeed = Math.floor(Math.random() * 1000000);
    
    // Construct Unsplash source URL with optimized parameters
    const imageUrl = `https://source.unsplash.com/featured/?${encodeURIComponent(searchQuery)}&random=${randomSeed}`;
    
    // Check if this URL is already used - although unlikely with the random seed
    if (usedImageUrls.has(imageUrl)) {
      // Generate a new one with different seed
      return fetchUniqueRecipeImage(recipeName);
    }
    
    // Verify the image is valid
    const isValid = await verifyRecipeImage(imageUrl);
    if (!isValid) {
      // Try another random seed if this URL wasn't valid
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

// Initialize the image registry from existing recipes - for performance
export const initializeUsedImagesTracker = (recipes: Recipe[]): void => {
  usedImageUrls.clear();
  
  recipes.forEach(recipe => {
    if (recipe.image && recipe.image !== DEFAULT_IMAGE) {
      usedImageUrls.add(recipe.image);
    }
  });
  
  console.log(`Initialized image tracker with ${usedImageUrls.size} used images`);
};

// Ensure all recipes have unique images with efficient batching
export const ensureUniqueImages = async (recipes: Recipe[]): Promise<void> => {
  // First count image occurrences
  const imageCountMap = new Map<string, number>();
  const recipesNeedingImages: Recipe[] = [];
  
  // First pass: identify which recipes need new images
  recipes.forEach(recipe => {
    if (!recipe.image) {
      recipesNeedingImages.push(recipe);
      return;
    }
    
    const count = imageCountMap.get(recipe.image) || 0;
    imageCountMap.set(recipe.image, count + 1);
    
    // If this image is used more than once, add this recipe to the list
    if (count > 0) {
      recipesNeedingImages.push(recipe);
    }
  });
  
  console.log(`Found ${recipesNeedingImages.length} recipes needing unique images`);
  
  // Process in smaller batches to avoid overwhelming the network
  const batchSize = 5;
  for (let i = 0; i < recipesNeedingImages.length; i += batchSize) {
    const batch = recipesNeedingImages.slice(i, i + batchSize);
    
    // Process batch in parallel
    await Promise.all(
      batch.map(async recipe => {
        // Remove the existing image from the tracking if it's duplicated
        if (recipe.image && imageCountMap.get(recipe.image) > 1) {
          imageCountMap.set(recipe.image, imageCountMap.get(recipe.image) - 1);
        }
        
        // Get a new unique image
        recipe.image = await fetchUniqueRecipeImage(recipe.name);
        
        // If fetch failed, use category fallback
        if (!recipe.image) {
          recipe.image = getFallbackImage(recipe);
        }
      })
    );
  }
};

// Main optimized function to load and verify recipe images
export const loadRecipeImage = async (recipe: Recipe): Promise<string> => {
  // Case 1: Recipe has no image - get a new unique one
  if (!recipe.image) {
    const newImage = await fetchUniqueRecipeImage(recipe.name);
    return newImage || getFallbackImage(recipe);
  }
  
  // Case 2: Recipe has a potentially used image - check if it's in the registry
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
  
  // Case 4: Recipe has a valid, unique image - register it
  usedImageUrls.add(recipe.image);
  return recipe.image;
};
