import { motion } from 'framer-motion';
import { FC } from 'react';
import LogoImage from '../LogoImage';
import AnimatedBackground from './AnimatedBackground';
import AnimatedHeading from './AnimatedHeading';
import AnimatedDescription from './AnimatedDescription';
import AnimatedDivider from './AnimatedDivider';

const LoginAnimation: FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden px-8">
      {/* Background with gradient */}
      <AnimatedBackground />

      {/* Logo - Ajustement de la taille via props ou style */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-4 relative z-10" // Réduit la marge inférieure de mb-8 à mb-4
      >
        <div className="transform scale-90 max-w-[240px]"> {/* Réduit la taille à 90% et limite la largeur maximale à 240px */}
          <LogoImage />
        </div>
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