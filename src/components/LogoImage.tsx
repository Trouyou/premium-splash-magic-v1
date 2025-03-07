
import { motion } from 'framer-motion';

const LogoImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full flex justify-center items-center py-16"
    >
      <img 
        src="/lovable-uploads/4304d601-682c-472c-ace9-1149b80c6b24.png" 
        alt="Eatly Marmite Logo" 
        className="w-auto h-[280px] md:h-[320px] pot-shadow"
      />
    </motion.div>
  );
};

export default LogoImage;
