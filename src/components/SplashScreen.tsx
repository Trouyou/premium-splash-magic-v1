
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
                    {/* Logo SVG inlining pour éviter les problèmes de chargement */}
                    <svg width="120" height="28" viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M26.4 14C26.4 20.6 21.3 26 15 26C8.7 26 3.6 20.6 3.6 14C3.6 7.4 8.7 2 15 2C21.3 2 26.4 7.4 26.4 14Z" fill="#D11B19"/>
                      <path d="M15 2C21.3 2 26.4 7.4 26.4 14C26.4 20.6 21.3 26 15 26" stroke="white" strokeWidth="0.5"/>
                      <path d="M45 12.7H48.4V13.9H45V18.5H49.2V19.7H43.6V6.3H49.2V7.5H45V12.7Z" fill="#9C1B1A"/>
                      <path d="M54 15.1L50.7 6.3H52.2L54.8 13.8L57.4 6.3H58.9L55.6 15.1V19.7H54V15.1Z" fill="#9C1B1A"/>
                      <path d="M61.1 6.3H62.5V19.7H61.1V6.3Z" fill="#9C1B1A"/>
                      <path d="M69.1 6.3H70.5V19.7H69.3L64.5 8.2V19.7H63.1V6.3H64.3L69.1 17.8V6.3Z" fill="#9C1B1A"/>
                    </svg>
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
