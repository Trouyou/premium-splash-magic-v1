
import React from 'react';
import { Clock, Heart, User } from 'lucide-react';
import { Recipe } from '@/components/onboarding/recipe/types';
import OptimizedImage from '@/components/onboarding/recipe/components/OptimizedImage';
import { formatCookingTime } from '@/components/onboarding/recipe/utils/formatters';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
  onFavoriteToggle: () => void;
  isFavorite: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onFavoriteToggle, isFavorite }) => {
  const {
    name,
    image,
    cookingTime,
    mainIngredients,
    calories,
    dietaryOptions,
    categories
  } = recipe;

  // Limiter aux 3 premiers ingrédients
  const displayIngredients = mainIngredients.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
      {/* Image avec overlay de favoris */}
      <div className="relative">
        <OptimizedImage
          src={image}
          alt={name}
          className="w-full h-40 object-cover"
          fallbackSrc="/placeholder.svg"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onFavoriteToggle();
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors"
        >
          <Heart 
            size={18} 
            className={cn(
              "transition-colors",
              isFavorite ? "fill-[#D11B19] text-[#D11B19]" : "text-gray-400"
            )} 
          />
        </button>

        {/* Affichage des tags catégories */}
        {categories?.[0] && (
          <div className="absolute bottom-2 left-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/90 text-gray-800">
              {categories[0]}
            </span>
          </div>
        )}
      </div>

      {/* Contenu texte */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{name}</h3>
        
        {/* Infos */}
        <div className="flex items-center text-sm text-gray-500 space-x-4 mb-2">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{formatCookingTime(cookingTime)}</span>
          </div>
          
          {calories && (
            <div className="flex items-center">
              <User size={14} className="mr-1" />
              <span>{calories} kcal</span>
            </div>
          )}
        </div>
        
        {/* Ingrédients */}
        <div className="mt-2 text-sm text-gray-600">
          <p className="line-clamp-2">
            {displayIngredients.join(', ')}
            {mainIngredients.length > 3 && '...'}
          </p>
        </div>
        
        {/* Tags régime alimentaire */}
        {dietaryOptions && dietaryOptions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {dietaryOptions.slice(0, 3).map((option) => (
              <span 
                key={option} 
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#EDE6D6] text-[#D11B19]"
              >
                {option}
              </span>
            ))}
            {dietaryOptions.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                +{dietaryOptions.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
