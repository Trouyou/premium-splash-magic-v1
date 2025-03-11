
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { mockRecipes } from '@/components/onboarding/recipe/data/mockRecipes';
import { RecipeFilterOptions } from '@/components/onboarding/recipe/types';
import RecipeFilter from '../recipes/RecipeFilter';
import RecipeList from '../recipes/RecipeList';
import NoRecipesFound from '../recipes/NoRecipesFound';

const RecipesTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<RecipeFilterOptions>({
    searchTerm: '',
    timeFilter: '',
    categoryFilter: null,
    showOnlyFavorites: false,
    dietaryFilter: null,
    difficultyFilter: null,
    calorieFilter: null
  });
  
  // Mock favorite recipes - in a real implementation, this would come from user data
  const favoriteRecipeIds = ['recipe1', 'recipe5', 'recipe8'];
  
  const toggleFavorite = (recipeId: string) => {
    console.log(`Toggle favorite for: ${recipeId}`);
    // In a real implementation, this would update the user's favorites
  };
  
  const filteredRecipes = mockRecipes.filter(recipe => {
    // Filter by search term
    if (searchTerm && !recipe.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by favorites if selected
    if (filters.showOnlyFavorites && !favoriteRecipeIds.includes(recipe.id)) {
      return false;
    }
    
    // Filter by category if selected
    if (filters.categoryFilter && !recipe.categories.includes(filters.categoryFilter)) {
      return false;
    }
    
    // Filter by dietary preference if selected
    if (filters.dietaryFilter && !recipe.dietaryOptions.includes(filters.dietaryFilter)) {
      return false;
    }
    
    // Filter by time if selected
    if (filters.timeFilter) {
      const timeInMinutes = parseInt(filters.timeFilter);
      if (recipe.cookingTime > timeInMinutes) {
        return false;
      }
    }
    
    return true;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      searchTerm: '',
      timeFilter: '',
      categoryFilter: null,
      showOnlyFavorites: false,
      dietaryFilter: null,
      difficultyFilter: null,
      calorieFilter: null
    });
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-[#EDE6D6]">
        <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#4A5568] mb-6">
          Mes Recettes
        </h1>
        
        <RecipeFilter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />
        
        {/* Recipe display */}
        {filteredRecipes.length > 0 ? (
          <RecipeList 
            recipes={filteredRecipes}
            favoriteRecipeIds={favoriteRecipeIds}
            toggleFavorite={toggleFavorite}
          />
        ) : (
          <NoRecipesFound resetFilters={resetFilters} />
        )}
      </motion.div>
    </motion.div>
  );
};

export default RecipesTab;
