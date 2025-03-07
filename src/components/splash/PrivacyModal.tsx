
import { motion } from 'framer-motion';

interface PrivacyModalProps {
  isVisible: boolean;
  onAccept: () => void;
  onRefuse: () => void;
}

const PrivacyModal = ({ isVisible, onAccept, onRefuse }: PrivacyModalProps) => {
  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex justify-center items-center bg-black/20 backdrop-blur-sm z-[10000]"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-white rounded-xl w-[90%] max-w-[500px] p-9 shadow-lg flex flex-col items-center relative"
      >
        <div className="h-24 mb-6 flex justify-center items-center">
          {/* Nouveau logo Eatly avec la marmite */}
          <img 
            src="/lovable-uploads/e706ec0e-a8ca-4aaa-ae67-be497a1460ef.png" 
            alt="Eatly Logo" 
            className="h-full object-contain"
          />
        </div>
        
        <h3 className="font-avantgarde text-xl text-eatly-secondary mb-4">Confidentialité</h3>
        <div className="w-full h-px bg-eatly-light my-5" />
        <p className="font-playfair text-base leading-relaxed opacity-90 mb-7 text-center">
          Eatly respecte votre vie privée. Voulez-vous partager des données d'utilisation anonymes pour améliorer votre expérience?
        </p>
        <div className="flex gap-4 sm:flex-row flex-col w-full justify-center">
          <button 
            className="px-7 py-3.5 rounded-lg font-avantgarde text-base font-medium bg-gray-600 text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            onClick={onRefuse}
          >
            Refuser
          </button>
          <button 
            className="px-7 py-3.5 rounded-lg font-avantgarde text-base font-medium bg-eatly-primary text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            onClick={onAccept}
          >
            Accepter
          </button>
        </div>
        <a href="#" className="font-playfair text-sm text-eatly-secondary mt-5 no-underline hover:underline">
          En savoir plus sur notre politique de confidentialité
        </a>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyModal;
