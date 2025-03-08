
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <motion.div 
      className="absolute inset-0 w-full h-full bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
};

export default AnimatedBackground;
