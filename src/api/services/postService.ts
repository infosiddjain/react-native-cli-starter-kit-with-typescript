import { api } from '../client';
import { ENDPOINTS } from '../endpoints';
import type { PaginatedParams, Post, PostsResponse } from '../types';

export const postService = {
  getPosts: (params: PaginatedParams = {}) =>
    api.get<PostsResponse>(ENDPOINTS.POSTS.LIST, { params }),
  getPostById: (id: number) => api.get<Post>(ENDPOINTS.POSTS.DETAIL(id)),
};
