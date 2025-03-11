
import React from 'react';
import { Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RecipeCard from '../RecipeCard';
import { Recipe } from '@/components/onboarding/recipe/types';

interface RecipeGridProps {
  isLoading: boolean;
  filteredRecipes: Recipe[];
  searchTerm: string;
  favorites: string[];
  toggleFavorite: (recipeId: string) => void;
  setSearchTerm: (term: string) => void;
  setActiveTab: (tab: string) => void;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({
  isLoading,
  filteredRecipes,
  searchTerm,
  favorites,
  toggleFavorite,
  setSearchTerm,
  setActiveTab
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 border-4 border-[#EDE6D6] border-t-[#D11B19] rounded-full animate-rotate-loader" />
        </div>
        <p className="text-gray-600">Chargement des recettes...</p>
      </div>
    );
  }

  if (filteredRecipes.length === 0) {
    return (
      <div className="bg-[#F5F3E7] rounded-lg p-8 text-center">
        <Utensils size={32} className="mx-auto mb-4 text-gray-400" />
        <p className="text-[#4A5568] mb-2 font-medium">Aucune recette trouvée</p>
        <p className="text-gray-500 mb-4">Essayez de modifier vos critères de recherche</p>
        <Button 
          onClick={() => {
            setSearchTerm('');
            setActiveTab('all');
          }}
          className="bg-[#D11B19] text-white hover:bg-[#B01815]"
        >
          Voir toutes les recettes
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredRecipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={favorites.includes(recipe.id)}
          onToggleFavorite={() => toggleFavorite(recipe.id)}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;
