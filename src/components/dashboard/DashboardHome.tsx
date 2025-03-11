
import React, { useState, useEffect } from 'react';
import { Calendar, ChefHat, Clock, Sparkles, Star, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import RecipeCard from './RecipeCard';
import { Recipe } from '@/components/onboarding/recipe/types';
import { mockRecipes } from '@/components/onboarding/recipe/data/mockRecipes';
import WelcomeMessage from './WelcomeMessage';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'recommandations' | 'tendances'>('recommandations');
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);
  const [trendingRecipes, setTrendingRecipes] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [quickFilterTime, setQuickFilterTime] = useState<string | null>(null);

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

  return (
    <div className="space-y-6">
      {/* Message de bienvenue */}
      <WelcomeMessage userName={user?.firstName || "Gourmand"} />
      
      {/* Boutons de filtre rapide */}
      <section className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "font-medium",
            quickFilterTime === 'quick' && "bg-[#EDE6D6] text-[#D11B19] border-[#D11B19]"
          )}
          onClick={() => setQuickFilterTime(quickFilterTime === 'quick' ? null : 'quick')}
        >
          <Clock size={16} className="mr-1" />
          -15 min
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "font-medium",
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
            "font-medium",
            quickFilterTime === 'long' && "bg-[#EDE6D6] text-[#D11B19] border-[#D11B19]"
          )}
          onClick={() => setQuickFilterTime(quickFilterTime === 'long' ? null : 'long')}
        >
          <Clock size={16} className="mr-1" />
          +40 min
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="font-medium bg-[#EDE6D6] text-[#D11B19] border-[#D11B19]"
        >
          <ChefHat size={16} className="mr-1" />
          Je veux cuisiner...
        </Button>
      </section>
      
      {/* Tabs pour Recommandations/Tendances */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            className={cn(
              "py-2 border-b-2 font-medium text-sm transition-colors",
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
              "py-2 border-b-2 font-medium text-sm transition-colors",
              activeTab === 'tendances'
                ? "border-[#D11B19] text-[#D11B19]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
            onClick={() => setActiveTab('tendances')}
          >
            <Star size={18} className="inline-block mr-2" />
            Tendances
          </button>
        </div>
      </div>
      
      {/* Grille de recettes */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredRecipes().map(recipe => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onFavoriteToggle={() => toggleFavorite(recipe.id)}
              isFavorite={favoriteRecipes.some(fav => fav.id === recipe.id)}
            />
          ))}
          
          {getFilteredRecipes().length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              <p className="text-lg">Aucune recette ne correspond à vos filtres actuels.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setQuickFilterTime(null)}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Favoris */}
      {favoriteRecipes.length > 0 && (
        <section className="pt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium flex items-center">
              <Heart size={20} className="mr-2 text-[#D11B19]" />
              Vos favoris
            </h2>
            <Button variant="link" className="text-[#D11B19]">
              Voir tous
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoriteRecipes.slice(0, 4).map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onFavoriteToggle={() => toggleFavorite(recipe.id)}
                isFavorite={true}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DashboardHome;
