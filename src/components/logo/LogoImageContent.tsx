
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';
import { LOGO_ANIMATION, SPLASH_ANIMATION } from './logoAnimations';
import { getImageContainerClasses, getImageSizes } from './logoUtils';

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
  const imageContainerClasses = getImageContainerClasses(variant);
  const imageSizes = getImageSizes(variant);
  
  return (
    <motion.div
      key="logo"
      variants={variant === 'splash' ? SPLASH_ANIMATION : LOGO_ANIMATION}
      initial="initial"
      animate={isLoaded ? "animate" : "initial"}
      exit="exit"
      className={imageContainerClasses}
    >
      <Image
        src={logoSrc}
        alt="Logo Eatly - Une expérience culinaire unique"
        fill
        sizes={imageSizes}
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
