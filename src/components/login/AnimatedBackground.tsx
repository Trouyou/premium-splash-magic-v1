
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
        boxShadow: 'none',
        border: 'none'
      }}
    />
  );
};

export default AnimatedBackground;
