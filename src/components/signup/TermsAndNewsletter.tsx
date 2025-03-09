
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
  return (
    <>
      <div className="terms-checkbox-container flex items-start my-5 w-full">
        <input
          type="checkbox"
          id="terms-accept"
          checked={acceptTerms}
          onChange={() => onTermsChange(!acceptTerms)}
          className="mt-[3px] mr-[10px] min-w-[18px] h-[18px] text-eatly-primary border-gray-300 rounded focus:ring-eatly-primary flex-shrink-0"
          required
          onInvalid={(e) => {
            e.preventDefault();
            const input = e.target as HTMLInputElement;
            input.setCustomValidity(defaultErrorMessages.terms);
          }}
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.setCustomValidity('');
          }}
        />
        <label htmlFor="terms-accept" className="font-avantgarde text-sm leading-relaxed text-[#333333] flex-1 text-left">
          J'accepte les <a href="#terms" className="text-eatly-primary hover:underline font-medium">conditions d'utilisation</a> et la <a href="#privacy" className="text-eatly-primary hover:underline font-medium">politique de confidentialité</a>
        </label>
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
    </>
  );
};

export default TermsAndNewsletter;
