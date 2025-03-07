
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NetworkErrorMessage from './splash/NetworkErrorMessage';
import PrivacyModal from './splash/PrivacyModal';
import LoadingIndicator from './splash/LoadingIndicator';
import SplashContent from './splash/SplashContent';

// Types pour le composant
interface SplashScreenProps {
  onComplete?: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [showSplash, setShowSplash] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const navigate = useNavigate();
  
  // Préchargement des assets
  useEffect(() => {
    // Précharger l'image de la marmite
    const preloadImage = new Image();
    preloadImage.src = '/lovable-uploads/4304d601-682c-472c-ace9-1149b80c6b24.png';
    preloadImage.onload = () => {
      setAssetsLoaded(true);
    };
    
    // Fallback si l'image met trop de temps à charger
    const timeout = setTimeout(() => {
      if (!assetsLoaded) {
        setAssetsLoaded(true);
      }
    }, 800); // Timeout après 800ms maximum
    
    return () => clearTimeout(timeout);
  }, []);
  
  // Vérification de connexion et chargement initial
  useEffect(() => {
    // Vérification de la connexion
    if (!navigator.onLine) {
      setNetworkError(true);
      return;
    }
    
    // Afficher la modal RGPD après 2 secondes pour permettre l'animation du splash
    const modalTimer = setTimeout(() => {
      if (assetsLoaded) {
        setShowModal(true);
      }
    }, 2000);
    
    return () => {
      clearTimeout(modalTimer);
    };
  }, [assetsLoaded]);
  
  // Gestionnaires d'événements pour les boutons
  const handleAccept = () => {
    localStorage.setItem('dataConsent', 'accepted');
    setShowModal(false);
    
    // Redirection simulée
    setTimeout(() => {
      setShowSplash(false);
      if (onComplete) onComplete();
      navigate('/login'); // Rediriger vers la page de connexion
    }, 500);
  };
  
  const handleRefuse = () => {
    localStorage.setItem('dataConsent', 'refused');
    setShowModal(false);
    
    // Redirection simulée
    setTimeout(() => {
      setShowSplash(false);
      if (onComplete) onComplete();
      navigate('/login'); // Rediriger vers la page de connexion
    }, 500);
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
        <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50 overflow-hidden">
          <SplashContent />
          
          {/* Modal RGPD */}
          <AnimatePresence>
            {showModal && (
              <PrivacyModal 
                isVisible={showModal}
                onAccept={handleAccept}
                onRefuse={handleRefuse}
              />
            )}
          </AnimatePresence>
          
          {/* Message d'attente si le chargement prend trop de temps */}
          <AnimatePresence>
            {loading && <LoadingIndicator isVisible={loading} />}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
