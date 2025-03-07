
import { motion } from 'framer-motion';

interface NetworkErrorMessageProps {
  onRefresh: () => void;
}

const NetworkErrorMessage = ({ onRefresh }: NetworkErrorMessageProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl border-2 border-eatly-primary shadow-lg max-w-[90%] w-[400px] text-center"
      >
        <h3 className="font-playfair text-lg mb-4">
          Connexion internet instable. Veuillez vérifier votre connexion.
        </h3>
        <button 
          className="bg-eatly-primary text-white px-7 py-3.5 rounded-lg font-avantgarde text-base font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
          onClick={onRefresh}
        >
          Rafraîchir
        </button>
      </motion.div>
    </div>
  );
};

export default NetworkErrorMessage;
