import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useAppSelector } from '@store/hooks';
import { darkTheme, lightTheme, Theme } from '@theme/index';

/**
 * Returns the active theme (colors, fonts, spacing...).
 * Mode comes from Redux: 'light' | 'dark' | 'system'.
 */
export const useTheme = (): Theme => {
  const mode = useAppSelector(state => state.app.themeMode);
  const system = useColorScheme();
  const isDark = mode === 'dark' || (mode === 'system' && system === 'dark');
  return isDark ? darkTheme : lightTheme;
};

/**
 * Builds a StyleSheet from the theme and memoises it.
 *
 *   const styles = useThemedStyles(t => ({ box: { backgroundColor: t.colors.card } }));
 */
export const useThemedStyles = <T>(factory: (theme: Theme) => T): T => {
  const theme = useTheme();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => factory(theme), [theme]);
};
