/**
 * Every route name lives here. Never type a screen name as a raw string.
 */
export const ROUTES = {
  // Navigators
  AUTH_STACK: 'AuthStack',
  APP_DRAWER: 'AppDrawer',
  MAIN_TABS: 'MainTabs',

  // Auth
  LOGIN: 'Login',
  REGISTER: 'Register',

  // Bottom tabs
  HOME: 'Home',
  POSTS: 'Posts',
  PROFILE: 'Profile',

  // Drawer
  SETTINGS: 'Settings',
  PERMISSIONS: 'Permissions',

  // Stack screens (pushed on top of the drawer)
  POST_DETAIL: 'PostDetail',
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];
