
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import HomeTab from '@/components/dashboard/tabs/HomeTab';
import RecipesTab from '@/components/dashboard/tabs/RecipesTab';
import ShoppingListTab from '@/components/dashboard/tabs/ShoppingListTab';
import NutritionTab from '@/components/dashboard/tabs/NutritionTab';
import SettingsTab from '@/components/dashboard/tabs/SettingsTab';
import { useOnboarding } from '@/context/OnboardingContext';
import { useAuth } from '@/context/AuthContext';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type DashboardTab = 'home' | 'recipes' | 'shopping' | 'nutrition' | 'settings';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { onboardingData } = useOnboarding();
  const { isAuthenticated, isLoading } = useAuth();
  const [redirecting, setRedirecting] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Non autorisé",
        description: "Veuillez vous connecter pour accéder au dashboard.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate, toast]);

  // Check if onboarding is completed from localStorage even if context is not updated
  useEffect(() => {
    const checkOnboardingStatus = () => {
      const savedData = localStorage.getItem('onboardingData');
      if (savedData) {
        const data = JSON.parse(savedData);
        return data.onboardingCompleted;
      }
      return false;
    };

    const onboardingCompleted = onboardingData.onboardingCompleted || checkOnboardingStatus();
    
    if (!onboardingCompleted && !redirecting && !isLoading) {
      setRedirecting(true);
      toast({
        title: "Onboarding incomplet",
        description: "Veuillez compléter le processus d'onboarding.",
        variant: "destructive",
      });
      navigate('/onboarding');
    }
  }, [onboardingData, navigate, toast, redirecting, isLoading]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'recipes':
        return <RecipesTab />;
      case 'shopping':
        return <ShoppingListTab />;
      case 'nutrition':
        return <NutritionTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <HomeTab />;
    }
  };

  if (isLoading || redirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F9F5EB]">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-[#EDE6D6] border-t-[#D11B19] rounded-full animate-spin"></div>
          </div>
          <p className="text-[#4A5568]">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F9F5EB]">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleSidebar}
          className="bg-white shadow-md border-[#EDE6D6]"
        >
          <Menu className="h-5 w-5 text-[#D11B19]" />
        </Button>
      </div>

      {/* Sidebar */}
      <DashboardSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content */}
      <motion.main 
        className={`flex-1 p-4 md:p-6 lg:p-8 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto">
          {renderActiveTab()}
        </div>
      </motion.main>
    </div>
  );
};

export default Dashboard;
