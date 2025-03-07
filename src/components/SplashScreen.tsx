
import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoImage from './LogoImage';

// Types pour le composant
interface SplashScreenProps {
  onComplete?: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [showSplash, setShowSplash] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  
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
      if (onComplete) onComplete();
    }, 500);
  };
  
  const handleRefuse = () => {
    localStorage.setItem('dataConsent', 'refused');
    setShowModal(false);
    
    // Redirection simulée
    setTimeout(() => {
      setShowSplash(false);
      if (onComplete) onComplete();
    }, 500);
  };
  
  const handleRefresh = () => {
    window.location.reload();
  };
  
  // Affichage erreur connexion
  if (networkError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl border-2 border-eatly-primary shadow-lg max-w-[90%] w-[400px] text-center"
        >
          <h3 className="font-playfair text-lg mb-4">
            Connexion internet instable. Veuillez vérifier votre connexion.
          </h3>
          <button 
            className="bg-eatly-primary text-white px-7 py-3.5 rounded-lg font-avantgarde text-base font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
            onClick={handleRefresh}
          >
            Rafraîchir
          </button>
        </motion.div>
      </div>
    );
  }
  
  return (
    <AnimatePresence>
      {showSplash && (
        <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50 overflow-hidden">
          {/* Élément graphique subtil */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            className="absolute top-0 right-0 w-1/5 h-[30%] opacity-5"
          />
          
          {/* Ligne horizontale subtile */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.15 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute top-[85%] left-0 w-full h-px bg-eatly-secondary opacity-15 origin-left"
          />
          
          {/* Logo de la marmite - utilise le composant d'image au lieu du 3D */}
          <div className="w-full flex justify-center items-center">
            <Suspense fallback={null}>
              <LogoImage />
            </Suspense>
          </div>
          
          {/* Textes */}
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="font-avantgarde text-5xl tracking-wider text-eatly-secondary mt-6 md:text-4xl sm:text-3xl"
          >
            eatly
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="font-playfair text-2xl leading-normal opacity-90 mt-5 md:text-xl sm:text-lg"
          >
            Vos repas sur mesure
          </motion.h2>
          
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="w-10 h-0.5 bg-gradient-to-r from-eatly-primary to-eatly-secondary mt-4 relative"
          >
            <div className="absolute inset-0 bg-radial-gradient-white opacity-30" />
          </motion.div>
          
          {/* Indicateur de chargement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ 
              delay: 1.2, 
              duration: 0.5, 
              rotate: { 
                repeat: Infinity, 
                duration: 1.5, 
                ease: 'linear' 
              } 
            }}
            className="w-9 h-9 border-2 border-eatly-primary/10 border-t-eatly-primary/90 rounded-full absolute bottom-[60px] left-1/2 -translate-x-1/2"
          />
          
          {/* Modal RGPD */}
          <AnimatePresence>
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex justify-center items-center bg-black/20 backdrop-blur-sm z-[10000]"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="bg-white rounded-xl w-[90%] max-w-[500px] p-9 shadow-lg flex flex-col items-center relative"
                >
                  <div className="h-7 mb-6">
                    {/* Logo "eatly" remplacé par du texte au lieu du SVG qui affichait "EYIN" */}
                    <span className="font-avantgarde text-2xl tracking-wide text-eatly-secondary">eatly</span>
                  </div>
                  
                  <h3 className="font-avantgarde text-xl text-eatly-secondary mb-4">Confidentialité</h3>
                  <div className="w-full h-px bg-eatly-light my-5" />
                  <p className="font-playfair text-base leading-relaxed opacity-90 mb-7 text-center">
                    Eatly respecte votre vie privée. Voulez-vous partager des données d'utilisation anonymes pour améliorer votre expérience?
                  </p>
                  <div className="flex gap-4 sm:flex-col">
                    <button 
                      className="px-7 py-3.5 rounded-lg font-avantgarde text-base font-medium bg-gray-600 text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                      onClick={handleRefuse}
                    >
                      Refuser
                    </button>
                    <button 
                      className="px-7 py-3.5 rounded-lg font-avantgarde text-base font-medium bg-eatly-primary text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                      onClick={handleAccept}
                    >
                      Accepter
                    </button>
                  </div>
                  <a href="#" className="font-playfair text-sm text-eatly-secondary mt-5 no-underline hover:underline">
                    En savoir plus sur notre politique de confidentialité
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Message d'attente si le chargement prend trop de temps */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-[120px] left-1/2 -translate-x-1/2 bg-white/96 px-6 py-4 rounded-lg shadow-md z-[9999] font-playfair text-lg"
              >
                Un instant, nous préparons vos recommandations...
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
