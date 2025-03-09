
import { MockUser } from './types';
import { showAuthConfirmationToast } from './ui-utils';

/**
 * Simule une connexion par email avec mot de passe
 */
export const simulateEmailSignIn = (
  email: string, 
  password: string, 
  callback?: (user: MockUser) => void
): Promise<MockUser> => {
  return new Promise((resolve, reject) => {
    console.log("Simulating email sign in with:", { email, passwordLength: password?.length });
    
    // Vérification basique du mot de passe (pour simulation uniquement)
    if (!email || !password) {
      const error = new Error("L'email et le mot de passe sont requis");
      console.error("Authentication error:", error.message);
      reject(error);
      return;
    }
    
    if (password.length < 6) {
      const error = new Error("Le mot de passe doit contenir au moins 6 caractères");
      console.error("Authentication error:", error.message);
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
        showAuthConfirmationToast('Connexion simulée réussie (Mode prévisualisation)');
        
        // Exécuter le callback avec l'utilisateur simulé
        if (typeof callback === 'function') {
          callback(customUser);
        }
        
        console.log("Authentication successful:", customUser);
        resolve(customUser);
      } catch (error) {
        console.error("Authentication error:", error);
        reject(error || new Error("Erreur de connexion simulée"));
      }
    }, 800); // Délai simulé
  });
};

/**
 * Simule une inscription
 */
export const simulateSignUp = (
  email: string, 
  password: string, 
  firstName?: string, 
  lastName?: string,
  birthdate?: string,
  callback?: (user: MockUser) => void
): Promise<MockUser> => {
  return new Promise((resolve, reject) => {
    console.log("Simulating sign up with:", { email, passwordLength: password?.length, firstName, lastName, birthdate });
    
    // Vérification basique du mot de passe (pour simulation uniquement)
    if (!email || !password) {
      const error = new Error("L'email et le mot de passe sont requis");
      console.error("Sign up error:", error.message);
      reject(error);
      return;
    }
    
    if (password.length < 6) {
      const error = new Error("Le mot de passe doit contenir au moins 6 caractères");
      console.error("Sign up error:", error.message);
      reject(error);
      return;
    }
    
    // Vérification de l'âge via la date de naissance (si fournie)
    if (birthdate) {
      try {
        const birthDate = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        
        if (age < 18) {
          const error = new Error("Vous devez avoir au moins 18 ans pour créer un compte");
          console.error("Sign up error:", error.message);
          reject(error);
          return;
        }
      } catch (error) {
        console.error("Error validating birthdate:", error);
        // Continuer l'inscription si la validation de la date échoue
      }
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
          birthdate: birthdate, // Stocker la date de naissance si fournie
          loggedInAt: new Date().toISOString()
        };
        
        // Stocker dans localStorage
        localStorage.setItem('mockAuthUser', JSON.stringify(customUser));
        
        // Afficher un message de confirmation
        showAuthConfirmationToast('Inscription simulée réussie (Mode prévisualisation)');
        
        // Exécuter le callback avec l'utilisateur simulé
        if (typeof callback === 'function') {
          callback(customUser);
        }
        
        console.log("Sign up successful:", customUser);
        resolve(customUser);
      } catch (error) {
        console.error("Sign up error:", error);
        reject(error || new Error("Erreur d'inscription simulée"));
      }
    }, 800); // Délai simulé
  });
};
