
import React from 'react';
import { Filter, ChevronDown, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
  return (
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
  );
};

export default RecipeFilterSection;
