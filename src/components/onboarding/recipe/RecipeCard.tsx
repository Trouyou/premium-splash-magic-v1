
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Recipe } from './types';
import { loadRecipeImage } from './utils/imageUtils';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  timeLabel: string;
  dietLabel: string;
  nutrientLabel: string;
  onToggleFavorite: () => void;
  defaultImage: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  isFavorite, 
  timeLabel,
  dietLabel,
  nutrientLabel,
  onToggleFavorite,
  defaultImage
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load image only when component mounts or recipe changes
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setIsImgLoaded(false);
    
    const getUniqueImage = async () => {
      try {
        // Get a guaranteed unique image for this recipe
        const uniqueImage = await loadRecipeImage(recipe);
        
        if (isMounted && uniqueImage) {
          setImgSrc(uniqueImage);
        }
      } catch (error) {
        console.error(`Error loading unique image for ${recipe.name}:`, error);
        if (isMounted) {
          setImgSrc(defaultImage);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    getUniqueImage();
    
    return () => {
      isMounted = false;
    };
  }, [recipe.id, defaultImage]);

  // Image event handlers
  const handleImageLoaded = () => {
    setIsImgLoaded(true);
    setIsLoading(false);
  };
  
  const handleImageError = () => {
    setIsImgLoaded(false);
    setIsLoading(false);
    setImgSrc(defaultImage);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 }
      }}
      whileHover={{ scale: isFavorite ? 1.03 : 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-lg overflow-hidden shadow-md cursor-pointer transition-all ${
        isFavorite ? 'ring-2 ring-[#D11B19]' : ''
      }`}
      onClick={onToggleFavorite}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {(isLoading || !isImgLoaded) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-gray-300 animate-spin" />
          </div>
        )}
        
        <img 
          src={imgSrc || defaultImage} 
          alt={recipe.name}
          onLoad={handleImageLoaded}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-all duration-300 ease-in-out ${
            isImgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: isHovering ? 'scale(1.1)' : 'scale(1)'
          }}
          loading="lazy"
        />
        
        {isFavorite && (
          <div className="absolute top-2 right-2 bg-[#D11B19] text-white px-2 py-1 rounded-full text-xs font-medium z-10">
            Favori ✓
          </div>
        )}
        
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-3 transition-opacity duration-300 ${
            isHovering ? 'opacity-100' : 'opacity-80'
          }`}
        >
          <h3 className="text-white font-medium text-lg mb-1 line-clamp-2">{recipe.name}</h3>
          
          {/* Display all ingredients */}
          <div className="flex flex-wrap gap-1 mb-2 max-h-24 overflow-y-auto">
            {recipe.mainIngredients.map((ingredient, index) => (
              <span 
                key={index} 
                className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full"
              >
                {ingredient}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-1 mt-auto">
            {timeLabel && (
              <span className="bg-white/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                {timeLabel}
              </span>
            )}
            {dietLabel && (
              <span className="bg-white/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                {dietLabel}
              </span>
            )}
            {nutrientLabel && (
              <span className="bg-white/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                {nutrientLabel}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-3 bg-white">
        <h3 className="font-medium text-[#2D3748] truncate">{recipe.name}</h3>
        <div className="flex flex-wrap gap-1 mt-1 text-xs text-gray-500">
          <span>{timeLabel}</span>
          {dietLabel && <span>• {dietLabel}</span>}
        </div>
        
        {/* Display all ingredients */}
        <div className="mt-2 flex flex-wrap gap-1 max-h-20 overflow-y-auto">
          {recipe.mainIngredients.map((ingredient, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              {ingredient}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
