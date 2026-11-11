import { postService } from '@api/services/postService';
import { createAppAsyncThunk, toErrorMessage } from '../hooks';

export const PAGE_SIZE = 10;

/** Pass `refresh: true` to reload from the first page. */
export const fetchPosts = createAppAsyncThunk(
  'posts/fetchPosts',
  async (
    arg: { refresh?: boolean } | undefined,
    { getState, rejectWithValue },
  ) => {
    const skip = arg?.refresh ? 0 : getState().posts.items.length;
    try {
      return await postService.getPosts({ limit: PAGE_SIZE, skip });
    } catch (error) {
      return rejectWithValue(toErrorMessage(error));
    }
  },
  {
    // Skip if a request is already running.
    condition: (_, { getState }) => getState().posts.status !== 'loading',
  },
);

export const fetchPostById = createAppAsyncThunk(
  'posts/fetchPostById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await postService.getPostById(id);
    } catch (error) {
      return rejectWithValue(toErrorMessage(error));
    }
  },
);
