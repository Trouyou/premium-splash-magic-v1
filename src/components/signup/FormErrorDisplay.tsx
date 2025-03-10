
import { motion } from 'framer-motion';

interface FormErrorDisplayProps {
  error: string;
  className?: string;
  id?: string;
}

const FormErrorDisplay = ({ error, className = "", id }: FormErrorDisplayProps) => {
  if (!error) return null;
  
  // Suppression des doublons d'icônes dans le texte d'erreur
  const cleanError = error.replace(/!([^!]*)!/, '$1');
  
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-[#D11B19] text-sm flex items-start mt-1 error-message ${className}`}
      role="alert"
      data-testid="error-message"
    >
      <span>{cleanError}</span>
    </motion.div>
  );
};

export default FormErrorDisplay;
