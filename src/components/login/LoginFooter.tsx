
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isClerkConfigured = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  
  // Get current path for returnTo parameter
  const currentPath = location.pathname;
  
  return (
    <>
      <div className="text-center mt-8">
        <p className="text-gray-700">
          Pas encore de compte?{" "}
          <button 
            className="text-eatly-secondary font-semibold hover:underline"
            onClick={() => navigate('/signup')}
          >
            S'inscrire
          </button>
        </p>
      </div>

      {!isClerkConfigured && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-700 text-xs">
            <strong>Configuration requise:</strong> Pour activer les fonctionnalités d'authentification, 
            vous devez définir la variable d'environnement <code>VITE_CLERK_PUBLISHABLE_KEY</code> dans 
            un fichier <code>.env</code> à la racine du projet.
          </p>
        </div>
      )}

      <div className="mt-12 text-center text-xs text-gray-500">
        <div className="flex justify-center space-x-4">
          <a 
            href={`/conditions-utilisation.html?returnTo=${encodeURIComponent(currentPath)}`}
            target="_blank"
            className="hover:underline text-eatly-primary"
          >
            Conditions d'utilisation
          </a>
          <span>•</span>
          <a 
            href={`/politique-confidentialite.html?returnTo=${encodeURIComponent(currentPath)}`}
            target="_blank"
            className="hover:underline text-eatly-primary"
          >
            Politique de confidentialité
          </a>
        </div>
      </div>
    </>
  );
};

export default LoginFooter;
