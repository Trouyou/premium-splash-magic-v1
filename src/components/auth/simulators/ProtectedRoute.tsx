
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  isPreviewEnvironment, 
  isAuthenticated 
} from '@/utils/auth-simulator';

// HOC pour protéger les pages
export function withAuthSimulation<P extends object>(Component: React.ComponentType<P>) {
  return function ProtectedComponent(props: P) {
    const [isChecking, setIsChecking] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
      if (isPreviewEnvironment()) {
        // Vérification pour l'environnement Lovable
        const authenticated = isAuthenticated();
        if (!authenticated) {
          navigate('/login');
          return;
        }
      }
      setIsChecking(false);
    }, [navigate]);
    
    if (isChecking) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <svg className="animate-spin h-8 w-8 text-eatly-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-2 text-gray-600">Vérification de l'authentification...</p>
          </div>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
}

export default withAuthSimulation;
