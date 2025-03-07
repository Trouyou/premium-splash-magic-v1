
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Simuler un délai de connexion
    await new Promise(resolve => setTimeout(resolve, 1200));

    if (email && password) {
      // Simuler une connexion réussie
      localStorage.setItem('isLoggedIn', 'true');
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      }
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur votre espace Eatly",
      });
      navigate('/');
    } else {
      setError('Une erreur s\'est produite pendant la connexion. Merci de vérifier vos identifiants.');
    }

    setIsSubmitting(false);
  };

  return (
    <>
      {/* Message d'erreur */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 text-eatly-primary p-3 rounded-md mb-4 text-sm flex items-start"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-0.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          {error}
        </motion.div>
      )}

      {/* Formulaire */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary outline-none transition-all"
              required
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
          disabled={isSubmitting}
          className={`w-full py-3 px-4 bg-eatly-primary text-white rounded-lg font-avantgarde tracking-wide transition-all ${
            isSubmitting ? "opacity-80" : "hover:bg-eatly-secondary"
          } flex justify-center items-center`}
        >
          {isSubmitting ? (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {isSubmitting ? "Connexion en cours..." : "Se connecter"}
        </button>

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="newsletter"
            checked={newsletter}
            onChange={() => setNewsletter(!newsletter)}
            className="h-4 w-4 text-eatly-primary border-gray-300 rounded focus:ring-eatly-primary"
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
