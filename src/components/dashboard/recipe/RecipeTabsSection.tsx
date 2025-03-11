
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Flame, Heart } from 'lucide-react';

interface RecipeTabsSectionProps {
  activeTab: string;
  handleTabChange: (value: string) => void;
}

const RecipeTabsSection: React.FC<RecipeTabsSectionProps> = ({ activeTab, handleTabChange }) => {
  return (
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
    </Tabs>
  );
};

export default RecipeTabsSection;
