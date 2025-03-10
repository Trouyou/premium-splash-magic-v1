
import { useDebounce } from "@/hooks/use-debounce";
import { useFilterState } from "./useFilterState";
import { useFilterHandlers } from "./useFilterHandlers";
import { useRecipePreparation } from "./useRecipePreparation";
import { useRecipeFiltering } from "../useRecipeFiltering";
import { mockRecipes } from "../../data/mockRecipes";
import { UseFavoriteRecipesProps, FavoriteRecipesReturn } from "./types";

export const useFavoriteRecipes = ({
  favoriteRecipes,
  onboardingData,
}: UseFavoriteRecipesProps): FavoriteRecipesReturn => {
  // Use the filter state hook to manage all state
  const [
    state,
    {
      setSearchTerm,
      setShowFilters,
      setShowOnlyFavorites,
      setPendingTimeFilter,
      setPendingCategory,
      setPendingDietary,
      setPendingDifficulty,
      setPendingCalorie,
      setSelectedTimeFilter,
      setSelectedCategory,
      setSelectedDietary,
      setSelectedDifficulty,
      setSelectedCalorie,
      setPage,
      setRecipesReady,
      resetState,
      applyPendingFilters,
    },
  ] = useFilterState();

  // Debounce search input for better performance
  const debouncedSearchTerm = useDebounce(state.searchTerm, 300);

  // Prepare recipes (ensure valid images, etc.)
  useRecipePreparation(setRecipesReady);

  // Use the filter handlers
  const {
    handleLoadMore,
    handleReset,
    validateForNextStep,
    applyFilters,
    filterOptions,
    pendingFilterOptions,
  } = useFilterHandlers(
    state,
    {
      setShowFilters,
      resetState,
      applyPendingFilters,
      setPage,
    },
    favoriteRecipes
  );

  // Use the recipe filtering hook
  const { 
    filteredRecipes, 
    visibleRecipes, 
    isLoading, 
    imagesLoaded 
  } = useRecipeFiltering(
    mockRecipes,
    onboardingData,
    favoriteRecipes,
    debouncedSearchTerm,
    state.selectedTimeFilter,
    state.selectedCategory,
    state.selectedDietary,
    state.selectedDifficulty,
    state.selectedCalorie,
    state.showOnlyFavorites,
    state.page,
    8 // recipesPerPage
  );

  return {
    searchTerm: state.searchTerm,
    setSearchTerm,
    showFilters: state.showFilters,
    setShowFilters,
    showOnlyFavorites: state.showOnlyFavorites,
    setShowOnlyFavorites,
    selectedTimeFilter: state.selectedTimeFilter,
    setSelectedTimeFilter: setPendingTimeFilter,
    selectedCategory: state.selectedCategory,
    setSelectedCategory: setPendingCategory,
    selectedDietary: state.selectedDietary,
    setSelectedDietary: setPendingDietary,
    selectedDifficulty: state.selectedDifficulty,
    setSelectedDifficulty: setPendingDifficulty,
    selectedCalorie: state.selectedCalorie,
    setSelectedCalorie: setPendingCalorie,
    pendingFilterOptions,
    filterOptions,
    debouncedSearchTerm,
    filteredRecipes,
    visibleRecipes,
    isLoading,
    imagesLoaded,
    recipesReady: state.recipesReady,
    handleLoadMore,
    handleReset,
    validateForNextStep,
    applyFilters
  };
};
