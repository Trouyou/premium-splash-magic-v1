
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Recipe } from '@/components/onboarding/recipe/types';
import { mockRecipes } from '@/components/onboarding/recipe/data/mockRecipes';
import { motion } from 'framer-motion';
import DashboardWidgets from './DashboardWidgets';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  
  // Simuler le chargement des recettes favorites
  useEffect(() => {
    // Dans une vraie app, vous feriez un appel API ici
    const favorites = mockRecipes
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    setFavoriteRecipes(favorites);
  }, []);
  
  const toggleFavorite = (recipeId: string) => {
    // Simuler l'ajout/suppression des favoris
    // Dans une vraie app, vous feriez un appel API ici
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
    <div className="space-y-6">
      {/* Message de bienvenue */}
      <motion.div 
        className="text-center mb-8 pt-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-2xl md:text-3xl font-bold font-playfair mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Bonjour, <span className="text-[#D11B19]">{user?.firstName || "Gourmand"}</span> 👋
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 font-avantgarde"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Personnalisez votre tableau de bord selon vos besoins
        </motion.p>
      </motion.div>
      
      {/* Widgets customisables */}
      <DashboardWidgets 
        favoriteRecipes={favoriteRecipes} 
        toggleFavorite={toggleFavorite} 
      />
    </div>
  );
};

export default DashboardHome;
