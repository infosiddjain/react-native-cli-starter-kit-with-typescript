import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ROUTES } from '@constants/routes';

/**
 * Route params for every navigator. `undefined` = screen takes no params.
 *
 * Root (native stack)
 * ├── AuthStack (native stack): Login, Register          ← logged out
 * ├── AppDrawer (drawer)                                  ← logged in
 * │   ├── MainTabs (bottom tabs): Home, Posts, Profile
 * │   ├── Settings
 * │   └── Permissions
 * └── PostDetail (pushed over the drawer, hides tab bar)
 */
export type AuthStackParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.REGISTER]: undefined;
};

export type TabParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.POSTS]: undefined;
  [ROUTES.PROFILE]: undefined;
};

export type DrawerParamList = {
  [ROUTES.MAIN_TABS]: NavigatorScreenParams<TabParamList>;
  [ROUTES.SETTINGS]: undefined;
  [ROUTES.PERMISSIONS]: undefined;
};

export type RootStackParamList = {
  [ROUTES.AUTH_STACK]: NavigatorScreenParams<AuthStackParamList>;
  [ROUTES.APP_DRAWER]: NavigatorScreenParams<DrawerParamList>;
  [ROUTES.POST_DETAIL]: { id: number; title?: string };
};

// Screen prop helpers -> `({ navigation, route }: TabScreen<'Home'>)`
export type RootScreen<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type AuthScreen<T extends keyof AuthStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList, T>,
    RootScreen<keyof RootStackParamList>
  >;

export type DrawerScreen<T extends keyof DrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, T>,
    RootScreen<keyof RootStackParamList>
  >;

export type TabScreen<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  DrawerScreen<keyof DrawerParamList>
>;

// Makes useNavigation() typed everywhere without generics.
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
