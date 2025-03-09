import React, { useState, useEffect } from 'react';
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
  
  useEffect(() => {
    setupFormValidation();
    console.log("SimulatedSignUpForm: Form validation setup complete");
  }, []);
  
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
    
    console.log("Form submitted, validating...");
    if (!validateForm()) {
      console.log("Form validation failed:", fieldErrors);
      return;
    }
    
    setFormError(null);
    setIsLoading(true);
    
    try {
      const user = await simulateSignUp(
        email, 
        password, 
        firstName, 
        lastName, 
        birthdate || undefined
      );
      
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
