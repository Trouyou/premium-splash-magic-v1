
import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, Droplet, Thermometer, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RecipeCard } from '@/components/onboarding/recipe/RecipeCard';
import { mockRecipes } from '@/components/onboarding/recipe/data/mockRecipes';

const HomeTab = () => {
  // Get time of day
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { greeting: 'Bonjour', mealSuggestion: 'petit-déjeuner' };
    if (hour < 14) return { greeting: 'Bon appétit', mealSuggestion: 'déjeuner' };
    if (hour < 18) return { greeting: 'Bon après-midi', mealSuggestion: 'goûter' };
    return { greeting: 'Bonsoir', mealSuggestion: 'dîner' };
  };

  const { greeting, mealSuggestion } = getTimeOfDay();
  
  // Get season for recipe suggestions
  const getSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'printemps';
    if (month >= 5 && month <= 7) return 'été';
    if (month >= 8 && month <= 10) return 'automne';
    return 'hiver';
  };
  
  const season = getSeason();
  
  // Mock weather data - in a real implementation, this would come from a weather API
  const weatherData = {
    condition: 'ensoleillé',
    temperature: 22,
    humidity: 40,
    icon: <Sun className="h-8 w-8 text-yellow-500" />
  };
  
  // Filter recommended recipes based on time and season
  const recommendedRecipes = mockRecipes
    .filter(recipe => 
      recipe.categories.some(cat => cat.toLowerCase().includes(season)) || 
      recipe.categories.some(cat => cat.toLowerCase().includes(mealSuggestion))
    )
    .slice(0, 3);

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome section */}
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-[#EDE6D6]">
        <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#4A5568] mb-2">
          {greeting}, <span className="text-[#D11B19]">Julie</span> !
        </h1>
        <p className="text-[#4A5568]">
          Voici vos recommandations personnalisées pour aujourd'hui.
        </p>
      </motion.div>

      {/* Weather and meal suggestions */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EDE6D6] col-span-1">
          <h2 className="font-['Playfair_Display'] text-xl text-[#4A5568] mb-4">Météo du jour</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {weatherData.icon}
              <span className="ml-2 text-lg font-medium">{weatherData.condition}</span>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <Thermometer className="h-4 w-4 text-red-500 mr-1" />
                <span>{weatherData.temperature}°C</span>
              </div>
              <div className="flex items-center mt-1">
                <Droplet className="h-4 w-4 text-blue-500 mr-1" />
                <span>{weatherData.humidity}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EDE6D6] md:col-span-2">
          <h2 className="font-['Playfair_Display'] text-xl text-[#4A5568] mb-2">
            Idées pour votre {mealSuggestion}
          </h2>
          <p className="text-[#4A5568] text-sm mb-4">
            Des suggestions adaptées à la saison {season === 'été' ? 'd\'' : 'de '}
            {season} et au temps {weatherData.condition}.
          </p>
          <Button className="bg-[#D11B19] hover:bg-[#B01816] text-white flex items-center gap-2">
            <span>Voir toutes les suggestions</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Recommended recipes */}
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-[#EDE6D6]">
        <h2 className="font-['Playfair_Display'] text-xl text-[#4A5568] mb-4">
          Recettes recommandées
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedRecipes.map(recipe => (
            <RecipeCard 
              key={recipe.id}
              recipe={recipe}
              isFavorite={false}
              onToggleFavorite={() => {}}
              showDetails={false}
            />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button variant="outline" className="border-[#D11B19] text-[#D11B19] hover:bg-[#D11B19] hover:text-white">
            Voir plus de recettes
          </Button>
        </div>
      </motion.div>

      {/* Nutritional goals progress */}
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-[#EDE6D6]">
        <h2 className="font-['Playfair_Display'] text-xl text-[#4A5568] mb-4">
          Progression vers vos objectifs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#F9F5EB] p-4 rounded-lg">
            <h3 className="font-medium text-[#4A5568] mb-2">Calories</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
            </div>
            <p className="text-sm text-[#4A5568] mt-2">1400 / 2000 kcal</p>
          </div>
          <div className="bg-[#F9F5EB] p-4 rounded-lg">
            <h3 className="font-medium text-[#4A5568] mb-2">Protéines</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-sm text-[#4A5568] mt-2">45g / 75g</p>
          </div>
          <div className="bg-[#F9F5EB] p-4 rounded-lg">
            <h3 className="font-medium text-[#4A5568] mb-2">Hydratation</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: '40%' }}></div>
            </div>
            <p className="text-sm text-[#4A5568] mt-2">1L / 2.5L</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HomeTab;
