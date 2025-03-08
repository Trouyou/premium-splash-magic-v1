
// Ce fichier gère la simulation d'authentification uniquement dans l'environnement Lovable

// Fonction pour détecter l'environnement Lovable/preview
export const isPreviewEnvironment = () => {
  return typeof window !== 'undefined' && 
         (window.location.hostname.includes('lovableproject.com') || 
          window.top !== window.self);
};

// Types for our mock users
interface MockUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  imageUrl?: string;
  provider: string;
  loggedInAt?: string;
}

// Simulation des utilisateurs préenregistrés
const MOCK_USERS: Record<string, MockUser> = {
  google: {
    id: 'mock-google-123',
    email: 'utilisateur.test@gmail.com',
    firstName: 'Utilisateur',
    lastName: 'Google',
    fullName: 'Utilisateur Google',
    imageUrl: 'https://lh3.googleusercontent.com/a/default-user=s128',
    provider: 'google'
  },
  apple: {
    id: 'mock-apple-456',
    email: 'utilisateur.test@icloud.com',
    firstName: 'Utilisateur',
    lastName: 'Apple',
    fullName: 'Utilisateur Apple',
    imageUrl: 'https://ui-avatars.com/api/?name=Utilisateur+Apple&background=0D8ABC&color=fff',
    provider: 'apple'
  },
  facebook: {
    id: 'mock-facebook-789',
    email: 'utilisateur.test@facebook.com',
    firstName: 'Utilisateur',
    lastName: 'Facebook',
    fullName: 'Utilisateur Facebook',
    imageUrl: 'https://ui-avatars.com/api/?name=Utilisateur+Facebook&background=3b5998&color=fff',
    provider: 'facebook'
  },
  email: {
    id: 'mock-email-101',
    email: 'utilisateur@eatly.fr',
    firstName: 'Utilisateur',
    lastName: 'Eatly',
    fullName: 'Utilisateur Eatly',
    imageUrl: 'https://ui-avatars.com/api/?name=Utilisateur+Eatly&background=9C1B1A&color=fff',
    provider: 'email'
  }
};

// Fonction pour simuler une connexion
export const simulateSignIn = (
  provider: string, 
  callback?: (user: MockUser) => void
): MockUser => {
  console.log(`[AUTH SIMULATOR] Connexion simulée avec ${provider}`);
  
  // Récupérer l'utilisateur préenregistré ou créer un utilisateur par défaut
  const providerKey = provider.replace('oauth_', '');
  const user = MOCK_USERS[providerKey] || {
    id: `mock-${providerKey}-${Date.now()}`,
    email: `utilisateur.test@${providerKey}.com`,
    firstName: 'Utilisateur',
    lastName: providerKey.charAt(0).toUpperCase() + providerKey.slice(1),
    fullName: `Utilisateur ${providerKey.charAt(0).toUpperCase() + providerKey.slice(1)}`,
    imageUrl: `https://ui-avatars.com/api/?name=Utilisateur+${providerKey.charAt(0).toUpperCase() + providerKey.slice(1)}&background=9C1B1A&color=fff`,
    provider: providerKey
  };
  
  // Ajouter l'horodatage
  user.loggedInAt = new Date().toISOString();
  
  // Stocker dans localStorage
  localStorage.setItem('mockAuthUser', JSON.stringify(user));
  
  // Afficher un message de confirmation
  const message = document.createElement('div');
  message.style.position = 'fixed';
  message.style.top = '20px';
  message.style.left = '50%';
  message.style.transform = 'translateX(-50%)';
  message.style.backgroundColor = '#9C1B1A';
  message.style.color = 'white';
  message.style.padding = '12px 20px';
  message.style.borderRadius = '6px';
  message.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  message.style.zIndex = '9999';
  message.style.opacity = '0';
  message.style.transition = 'opacity 0.3s ease';
  message.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>Connexion simulée réussie (Mode prévisualisation)</span>
    </div>
  `;
  document.body.appendChild(message);
  
  // Animation d'apparition
  setTimeout(() => {
    message.style.opacity = '1';
  }, 100);
  
  // Animation de disparition
  setTimeout(() => {
    message.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(message);
    }, 300);
  }, 3000);
  
  // Exécuter le callback avec l'utilisateur simulé
  if (typeof callback === 'function') {
    setTimeout(() => {
      callback(user);
    }, 800);
  }
  
  return user;
};

// Fonction pour simuler une connexion par email avec mot de passe
export const simulateEmailSignIn = (
  email: string, 
  password: string, 
  callback?: (user: MockUser) => void
): Promise<MockUser> => {
  return new Promise((resolve, reject) => {
    // Vérification basique du mot de passe (pour simulation uniquement)
    if (!email || !password) {
      const error = new Error("L'email et le mot de passe sont requis");
      reject(error);
      return;
    }
    
    if (password.length < 6) {
      const error = new Error("Le mot de passe doit contenir au moins 6 caractères");
      reject(error);
      return;
    }
    
    // Simuler un délai réseau
    setTimeout(() => {
      try {
        // Créer un utilisateur custom basé sur l'email fourni
        const nameParts = email.split('@')[0].split('.');
        const firstName = nameParts[0] ? nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1) : 'Utilisateur';
        const lastName = nameParts[1] ? nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1) : 'Eatly';
        
        const customUser: MockUser = {
          id: `mock-email-${Date.now()}`,
          email: email,
          firstName: firstName,
          lastName: lastName,
          fullName: `${firstName} ${lastName}`,
          imageUrl: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=9C1B1A&color=fff`,
          provider: 'email',
          loggedInAt: new Date().toISOString()
        };
        
        // Stocker dans localStorage
        localStorage.setItem('mockAuthUser', JSON.stringify(customUser));
        
        // Afficher un message de confirmation
        const message = document.createElement('div');
        message.style.position = 'fixed';
        message.style.top = '20px';
        message.style.left = '50%';
        message.style.transform = 'translateX(-50%)';
        message.style.backgroundColor = '#9C1B1A';
        message.style.color = 'white';
        message.style.padding = '12px 20px';
        message.style.borderRadius = '6px';
        message.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        message.style.zIndex = '9999';
        message.style.opacity = '0';
        message.style.transition = 'opacity 0.3s ease';
        message.innerHTML = `
          <div style="display: flex; align-items: center; gap: 10px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Connexion simulée réussie (Mode prévisualisation)</span>
          </div>
        `;
        document.body.appendChild(message);
        
        // Animation d'apparition
        setTimeout(() => {
          message.style.opacity = '1';
        }, 100);
        
        // Animation de disparition
        setTimeout(() => {
          message.style.opacity = '0';
          setTimeout(() => {
            document.body.removeChild(message);
          }, 300);
        }, 3000);
        
        // Exécuter le callback avec l'utilisateur simulé
        if (typeof callback === 'function') {
          callback(customUser);
        }
        
        resolve(customUser);
      } catch (error) {
        reject(error || new Error("Erreur de connexion simulée"));
      }
    }, 800); // Délai simulé
  });
};

