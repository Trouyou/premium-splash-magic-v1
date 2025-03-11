import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import FormErrorDisplay from './FormErrorDisplay';
import { defaultErrorMessages } from '@/utils/error-messages';

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
  const location = useLocation();
  
  // Get current path for returnTo parameter
  const currentPath = location.pathname;

  const validateTerms = useCallback(() => {
    if (!acceptTerms) {
      setTermsError('Veuillez accepter les conditions d\'utilisation');
      return false;
    }
    setTermsError('');
    return true;
  }, [acceptTerms]);

  useEffect(() => {
    if (isDirty) {
      validateTerms();
    }
  }, [acceptTerms, isDirty, validateTerms]);

  const handleTermsChange = () => {
    setIsDirty(true);
    onTermsChange(!acceptTerms);
  };

  return (
    <div className="relative">
      <div className="flex items-start my-5 w-full">
        <div className="flex-shrink-0 mt-[3px]">
          <input
            type="checkbox"
            id="terms-accept"
            checked={acceptTerms}
            onChange={handleTermsChange}
            className={`min-w-[18px] h-[18px] text-eatly-primary rounded focus:ring-eatly-primary ${
              termsError ? 'border-eatly-primary bg-red-50' : 'border-gray-300'
            }`}
            required
            aria-invalid={!!termsError}
          />
        </div>
        <label htmlFor="terms-accept" className="font-avantgarde text-sm leading-relaxed text-[#333333] ml-[10px] flex-1 text-left">
          J'accepte les {" "}
          <a 
            href={`/conditions-utilisation.html?returnTo=${encodeURIComponent(currentPath)}`} 
            target="_blank" 
            className="text-eatly-primary hover:underline font-medium"
          >
            conditions d'utilisation
          </a>
          {" "} et la {" "}
          <a 
            href={`/politique-confidentialite.html?returnTo=${encodeURIComponent(currentPath)}`} 
            target="_blank" 
            className="text-eatly-primary hover:underline font-medium"
          >
            politique de confidentialité
          </a>
        </label>
      </div>
      {termsError && (
        <div className="absolute left-7 -bottom-5">
          <FormErrorDisplay error={termsError} />
        </div>
      )}

      <div className="flex items-start mt-8 mb-5 w-full">
        <div className="flex-shrink-0 mt-[3px]">
          <input
            type="checkbox"
            id="newsletter-signup"
            name="newsletter-signup"
            checked={newsletter}
            onChange={() => onNewsletterChange(!newsletter)}
            className="min-w-[18px] h-[18px] text-eatly-primary border-gray-300 rounded focus:ring-eatly-primary cursor-pointer"
          />
        </div>
        <label
          htmlFor="newsletter-signup"
          className="font-avantgarde text-sm leading-relaxed text-[#333333] ml-[10px] flex-1 text-left cursor-pointer"
        >
          Oui, je souhaite recevoir des offres personnalisées et des conseils nutritionnels
        </label>
      </div>
    </div>
  );
};

export default TermsAndNewsletter;
