
// This file is now just a re-export of utils and data
import { DEFAULT_IMAGE, allCategories, timePresets } from './utils/constants';
import { getTimeLabel, getDietLabel, getNutrientLabel } from './utils/formatters';
import { getFallbackImage, verifyRecipeImage, loadRecipeImage } from './utils/imageUtils';
import { mockRecipes } from './data/mockRecipes';

export {
  DEFAULT_IMAGE,
  allCategories,
  timePresets,
  getTimeLabel,
  getDietLabel,
  getNutrientLabel,
  getFallbackImage,
  verifyRecipeImage,
  loadRecipeImage,
  mockRecipes
};

