import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useTheme } from '@hooks/useTheme';
import { AppText } from '../ui/AppText';

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  /** Show a back arrow. Defaults to true when there is a screen to go back to. */
  showBack?: boolean;
  /** Show a hamburger button that opens the drawer. */
  showMenu?: boolean;
  onBackPress?: () => void;
  left?: React.ReactNode;
  right?: React.ReactNode;
  centerTitle?: boolean;
  backgroundColor?: string;
  bordered?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Header = ({
  title,
  subtitle,
  showBack,
  showMenu,
  onBackPress,
  left,
  right,
  centerTitle = false,
  backgroundColor,
  bordered = true,
  style,
}: HeaderProps) => {
  const navigation = useNavigation();
  const { colors, spacing, sizes } = useTheme();
  const canGoBack = showBack ?? (!showMenu && navigation.canGoBack());

  const renderLeft = () => {
    if (left) {
      return left;
    }
    if (showMenu) {
      return (
        <IconButton
          label="☰"
          a11y="Open menu"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      );
    }
    if (canGoBack) {
      return (
        <IconButton
          label="‹"
          a11y="Go back"
          onPress={onBackPress ?? navigation.goBack}
          big
        />
      );
    }
    return null;
  };

  return (
    <View
      style={[
        styles.container,
        {
          height: sizes.headerHeight,
          paddingHorizontal: spacing.sm,
          backgroundColor: backgroundColor ?? colors.surface,
          borderBottomColor: bordered ? colors.border : colors.transparent,
        },
        style,
      ]}
    >
      <View style={styles.side}>{renderLeft()}</View>
      <View style={[styles.titleBox, centerTitle && styles.center]}>
        {title ? (
          <AppText variant="title" numberOfLines={1}>
            {title}
          </AppText>
        ) : null}
        {subtitle ? (
          <AppText variant="caption" color="textSecondary" numberOfLines={1}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
};

const IconButton = ({
  label,
  a11y,
  onPress,
  big,
}: {
  label: string;
  a11y: string;
  onPress: () => void;
  big?: boolean;
}) => (
  <Pressable
    onPress={onPress}
    hitSlop={10}
    accessibilityRole="button"
    accessibilityLabel={a11y}
    style={styles.iconButton}
  >
    <AppText size={big ? 32 : 22} color="text">
      {label}
    </AppText>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  side: { minWidth: 44, justifyContent: 'center' },
  right: { alignItems: 'flex-end' },
  titleBox: { flex: 1, paddingHorizontal: 4 },
  center: { alignItems: 'center' },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
