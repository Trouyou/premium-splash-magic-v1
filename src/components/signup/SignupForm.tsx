
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
import { isDevMode } from '@/components/auth/simulators/signup/FormValidator';
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
  const devMode = isDevMode();

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
    
    // In dev mode with explicit flag, skip validation and proceed directly
    if (devMode && window.location.search.includes('dev=true')) {
      try {
        console.log('[DEV MODE] Proceeding with signup in dev mode without validation');
        await signUp(
          email || 'dev@example.com', 
          password || 'password123', 
          firstName || 'Dev', 
          lastName || 'User'
        );
        navigate('/onboarding');
        return;
      } catch (error) {
        console.error("[DEV MODE] Erreur d'inscription:", error);
      }
    }
    
    // Normal validation for production or dev mode without explicit bypass
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

  const handleSocialSignup = (provider: string) => {
    if (devMode) {
      console.log(`[DEV MODE] Social signup with ${provider}`);
      toast({
        title: "Connexion simulée",
        description: `Connexion avec ${provider} réussie en mode développement`,
      });
      
      // In dev mode, simulate a successful login and redirect
      setTimeout(() => {
        navigate('/onboarding');
      }, 1000);
    } else {
      toast({
        title: "Non disponible",
        description: `L'authentification via ${provider} n'est pas encore disponible.`,
        variant: "destructive"
      });
    }
  };

  return (
    <>
      {devMode && (
        <div className="dev-mode-message">
          <strong>Mode Développement Actif</strong>
          <p>Vous pouvez vous inscrire sans remplir les champs en mode développement.</p>
          {!window.location.search.includes('dev=true') && (
            <p>Ajoutez <code>?dev=true</code> à l'URL pour un bypass complet de la validation.</p>
          )}
        </div>
      )}
      
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
        
        {/* Social Authentication Buttons */}
        <div className="social-auth-container">
          <div className="social-separator">
            <hr />
            <span>ou inscrivez-vous avec</span>
          </div>
          
          <div className="social-buttons-wrapper">
            <button 
              type="button" 
              className="social-auth-button google-auth"
              onClick={() => handleSocialSignup('Google')}
            >
              <span className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="#FFFFFF">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                </svg>
              </span>
              <span className="social-text">Google</span>
            </button>
            
            <button 
              type="button" 
              className="social-auth-button apple-auth"
              onClick={() => handleSocialSignup('Apple')}
            >
              <span className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="#FFFFFF">
                  <path d="M16.2294 0c0.0366 1.742-0.4935 3.4595-1.5395 4.7341-1.046 1.2747-2.5906 2.0208-4.3541 1.9083-0.0427-1.7112 0.5227-3.4133 1.5343-4.6817 1.0117-1.2684 2.6044-2.0359 4.3593-1.9607zM23.7212 18.0842c0.4027 1.9283-3.5995 5.7405-6.9341 5.9158-1.4158 0.0748-2.4923-0.3297-3.5344-0.72-1.0578-0.3941-2.0813-0.7738-3.4432-0.7753-1.321-0.0015-2.3361 0.3728-3.4028 0.7598-1.0785 0.392-2.1667 0.7893-3.641 0.7296-3.0256-0.1258-6.5608-3.2588-7.7232-8.4623-0.5991-2.6849-0.4022-7.0258 1.929-9.9149 0.9989-1.2348 2.3593-2.2544 3.9608-2.309 1.5117-0.0517 2.4662 0.3826 3.3363 0.7828 0.8451 0.3895 1.6139 0.7421 2.8423 0.7421 1.1726 0 1.9221-0.3462 2.7607-0.739 0.8701-0.4076 1.8533-0.8667 3.4979-0.8242 1.5117 0.04 2.8784 0.6097 3.913 1.3784 0.1887 0.1406 0.9562 0.7753 1.1832 0.9673-3.0941 1.8153-2.6536 6.3699 0.2845 7.661z"/>
                </svg>
              </span>
              <span className="social-text">Apple</span>
            </button>
            
            <button 
              type="button" 
              className="social-auth-button facebook-auth"
              onClick={() => handleSocialSignup('Facebook')}
            >
              <span className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="#FFFFFF">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
                </svg>
              </span>
              <span className="social-text">Facebook</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
