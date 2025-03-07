import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, FC } from 'react';

interface LogoImageProps {
  className?: string;
}

const LogoImage: FC<LogoImageProps> = ({ className = '' }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.error('Erreur de chargement du logo');
    setImageError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`w-full flex justify-center items-center py-8 sm:py-12 md:py-16 ${className}`}
    >
      {imageError ? (
        <div className="text-center p-4 bg-gray-100 rounded-lg" role="alert">
          <p>Logo temporairement indisponible</p>
        </div>
      ) : (
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/3]">
          <Image
            src="/images/logo.webp"
            alt="Logo Eatly - Une expérience culinaire unique"
            fill
            sizes="(max-width: 640px) 280px, 320px"
            priority
            className="object-contain"
            onError={handleImageError}
            aria-label="Logo principal Eatly"
          />
          <picture className="hidden">
            <source 
              srcSet="/images/logo.webp" 
              type="image/webp" 
              onError={handleImageError}
            />
            <source 
              srcSet="/images/logo.png" 
              type="image/png" 
              onError={handleImageError}
            />
            <img
              src="/images/logo.png"
              alt="Logo Eatly - Une expérience culinaire unique"
              className="hidden"
              onError={handleImageError}
            />
          </picture>
        </div>
      )}
    </motion.div>
  );
};

export default LogoImage;