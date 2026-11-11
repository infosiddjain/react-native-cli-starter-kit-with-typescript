import React from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { Spacing } from '@theme/index';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  padding?: Spacing;
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Card = ({
  children,
  onPress,
  padding = 'lg',
  elevated = true,
  style,
}: CardProps) => {
  const { colors, spacing, radius, shadow } = useTheme();
  const cardStyle: ViewStyle = {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing[padding],
    borderWidth: elevated ? 0 : 1,
    borderColor: colors.border,
    ...(elevated ? shadow.sm : null),
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          cardStyle,
          { opacity: pressed ? 0.85 : 1 },
          style,
        ]}
      >
        {children}
      </Pressable>
    );
  }
  return <View style={[cardStyle, style]}>{children}</View>;
};
