
import React from 'react';
import { Heart } from 'lucide-react';
import { Widget } from './Widget';
import { Recipe } from '@/components/onboarding/recipe/types';
import RecipeCard from '../RecipeCard';

interface FavoriteRecipesWidgetProps {
  id: string;
  recipes: Recipe[];
  onFavoriteToggle: (recipeId: string) => void;
  favoriteRecipes: Recipe[];
  onRemove?: (id: string) => void;
}

const FavoriteRecipesWidget: React.FC<FavoriteRecipesWidgetProps> = ({ 
  id, 
  recipes, 
  favoriteRecipes, 
  onFavoriteToggle,
  onRemove
}) => {
  return (
    <Widget id={id} title="Mes recettes enregistrées" onRemove={onRemove}>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Heart size={16} className="text-[#D11B19]" />
          <span>Vos recettes préférées à portée de main</span>
        </div>
        
        {favoriteRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favoriteRecipes.slice(0, 2).map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onFavoriteToggle={() => onFavoriteToggle(recipe.id)}
                isFavorite={true}
                compact={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            <Heart size={24} className="text-gray-300 mx-auto mb-2" />
            <p className="text-sm">Vous n'avez pas encore de recettes favorites</p>
            <p className="text-xs mt-1">Ajoutez des recettes à vos favoris pour les retrouver ici</p>
          </div>
        )}
        
        <div className="pt-2">
          <a href="#" className="text-[#D11B19] text-sm font-medium hover:underline">
            Voir toutes mes recettes
          </a>
        </div>
      </div>
    </Widget>
  );
};

export default FavoriteRecipesWidget;
