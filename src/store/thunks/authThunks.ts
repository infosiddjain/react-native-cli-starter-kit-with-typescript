import { authService } from '@api/services/authService';
import type { LoginRequest } from '@api/types';
import { createAppAsyncThunk, toErrorMessage } from '../hooks';

export const loginUser = createAppAsyncThunk(
  'auth/login',
  async (body: LoginRequest, { rejectWithValue }) => {
    try {
      const { accessToken, refreshToken, ...user } = await authService.login(
        body,
      );
      return { user, token: accessToken, refreshToken };
    } catch (error) {
      return rejectWithValue(toErrorMessage(error));
    }
  },
);

export const fetchProfile = createAppAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getMe();
    } catch (error) {
      return rejectWithValue(toErrorMessage(error));
    }
  },
);
