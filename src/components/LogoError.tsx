
import { motion } from 'framer-motion';
import { FC } from 'react';

interface LogoErrorProps {
  variant?: 'default' | 'confidentiality' | 'splash';
}

const LogoError: FC<LogoErrorProps> = ({ variant = 'default' }) => {
  // Choose a style based on the variant
  const getErrorStyles = () => {
    switch (variant) {
      case 'splash':
        return "text-center p-8 py-16 rounded-lg";
      case 'confidentiality':
        return "text-center p-2 rounded-lg";
      default:
        return "text-center p-4 rounded-lg";
    }
  };

  return (
    <motion.div
      key="error"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={getErrorStyles()}
      role="alert"
    >
      {variant === 'splash' ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-eatly-primary mb-2">Eatly</h1>
          <p className="text-xl text-eatly-secondary">Une expérience culinaire unique</p>
        </div>
      ) : (
        <h2 className="text-xl font-bold text-eatly-primary">Eatly</h2>
      )}
    </motion.div>
  );
};

export default LogoError;
