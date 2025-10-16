// Environment configuration for the frontend
export interface AppConfig {
  environment: 'development' | 'staging' | 'production';
  supabaseUrl: string;
  supabaseAnonKey: string;
  apiUrl: string;
  isDevelopment: boolean;
  isStaging: boolean;
  isProduction: boolean;
}

function getEnvironment(): 'development' | 'staging' | 'production' {
  const origin = window.location.origin;
  if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
    return 'development';
  }
  if (origin.includes('staging')) {
    return 'staging';
  }
  return 'production';
}

export const appConfig: AppConfig = {
  environment: getEnvironment(),
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  get isDevelopment() {
    return this.environment === 'development';
  },
  get isStaging() {
    return this.environment === 'staging';
  },
  get isProduction() {
    return this.environment === 'production';
  },
};

// Validate required environment variables
if (!appConfig.supabaseUrl || !appConfig.supabaseAnonKey) {
  throw new Error('Missing required Supabase environment variables');
}

export default appConfig;
