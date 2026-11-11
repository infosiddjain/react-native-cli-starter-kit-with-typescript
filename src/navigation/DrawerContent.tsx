import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton, AppText, Divider } from '@components/index';
import { useTheme } from '@hooks/useTheme';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { logout } from '@store/slices/authSlice';

/** Custom drawer: user info on top, menu items, logout at the bottom. */
export const DrawerContent = (props: DrawerContentComponentProps) => {
  const { colors, spacing, radius } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const initials =
    `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}` || '?';

  return (
    <View style={[styles.flex, { backgroundColor: colors.surface }]}>
      <DrawerContentScrollView {...props}>
        <View style={{ padding: spacing.lg }}>
          <View
            style={[
              styles.avatar,
              { backgroundColor: colors.primary, borderRadius: radius.full },
            ]}
          >
            <AppText variant="h3" color="onPrimary">
              {initials}
            </AppText>
          </View>
          <AppText variant="title" style={{ marginTop: spacing.md }}>
            {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
          </AppText>
          <AppText variant="caption" color="textSecondary">
            {user?.email}
          </AppText>
        </View>
        <Divider spacing="sm" />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View
        style={{
          padding: spacing.lg,
          paddingBottom: insets.bottom + spacing.lg,
        }}
      >
        <AppButton
          title="Log out"
          variant="outline"
          onPress={() => dispatch(logout())}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  avatar: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
