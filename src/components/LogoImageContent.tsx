
import { FC, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LOGO_ANIMATION, SPLASH_ANIMATION } from '@/hooks/logoAnimations';

interface LogoImageContentProps {
  logoSrc: string;
  variant: 'default' | 'confidentiality' | 'splash';
  isLoaded: boolean;
  onError: () => void;
  onLoad: () => void;
}

const LogoImageContent: FC<LogoImageContentProps> = ({
  logoSrc,
  variant,
  isLoaded,
  onError,
  onLoad
}) => {
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
        onError={onError}
        onLoad={onLoad}
        style={{
          filter: 'drop-shadow(0px 20px 40px rgba(209, 27, 25, 0.2))',
          willChange: 'transform, opacity, filter'
        }}
      />
    </motion.div>
  );
};

export default LogoImageContent;
