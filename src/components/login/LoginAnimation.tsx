
import { motion } from 'framer-motion';
import LogoImage from '../LogoImage';

const LoginAnimation = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden px-8">
      {/* Éléments graphiques de fond */}
      <motion.div 
        className="absolute w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/5 blur-xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-white/5 blur-xl"></div>
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-12 relative z-10"
      >
        <LogoImage />
      </motion.div>

      {/* Titre principal avec effet de transition */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-white text-4xl md:text-5xl font-avantgarde text-center leading-tight mb-8"
      >
        Vos goûts, vos envies, <br /> et <span className="text-eatly-light">laissez-nous faire</span>
      </motion.h1>

      {/* Paragraphe descriptif */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="text-white/90 font-playfair text-lg text-center max-w-lg"
      >
        Laissez-nous transformer vos goûts en expériences culinaires uniques, préparées avec soin et livrées chez vous
      </motion.p>

      {/* Élément graphique : ligne décorative */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        className="mt-10 w-16 h-1 bg-eatly-light/50 rounded-full"
      ></motion.div>

      {/* Éléments graphiques culinaires en arrière-plan */}
      <motion.div 
        className="absolute bottom-8 left-8 w-20 h-20 opacity-20"
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 0.2, rotate: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 95C74.8528 95 95 74.8528 95 50C95 25.1472 74.8528 5 50 5C25.1472 5 5 25.1472 5 50C5 74.8528 25.1472 95 50 95Z" stroke="white" strokeWidth="2"/>
          <path d="M32 40C32 36.6863 34.6863 34 38 34H62C65.3137 34 68 36.6863 68 40V50C68 53.3137 65.3137 56 62 56H38C34.6863 56 32 53.3137 32 50V40Z" stroke="white" strokeWidth="2"/>
          <path d="M50 56V76" stroke="white" strokeWidth="2"/>
          <path d="M42 76H58" stroke="white" strokeWidth="2"/>
        </svg>
      </motion.div>

      <motion.div 
        className="absolute top-16 right-16 w-16 h-16 opacity-20"
        initial={{ opacity: 0, rotate: 10 }}
        animate={{ opacity: 0.2, rotate: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M35 20C35 15.5817 38.5817 12 43 12H57C61.4183 12 65 15.5817 65 20V35C65 39.4183 61.4183 43 57 43H43C38.5817 43 35 39.4183 35 35V20Z" stroke="white" strokeWidth="2"/>
          <path d="M25 55C25 50.5817 28.5817 47 33 47H67C71.4183 47 75 50.5817 75 55V70C75 74.4183 71.4183 78 67 78H33C28.5817 78 25 74.4183 25 70V55Z" stroke="white" strokeWidth="2"/>
          <path d="M50 43V47" stroke="white" strokeWidth="2"/>
          <path d="M40 88L60 88" stroke="white" strokeWidth="2"/>
          <path d="M50 78L50 88" stroke="white" strokeWidth="2"/>
        </svg>
      </motion.div>
    </div>
  );
};

export default LoginAnimation;
