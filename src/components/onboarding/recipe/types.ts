
export interface Recipe {
  id: string;
  name: string;
  image: string;
  mainIngredients: string[];
  cookingTime: number; // in minutes
  categories: string[];
  dietaryOptions: string[];
  requiredEquipment?: string[]; // Added field for required equipment
  calories?: number;
  protein?: number;
  imageVerified?: boolean;
  difficulty?: string; // Added field for difficulty
}

export interface RecipeFilterOptions {
  searchTerm: string;
  timeFilter: string;
  categoryFilter: string | null;
  showOnlyFavorites: boolean;
  dietaryFilter: string | null;    // New filter for dietary preferences
  difficultyFilter: string | null; // New filter for difficulty level
  calorieFilter: string | null;    // New filter for calorie range
}

export interface CategoryOption {
  id: string;
  name: string;
}

export interface TimePresetOption {
  id: string;
  name: string;
}

export interface DietaryOption {
  id: string;
  name: string;
}

export interface DifficultyOption {
  id: string;
  name: string;
}

export interface CalorieOption {
  id: string;
  name: string;
  min?: number;
  max?: number;
}

// Fallback image configuration
export interface ImageFallbacks {
  defaultImage: string;
  categoryFallbacks: Record<string, string>;
}
