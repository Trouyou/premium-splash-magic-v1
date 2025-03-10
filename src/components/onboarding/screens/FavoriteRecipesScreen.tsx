
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Search, Filter, ChevronDown, Clock, X } from 'lucide-react';
import ProgressBar from '../ProgressBar';
import NavigationButtons from '../NavigationButtons';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/hooks/use-debounce";

interface Recipe {
  id: string;
  name: string;
  image: string;
  mainIngredients: string[];
  cookingTime: number; // in minutes
  categories: string[];
  dietaryOptions: string[];
  calories?: number;
  protein?: number;
}

interface FavoriteRecipesScreenProps {
  currentStep: number;
  totalSteps: number;
  favoriteRecipes: string[];
  toggleFavoriteRecipe: (recipeId: string) => void;
  onboardingData: {
    dietaryPreferences: string[];
    cookingTime: string;
    nutritionalGoals: string[];
  };
  onNext: () => void;
  onPrev: () => void;
}

// Mock recipes data - Extended with more variety and details
const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Salade niçoise',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Thon', 'Œufs', 'Tomates', 'Olives'],
    cookingTime: 15,
    categories: ['Équilibré', 'Méditerranéen'],
    dietaryOptions: ['pescatarian'],
    calories: 320,
    protein: 18
  },
  {
    id: '2',
    name: 'Poulet rôti aux herbes',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Poulet', 'Romarin', 'Thym', 'Ail'],
    cookingTime: 60,
    categories: ['Protéiné', 'Classique'],
    dietaryOptions: ['omnivore'],
    calories: 380,
    protein: 35
  },
  {
    id: '3',
    name: 'Risotto aux champignons',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Riz arborio', 'Champignons', 'Parmesan', 'Oignon'],
    cookingTime: 40,
    categories: ['Gourmand', 'Italien'],
    dietaryOptions: ['vegetarian'],
    calories: 450,
    protein: 12
  },
  {
    id: '4',
    name: 'Saumon grillé',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Saumon', 'Citron', 'Aneth', 'Huile d\'olive'],
    cookingTime: 25,
    categories: ['Protéiné', 'Rapide'],
    dietaryOptions: ['pescatarian', 'keto'],
    calories: 310,
    protein: 28
  },
  {
    id: '5',
    name: 'Pâtes à la carbonara',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Pâtes', 'Œufs', 'Pancetta', 'Parmesan'],
    cookingTime: 20,
    categories: ['Gourmand', 'Italien'],
    dietaryOptions: ['omnivore'],
    calories: 520,
    protein: 22
  },
  {
    id: '6',
    name: 'Ratatouille provençale',
    image: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Aubergine', 'Courgette', 'Poivron', 'Tomate'],
    cookingTime: 50,
    categories: ['Équilibré', 'Français', 'Méditerranéen'],
    dietaryOptions: ['vegan', 'vegetarian', 'gluten-free'],
    calories: 180,
    protein: 4
  },
  {
    id: '7',
    name: 'Buddha bowl au quinoa',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Quinoa', 'Avocat', 'Pois chiches', 'Légumes de saison'],
    cookingTime: 30,
    categories: ['Équilibré', 'Healthy'],
    dietaryOptions: ['vegan', 'vegetarian', 'gluten-free'],
    calories: 420,
    protein: 15
  },
  {
    id: '8',
    name: 'Curry de légumes',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Lait de coco', 'Curry', 'Légumes variés', 'Riz basmati'],
    cookingTime: 35,
    categories: ['Épicé', 'Indien'],
    dietaryOptions: ['vegan', 'vegetarian', 'gluten-free'],
    calories: 380,
    protein: 10
  },
  {
    id: '9',
    name: 'Quiche lorraine',
    image: 'https://images.unsplash.com/photo-1591985666643-9b27a0cdbc0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Pâte brisée', 'Œufs', 'Crème', 'Lardons'],
    cookingTime: 45,
    categories: ['Gourmand', 'Français'],
    dietaryOptions: ['omnivore'],
    calories: 480,
    protein: 18
  },
  {
    id: '10',
    name: 'Bol de smoothie açaï',
    image: 'https://images.unsplash.com/photo-1490323948902-e03e4afbee89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Baies d\'açaï', 'Bananes', 'Myrtilles', 'Granola'],
    cookingTime: 10,
    categories: ['Rapide', 'Petit-déjeuner', 'Sucré'],
    dietaryOptions: ['vegan', 'vegetarian'],
    calories: 320,
    protein: 8
  },
  {
    id: '11',
    name: 'Pad thaï au poulet',
    image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Nouilles de riz', 'Poulet', 'Œufs', 'Cacahuètes'],
    cookingTime: 25,
    categories: ['Asiatique', 'Thaïlandais'],
    dietaryOptions: ['omnivore'],
    calories: 450,
    protein: 24
  },
  {
    id: '12',
    name: 'Burrito bowl',
    image: 'https://images.unsplash.com/photo-1590081681663-faeeaad3c0ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Riz', 'Haricots noirs', 'Avocat', 'Maïs'],
    cookingTime: 20,
    categories: ['Mexicain', 'Équilibré'],
    dietaryOptions: ['vegetarian', 'gluten-free'],
    calories: 380,
    protein: 14
  },
  {
    id: '13',
    name: 'Velouté de potiron',
    image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Potiron', 'Oignon', 'Crème', 'Bouillon'],
    cookingTime: 30,
    categories: ['Soupe', 'Automne'],
    dietaryOptions: ['vegetarian', 'gluten-free'],
    calories: 210,
    protein: 5
  },
  {
    id: '14',
    name: 'Steak de thon mi-cuit',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Thon', 'Sésame', 'Sauce soja', 'Gingembre'],
    cookingTime: 15,
    categories: ['Rapide', 'Asiatique', 'Protéiné'],
    dietaryOptions: ['pescatarian'],
    calories: 290,
    protein: 32
  },
  {
    id: '15',
    name: 'Falafels',
    image: 'https://images.unsplash.com/photo-1593001872095-7d5b3868dd14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Pois chiches', 'Herbes fraîches', 'Épices', 'Ail'],
    cookingTime: 40,
    categories: ['Méditerranéen', 'Moyen-Orient'],
    dietaryOptions: ['vegan', 'vegetarian'],
    calories: 340,
    protein: 12
  },
  {
    id: '16',
    name: 'Pizza margherita',
    image: 'https://images.unsplash.com/photo-1589840700256-41c5d84af80d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Pâte à pizza', 'Sauce tomate', 'Mozzarella', 'Basilic'],
    cookingTime: 25,
    categories: ['Italien', 'Classique'],
    dietaryOptions: ['vegetarian'],
    calories: 450,
    protein: 15
  },
  {
    id: '17',
    name: 'Crêpes protéinées',
    image: 'https://images.unsplash.com/photo-1579633386833-28e19a7cfd8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Farine d\'avoine', 'Banane', 'Œufs', 'Whey'],
    cookingTime: 10,
    categories: ['Petit-déjeuner', 'Rapide', 'Protéiné'],
    dietaryOptions: ['vegetarian'],
    calories: 320,
    protein: 24
  },
  {
    id: '18',
    name: 'Wraps de laitue au poulet',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Feuilles de laitue', 'Poulet grillé', 'Avocat', 'Sauce tahini'],
    cookingTime: 15,
    categories: ['Léger', 'Rapide', 'Low-carb'],
    dietaryOptions: ['omnivore', 'keto', 'gluten-free'],
    calories: 280,
    protein: 26
  },
  {
    id: '19',
    name: 'Taboulé libanais',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Persil', 'Boulgour', 'Tomates', 'Menthe'],
    cookingTime: 20,
    categories: ['Salade', 'Moyen-Orient'],
    dietaryOptions: ['vegan', 'vegetarian'],
    calories: 220,
    protein: 6
  },
  {
    id: '20',
    name: 'Pancakes aux myrtilles',
    image: 'https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Farine', 'Myrtilles', 'Œufs', 'Lait'],
    cookingTime: 15,
    categories: ['Petit-déjeuner', 'Sucré'],
    dietaryOptions: ['vegetarian'],
    calories: 380,
    protein: 10
  },
  {
    id: '21',
    name: 'Gnocchis à la sauge et beurre',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Gnocchis', 'Beurre', 'Sauge', 'Parmesan'],
    cookingTime: 15,
    categories: ['Italien', 'Rapide', 'Gourmand'],
    dietaryOptions: ['vegetarian'],
    calories: 420,
    protein: 10
  },
  {
    id: '22',
    name: 'Rösti suisse',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Pommes de terre', 'Oignon', 'Beurre', 'Fromage'],
    cookingTime: 25,
    categories: ['Suisse', 'Réconfortant'],
    dietaryOptions: ['vegetarian', 'gluten-free'],
    calories: 380,
    protein: 8
  },
  {
    id: '23',
    name: 'Poké bowl au saumon',
    image: 'https://images.unsplash.com/photo-1507471509451-1d05c43f7d0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Riz', 'Saumon cru', 'Avocat', 'Concombre'],
    cookingTime: 20,
    categories: ['Hawaïen', 'Healthy'],
    dietaryOptions: ['pescatarian', 'gluten-free'],
    calories: 420,
    protein: 22
  },
  {
    id: '24',
    name: 'Chili con carne',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Viande hachée', 'Haricots rouges', 'Tomates', 'Épices'],
    cookingTime: 50,
    categories: ['Mexicain', 'Épicé', 'Réconfortant'],
    dietaryOptions: ['omnivore'],
    calories: 420,
    protein: 28
  }
];

