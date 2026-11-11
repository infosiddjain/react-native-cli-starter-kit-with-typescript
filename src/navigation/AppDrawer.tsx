import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { ROUTES } from '@constants/routes';
import { useTheme } from '@hooks/useTheme';
import PermissionsScreen from '@screens/permissions/PermissionsScreen';
import SettingsScreen from '@screens/settings/SettingsScreen';
import { BottomTabs } from './BottomTabs';
import { DrawerContent } from './DrawerContent';
import type { DrawerParamList } from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();

const renderDrawerContent = (props: DrawerContentComponentProps) => (
  <DrawerContent {...props} />
);

export const AppDrawer = () => {
  const { colors, fontFamily } = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName={ROUTES.MAIN_TABS}
      drawerContent={renderDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.text,
        drawerLabelStyle: { fontFamily: fontFamily.medium },
        drawerStyle: { backgroundColor: colors.surface },
      }}
    >
      <Drawer.Screen
        name={ROUTES.MAIN_TABS}
        component={BottomTabs}
        options={{ title: 'Home' }}
      />
      <Drawer.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
      <Drawer.Screen name={ROUTES.PERMISSIONS} component={PermissionsScreen} />
    </Drawer.Navigator>
  );
};
