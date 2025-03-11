
import React, { useState } from 'react';
import { Clock, Heart, User, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Recipe } from '@/components/onboarding/recipe/types';
import OptimizedImage from '@/components/onboarding/recipe/components/OptimizedImage';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
  onFavoriteToggle: () => void;
  isFavorite: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onFavoriteToggle, isFavorite }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  
  const {
    name,
    image,
    cookingTime,
    mainIngredients,
    calories,
    dietaryOptions,
    categories
  } = recipe;

  // Format cooking time to be human-readable
  const formatCookingTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours}h ${remainingMinutes}min` 
      : `${hours}h`;
  };

  // Limit to first 3 ingredients
  const displayIngredients = mainIngredients.slice(0, 3);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  return (
    <motion.div 
      className="h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 h-full flex flex-col hover:shadow-md">
        {/* Image with overlay of favorites */}
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <Loader2 className="h-8 w-8 text-gray-300 animate-spin" />
            </div>
          )}
          
          <OptimizedImage
            src={image}
            alt={name}
            className={cn(
              "w-full h-40 object-cover transition-opacity duration-300",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            fallbackSrc="/placeholder.svg"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onFavoriteToggle();
            }}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <Heart 
              size={18} 
              className={cn(
                "transition-all",
                isFavorite ? "fill-[#D11B19] text-[#D11B19]" : "text-gray-400",
                isHovered && !isFavorite ? "text-[#D11B19]" : ""
              )} 
            />
          </motion.button>

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
        <div className="p-4 flex flex-col flex-grow">
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
          <div className="mt-2 text-sm text-gray-600 flex-grow">
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
    </motion.div>
  );
};

export default RecipeCard;
