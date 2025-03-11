
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RecipeCard } from '@/components/onboarding/recipe/RecipeCard';
import { mockRecipes } from '@/components/onboarding/recipe/data/mockRecipes';
import { RecipeFilterOptions } from '@/components/onboarding/recipe/types';

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
  
  const categoryOptions = [
    'Entrée', 'Plat principal', 'Dessert', 'Petit-déjeuner', 
    'Déjeuner', 'Dîner', 'Végétarien', 'Végan'
  ];
  
  const timeOptions = [
    { value: '15', label: '15 minutes ou moins' },
    { value: '30', label: '30 minutes ou moins' },
    { value: '60', label: '1 heure ou moins' },
    { value: '120', label: '2 heures ou moins' }
  ];

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
        
        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher une recette..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#EDE6D6] focus:border-[#D11B19] focus:ring-[#D11B19]"
            />
          </div>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="flex items-center gap-2 border-[#EDE6D6] text-[#4A5568]"
          >
            <Filter className="h-4 w-4" />
            <span>Filtres</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>
        
        {/* Expanded filters */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#F9F5EB] p-4 rounded-lg mb-6 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#4A5568] mb-2">Catégorie</label>
                <select
                  className="w-full rounded-md border-[#EDE6D6] focus:border-[#D11B19] focus:ring-[#D11B19]"
                  value={filters.categoryFilter || ''}
                  onChange={(e) => setFilters({...filters, categoryFilter: e.target.value || null})}
                >
                  <option value="">Toutes les catégories</option>
                  {categoryOptions.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#4A5568] mb-2">Temps de préparation</label>
                <select
                  className="w-full rounded-md border-[#EDE6D6] focus:border-[#D11B19] focus:ring-[#D11B19]"
                  value={filters.timeFilter}
                  onChange={(e) => setFilters({...filters, timeFilter: e.target.value})}
                >
                  <option value="">Tous les temps</option>
                  {timeOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#4A5568] mb-2">Régime alimentaire</label>
                <select
                  className="w-full rounded-md border-[#EDE6D6] focus:border-[#D11B19] focus:ring-[#D11B19]"
                  value={filters.dietaryFilter || ''}
                  onChange={(e) => setFilters({...filters, dietaryFilter: e.target.value || null})}
                >
                  <option value="">Tous les régimes</option>
                  <option value="vegetarian">Végétarien</option>
                  <option value="vegan">Végan</option>
                  <option value="gluten-free">Sans gluten</option>
                  <option value="lactose-free">Sans lactose</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-[#EDE6D6] text-[#D11B19] focus:ring-[#D11B19]"
                    checked={filters.showOnlyFavorites}
                    onChange={(e) => setFilters({...filters, showOnlyFavorites: e.target.checked})}
                  />
                  <span className="ml-2 text-[#4A5568]">Afficher uniquement mes favoris</span>
                </label>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Recipe display */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favoriteRecipeIds.includes(recipe.id)}
                onToggleFavorite={() => toggleFavorite(recipe.id)}
                showDetails={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#4A5568] font-medium mb-4">Aucune recette ne correspond à vos critères.</p>
            <Button 
              onClick={() => {
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
              }}
              variant="outline"
              className="border-[#D11B19] text-[#D11B19] hover:bg-[#D11B19] hover:text-white"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default RecipesTab;
