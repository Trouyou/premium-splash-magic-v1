
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { translateErrorMessage, getSignupFormError, createLightweightValidator } from '@/utils/error-messages';
import BirthdateSelector from './BirthdateSelector';
import FormErrorDisplay from './FormErrorDisplay';
import PasswordInput from './PasswordInput';
import TermsAndNewsletter from './TermsAndNewsletter';
import SignupButton from './SignupButton';
import InputField from './InputField';
import { useToast } from '@/hooks/use-toast';
import '@/styles/form-errors.css';

// Anti-freeze script that ensures the UI remains responsive
const useAntiFreeze = () => {
  useEffect(() => {
    let lastTime = Date.now();
    let frameId: number;
    
    const checkFreeze = () => {
      const now = Date.now();
      const timeDiff = now - lastTime;
      
      // If more than 5 seconds between frames, we might be frozen
      if (timeDiff > 5000) {
        console.warn('UI freeze detected, attempting recovery');
        
        // Find and reset any disabled buttons
        document.querySelectorAll('button[disabled]').forEach(button => {
          if (button instanceof HTMLButtonElement) {
            button.disabled = false;
          }
        });
      }
      
      lastTime = now;
      frameId = requestAnimationFrame(checkFreeze);
    };
    
    // Start monitoring
    frameId = requestAnimationFrame(checkFreeze);
    
    // Clean up
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);
};

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
  const { signUp, isLoading, error } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  
  // Use the anti-freeze hook to prevent UI freezes
  useAntiFreeze();
  
  // Initialize lightweight form validator
  const validatorRef = useRef<ReturnType<typeof createLightweightValidator> | null>(null);
  
  useEffect(() => {
    // Create the lightweight validator
    const validator = createLightweightValidator({
      maxValidationTime: 2000, // Max time for validation before resetting
    });
    
    // Setup validators
    validator.addValidator('firstName', (value) => {
      if (!value) return 'Ce champ est requis';
      return null;
    })
    .addValidator('lastName', (value) => {
      if (!value) return 'Ce champ est requis';
      return null;
    })
    .addValidator('email', (value) => {
      if (!value) return 'Ce champ est requis';
      if (!/\S+@\S+\.\S+/.test(value)) return 'Adresse email invalide';
      return null;
    })
    .addValidator('password', (value) => {
      if (!value) return 'Ce champ est requis';
      if (value.length < 6) return 'Le mot de passe doit contenir au moins 6 caractères';
      return null;
    })
    .addValidator('confirmPassword', (value, form) => {
      if (!value) return 'Ce champ est requis';
      
      // Find password input
      const passwordInput = form.querySelector('input[name="password"]') as HTMLInputElement;
      if (passwordInput && value !== passwordInput.value) {
        return 'Les mots de passe ne correspondent pas';
      }
      
      return null;
    })
    .addValidator('terms-accept', (value) => {
      if (value !== 'checked') return 'Veuillez accepter les conditions d\'utilisation';
      return null;
    });
    
    // Initialize after a short delay to ensure DOM is ready
    setTimeout(() => {
      validator.initialize();
    }, 100);
    
    // Store the validator in the ref
    validatorRef.current = validator;
    
    return () => {
      // Cleanup will happen automatically
    };
  }, []);
  
  useEffect(() => {
    if (error) {
      const translatedError = translateErrorMessage(error);
      toast({
        title: "Erreur d'inscription",
        description: translatedError,
        variant: "destructive"
      });
    }
  }, [error, toast]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setFormError('');
    setBirthdateError('');
    
    // Basic client-side validation
    if (!birthdate || !birthdateValid) {
      setBirthdateError('Veuillez indiquer une date de naissance valide (18 ans minimum)');
      return;
    }
    
    const validationError = getSignupFormError({
      password,
      confirmPassword,
      acceptTerms
    });
    
    if (validationError) {
      setFormError(validationError);
      return;
    }
    
    try {
      await signUp(email, password, firstName, lastName);
      
      // After successful registration, redirect to onboarding page
      navigate('/onboarding');
    } catch (error) {
      console.error("Erreur d'inscription:", error);
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
        className="space-y-4 lightweight-validation pristine" 
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
          />
          <FormErrorDisplay error={birthdateError} className="mt-1" />
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

        <SignupButton isLoading={isLoading} />
      </form>
    </>
  );
};

export default SignupForm;
