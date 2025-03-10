import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingProvider } from '@/context/OnboardingContext';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import { useAuth } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { isPreviewEnvironment, getAuthenticatedUser } from '@/utils/auth-simulator';

// Animation style for equipment selection
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
  const inPreviewMode = isPreviewEnvironment();
  
  // Check if user is authenticated and new
  useEffect(() => {
    if (!isLoading) {
      // Si nous sommes en mode prévisualisation, vérifier si un utilisateur simulé existe
      if (inPreviewMode) {
        const mockUser = getAuthenticatedUser();
        if (!mockUser) {
          navigate('/login');
        }
        // Utilisateur simulé existe, continuer avec l'onboarding
        return;
      }
      
      // En mode normal, vérifier l'authentification
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }
      
      // Later we can add logic to check if the user is new
      // For now, we assume all users accessing this page are new
    }
  }, [isAuthenticated, isLoading, navigate, inPreviewMode]);
  
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
