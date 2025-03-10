
import React from 'react';

export const SaucepanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" strokeWidth="2" fill="none">
    {/* Main body with perspective */}
    <path d="M16,46 L16,26 C16,22 20,18 24,18 L40,18 C44,18 48,22 48,26 L48,46" />
    <ellipse cx="32" cy="46" rx="16" ry="4" />
    
    {/* Handle with ergonomic grip */}
    <path d="M48,28 L56,28" strokeWidth="3" strokeLinecap="round" />
    <path d="M48,32 L56,32" strokeWidth="3" strokeLinecap="round" />
    <path d="M55,28 L55,32" strokeWidth="2" strokeLinecap="round" />
    
    {/* Lid with handle */}
    <path d="M16,26 L48,26" strokeWidth="2" />
    <ellipse cx="32" cy="26" rx="16" ry="4" />
    <path d="M30,22 L34,22" strokeWidth="2" strokeLinecap="round" />
    
    {/* Depth and volume details */}
    <path d="M20,26 L20,46" strokeWidth="1" strokeOpacity="0.5" />
    <path d="M44,26 L44,46" strokeWidth="1" strokeOpacity="0.5" />
    <path d="M32,26 L32,46" strokeWidth="1" strokeOpacity="0.3" />
  </svg>
);
