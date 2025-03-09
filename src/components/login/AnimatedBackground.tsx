
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <motion.div 
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        background: 'linear-gradient(135deg, #D11B19 0%, #EDE6D6 100%)',
        margin: 0,
        padding: 0
      }}
    />
  );
};

export default AnimatedBackground;
