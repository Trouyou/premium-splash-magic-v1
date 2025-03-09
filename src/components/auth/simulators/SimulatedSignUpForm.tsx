
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  isPreviewEnvironment, 
  simulateSignUp
} from '@/utils/auth-simulator';
import { useToast } from '@/hooks/use-toast';
import { setupFormValidation } from '@/utils/error-translator';
import BirthdateSelector from '@/components/signup/BirthdateSelector';
import FormInputField from './signup/FormInputField';
import PasswordInputField from './signup/PasswordInputField';
import CheckboxField from './signup/CheckboxField';
import FormErrorBanner from './signup/FormErrorBanner';
import SubmitButton from './signup/SubmitButton';
import { validateSignUpForm, hasErrors, ValidationErrors } from './signup/FormValidator';
import { SignUpFormProps } from './signup/types';

export const SimulatedSignUpForm = ({ 
  onSuccess,
  className
}: SignUpFormProps) => {
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdate, setBirthdate] = useState<string | null>(null);
  const [birthdateValid, setBirthdateValid] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const safetyTimeoutRef = useRef<number | null>(null);
  
  useEffect(() => {
    setupFormValidation();
    console.log("SimulatedSignUpForm: Form validation setup complete");
  }, []);

  // Safety mechanism to prevent the UI from getting stuck
  useEffect(() => {
    return () => {
      // Clean up any pending timeouts when component unmounts
      if (safetyTimeoutRef.current) {
        window.clearTimeout(safetyTimeoutRef.current);
      }
    };
  }, []);
  
  // Additional safety mechanism - reset button state if stuck
  useEffect(() => {
    let lastActivity = Date.now();
    const recordActivity = () => { lastActivity = Date.now(); };
    
    // Record user interactions
    document.addEventListener('mousemove', recordActivity);
    document.addEventListener('keydown', recordActivity);
    document.addEventListener('click', recordActivity);
    
    // Check for stuck states periodically
    const intervalId = setInterval(() => {
      // If no activity for 10 seconds and button is still in loading state
      if (Date.now() - lastActivity > 10000 && isLoading) {
        console.log('Potential stuck state detected - resetting form state');
        setIsLoading(false);
      }
    }, 2000);
    
    return () => {
      document.removeEventListener('mousemove', recordActivity);
      document.removeEventListener('keydown', recordActivity);
      document.removeEventListener('click', recordActivity);
      clearInterval(intervalId);
    };
  }, [isLoading]);
  
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
  
  // Handle birthdate change
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
  
  // Handle birthdate validation
  const handleBirthdateValidation = (isValid: boolean) => {
    setBirthdateValid(isValid);
  };
  
  const validateForm = () => {
    const formData = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      birthdate,
      birthdateValid,
      acceptTerms
    };
    
    const errors = validateSignUpForm(formData);
    setFieldErrors(errors);
    
    return !hasErrors(errors);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPreviewEnvironment()) return;
    
    // Prevent multiple submissions
    if (isLoading) return;
    
    console.log("Form submitted, validating...");
    if (!validateForm()) {
      console.log("Form validation failed:", fieldErrors);
      return;
    }
    
    setFormError(null);
    setIsLoading(true);
    
    // Safety timeout - reset form after 5 seconds max to prevent UI from getting stuck
    safetyTimeoutRef.current = window.setTimeout(() => {
      console.log('Safety timeout triggered - resetting form state');
      setIsLoading(false);
    }, 5000);
    
    try {
      const user = await simulateSignUp(
        email, 
        password, 
        firstName, 
        lastName, 
        birthdate || undefined
      );
      
      // Clear safety timeout as signup was successful
      if (safetyTimeoutRef.current) {
        window.clearTimeout(safetyTimeoutRef.current);
      }
      
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
      const errorMessage = error.message || "Erreur lors de l'inscription";
      setFormError(errorMessage);
      toast({
        variant: "destructive",
        title: "Échec de l'inscription",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
      
      // Clear safety timeout
      if (safetyTimeoutRef.current) {
        window.clearTimeout(safetyTimeoutRef.current);
        safetyTimeoutRef.current = null;
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <FormErrorBanner error={formError || ''} />
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInputField
            type="text"
            value={firstName}
            onChange={(value) => handleInputChange('firstName', value)}
            placeholder="Prénom"
            error={fieldErrors.firstName}
            required
          />
          
          <FormInputField
            type="text"
            value={lastName}
            onChange={(value) => handleInputChange('lastName', value)}
            placeholder="Nom"
            error={fieldErrors.lastName}
            required
          />
        </div>
        
        <FormInputField
          type="email"
          value={email}
          onChange={(value) => handleInputChange('email', value)}
          placeholder="Email"
          error={fieldErrors.email}
          required
        />
        
        {/* Sélecteur de date de naissance */}
        <BirthdateSelector 
          onChange={handleBirthdateChange}
          onValidate={handleBirthdateValidation}
          errorMessage={fieldErrors.birthdate}
        />
        
        <PasswordInputField
          value={password}
          onChange={(value) => handleInputChange('password', value)}
          placeholder="Mot de passe"
          error={fieldErrors.password}
          required
          showPasswordState={[showPassword, setShowPassword]}
        />
        
        <PasswordInputField
          value={confirmPassword}
          onChange={(value) => handleInputChange('confirmPassword', value)}
          placeholder="Confirmer le mot de passe"
          error={fieldErrors.confirmPassword}
          required
          showPasswordState={[showPassword, setShowPassword]}
        />
        
        <CheckboxField
          id="terms-accept"
          checked={acceptTerms}
          onChange={(checked) => handleInputChange('terms', checked)}
          label={
            <>
              J'accepte les <a href="#terms" className="text-eatly-primary hover:underline font-medium">conditions d'utilisation</a> et la <a href="#privacy" className="text-eatly-primary hover:underline font-medium">politique de confidentialité</a>
            </>
          }
          error={fieldErrors.terms}
          required
        />
        
        <CheckboxField
          id="newsletter-signup"
          checked={newsletter}
          onChange={(checked) => handleInputChange('newsletter', checked)}
          label="Oui, je souhaite recevoir des offres personnalisées et des conseils nutritionnels"
        />
        
        <SubmitButton 
          isLoading={isLoading}
          label="S'inscrire"
          loadingLabel="Inscription en cours..."
        />
      </div>
    </form>
  );
};

export default SimulatedSignUpForm;
