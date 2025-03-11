
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Toaster } from 'sonner';
import { Search, Filter, ChevronDown, Heart, Clock, Utensils, Flame } from 'lucide-react';
import { mockRecipes } from '@/components/onboarding/recipe/data/mockRecipes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import RecipeCard from './RecipeCard';
import { Recipe } from '@/components/onboarding/recipe/types';
import { useDebounce } from '@/hooks/use-debounce';

const RecipesView = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Load recipes with a slight delay to simulate fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setAllRecipes(mockRecipes);
      setFilteredRecipes(mockRecipes);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle search and filtering
  useEffect(() => {
    if (!debouncedSearchTerm) {
      setFilteredRecipes(allRecipes);
      return;
    }
    
    const searchResults = allRecipes.filter(recipe => {
      const termLower = debouncedSearchTerm.toLowerCase();
      return (
        recipe.name.toLowerCase().includes(termLower) ||
        recipe.mainIngredients.some(ing => ing.toLowerCase().includes(termLower)) ||
        recipe.categories.some(cat => cat.toLowerCase().includes(termLower))
      );
    });
    
    setFilteredRecipes(searchResults);
  }, [debouncedSearchTerm, allRecipes]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Filter recipes based on selected tab
    switch (value) {
      case 'favorites':
        setFilteredRecipes(allRecipes.filter(recipe => favorites.includes(recipe.id)));
        break;
      case 'quick':
        setFilteredRecipes(allRecipes.filter(recipe => recipe.cookingTime <= 20));
        break;
      case 'trending':
        // In a real app, we'd sort by popularity metrics
        setFilteredRecipes([...allRecipes].sort(() => 0.5 - Math.random()).slice(0, 12));
        break;
      default:
        setFilteredRecipes(allRecipes);
    }
  };

  const toggleFavorite = (recipeId: string) => {
    setFavorites(prev => {
      if (prev.includes(recipeId)) {
        const newFavorites = prev.filter(id => id !== recipeId);
        toast({
          title: "Retiré des favoris",
          description: "La recette a été retirée de vos favoris",
        });
        return newFavorites;
      } else {
        toast({
          title: "Ajouté aux favoris",
          description: "La recette a été ajoutée à vos favoris",
        });
        return [...prev, recipeId];
      }
    });
  };

  return (
    <div className="p-4 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-avantgarde mb-2">Mes recettes</h2>
        <p className="text-gray-600 mb-4">Découvrez et personnalisez vos recettes préférées</p>
        
        <Toaster position={isMobile ? "bottom-center" : "bottom-right"} />
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
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
              Filtres avancés
              <ChevronDown size={16} className="ml-1" />
            </Button>
            
            <Button
              onClick={() => handleTabChange('favorites')}
              variant={activeTab === 'favorites' ? "default" : "outline"}
              className={activeTab === 'favorites' 
                ? "px-3 py-2 bg-[#D11B19] text-white hover:bg-[#B01815]" 
                : "px-3 py-2 border-[#EDE6D6] text-[#4A5568] hover:bg-[#F5F3E7]"
              }
            >
              <Heart size={18} className="mr-1" />
              Favoris
              {favorites.length > 0 && (
                <Badge className="ml-1 bg-white text-[#D11B19] hover:bg-gray-100">{favorites.length}</Badge>
              )}
            </Button>
          </div>
        </div>
        
        {/* Recipe Categories Tabs */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="w-full bg-gray-100 p-1 rounded-md mb-6">
            <TabsTrigger 
              value="all" 
              className={`flex-1 ${activeTab === 'all' ? 'shadow-sm' : ''}`}
            >
              Toutes les recettes
            </TabsTrigger>
            <TabsTrigger 
              value="quick" 
              className={`flex-1 ${activeTab === 'quick' ? 'shadow-sm' : ''}`}
            >
              <Clock size={16} className="mr-1" />
              Rapides
            </TabsTrigger>
            <TabsTrigger 
              value="trending" 
              className={`flex-1 ${activeTab === 'trending' ? 'shadow-sm' : ''}`}
            >
              <Flame size={16} className="mr-1" />
              Tendances
            </TabsTrigger>
            <TabsTrigger 
              value="favorites" 
              className={`flex-1 ${activeTab === 'favorites' ? 'shadow-sm' : ''}`}
            >
              <Heart size={16} className="mr-1" />
              Favoris
            </TabsTrigger>
          </TabsList>

          {/* Recipe Grid */}
          <div className="mb-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="relative w-16 h-16 mb-4">
                  <div className="absolute inset-0 border-4 border-[#EDE6D6] border-t-[#D11B19] rounded-full animate-rotate-loader" />
                </div>
                <p className="text-gray-600">Chargement des recettes...</p>
              </div>
            ) : filteredRecipes.length === 0 ? (
              <div className="bg-[#F5F3E7] rounded-lg p-8 text-center">
                <Utensils size={32} className="mx-auto mb-4 text-gray-400" />
                <p className="text-[#4A5568] mb-2 font-medium">Aucune recette trouvée</p>
                <p className="text-gray-500 mb-4">Essayez de modifier vos critères de recherche</p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setActiveTab('all');
                  }}
                  className="bg-[#D11B19] text-white hover:bg-[#B01815]"
                >
                  Voir toutes les recettes
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRecipes.map(recipe => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isFavorite={favorites.includes(recipe.id)}
                    onToggleFavorite={() => toggleFavorite(recipe.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default RecipesView;
