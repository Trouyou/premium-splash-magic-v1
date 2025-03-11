
import React from 'react';
import { Flame } from 'lucide-react';
import { Widget } from './Widget';
import { Recipe } from '@/components/onboarding/recipe/types';
import RecipeCard from '../RecipeCard';

interface TrendingWidgetProps {
  id: string;
  recipes: Recipe[];
  onFavoriteToggle: (recipeId: string) => void;
  favoriteRecipes: Recipe[];
  onRemove?: (id: string) => void;
}

const TrendingWidget: React.FC<TrendingWidgetProps> = ({ 
  id, 
  recipes, 
  favoriteRecipes, 
  onFavoriteToggle,
  onRemove
}) => {
  return (
    <Widget id={id} title="Tendances actuelles" onRemove={onRemove}>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Flame size={16} className="text-orange-500" />
          <span>Les plats les plus populaires en ce moment</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recipes.slice(0, 2).map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onToggleFavorite={() => onFavoriteToggle(recipe.id)}
              isFavorite={favoriteRecipes.some(fav => fav.id === recipe.id)}
            />
          ))}
        </div>
      </div>
    </Widget>
  );
};

export default TrendingWidget;
