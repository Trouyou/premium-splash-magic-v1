
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css';

// Utiliser la clé publique de Clerk depuis les variables d'environnement
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_aW5mb3JtZWQtaGFtc3Rlci04LmNsZXJrLmFjY291bnRzLmRldiQ";

// Vérifier que la clé est définie
if (!CLERK_PUBLISHABLE_KEY) {
  console.warn("ATTENTION: La clé publique de Clerk est manquante. Définissez VITE_CLERK_PUBLISHABLE_KEY dans votre .env");
  console.info("L'application fonctionnera en mode de démonstration limité.");
}

// Déterminer si nous sommes dans un environnement preview/iframe
const isPreviewEnvironment = () => {
  return typeof window !== 'undefined' && 
         (window.location.hostname.includes('lovableproject.com') || 
          window.top !== window.self);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={CLERK_PUBLISHABLE_KEY}
      appearance={{
        variables: {
          colorPrimary: '#9C1B1A',
          colorText: '#000000',
          colorTextSecondary: '#4A5568',
          colorBackground: '#FFFFFF',
        }
      }}
      navigate={(to) => window.location.href = to}
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>,
);
