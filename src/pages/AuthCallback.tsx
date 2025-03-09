
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { isPreviewEnvironment, simulateSignIn } from '@/utils/auth-simulator';
import { useToast } from '@/hooks/use-toast';
import '../App.css';

const AuthCallback = () => {
  const { handleRedirectCallback } = useClerk();
  const navigate = useNavigate();
  const progressCircleRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Précharge la page de destination
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'document';
    preloadLink.href = '/'; // Page de redirection après authentification
    document.head.appendChild(preloadLink);
    
    // Traiter le callback de redirection après l'authentification sociale
    const processCallback = async () => {
      try {
        // Log de débogage pour l'environnement Lovable
        if (isPreviewEnvironment()) {
          console.log('Traitement du callback OAuth dans AuthCallback.tsx:', {
            url: window.location.href,
            origin: window.location.origin
          });
          
          // Dans l'environnement Lovable, simuler une connexion réussie
          // Extraire le provider de l'URL si disponible
          const urlParams = new URLSearchParams(window.location.search);
          const provider = urlParams.get('provider') || 'oauth_google';
          simulateSignIn(provider, () => {
            startRedirectionAnimation();
          });
          return;
        }

        // Traiter le callback d'authentification
        await handleRedirectCallback({
          redirectUrl: window.location.origin + "/auth/callback",
          afterSignInUrl: window.location.origin,
          afterSignUpUrl: window.location.origin
        });
        
        // Démarrer l'animation de redirection
        startRedirectionAnimation();
      } catch (error: any) {
        console.error('Erreur lors du traitement du callback:', error);
        
        // Traduction du message d'erreur
        let errorMessage = error.message || "Une erreur s'est produite lors de l'authentification";
        if (errorMessage.includes('single session mode') || errorMessage.includes('signed into one account')) {
          errorMessage = 'Vous êtes actuellement en mode session unique. Vous ne pouvez être connecté qu\'à un seul compte à la fois.';
        }
        
        // Afficher une notification d'erreur
        toast({
          variant: "destructive",
          title: "Échec de l'authentification",
          description: errorMessage,
        });
        
        // Rediriger vers la page de connexion
        navigate('/login');
      }
    };
    
    const startRedirectionAnimation = () => {
      // Animation fluide utilisant requestAnimationFrame
      let start: number | null = null;
      const duration = 1500; // 1.5 secondes exactement
      
      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        
        // Met à jour le pourcentage de progression visuellement
        if (progressCircleRef.current) {
          const progressPercentage = Math.min(progress / duration, 1);
          progressCircleRef.current.style.strokeDashoffset = `${283 * (1 - progressPercentage)}`;
        }
        
        if (progress < duration) {
          requestAnimationFrame(animate);
        } else {
          // Ajout d'une animation de fade-out avant la redirection
          if (containerRef.current) {
            containerRef.current.classList.add('fade-out');
          }
          
          // Redirection après l'animation complète
          setTimeout(() => navigate('/'), 300);
        }
      };
      
      requestAnimationFrame(animate);
    };

    processCallback();
    
    // Nettoyage
    return () => {
      document.head.removeChild(preloadLink);
    };
  }, [handleRedirectCallback, navigate, toast]);

  return (
    <div ref={containerRef} className="auth-callback-container">
      <div className="logo-animation-container">
        <img 
          src="/lovable-uploads/440a22d0-927c-46b3-b178-70ab93968b95.png" 
          alt="Eatly" 
          className="logo"
        />
        <svg className="spinner" width="160" height="160" viewBox="0 0 100 100">
          <circle 
            className="spinner-track" 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            strokeWidth="2" 
          />
          <circle 
            ref={progressCircleRef}
            className="progress-circle" 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            strokeWidth="2" 
          />
        </svg>
      </div>
      <div className="message-container">
        <h2 className="main-message">Connexion réussie !</h2>
        <p className="sub-message">Redirection vers votre espace Eatly</p>
      </div>
    </div>
  );
};

export default AuthCallback;
