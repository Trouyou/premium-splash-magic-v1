
import { Recipe } from '../types';

// Set a local time label based on cooking time
export const getTimeLabel = (minutes: number) => {
  if (minutes <= 15) return `🕒 ${minutes} min`;
  if (minutes <= 30) return `🕙 ${minutes} min`;
  return `🕐 ${minutes} min`;
};

// Get icons for dietary options
export const getDietLabel = (options: string[]) => {
  const labels = [];
  if (options.includes('vegan')) labels.push('🌱 Vegan');
  if (options.includes('vegetarian') && !options.includes('vegan')) labels.push('🥗 Végétarien');
  if (options.includes('pescatarian')) labels.push('🐟 Pescatarien');
  if (options.includes('gluten-free')) labels.push('🌾 Sans gluten');
  if (options.includes('keto')) labels.push('🥑 Keto');
  if (options.includes('omnivore') && options.length === 1) labels.push('🍖 Omnivore');
  
  return labels.length > 0 ? labels[0] : '';
};

// Get extra nutrient info if available
export const getNutrientLabel = (recipe: Recipe) => {
  if (recipe.protein && recipe.protein > 20) return `🔥 ${recipe.protein}g protéines`;
  if (recipe.calories && recipe.calories < 300) return `✨ ${recipe.calories} calories`;
  return '';
};
