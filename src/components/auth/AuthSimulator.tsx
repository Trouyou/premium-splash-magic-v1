
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  isPreviewEnvironment, 
  simulateSignIn, 
  simulateEmailSignIn,
  simulateSignOut, 
  isAuthenticated, 
  getAuthenticatedUser,
  simulateSignUp
} from '@/utils/auth-simulator';
import { useToast } from '@/hooks/use-toast';

// Bouton de connexion social générique simulé
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

// Composant de simulation de connexion par email
export const SimulatedEmailAuth = ({ 
  onSuccess,
  className
}: { 
  onSuccess?: (user: any) => void;
  className?: string;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPreviewEnvironment()) return;
    
    setError(null);
    setIsLoading(true);
    
    try {
      const user = await simulateEmailSignIn(email, password);
      
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
    } catch (error: any) {
      setError(error.message || "Erreur lors de la connexion");
      toast({
        variant: "destructive",
        title: "Échec de la connexion",
        description: error.message || "Veuillez vérifier vos identifiants et réessayer",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={className}>
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all"
            required
          />
        </div>
        
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 bg-eatly-primary text-white rounded-lg font-avantgarde tracking-wide transition-all ${
            isLoading ? "opacity-80" : "hover:bg-eatly-secondary"
          } flex justify-center items-center`}
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {isLoading ? "Connexion en cours..." : "Se connecter"}
        </button>
      </div>
    </form>
  );
};

// Composant de simulation d'inscription
export const SimulatedSignUpForm = ({ 
  onSuccess,
  className
}: { 
  onSuccess?: (user: any) => void;
  className?: string;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPreviewEnvironment()) return;
    
    setError(null);
    setIsLoading(true);
    
    try {
      const user = await simulateSignUp(email, password, firstName, lastName);
      
      toast({
        title: "Inscription réussie",
        description: `Bienvenue ${user.firstName} (simulation)`,
      });
      
      if (typeof onSuccess === 'function') {
        onSuccess(user);
      } else {
        // Redirection par défaut
        navigate("/");
      }
    } catch (error: any) {
      setError(error.message || "Erreur lors de l'inscription");
      toast({
        variant: "destructive",
        title: "Échec de l'inscription",
        description: error.message || "Veuillez vérifier vos informations et réessayer",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={className}>
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Prénom"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all"
          />
          
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Nom"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all"
          />
        </div>
        
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all"
            required
          />
        </div>
        
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 bg-eatly-primary text-white rounded-lg font-avantgarde tracking-wide transition-all ${
            isLoading ? "opacity-80" : "hover:bg-eatly-secondary"
          } flex justify-center items-center`}
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {isLoading ? "Inscription en cours..." : "S'inscrire"}
        </button>
      </div>
    </form>
  );
};

// Composant bouton de déconnexion
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

// Bannière de mode prévisualisation
export const PreviewModeBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isPreviewEnvironment() || !isVisible) return null;
  
  return (
    <div className="bg-yellow-100 border-b border-yellow-200 p-2 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-yellow-600 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-yellow-800">
            Mode prévisualisation activé - Authentification simulée pour Lovable
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-yellow-600 hover:text-yellow-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

// Composant d'état d'authentification
export const AuthStatus = () => {
  if (!isPreviewEnvironment()) return null;
  
  const user = getAuthenticatedUser();
  
  if (!user) return null;
  
  return (
    <div className="flex items-center gap-2 text-sm">
      <span>Connecté en tant que: {user.fullName}</span>
      <SimulatedSignOutButton className="text-sm text-eatly-primary hover:underline">
        Déconnexion
      </SimulatedSignOutButton>
    </div>
  );
};

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
