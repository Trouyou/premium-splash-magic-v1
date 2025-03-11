
import React from 'react';
import { Button } from '@/components/ui/button';
import { RecipeFilterOptions } from '@/components/onboarding/recipe/types';

interface NoRecipesFoundProps {
  resetFilters: () => void;
}

const NoRecipesFound: React.FC<NoRecipesFoundProps> = ({ resetFilters }) => {
  return (
    <div className="text-center py-12">
      <p className="text-[#4A5568] font-medium mb-4">Aucune recette ne correspond à vos critères.</p>
      <Button 
        onClick={resetFilters}
        variant="outline"
        className="border-[#D11B19] text-[#D11B19] hover:bg-[#D11B19] hover:text-white"
      >
        Réinitialiser les filtres
      </Button>
    </div>
  );
};

export default NoRecipesFound;
