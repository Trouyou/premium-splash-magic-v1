
import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Home, Calendar, ShoppingCart, 
  BarChart, Settings, Search, Menu, X, Sun, Moon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import OptimizedImage from '../onboarding/recipe/components/OptimizedImage';
import { Button } from '@/components/ui/button';

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user } = useAuth();

  const navigationItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'planning', label: 'Planning des repas', icon: Calendar },
    { id: 'shopping', label: 'Liste de courses', icon: ShoppingCart },
    { id: 'nutrition', label: 'Suivi nutritionnel', icon: BarChart },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Ici, vous implémenteriez la logique réelle pour changer le thème
  };

  return (
    <div className={cn(
      "flex h-screen overflow-hidden",
      isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    )}>
      {/* Sidebar pour desktop */}
      <aside className={cn(
        "hidden md:flex flex-col h-full border-r transition-all duration-300",
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
        sidebarCollapsed ? "w-[72px]" : "w-64"
      )}>
        {/* Logo et bouton de collapse */}
        <div className={cn(
          "flex items-center h-16 px-4 border-b",
          isDarkMode ? "border-gray-700" : "border-gray-200"
        )}>
          {!sidebarCollapsed && (
            <div className="flex items-center flex-1 overflow-hidden">
              <OptimizedImage 
                src="/lovable-uploads/c1be783b-9b2b-44ce-9e6c-deea409157bd.png"
                alt="Eatly"
                className="h-8 w-auto object-contain"
                fallbackSrc="/placeholder.svg"
              />
            </div>
          )}
          <button 
            onClick={toggleSidebar}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full",
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            )}
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <TooltipProvider delayDuration={sidebarCollapsed ? 300 : 1000}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setActiveView(item.id)}
                        className={cn(
                          "flex items-center w-full p-2 rounded-md transition-colors",
                          activeView === item.id 
                            ? isDarkMode ? "bg-gray-700" : "bg-[#EDE6D6]" 
                            : isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100",
                          sidebarCollapsed ? "justify-center" : "justify-start"
                        )}
                      >
                        <item.icon 
                          size={20} 
                          className={cn(
                            activeView === item.id ? "text-[#D11B19]" : "text-gray-500"
                          )} 
                        />
                        {!sidebarCollapsed && (
                          <span 
                            className={cn(
                              "ml-3 font-medium truncate",
                              activeView === item.id ? "text-[#D11B19]" : ""
                            )}
                          >
                            {item.label}
                          </span>
                        )}
                      </button>
                    </TooltipTrigger>
                    {sidebarCollapsed && (
                      <TooltipContent side="right">
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
          </ul>
        </nav>

        {/* User profile and theme toggle */}
        <div className={cn(
          "border-t p-4",
          isDarkMode ? "border-gray-700" : "border-gray-200"
        )}>
          <div className={cn(
            "flex items-center",
            sidebarCollapsed ? "justify-center" : "justify-between"
          )}>
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="truncate">
                  <p className="text-sm font-medium truncate">
                    {user?.email || "Utilisateur"}
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={toggleDarkMode}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full",
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100",
                sidebarCollapsed ? "" : "ml-2"
              )}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile header with hamburger menu */}
      <div className={cn(
        "md:hidden w-full fixed top-0 left-0 right-0 z-30 h-16 px-4 flex items-center justify-between border-b",
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      )}>
        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleMobileMenu}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full",
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            )}
          >
            <Menu size={24} />
          </button>
          <OptimizedImage 
            src="/lovable-uploads/c1be783b-9b2b-44ce-9e6c-deea409157bd.png"
            alt="Eatly"
            className="h-8 w-auto object-contain"
            fallbackSrc="/placeholder.svg"
          />
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleDarkMode}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full",
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            )}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile sidebar */}
      <aside className={cn(
        "md:hidden fixed left-0 top-0 bottom-0 z-50 w-64 h-full transition-all duration-300 transform",
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className={cn(
          "flex items-center justify-between h-16 px-4 border-b",
          isDarkMode ? "border-gray-700" : "border-gray-200"
        )}>
          <OptimizedImage 
            src="/lovable-uploads/c1be783b-9b2b-44ce-9e6c-deea409157bd.png"
            alt="Eatly"
            className="h-8 w-auto object-contain"
            fallbackSrc="/placeholder.svg"
          />
          <button 
            onClick={toggleMobileMenu}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full",
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            )}
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveView(item.id);
                    toggleMobileMenu();
                  }}
                  className={cn(
                    "flex items-center w-full p-3 rounded-md transition-colors",
                    activeView === item.id 
                      ? isDarkMode ? "bg-gray-700" : "bg-[#EDE6D6]" 
                      : isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  )}
                >
                  <item.icon 
                    size={20} 
                    className={cn(
                      activeView === item.id ? "text-[#D11B19]" : "text-gray-500"
                    )} 
                  />
                  <span 
                    className={cn(
                      "ml-3 font-medium",
                      activeView === item.id ? "text-[#D11B19]" : ""
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile user profile */}
        <div className={cn(
          "border-t p-4",
          isDarkMode ? "border-gray-700" : "border-gray-200"
        )}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="truncate">
              <p className="text-sm font-medium truncate">
                {user?.email || "Utilisateur"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={cn(
        "flex-1 flex flex-col overflow-y-auto",
        isDarkMode ? "bg-gray-900" : "bg-[#F8F8F8]"
      )}>
        {/* Desktop header with search */}
        <header className={cn(
          "hidden md:flex items-center h-16 px-6 border-b",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <div className="w-full max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Rechercher des recettes, ingrédients..." 
              className={cn(
                "pl-10 h-9 w-full",
                isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-transparent"
              )}
            />
          </div>
        </header>

        {/* Content area with padding for mobile header */}
        <div className="md:p-6 p-4 pt-20 md:pt-4 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
