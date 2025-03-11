
import React, { useState, useEffect } from 'react';
import { Zap, Heart, Sparkle, Flame } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Recipe } from '@/components/onboarding/recipe/types';
import { mockRecipes } from '@/components/onboarding/recipe/data/mockRecipes';
import WelcomeMessage from './WelcomeMessage';
import RecipeGrid from './recipes/RecipeGrid';
import CollapsibleRecipeSection from './recipes/CollapsibleRecipeSection';
import { motion } from 'framer-motion';

// Custom TabNavigation just for recipe tabs (not the main app tabs)
const RecipeTabNavigation: React.FC<{
  activeTab: 'inspirations' | 'tendances';
  setActiveTab: (tab: 'inspirations' | 'tendances') => void;
}> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center border-b border-gray-200 mb-6">
      <button
        className={`px-6 py-2 font-avantgarde text-sm ${
          activeTab === 'inspirations' ? 'text-[#D11B19] border-b-2 border-[#D11B19]' : 'text-gray-600'
        }`}
        onClick={() => setActiveTab('inspirations')}
      >
        <span className="flex items-center">
          <Sparkle size={16} className="mr-1.5" />
          Inspirations du jour
        </span>
      </button>
      <button
        className={`px-6 py-2 font-avantgarde text-sm ${
          activeTab === 'tendances' ? 'text-[#D11B19] border-b-2 border-[#D11B19]' : 'text-gray-600'
        }`}
        onClick={() => setActiveTab('tendances')}
      >
        <span className="flex items-center">
          <Flame size={16} className="mr-1.5" />
          Tendances actuelles
        </span>
      </button>
    </div>
  );
};

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'inspirations' | 'tendances'>('inspirations');
  const [inspirationRecipes, setInspirationRecipes] = useState<Recipe[]>([]);
  const [trendingRecipes, setTrendingRecipes] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [quickRecipes, setQuickRecipes] = useState<Recipe[]>([]);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    'favorites': true,
    'quick': true
  });

  // Simuler le chargement des recettes
  useEffect(() => {
    // Pour cet exemple, nous allons utiliser les données mockées
    // Dans une vraie app, vous feriez un appel API ici
    
    // Recettes inspiration
    const inspirations = mockRecipes
      .sort(() => 0.5 - Math.random()) // Mélange aléatoire
      .slice(0, 8);
    setInspirationRecipes(inspirations);
    
    // Recettes tendance
    // Plutôt que d'utiliser likes qui n'existe pas, nous allons sélectionner 
    // aléatoirement quelques recettes pour simuler les tendances
    const trending = mockRecipes
      .sort(() => 0.5 - Math.random()) // Mélange aléatoire 
      .slice(0, 8);
    setTrendingRecipes(trending);
    
    // Favoris (simuler quelques favoris)
    const favorites = mockRecipes
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    setFavoriteRecipes(favorites);
    
    // Recettes rapides
    const quick = mockRecipes
      .filter(recipe => recipe.cookingTime <= 30)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    setQuickRecipes(quick);
  }, []);

  // Obtenir les recettes selon l'onglet actif
  const getActiveTabRecipes = () => {
    return activeTab === 'inspirations' ? inspirationRecipes : trendingRecipes;
  };

  const toggleFavorite = (recipeId: string) => {
    // Simuler l'ajout/suppression des favoris
    // Dans une vraie app, vous feriez un appel API ici
    console.log('Toggle favorite for recipe:', recipeId);
  };
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
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
          Découvrez de nouvelles inspirations et les tendances du jour !
        </motion.p>
      </motion.div>
      
      {/* Tabs pour Inspirations/Tendances */}
      <RecipeTabNavigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      {/* Grille de recettes */}
      <RecipeGrid 
        recipes={getActiveTabRecipes()} 
        favoriteRecipes={favoriteRecipes}
        toggleFavorite={toggleFavorite}
      />
      
      {/* Recettes rapides */}
      {quickRecipes.length > 0 && (
        <CollapsibleRecipeSection
          title="Recettes Express"
          icon={<Zap size={20} />}
          recipes={quickRecipes}
          isExpanded={expandedSections['quick']}
          toggleExpanded={() => toggleSection('quick')}
          favoriteRecipes={favoriteRecipes}
          toggleFavorite={toggleFavorite}
        />
      )}
      
      {/* Favoris */}
      {favoriteRecipes.length > 0 && (
        <CollapsibleRecipeSection
          title="Vos favoris"
          icon={<Heart size={20} />}
          recipes={favoriteRecipes.slice(0, 4)}
          isExpanded={expandedSections['favorites']}
          toggleExpanded={() => toggleSection('favorites')}
          favoriteRecipes={favoriteRecipes}
          toggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
};

export default DashboardHome;
