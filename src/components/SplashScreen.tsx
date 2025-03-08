
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NetworkErrorMessage from './splash/NetworkErrorMessage';
import PrivacyModal from './splash/PrivacyModal';
import SplashContent from './splash/SplashContent';

// Types pour le composant
interface SplashScreenProps {
  onComplete?: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [showSplash, setShowSplash] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const navigate = useNavigate();
  
  // Vérification de connexion et chargement initial
  useEffect(() => {
    // Préchargement des images de logo
    const preloadImages = () => {
      const imageUrls = [
        '/lovable-uploads/ba204c1d-73b7-42d1-94db-5a7b94ae3ff8.png',
        '/lovable-uploads/6347b2be-e52a-437f-9bdd-adcafab9cde1.png'
      ];
      
      imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    };
    
    preloadImages();
    
    // Vérification de la connexion
    if (!navigator.onLine) {
      setNetworkError(true);
      return;
    }
    
    // Vérifier si c'est la première visite
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    
    // Display the RGPD modal or redirect after a shorter delay (2.5s total)
    const modalTimer = setTimeout(() => {
      if (!hasVisited) {
        setShowModal(true);
      } else {
        // Si l'utilisateur a déjà visité, rediriger après un délai
        setTimeout(() => {
          setShowSplash(false);
          navigate('/login');
        }, 1000); // Reduced delay for returning users
      }
    }, 2000); // Reduced from 2500ms
    
    return () => {
      clearTimeout(modalTimer);
    };
  }, [showModal, navigate]);
  
  // Gestionnaires d'événements pour les boutons
  const handleAccept = () => {
    localStorage.setItem('dataConsent', 'accepted');
    localStorage.setItem('hasVisitedBefore', 'true');
    setShowModal(false);
    
    // Redirection simulée
    setTimeout(() => {
      setShowSplash(false);
      navigate('/login'); // Rediriger vers la page de connexion
    }, 500);
  };
  
  const handleRefuse = () => {
    localStorage.setItem('dataConsent', 'refused');
    localStorage.setItem('hasVisitedBefore', 'true');
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
        <motion.div 
          className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
