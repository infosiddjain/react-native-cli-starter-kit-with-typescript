import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { injectStore } from '@api/client';
import { AsyncStorage } from '@utils/storage';
import { rootReducer } from './rootReducer';

/**
 * Only slices listed in `whitelist` are saved to AsyncStorage and
 * restored on app start. Keep server data (e.g. posts) out of it.
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['app', 'auth'],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

injectStore(store);

export type { AppDispatch, RootState } from './rootReducer';

export * from './hooks';
