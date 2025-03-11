
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RecipeFilterOptions } from '@/components/onboarding/recipe/types';

interface RecipeFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filters: RecipeFilterOptions;
  setFilters: (filters: RecipeFilterOptions) => void;
}

const RecipeFilter: React.FC<RecipeFilterProps> = ({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  filters,
  setFilters,
}) => {
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

  return (
    <>
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
    </>
  );
};

export default RecipeFilter;
