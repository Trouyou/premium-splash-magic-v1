
// Types for our mock users
export interface MockUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  imageUrl?: string;
  provider: string;
  loggedInAt?: string;
}

export type SocialProvider = 'oauth_google' | 'oauth_facebook' | 'oauth_apple' | 'email';
