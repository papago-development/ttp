import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.ionstarter.angularfirebase.demo',
  appName: 'angular-firebase-starter',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ['apple.com', 'google.com'],
    },
    LiveUpdate: {
      appId: '71fdd234-b5f2-4678-bfbe-46ea22b9112e',
      autoDeleteBundles: true,
      enabled: true,
    },
    SplashScreen: {
      launchAutoHide: false,
      showSpinner: false,
    },
  },
};

export default config;
