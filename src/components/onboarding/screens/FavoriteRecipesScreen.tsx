
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProgressBar from '../ProgressBar';
import NavigationButtons from '../NavigationButtons';
import { toast } from "sonner";
import { Loader2 } from 'lucide-react';

interface Recipe {
  id: string;
  name: string;
  image: string;
  mainIngredients: string[];
}

interface FavoriteRecipesScreenProps {
  currentStep: number;
  totalSteps: number;
  favoriteRecipes: string[];
  toggleFavoriteRecipe: (recipeId: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

// Mock recipes data
const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Salade niçoise',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Thon', 'Œufs', 'Tomates', 'Olives']
  },
  {
    id: '2',
    name: 'Poulet rôti aux herbes',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Poulet', 'Romarin', 'Thym', 'Ail']
  },
  {
    id: '3',
    name: 'Risotto aux champignons',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Riz arborio', 'Champignons', 'Parmesan', 'Oignon']
  },
  {
    id: '4',
    name: 'Saumon grillé',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Saumon', 'Citron', 'Aneth', 'Huile d\'olive']
  },
  {
    id: '5',
    name: 'Pâtes à la carbonara',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Pâtes', 'Œufs', 'Pancetta', 'Parmesan']
  },
  {
    id: '6',
    name: 'Ratatouille provençale',
    image: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Aubergine', 'Courgette', 'Poivron', 'Tomate']
  },
  {
    id: '7',
    name: 'Buddha bowl au quinoa',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Quinoa', 'Avocat', 'Pois chiches', 'Légumes de saison']
  },
  {
    id: '8',
    name: 'Curry de légumes',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Lait de coco', 'Curry', 'Légumes variés', 'Riz basmati']
  },
  {
    id: '9',
    name: 'Quiche lorraine',
    image: 'https://images.unsplash.com/photo-1591985666643-9b27a0cdbc0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Pâte brisée', 'Œufs', 'Crème', 'Lardons']
  },
];

const FavoriteRecipesScreen: React.FC<FavoriteRecipesScreenProps> = ({
  currentStep,
  totalSteps,
  favoriteRecipes,
  toggleFavoriteRecipe,
  onNext,
  onPrev,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // Simulating API loading
    const timer = setTimeout(() => {
      setRecipes(mockRecipes);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (favoriteRecipes.length === 0) {
      toast("Ajoutez au moins une recette pour personnaliser votre expérience.", {
        position: "top-center",
      });
      return;
    }
    onNext();
  };

  const toggleFilter = () => {
    setShowOnlyFavorites(!showOnlyFavorites);
  };

  const getDisplayedRecipes = () => {
    if (showOnlyFavorites) {
      return recipes.filter(recipe => favoriteRecipes.includes(recipe.id));
    }
    return recipes;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-black mb-2">
          Vos recettes favorites 🍽️
        </h2>
        <p className="font-['AvantGarde_Bk_BT'] text-[#4A5568] mb-4">
          Sélectionnez les plats qui vous font envie pour personnaliser vos recommandations.
        </p>
        
        <button
          onClick={toggleFilter}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors mb-6 ${
            showOnlyFavorites 
              ? 'bg-[#D11B19] text-white' 
              : 'bg-[#EDE6D6] text-[#4A5568] hover:bg-[#F5F3E7]'
          }`}
        >
          {showOnlyFavorites ? 'Voir toutes les recettes' : 'Voir ma sélection'}
        </button>
      </motion.div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <Loader2 className="h-10 w-10 text-[#D11B19] animate-spin mb-4" />
          <p className="text-[#4A5568]">Chargement des recettes...</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {getDisplayedRecipes().map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={favoriteRecipes.includes(recipe.id)}
              onToggleFavorite={() => toggleFavoriteRecipe(recipe.id)}
            />
          ))}

          {showOnlyFavorites && favoriteRecipes.length === 0 && (
            <div className="col-span-full text-center py-8">
              <p className="text-[#4A5568]">Vous n'avez pas encore sélectionné de recettes favorites.</p>
            </div>
          )}
        </motion.div>
      )}
      
      <NavigationButtons
        onNext={handleNext}
        onPrev={onPrev}
        isFirstStep={false}
        isLastStep={false}
        nextLabel="Continuer"
        nextDisabled={isLoading}
      />
    </div>
  );
};

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isFavorite, onToggleFavorite }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 }
      }}
      whileHover={{ scale: isFavorite ? 1.03 : 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-lg overflow-hidden shadow-md cursor-pointer ${
        isFavorite ? 'ring-2 ring-[#D11B19]' : ''
      }`}
      onClick={onToggleFavorite}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.name}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
          style={{
            transform: isHovering ? 'scale(1.1)' : 'scale(1)'
          }}
        />
        
        {isFavorite && (
          <div className="absolute top-2 right-2 bg-[#D11B19] text-white px-2 py-1 rounded-full text-xs font-medium">
            Favori ✓
          </div>
        )}
        
        <div 
          className={`absolute inset-0 bg-black/50 flex flex-col justify-end p-3 transition-opacity duration-300 ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h3 className="text-white font-medium text-lg mb-1">{recipe.name}</h3>
          <div className="flex flex-wrap gap-1">
            {recipe.mainIngredients.map((ingredient, index) => (
              <span 
                key={index} 
                className="bg-white/20 text-white text-xs px-2 py-1 rounded-full"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-3 bg-white">
        <h3 className="font-medium text-[#2D3748]">{recipe.name}</h3>
      </div>
    </motion.div>
  );
};

export default FavoriteRecipesScreen;
