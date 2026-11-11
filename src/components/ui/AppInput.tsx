import React, { useState } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputInstance,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { AppText } from './AppText';

export interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Shows a Show/Hide toggle and hides the text. */
  password?: boolean;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  ref?: React.Ref<TextInputInstance>;
}

export const AppInput = ({
  label,
  error,
  helperText,
  required,
  leftIcon,
  rightIcon,
  password,
  disabled,
  containerStyle,
  inputWrapperStyle,
  inputStyle,
  onFocus,
  onBlur,
  ref,
  ...rest
}: AppInputProps) => {
  const theme = useTheme();
  const { colors, spacing, radius, sizes, fontSize, fontFamily } = theme;
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);

  const borderColor = error
    ? colors.error
    : focused
    ? colors.primary
    : colors.border;

  return (
    <View style={[{ marginBottom: spacing.lg }, containerStyle]}>
      {label ? (
        <AppText variant="label" style={{ marginBottom: spacing.xs }}>
          {label}
          {required ? <AppText color="error"> *</AppText> : null}
        </AppText>
      ) : null}

      <View
        style={[
          styles.wrapper,
          {
            minHeight: sizes.inputHeight,
            borderColor,
            borderRadius: radius.md,
            paddingHorizontal: spacing.md,
            backgroundColor: disabled ? colors.border : colors.inputBackground,
          },
          inputWrapperStyle,
        ]}
      >
        {leftIcon ? (
          <View style={{ marginRight: spacing.sm }}>{leftIcon}</View>
        ) : null}
        <TextInput
          ref={ref}
          editable={!disabled}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={password && hidden}
          autoCapitalize={password ? 'none' : rest.autoCapitalize}
          onFocus={e => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={e => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={[
            styles.input,
            {
              color: colors.text,
              fontSize: fontSize.md,
              fontFamily: fontFamily.regular,
            },
            inputStyle,
          ]}
          {...rest}
        />
        {password ? (
          <Pressable onPress={() => setHidden(h => !h)} hitSlop={10}>
            <AppText variant="label" color="primary">
              {hidden ? 'Show' : 'Hide'}
            </AppText>
          </Pressable>
        ) : null}
        {rightIcon ? (
          <View style={{ marginLeft: spacing.sm }}>{rightIcon}</View>
        ) : null}
      </View>

      {error || helperText ? (
        <AppText
          variant="caption"
          color={error ? 'error' : 'textSecondary'}
          style={{ marginTop: spacing.xs }}
        >
          {error ?? helperText}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
});
