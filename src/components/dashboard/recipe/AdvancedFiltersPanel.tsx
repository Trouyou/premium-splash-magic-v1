
import React from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  timePresets, 
  allCategories, 
  dietaryOptions, 
  difficultyOptions, 
  calorieOptions 
} from '@/components/onboarding/recipe/utils/constants';

interface AdvancedFiltersPanelProps {
  showFilters: boolean;
  pendingFilters: {
    timeFilter: string;
    categoryFilter: string | null;
    dietaryFilter: string | null;
    difficultyFilter: string | null;
    calorieFilter: string | null;
  };
  onTimeFilterChange: (timeId: string) => void;
  onCategoryFilterChange: (categoryId: string | null) => void;
  onDietaryFilterChange: (dietaryId: string | null) => void;
  onDifficultyFilterChange: (difficultyId: string | null) => void;
  onCalorieFilterChange: (calorieId: string | null) => void;
  onResetFilters: () => void;
  onApplyFilters: () => void;
}

const AdvancedFiltersPanel: React.FC<AdvancedFiltersPanelProps> = ({
  showFilters,
  pendingFilters,
  onTimeFilterChange,
  onCategoryFilterChange,
  onDietaryFilterChange,
  onDifficultyFilterChange,
  onCalorieFilterChange,
  onResetFilters,
  onApplyFilters
}) => {
  if (!showFilters) return null;
  
  return (
    <div className="bg-[#F5F3E7] p-4 rounded-lg mt-3 mb-3 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Temps de préparation */}
        <div className="mb-4">
          <h3 className="font-medium text-[#4A5568] mb-2">Temps de préparation</h3>
          <div className="flex flex-wrap gap-2">
            {timePresets.map(time => (
              <button
                key={time.id}
                onClick={() => onTimeFilterChange(time.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  pendingFilters.timeFilter === time.id
                    ? 'bg-[#D11B19] text-white'
                    : 'bg-white text-[#4A5568] hover:bg-[#EDE6D6]'
                }`}
              >
                {time.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Type de plat */}
        <div className="mb-4">
          <h3 className="font-medium text-[#4A5568] mb-2">Type de plat</h3>
          <div className="flex flex-wrap gap-2">
            {allCategories.map(category => (
              <button
                key={category.id}
                onClick={() => 
                  onCategoryFilterChange(
                    pendingFilters.categoryFilter === category.id ? null : category.id
                  )
                }
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  pendingFilters.categoryFilter === category.id
                    ? 'bg-[#D11B19] text-white'
                    : 'bg-white text-[#4A5568] hover:bg-[#EDE6D6]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Régime alimentaire */}
        <div className="mb-4">
          <h3 className="font-medium text-[#4A5568] mb-2">Régime alimentaire</h3>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map(dietary => (
              <button
                key={dietary.id}
                onClick={() => 
                  onDietaryFilterChange(
                    pendingFilters.dietaryFilter === dietary.id ? null : dietary.id
                  )
                }
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  pendingFilters.dietaryFilter === dietary.id
                    ? 'bg-[#D11B19] text-white'
                    : 'bg-white text-[#4A5568] hover:bg-[#EDE6D6]'
                }`}
              >
                {dietary.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Difficulté */}
        <div className="mb-4">
          <h3 className="font-medium text-[#4A5568] mb-2">Difficulté</h3>
          <div className="flex flex-wrap gap-2">
            {difficultyOptions.map(difficulty => (
              <button
                key={difficulty.id}
                onClick={() => 
                  onDifficultyFilterChange(
                    pendingFilters.difficultyFilter === difficulty.id ? null : difficulty.id
                  )
                }
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  pendingFilters.difficultyFilter === difficulty.id
                    ? 'bg-[#D11B19] text-white'
                    : 'bg-white text-[#4A5568] hover:bg-[#EDE6D6]'
                }`}
              >
                {difficulty.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Calories par portion */}
        <div className="mb-4">
          <h3 className="font-medium text-[#4A5568] mb-2">Calories par portion</h3>
          <div className="flex flex-wrap gap-2">
            {calorieOptions.map(calorie => (
              <button
                key={calorie.id}
                onClick={() => 
                  onCalorieFilterChange(
                    pendingFilters.calorieFilter === calorie.id ? null : calorie.id
                  )
                }
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  pendingFilters.calorieFilter === calorie.id
                    ? 'bg-[#D11B19] text-white'
                    : 'bg-white text-[#4A5568] hover:bg-[#EDE6D6]'
                }`}
              >
                {calorie.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-4">
        <Button 
          variant="outline" 
          onClick={onResetFilters}
          className="text-[#D11B19] border-[#D11B19] hover:bg-[#D11B19]/10"
        >
          <X size={16} className="mr-1" />
          Réinitialiser
        </Button>
        
        <Button 
          onClick={onApplyFilters}
          className="px-4 py-2 bg-[#D11B19] text-white hover:bg-[#B01815]"
        >
          <Check size={16} className="mr-1" />
          Appliquer les filtres
        </Button>
      </div>
    </div>
  );
};

export default AdvancedFiltersPanel;
