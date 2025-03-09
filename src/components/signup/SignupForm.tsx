
import { useState, useEffect } from 'react';
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
  const { signUp, isLoading, error } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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

      <form onSubmit={handleSignup} className="space-y-4" noValidate>
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
