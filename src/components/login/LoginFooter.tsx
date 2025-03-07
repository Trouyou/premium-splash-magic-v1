
import React from 'react';

const LoginFooter = () => {
  return (
    <>
      <div className="text-center mt-8">
        <p className="text-gray-700">
          Pas encore de compte?{" "}
          <button className="text-eatly-secondary font-semibold hover:underline">
            S'inscrire
          </button>
        </p>
      </div>

      <div className="mt-12 text-center text-xs text-gray-500">
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">Conditions d'utilisation</a>
          <span>•</span>
          <a href="#" className="hover:underline">Politique de confidentialité</a>
        </div>
      </div>
    </>
  );
};

export default LoginFooter;
