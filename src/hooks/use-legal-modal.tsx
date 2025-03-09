
import { useState, useCallback } from 'react';

type DocumentType = 'privacy' | 'terms' | null;

export const useLegalModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentType, setDocumentType] = useState<DocumentType>(null);

  const openPrivacyPolicy = useCallback(() => {
    setDocumentType('privacy');
    setIsModalOpen(true);
  }, []);

  const openTermsOfService = useCallback(() => {
    setDocumentType('terms');
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Don't reset documentType immediately to allow exit animation
    setTimeout(() => {
      setDocumentType(null);
    }, 300);
  }, []);

  return {
    isModalOpen,
    documentType,
    openPrivacyPolicy,
    openTermsOfService,
    closeModal
  };
};
