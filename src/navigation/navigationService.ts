import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import type { RootStackParamList } from './types';

/**
 * Navigate from outside React components (thunks, API interceptors,
 * push notification handlers...).
 *
 *   navigate(ROUTES.POST_DETAIL, { id: 1 });
 */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const navigate = <T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T],
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate({ name, params }));
  }
};

export const goBack = () => {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
};
