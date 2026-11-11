import { Platform } from 'react-native';
import { fontScale } from '@utils/responsive';

/**
 * Font families. To use a custom font (e.g. Poppins):
 * 1. Put Poppins-Regular.ttf, Poppins-Medium.ttf ... in src/assets/fonts
 * 2. Run `npx react-native-asset`
 * 3. Replace the values below with 'Poppins-Regular', 'Poppins-Medium' ...
 */
export const fontFamily = {
  regular: Platform.select({ ios: 'System', default: 'sans-serif' }),
  medium: Platform.select({ ios: 'System', default: 'sans-serif-medium' }),
  semiBold: Platform.select({ ios: 'System', default: 'sans-serif-medium' }),
  bold: Platform.select({ ios: 'System', default: 'sans-serif' }),
} as const;

/** Only needed for the system font. Custom fonts carry weight in the file. */
export const fontWeight = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
} as const;

export type FontWeight = keyof typeof fontFamily;

/** Responsive font sizes. */
export const fontSize = {
  xs: fontScale(11),
  sm: fontScale(13),
  md: fontScale(15),
  lg: fontScale(17),
  xl: fontScale(20),
  xxl: fontScale(24),
  xxxl: fontScale(30),
} as const;

export type FontSize = keyof typeof fontSize;

/** Text presets used by <AppText variant="..." />. */
export const typography = {
  h1: { size: 'xxxl', weight: 'bold' },
  h2: { size: 'xxl', weight: 'bold' },
  h3: { size: 'xl', weight: 'semiBold' },
  title: { size: 'lg', weight: 'semiBold' },
  body: { size: 'md', weight: 'regular' },
  bodyBold: { size: 'md', weight: 'semiBold' },
  caption: { size: 'sm', weight: 'regular' },
  label: { size: 'sm', weight: 'medium' },
  tiny: { size: 'xs', weight: 'regular' },
} as const satisfies Record<string, { size: FontSize; weight: FontWeight }>;

export type TextVariant = keyof typeof typography;
