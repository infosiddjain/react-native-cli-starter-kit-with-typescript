import React, { useMemo } from 'react';
import { StatusBar } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '@constants/routes';
import { useTheme } from '@hooks/useTheme';
import PostDetailScreen from '@screens/posts/PostDetailScreen';
import { useAppSelector } from '@store/hooks';
import { AppDrawer } from './AppDrawer';
import { AuthStack } from './AuthStack';
import { navigationRef } from './navigationService';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Switches between the auth flow and the app based on the token.
 * Logging in/out re-renders this and React Navigation swaps the screens.
 */
export const RootNavigator = () => {
  const theme = useTheme();
  const isLoggedIn = useAppSelector(state => !!state.auth.token);

  // Map our theme onto React Navigation's theme (backgrounds, cards...).
  const navTheme = useMemo(() => {
    const base = theme.dark ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: theme.colors.primary,
        background: theme.colors.background,
        card: theme.colors.surface,
        text: theme.colors.text,
        border: theme.colors.border,
        notification: theme.colors.error,
      },
    };
  }, [theme]);

  return (
    <NavigationContainer ref={navigationRef} theme={navTheme}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name={ROUTES.APP_DRAWER} component={AppDrawer} />
            <Stack.Screen
              name={ROUTES.POST_DETAIL}
              component={PostDetailScreen}
            />
          </>
        ) : (
          <Stack.Screen name={ROUTES.AUTH_STACK} component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
