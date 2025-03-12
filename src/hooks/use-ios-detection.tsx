
import { useState, useEffect } from 'react';

export const useIsIOS = () => {
  const [isIOS, setIsIOS] = useState<boolean>(false);

  useEffect(() => {
    const checkIsIOS = () => {
      const ua = window.navigator.userAgent;
      const isIOSDevice = /iPad|iPhone|iPod/.test(ua) || 
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      setIsIOS(isIOSDevice);
    };

    checkIsIOS();
    
    // Réécoutez en cas de changement d'orientation
    window.addEventListener('orientationchange', checkIsIOS);
    return () => window.removeEventListener('orientationchange', checkIsIOS);
  }, []);

  return isIOS;
};
