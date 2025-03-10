
export interface Recipe {
  id: string;
  name: string;
  image: string;
  mainIngredients: string[];
  cookingTime: number; // in minutes
  categories: string[];
  dietaryOptions: string[];
  calories?: number;
  protein?: number;
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
