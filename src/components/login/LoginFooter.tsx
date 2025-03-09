
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLegalModal } from '@/hooks/use-legal-modal';
import LegalModal from '@/components/legal/LegalModal';

const LoginFooter = () => {
  const navigate = useNavigate();
  const isClerkConfigured = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const { isModalOpen, documentType, openPrivacyPolicy, openTermsOfService, closeModal } = useLegalModal();
  
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
          <button 
            type="button"
            onClick={openTermsOfService}
            className="hover:underline"
          >
            Conditions d'utilisation
          </button>
          <span>•</span>
          <button 
            type="button"
            onClick={openPrivacyPolicy}
            className="hover:underline"
          >
            Politique de confidentialité
          </button>
        </div>
      </div>
      
      {/* Modal for legal documents */}
      {documentType && (
        <LegalModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          documentType={documentType} 
        />
      )}
    </>
  );
};

export default LoginFooter;
