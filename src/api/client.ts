import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { CONFIG } from '@constants/config';
import type { ApiError } from './types';

/**
 * The store is injected at startup (see src/store/index.ts) instead of
 * imported, to avoid a circular import between the API and the store.
 */
interface StoreLike {
  getState: () => { auth: { token: string | null } };
  dispatch: (action: { type: string }) => unknown;
}
let store: StoreLike | undefined;
export const injectStore = (s: StoreLike) => {
  store = s;
};

export const apiClient = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  timeout: CONFIG.API_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

// Attach the auth token to every request.
apiClient.interceptors.request.use(config => {
  const token = store?.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (CONFIG.ENABLE_API_LOGS) {
    console.log(`[API] → ${config.method?.toUpperCase()} ${config.url}`);
  }
  return config;
});

// Turn every error into a simple ApiError and log out on 401.
apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status ?? null;
    if (status === 401 && store?.getState().auth.token) {
      store.dispatch({ type: 'auth/logout' });
    }
    const apiError: ApiError = {
      status,
      message: getErrorMessage(error),
      data: error.response?.data,
    };
    if (CONFIG.ENABLE_API_LOGS) {
      console.log(`[API] ✕ ${error.config?.url}`, apiError);
    }
    return Promise.reject(apiError);
  },
);

const getErrorMessage = (error: AxiosError<{ message?: string }>) => {
  if (error.code === 'ECONNABORTED') {
    return 'Request timed out. Please try again.';
  }
  if (!error.response) {
    return 'No internet connection.';
  }
  return error.response.data?.message ?? 'Something went wrong.';
};

/** Typed helpers that return response data directly. */
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config).then(r => r.data),
  post: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, body, config).then(r => r.data),
  put: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, body, config).then(r => r.data),
  patch: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, body, config).then(r => r.data),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config).then(r => r.data),
};
