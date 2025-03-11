
import React, { useState, useEffect } from 'react';
import { Zap, Heart, Sparkle, Flame, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useOnboarding } from '@/context/OnboardingContext';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '@/components/onboarding/recipe/types';
import { mockRecipes } from '@/components/onboarding/recipe/data/mockRecipes';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import RecipeGrid from './recipes/RecipeGrid';
import CollapsibleRecipeSection from './recipes/CollapsibleRecipeSection';
import { motion } from 'framer-motion';
import { filterByDietaryPreferences, filterByTime, filterByEquipment } from '@/components/onboarding/recipe/hooks/useRecipeFiltering/filterHelpers';

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

// New component for empty state with option to modify preferences
const EmptyRecipeState: React.FC<{ navigateToOnboarding: () => void }> = ({ navigateToOnboarding }) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-12 text-center text-gray-500"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-lg font-avantgarde mb-4">
        Oups ! Aucune tendance ne correspond à vos choix. Essayez d'élargir vos préférences ou de les modifier.
      </p>
      <Button 
        variant="outline" 
        className="mt-2 font-avantgarde"
        onClick={navigateToOnboarding}
      >
        <Settings size={16} className="mr-2" />
        Modifier mes choix
      </Button>
    </motion.div>
  );
};

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const { onboardingData } = useOnboarding();
  const [activeTab, setActiveTab] = useState<'inspirations' | 'tendances'>('inspirations');
  const [inspirationRecipes, setInspirationRecipes] = useState<Recipe[]>([]);
  const [trendingRecipes, setTrendingRecipes] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [quickRecipes, setQuickRecipes] = useState<Recipe[]>([]);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    'favorites': true,
    'quick': true
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  // Simuler le chargement des recettes
  useEffect(() => {
    // Pour cet exemple, nous allons utiliser les données mockées
    // Dans une vraie app, vous feriez un appel API ici
    
    // Recettes inspiration
    const inspirations = mockRecipes
      .sort(() => 0.5 - Math.random()) // Mélange aléatoire
      .slice(0, 8);
    setInspirationRecipes(inspirations);
    
    // Recettes tendance basées sur les préférences d'onboarding
    let trending = [...mockRecipes];
    
    // Appliquer les filtres selon les préférences d'onboarding
    if (onboardingData) {
      trending = filterByDietaryPreferences(trending, onboardingData.dietaryPreferences);
      trending = filterByTime(trending, onboardingData.cookingTime);
      trending = filterByEquipment(trending, onboardingData.kitchenEquipment);
    }
    
    // Si après filtrage il reste des recettes, les afficher
    // Sinon, afficher des recettes aléatoires pour éviter une page vide
    if (trending.length === 0) {
      trending = mockRecipes.sort(() => 0.5 - Math.random()).slice(0, 8);
    } else {
      trending = trending.sort(() => 0.5 - Math.random()).slice(0, 8);
    }
    
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
  }, [onboardingData]);

  // Obtenir les recettes selon l'onglet actif
  const getActiveTabRecipes = () => {
    return activeTab === 'inspirations' ? inspirationRecipes : trendingRecipes;
  };

  const toggleFavorite = (recipeId: string) => {
    // Simuler l'ajout/suppression des favoris
    // Dans une vraie app, vous feriez un appel API ici
    console.log('Toggle favorite for recipe:', recipeId);
    
    toast({
      title: "Favori modifié",
      description: "Votre liste de favoris a été mise à jour.",
    });
  };
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const navigateToOnboarding = () => {
    navigate('/onboarding');
    toast({
      title: "Modification des préférences",
      description: "Vous allez pouvoir ajuster vos préférences alimentaires.",
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
          Découvrez de nouvelles inspirations et les tendances du jour !
        </motion.p>
      </motion.div>
      
      {/* Tabs pour Inspirations/Tendances */}
      <RecipeTabNavigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      {/* Grille de recettes ou message d'absence de recettes */}
      {getActiveTabRecipes().length > 0 ? (
        <RecipeGrid 
          recipes={getActiveTabRecipes()} 
          favoriteRecipes={favoriteRecipes}
          toggleFavorite={toggleFavorite}
        />
      ) : (
        <EmptyRecipeState navigateToOnboarding={navigateToOnboarding} />
      )}
      
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
