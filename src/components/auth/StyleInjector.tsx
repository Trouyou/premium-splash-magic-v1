
import { useEffect } from 'react';
import '@/styles/auth.css';
import '@/styles/form-errors.css';

const StyleInjector = () => {
  useEffect(() => {
    // Inject any additional styles or scripts needed for auth pages
    console.log('StyleInjector: Auth styles injected');
  }, []);
  
  return null;
};

export default StyleInjector;
