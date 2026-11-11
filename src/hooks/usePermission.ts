import { useCallback, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import {
  AppPermission,
  checkPermission,
  isGranted,
  PermissionStatus,
  requestPermission,
} from '@utils/permissions';

/**
 * const { granted, request } = usePermission('camera');
 * Re-checks when the app returns from background (e.g. after Settings).
 */
export const usePermission = (type: AppPermission) => {
  const [status, setStatus] = useState<PermissionStatus | null>(null);

  const refresh = useCallback(async () => {
    setStatus(await checkPermission(type));
  }, [type]);

  const request = useCallback(async () => {
    const result = await requestPermission(type);
    setStatus(result);
    return isGranted(result);
  }, [type]);

  useEffect(() => {
    refresh();
    const sub = AppState.addEventListener('change', s => {
      if (s === 'active') {
        refresh();
      }
    });
    return () => sub.remove();
  }, [refresh]);

  return {
    status,
    granted: status ? isGranted(status) : false,
    request,
    refresh,
  };
};
