
import React, { useState, useEffect } from 'react';
import { Calendar, ChefHat, Clock, Sparkles, Star, Heart, Flame, Zap, Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import RecipeCard from './RecipeCard';
import { Recipe } from '@/components/onboarding/recipe/types';
import { mockRecipes } from '@/components/onboarding/recipe/data/mockRecipes';
import WelcomeMessage from './WelcomeMessage';
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      {/* Message de bienvenue */}
      <WelcomeMessage userName={user?.firstName || "Gourmand"} />
      
      {/* Boutons de filtre rapide */}
      <motion.section 
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "font-medium font-avantgarde",
            quickFilterTime === 'quick' && "bg-[#EDE6D6] text-[#D11B19] border-[#D11B19]"
          )}
          onClick={() => setQuickFilterTime(quickFilterTime === 'quick' ? null : 'quick')}
        >
          <Zap size={16} className="mr-1" />
          -15 min
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "font-medium font-avantgarde",
            quickFilterTime === 'medium' && "bg-[#EDE6D6] text-[#D11B19] border-[#D11B19]"
          )}
          onClick={() => setQuickFilterTime(quickFilterTime === 'medium' ? null : 'medium')}
        >
          <Clock size={16} className="mr-1" />
          15-40 min
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "font-medium font-avantgarde",
            quickFilterTime === 'long' && "bg-[#EDE6D6] text-[#D11B19] border-[#D11B19]"
          )}
          onClick={() => setQuickFilterTime(quickFilterTime === 'long' ? null : 'long')}
        >
          <Coffee size={16} className="mr-1" />
          +40 min
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="font-medium font-avantgarde bg-[#EDE6D6] text-[#D11B19] border-[#D11B19]"
        >
          <ChefHat size={16} className="mr-1" />
          Je veux cuisiner...
        </Button>
      </motion.section>
      
      {/* Tabs pour Recommandations/Tendances */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            className={cn(
              "py-2 border-b-2 font-medium text-sm transition-colors font-avantgarde",
              activeTab === 'recommandations'
                ? "border-[#D11B19] text-[#D11B19]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
            onClick={() => setActiveTab('recommandations')}
          >
            <Sparkles size={18} className="inline-block mr-2" />
            Recommandations
          </button>
          <button
            className={cn(
              "py-2 border-b-2 font-medium text-sm transition-colors font-avantgarde",
              activeTab === 'tendances'
                ? "border-[#D11B19] text-[#D11B19]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
            onClick={() => setActiveTab('tendances')}
          >
            <Flame size={18} className="inline-block mr-2" />
            Tendances
          </button>
        </div>
      </div>
      
      {/* Grille de recettes */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredRecipes().map(recipe => (
            <motion.div key={recipe.id} variants={item}>
              <RecipeCard 
                recipe={recipe} 
                onFavoriteToggle={() => toggleFavorite(recipe.id)}
                isFavorite={favoriteRecipes.some(fav => fav.id === recipe.id)}
              />
            </motion.div>
          ))}
          
          {getFilteredRecipes().length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              <p className="text-lg font-avantgarde">Aucune recette ne correspond à vos filtres actuels.</p>
              <Button 
                variant="outline" 
                className="mt-4 font-avantgarde"
                onClick={() => setQuickFilterTime(null)}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </motion.section>
      
      {/* Recettes rapides */}
      {quickRecipes.length > 0 && (
        <section className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <button 
                className="mr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => toggleSection('quick')}
              >
                {expandedSections['quick'] ? 
                  <ChevronDown size={20} /> : 
                  <ChevronRight size={20} />
                }
              </button>
              <h2 className="text-xl font-medium flex items-center font-playfair">
                <Zap size={20} className="mr-2 text-[#D11B19]" />
                Recettes Express
              </h2>
            </div>
            <Button variant="link" className="text-[#D11B19] font-avantgarde">
              Voir tout
            </Button>
          </div>
          
          {expandedSections['quick'] && (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              {quickRecipes.map(recipe => (
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
      )}
      
      {/* Favoris */}
      {favoriteRecipes.length > 0 && (
        <section className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <button 
                className="mr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => toggleSection('favorites')}
              >
                {expandedSections['favorites'] ? 
                  <ChevronDown size={20} /> : 
                  <ChevronRight size={20} />
                }
              </button>
              <h2 className="text-xl font-medium flex items-center font-playfair">
                <Heart size={20} className="mr-2 text-[#D11B19]" />
                Vos favoris
              </h2>
            </div>
            <Button variant="link" className="text-[#D11B19] font-avantgarde">
              Voir tout
            </Button>
          </div>
          
          {expandedSections['favorites'] && (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              {favoriteRecipes.slice(0, 4).map(recipe => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onFavoriteToggle={() => toggleFavorite(recipe.id)}
                  isFavorite={true}
                />
              ))}
            </motion.div>
          )}
        </section>
      )}
    </div>
  );
};

export default DashboardHome;

// Add missing imports
import { ChevronDown, ChevronRight } from 'lucide-react';
