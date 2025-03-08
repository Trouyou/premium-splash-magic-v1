
import { motion } from 'framer-motion';

interface LoadingIndicatorProps {
  isVisible: boolean;
}

const LoadingIndicator = ({ isVisible }: LoadingIndicatorProps) => {
  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-[120px] left-1/2 -translate-x-1/2 bg-white/96 px-6 py-4 rounded-lg shadow-md z-[9999] font-playfair text-lg flex items-center"
    >
      <div className="mr-3 h-5 w-5 rounded-full border-2 border-eatly-primary/20 border-t-eatly-primary animate-spin"></div>
      Un instant, nous préparons vos recommandations...
    </motion.div>
  );
};

export default LoadingIndicator;
