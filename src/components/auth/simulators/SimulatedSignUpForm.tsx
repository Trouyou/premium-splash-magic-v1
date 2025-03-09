import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  isPreviewEnvironment, 
  simulateSignUp
} from '@/utils/auth-simulator';
import { useToast } from '@/hooks/use-toast';
import { translateErrorMessage, setupFormValidation, defaultErrorMessages, getSignupFormError } from '@/utils/error-translator';
import BirthdateSelector from '@/components/signup/BirthdateSelector';

export const SimulatedSignUpForm = ({ 
  onSuccess,
  className
}: { 
  onSuccess?: (user: any) => void;
  className?: string;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState<string | null>(null);
  const [birthdateValid, setBirthdateValid] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    setupFormValidation();
    console.log("SimulatedSignUpForm: Form validation setup complete");
  }, []);
  
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    let isValid = true;
    
    // Validate first name
    if (!firstName.trim()) {
      errors.firstName = defaultErrorMessages.required;
      isValid = false;
    }
    
    // Validate last name
    if (!lastName.trim()) {
      errors.lastName = defaultErrorMessages.required;
      isValid = false;
    }
    
    // Validate email
    if (!email.trim()) {
      errors.email = defaultErrorMessages.required;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = defaultErrorMessages.email;
      isValid = false;
    }
    
    // Validate birthdate
    if (!birthdate || !birthdateValid) {
      errors.birthdate = "Veuillez indiquer une date de naissance valide (18 ans minimum)";
      isValid = false;
    }
    
    // Validate password
    if (!password) {
      errors.password = defaultErrorMessages.required;
      isValid = false;
    } else if (password.length < 6) {
      errors.password = defaultErrorMessages.shortPassword;
      isValid = false;
    }
    
    // Validate confirm password
    if (!confirmPassword) {
      errors.confirmPassword = defaultErrorMessages.required;
      isValid = false;
    } else if (confirmPassword !== password) {
      errors.confirmPassword = defaultErrorMessages.passwordMatch;
      isValid = false;
    }
    
    // Validate terms
    if (!acceptTerms) {
      errors.terms = defaultErrorMessages.terms;
      isValid = false;
    }
    
    setFieldErrors(errors);
    return isValid;
  };
  
  const handleInputChange = (field: string, value: string | boolean) => {
    switch (field) {
      case 'firstName':
        setFirstName(value as string);
        break;
      case 'lastName':
        setLastName(value as string);
        break;
      case 'email':
        setEmail(value as string);
        break;
      case 'password':
        setPassword(value as string);
        break;
      case 'confirmPassword':
        setConfirmPassword(value as string);
        break;
      case 'terms':
        setAcceptTerms(value as boolean);
        break;
      case 'newsletter':
        setNewsletter(value as boolean);
        break;
    }
    
    // Clear error for this field
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  // Gérer le changement de date de naissance
  const handleBirthdateChange = (date: string | null) => {
    setBirthdate(date);
    
    // Clear birthdate error
    if (fieldErrors.birthdate) {
      setFieldErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.birthdate;
        return newErrors;
      });
    }
  };
  
  // Gérer la validation de la date de naissance
  const handleBirthdateValidation = (isValid: boolean) => {
    setBirthdateValid(isValid);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPreviewEnvironment()) return;
    
    console.log("Form submitted, validating...");
    if (!validateForm()) {
      console.log("Form validation failed:", fieldErrors);
      return;
    }
    
    setFormError(null);
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
      const translatedError = translateErrorMessage(error.message || "Erreur lors de l'inscription");
      setFormError(translatedError);
      toast({
        variant: "destructive",
        title: "Échec de l'inscription",
        description: translatedError,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      {formError && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-0.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          {formError}
        </div>
      )}
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Prénom"
              className={`w-full px-4 py-3 border ${fieldErrors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all`}
              required
              aria-invalid={!!fieldErrors.firstName}
              aria-describedby={fieldErrors.firstName ? "firstName-error" : undefined}
            />
            {fieldErrors.firstName && (
              <div id="firstName-error" className="text-red-600 text-sm mt-1">
                {fieldErrors.firstName}
              </div>
            )}
          </div>
          
          <div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Nom"
              className={`w-full px-4 py-3 border ${fieldErrors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all`}
              required
              aria-invalid={!!fieldErrors.lastName}
              aria-describedby={fieldErrors.lastName ? "lastName-error" : undefined}
            />
            {fieldErrors.lastName && (
              <div id="lastName-error" className="text-red-600 text-sm mt-1">
                {fieldErrors.lastName}
              </div>
            )}
          </div>
        </div>
        
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Email"
            className={`w-full px-4 py-3 border ${fieldErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all`}
            required
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {fieldErrors.email && (
            <div id="email-error" className="text-red-600 text-sm mt-1">
              {fieldErrors.email}
            </div>
          )}
        </div>
        
        {/* Sélecteur de date de naissance */}
        <BirthdateSelector 
          onChange={handleBirthdateChange}
          onValidate={handleBirthdateValidation}
          errorMessage={fieldErrors.birthdate}
        />
        
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Mot de passe"
            className={`w-full px-4 py-3 border ${fieldErrors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all`}
            required
            aria-invalid={!!fieldErrors.password}
            aria-describedby={fieldErrors.password ? "password-error" : undefined}
          />
          {fieldErrors.password && (
            <div id="password-error" className="text-red-600 text-sm mt-1">
              {fieldErrors.password}
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
        
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            placeholder="Confirmer le mot de passe"
            className={`w-full px-4 py-3 border ${fieldErrors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all`}
            required
            aria-invalid={!!fieldErrors.confirmPassword}
            aria-describedby={fieldErrors.confirmPassword ? "confirmPassword-error" : undefined}
          />
          {fieldErrors.confirmPassword && (
            <div id="confirmPassword-error" className="text-red-600 text-sm mt-1">
              {fieldErrors.confirmPassword}
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
        
        <div className="terms-checkbox-container flex items-start my-5 w-full">
          <input
            type="checkbox"
            id="terms-accept"
            checked={acceptTerms}
            onChange={(e) => handleInputChange('terms', e.target.checked)}
            className={`mt-[3px] mr-[10px] min-w-[18px] h-[18px] text-eatly-primary border-gray-300 rounded focus:ring-eatly-primary flex-shrink-0 ${fieldErrors.terms ? 'border-red-500' : ''}`}
            required
            aria-invalid={!!fieldErrors.terms}
            aria-describedby={fieldErrors.terms ? "terms-error" : undefined}
          />
          <label htmlFor="terms-accept" className="font-avantgarde text-sm leading-relaxed text-[#333333] flex-1 text-left">
            J'accepte les <a href="#terms" className="text-eatly-primary hover:underline font-medium">conditions d'utilisation</a> et la <a href="#privacy" className="text-eatly-primary hover:underline font-medium">politique de confidentialité</a>
          </label>
        </div>
        {fieldErrors.terms && (
          <div id="terms-error" className="text-red-600 text-sm mt-1">
            {fieldErrors.terms}
          </div>
        )}
        
        {/* Ajout de la case newsletter */}
        <div className="newsletter-container flex items-start my-5 w-full">
          <input
            type="checkbox"
            id="newsletter-signup"
            name="newsletter-signup"
            checked={newsletter}
            onChange={(e) => handleInputChange('newsletter', e.target.checked)}
            className="newsletter-checkbox mt-[3px] mr-[10px] min-w-[18px] h-[18px] text-eatly-primary border-gray-300 rounded focus:ring-eatly-primary flex-shrink-0 cursor-pointer"
          />
          <label
            htmlFor="newsletter-signup"
            className="newsletter-text font-avantgarde text-sm leading-relaxed text-[#333333] flex-1 text-left cursor-pointer"
          >
            Oui, je souhaite recevoir des offres personnalisées et des conseils nutritionnels
          </label>
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

export default SimulatedSignUpForm;
