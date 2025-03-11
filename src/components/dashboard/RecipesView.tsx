
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';
import { Toaster } from 'sonner';
import { mockRecipes } from '@/components/onboarding/recipe/data/mockRecipes';
import { Recipe } from '@/components/onboarding/recipe/types';
import { useDebounce } from '@/hooks/use-debounce';
import RecipeSearchBar from './recipe/RecipeSearchBar';
import RecipeFilterSection from './recipe/RecipeFilterSection';
import RecipeTabsSection from './recipe/RecipeTabsSection';
import RecipeGrid from './recipe/RecipeGrid';

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
          <RecipeSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          <RecipeFilterSection 
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            favorites={favorites}
          />
        </div>
        
        {/* Recipe Categories Tabs */}
        <RecipeTabsSection activeTab={activeTab} handleTabChange={handleTabChange} />

        {/* Recipe Grid */}
        <RecipeGrid 
          isLoading={isLoading}
          filteredRecipes={filteredRecipes}
          searchTerm={searchTerm}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          setSearchTerm={setSearchTerm}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};

export default RecipesView;
