
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { translateErrorMessage, getSignupFormError } from '@/utils/error-messages';
import { isPreviewEnvironment, simulateSignUp } from '@/utils/auth-simulator';
import { useToast } from '@/hooks/use-toast';

export const useSignupForm = () => {
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
  const inPreviewMode = isPreviewEnvironment();

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
    
    setFormError('');
    setBirthdateError('');
    
    try {
      if (inPreviewMode) {
        // En mode simulation, créer un utilisateur et rediriger vers onboarding
        await simulateSignUp(email, password, firstName, lastName, birthdate);
        
        toast({
          title: "Inscription simulée réussie",
          description: "Mode prévisualisation - redirection vers l'onboarding",
        });
        
        navigate('/onboarding');
      } else {
        // En mode réel, s'inscrire et rediriger vers onboarding
        await signUp(email, password, firstName, lastName, birthdate);
        navigate('/onboarding');
      }
    } catch (error: any) {
      console.error("Erreur d'inscription:", error);
      setFormError(error.message || "Une erreur s'est produite lors de l'inscription");
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

  return {
    formState: {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      birthdate,
      birthdateValid,
      birthdateError,
      showPassword,
      acceptTerms,
      newsletter,
      formError,
      isLoading,
      inPreviewMode
    },
    formSetters: {
      setEmail,
      setPassword,
      setConfirmPassword,
      setFirstName,
      setLastName,
      setShowPassword,
      setAcceptTerms,
      setNewsletter
    },
    formHandlers: {
      handleSignup,
      handleBirthdateChange,
      handleBirthdateValidation
    }
  };
};
