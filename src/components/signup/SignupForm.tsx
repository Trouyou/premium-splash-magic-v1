
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { translateErrorMessage, getSignupFormError } from '@/utils/error-messages';
import BirthdateSelector from './BirthdateSelector';
import FormErrorDisplay from './FormErrorDisplay';
import PasswordInput from './PasswordInput';
import TermsAndNewsletter from './TermsAndNewsletter';
import SignupButton from './SignupButton';
import InputField from './InputField';
import { useToast } from '@/hooks/use-toast';
import '@/styles/form-errors.css';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState<string | null>(null);
  const [birthdateValid, setBirthdateValid] = useState(true);
  const [birthdateError, setBirthdateError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp, isLoading, error } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const safetyTimeoutRef = useRef<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const maxSubmitTime = 5000; // Max time to wait for submission (5 seconds)

  useEffect(() => {
    if (error) {
      const translatedError = translateErrorMessage(error);
      toast({
        title: "Erreur d'inscription",
        description: translatedError,
        variant: "destructive"
      });
      // Ensure the button resets if there's an error
      setIsSubmitting(false);
    }
  }, [error, toast]);

  // Safety mechanism to prevent UI from getting stuck
  useEffect(() => {
    return () => {
      // Clear any pending timeouts when component unmounts
      if (safetyTimeoutRef.current) {
        window.clearTimeout(safetyTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Reset loading state after maximum wait time
    if (isSubmitting) {
      const safetyTimer = window.setTimeout(() => {
        console.log('Safety timeout triggered - resetting form state');
        setIsSubmitting(false);
      }, maxSubmitTime);
      
      return () => window.clearTimeout(safetyTimer);
    }
  }, [isSubmitting]);

  const validateForm = () => {
    // Reset previous errors
    setFormError('');
    setBirthdateError('');
    
    // Validate birthdate
    if (!birthdate || !birthdateValid) {
      setBirthdateError('Veuillez indiquer une date de naissance valide (18 ans minimum)');
      return false;
    }
    
    // Validate other fields
    const validationError = getSignupFormError({
      password,
      confirmPassword,
      acceptTerms
    });
    
    if (validationError) {
      setFormError(validationError);
      return false;
    }
    
    // Check required fields
    if (!email || !firstName || !lastName) {
      setFormError('Veuillez remplir tous les champs obligatoires');
      return false;
    }
    
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Safety timeout - reset form after maxSubmitTime to prevent UI from getting stuck
    safetyTimeoutRef.current = window.setTimeout(() => {
      console.log('Safety timeout triggered - resetting form state');
      setIsSubmitting(false);
    }, maxSubmitTime);
    
    try {
      // Create a promise with timeout to avoid blocking UI
      const signupPromise = Promise.race([
        signUp(email, password, firstName, lastName),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Délai d\'attente dépassé')), maxSubmitTime - 500)
        )
      ]);
      
      await signupPromise;
      
      // Clear safety timeout as signup was successful
      if (safetyTimeoutRef.current) {
        window.clearTimeout(safetyTimeoutRef.current);
      }
      
      // After successful registration, redirect to onboarding page
      navigate('/onboarding');
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      // Reset submission state
      setIsSubmitting(false);
      
      // Show error toast if not already shown by the useEffect
      if (!error.message?.includes('Délai d\'attente dépassé')) {
        toast({
          title: "Erreur d'inscription",
          description: error.message || "Une erreur s'est produite lors de l'inscription",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Erreur d'inscription",
          description: "Le serveur met trop de temps à répondre. Veuillez réessayer.",
          variant: "destructive"
        });
      }
    } finally {
      // Always ensure the button state is reset
      setIsSubmitting(false);
      
      // Clear safety timeout
      if (safetyTimeoutRef.current) {
        window.clearTimeout(safetyTimeoutRef.current);
        safetyTimeoutRef.current = null;
      }
    }
  };

  const handleBirthdateChange = (date: string | null) => {
    setBirthdate(date);
    if (date) {
      setBirthdateError('');
    }
  };
  
  const handleBirthdateValidation = (isValid: boolean) => {
    setBirthdateValid(isValid);
    if (!isValid && birthdate) {
      setBirthdateError('Vous devez avoir au moins 18 ans');
    } else {
      setBirthdateError('');
    }
  };

  return (
    <>
      <FormErrorDisplay error={formError} className="bg-red-50 p-3 rounded-md mb-4" />

      <form 
        ref={formRef}
        onSubmit={handleSignup} 
        className="space-y-4" 
        noValidate
      >
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <InputField
            type="text"
            value={firstName}
            onChange={setFirstName}
            placeholder="Prénom"
            required
            name="firstName"
          />
          <InputField
            type="text"
            value={lastName}
            onChange={setLastName}
            placeholder="Nom"
            required
            name="lastName"
          />
        </div>

        <InputField
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Email"
          required
          name="email"
        />

        <div className="mt-4 birthdate-field-container">
          <BirthdateSelector 
            onChange={handleBirthdateChange} 
            onValidate={handleBirthdateValidation}
            errorMessage={birthdateError}
          />
          {birthdateError && <FormErrorDisplay error={birthdateError} className="mt-1" />}
        </div>

        <PasswordInput 
          password={password}
          confirmPassword={confirmPassword}
          showPassword={showPassword}
          onPasswordChange={setPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onToggleShowPassword={() => setShowPassword(!showPassword)}
        />

        <TermsAndNewsletter
          acceptTerms={acceptTerms}
          newsletter={newsletter}
          onTermsChange={setAcceptTerms}
          onNewsletterChange={setNewsletter}
        />

        <SignupButton isLoading={isSubmitting || isLoading} />
      </form>
    </>
  );
};

export default SignupForm;
