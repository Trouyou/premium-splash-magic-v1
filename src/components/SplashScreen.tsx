
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
  const navigate = useNavigate();
  
  // Vérification de connexion et chargement initial
  useEffect(() => {
    // Préchargement de l'image pour éviter toute latence
    const preloadImage = new Image();
    preloadImage.src = "/lovable-uploads/4304d601-682c-472c-ace9-1149b80c6b24.png";
    
    // Vérification de la connexion
    if (!navigator.onLine) {
      setNetworkError(true);
      return;
    }
    
    // Simuler un chargement plus rapide
    const loadingTimer = setTimeout(() => {
      if (!showModal) {
        setLoading(true);
      }
    }, 2000); // Réduit à 2 secondes au lieu de 3
    
    // Afficher la modal RGPD plus rapidement
    const modalTimer = setTimeout(() => {
      setShowModal(true);
      setLoading(false); // Masquer le message de chargement si affiché
    }, 2000); // Réduit à 2 secondes au lieu de 3
    
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(modalTimer);
    };
  }, [showModal]);
  
  // Gestionnaires d'événements pour les boutons
  const handleAccept = () => {
    localStorage.setItem('dataConsent', 'accepted');
    setShowModal(false);
    
    // Redirection plus rapide
    setTimeout(() => {
      setShowSplash(false);
      navigate('/login'); // Rediriger vers la page de connexion
    }, 300); // Réduit à 300ms au lieu de 500ms
  };
  
  const handleRefuse = () => {
    localStorage.setItem('dataConsent', 'refused');
    setShowModal(false);
    
    // Redirection plus rapide
    setTimeout(() => {
      setShowSplash(false);
      navigate('/login'); // Rediriger vers la page de connexion
    }, 300); // Réduit à 300ms au lieu de 500ms
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