// Fonction pour vérifier si l'utilisateur est connecté
export const isAuthenticated = (): boolean => {
  try {
    const user = JSON.parse(localStorage.getItem('mockAuthUser') || 'null');
    return !!user?.id;
  } catch {
    return false;
  }
};

// Fonction pour récupérer l'utilisateur connecté
export const getAuthenticatedUser = (): MockUser | null => {
  try {
    return JSON.parse(localStorage.getItem('mockAuthUser') || 'null');
  } catch {
    return null;
  }
};

// Fonction pour simuler une déconnexion
export const simulateSignOut = (callback?: () => void): void => {
  console.log('[AUTH SIMULATOR] Déconnexion simulée');
  localStorage.removeItem('mockAuthUser');
  
  if (typeof callback === 'function') {
    setTimeout(callback, 500);
  }
};

// Fonction pour simuler une inscription
export const simulateSignUp = (
  email: string, 
  password: string, 
  firstName?: string, 
  lastName?: string, 
  callback?: (user: MockUser) => void
): Promise<MockUser> => {
  return new Promise((resolve, reject) => {
    // Vérification basique du mot de passe (pour simulation uniquement)
    if (!email || !password) {
      reject(new Error("L'email et le mot de passe sont requis"));
      return;
    }
    
    if (password.length < 6) {
      reject(new Error("Le mot de passe doit contenir au moins 6 caractères"));
      return;
    }
    
    // Simuler un délai réseau
    setTimeout(() => {
      try {
        // Créer un utilisateur basé sur les informations fournies
        const userFirstName = firstName || email.split('@')[0].split('.')[0];
        const userLastName = lastName || email.split('@')[0].split('.')[1] || 'Eatly';
        
        const customUser: MockUser = {
          id: `mock-signup-${Date.now()}`,
          email: email,
          firstName: userFirstName,
          lastName: userLastName,
          fullName: `${userFirstName} ${userLastName}`,
          imageUrl: `https://ui-avatars.com/api/?name=${userFirstName}+${userLastName}&background=9C1B1A&color=fff`,
          provider: 'email',
          loggedInAt: new Date().toISOString()
        };
        
        // Stocker dans localStorage
        localStorage.setItem('mockAuthUser', JSON.stringify(customUser));
        
        // Afficher un message de confirmation
        const message = document.createElement('div');
        message.style.position = 'fixed';
        message.style.top = '20px';
        message.style.left = '50%';
        message.style.transform = 'translateX(-50%)';
        message.style.backgroundColor = '#9C1B1A';
        message.style.color = 'white';
        message.style.padding = '12px 20px';
        message.style.borderRadius = '6px';
        message.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        message.style.zIndex = '9999';
        message.style.opacity = '0';
        message.style.transition = 'opacity 0.3s ease';
        message.innerHTML = `
          <div style="display: flex; align-items: center; gap: 10px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Inscription simulée réussie (Mode prévisualisation)</span>
          </div>
        `;
        document.body.appendChild(message);
        
        // Animation d'apparition
        setTimeout(() => {
          message.style.opacity = '1';
        }, 100);
        
        // Animation de disparition
        setTimeout(() => {
          message.style.opacity = '0';
          setTimeout(() => {
            document.body.removeChild(message);
          }, 300);
        }, 3000);
        
        // Exécuter le callback avec l'utilisateur simulé
        if (typeof callback === 'function') {
          callback(customUser);
        }
        
        resolve(customUser);
      } catch (error) {
        reject(error || new Error("Erreur d'inscription simulée"));
      }
    }, 800); // Délai simulé
  });
};
