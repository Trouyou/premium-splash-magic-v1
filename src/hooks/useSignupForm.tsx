import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getSignupFormError, translateErrorMessage } from '@/utils/error-messages';

export interface SignupFormState {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  birthdate: string | null;
  birthdateValid: boolean;
  acceptTerms: boolean;
  newsletter: boolean;
  showPassword: boolean;
}

export interface SignupFormErrors {
  formError: string;
  birthdateError: string;
}

export const useSignupForm = () => {
  const [formState, setFormState] = useState<SignupFormState>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    birthdate: null,
    birthdateValid: true,
    acceptTerms: false,
    newsletter: false,
    showPassword: false
  });
  
  const [errors, setErrors] = useState<SignupFormErrors>({
    formError: '',
    birthdateError: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp, isLoading, error } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const safetyTimeoutRef = useRef<number | null>(null);
  const maxSubmitTime = 5000; // Max time to wait for submission (5 seconds)

  // Update individual form fields
  const updateField = <K extends keyof SignupFormState>(field: K, value: SignupFormState[K]) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  // Handle birthdate changes
  const handleBirthdateChange = (date: string | null) => {
    updateField('birthdate', date);
    if (date) {
      setErrors(prev => ({ ...prev, birthdateError: '' }));
    }
  };
  
  // Handle birthdate validation
  const handleBirthdateValidation = (isValid: boolean) => {
    updateField('birthdateValid', isValid);
    if (!isValid && formState.birthdate) {
      setErrors(prev => ({ ...prev, birthdateError: 'Vous devez avoir au moins 18 ans' }));
    } else {
      setErrors(prev => ({ ...prev, birthdateError: '' }));
    }
  };

  // Validate the form
  const validateForm = () => {
    // Reset previous errors
    setErrors({ formError: '', birthdateError: '' });
    
    // Validate birthdate
    if (!formState.birthdate || !formState.birthdateValid) {
      setErrors(prev => ({ 
        ...prev, 
        birthdateError: 'Veuillez indiquer une date de naissance valide (18 ans minimum)' 
      }));
      return false;
    }
    
    // Validate other fields
    const validationError = getSignupFormError({
      password: formState.password,
      confirmPassword: formState.confirmPassword,
      acceptTerms: formState.acceptTerms
    });
    
    if (validationError) {
      setErrors(prev => ({ ...prev, formError: validationError }));
      return false;
    }
    
    // Check required fields
    if (!formState.email || !formState.firstName || !formState.lastName) {
      setErrors(prev => ({ ...prev, formError: 'Veuillez remplir tous les champs obligatoires' }));
      return false;
    }
    
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
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
        signUp(formState.email, formState.password, formState.firstName, formState.lastName),
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
    } catch (error: any) {
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

  return {
    formState,
    errors,
    isSubmitting,
    isLoading,
    error,
    updateField,
    handleBirthdateChange,
    handleBirthdateValidation,
    handleSubmit
  };
};
