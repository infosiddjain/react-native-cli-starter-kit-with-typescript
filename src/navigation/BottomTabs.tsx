import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppText } from '@components/ui/AppText';
import { ROUTES } from '@constants/routes';
import { useTheme } from '@hooks/useTheme';
import HomeScreen from '@screens/home/HomeScreen';
import PostsScreen from '@screens/posts/PostsScreen';
import ProfileScreen from '@screens/profile/ProfileScreen';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

/**
 * Tab icons are plain text glyphs so the kit has no icon dependency.
 * Swap for @react-native-vector-icons or SVGs in your project.
 */
const TAB_ICONS: Record<keyof TabParamList, string> = {
  [ROUTES.HOME]: '⌂',
  [ROUTES.POSTS]: '☰',
  [ROUTES.PROFILE]: '◉',
};

const renderTabIcon =
  (name: keyof TabParamList) =>
  ({ color }: { color: string }) =>
    (
      <AppText size={20} color={color}>
        {TAB_ICONS[name]}
      </AppText>
    );

export const BottomTabs = () => {
  const { colors, fontFamily } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: { fontFamily: fontFamily.medium },
        tabBarIcon: renderTabIcon(route.name),
      })}
    >
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Tab.Screen name={ROUTES.POSTS} component={PostsScreen} />
      <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
};
