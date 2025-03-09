
import { motion } from 'framer-motion';

interface FormErrorDisplayProps {
  error: string;
  className?: string;
  id?: string;
}

const FormErrorDisplay = ({ error, className = "", id }: FormErrorDisplayProps) => {
  if (!error) return null;
  
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-[#D11B19] text-sm flex items-start mt-1 error-message ${className}`}
      role="alert"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 mt-0.5 flex-shrink-0"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      <span>{error}</span>
    </motion.div>
  );
};

export default FormErrorDisplay;
