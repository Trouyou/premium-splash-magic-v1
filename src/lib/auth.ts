
import { SignInResource, SignUpResource } from "@clerk/types";

// Fonction pour normaliser les données utilisateur venant de différents fournisseurs
export const normalizeUserData = (user: any) => {
  return {
    id: user.id || "",
    email: user.emailAddresses?.[0]?.emailAddress || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    imageUrl: user.imageUrl || "",
  };
};

// Options pour la connexion sociale
export const socialLoginOptions = {
  redirectUrl: "/",
  appearance: {
    elements: {
      formButtonPrimary: "hidden", // Cacher les boutons par défaut de Clerk
      socialButtonsBlockButton: "hidden",
      footerActionLink: "hidden",
    }
  }
};

// Configuration pour le formulaire de connexion
export const signInConfig: Record<string, any> = {
  appearance: {
    elements: {
      formButtonPrimary: "hidden",
      socialButtonsBlockButton: "hidden",
      footerActionLink: "hidden",
    }
  }
};

// Configuration pour le formulaire d'inscription
export const signUpConfig: Record<string, any> = {
  appearance: {
    elements: {
      formButtonPrimary: "hidden",
      socialButtonsBlockButton: "hidden",
      footerActionLink: "hidden",
    }
  }
};
