
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import OptimizedImage from '../onboarding/recipe/components/OptimizedImage';
import TabNavigation from './navigation/TabNavigation';
import { Link } from 'react-router-dom';

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
      isDarkMode ? "bg-gray-900 text-white" : "bg-[#F8F8F8] text-gray-900"
    )}>
      <header className={cn(
        "w-full fixed top-0 left-0 right-0 z-30 px-4 flex items-center h-16 border-b shadow-sm",
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      )}>
        <div className="flex items-center justify-between w-full max-w-screen-lg mx-auto">
          <Link 
            to="/dashboard" 
            className="flex items-center h-16 w-56 pl-2 relative transition-opacity duration-200 hover:opacity-80"
          >
            <OptimizedImage 
              src="/lovable-uploads/c1be783b-9b2b-44ce-9e6c-deea409157bd.png"
              alt="Eatly"
              className="h-[80px] w-auto object-contain transform-gpu"
              fallbackSrc="/placeholder.svg"
            />
          </Link>
          
          <div className="w-10 h-10 rounded-full bg-[#EDE6D6] flex items-center justify-center text-[#9C1B1A] font-medium border-2 border-[#9C1B1A] transition-transform hover:scale-105">
            {user?.firstName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>
      </header>

      <main className={cn(
        "flex-1 overflow-y-auto pt-16 pb-20",
        isDarkMode ? "bg-gray-900" : "bg-[#F8F8F8]"
      )}>
        <div className="p-4 md:p-6 max-w-screen-lg mx-auto">
          {children}
        </div>
      </main>

      <TabNavigation activeTab={activeView} setActiveTab={setActiveView} />
    </div>
  );
};

export default DashboardLayout;
