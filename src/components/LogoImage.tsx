
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
        src="/lovable-uploads/bae62a19-a42c-4047-8b4c-c9ce60746ff3.png" 
        alt="Eatly Logo Original" 
        className="w-auto h-[280px] md:h-[320px]"
      />
    </motion.div>
  );
};

export default LogoImage;
