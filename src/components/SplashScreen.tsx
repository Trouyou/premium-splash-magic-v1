import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import LogoImage from './LogoImage';
import { useNavigate } from 'react-router-dom';
import PrivacyModal from './splash/PrivacyModal';

interface SplashScreenProps {
  lovableId?: string;
  onComplete?: () => void;
  redirectPath?: string;
}

const SPLASH_CONTAINER_ANIMATION = {
  initial: { 
    opacity: 0,
    backgroundColor: "rgba(237, 230, 214, 0)"
  },
  animate: { 
    opacity: 1,
    backgroundColor: "rgba(237, 230, 214, 1)",
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

const CONTENT_ANIMATION = {
  initial: { 
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  animate: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.6, 0.01, -0.05, 0.95],
      delay: 0.3
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

const LOADING_ANIMATION = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { delay: 0.8, duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const SplashScreen = ({ lovableId, onComplete, redirectPath = '/login' }: SplashScreenProps) => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handlePrivacyChoice = useCallback((accepted: boolean) => {
    setShowPrivacyModal(false);
    if (accepted) {
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        } else {
          navigate(redirectPath);
        }
      }, 800);
    }
  }, [onComplete, navigate, redirectPath]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowPrivacyModal(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="splash-container"
        variants={SPLASH_CONTAINER_ANIMATION}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#EDE0D4] to-[#B0283C] z-50 overflow-hidden"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            variants={CONTENT_ANIMATION}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center"
          >
            <div className="relative w-full max-w-[400px] sm:max-w-[500px] aspect-square">
              <LogoImage 
                variant="splash"
                lovableId="76f1327b-1b0e-40de-8959-98f93dad884d"
                className="transform-gpu"
              />
            </div>
            
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  variants={LOADING_ANIMATION}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="mt-8"
                >
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <PrivacyModal
          isVisible={showPrivacyModal}
          onAccept={() => handlePrivacyChoice(true)}
          onDecline={() => handlePrivacyChoice(false)}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
