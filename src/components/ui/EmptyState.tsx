import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { AppButton } from './AppButton';
import { AppText } from './AppText';

interface EmptyStateProps {
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  const { spacing } = useTheme();
  return (
    <View style={[styles.container, { padding: spacing.xl }]}>
      <AppText variant="h3" align="center">
        {title}
      </AppText>
      {message ? (
        <AppText
          color="textSecondary"
          align="center"
          style={{ marginTop: spacing.sm }}
        >
          {message}
        </AppText>
      ) : null}
      {actionLabel && onAction ? (
        <AppButton
          title={actionLabel}
          onPress={onAction}
          fullWidth={false}
          style={[styles.button, { marginTop: spacing.lg }]}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  button: { alignSelf: 'center' },
});
