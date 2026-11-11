import { moderateScale, scale } from '@utils/responsive';

/** Spacing scale. Use these instead of hard-coded numbers. */
export const spacing = {
  none: 0,
  xxs: scale(2),
  xs: scale(4),
  sm: scale(8),
  md: scale(12),
  lg: scale(16),
  xl: scale(24),
  xxl: scale(32),
  xxxl: scale(48),
} as const;

export type Spacing = keyof typeof spacing;

export const radius = {
  none: 0,
  sm: moderateScale(4),
  md: moderateScale(8),
  lg: moderateScale(12),
  xl: moderateScale(20),
  full: 9999,
} as const;

export const sizes = {
  buttonHeight: {
    sm: moderateScale(36),
    md: moderateScale(46),
    lg: moderateScale(54),
  },
  inputHeight: moderateScale(48),
  icon: { sm: moderateScale(16), md: moderateScale(20), lg: moderateScale(28) },
  headerHeight: moderateScale(56),
} as const;

export const shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
} as const;
