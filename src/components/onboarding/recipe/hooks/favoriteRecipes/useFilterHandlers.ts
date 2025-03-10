
import { toast } from "sonner";
import { RecipeFilterOptions } from "../../types";
import { FavoriteRecipesState } from './types';

export const useFilterHandlers = (
  state: FavoriteRecipesState,
  setters: {
    setShowFilters: (show: boolean) => void;
    resetState: () => void;
    applyPendingFilters: () => void;
    setPage: (page: number) => void;
  },
  favoriteRecipes: string[]
) => {
  const handleLoadMore = () => {
    setters.setPage(state.page + 1);
  };

  const handleReset = () => {
    setters.resetState();
    setters.setShowFilters(false);
  };

  const validateForNextStep = () => {
    if (favoriteRecipes.length === 0) {
      toast("Ajoutez au moins une recette pour personnaliser votre expérience.", {
        position: "top-center",
      });
      return false;
    }
    return true;
  };

  const applyFilters = () => {
    // Apply all pending filters
    setters.applyPendingFilters();
    
    // Hide filters after applying
    setters.setShowFilters(false);
    
    // If there are filters applied, show a toast confirmation
    if (
      state.pendingTimeFilter !== 'all' || 
      state.pendingCategory || 
      state.pendingDietary || 
      state.pendingDifficulty || 
      state.pendingCalorie
    ) {
      toast("Filtres appliqués avec succès", {
        position: "top-center",
      });
    }
  };

  // Active filter options
  const filterOptions: RecipeFilterOptions = {
    searchTerm: state.searchTerm,
    timeFilter: state.selectedTimeFilter,
    categoryFilter: state.selectedCategory,
    dietaryFilter: state.selectedDietary,
    difficultyFilter: state.selectedDifficulty,
    calorieFilter: state.selectedCalorie,
    showOnlyFavorites: state.showOnlyFavorites
  };

  // Pending filter options
  const pendingFilterOptions: RecipeFilterOptions = {
    searchTerm: state.searchTerm,
    timeFilter: state.pendingTimeFilter,
    categoryFilter: state.pendingCategory,
    dietaryFilter: state.pendingDietary,
    difficultyFilter: state.pendingDifficulty,
    calorieFilter: state.pendingCalorie,
    showOnlyFavorites: state.showOnlyFavorites
  };

  return {
    handleLoadMore,
    handleReset,
    validateForNextStep,
    applyFilters,
    filterOptions,
    pendingFilterOptions
  };
};
