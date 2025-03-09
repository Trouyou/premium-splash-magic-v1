
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SignupFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get current path for returnTo parameter
  const currentPath = location.pathname;
  
  return (
    <>
      <div className="text-center mt-8">
        <p className="text-gray-700">
          Vous avez déjà un compte?{" "}
          <button 
            className="text-eatly-secondary font-semibold hover:underline"
            onClick={() => navigate('/login')}
          >
            Se connecter
          </button>
        </p>
      </div>

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

export default SignupFooter;
