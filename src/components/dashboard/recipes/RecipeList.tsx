
import React from 'react';
import RecipeCard from '@/components/onboarding/recipe/RecipeCard';
import { Recipe } from '@/components/onboarding/recipe/types';

interface RecipeListProps {
  recipes: Recipe[];
  favoriteRecipeIds: string[];
  toggleFavorite: (recipeId: string) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ 
  recipes, 
  favoriteRecipeIds, 
  toggleFavorite 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={favoriteRecipeIds.includes(recipe.id)}
          onToggleFavorite={() => toggleFavorite(recipe.id)}
          showDetails={true}
        />
      ))}
    </div>
  );
};

export default RecipeList;
