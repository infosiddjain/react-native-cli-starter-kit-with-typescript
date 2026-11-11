import { api } from '../client';
import { ENDPOINTS } from '../endpoints';
import type { LoginRequest, LoginResponse, User } from '../types';

export const authService = {
  login: (body: LoginRequest) =>
    api.post<LoginResponse>(ENDPOINTS.AUTH.LOGIN, {
      ...body,
      expiresInMins: 60,
    }),
  getMe: () => api.get<User>(ENDPOINTS.AUTH.ME),
};
