
import { motion } from 'framer-motion';
import LogoImage from '../LogoImage';
import AnimatedBackground from './AnimatedBackground';
import AnimatedHeading from './AnimatedHeading';
import AnimatedDescription from './AnimatedDescription';
import AnimatedDivider from './AnimatedDivider';

const LoginAnimation = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background gradient */}
      <AnimatedBackground />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-8 relative z-10"
      >
        <LogoImage />
      </motion.div>

      {/* Main heading with transition effect */}
      <AnimatedHeading />

      {/* Description paragraph */}
      <AnimatedDescription />

      {/* Decorative line */}
      <AnimatedDivider />
    </div>
  );
};

export default LoginAnimation;
