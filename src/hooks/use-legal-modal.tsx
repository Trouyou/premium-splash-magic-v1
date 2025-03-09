
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
  }, []);

  return {
    isModalOpen,
    documentType,
    openPrivacyPolicy,
    openTermsOfService,
    closeModal
  };
};
