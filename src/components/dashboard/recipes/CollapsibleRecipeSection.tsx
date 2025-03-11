
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import RecipeCard from '../RecipeCard';
import { Recipe } from '@/components/onboarding/recipe/types';
import { cn } from '@/lib/utils';

interface CollapsibleRecipeSectionProps {
  title: string;
  icon: React.ReactNode;
  recipes: Recipe[];
  isExpanded: boolean;
  toggleExpanded: () => void;
  favoriteRecipes: Recipe[];
  toggleFavorite: (recipeId: string) => void;
  iconColor?: string;
}

const CollapsibleRecipeSection: React.FC<CollapsibleRecipeSectionProps> = ({
  title,
  icon,
  recipes,
  isExpanded,
  toggleExpanded,
  favoriteRecipes,
  toggleFavorite,
  iconColor = "text-[#D11B19]"
}) => {
  return (
    <section className="pt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <button 
            className="mr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={toggleExpanded}
          >
            {isExpanded ? 
              <ChevronDown size={20} /> : 
              <ChevronRight size={20} />
            }
          </button>
          <h2 className="text-xl font-medium flex items-center font-playfair">
            <span className={cn("mr-2", iconColor)}>
              {icon}
            </span>
            {title}
          </h2>
        </div>
        <Button variant="link" className="text-[#D11B19] font-avantgarde">
          Voir tout
        </Button>
      </div>
      
      {isExpanded && (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          {recipes.map(recipe => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onFavoriteToggle={() => toggleFavorite(recipe.id)}
              isFavorite={favoriteRecipes.some(fav => fav.id === recipe.id)}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default CollapsibleRecipeSection;
