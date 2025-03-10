
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RecipeFilterOptions, CategoryOption, TimePresetOption } from './types';

interface RecipeFiltersProps {
  filterOptions: RecipeFilterOptions;
  setSearchTerm: (term: string) => void;
  setSelectedTimeFilter: (timeFilter: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setShowFilters: (show: boolean) => void;
  setShowOnlyFavorites: (show: boolean) => void;
  showFilters: boolean;
  showOnlyFavorites: boolean;
  handleReset: () => void;
  favoriteRecipesCount: number;
  timePresets: TimePresetOption[];
  categories: CategoryOption[];
  totalResults: number;
  searchTerm: string;
}

const RecipeFilters: React.FC<RecipeFiltersProps> = ({
  filterOptions,
  setSearchTerm,
  setSelectedTimeFilter,
  setSelectedCategory,
  setShowFilters,
  setShowOnlyFavorites,
  showFilters,
  showOnlyFavorites,
  handleReset,
  favoriteRecipesCount,
  timePresets,
  categories,
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
            <ChevronDown size={16} className={`ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
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
              <div className="mb-4">
                <h3 className="font-medium text-[#4A5568] mb-2">Temps de préparation</h3>
                <div className="flex flex-wrap gap-2">
                  {timePresets.map(time => (
                    <button
                      key={time.id}
                      onClick={() => setSelectedTimeFilter(time.id)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        filterOptions.timeFilter === time.id
                          ? 'bg-[#D11B19] text-white'
                          : 'bg-white text-[#4A5568] hover:bg-[#EDE6D6]'
                      }`}
                    >
                      {time.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium text-[#4A5568] mb-2">Catégories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(filterOptions.categoryFilter === category.id ? null : category.id)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        filterOptions.categoryFilter === category.id
                          ? 'bg-[#D11B19] text-white'
                          : 'bg-white text-[#4A5568] hover:bg-[#EDE6D6]'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  className="text-[#D11B19] border-[#D11B19] hover:bg-[#D11B19]/10"
                >
                  <X size={16} className="mr-1" />
                  Réinitialiser les filtres
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
        
        {(searchTerm || filterOptions.categoryFilter || filterOptions.timeFilter !== 'all') && (
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
