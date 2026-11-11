/** Keys from the .env files. Add a line here for every new variable. */
declare module 'react-native-config' {
  export interface NativeConfig {
    APP_ENV?: 'development' | 'staging' | 'production';
    API_BASE_URL?: string;
    API_TIMEOUT?: string;
    ENABLE_API_LOGS?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
