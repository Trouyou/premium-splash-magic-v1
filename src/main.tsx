
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css';

// Utiliser la clé publique de Clerk fournie
const CLERK_PUBLISHABLE_KEY = "pk_test_aW5mb3JtZWQtaGFtc3Rlci04LmNsZXJrLmFjY291bnRzLmRldiQ";

// Vérifier que la clé est définie
if (!CLERK_PUBLISHABLE_KEY) {
  console.warn("ATTENTION: La clé publique de Clerk est manquante. Définissez VITE_CLERK_PUBLISHABLE_KEY dans votre .env");
  console.info("L'application fonctionnera en mode de démonstration limité.");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>,
);
