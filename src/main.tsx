
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css';

// Utiliser la clé publique de Clerk
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  console.error("ERREUR: La clé publique de Clerk est manquante. Définissez VITE_CLERK_PUBLISHABLE_KEY dans votre .env");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY || 'pk_test_dummy_key_for_development'}>
      <App />
    </ClerkProvider>
  </React.StrictMode>,
);
