import { createSlice } from '@reduxjs/toolkit';
import type { Post } from '@api/types';
import { fetchPostById, fetchPosts } from '../thunks/postThunks';

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

interface PostsState {
  items: Post[];
  total: number;
  status: Status;
  refreshing: boolean;
  error: string | null;
  selected: Post | null;
  selectedStatus: Status;
}

const initialState: PostsState = {
  items: [],
  total: 0,
  status: 'idle',
  refreshing: false,
  error: null,
  selected: null,
  selectedStatus: 'idle',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearSelectedPost: state => {
      state.selected = null;
      state.selectedStatus = 'idle';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, (state, { meta }) => {
        state.status = 'loading';
        state.refreshing = !!meta.arg?.refresh;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload, meta }) => {
        state.status = 'succeeded';
        state.refreshing = false;
        state.total = payload.total;
        state.items = meta.arg?.refresh
          ? payload.posts
          : [...state.items, ...payload.posts];
      })
      .addCase(fetchPosts.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.refreshing = false;
        state.error = payload ?? 'Failed to load posts';
      })
      .addCase(fetchPostById.pending, state => {
        state.selectedStatus = 'loading';
      })
      .addCase(fetchPostById.fulfilled, (state, { payload }) => {
        state.selectedStatus = 'succeeded';
        state.selected = payload;
      })
      .addCase(fetchPostById.rejected, (state, { payload }) => {
        state.selectedStatus = 'failed';
        state.error = payload ?? 'Failed to load post';
      });
  },
});

export const { clearSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
