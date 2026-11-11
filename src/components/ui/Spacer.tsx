import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { Spacing } from '@theme/index';

/** Empty space. <Spacer size="lg" /> or <Spacer size="md" horizontal /> */
export const Spacer = ({
  size = 'md',
  horizontal,
}: {
  size?: Spacing;
  horizontal?: boolean;
}) => {
  const { spacing } = useTheme();
  return (
    <View
      style={horizontal ? { width: spacing[size] } : { height: spacing[size] }}
    />
  );
};
