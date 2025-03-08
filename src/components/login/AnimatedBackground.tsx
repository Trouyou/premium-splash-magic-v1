
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <motion.div 
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        background: 'linear-gradient(to bottom right, #EDE6D6, #D11B19)'
      }}
    />
  );
};

export default AnimatedBackground;
