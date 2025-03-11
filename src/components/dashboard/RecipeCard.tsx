
import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Recipe } from '@/components/onboarding/recipe/types';
import OptimizedImage from '../onboarding/recipe/components/OptimizedImage';
import { formatMinutes, formatDifficulty } from '@/components/onboarding/recipe/utils/formatters';

interface RecipeCardProps {
  recipe: Recipe;
  onFavoriteToggle: () => void;
  isFavorite: boolean;
  compact?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  onFavoriteToggle, 
  isFavorite,
  compact = false
}) => {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100", 
      compact ? "flex flex-row h-24" : "flex flex-col")
    }>
      <div className={cn(
        "relative overflow-hidden",
        compact ? "w-24 h-full flex-shrink-0" : "w-full h-32"
      )}>
        <OptimizedImage 
          src={recipe.image} 
          alt={recipe.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          fallbackSrc="/placeholder.svg"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onFavoriteToggle();
          }}
          className={cn(
            "absolute top-2 right-2 p-1.5 rounded-full transition-colors",
            isFavorite ? "bg-[#D11B19] text-white" : "bg-white/80 text-gray-600 hover:bg-white"
          )}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart size={16} className={isFavorite ? "fill-white" : ""} />
        </button>
      </div>
      
      <div className={cn(
        "p-3",
        compact ? "flex-grow overflow-hidden" : ""
      )}>
        <h3 className={cn(
          "font-medium",
          compact ? "text-sm line-clamp-1" : "text-base font-playfair mb-1"
        )}>
          {recipe.name}
        </h3>
        
        {!compact && (
          <p className="text-gray-500 text-sm line-clamp-2 mb-2">
            {recipe.description}
          </p>
        )}
        
        <div className={cn(
          "flex gap-2 text-xs text-gray-500",
          compact ? "mt-1" : "mt-2"
        )}>
          {!compact && (
            <span className="bg-gray-100 px-2 py-0.5 rounded">
              {formatDifficulty(recipe.difficulty)}
            </span>
          )}
          <span className="bg-gray-100 px-2 py-0.5 rounded">
            {formatMinutes(recipe.cookingTime)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
