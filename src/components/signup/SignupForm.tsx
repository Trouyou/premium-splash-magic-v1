
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { translateErrorMessage, getSignupFormError, setupFormValidation, defaultErrorMessages } from '@/utils/error-translator';
import BirthdateSelector from './BirthdateSelector';

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
      {displayError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 text-eatly-primary p-3 rounded-md mb-4 text-sm flex items-start"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-0.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          {displayError}
        </motion.div>
      )}

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
                input.setCustomValidity(defaultErrorMessages.required);
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
                input.setCustomValidity(defaultErrorMessages.required);
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
              input.setCustomValidity(defaultErrorMessages.email);
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

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all"
            required
            minLength={8}
            onInvalid={(e) => {
              e.preventDefault();
              const input = e.target as HTMLInputElement;
              input.setCustomValidity(
                input.value.length === 0 
                  ? defaultErrorMessages.required 
                  : defaultErrorMessages.shortPassword
              );
            }}
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              input.setCustomValidity('');
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmer le mot de passe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all"
            required
            onInvalid={(e) => {
              e.preventDefault();
              const input = e.target as HTMLInputElement;
              input.setCustomValidity(
                input.value.length === 0 
                  ? defaultErrorMessages.required 
                  : defaultErrorMessages.passwordMatch
              );
            }}
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              input.setCustomValidity('');
            }}
          />
        </div>

        <div className="terms-checkbox-container flex items-start my-5 w-full">
          <input
            type="checkbox"
            id="terms-accept"
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
            className="mt-[3px] mr-[10px] min-w-[18px] h-[18px] text-eatly-primary border-gray-300 rounded focus:ring-eatly-primary flex-shrink-0"
            required
            onInvalid={(e) => {
              e.preventDefault();
              const input = e.target as HTMLInputElement;
              input.setCustomValidity(defaultErrorMessages.terms);
            }}
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              input.setCustomValidity('');
            }}
          />
          <label htmlFor="terms-accept" className="font-avantgarde text-sm leading-relaxed text-[#333333] flex-1 text-left">
            J'accepte les <a href="#terms" className="text-eatly-primary hover:underline font-medium">conditions d'utilisation</a> et la <a href="#privacy" className="text-eatly-primary hover:underline font-medium">politique de confidentialité</a>
          </label>
        </div>

        {/* Ajout de la case newsletter */}
        <div className="newsletter-container flex items-start my-5 w-full">
          <input
            type="checkbox"
            id="newsletter-signup"
            name="newsletter-signup"
            checked={newsletter}
            onChange={() => setNewsletter(!newsletter)}
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
      </form>
    </>
  );
};

export default SignupForm;
