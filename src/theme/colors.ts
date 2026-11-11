/**
 * Brand palette. Change these values to re-brand the whole app.
 */
export const palette = {
  primary: '#4F46E5',
  primaryDark: '#4338CA',
  secondary: '#0EA5E9',
  success: '#16A34A',
  warning: '#F59E0B',
  error: '#DC2626',
  info: '#2563EB',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
} as const;

/** Semantic colors. Components only use these keys, never raw palette values. */
export interface ThemeColors {
  primary: string;
  onPrimary: string;
  secondary: string;
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  textDisabled: string;
  border: string;
  inputBackground: string;
  placeholder: string;
  overlay: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  white: string;
  black: string;
  transparent: string;
}

export const lightColors: ThemeColors = {
  primary: palette.primary,
  onPrimary: palette.white,
  secondary: palette.secondary,
  background: palette.gray50,
  surface: palette.white,
  card: palette.white,
  text: palette.gray900,
  textSecondary: palette.gray500,
  textDisabled: palette.gray400,
  border: palette.gray200,
  inputBackground: palette.white,
  placeholder: palette.gray400,
  overlay: 'rgba(0,0,0,0.45)',
  success: palette.success,
  warning: palette.warning,
  error: palette.error,
  info: palette.info,
  white: palette.white,
  black: palette.black,
  transparent: palette.transparent,
};

export const darkColors: ThemeColors = {
  ...lightColors,
  primary: '#818CF8',
  onPrimary: palette.gray900,
  background: '#0B0F19',
  surface: palette.gray900,
  card: palette.gray800,
  text: palette.gray50,
  textSecondary: palette.gray400,
  textDisabled: palette.gray600,
  border: palette.gray700,
  inputBackground: palette.gray800,
  placeholder: palette.gray500,
  overlay: 'rgba(0,0,0,0.65)',
};