// Categories for filtering
const allCategories = [
  { id: 'rapide', name: 'Plats rapides (<15 min)' },
  { id: 'equilibre', name: 'Plats équilibrés' },
  { id: 'gourmand', name: 'Plats gourmands' },
  { id: 'monde', name: 'Spécialités du monde' },
];

// Time presets for filtering
const timePresets = [
  { id: 'all', name: 'Tous' },
  { id: 'quick', name: '< 15 min' },
  { id: 'medium', name: '< 30 min' },
  { id: 'long', name: '< 60 min' },
];

// Default placeholder image to use when recipe image fails to load
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';

const FavoriteRecipesScreen: React.FC<FavoriteRecipesScreenProps> = ({
  currentStep,
  totalSteps,
  favoriteRecipes,
  toggleFavoriteRecipe,
  onboardingData,
  onNext,
  onPrev,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleRecipes, setVisibleRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const recipesPerPage = 8;
  
  // Debounce search input for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Function to filter recipes based on diet, time, and search term
  const filterRecipesByUserPreferences = useCallback(() => {
    // Start with all recipes
    let results = [...mockRecipes];
    
    // Filter by dietary preferences if any are selected
    if (onboardingData.dietaryPreferences.length > 0) {
      // Special case: if omnivore is selected, include all options
      if (onboardingData.dietaryPreferences.includes('omnivore')) {
        // No filtering needed for omnivore
      } else {
        // Filter to include only recipes that match at least one of the selected preferences
        results = results.filter(recipe => 
          recipe.dietaryOptions.some(option => 
            onboardingData.dietaryPreferences.includes(option)
          )
        );
      }
    }
    
    // Filter by cooking time preference
    if (onboardingData.cookingTime === 'quick') {
      results = results.filter(recipe => recipe.cookingTime <= 15);
    } else if (onboardingData.cookingTime === 'standard') {
      results = results.filter(recipe => recipe.cookingTime <= 30);
    }
    // For 'extended' time, include all recipes
    
    // Apply time preset filter
    if (selectedTimeFilter === 'quick') {
      results = results.filter(recipe => recipe.cookingTime <= 15);
    } else if (selectedTimeFilter === 'medium') {
      results = results.filter(recipe => recipe.cookingTime <= 30);
    } else if (selectedTimeFilter === 'long') {
      results = results.filter(recipe => recipe.cookingTime <= 60);
    }
    
    // Apply category filter
    if (selectedCategory) {
      switch (selectedCategory) {
        case 'rapide':
          results = results.filter(recipe => recipe.cookingTime <= 15);
          break;
        case 'equilibre':
          results = results.filter(recipe => recipe.categories.includes('Équilibré') || recipe.categories.includes('Healthy'));
          break;
        case 'gourmand':
          results = results.filter(recipe => recipe.categories.includes('Gourmand'));
          break;
        case 'monde':
          results = results.filter(recipe => 
            recipe.categories.some(cat => 
              ['Italien', 'Mexicain', 'Asiatique', 'Indien', 'Méditerranéen', 'Moyen-Orient', 'Thaïlandais', 'Français', 'Hawaïen', 'Suisse'].includes(cat)
            )
          );
          break;
      }
    }
    
    // Apply search filter
    if (debouncedSearchTerm) {
      const searchTermLower = debouncedSearchTerm.toLowerCase();
      results = results.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTermLower) ||
        recipe.mainIngredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTermLower)
        ) ||
        recipe.categories.some(category => 
          category.toLowerCase().includes(searchTermLower)
        )
      );
    }
    
    // If show only favorites is active, filter accordingly
    if (showOnlyFavorites) {
      results = results.filter(recipe => favoriteRecipes.includes(recipe.id));
    }
    
    return results;
  }, [onboardingData, debouncedSearchTerm, selectedTimeFilter, selectedCategory, showOnlyFavorites, favoriteRecipes]);

  // Update filtered recipes when search term or filters change
  useEffect(() => {
    const filtered = filterRecipesByUserPreferences();
    setFilteredRecipes(filtered);
    setVisibleRecipes(filtered.slice(0, page * recipesPerPage));
  }, [filterRecipesByUserPreferences, page]);

  // Simulate loading data
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Preload recipe images
  useEffect(() => {
    const preloadImages = () => {
      filteredRecipes.forEach(recipe => {
        const img = new Image();
        img.onload = () => {
          setImagesLoaded(prev => ({ ...prev, [recipe.id]: true }));
        };
        img.onerror = () => {
          setImagesLoaded(prev => ({ ...prev, [recipe.id]: false }));
        };
        img.src = recipe.image;
      });
    };
    
    if (!isLoading) {
      preloadImages();
    }
  }, [filteredRecipes, isLoading]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedTimeFilter('all');
    setSelectedCategory(null);
    setShowFilters(false);
    setPage(1);
  };

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  // Set a local time label based on cooking time
  const getTimeLabel = (minutes: number) => {
    if (minutes <= 15) return `🕒 ${minutes} min`;
    if (minutes <= 30) return `🕙 ${minutes} min`;
    return `🕐 ${minutes} min`;
  };

  // Get icons for dietary options
  const getDietLabel = (options: string[]) => {
    const labels = [];
    if (options.includes('vegan')) labels.push('🌱 Vegan');
    if (options.includes('vegetarian') && !options.includes('vegan')) labels.push('🥗 Végétarien');
    if (options.includes('pescatarian')) labels.push('🐟 Pescatarien');
    if (options.includes('gluten-free')) labels.push('🌾 Sans gluten');
    if (options.includes('keto')) labels.push('🥑 Keto');
    if (options.includes('omnivore') && options.length === 1) labels.push('🍖 Omnivore');
    
    return labels.length > 0 ? labels[0] : '';
  };

  // Get extra nutrient info if available
  const getNutrientLabel = (recipe: Recipe) => {
    if (recipe.protein && recipe.protein > 20) return `🔥 ${recipe.protein}g protéines`;
    if (recipe.calories && recipe.calories < 300) return `✨ ${recipe.calories} calories`;
    return '';
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-black mb-2">
          Vos recettes favorites 🍽️
        </h2>
        <p className="font-['AvantGarde_Bk_BT'] text-[#4A5568] mb-4">
          Sélectionnez les plats qui vous font envie pour personnaliser vos recommandations.
        </p>
      </motion.div>
      
      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Rechercher des recettes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border-[#EDE6D6] focus:border-[#D11B19] focus:ring-1 focus:ring-[#D11B19]"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="px-3 py-2 border-[#EDE6D6] text-[#4A5568] hover:bg-[#F5F3E7]"
            >
              <Filter size={18} className="mr-1" />
              Filtres
              <ChevronDown size={16} className={`ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
            
            <Button
              onClick={toggleFilter}
              variant={showOnlyFavorites ? "default" : "outline"}
              className={showOnlyFavorites 
                ? "px-3 py-2 bg-[#D11B19] text-white hover:bg-[#B01815]" 
                : "px-3 py-2 border-[#EDE6D6] text-[#4A5568] hover:bg-[#F5F3E7]"
              }
            >
              {showOnlyFavorites ? 'Voir tout' : 'Favoris'}
              {favoriteRecipes.length > 0 && (
                <Badge className="ml-1 bg-white text-[#D11B19] hover:bg-gray-100">{favoriteRecipes.length}</Badge>
              )}
            </Button>
          </div>
        </div>
        
        {/* Advanced Filters Section */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-[#F5F3E7] p-4 rounded-lg">
                <div className="mb-4">
                  <h3 className="font-medium text-[#4A5568] mb-2">Temps de préparation</h3>
                  <div className="flex flex-wrap gap-2">
                    {timePresets.map(time => (
                      <button
                        key={time.id}
                        onClick={() => setSelectedTimeFilter(time.id)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedTimeFilter === time.id
                            ? 'bg-[#D11B19] text-white'
                            : 'bg-white text-[#4A5568] hover:bg-[#EDE6D6]'
                        }`}
                      >
                        {time.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium text-[#4A5568] mb-2">Catégories</h3>
                  <div className="flex flex-wrap gap-2">
                    {allCategories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-[#D11B19] text-white'
                            : 'bg-white text-[#4A5568] hover:bg-[#EDE6D6]'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    className="text-[#D11B19] border-[#D11B19] hover:bg-[#D11B19]/10"
                  >
                    <X size={16} className="mr-1" />
                    Réinitialiser les filtres
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Results count */}
      <div className="mb-4 text-[#4A5568] text-sm flex items-center justify-between">
        <span>
          {filteredRecipes.length} recettes trouvées
          {debouncedSearchTerm && <span> pour "{debouncedSearchTerm}"</span>}
          {selectedCategory && <span> dans {allCategories.find(c => c.id === selectedCategory)?.name.toLowerCase()}</span>}
        </span>
        
        {(debouncedSearchTerm || selectedCategory || selectedTimeFilter !== 'all') && (
          <button 
            onClick={handleReset}
            className="text-[#D11B19] hover:underline text-sm flex items-center"
          >
            <X size={14} className="mr-1" />
            Effacer les filtres
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <Loader2 className="h-10 w-10 text-[#D11B19] animate-spin mb-4" />
          <p className="text-[#4A5568]">Chargement des recettes...</p>
        </div>
      ) : (
        <>
          {filteredRecipes.length === 0 ? (
            <div className="bg-[#F5F3E7] rounded-lg p-8 text-center">
              <p className="text-[#4A5568] mb-4">Aucune recette ne correspond à vos critères.</p>
              <Button onClick={handleReset} className="bg-[#D11B19] text-white hover:bg-[#B01815]">
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {visibleRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isFavorite={favoriteRecipes.includes(recipe.id)}
                    timeLabel={getTimeLabel(recipe.cookingTime)}
                    dietLabel={getDietLabel(recipe.dietaryOptions)}
                    nutrientLabel={getNutrientLabel(recipe)}
                    onToggleFavorite={() => toggleFavoriteRecipe(recipe.id)}
                    imageLoaded={imagesLoaded[recipe.id]}
                    defaultImage={DEFAULT_IMAGE}
                  />
                ))}
              </motion.div>
              
              {visibleRecipes.length < filteredRecipes.length && (
                <div className="flex justify-center mb-8">
                  <Button 
                    onClick={handleLoadMore}
                    variant="outline"
                    className="border-[#D11B19] text-[#D11B19] hover:bg-[#D11B19]/10"
                  >
                    Voir plus de recettes
                    <ChevronDown size={16} className="ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}
        </>
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
  timeLabel: string;
  dietLabel: string;
  nutrientLabel: string;
  onToggleFavorite: () => void;
  imageLoaded?: boolean;
  defaultImage: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  isFavorite, 
  timeLabel,
  dietLabel,
  nutrientLabel,
  onToggleFavorite,
  imageLoaded,
  defaultImage
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [imgSrc, setImgSrc] = useState(recipe.image);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  
  // Handle image error
  const handleImageError = () => {
    setImgSrc(defaultImage);
  };
  
  // Mark image as loaded
  const handleImageLoaded = () => {
    setIsImgLoaded(true);
  };
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 }
      }}
      whileHover={{ scale: isFavorite ? 1.03 : 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-lg overflow-hidden shadow-md cursor-pointer transition-all ${
        isFavorite ? 'ring-2 ring-[#D11B19]' : ''
      }`}
      onClick={onToggleFavorite}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {!isImgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-gray-300 animate-spin" />
          </div>
        )}
        
        <img 
          src={imgSrc} 
          alt={recipe.name}
          onError={handleImageError}
          onLoad={handleImageLoaded}
          className={`w-full h-full object-cover transition-all duration-300 ease-in-out ${
            isImgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: isHovering ? 'scale(1.1)' : 'scale(1)'
          }}
        />
        
        {isFavorite && (
          <div className="absolute top-2 right-2 bg-[#D11B19] text-white px-2 py-1 rounded-full text-xs font-medium z-10">
            Favori ✓
          </div>
        )}
        
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-3 transition-opacity duration-300 ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h3 className="text-white font-medium text-lg mb-1">{recipe.name}</h3>
          <div className="flex flex-wrap gap-1 mb-2">
            {recipe.mainIngredients.map((ingredient, index) => (
              <span 
                key={index} 
                className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full"
              >
                {ingredient}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-1 mt-auto">
            {timeLabel && (
              <span className="bg-white/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                {timeLabel}
              </span>
            )}
            {dietLabel && (
              <span className="bg-white/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                {dietLabel}
              </span>
            )}
            {nutrientLabel && (
              <span className="bg-white/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                {nutrientLabel}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-3 bg-white">
        <h3 className="font-medium text-[#2D3748] truncate">{recipe.name}</h3>
        <div className="flex flex-wrap gap-1 mt-1 text-xs text-gray-500">
          <span>{timeLabel}</span>
          {dietLabel && <span>• {dietLabel}</span>}
        </div>
      </div>
    </motion.div>
  );
};

export default FavoriteRecipesScreen;
