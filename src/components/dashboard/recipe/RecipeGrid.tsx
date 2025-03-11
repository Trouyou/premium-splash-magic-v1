
import React, { useState } from 'react';
import { Utensils, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RecipeCard from '../RecipeCard';
import { Recipe } from '@/components/onboarding/recipe/types';

interface RecipeGridProps {
  isLoading: boolean;
  filteredRecipes: Recipe[];
  searchTerm: string;
  favorites: string[];
  toggleFavorite: (recipeId: string) => void;
  setSearchTerm: (term: string) => void;
  setActiveTab: (tab: string) => void;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({
  isLoading,
  filteredRecipes,
  searchTerm,
  favorites,
  toggleFavorite,
  setSearchTerm,
  setActiveTab
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8; // Show 8 recipes per page
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Scroll to top of grid for better UX
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // Scroll to top of grid for better UX
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of grid for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 border-4 border-[#EDE6D6] border-t-[#D11B19] rounded-full animate-rotate-loader" />
        </div>
        <p className="text-gray-600">Chargement des recettes...</p>
      </div>
    );
  }

  if (filteredRecipes.length === 0) {
    return (
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
    );
  }

  // Generate page numbers to display (show max 5 numbers)
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = 5;
    
    // If we have 5 or fewer pages, show all of them
    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }
    
    // If we're near the beginning
    if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages];
    }
    
    // If we're near the end
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    
    // If we're in the middle
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentRecipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={favorites.includes(recipe.id)}
            onToggleFavorite={() => toggleFavorite(recipe.id)}
          />
        ))}
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-2 py-1 bg-white text-[#4A5568] border-[#EDE6D6] hover:bg-[#F5F3E7]"
          >
            <ChevronLeft size={16} />
          </Button>
          
          {getPageNumbers().map((pageNumber, index) => (
            <React.Fragment key={index}>
              {pageNumber === '...' ? (
                <span className="px-2 text-gray-500">...</span>
              ) : (
                <Button
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="sm"
                  onClick={() => typeof pageNumber === 'number' && goToPage(pageNumber)}
                  className={
                    currentPage === pageNumber
                      ? "bg-[#D11B19] text-white hover:bg-[#B01815]"
                      : "bg-white text-[#4A5568] border-[#EDE6D6] hover:bg-[#F5F3E7]"
                  }
                >
                  {pageNumber}
                </Button>
              )}
            </React.Fragment>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-2 py-1 bg-white text-[#4A5568] border-[#EDE6D6] hover:bg-[#F5F3E7]"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecipeGrid;
