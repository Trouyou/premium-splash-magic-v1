
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isPreviewEnvironment, simulateSignIn } from '@/utils/auth-simulator';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface SocialAuthProvider {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface SimulatedSocialButtonProps {
  provider: SocialAuthProvider;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
  disabled?: boolean;
}

export const SimulatedSocialButton: React.FC<SimulatedSocialButtonProps> = ({ 
  provider, 
  onSuccess, 
  onError,
  disabled = false
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
          
          // Use a safe approach to get the username part from the result
          const username = result.identifier ? result.identifier.split('@')[0] : 'user';
          
          toast({
            title: "Connexion réussie",
            description: `Bienvenue ${username} (simulation)`,
          });
          
          if (typeof onSuccess === 'function') {
            onSuccess(result);
          } else {
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
      disabled={disabled || isLoading}
    >
      {provider.icon}
      <span>Continuer avec {provider.name}</span>
    </Button>
  );
};

export default SimulatedSocialButton;
