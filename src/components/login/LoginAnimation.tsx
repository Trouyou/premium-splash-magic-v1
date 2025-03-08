
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import AnimatedBackground from './AnimatedBackground';
import AnimatedHeading from './AnimatedHeading';
import AnimatedDescription from './AnimatedDescription';
import AnimatedDivider from './AnimatedDivider';

const LoginAnimation = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden px-8">
      {/* Background with gradient */}
      <AnimatedBackground />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-8 relative z-10"
      >
        {imageError ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white font-avantgarde text-5xl py-8"
          >
            eatly
          </motion.div>
        ) : (
          <motion.img 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: imageLoaded ? 1 : 0, 
              scale: imageLoaded ? 1 : 0.95 
            }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut" 
            }}
            src="/lovable-uploads/6347b2be-e52a-437f-9bdd-adcafab9cde1.png" 
            alt="Eatly Logo" 
            className={cn(
              "w-auto h-[180px] will-change-transform will-change-opacity gpu-accelerated",
              !imageLoaded && "invisible"
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
      </motion.div>

      {/* Main heading with transition effect */}
      <AnimatedHeading />

      {/* Description paragraph */}
      <AnimatedDescription />

      {/* Graphic element: decorative line */}
      <AnimatedDivider />
    </div>
  );
};

export default LoginAnimation;
