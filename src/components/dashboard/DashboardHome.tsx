
import React, { useState, useEffect } from 'react';
import { Zap, Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Recipe } from '@/components/onboarding/recipe/types';
import { mockRecipes } from '@/components/onboarding/recipe/data/mockRecipes';
import WelcomeMessage from './WelcomeMessage';
import FilterButtons from './filters/FilterButtons';
import TabNavigation from './navigation/TabNavigation';
import RecipeGrid from './recipes/RecipeGrid';
import CollapsibleRecipeSection from './recipes/CollapsibleRecipeSection';
import { motion } from 'framer-motion';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'recommandations' | 'tendances'>('recommandations');
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);
  const [trendingRecipes, setTrendingRecipes] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [quickRecipes, setQuickRecipes] = useState<Recipe[]>([]);
  const [quickFilterTime, setQuickFilterTime] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    'favorites': true,
    'quick': true
  });

  // Simuler le chargement des recettes
  useEffect(() => {
    // Pour cet exemple, nous allons utiliser les données mockées
    // Dans une vraie app, vous feriez un appel API ici
    
    // Recettes recommandées (filtrer selon préférences utilisateur)
    const recommended = mockRecipes
      .sort(() => 0.5 - Math.random()) // Mélange aléatoire
      .slice(0, 8);
    setRecommendedRecipes(recommended);
    
    // Recettes tendance
    const trending = mockRecipes
      .sort(() => 0.5 - Math.random()) // Différent tri aléatoire
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

  // Filtrer les recettes par temps de cuisson
  const getFilteredRecipes = () => {
    if (!quickFilterTime) return activeTab === 'recommandations' ? recommendedRecipes : trendingRecipes;
    
    const recipes = activeTab === 'recommandations' ? recommendedRecipes : trendingRecipes;
    
    return recipes.filter(recipe => {
      if (quickFilterTime === 'quick') {
        return recipe.cookingTime <= 15;
      } else if (quickFilterTime === 'medium') {
        return recipe.cookingTime > 15 && recipe.cookingTime <= 40;
      } else if (quickFilterTime === 'long') {
        return recipe.cookingTime > 40;
      }
      return true;
    });
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

  const resetFilters = () => {
    setQuickFilterTime(null);
  };

  return (
    <div className="space-y-8">
      {/* Message de bienvenue */}
      <WelcomeMessage userName={user?.firstName || "Gourmand"} />
      
      {/* Boutons de filtre rapide */}
      <FilterButtons 
        quickFilterTime={quickFilterTime} 
        setQuickFilterTime={setQuickFilterTime} 
      />
      
      {/* Tabs pour Recommandations/Tendances */}
      <TabNavigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      {/* Grille de recettes */}
      <RecipeGrid 
        recipes={getFilteredRecipes()} 
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
