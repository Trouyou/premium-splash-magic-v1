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
        src="/lovable-uploads/76f1327b-1b0e-40de-8959-98f93dad884d.png" 
        alt="Eatly Logo Complete" 
        className="w-auto h-[280px] md:h-[320px]"
      />
    </motion.div>
  );
};

export default LogoImage;