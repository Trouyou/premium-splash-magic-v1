
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
        src="/lovable-uploads/9a9f2d6c-ba85-40b4-aab2-b8d6fb42dd43.png" 
        alt="Eatly Logo" 
        className="w-auto h-[220px] md:h-[260px] pot-shadow"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="font-avantgarde text-2xl text-black mt-2"
      >
        eatly
      </motion.p>
    </motion.div>
  );
};

export default LogoImage;
