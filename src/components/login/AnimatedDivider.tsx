
import { motion } from 'framer-motion';

const AnimatedDivider = () => {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.2, delay: 1.2 }}
      className="mt-10 w-16 h-1 bg-eatly-light/50 rounded-full relative z-10"
    ></motion.div>
  );
};

export default AnimatedDivider;
