
import { motion } from 'framer-motion';

const LogoImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full flex flex-col justify-center items-center py-10"
    >
      <img 
        src="/lovable-uploads/440a22d0-927c-46b3-b178-70ab93968b95.png" 
        alt="Eatly Marmite Logo" 
        className="w-auto h-[280px] md:h-[320px] pot-shadow"
      />
    </motion.div>
  );
};

export default LogoImage;
