
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface RecipeSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const RecipeSearchBar: React.FC<RecipeSearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
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
  );
};

export default RecipeSearchBar;
