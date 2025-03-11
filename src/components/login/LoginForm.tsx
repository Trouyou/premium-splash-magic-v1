
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { isPreviewEnvironment } from '@/utils/auth-simulator';
import { SimulatedEmailAuth } from '@/components/auth/AuthSimulator';
import { PreviewModeBanner } from '@/components/auth/AuthSimulator';
import { translateErrorMessage, setupFormValidation, defaultErrorMessages } from '@/utils/error-messages';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { signInWithEmail, isLoading, error, isAuthenticated, hasCompletedOnboarding } = useAuth();
  const navigate = useNavigate();

  const inPreviewMode = isPreviewEnvironment();

  useEffect(() => {
    setupFormValidation();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      try {
        await signInWithEmail(email, password);
        // La redirection sera gérée par le hook ci-dessous
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        }
      } catch (err) {
        // Erreur déjà gérée dans le hook
      }
    }
  };

  // Effet pour gérer la redirection après connexion réussie
  useEffect(() => {
    if (!isLoading && !error && isAuthenticated) {
      if (hasCompletedOnboarding) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
    }
  }, [isLoading, error, isAuthenticated, hasCompletedOnboarding, navigate]);

  if (inPreviewMode) {
    return (
      <>
        <PreviewModeBanner />
        
        <SimulatedEmailAuth />
      </>
    );
  }

  const translatedError = error ? translateErrorMessage(error) : '';

  const isSessionModeError = error && (
    error.includes('single session mode') || 
    error.includes('signed into one account')
  );

  return (
    <>
      {translatedError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 text-eatly-primary p-3 rounded-md mb-4 text-sm flex items-start"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-0.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          {translatedError}
          
          {isSessionModeError && (
            <div className="mt-2 text-xs">
              Pour résoudre ce problème, veuillez vous déconnecter d'abord de votre compte actuel.
            </div>
          )}
        </motion.div>
      )}

      <form onSubmit={handleLogin} className="space-y-4" noValidate>
        <div>
          <div className="relative">
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
        </div>

        <div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all"
              required
              onInvalid={(e) => {
                e.preventDefault();
                const input = e.target as HTMLInputElement;
                input.setCustomValidity(defaultErrorMessages.password);
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
          <div className="flex justify-end mt-1">
            <button type="button" className="text-eatly-secondary text-sm font-playfair hover:underline">
              Mot de passe oublié?
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="h-4 w-4 text-eatly-primary border-gray-300 rounded focus:ring-eatly-primary"
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
            Se souvenir de moi
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
          {isLoading ? "Connexion en cours..." : "Se connecter"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
