import React, { useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import {
  AppButton,
  AppText,
  Card,
  Divider,
  Header,
  ScreenWrapper,
  Spacer,
} from '@components/index';
import { ROUTES } from '@constants/routes';
import { useTheme } from '@hooks/useTheme';
import type { TabScreen } from '@navigation/types';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { logout } from '@store/slices/authSlice';
import { fetchProfile } from '@store/thunks/authThunks';

const ProfileScreen = ({ navigation }: TabScreen<typeof ROUTES.PROFILE>) => {
  const dispatch = useAppDispatch();
  const { colors, radius } = useTheme();
  const user = useAppSelector(state => state.auth.user);
  const [refreshing, setRefreshing] = useState(false);

  // Thunks return a promise; .unwrap() throws on rejection.
  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchProfile())
      .unwrap()
      .catch(() => undefined);
    setRefreshing(false);
  };

  const rows: [string, string | undefined][] = [
    ['Username', user?.username],
    ['Email', user?.email],
    ['First name', user?.firstName],
    ['Last name', user?.lastName],
  ];

  return (
    <ScreenWrapper
      scrollable
      header={<Header title="Profile" showMenu />}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary}
        />
      }
    >
      <View style={styles.center}>
        <View
          style={[
            styles.avatar,
            { backgroundColor: colors.primary, borderRadius: radius.full },
          ]}
        >
          <AppText variant="h1" color="onPrimary">
            {user?.firstName?.[0] ?? '?'}
          </AppText>
        </View>
        <Spacer />
        <AppText variant="h3">
          {user?.firstName} {user?.lastName}
        </AppText>
        <AppText color="textSecondary">@{user?.username}</AppText>
      </View>
      <Spacer size="xl" />

      <Card>
        {rows.map(([label, value], i) => (
          <View key={label}>
            {i > 0 ? <Divider /> : null}
            <View style={styles.row}>
              <AppText color="textSecondary">{label}</AppText>
              <AppText weight="medium">{value ?? '-'}</AppText>
            </View>
          </View>
        ))}
      </Card>
      <Spacer size="xl" />

      <AppButton
        title="Settings"
        variant="outline"
        onPress={() => navigation.navigate(ROUTES.SETTINGS)}
      />
      <Spacer />
      <AppButton
        title="Log out"
        variant="danger"
        onPress={() => dispatch(logout())}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  center: { alignItems: 'center' },
  avatar: {
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
});

export default ProfileScreen;
