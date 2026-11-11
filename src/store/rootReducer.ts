import {
  combineReducers,
  ThunkDispatch,
  UnknownAction,
} from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import postsReducer from './slices/postsSlice';

/** Register every new slice here. */
export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  posts: postsReducer,
});

/**
 * Types come from the reducer (not the store instance) so thunks can use
 * them without a circular type reference.
 */
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;
