
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  
  // Vérification si l'utilisateur revient du document de politique de confidentialité
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const returnTo = searchParams.get('returnTo');
    
    // Si returnTo=popup-rgpd, afficher la modal RGPD
    if (returnTo === 'popup-rgpd') {
      setShowModal(true);
      
      // Nettoyer l'URL sans recharger la page
      const newUrl = `${window.location.pathname}${window.location.hash}`;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [location]);
  
  // Vérification de connexion et chargement initial
  useEffect(() => {
    // Vérification de la connexion
    if (!navigator.onLine) {
      setNetworkError(true);
      return;
    }
    
    // Simuler un chargement prolongé après 3 secondes si nécessaire
    const loadingTimer = setTimeout(() => {
      if (!showModal) {
        setLoading(true);
      }
    }, 3000);
    
    // Afficher la modal RGPD après 3 secondes
    const modalTimer = setTimeout(() => {
      setShowModal(true);
      setLoading(false); // Masquer le message de chargement si affiché
    }, 3000);
    
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(modalTimer);
    };
  }, [showModal]);
  
  // Gestionnaires d'événements pour les boutons
  const handleAccept = () => {
    localStorage.setItem('dataConsent', 'accepted');
    setShowModal(false);
    
    // Redirection simulée
    setTimeout(() => {
      setShowSplash(false);
      navigate('/login'); // Rediriger vers la page de connexion
    }, 500);
  };
  
  const handleRefuse = () => {
    localStorage.setItem('dataConsent', 'refused');
    setShowModal(false);
    
    // Redirection simulée
    setTimeout(() => {
      setShowSplash(false);
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
