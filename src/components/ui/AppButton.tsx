import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { Theme } from '@theme/index';
import { AppText } from './AppText';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  rounded?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Override colors without creating a new variant. */
  backgroundColor?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const getVariantColors = (theme: Theme, variant: ButtonVariant) => {
  const { colors } = theme;
  switch (variant) {
    case 'secondary':
      return {
        bg: colors.secondary,
        text: colors.white,
        border: colors.secondary,
      };
    case 'outline':
      return {
        bg: colors.transparent,
        text: colors.primary,
        border: colors.primary,
      };
    case 'ghost':
      return {
        bg: colors.transparent,
        text: colors.primary,
        border: colors.transparent,
      };
    case 'danger':
      return { bg: colors.error, text: colors.white, border: colors.error };
    default:
      return {
        bg: colors.primary,
        text: colors.onPrimary,
        border: colors.primary,
      };
  }
};

export const AppButton = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = true,
  rounded = false,
  leftIcon,
  rightIcon,
  backgroundColor,
  textColor,
  style,
  textStyle,
  ...rest
}: AppButtonProps) => {
  const theme = useTheme();
  const v = getVariantColors(theme, variant);
  const isDisabled = disabled || loading;
  const fg = textColor ?? v.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          height: theme.sizes.buttonHeight[size],
          paddingHorizontal: theme.spacing[size === 'sm' ? 'md' : 'lg'],
          borderRadius: rounded ? theme.radius.full : theme.radius.md,
          backgroundColor: backgroundColor ?? v.bg,
          borderColor: backgroundColor ?? v.border,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          opacity: isDisabled ? 0.5 : pressed ? 0.8 : 1,
        },
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <View style={styles.content}>
          {leftIcon ? (
            <View style={{ marginRight: theme.spacing.sm }}>{leftIcon}</View>
          ) : null}
          <AppText
            variant={size === 'sm' ? 'label' : 'bodyBold'}
            color={fg}
            style={textStyle}
            numberOfLines={1}
          >
            {title}
          </AppText>
          {rightIcon ? (
            <View style={{ marginLeft: theme.spacing.sm }}>{rightIcon}</View>
          ) : null}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
