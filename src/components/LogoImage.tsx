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
    scale: 0.95,
    y: 10,
    filter: 'brightness(0.95) saturate(1) contrast(1.05)'
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    filter: 'brightness(1.02) saturate(1.1) contrast(1.1)',
    transition: {
      duration: 0.8,
      ease: [0.4, 0.0, 0.2, 1],
      filter: { duration: 1.2 }
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.95,
    y: -5,
    filter: 'brightness(0.95) saturate(1) contrast(1.05)',
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const SPLASH_ANIMATION = {
  initial: { 
    opacity: 0, 
    scale: 0.85,
    y: 20,
    rotate: -5,
    filter: 'brightness(0.95) saturate(1) contrast(1.05)'
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    rotate: 0,
    filter: 'brightness(1.02) saturate(1.1) contrast(1.1)',
    transition: {
      duration: 1.8,
      ease: [0.6, 0.01, -0.05, 0.95],
      delay: 0.3,
      rotate: {
        duration: 1.5,
        ease: "easeOut"
      },
      filter: { 
        duration: 2,
        ease: "easeOut"
      }
    }
  },
  exit: { 
    opacity: 0,
    scale: 1.1,
    y: -20,
    rotate: 5,
    filter: 'brightness(1.02) saturate(1.1) contrast(1.1)',
    transition: {
      duration: 0.7,
      ease: "easeInOut"
    }
  }
};

const CONTAINER_ANIMATION = {
  initial: { 
    opacity: 0,
    filter: 'blur(10px)'
  },
  animate: { 
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: "easeOut",
      filter: { duration: 1.2 }
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
        return '/lovable-uploads/Logo_Eatly_Original_TraitTransparent_1.png';
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
        return 'w-full flex justify-center items-center py-2';
      case 'splash':
        return `w-full h-full flex justify-center items-center ${className}`;
      default:
        return `w-full flex justify-center items-center py-8 sm:py-12 md:py-16 ${className}`;
    }
  }, [variant, className]);

  const getImageContainerClasses = useCallback(() => {
    switch (variant) {
      case 'confidentiality':
        return 'relative w-full max-w-[240px] sm:max-w-[280px] aspect-[1/1]';
      case 'splash':
        return 'relative w-full max-w-[400px] sm:max-w-[500px] aspect-[1/1] will-change-transform';
      default:
        return 'relative w-full max-w-[320px] sm:max-w-[400px] aspect-[1/1]';
    }
  }, [variant]);

  const getImageSizes = useCallback(() => {
    switch (variant) {
      case 'confidentiality':
        return "(max-width: 640px) 240px, 280px";
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
              quality={100}
              loading="eager"
              className="object-contain transform-gpu"
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{
                filter: 'drop-shadow(0px 20px 40px rgba(209, 27, 25, 0.2))',
                willChange: 'transform, opacity, filter'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LogoImage;