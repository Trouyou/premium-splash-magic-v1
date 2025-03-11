
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import RecipeCard from '../RecipeCard';
import { Recipe } from '@/components/onboarding/recipe/types';

interface RecipeGridProps {
  recipes: Recipe[];
  favoriteRecipes: Recipe[];
  toggleFavorite: (recipeId: string) => void;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ 
  recipes, 
  favoriteRecipes, 
  toggleFavorite 
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map(recipe => (
          <motion.div key={recipe.id} variants={item}>
            <RecipeCard 
              recipe={recipe} 
              onFavoriteToggle={() => toggleFavorite(recipe.id)}
              isFavorite={favoriteRecipes.some(fav => fav.id === recipe.id)}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RecipeGrid;
