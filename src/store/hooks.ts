import { createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { ApiError } from '@api/types';
import type { AppDispatch, RootState } from './rootReducer';

/** Use these instead of plain useDispatch / useSelector. */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

/**
 * Pre-typed createAsyncThunk. Failed thunks reject with a string message.
 *
 *   export const fetchX = createAppAsyncThunk('x/fetch', async (_, { rejectWithValue }) => {
 *     try { return await xService.get(); }
 *     catch (e) { return rejectWithValue(toErrorMessage(e)); }
 *   });
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}>();

export const toErrorMessage = (error: unknown): string =>
  (error as ApiError)?.message ?? 'Something went wrong.';
