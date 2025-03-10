import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronDown, ChevronUp, Check, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RecipeFilterOptions, CategoryOption, TimePresetOption, DietaryOption, DifficultyOption, CalorieOption } from './types';

interface RecipeFiltersProps {
  filterOptions: RecipeFilterOptions;
  pendingFilterOptions: RecipeFilterOptions;
  setSearchTerm: (term: string) => void;
  setSelectedTimeFilter: (timeFilter: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedDietary: (dietary: string | null) => void;
  setSelectedDifficulty: (difficulty: string | null) => void;
  setSelectedCalorie: (calorie: string | null) => void;
  setShowFilters: (show: boolean) => void;
  setShowOnlyFavorites: (show: boolean) => void;
  showFilters: boolean;
  showOnlyFavorites: boolean;
  handleReset: () => void;
  applyFilters: () => void;
  favoriteRecipesCount: number;
  timePresets: TimePresetOption[];
  categories: CategoryOption[];
  dietaryOptions: DietaryOption[];
  difficultyOptions: DifficultyOption[];
  calorieOptions: CalorieOption[];
  totalResults: number;
  searchTerm: string;
}

const RecipeFilters: React.FC<RecipeFiltersProps> = ({
  filterOptions,
  pendingFilterOptions,
  setSearchTerm,
  setSelectedTimeFilter,
  setSelectedCategory,
  setSelectedDietary,
  setSelectedDifficulty,
  setSelectedCalorie,
  setShowFilters,
  setShowOnlyFavorites,
  showFilters,
  showOnlyFavorites,
  handleReset,
  applyFilters,
  favoriteRecipesCount,
  timePresets,
  categories,
  dietaryOptions,
  difficultyOptions,
  calorieOptions,
  totalResults,
  searchTerm
}) => {
  const toggleFilter = () => {
    setShowOnlyFavorites(!showOnlyFavorites);
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Rechercher des recettes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg border-[#EDE6D6] focus:border-[#D11B19] focus:ring-1 focus:ring-[#D11B19]"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="px-3 py-2 border-[#EDE6D6] text-[#4A5568] hover:bg-[#F5F3E7]"
          >
            <Filter size={18} className="mr-1" />
            Filtres
            {showFilters ? 
              <ChevronUp size={16} className="ml-1 transition-transform" /> : 
              <ChevronDown size={16} className="ml-1 transition-transform" />
            }
          </Button>
          
          <Button
            onClick={toggleFilter}
            variant={showOnlyFavorites ? "default" : "outline"}
            className={showOnlyFavorites 
              ? "px-3 py-2 bg-[#D11B19] text-white hover:bg-[#B01815]" 
              : "px-3 py-2 border-[#EDE6D6] text-[#4A5568] hover:bg-[#F5F3E7]"
            }
          >
            {showOnlyFavorites ? 'Voir tout' : 'Favoris'}
            {favoriteRecipesCount > 0 && (
              <Badge className="ml-1 bg-white text-[#D11B19] hover:bg-gray-100">{favoriteRecipesCount}</Badge>
            )}
          </Button>
        </div>
      </div>
      
      {/* Advanced Filters Section */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-[#F5F3E7] p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Temps de préparation */}
                <div className="mb-4">
                  <h3 className="font-medium text-[#4A5568] mb-2">Temps de préparation</h3>
                  <div className="flex flex-wrap gap-2">
                    {timePresets.map(time => (
                      <button
                        key={time.id}
                        onClick={() => setSelectedTimeFilter(time.id)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          pendingFilterOptions.timeFilter === time.id
                            ? 'bg-[#D11B19] text-white'
                            : 'bg-white text-[#4A5568] hover:bg-[#EDE6D6]'
                        }`}
                      >
                        {time.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Type de plat */}
                <div className="mb-4">
                  <h3 className="font-medium text-[#4A5568] mb-2">Type de plat</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(pendingFilterOptions.categoryFilter === category.id ? null : category.id)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          pendingFilterOptions.categoryFilter === category.id
                            ? 'bg-[#D11B19] text-white'
                            : 'bg-white text-[#4A5568] hover:bg-[#EDE6D6]'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Régime alimentaire */}
                <div className="mb-4">
                  <h3 className="font-medium text-[#4A5568] mb-2">Régime alimentaire</h3>
                  <div className="flex flex-wrap gap-2">
                    {dietaryOptions.map(dietary => (
                      <button
                        key={dietary.id}
                        onClick={() => setSelectedDietary(pendingFilterOptions.dietaryFilter === dietary.id ? null : dietary.id)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          pendingFilterOptions.dietaryFilter === dietary.id
                            ? 'bg-[#D11B19] text-white'
                            : 'bg-white text-[#4A5568] hover:bg-[#EDE6D6]'
                        }`}
                      >
                        {dietary.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Difficulté */}
                <div className="mb-4">
                  <h3 className="font-medium text-[#4A5568] mb-2">Difficulté</h3>
                  <div className="flex flex-wrap gap-2">
                    {difficultyOptions.map(difficulty => (
                      <button
                        key={difficulty.id}
                        onClick={() => setSelectedDifficulty(pendingFilterOptions.difficultyFilter === difficulty.id ? null : difficulty.id)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          pendingFilterOptions.difficultyFilter === difficulty.id
                            ? 'bg-[#D11B19] text-white'
                            : 'bg-white text-[#4A5568] hover:bg-[#EDE6D6]'
                        }`}
                      >
                        {difficulty.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Calories par portion */}
                <div className="mb-4">
                  <h3 className="font-medium text-[#4A5568] mb-2">Calories par portion</h3>
                  <div className="flex flex-wrap gap-2">
                    {calorieOptions.map(calorie => (
                      <button
                        key={calorie.id}
                        onClick={() => setSelectedCalorie(pendingFilterOptions.calorieFilter === calorie.id ? null : calorie.id)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          pendingFilterOptions.calorieFilter === calorie.id
                            ? 'bg-[#D11B19] text-white'
                            : 'bg-white text-[#4A5568] hover:bg-[#EDE6D6]'
                        }`}
                      >
                        {calorie.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  className="text-[#D11B19] border-[#D11B19] hover:bg-[#D11B19]/10"
                >
                  <X size={16} className="mr-1" />
                  Réinitialiser
                </Button>
                
                <Button 
                  onClick={applyFilters}
                  className="px-4 py-2 bg-[#D11B19] text-white hover:bg-[#B01815]"
                >
                  <Check size={16} className="mr-1" />
                  Appliquer les filtres
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results count */}
      <div className="mb-4 text-[#4A5568] text-sm flex items-center justify-between">
        <span>
          {totalResults} recettes trouvées
          {searchTerm && <span> pour "{searchTerm}"</span>}
          {filterOptions.categoryFilter && (
            <span> dans {categories.find(c => c.id === filterOptions.categoryFilter)?.name.toLowerCase()}</span>
          )}
        </span>
        
        {(searchTerm || 
          filterOptions.categoryFilter || 
          filterOptions.timeFilter !== 'all' || 
          filterOptions.dietaryFilter || 
          filterOptions.difficultyFilter || 
          filterOptions.calorieFilter) && (
          <button 
            onClick={handleReset}
            className="text-[#D11B19] hover:underline text-sm flex items-center"
          >
            <X size={14} className="mr-1" />
            Effacer les filtres
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeFilters;
