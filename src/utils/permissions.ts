import { Alert, Platform } from 'react-native';
import {
  check,
  checkNotifications,
  openSettings,
  Permission,
  PERMISSIONS,
  PermissionStatus,
  request,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';

/**
 * App-level permission names. Add new ones here and in:
 *  - ios/Podfile  -> setup_permissions([...])
 *  - ios/<App>/Info.plist -> NS...UsageDescription
 *  - android/app/src/main/AndroidManifest.xml -> <uses-permission />
 */
export type AppPermission = 'camera' | 'location' | 'photos' | 'notifications';

const PERMISSION_MAP: Record<
  Exclude<AppPermission, 'notifications'>,
  Permission
> = {
  camera: Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    default: PERMISSIONS.ANDROID.CAMERA,
  }),
  location: Platform.select({
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    default: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  }),
  photos: Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    default: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
  }),
};

export { RESULTS };
export type { PermissionStatus };

export const checkPermission = async (
  type: AppPermission,
): Promise<PermissionStatus> => {
  if (type === 'notifications') {
    return (await checkNotifications()).status;
  }
  return check(PERMISSION_MAP[type]);
};

/**
 * Asks for a permission. If the user blocked it before, offers to open
 * the system settings instead (the OS will not show the dialog again).
 */
export const requestPermission = async (
  type: AppPermission,
): Promise<PermissionStatus> => {
  const current = await checkPermission(type);
  if (current === RESULTS.GRANTED || current === RESULTS.LIMITED) {
    return current;
  }
  if (current === RESULTS.BLOCKED) {
    showSettingsAlert(type);
    return current;
  }
  if (current === RESULTS.UNAVAILABLE) {
    return current;
  }
  if (type === 'notifications') {
    return (await requestNotifications(['alert', 'sound', 'badge'])).status;
  }
  return request(PERMISSION_MAP[type]);
};

export const isGranted = (status: PermissionStatus) =>
  status === RESULTS.GRANTED || status === RESULTS.LIMITED;

export const showSettingsAlert = (type: AppPermission) =>
  Alert.alert(
    'Permission needed',
    `Please allow ${type} access in Settings to use this feature.`,
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: () => openSettings() },
    ],
  );
