
import { RecipeFilterOptions } from "../../types";

export interface UseFavoriteRecipesProps {
  favoriteRecipes: string[];
  onboardingData: {
    dietaryPreferences: string[];
    cookingTime: string;
    nutritionalGoals: string[];
    kitchenEquipment: string[];
  };
}

export interface PendingFilters {
  timeFilter: string;
  category: string | null;
  dietary: string | null;
  difficulty: string | null;
  calorie: string | null;
}

export interface FavoriteRecipesState {
  searchTerm: string;
  showFilters: boolean;
  showOnlyFavorites: boolean;
  selectedTimeFilter: string;
  selectedCategory: string | null;
  selectedDietary: string | null;
  selectedDifficulty: string | null;
  selectedCalorie: string | null;
  pendingTimeFilter: string;
  pendingCategory: string | null;
  pendingDietary: string | null;
  pendingDifficulty: string | null;
  pendingCalorie: string | null;
  page: number;
  recipesReady: boolean;
}

export interface FavoriteRecipesReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  showOnlyFavorites: boolean;
  setShowOnlyFavorites: (show: boolean) => void;
  selectedTimeFilter: string;
  setSelectedTimeFilter: (value: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
  selectedDietary: string | null;
  setSelectedDietary: (value: string | null) => void;
  selectedDifficulty: string | null;
  setSelectedDifficulty: (value: string | null) => void;
  selectedCalorie: string | null;
  setSelectedCalorie: (value: string | null) => void;
  pendingFilterOptions: RecipeFilterOptions;
  filterOptions: RecipeFilterOptions;
  debouncedSearchTerm: string;
  filteredRecipes: any[];
  visibleRecipes: any[];
  isLoading: boolean;
  imagesLoaded: Record<string, boolean>;
  recipesReady: boolean;
  handleLoadMore: () => void;
  handleReset: () => void;
  validateForNextStep: () => boolean;
  applyFilters: () => void;
}
