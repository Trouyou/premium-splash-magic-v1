
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingProvider } from '@/context/OnboardingContext';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import { useAuth } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const OnboardingEdit: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  const handleBackToDashboard = () => {
    navigate('/');
  };
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }
  
  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-white overflow-x-hidden">
        <Toaster />
        
        <motion.div 
          className="fixed top-4 left-4 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button 
            onClick={handleBackToDashboard}
            className="flex items-center text-gray-600 hover:text-[#D11B19] transition-colors"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span className="font-avantgarde">Retour</span>
          </button>
        </motion.div>
        
        <div className="pt-16">
          <motion.h1
            className="text-2xl font-bold font-playfair text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Modifier mes préférences
          </motion.h1>
          <OnboardingFlow />
        </div>
      </div>
    </OnboardingProvider>
  );
};

export default OnboardingEdit;
