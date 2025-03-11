
import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AdvancedFiltersPanel from './AdvancedFiltersPanel';

interface RecipeFilterSectionProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  activeTab: string;
  handleTabChange: (tab: string) => void;
  favorites: string[];
}

const RecipeFilterSection: React.FC<RecipeFilterSectionProps> = ({
  showFilters,
  setShowFilters,
  activeTab,
  handleTabChange,
  favorites,
}) => {
  const [pendingFilters, setPendingFilters] = useState({
    timeFilter: 'all',
    categoryFilter: null as string | null,
    dietaryFilter: null as string | null,
    difficultyFilter: null as string | null,
    calorieFilter: null as string | null,
  });

  const handleTimeFilterChange = (timeId: string) => {
    setPendingFilters({ ...pendingFilters, timeFilter: timeId });
  };

  const handleCategoryFilterChange = (categoryId: string | null) => {
    setPendingFilters({ ...pendingFilters, categoryFilter: categoryId });
  };

  const handleDietaryFilterChange = (dietaryId: string | null) => {
    setPendingFilters({ ...pendingFilters, dietaryFilter: dietaryId });
  };

  const handleDifficultyFilterChange = (difficultyId: string | null) => {
    setPendingFilters({ ...pendingFilters, difficultyFilter: difficultyId });
  };

  const handleCalorieFilterChange = (calorieId: string | null) => {
    setPendingFilters({ ...pendingFilters, calorieFilter: calorieId });
  };

  const handleResetFilters = () => {
    setPendingFilters({
      timeFilter: 'all',
      categoryFilter: null,
      dietaryFilter: null,
      difficultyFilter: null,
      calorieFilter: null,
    });
  };

  const handleApplyFilters = () => {
    // In a real implementation, this would update the parent component's state
    // For now, we'll just close the filters panel
    setShowFilters(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="px-3 py-2 border-[#EDE6D6] text-[#4A5568] hover:bg-[#F5F3E7]"
        >
          <Filter size={18} className="mr-1" />
          Filtres avancés
          {showFilters ? (
            <ChevronUp size={16} className="ml-1" />
          ) : (
            <ChevronDown size={16} className="ml-1" />
          )}
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
      
      <AdvancedFiltersPanel 
        showFilters={showFilters}
        pendingFilters={pendingFilters}
        onTimeFilterChange={handleTimeFilterChange}
        onCategoryFilterChange={handleCategoryFilterChange}
        onDietaryFilterChange={handleDietaryFilterChange}
        onDifficultyFilterChange={handleDifficultyFilterChange}
        onCalorieFilterChange={handleCalorieFilterChange}
        onResetFilters={handleResetFilters}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default RecipeFilterSection;
