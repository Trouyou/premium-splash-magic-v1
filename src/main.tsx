
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css';

// Utiliser la clé publique de Clerk
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// En développement, on permet d'utiliser une clé fictive pour faciliter les tests
const publishableKey = CLERK_PUBLISHABLE_KEY || 'pk_test_dummy_key_for_development';

if (!CLERK_PUBLISHABLE_KEY) {
  console.warn("ATTENTION: La clé publique de Clerk est manquante. Définissez VITE_CLERK_PUBLISHABLE_KEY dans votre .env");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <App />
    </ClerkProvider>
  </React.StrictMode>,
);
