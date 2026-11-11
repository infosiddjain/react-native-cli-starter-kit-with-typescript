/** All API paths in one place. */
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
  },
  POSTS: {
    LIST: '/posts',
    DETAIL: (id: number) => `/posts/${id}`,
  },
} as const;
