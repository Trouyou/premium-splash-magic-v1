
import { motion } from 'framer-motion';

const AnimatedDescription = () => {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.9 }}
      className="text-white/90 font-playfair text-lg text-center max-w-lg relative z-10"
    >
      Laissez-nous transformer vos goûts en expériences culinaires uniques, préparées avec soin et livrées chez vous
    </motion.p>
  );
};

export default AnimatedDescription;
