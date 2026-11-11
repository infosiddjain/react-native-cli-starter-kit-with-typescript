import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { Spacing } from '@theme/index';

export const Divider = ({ spacing: gap = 'md' }: { spacing?: Spacing }) => {
  const { colors, spacing } = useTheme();
  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.border,
        marginVertical: spacing[gap],
      }}
    />
  );
};
