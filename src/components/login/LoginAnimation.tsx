
import { motion } from 'framer-motion';
import LogoImage from '../LogoImage';
import AnimatedBackground from './AnimatedBackground';
import AnimatedHeading from './AnimatedHeading';
import AnimatedDescription from './AnimatedDescription';
import AnimatedDivider from './AnimatedDivider';

const LoginAnimation = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden px-8">
      {/* Background with gradient */}
      <AnimatedBackground />

      {/* Logo avec meilleure résolution et taille */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          filter: "drop-shadow(0px 15px 30px rgba(209, 27, 25, 0.2))"
        }}
        whileHover={{ 
          scale: 1.03, 
          filter: "drop-shadow(0px 20px 40px rgba(209, 27, 25, 0.25))"
        }}
        transition={{ 
          duration: 0.8, 
          delay: 0.3,
          scale: {
            type: "spring",
            stiffness: 300,
            damping: 20
          }
        }}
        className="mb-6 relative z-10 w-full max-w-[260px]"
      >
        <LogoImage className="transform-gpu" />
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
