
import { MockUser } from './types';

// Simulation des utilisateurs préenregistrés
export const MOCK_USERS: Record<string, MockUser> = {
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
