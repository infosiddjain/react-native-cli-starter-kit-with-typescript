import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { AppText } from './AppText';

interface LoaderProps {
  message?: string;
  /** Covers the whole screen with a dimmed overlay. */
  overlay?: boolean;
}

export const Loader = ({ message, overlay }: LoaderProps) => {
  const { colors, spacing } = useTheme();
  return (
    <View
      style={[
        styles.container,
        overlay && [
          StyleSheet.absoluteFill,
          { backgroundColor: colors.overlay, zIndex: 10 },
        ],
      ]}
    >
      <ActivityIndicator
        size="large"
        color={overlay ? colors.white : colors.primary}
      />
      {message ? (
        <AppText
          color={overlay ? 'white' : 'textSecondary'}
          style={{ marginTop: spacing.md }}
        >
          {message}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
