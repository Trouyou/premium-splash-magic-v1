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
}

export interface RecipeFilterOptions {
  searchTerm: string;
  timeFilter: string;
  categoryFilter: string | null;
  showOnlyFavorites: boolean;
}

export interface CategoryOption {
  id: string;
  name: string;
}

export interface TimePresetOption {
  id: string;
  name: string;
}

// Fallback image configuration
export interface ImageFallbacks {
  defaultImage: string;
  categoryFallbacks: Record<string, string>;
}
