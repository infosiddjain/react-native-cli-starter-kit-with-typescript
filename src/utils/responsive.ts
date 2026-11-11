import { Dimensions, PixelRatio } from 'react-native';

/**
 * Responsive helpers. Designs are usually made for a 375 x 812 screen
 * (iPhone X/11/12/13 mini). Change these if your designer uses another size.
 */
const GUIDELINE_WIDTH = 375;
const GUIDELINE_HEIGHT = 812;

const { width, height } = Dimensions.get('window');
const [shortSide, longSide] =
  width < height ? [width, height] : [height, width];

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const isTablet = shortSide >= 600;

/** Scale by screen width. Use for widths, horizontal padding, icons. */
export const scale = (size: number) => (shortSide / GUIDELINE_WIDTH) * size;

/** Scale by screen height. Use for heights and vertical spacing. */
export const verticalScale = (size: number) =>
  (longSide / GUIDELINE_HEIGHT) * size;

/** Scale with a damping factor (0 = no scaling, 1 = full scaling). */
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

/** Font size that scales with the screen but stays readable on tablets. */
export const fontScale = (size: number) =>
  Math.round(PixelRatio.roundToNearestPixel(moderateScale(size, 0.4)));

/** Percentage of screen width / height. */
export const wp = (percent: number) =>
  PixelRatio.roundToNearestPixel((width * percent) / 100);
export const hp = (percent: number) =>
  PixelRatio.roundToNearestPixel((height * percent) / 100);
