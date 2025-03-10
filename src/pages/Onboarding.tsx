
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingProvider } from '@/context/OnboardingContext';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import { useAuth } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';

// Ajout des styles pour l'animation de sélection
const selectPopKeyframe = `
@keyframes selectPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.12); }
  100% { transform: scale(1.08); }
}
`;

const Onboarding: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is authenticated and new
  useEffect(() => {
    if (!isLoading) {
      // If user is not authenticated, redirect to login
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }
      
      // Later we can add logic to check if the user is new
      // For now, we assume all users accessing this page are new
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }
  
  return (
    <OnboardingProvider>
      <style>{selectPopKeyframe}</style>
      <div className="min-h-screen bg-white">
        <Toaster />
        <OnboardingFlow />
      </div>
    </OnboardingProvider>
  );
};

export default Onboarding;
