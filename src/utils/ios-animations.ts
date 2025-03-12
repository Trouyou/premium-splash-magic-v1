
import { Variants } from 'framer-motion';

export const iOSTransitionPresets = {
  duration: 0.3,
  ease: [0.4, 0.0, 0.2, 1], // iOS-like easing
};

export const slideUpVariants: Variants = {
  hidden: { 
    y: '100%',
    opacity: 0,
    transition: iOSTransitionPresets
  },
  visible: { 
    y: 0,
    opacity: 1,
    transition: iOSTransitionPresets
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: iOSTransitionPresets
  }
};

export const fadeInVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.95,
    transition: iOSTransitionPresets
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: iOSTransitionPresets
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: iOSTransitionPresets
  }
};
