import Env from 'react-native-config';

/**
 * App configuration, read from the active .env file (see .env.example).
 * All .env values are strings, so they are converted here once.
 * Fallbacks keep the app working if a value is missing.
 */
export const CONFIG = {
  APP_ENV: Env.APP_ENV ?? (__DEV__ ? 'development' : 'production'),
  API_BASE_URL: Env.API_BASE_URL ?? 'https://dummyjson.com',
  API_TIMEOUT: Number(Env.API_TIMEOUT ?? 15000),
  ENABLE_API_LOGS: Env.ENABLE_API_LOGS
    ? Env.ENABLE_API_LOGS === 'true'
    : __DEV__,
} as const;

export const IS_PRODUCTION = CONFIG.APP_ENV === 'production';
