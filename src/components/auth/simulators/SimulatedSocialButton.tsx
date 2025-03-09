
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  isPreviewEnvironment, 
  simulateSignIn
} from '@/utils/auth-simulator';
import { useToast } from '@/hooks/use-toast';

interface SocialAuthButtonProps {
  provider: 'oauth_google' | 'oauth_facebook' | 'oauth_apple';
  onSuccess?: (user: any) => void;
  icon: React.ReactNode;
  providerName: string;
  className?: string;
  disabled?: boolean;
}

export const SimulatedSocialButton: React.FC<SocialAuthButtonProps> = ({ 
  provider, 
  onSuccess, 
  icon, 
  providerName, 
  className,
  disabled = false 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleClick = () => {
    if (!isPreviewEnvironment()) return;
    
    setIsLoading(true);
    try {
      simulateSignIn(provider, (user) => {
        setIsLoading(false);
        
        toast({
          title: "Connexion réussie",
          description: `Bienvenue ${user.firstName} (simulation)`,
        });
        
        if (typeof onSuccess === 'function') {
          onSuccess(user);
        } else {
          // Redirection par défaut
          navigate("/");
        }
      });
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
    <button
      onClick={handleClick}
      disabled={isLoading || disabled}
      className={className || "w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"}
    >
      <div className="flex items-center justify-center">
        <span className="flex items-center justify-center w-5 h-5 mr-3">{icon}</span>
        <span className="font-avantgarde text-gray-700 text-sm">
          {isLoading ? 'Chargement...' : `Continuer avec ${providerName}`}
        </span>
      </div>
    </button>
  );
};

export default SimulatedSocialButton;
