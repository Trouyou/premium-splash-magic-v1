
import { toast } from '@/components/ui/use-toast';

export interface HealthAppConfig {
  id: string;
  name: string;
  logo: string;
  color: string;
  authUrl: string;
}

export const healthApps: HealthAppConfig[] = [
  {
    id: 'apple_health',
    name: 'Apple Santé',
    logo: '/images/health-apps/apple-health.svg',
    color: '#FF2D55',
    authUrl: '/auth/apple-health'
  },
  {
    id: 'strava',
    name: 'Strava',
    logo: '/images/health-apps/strava.svg',
    color: '#FC4C02',
    authUrl: `https://www.strava.com/oauth/authorize?client_id=${import.meta.env.VITE_STRAVA_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/callback/strava')}&response_type=code&scope=read,activity:read`
  },
  {
    id: 'google_fit',
    name: 'Google Fit',
    logo: '/images/health-apps/google-fit.svg',
    color: '#4285F4',
    authUrl: '/auth/google-fit'
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    logo: '/images/health-apps/fitbit.svg',
    color: '#00B0B9',
    authUrl: '/auth/fitbit'
  },
  {
    id: 'garmin',
    name: 'Garmin',
    logo: '/images/health-apps/garmin.svg',
    color: '#000000',
    authUrl: '/auth/garmin'
  }
];

export const initiateHealthAppConnection = async (app: HealthAppConfig) => {
  try {
    // Store the current onboarding state
    localStorage.setItem('onboardingReturnPath', window.location.pathname);
    
    // Open OAuth flow in a new window
    const width = 600;
    const height = 800;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    window.open(
      app.authUrl,
      `Connect ${app.name}`,
      `width=${width},height=${height},left=${left},top=${top}`
    );
  } catch (error) {
    console.error('Error connecting to health app:', error);
    toast({
      title: "Erreur de connexion",
      description: `Impossible de se connecter à ${app.name}. Veuillez réessayer.`,
      variant: "destructive"
    });
  }
};
