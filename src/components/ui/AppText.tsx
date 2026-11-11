import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { FontSize, FontWeight, TextVariant, ThemeColors } from '@theme/index';

export interface AppTextProps extends TextProps {
  /** Preset from theme/fonts.ts -> typography. */
  variant?: TextVariant;
  /** Theme color key ('primary', 'error'...) or any color string. */
  color?: keyof ThemeColors | (string & {});
  size?: FontSize | number;
  weight?: FontWeight;
  align?: TextStyle['textAlign'];
  children?: React.ReactNode;
}

export const AppText = ({
  variant = 'body',
  color = 'text',
  size,
  weight,
  align,
  style,
  children,
  ...rest
}: AppTextProps) => {
  const theme = useTheme();
  const preset = theme.typography[variant];
  const fontWeightKey = weight ?? preset.weight;
  const sizeKey = size ?? preset.size;

  const textStyle: TextStyle = {
    color: theme.colors[color as keyof ThemeColors] ?? color,
    fontSize: typeof sizeKey === 'number' ? sizeKey : theme.fontSize[sizeKey],
    fontFamily: theme.fontFamily[fontWeightKey],
    fontWeight: theme.fontWeight[fontWeightKey],
    textAlign: align,
  };

  return (
    <Text
      allowFontScaling
      maxFontSizeMultiplier={1.4}
      style={[textStyle, style]}
      {...rest}
    >
      {children}
    </Text>
  );
};
