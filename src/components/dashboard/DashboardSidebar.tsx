
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ChefHat, ShoppingCart, Activity, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/onboarding/recipe/components/OptimizedImage';
import { DashboardTab } from '@/pages/Dashboard';

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isOpen,
  toggleSidebar
}) => {
  // Logo loading state
  const [logoLoaded, setLogoLoaded] = useState(false);
  
  const navigationItems = [
    { id: 'home', label: 'Accueil', icon: <Home className="w-5 h-5" /> },
    { id: 'recipes', label: 'Mes Recettes', icon: <ChefHat className="w-5 h-5" /> },
    { id: 'shopping', label: 'Liste de courses', icon: <ShoppingCart className="w-5 h-5" /> },
    { id: 'nutrition', label: 'Suivi Nutritionnel', icon: <Activity className="w-5 h-5" /> },
    { id: 'settings', label: 'Paramètres', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile overlay */}
          <motion.div 
            className="fixed inset-0 bg-black/20 z-20 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          />
          
          {/* Sidebar */}
          <motion.aside
            className="fixed top-0 left-0 h-full w-64 bg-white z-30 shadow-lg border-r border-[#EDE6D6] flex flex-col"
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-4 border-b border-[#EDE6D6] flex items-center justify-between">
              <div className="flex items-center justify-center w-full">
                <OptimizedImage 
                  src="/lovable-uploads/c1be783b-9b2b-44ce-9e6c-deea409157bd.png"
                  alt="Eatly"
                  className={`w-24 h-auto object-contain transition-opacity duration-300 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setLogoLoaded(true)}
                  onError={() => console.error("Failed to load Eatly logo")}
                  fallbackSrc="/placeholder.svg"
                />
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar}
                className="lg:hidden"
              >
                <X className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
            
            <nav className="flex-1 py-6 overflow-y-auto">
              <ul className="space-y-1 px-2">
                {navigationItems.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id as DashboardTab)}
                      className={`flex items-center w-full px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === item.id 
                          ? 'bg-[#F9F5EB] text-[#D11B19] font-medium' 
                          : 'hover:bg-[#F9F5EB] text-[#4A5568]'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="p-4 border-t border-[#EDE6D6]">
              <div className="bg-[#F9F5EB] rounded-lg p-4 text-sm text-[#4A5568]">
                <p className="font-medium text-[#D11B19] mb-2">Besoin d'aide ?</p>
                <p>Contactez notre support pour toute question sur Eatly.</p>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default DashboardSidebar;
