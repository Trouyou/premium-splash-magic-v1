
import { useState, useEffect } from 'react';
import { FavoriteRecipesState, PendingFilters } from './types';

export const useFilterState = (): [
  FavoriteRecipesState,
  {
    setSearchTerm: (term: string) => void;
    setShowFilters: (show: boolean) => void;
    setShowOnlyFavorites: (show: boolean) => void;
    setPendingTimeFilter: (value: string) => void;
    setPendingCategory: (value: string | null) => void;
    setPendingDietary: (value: string | null) => void;
    setPendingDifficulty: (value: string | null) => void;
    setPendingCalorie: (value: string | null) => void;
    setSelectedTimeFilter: (value: string) => void;
    setSelectedCategory: (value: string | null) => void;
    setSelectedDietary: (value: string | null) => void;
    setSelectedDifficulty: (value: string | null) => void;
    setSelectedCalorie: (value: string | null) => void;
    setPage: (page: number) => void;
    setRecipesReady: (ready: boolean) => void;
    resetState: () => void;
    applyPendingFilters: () => void;
  }
] => {
  // Initial state
  const [state, setState] = useState<FavoriteRecipesState>({
    searchTerm: '',
    showFilters: false,
    showOnlyFavorites: false,
    selectedTimeFilter: 'all',
    selectedCategory: null,
    selectedDietary: null,
    selectedDifficulty: null,
    selectedCalorie: null,
    pendingTimeFilter: 'all',
    pendingCategory: null,
    pendingDietary: null,
    pendingDifficulty: null,
    pendingCalorie: null,
    page: 1,
    recipesReady: false,
  });

  // Initialize pending filters from active filters
  useEffect(() => {
    setState(current => ({
      ...current,
      pendingTimeFilter: current.selectedTimeFilter,
      pendingCategory: current.selectedCategory,
      pendingDietary: current.selectedDietary,
      pendingDifficulty: current.selectedDifficulty,
      pendingCalorie: current.selectedCalorie,
    }));
  }, [
    state.selectedTimeFilter,
    state.selectedCategory,
    state.selectedDietary,
    state.selectedDifficulty,
    state.selectedCalorie
  ]);

  // State setters
  const setSearchTerm = (term: string) => {
    setState(current => ({ ...current, searchTerm: term }));
  };

  const setShowFilters = (show: boolean) => {
    setState(current => ({ ...current, showFilters: show }));
  };

  const setShowOnlyFavorites = (show: boolean) => {
    setState(current => ({ ...current, showOnlyFavorites: show }));
  };

  const setPendingTimeFilter = (value: string) => {
    setState(current => ({ ...current, pendingTimeFilter: value }));
  };

  const setPendingCategory = (value: string | null) => {
    setState(current => ({ ...current, pendingCategory: value }));
  };

  const setPendingDietary = (value: string | null) => {
    setState(current => ({ ...current, pendingDietary: value }));
  };

  const setPendingDifficulty = (value: string | null) => {
    setState(current => ({ ...current, pendingDifficulty: value }));
  };

  const setPendingCalorie = (value: string | null) => {
    setState(current => ({ ...current, pendingCalorie: value }));
  };

  const setSelectedTimeFilter = (value: string) => {
    setState(current => ({ ...current, selectedTimeFilter: value }));
  };

  const setSelectedCategory = (value: string | null) => {
    setState(current => ({ ...current, selectedCategory: value }));
  };

  const setSelectedDietary = (value: string | null) => {
    setState(current => ({ ...current, selectedDietary: value }));
  };

  const setSelectedDifficulty = (value: string | null) => {
    setState(current => ({ ...current, selectedDifficulty: value }));
  };

  const setSelectedCalorie = (value: string | null) => {
    setState(current => ({ ...current, selectedCalorie: value }));
  };

  const setPage = (page: number) => {
    setState(current => ({ ...current, page }));
  };

  const setRecipesReady = (ready: boolean) => {
    setState(current => ({ ...current, recipesReady: ready }));
  };

  const resetState = () => {
    setState(current => ({
      ...current,
      searchTerm: '',
      selectedTimeFilter: 'all',
      selectedCategory: null,
      selectedDietary: null,
      selectedDifficulty: null,
      selectedCalorie: null,
      pendingTimeFilter: 'all',
      pendingCategory: null,
      pendingDietary: null,
      pendingDifficulty: null,
      pendingCalorie: null,
      page: 1,
    }));
  };

  const applyPendingFilters = () => {
    setState(current => ({
      ...current,
      selectedTimeFilter: current.pendingTimeFilter,
      selectedCategory: current.pendingCategory,
      selectedDietary: current.pendingDietary,
      selectedDifficulty: current.pendingDifficulty,
      selectedCalorie: current.pendingCalorie,
    }));
  };

  return [
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
  ];
};
