/** Normalised error shape returned by every failed API call. */
export interface ApiError {
  status: number | null;
  message: string;
  data?: unknown;
}

export interface PaginatedParams {
  limit?: number;
  skip?: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse extends User {
  accessToken: string;
  refreshToken: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  views: number;
  userId: number;
  reactions: { likes: number; dislikes: number };
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}
