import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControlProps,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@hooks/useTheme';
import { Spacing } from '@theme/index';
import { Loader } from '../ui/Loader';

export interface ScreenWrapperProps {
  children: React.ReactNode;
  /** Wrap content in a ScrollView. */
  scrollable?: boolean;
  /** Horizontal + vertical padding from the spacing scale. Use 'none' for edge-to-edge. */
  padding?: Spacing;
  /** Safe-area edges. Tab screens keep the default (tab bar handles the bottom). */
  edges?: Edge[];
  /** Rendered above the content, outside the scroll (e.g. <Header />). */
  header?: React.ReactNode;
  /** Rendered below the content, outside the scroll (e.g. a sticky button). */
  footer?: React.ReactNode;
  /** Shows a full-screen loader overlay. */
  loading?: boolean;
  /** Push content up when the keyboard opens. On by default. */
  keyboardAvoiding?: boolean;
  backgroundColor?: string;
  refreshControl?: React.ReactElement<RefreshControlProps>;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export const ScreenWrapper = ({
  children,
  scrollable = false,
  padding = 'lg',
  edges = ['top', 'left', 'right'],
  header,
  footer,
  loading = false,
  keyboardAvoiding = true,
  backgroundColor,
  refreshControl,
  style,
  contentContainerStyle,
}: ScreenWrapperProps) => {
  const { colors, spacing } = useTheme();
  const pad = { padding: spacing[padding] };

  const content = scrollable ? (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[styles.grow, pad, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      refreshControl={refreshControl}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, pad, contentContainerStyle]}>{children}</View>
  );

  return (
    <SafeAreaView
      edges={edges}
      style={[
        styles.flex,
        { backgroundColor: backgroundColor ?? colors.background },
        style,
      ]}
    >
      {header}
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {content}
          {footer}
        </KeyboardAvoidingView>
      ) : (
        <>
          {content}
          {footer}
        </>
      )}
      {loading ? <Loader overlay /> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  grow: { flexGrow: 1 },
});
