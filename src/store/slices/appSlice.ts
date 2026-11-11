import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ThemeMode } from '@theme/index';

interface AppState {
  themeMode: ThemeMode;
  language: string;
}

const initialState: AppState = {
  themeMode: 'system',
  language: 'en',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setThemeMode, setLanguage } = appSlice.actions;
export default appSlice.reducer;
