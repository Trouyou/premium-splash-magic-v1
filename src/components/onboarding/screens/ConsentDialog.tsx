
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Shield, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface ConsentDialogProps {
  onAccept: () => void;
  onDecline: () => void;
}

const ConsentDialog: React.FC<ConsentDialogProps> = ({ onAccept, onDecline }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAccept = () => {
    localStorage.setItem('dataConsent', 'accepted');
    toast({
      title: "Préférences enregistrées",
      description: "Vos préférences de confidentialité ont été sauvegardées.",
    });
    onAccept();
    navigate('/');
  };

  const handleDecline = () => {
    localStorage.setItem('dataConsent', 'declined');
    toast({
      title: "Préférences enregistrées",
      description: "Vous pourrez toujours modifier vos préférences plus tard.",
      variant: "destructive",
    });
    onDecline();
    navigate('/');
  };

  // Open the links in a new tab
  const openExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-white rounded-xl w-full max-w-[500px] p-8 shadow-lg"
      >
        <div className="flex justify-center mb-6">
          <Shield className="h-12 w-12 text-[#D11B19]" />
        </div>

        <h2 className="font-['Playfair_Display'] text-2xl text-center text-[#D11B19] mb-4">
          Protection de vos données
        </h2>

        <div className="space-y-4 text-[#4A5568] mb-6">
          <p className="text-center font-medium">
            Êtes-vous d'accord pour partager vos données avec Eatly afin d'affiner la personnalisation proposée ?
          </p>
          
          <p className="text-center text-sm">
            Eatly utilise vos préférences alimentaires pour vous proposer des recommandations personnalisées 
            et améliorer votre expérience culinaire.
          </p>
          
          <div className="text-center text-sm py-2">
            <p>
              En continuant, vous acceptez nos{" "}
              <button 
                onClick={() => openExternalLink('/conditions-utilisation.html')}
                className="font-medium text-[#D11B19] hover:text-[#B01816] transition-colors"
              >
                Conditions Générales d'Utilisation
              </button>{" "}
              et notre{" "}
              <button 
                onClick={() => openExternalLink('/politique-confidentialite.html')}
                className="font-medium text-[#D11B19] hover:text-[#B01816] transition-colors"
              >
                Politique de Confidentialité
              </button>.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={handleAccept}
            className="w-full bg-[#D11B19] hover:bg-[#B01816] text-white"
          >
            Accepter
          </Button>
          
          <Button
            onClick={handleDecline}
            variant="outline"
            className="w-full"
          >
            Refuser
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConsentDialog;
