
// Animation configurations for different logo variants

export const LOGO_ANIMATION = {
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

export const SPLASH_ANIMATION = {
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

export const CONTAINER_ANIMATION = {
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
