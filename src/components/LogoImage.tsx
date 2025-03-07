
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const LogoImage = () => {
  const location = useLocation();
  const isIndexPage = location.pathname === '/';
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full flex justify-center items-center py-16"
    >
      {isIndexPage ? (
        // Nouveau logo avec "eatly" en dessous pour la page d'index
        <div className="flex flex-col items-center">
          <img 
            src="/lovable-uploads/e90dac9d-6a0d-43c6-94bb-ae8fde84cf52.png" 
            alt="Eatly Marmite Logo with text" 
            className="w-auto h-[280px] md:h-[320px] pot-shadow"
          />
        </div>
      ) : (
        // Logo original sans texte pour les autres pages
        <img 
          src="/lovable-uploads/4304d601-682c-472c-ace9-1149b80c6b24.png" 
          alt="Eatly Marmite Logo" 
          className="w-auto h-[280px] md:h-[320px] pot-shadow"
        />
      )}
    </motion.div>
  );
};

export default LogoImage;
