
import { motion } from 'framer-motion';
import { useState } from 'react';

const LogoImage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: imageLoaded ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="w-full flex justify-center items-center"
    >
      <img 
        src="/lovable-uploads/4304d601-682c-472c-ace9-1149b80c6b24.png" 
        alt="Eatly Marmite Logo" 
        className="w-full h-auto pot-shadow"
        style={{ 
          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.08)',
          maxWidth: '100%'
        }}
        onLoad={() => setImageLoaded(true)}
        loading="eager"
      />
    </motion.div>
  );
};

export default LogoImage;
