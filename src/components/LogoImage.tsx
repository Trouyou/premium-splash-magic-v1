
import { motion } from 'framer-motion';

const LogoImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full flex justify-center items-center"
    >
      <img 
        src="/lovable-uploads/4304d601-682c-472c-ace9-1149b80c6b24.png" 
        alt="Eatly Marmite Logo" 
        className="w-[60%] md:w-[40%] max-w-full h-auto pot-shadow"
        style={{ boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.08)" }}
        loading="eager"
      />
    </motion.div>
  );
};

export default LogoImage;
