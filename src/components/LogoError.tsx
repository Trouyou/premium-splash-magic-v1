
import { motion } from 'framer-motion';
import { FC } from 'react';

const LogoError: FC = () => {
  return (
    <motion.div
      key="error"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="text-center p-4 bg-gray-100 rounded-lg"
      role="alert"
    >
      <p>Logo temporairement indisponible</p>
    </motion.div>
  );
};

export default LogoError;
