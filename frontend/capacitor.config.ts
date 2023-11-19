import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'VoluntariONE',
  webDir: 'build',
  server: {
    androidScheme: 'https',
    url: 'http://localhost:8100',
    cleartext: true,
  },
  plugins: {
    CapacitorHttp : {
      enabled: true
    }
  }
};

export default config;
