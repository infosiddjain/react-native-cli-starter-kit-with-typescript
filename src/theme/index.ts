import { darkColors, lightColors, ThemeColors } from './colors';
import { fontFamily, fontSize, fontWeight, typography } from './fonts';
import { radius, shadow, sizes, spacing } from './metrics';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface Theme {
  dark: boolean;
  colors: ThemeColors;
  fontFamily: typeof fontFamily;
  fontWeight: typeof fontWeight;
  fontSize: typeof fontSize;
  typography: typeof typography;
  spacing: typeof spacing;
  radius: typeof radius;
  sizes: typeof sizes;
  shadow: typeof shadow;
}

const base = {
  fontFamily,
  fontWeight,
  fontSize,
  typography,
  spacing,
  radius,
  sizes,
  shadow,
};

export const lightTheme: Theme = { dark: false, colors: lightColors, ...base };
export const darkTheme: Theme = { dark: true, colors: darkColors, ...base };

export * from './colors';
export * from './fonts';
export * from './metrics';
