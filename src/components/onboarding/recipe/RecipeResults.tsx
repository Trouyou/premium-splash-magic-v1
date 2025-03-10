
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, ChevronDown } from 'lucide-react';
import { Recipe } from './types';
import RecipeCard from './RecipeCard';
import { Button } from "@/components/ui/button";
import { getDietLabel, getTimeLabel, getNutrientLabel, DEFAULT_IMAGE } from './recipeUtils';

interface RecipeResultsProps {
  isLoading: boolean;
  filteredRecipes: Recipe[];
  visibleRecipes: Recipe[];
  favoriteRecipes: string[];
  toggleFavoriteRecipe: (recipeId: string) => void;
  imagesLoaded: Record<string, boolean>;
  handleReset: () => void;
  handleLoadMore: () => void;
}

const RecipeResults: React.FC<RecipeResultsProps> = ({
  isLoading,
  filteredRecipes,
  visibleRecipes,
  favoriteRecipes,
  toggleFavoriteRecipe,
  imagesLoaded,
  handleReset,
  handleLoadMore
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Loader2 className="h-10 w-10 text-[#D11B19] animate-spin mb-4" />
        <p className="text-[#4A5568]">Chargement des recettes...</p>
      </div>
    );
  }

  if (filteredRecipes.length === 0) {
    return (
      <div className="bg-[#F5F3E7] rounded-lg p-8 text-center">
        <p className="text-[#4A5568] mb-4">Aucune recette ne correspond à vos critères.</p>
        <Button onClick={handleReset} className="bg-[#D11B19] text-white hover:bg-[#B01815]">
          Réinitialiser les filtres
        </Button>
      </div>
    );
  }

  return (
    <>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
      >
        {visibleRecipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.3 }}
            layout
          >
            <RecipeCard
              recipe={recipe}
              isFavorite={favoriteRecipes.includes(recipe.id)}
              timeLabel={getTimeLabel(recipe.cookingTime)}
              dietLabel={getDietLabel(recipe.dietaryOptions)}
              nutrientLabel={getNutrientLabel(recipe)}
              onToggleFavorite={() => toggleFavoriteRecipe(recipe.id)}
              imageLoaded={imagesLoaded[recipe.id]}
              defaultImage={DEFAULT_IMAGE}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {visibleRecipes.length < filteredRecipes.length && (
        <div className="flex justify-center mb-8">
          <Button 
            onClick={handleLoadMore}
            variant="outline"
            className="border-[#D11B19] text-[#D11B19] hover:bg-[#D11B19]/10"
          >
            Voir plus de recettes
            <ChevronDown size={16} className="ml-1" />
          </Button>
        </div>
      )}
    </>
  );
};

export default RecipeResults;
