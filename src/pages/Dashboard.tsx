
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { isPreviewEnvironment, getAuthenticatedUser } from '@/utils/auth-simulator';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHome from '@/components/dashboard/DashboardHome';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<string>('home');
  const inPreviewMode = isPreviewEnvironment();
  
  useEffect(() => {
    if (!isLoading) {
      // Si nous sommes en mode prévisualisation, vérifier si un utilisateur simulé existe
      if (inPreviewMode) {
        const mockUser = getAuthenticatedUser();
        if (!mockUser) {
          navigate('/login');
        }
        // Utilisateur simulé existe, continuer
        return;
      }
      
      // En mode normal, vérifier l'authentification
      if (!isAuthenticated) {
        navigate('/login');
      }
    }
  }, [isAuthenticated, isLoading, navigate, inPreviewMode]);
  
  // Afficher un écran de chargement pendant la vérification
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

  // Sélectionner le contenu à afficher en fonction de la vue active
  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return <DashboardHome />;
      default:
        return <DashboardHome />;
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
