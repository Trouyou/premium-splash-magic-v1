
import { motion } from 'framer-motion';

interface LoadingIndicatorProps {
  isVisible: boolean;
}

const LoadingIndicator = ({ isVisible }: LoadingIndicatorProps) => {
  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999] flex items-center justify-center"
    >
      <div className="h-8 w-8 rounded-full border-2 border-eatly-primary/10 border-t-eatly-primary/60 animate-spin"></div>
    </motion.div>
  );
};

export default LoadingIndicator;
