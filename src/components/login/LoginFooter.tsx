
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginFooter = () => {
  const navigate = useNavigate();
  
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

      <div className="mt-12 text-center text-xs text-gray-500">
        <div className="flex justify-center space-x-4">
          <a href="#terms" className="hover:underline">Conditions d'utilisation</a>
          <span>•</span>
          <a href="#privacy" className="hover:underline">Politique de confidentialité</a>
        </div>
      </div>
    </>
  );
};

export default LoginFooter;
