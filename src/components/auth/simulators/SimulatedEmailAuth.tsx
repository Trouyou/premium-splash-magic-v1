import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  isPreviewEnvironment, 
  simulateEmailSignIn
} from '@/utils/auth-simulator';
import { useToast } from '@/hooks/use-toast';
import { translateErrorMessage, setupFormValidation, defaultErrorMessages } from '@/utils/error-messages';
import { useAuth } from '@/context/AuthContext';

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
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  const { hasCompletedOnboarding } = useAuth();
  
  useEffect(() => {
    setupFormValidation();
    console.log("SimulatedEmailAuth: Form validation setup complete");
  }, []);
  
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    let isValid = true;
    
    if (!email) {
      errors.email = defaultErrorMessages.required;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = defaultErrorMessages.email;
      isValid = false;
    }
    
    if (!password) {
      errors.password = defaultErrorMessages.required;
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPreviewEnvironment()) return;
    
    if (!validateForm()) {
      return;
    }
    
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
        const hasCompleted = localStorage.getItem(`onboarding_completed_${user.id}`);
        if (hasCompleted === 'true') {
          navigate("/dashboard");
        } else {
          navigate("/onboarding");
        }
      }
    } catch (error: any) {
      const translatedError = translateErrorMessage(error.message || "Erreur lors de la connexion");
      setError(translatedError);
      toast({
        variant: "destructive",
        title: "Échec de la connexion",
        description: translatedError,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (field: string, value: string) => {
    if (field === 'email') {
      setEmail(value);
    } else if (field === 'password') {
      setPassword(value);
    }
    
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
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
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Email"
            className={`w-full px-4 py-3 border ${formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all`}
            required
            aria-invalid={!!formErrors.email}
            aria-describedby={formErrors.email ? "email-error" : undefined}
          />
          {formErrors.email && (
            <div id="email-error" className="text-red-600 text-sm mt-1">
              {formErrors.email}
            </div>
          )}
        </div>
        
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Mot de passe"
            className={`w-full px-4 py-3 border ${formErrors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all`}
            required
            aria-invalid={!!formErrors.password}
            aria-describedby={formErrors.password ? "password-error" : undefined}
          />
          {formErrors.password && (
            <div id="password-error" className="text-red-600 text-sm mt-1">
              {formErrors.password}
            </div>
          )}
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

export default SimulatedEmailAuth;
