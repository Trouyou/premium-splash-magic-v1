
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Recipe } from '@/components/onboarding/recipe/types';
import { mockRecipes } from '@/components/onboarding/recipe/data/mockRecipes';
import { motion } from 'framer-motion';
import DashboardWidgets from './DashboardWidgets';
import DashboardHeader from './header/DashboardHeader';

interface DashboardHomeProps {
  setActiveView?: (view: string) => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ setActiveView }) => {
  const { user } = useAuth();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  
  // Simuler le chargement des recettes favorites
  useEffect(() => {
    const favorites = mockRecipes
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    setFavoriteRecipes(favorites);
  }, []);
  
  const toggleFavorite = (recipeId: string) => {
    setFavoriteRecipes(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(r => r.id === recipeId);
      if (isAlreadyFavorite) {
        return prevFavorites.filter(r => r.id !== recipeId);
      } else {
        const recipeToAdd = mockRecipes.find(r => r.id === recipeId);
        if (recipeToAdd) {
          return [...prevFavorites, recipeToAdd];
        }
        return prevFavorites;
      }
    });
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <DashboardHeader />
      
      <DashboardWidgets 
        favoriteRecipes={favoriteRecipes} 
        toggleFavorite={toggleFavorite}
        setActiveView={setActiveView}
      />
    </motion.div>
  );
};

export default DashboardHome;
