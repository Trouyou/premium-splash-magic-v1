
import React from 'react';

export const PanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" strokeWidth="2" fill="none">
    {/* Main pan body with depth */}
    <path d="M12,32 C12,24 20,16 32,16 S52,24 52,32" />
    <ellipse cx="32" cy="32" rx="20" ry="4" />
    
    {/* Handle with ergonomic design */}
    <path d="M52,30 L60,30" strokeWidth="3" strokeLinecap="round" />
    <path d="M52,34 L60,34" strokeWidth="3" strokeLinecap="round" />
    <path d="M59,30 L59,34" strokeWidth="2" strokeLinecap="round" />
    
    {/* Non-stick surface texture */}
    <path d="M20,28 C24,30 28,31 32,31 S40,30 44,28" strokeWidth="1" strokeDasharray="2,2" />
    <path d="M20,24 C24,26 28,27 32,27 S40,26 44,24" strokeWidth="1" strokeDasharray="2,2" />
    
    {/* Rim detail */}
    <path d="M16,32 A24,8 0 0,1 48,32" strokeWidth="1.5" strokeOpacity="0.6" />
    
    {/* Additional depth lines */}
    <path d="M32,16 L32,32" strokeWidth="1" strokeOpacity="0.3" />
    <path d="M20,20 L20,32" strokeWidth="1" strokeOpacity="0.3" />
    <path d="M44,20 L44,32" strokeWidth="1" strokeOpacity="0.3" />
  </svg>
);
