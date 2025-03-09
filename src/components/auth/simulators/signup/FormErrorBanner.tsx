
import React from 'react';

interface FormErrorBannerProps {
  error: string;
}

const FormErrorBanner = ({ error }: FormErrorBannerProps) => {
  if (!error) return null;
  
  return (
    <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm flex items-center">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="mr-2 flex-shrink-0"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>{error}</span>
    </div>
  );
};

export default FormErrorBanner;
