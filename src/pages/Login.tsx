
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Apple, Facebook } from 'lucide-react';
import LoginAnimation from '@/components/login/LoginAnimation';
import SocialButton from '@/components/login/SocialButton';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
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
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Partie gauche - Animation */}
      <div className="hidden md:flex md:w-3/5 bg-gradient-to-br from-eatly-primary via-eatly-secondary to-eatly-light">
        <LoginAnimation />
      </div>

      {/* Partie droite - Formulaire de connexion */}
      <div className="w-full md:w-2/5 flex flex-col justify-center items-center px-6 py-12 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="font-avantgarde text-3xl text-black mb-2">Connexion</h1>
            <p className="font-playfair text-base text-eatly-secondary">Accédez à votre compte</p>
          </div>

          {/* Boutons de connexion sociale */}
          <div className="space-y-3 mb-6">
            <SocialButton icon={<Apple size={20} />} provider="Apple" onClick={() => setError('Connexion avec Apple non disponible pour le moment')} />
            <SocialButton icon={<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>} provider="Google" onClick={() => setError('Connexion avec Google non disponible pour le moment')} />
            <SocialButton icon={<Facebook size={20} />} provider="Facebook" onClick={() => setError('Connexion avec Facebook non disponible pour le moment')} />
          </div>

          {/* Séparateur */}
          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-gray-300 absolute w-full"></div>
            <span className="bg-white px-4 relative z-10 text-sm text-gray-500 font-playfair">ou</span>
          </div>

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

          {/* Option d'inscription */}
          <div className="text-center mt-8">
            <p className="text-gray-700">
              Pas encore de compte?{" "}
              <button className="text-eatly-secondary font-semibold hover:underline">
                S'inscrire
              </button>
            </p>
          </div>

          {/* Pied de page */}
          <div className="mt-12 text-center text-xs text-gray-500">
            <div className="flex justify-center space-x-4">
              <a href="#" className="hover:underline">Conditions d'utilisation</a>
              <span>•</span>
              <a href="#" className="hover:underline">Politique de confidentialité</a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
