
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useClerk } from '@clerk/clerk-react';
import { 
  isPreviewEnvironment,
  simulateSignOut
} from '@/utils/auth-simulator';

export const useSignOut = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signOut: clerkSignOut } = useClerk();

  // Check if we're in preview environment
  const inPreviewMode = isPreviewEnvironment();

  // Sign-out implementation
  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      // Si nous sommes en mode prévisualisation, utiliser la simulation
      if (inPreviewMode) {
        simulateSignOut(() => {
          navigate("/login");
          toast({
            title: "Déconnexion réussie",
            description: "À bientôt ! (simulation)",
          });
          setIsLoading(false);
        });
        return;
      }
      
      await clerkSignOut();
      navigate("/login");
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
    } catch (err: any) {
      console.error("Erreur de déconnexion:", err);
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: "Une erreur est survenue lors de la déconnexion",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signOut: handleSignOut,
    isLoading
  };
};
