
import { useState, useEffect } from 'react';
import FormErrorDisplay from './FormErrorDisplay';
import { defaultErrorMessages } from '@/utils/error-messages';
import { useLegalModal } from '@/hooks/use-legal-modal';
import LegalModal from '@/components/legal/LegalModal';

interface TermsAndNewsletterProps {
  acceptTerms: boolean;
  newsletter: boolean;
  onTermsChange: (value: boolean) => void;
  onNewsletterChange: (value: boolean) => void;
}

const TermsAndNewsletter = ({
  acceptTerms,
  newsletter,
  onTermsChange,
  onNewsletterChange
}: TermsAndNewsletterProps) => {
  const [termsError, setTermsError] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const { isModalOpen, documentType, openPrivacyPolicy, openTermsOfService, closeModal } = useLegalModal();

  useEffect(() => {
    if (isDirty) {
      validateTerms();
    }
  }, [acceptTerms, isDirty]);

  const validateTerms = () => {
    if (!acceptTerms) {
      setTermsError('Veuillez accepter les conditions d\'utilisation');
      return false;
    }
    setTermsError('');
    return true;
  };

  const handleTermsChange = () => {
    setIsDirty(true);
    onTermsChange(!acceptTerms);
  };

  return (
    <>
      <div className="terms-checkbox-container flex items-start my-5 w-full">
        <input
          type="checkbox"
          id="terms-accept"
          checked={acceptTerms}
          onChange={handleTermsChange}
          className={`mt-[3px] mr-[10px] min-w-[18px] h-[18px] text-eatly-primary rounded focus:ring-eatly-primary flex-shrink-0 ${
            termsError ? 'border-eatly-primary bg-red-50' : 'border-gray-300'
          }`}
          required
          aria-invalid={!!termsError}
        />
        <label htmlFor="terms-accept" className="font-avantgarde text-sm leading-relaxed text-[#333333] flex-1 text-left">
          J'accepte les {" "}
          <button 
            type="button" 
            onClick={(e) => {
              e.preventDefault();
              openTermsOfService();
            }} 
            className="text-eatly-primary hover:underline font-medium"
          >
            conditions d'utilisation
          </button>
          {" "} et la {" "}
          <button 
            type="button" 
            onClick={(e) => {
              e.preventDefault();
              openPrivacyPolicy();
            }} 
            className="text-eatly-primary hover:underline font-medium"
          >
            politique de confidentialité
          </button>
        </label>
      </div>
      <div className="pl-7 -mt-3">
        <FormErrorDisplay error={termsError} />
      </div>

      <div className="newsletter-container flex items-start my-5 w-full">
        <input
          type="checkbox"
          id="newsletter-signup"
          name="newsletter-signup"
          checked={newsletter}
          onChange={() => onNewsletterChange(!newsletter)}
          className="newsletter-checkbox mt-[3px] mr-[10px] min-w-[18px] h-[18px] text-eatly-primary border-gray-300 rounded focus:ring-eatly-primary flex-shrink-0 cursor-pointer"
        />
        <label
          htmlFor="newsletter-signup"
          className="newsletter-text font-avantgarde text-sm leading-relaxed text-[#333333] flex-1 text-left cursor-pointer"
        >
          Oui, je souhaite recevoir des offres personnalisées et des conseils nutritionnels
        </label>
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

export default TermsAndNewsletter;
