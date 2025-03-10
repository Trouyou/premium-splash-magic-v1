
import React from 'react';

export const PotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" strokeWidth="2" fill="none">
    {/* Tall main body */}
    <path d="M14,48 L14,22 C14,18 18,14 22,14 L42,14 C46,14 50,18 50,22 L50,48" />
    <ellipse cx="32" cy="48" rx="18" ry="4" />
    
    {/* Side handles */}
    <path d="M14,30 C10,30 8,34 14,34" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M50,30 C54,30 56,34 50,34" strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Domed lid with handle */}
    <path d="M14,22 C14,20 22,16 32,16 S50,20 50,22" />
    <path d="M30,14 L34,14" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="32" cy="14" r="1" fill="currentColor" />
    
    {/* Volume and depth details */}
    <path d="M22,22 L22,48" strokeWidth="1.5" strokeDasharray="2,2" />
    <path d="M42,22 L42,48" strokeWidth="1.5" strokeDasharray="2,2" />
    <path d="M32,22 L32,48" strokeWidth="1" strokeOpacity="0.4" />
    
    {/* Additional rim detail */}
    <path d="M18,48 C18,46 24,44 32,44 S46,46 46,48" strokeWidth="1" strokeOpacity="0.5" />
    <path d="M18,22 C18,20 24,18 32,18 S46,20 46,22" strokeWidth="1" strokeOpacity="0.5" />
  </svg>
);
