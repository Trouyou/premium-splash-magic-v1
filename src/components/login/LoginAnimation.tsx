
import { motion } from 'framer-motion';
import LogoImage from '../LogoImage';

const LoginAnimation = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden px-8">
      {/* Fond avec dégradé */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          background: 'linear-gradient(to bottom right, #EDE6D6, #D11B19)'
        }}
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-8 relative z-10"
      >
        <LogoImage />
      </motion.div>

      {/* Titre principal avec effet de transition */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-white text-4xl md:text-5xl font-avantgarde text-center leading-tight mb-8 relative z-10"
      >
        Vos goûts, vos envies, <br /> et <span className="text-eatly-light">laissez-nous faire</span>
      </motion.h1>

      {/* Paragraphe descriptif */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="text-white/90 font-playfair text-lg text-center max-w-lg relative z-10"
      >
        Laissez-nous transformer vos goûts en expériences culinaires uniques, préparées avec soin et livrées chez vous
      </motion.p>

      {/* Élément graphique : ligne décorative */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        className="mt-10 w-16 h-1 bg-eatly-light/50 rounded-full relative z-10"
      ></motion.div>
    </div>
  );
};

export default LoginAnimation;
