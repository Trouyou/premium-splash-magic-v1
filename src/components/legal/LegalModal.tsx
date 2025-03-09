
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentType: 'privacy' | 'terms';
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, documentType }) => {
  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  const title = documentType === 'privacy' 
    ? 'Politique de confidentialité' 
    : 'Conditions Générales d\'Utilisation';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <button 
                onClick={onClose} 
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Fermer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Content with scrolling */}
            <ScrollArea className="flex-grow p-6" style={{ maxHeight: "calc(80vh - 140px)" }}>
              <div className="text-gray-700">
                {documentType === 'privacy' ? <PrivacyPolicy /> : <TermsOfService />}
              </div>
            </ScrollArea>
            
            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
              <Button 
                onClick={onClose} 
                className="bg-eatly-primary text-white hover:bg-eatly-secondary transition-colors"
              >
                Fermer
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;
