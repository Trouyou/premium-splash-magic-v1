
/**
 * Dictionnaire de traduction des messages d'erreur
 */

// Dictionnaire de traduction des messages d'erreur
export const errorDictionary = {
  // Messages d'erreur d'authentification
  'single session mode': 'Vous êtes actuellement en mode session unique. Vous ne pouvez être connecté qu\'à un seul compte à la fois.',
  'signed into one account': 'Vous êtes actuellement en mode session unique. Vous ne pouvez être connecté qu\'à un seul compte à la fois.',
  'connection failed': 'Échec de la connexion au fournisseur d\'authentification.',
  'Failed to connect': 'Échec de la connexion au fournisseur d\'authentification.',
  'popup closed': 'La fenêtre d\'authentification a été fermée. Veuillez réessayer.',
  'window closed': 'La fenêtre d\'authentification a été fermée. Veuillez réessayer.',
  'network error': 'Erreur réseau. Veuillez vérifier votre connexion internet.',
  'invalid credentials': 'Identifiants incorrects. Veuillez vérifier votre email et mot de passe.',
  'Invalid credentials': 'Identifiants incorrects. Veuillez vérifier votre email et mot de passe.',
  'not found': 'Compte non trouvé. Veuillez vérifier vos informations ou créer un compte.',
  'does not exist': 'Compte non trouvé. Veuillez vérifier vos informations ou créer un compte.',
  'invalid email': 'Adresse email invalide.',
  'contains 6 characters': 'Le mot de passe doit contenir au moins 6 caractères.',
  'at least 6 characters': 'Le mot de passe doit contenir au moins 6 caractères.',
  
  // Messages d'erreur de formulaire
  'Please fill out this field': 'Ce champ est requis',
  'Please fill out this field.': 'Ce champ est requis',
  'Invalid email address': 'Adresse email invalide',
  'Email not provided': 'Adresse email requise',
  'Password not provided': 'Mot de passe requis',
  'Password is too short': 'Le mot de passe doit contenir au moins 8 caractères',
  'Passwords do not match': 'Les mots de passe ne correspondent pas',
  'Username already taken': 'Ce nom d\'utilisateur est déjà utilisé',
  'Email already registered': 'Cette adresse email est déjà enregistrée',
  'Please accept the terms': 'Veuillez accepter les conditions d\'utilisation',
  'Invalid input': 'Saisie invalide',
  'Required field': 'Champ obligatoire',
  'L\'email et le mot de passe sont requis': 'L\'email et le mot de passe sont requis',
  'Le mot de passe doit contenir au moins 6 caractères': 'Le mot de passe doit contenir au moins 6 caractères',
  'Erreur de connexion simulée': 'Erreur de connexion simulée',
  'Erreur lors de la connexion': 'Erreur lors de la connexion',
  'Erreur d\'inscription simulée': 'Erreur d\'inscription simulée',
  'Erreur lors de l\'inscription': 'Erreur lors de l\'inscription'
};

// Exporter les messages par défaut pour réutilisation
export const defaultErrorMessages = {
  email: 'Adresse email invalide',
  password: 'Veuillez entrer un mot de passe valide',
  required: 'Ce champ est requis',
  terms: 'Veuillez accepter les conditions d\'utilisation',
  passwordMatch: 'Les mots de passe ne correspondent pas',
  shortPassword: 'Le mot de passe doit contenir au moins 8 caractères'
};
