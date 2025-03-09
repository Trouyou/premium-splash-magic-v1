
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { translateErrorMessage, getSignupFormError, setupFormValidation } from '@/utils/error-messages';
import BirthdateSelector from './BirthdateSelector';
import FormErrorDisplay from './FormErrorDisplay';
import PasswordInput from './PasswordInput';
import TermsAndNewsletter from './TermsAndNewsletter';
import SignupButton from './SignupButton';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState<string | null>(null);
  const [birthdateValid, setBirthdateValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [formError, setFormError] = useState('');
  const { signUp, isLoading, error } = useAuth();

  // Setup pour la validation des formulaires personnalisée
  useEffect(() => {
    setupFormValidation();
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Utiliser la fonction d'aide pour obtenir les erreurs de validation du formulaire
    const validationError = getSignupFormError({
      password,
      confirmPassword,
      acceptTerms
    });
    
    if (validationError) {
      setFormError(validationError);
      return;
    }
    
    // Vérifier la validation de la date de naissance
    if (!birthdate || !birthdateValid) {
      setFormError('Veuillez indiquer une date de naissance valide (18 ans minimum)');
      return;
    }
    
    // Si pas d'erreur, effacer l'erreur précédente et continuer
    setFormError('');
    await signUp(email, password, firstName, lastName);
  };

  // Gérer le changement de date de naissance
  const handleBirthdateChange = (date: string | null) => {
    setBirthdate(date);
  };
  
  // Gérer la validation de la date de naissance
  const handleBirthdateValidation = (isValid: boolean) => {
    setBirthdateValid(isValid);
  };

  // Traduire le message d'erreur provenant de l'authentification
  const displayError = formError || (error ? translateErrorMessage(error) : '');

  return (
    <>
      <FormErrorDisplay error={displayError} />

      <form onSubmit={handleSignup} className="space-y-4" noValidate>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="w-full">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Prénom"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all"
              required
              onInvalid={(e) => {
                e.preventDefault();
                const input = e.target as HTMLInputElement;
                input.setCustomValidity('Ce champ est requis');
              }}
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                input.setCustomValidity('');
              }}
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Nom"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all"
              required
              onInvalid={(e) => {
                e.preventDefault();
                const input = e.target as HTMLInputElement;
                input.setCustomValidity('Ce champ est requis');
              }}
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                input.setCustomValidity('');
              }}
            />
          </div>
        </div>

        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all"
            required
            onInvalid={(e) => {
              e.preventDefault();
              const input = e.target as HTMLInputElement;
              input.setCustomValidity('Veuillez entrer une adresse email valide');
            }}
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              input.setCustomValidity('');
            }}
          />
        </div>

        {/* Sélecteur de date de naissance */}
        <BirthdateSelector 
          onChange={handleBirthdateChange} 
          onValidate={handleBirthdateValidation} 
        />

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
