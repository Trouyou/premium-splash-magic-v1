import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  isPreviewEnvironment, 
  simulateSignIn
} from '@/utils/auth-simulator';
import { useToast } from '@/hooks/use-toast';
import { SignInResource } from '@clerk/types';
import { Button } from '@/components/ui/button';

interface SocialAuthProvider {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface SimulatedSocialButtonProps {
  provider: SocialAuthProvider;
  onSuccess?: (result: SignInResource) => void;
  onError?: (error: Error) => void;
}

export const SimulatedSocialButton: React.FC<SimulatedSocialButtonProps> = ({ 
  provider, 
  onSuccess, 
  onError 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleClick = () => {
    if (!isPreviewEnvironment()) return;
    
    setIsLoading(true);
    try {
      simulateSignIn(
        provider.id,
        (result) => {
          setIsLoading(false);
          
          toast({
            title: "Connexion réussie",
            description: `Bienvenue ${result.firstName} (simulation)`,
          });
          
          if (typeof onSuccess === 'function') {
            onSuccess(result);
          } else {
            // Redirection par défaut
            navigate("/");
          }
        },
        onError
      );
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Échec de la connexion",
        description: "Une erreur est survenue lors de la connexion simulée",
      });
    }
  };
  
  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2 py-6"
      onClick={handleClick}
    >
      {provider.icon}
      <span>Continuer avec {provider.name}</span>
    </Button>
  );
};

export default SimulatedSocialButton;
