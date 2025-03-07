import { useState, useEffect, FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NetworkErrorMessage from './splash/NetworkErrorMessage';
import PrivacyModal from './splash/PrivacyModal';
import LoadingIndicator from './splash/LoadingIndicator';
import SplashContent from './splash/SplashContent';

// Types pour le composant
interface SplashScreenProps {
  onComplete?: () => void;
  initialDelay?: number;
  modalDelay?: number;
}

const SplashScreen: FC<SplashScreenProps> = ({ 
  onComplete,
  initialDelay = 3000,
  modalDelay = 3000
}) => {
  const [showSplash, setShowSplash] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Vérification de la connexion
    const checkConnection = () => {
      const isOnline = navigator.onLine;
      setNetworkError(!isOnline);
      return isOnline;
    };

    // Gestionnaire d'événements pour la connexion
    window.addEventListener('online', () => setNetworkError(false));
    window.addEventListener('offline', () => setNetworkError(true));

    if (!checkConnection()) return;
    
    // Gestion du chargement et de l'affichage de la modale
    const loadingTimer = setTimeout(() => {
      if (!showModal) {
        setLoading(true);
      }
    }, initialDelay);
    
    const modalTimer = setTimeout(() => {
      setShowModal(true);
      setLoading(false);
    }, modalDelay);
    
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(modalTimer);
      window.removeEventListener('online', () => setNetworkError(false));
      window.removeEventListener('offline', () => setNetworkError(true));
    };
  }, [showModal, initialDelay, modalDelay]);
  
  const handlePrivacyChoice = (accepted: boolean) => {
    localStorage.setItem('dataConsent', accepted ? 'accepted' : 'refused');
    setShowModal(false);
    
    const redirectDelay = setTimeout(() => {
      setShowSplash(false);
      onComplete?.();
      navigate('/login');
    }, 500);

    return () => clearTimeout(redirectDelay);
  };
  
  const handleRefresh = () => {
    window.location.reload();
  };
  
  // Affichage erreur connexion
  if (networkError) {
    return <NetworkErrorMessage onRefresh={handleRefresh} />;
  }
  
  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50 overflow-hidden"
        >
          <SplashContent />
          
          <AnimatePresence>
            {showModal && (
              <PrivacyModal 
                isVisible={showModal}
                onAccept={() => handlePrivacyChoice(true)}
                onRefuse={() => handlePrivacyChoice(false)}
                privacyPolicyUrl="/privacy-policy"
              />
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {loading && <LoadingIndicator isVisible={loading} />}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
