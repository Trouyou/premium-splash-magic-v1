
import { motion } from 'framer-motion';

const AnimatedHeading = () => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="text-white text-4xl md:text-5xl font-avantgarde text-center leading-tight mb-8 relative z-10"
    >
      Vos goûts, vos envies, <br /> et <span className="text-eatly-light">laissez-nous faire</span>
    </motion.h1>
  );
};

export default AnimatedHeading;
