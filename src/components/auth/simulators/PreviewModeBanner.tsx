
import React, { useState } from 'react';
import { isPreviewEnvironment } from '@/utils/auth-simulator';

export const PreviewModeBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isPreviewEnvironment() || !isVisible) return null;
  
  return (
    <div className="bg-yellow-100 border-b border-yellow-200 p-2 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-yellow-600 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-yellow-800">
            Mode prévisualisation activé - Authentification simulée pour Lovable
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-yellow-600 hover:text-yellow-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PreviewModeBanner;
