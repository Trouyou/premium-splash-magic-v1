
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  isPreviewEnvironment, 
  simulateSignOut
} from '@/utils/auth-simulator';
import { useToast } from '@/hooks/use-toast';

export const SimulatedSignOutButton = ({
  onSuccess,
  className,
  children
}: {
  onSuccess?: () => void;
  className?: string;
  children?: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleClick = () => {
    if (!isPreviewEnvironment()) return;
    
    setIsLoading(true);
    simulateSignOut(() => {
      setIsLoading(false);
      
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt ! (simulation)",
      });
      
      if (typeof onSuccess === 'function') {
        onSuccess();
      } else {
        navigate("/login");
      }
    });
  };
  
  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={className || "text-gray-700 hover:text-eatly-primary"}
    >
      {isLoading ? 'Déconnexion...' : (children || 'Déconnexion')}
    </button>
  );
};

export default SimulatedSignOutButton;
