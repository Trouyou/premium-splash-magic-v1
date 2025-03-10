
import { Recipe } from '../../types';

export interface OnboardingData {
  dietaryPreferences: string[];
  cookingTime: string;
  nutritionalGoals: string[];
  kitchenEquipment: string[];
}

export interface FilteringOptions {
  recipes: Recipe[];
  onboardingData: OnboardingData;
  favoriteRecipes: string[];
  debouncedSearchTerm: string;
  selectedTimeFilter: string;
  selectedCategory: string | null;
  selectedDietary: string | null;
  selectedDifficulty: string | null;
  selectedCalorie: string | null;
  showOnlyFavorites: boolean;
  page: number;
  recipesPerPage: number;
}

export interface FilteringResult {
  filteredRecipes: Recipe[];
  visibleRecipes: Recipe[];
  isLoading: boolean;
  imagesLoaded: Record<string, boolean>;
}
