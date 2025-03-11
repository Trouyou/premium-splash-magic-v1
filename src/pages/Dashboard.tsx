
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { isPreviewEnvironment, getAuthenticatedUser } from '@/utils/auth-simulator';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHome from '@/components/dashboard/DashboardHome';
import OrdersView from '@/components/dashboard/OrdersView';
import RecipesView from '@/components/dashboard/RecipesView';
import ProfileView from '@/components/dashboard/profile/ProfileView';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { motion } from 'framer-motion';

const BobView = () => <div className="p-4"><h2 className="text-2xl font-avantgarde mb-4">BOB - Votre assistant culinaire</h2><p>L'assistant BOB est en cours de développement et sera bientôt à votre service.</p></div>;

const Dashboard: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<string>('home');
  const inPreviewMode = isPreviewEnvironment();
  
  useEffect(() => {
    if (!isLoading) {
      if (inPreviewMode) {
        const mockUser = getAuthenticatedUser();
        if (!mockUser) {
          navigate('/login');
        }
        return;
      }
      
      if (!isAuthenticated) {
        navigate('/login');
      }
    }
  }, [isAuthenticated, isLoading, navigate, inPreviewMode]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F8F8]">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 border-4 border-[#EDE6D6] border-t-[#D11B19] rounded-full animate-rotate-loader" />
        </div>
        <motion.p 
          className="text-lg font-avantgarde text-gray-600 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Préparation de votre cuisine personnalisée...
        </motion.p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return <DashboardHome setActiveView={setActiveView} />;
      case 'bob':
        return <BobView />;
      case 'orders':
        return <OrdersView />;
      case 'recipes':
        return <RecipesView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <DashboardHome setActiveView={setActiveView} />;
    }
  };

  return (
    <>
      <Toaster />
      <Sonner />
      <DashboardLayout activeView={activeView} setActiveView={setActiveView}>
        {renderContent()}
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
