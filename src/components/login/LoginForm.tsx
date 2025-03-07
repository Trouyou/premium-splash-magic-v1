import { useState, FC, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface FormState {
  email: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean;
  newsletter: boolean;
  isSubmitting: boolean;
  error: string;
}

const INITIAL_STATE: FormState = {
  email: '',
  password: '',
  showPassword: false,
  rememberMe: false,
  newsletter: false,
  isSubmitting: false,
  error: ''
};

const INPUT_STYLES = {
  base: "w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all",
  focus: "focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary",
  checkbox: "h-4 w-4 text-eatly-primary border-gray-300 rounded focus:ring-eatly-primary"
};

const BUTTON_STYLES = {
  base: "w-full py-3 px-4 bg-eatly-primary text-white rounded-lg font-avantgarde tracking-wide transition-all flex justify-center items-center",
  hover: "hover:bg-eatly-secondary",
  disabled: "opacity-80"
};

const LoginForm: FC = () => {
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = () => {
    setFormState(prev => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, error: '', isSubmitting: true }));

    try {
      // Simuler un délai de connexion
      await new Promise(resolve => setTimeout(resolve, 1200));

      if (formState.email && formState.password) {
        localStorage.setItem('isLoggedIn', 'true');
        if (formState.rememberMe) {
          localStorage.setItem('rememberedEmail', formState.email);
        }
        
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur votre espace Eatly",
        });
        
        navigate('/');
      } else {
        throw new Error('Veuillez remplir tous les champs requis.');
      }
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        error: 'Une erreur s\'est produite pendant la connexion. Merci de vérifier vos identifiants.'
      }));
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <>
      {formState.error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 text-eatly-primary p-3 rounded-md mb-4 text-sm flex items-start"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-2 mt-0.5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span role="alert">{formState.error}</span>
        </motion.div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <div className="relative">
            <input
              type="email"
              value={formState.email}
              onChange={handleInputChange('email')}
              placeholder="Email"
              className={`${INPUT_STYLES.base} ${INPUT_STYLES.focus}`}
              required
              aria-label="Adresse email"
            />
          </div>
        </div>

        <div>
          <div className="relative">
            <input
              type={formState.showPassword ? "text" : "password"}
              value={formState.password}
              onChange={handleInputChange('password')}
              placeholder="Mot de passe"
              className={`${INPUT_STYLES.base} ${INPUT_STYLES.focus}`}
              required
              aria-label="Mot de passe"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              aria-label={formState.showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {formState.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="flex justify-end mt-1">
            <button 
              type="button" 
              className="text-eatly-secondary text-sm font-playfair hover:underline"
            >
              Mot de passe oublié?
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            checked={formState.rememberMe}
            onChange={handleInputChange('rememberMe')}
            className={INPUT_STYLES.checkbox}
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
            Se souvenir de moi
          </label>
        </div>

        <button
          type="submit"
          disabled={formState.isSubmitting}
          className={`${BUTTON_STYLES.base} ${
            formState.isSubmitting ? BUTTON_STYLES.disabled : BUTTON_STYLES.hover
          }`}
          aria-busy={formState.isSubmitting}
        >
          {formState.isSubmitting && (
            <svg 
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {formState.isSubmitting ? "Connexion en cours..." : "Se connecter"}
        </button>

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="newsletter"
            checked={formState.newsletter}
            onChange={handleInputChange('newsletter')}
            className={INPUT_STYLES.checkbox}
          />
          <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
            Oui, je souhaite recevoir des offres personnalisées et des conseils nutritionnels.
          </label>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
