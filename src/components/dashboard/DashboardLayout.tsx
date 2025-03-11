
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import OptimizedImage from '../onboarding/recipe/components/OptimizedImage';
import TabNavigation from './navigation/TabNavigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeView,
  setActiveView
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user } = useAuth();

  return (
    <div className={cn(
      "flex flex-col h-screen overflow-hidden",
      isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    )}>
      {/* Top header with logo and search */}
      <header className={cn(
        "w-full fixed top-0 left-0 right-0 z-30 px-4 flex items-center h-16 border-b",
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      )}>
        <div className="flex items-center justify-between w-full max-w-screen-lg mx-auto">
          <div className="flex items-center justify-center h-16 w-24 relative">
            <OptimizedImage 
              src="/lovable-uploads/c1be783b-9b2b-44ce-9e6c-deea409157bd.png"
              alt="Eatly"
              className="h-12 w-auto object-contain transform-gpu"
              fallbackSrc="/placeholder.svg"
            />
          </div>
          
          <div className="w-full max-w-md relative mx-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Rechercher des recettes, ingrédients..." 
              className={cn(
                "pl-10 h-9 w-full",
                isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-transparent"
              )}
            />
          </div>
          
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>
      </header>

      {/* Main content with bottom padding for the tab navigation */}
      <main className={cn(
        "flex-1 overflow-y-auto pt-16 pb-20",
        isDarkMode ? "bg-gray-900" : "bg-[#F8F8F8]"
      )}>
        <div className="p-4 md:p-6 max-w-screen-lg mx-auto">
          {children}
        </div>
      </main>

      {/* Bottom tab navigation */}
      <TabNavigation activeTab={activeView} setActiveTab={setActiveView} />
    </div>
  );
};

export default DashboardLayout;
