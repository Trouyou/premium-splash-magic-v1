import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, FC, useEffect, useCallback } from 'react';

interface LogoImageProps {
  className?: string;
  variant?: 'default' | 'confidentiality' | 'splash';
  lovableId?: string;
}

const LOGO_ANIMATION = {
  initial: { 
    opacity: 0, 
    scale: 0.8,
    y: 20
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.6, 0.01, -0.05, 0.95],
      delay: 0.2
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

const SPLASH_ANIMATION = {
  initial: { 
    opacity: 0, 
    scale: 0.85,
    y: 20,
    rotate: -5
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 1.8,
      ease: [0.6, 0.01, -0.05, 0.95],
      delay: 0.3,
      rotate: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  },
  exit: { 
    opacity: 0,
    scale: 1.1,
    y: -20,
    rotate: 5,
    transition: {
      duration: 0.7,
      ease: "easeInOut"
    }
  }
};

const CONTAINER_ANIMATION = {
  initial: { 
    opacity: 0
  },
  animate: { 
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  }
};

const LogoImage: FC<LogoImageProps> = ({ className = '', variant = 'default', lovableId }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getLogoSrc = useCallback(() => {
    if (lovableId) {
      return `/lovable-uploads/${lovableId}.png`;
    }
    
    switch (variant) {
      case 'confidentiality':
        return '/lovable-uploads/4304d601-682c-472c-ace9-1149b80c6b24.png';
      case 'splash':
        return '/lovable-uploads/76f1327b-1b0e-40de-8959-98f93dad884d.png';
      default:
        return '/lovable-uploads/0ea8101c-fd28-4780-aed6-0e9a2943a0f4.png';
    }
  }, [lovableId, variant]);

  const logoSrc = getLogoSrc();

  const handleImageError = useCallback(() => {
    console.error('Erreur de chargement du logo');
    setImageError(true);
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    setIsLoaded(false);
    const img = document.createElement('img');
    img.src = logoSrc;
    
    if (img.complete) {
      handleImageLoad();
    } else {
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [logoSrc, handleImageLoad, handleImageError]);

  const getContainerClasses = useCallback(() => {
    switch (variant) {
      case 'confidentiality':
        return 'w-full flex justify-center items-center py-4';
      case 'splash':
        return `w-full h-full flex justify-center items-center ${className}`;
      default:
        return `w-full flex justify-center items-center py-8 sm:py-12 md:py-16 ${className}`;
    }
  }, [variant, className]);

  const getImageContainerClasses = useCallback(() => {
    switch (variant) {
      case 'confidentiality':
        return 'relative w-full max-w-[200px] sm:max-w-[240px] aspect-[1/1]';
      case 'splash':
        return 'relative w-full max-w-[400px] sm:max-w-[500px] aspect-[1/1] will-change-transform';
      default:
        return 'relative w-full max-w-[320px] sm:max-w-[400px] aspect-[1/1]';
    }
  }, [variant]);

  const getImageSizes = useCallback(() => {
    switch (variant) {
      case 'confidentiality':
        return "(max-width: 640px) 200px, 240px";
      case 'splash':
        return "(max-width: 640px) 400px, 500px";
      default:
        return "(max-width: 640px) 320px, 400px";
    }
  }, [variant]);

  return (
    <motion.div
      variants={CONTAINER_ANIMATION}
      initial="initial"
      animate="animate"
      className={getContainerClasses()}
    >
      <AnimatePresence mode="wait">
        {imageError ? (
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
        ) : (
          <motion.div
            key="logo"
            variants={variant === 'splash' ? SPLASH_ANIMATION : LOGO_ANIMATION}
            initial="initial"
            animate={isLoaded ? "animate" : "initial"}
            exit="exit"
            className={getImageContainerClasses()}
          >
            <Image
              src={logoSrc}
              alt="Logo Eatly - Une expérience culinaire unique"
              fill
              sizes={getImageSizes()}
              priority
              quality={90}
              loading="eager"
              className="object-contain transform-gpu"
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{
                filter: 'drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.15))',
                willChange: 'transform, opacity'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LogoImage;