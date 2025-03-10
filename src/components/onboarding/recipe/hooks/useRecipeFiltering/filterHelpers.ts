
import { Recipe } from '../../types';
import { OnboardingData } from './types';

export const filterByDietaryPreferences = (recipes: Recipe[], dietaryPreferences: string[]): Recipe[] => {
  if (dietaryPreferences.length === 0 || dietaryPreferences.includes('omnivore')) {
    return recipes;
  }
  
  return recipes.filter(recipe => 
    recipe.dietaryOptions.some(option => dietaryPreferences.includes(option))
  );
};

export const filterByEquipment = (recipes: Recipe[], kitchenEquipment: string[]): Recipe[] => {
  return recipes.filter(recipe => {
    // If no equipment requirements, skip this filter
    if (!recipe.requiredEquipment || recipe.requiredEquipment.length === 0 || kitchenEquipment.length === 0) {
      return true;
    }
    // Recipe requires only equipment that user has
    return recipe.requiredEquipment.every(equipment => 
      kitchenEquipment.includes(equipment)
    );
  });
};

export const filterByTime = (recipes: Recipe[], timeFilter: string): Recipe[] => {
  return recipes.filter(recipe => {
    switch (timeFilter) {
      case 'ultra-quick':
        return recipe.cookingTime <= 10;
      case 'quick':
        return recipe.cookingTime <= 15;
      case 'medium':
        return recipe.cookingTime >= 15 && recipe.cookingTime <= 30;
      case 'long':
        return recipe.cookingTime > 30;
      default:
        return true;
    }
  });
};

export const filterByCategory = (recipes: Recipe[], categoryFilter: string | null): Recipe[] => {
  if (!categoryFilter) return recipes;
  
  return recipes.filter(recipe => {
    switch (categoryFilter) {
      case 'rapide':
        return recipe.cookingTime <= 15;
      case 'equilibre':
        return recipe.categories.some(cat => 
          ['Équilibré', 'Healthy'].includes(cat)
        );
      case 'gourmand':
        return recipe.categories.includes('Gourmand');
      case 'monde': {
        // Fixed array of world cuisines for optimization
        const worldCuisines = ['Italien', 'Mexicain', 'Asiatique', 'Indien', 
          'Méditerranéen', 'Moyen-Orient', 'Thaïlandais', 'Français', 'Hawaïen', 'Suisse',
          'Vietnamien', 'Japonais', 'Coréen', 'Espagnol', 'Grec', 'Maghrébin', 'Argentin',
          'Russe', 'Ukrainien'];
        return recipe.categories.some(cat => worldCuisines.includes(cat));
      }
      case 'plat-principal': {
        const mainDishCategories = ['Plat principal', 'Plat', 'Repas complet'];
        return recipe.categories.some(cat => mainDishCategories.includes(cat));
      }
      case 'dessert': {
        const dessertCategories = ['Dessert', 'Gourmandise', 'Pâtisserie', 'Sucré'];
        return recipe.categories.some(cat => dessertCategories.includes(cat));
      }
      default:
        return true;
    }
  });
};

export const filterByDietary = (recipes: Recipe[], dietaryFilter: string | null): Recipe[] => {
  if (!dietaryFilter) return recipes;
  
  return recipes.filter(recipe => {
    switch (dietaryFilter) {
      case 'vegetarian':
        return recipe.dietaryOptions.includes('vegetarien');
      case 'vegan':
        return recipe.dietaryOptions.includes('vegan');
      case 'gluten-free':
        return recipe.dietaryOptions.includes('sans-gluten');
      case 'keto':
        return recipe.dietaryOptions.includes('keto') || recipe.dietaryOptions.includes('low-carb');
      case 'high-protein':
        return recipe.dietaryOptions.includes('proteine') || (recipe.protein && recipe.protein > 20);
      default:
        return true;
    }
  });
};

export const filterByDifficulty = (recipes: Recipe[], difficultyFilter: string | null): Recipe[] => {
  if (!difficultyFilter) return recipes;
  
  return recipes.filter(recipe => {
    if (!recipe.difficulty) return true;
    
    switch (difficultyFilter) {
      case 'easy':
        return recipe.difficulty === 'facile' || recipe.difficulty === 'easy';
      case 'medium':
        return recipe.difficulty === 'moyen' || recipe.difficulty === 'medium';
      case 'advanced':
        return recipe.difficulty === 'difficile' || recipe.difficulty === 'advanced' || recipe.difficulty === 'hard';
      default:
        return true;
    }
  });
};

export const filterByCalorie = (recipes: Recipe[], calorieFilter: string | null): Recipe[] => {
  if (!calorieFilter) return recipes;
  
  return recipes.filter(recipe => {
    if (!recipe.calories) return true;
    
    switch (calorieFilter) {
      case 'light':
        return recipe.calories < 300;
      case 'medium':
        return recipe.calories >= 300 && recipe.calories <= 600;
      case 'high':
        return recipe.calories > 600;
      default:
        return true;
    }
  });
};

export const filterBySearchTerm = (recipes: Recipe[], searchTerm: string): Recipe[] => {
  if (!searchTerm) return recipes;
  
  const searchTermLower = searchTerm.toLowerCase();
  
  return recipes.filter(recipe => {
    // Check recipe name
    if (recipe.name.toLowerCase().includes(searchTermLower)) {
      return true;
    }
    
    // Check ingredients
    for (const ingredient of recipe.mainIngredients) {
      if (ingredient.toLowerCase().includes(searchTermLower)) {
        return true;
      }
    }
    
    // Check categories
    for (const category of recipe.categories) {
      if (category.toLowerCase().includes(searchTermLower)) {
        return true;
      }
    }
    
    return false;
  });
};

export const filterByFavorites = (recipes: Recipe[], showOnlyFavorites: boolean, favoriteRecipes: string[]): Recipe[] => {
  if (!showOnlyFavorites) return recipes;
  
  return recipes.filter(recipe => favoriteRecipes.includes(recipe.id));
};
