
import { useState } from 'react';
import SocialButton from './SocialButton';
import { useAuth } from '@/context/AuthContext';
import { SocialProvider } from '@/hooks/auth/use-social-sign-in';

const SocialLoginSection = () => {
  const [error, setError] = useState('');
  const { signInWithSocial, isLoading } = useAuth();

  // Composants SVG pour les logos sociaux
  const GoogleLogo = () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  const FacebookLogo = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.38823 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" />
    </svg>
  );

  const handleSocialLogin = async (provider: SocialProvider) => {
    setError('');
    try {
      await signInWithSocial(provider);
    } catch (err: any) {
      setError(err.message || `Connexion avec ${provider.replace('oauth_', '')} non disponible pour le moment`);
    }
  };

  return (
    <div className="space-y-3 mb-6">
      <SocialButton 
        icon={<GoogleLogo />} 
        provider="Google" 
        onClick={() => handleSocialLogin('oauth_google')} 
        disabled={isLoading}
      />
      <SocialButton 
        icon={<FacebookLogo />} 
        provider="Facebook" 
        onClick={() => handleSocialLogin('oauth_facebook')} 
        disabled={isLoading}
      />
      {error && (
        <div className="text-eatly-primary text-sm mt-2">
          {error}
        </div>
      )}
    </div>
  );
};

export default SocialLoginSection;
