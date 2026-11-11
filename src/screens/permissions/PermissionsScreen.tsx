import React from 'react';
import { StyleSheet, View } from 'react-native';
import { openSettings } from 'react-native-permissions';
import {
  AppButton,
  AppText,
  Card,
  Header,
  ScreenWrapper,
  Spacer,
} from '@components/index';
import { usePermission } from '@hooks/usePermission';
import type { AppPermission } from '@utils/permissions';

const ITEMS: { type: AppPermission; title: string; description: string }[] = [
  {
    type: 'camera',
    title: 'Camera',
    description: 'Take photos and scan codes',
  },
  { type: 'location', title: 'Location', description: 'Show content near you' },
  {
    type: 'photos',
    title: 'Photos',
    description: 'Pick images from your gallery',
  },
  {
    type: 'notifications',
    title: 'Notifications',
    description: 'Get updates and alerts',
  },
];

const PermissionRow = ({
  type,
  title,
  description,
}: (typeof ITEMS)[number]) => {
  const { status, granted, request } = usePermission(type);

  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <View style={styles.flex}>
          <AppText variant="title">{title}</AppText>
          <AppText variant="caption" color="textSecondary">
            {description}
          </AppText>
          <AppText variant="caption" color={granted ? 'success' : 'warning'}>
            Status: {status ?? 'checking...'}
          </AppText>
        </View>
        <AppButton
          title={granted ? 'Allowed' : 'Allow'}
          size="sm"
          fullWidth={false}
          variant={granted ? 'outline' : 'primary'}
          disabled={granted || status === 'unavailable'}
          onPress={request}
        />
      </View>
    </Card>
  );
};

/** Example of the usePermission hook. */
const PermissionsScreen = () => (
  <ScreenWrapper scrollable header={<Header title="Permissions" showMenu />}>
    {ITEMS.map(item => (
      <PermissionRow key={item.type} {...item} />
    ))}
    <Spacer />
    <AppButton
      title="Open app settings"
      variant="ghost"
      onPress={() => openSettings()}
    />
  </ScreenWrapper>
);

const styles = StyleSheet.create({
  flex: { flex: 1, marginRight: 12 },
  card: { marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center' },
});

export default PermissionsScreen;
