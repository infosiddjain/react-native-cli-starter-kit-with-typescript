import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@hooks/useTheme';
import { hp } from '@utils/responsive';
import { AppText } from './AppText';

export interface DropdownOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

interface BaseProps<T> {
  options: DropdownOption<T>[];
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  /** Shows a search box inside the list. */
  searchable?: boolean;
  modalTitle?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

interface SingleProps<T> extends BaseProps<T> {
  multiple?: false;
  value: NoInfer<T> | null;
  onChange: (value: NoInfer<T>, option: DropdownOption<NoInfer<T>>) => void;
}

interface MultiProps<T> extends BaseProps<T> {
  multiple: true;
  value: NoInfer<T>[];
  onChange: (value: NoInfer<T>[]) => void;
}

export type DropdownProps<T> = SingleProps<T> | MultiProps<T>;

export function Dropdown<T = string>(props: DropdownProps<T>) {
  const {
    options,
    label,
    placeholder = 'Select',
    error,
    required,
    disabled,
    searchable,
    modalTitle,
    containerStyle,
  } = props;
  const { colors, spacing, radius, sizes, fontSize } = useTheme();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const isSelected = (v: T) =>
    props.multiple ? props.value.includes(v) : props.value === v;

  const displayText = useMemo(() => {
    const selected = options.filter(o => isSelected(o.value)).map(o => o.label);
    return selected.length ? selected.join(', ') : '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, props.value]);

  const filtered = useMemo(
    () =>
      query
        ? options.filter(o =>
            o.label.toLowerCase().includes(query.toLowerCase()),
          )
        : options,
    [options, query],
  );

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  const onSelect = (option: DropdownOption<T>) => {
    if (props.multiple) {
      const next = isSelected(option.value)
        ? props.value.filter(v => v !== option.value)
        : [...props.value, option.value];
      props.onChange(next);
    } else {
      props.onChange(option.value, option);
      close();
    }
  };

  return (
    <View style={[{ marginBottom: spacing.lg }, containerStyle]}>
      {label ? (
        <AppText variant="label" style={{ marginBottom: spacing.xs }}>
          {label}
          {required ? <AppText color="error"> *</AppText> : null}
        </AppText>
      ) : null}

      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={() => setOpen(true)}
        style={[
          styles.field,
          {
            minHeight: sizes.inputHeight,
            borderRadius: radius.md,
            paddingHorizontal: spacing.md,
            borderColor: error
              ? colors.error
              : open
              ? colors.primary
              : colors.border,
            backgroundColor: disabled ? colors.border : colors.inputBackground,
          },
        ]}
      >
        <AppText
          numberOfLines={1}
          color={displayText ? 'text' : 'placeholder'}
          style={styles.flex}
        >
          {displayText || placeholder}
        </AppText>
        <AppText color="textSecondary">▾</AppText>
      </Pressable>

      {error ? (
        <AppText
          variant="caption"
          color="error"
          style={{ marginTop: spacing.xs }}
        >
          {error}
        </AppText>
      ) : null}

      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={close}
      >
        <Pressable
          style={[styles.backdrop, { backgroundColor: colors.overlay }]}
          onPress={close}
        />
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: colors.surface,
              borderTopLeftRadius: radius.xl,
              borderTopRightRadius: radius.xl,
              paddingBottom: insets.bottom + spacing.md,
            },
          ]}
        >
          <View style={[styles.sheetHeader, { padding: spacing.lg }]}>
            <AppText variant="title" style={styles.flex}>
              {modalTitle ?? label ?? placeholder}
            </AppText>
            <Pressable onPress={close} hitSlop={10}>
              <AppText variant="bodyBold" color="primary">
                {props.multiple ? 'Done' : 'Close'}
              </AppText>
            </Pressable>
          </View>

          {searchable ? (
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search..."
              placeholderTextColor={colors.placeholder}
              style={[
                styles.search,
                {
                  marginHorizontal: spacing.lg,
                  marginBottom: spacing.sm,
                  paddingHorizontal: spacing.md,
                  borderRadius: radius.md,
                  borderColor: colors.border,
                  color: colors.text,
                  fontSize: fontSize.md,
                },
              ]}
            />
          ) : null}

          <FlatList
            data={filtered}
            keyExtractor={(item, i) => `${String(item.value)}-${i}`}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <AppText
                color="textSecondary"
                align="center"
                style={{ padding: spacing.lg }}
              >
                No options found
              </AppText>
            }
            renderItem={({ item }) => {
              const selected = isSelected(item.value);
              return (
                <Pressable
                  disabled={item.disabled}
                  onPress={() => onSelect(item)}
                  style={({ pressed }) => [
                    styles.option,
                    {
                      paddingHorizontal: spacing.lg,
                      paddingVertical: spacing.md,
                      backgroundColor: pressed
                        ? colors.border
                        : colors.transparent,
                      opacity: item.disabled ? 0.4 : 1,
                    },
                  ]}
                >
                  <AppText
                    style={styles.flex}
                    color={selected ? 'primary' : 'text'}
                    weight={selected ? 'semiBold' : 'regular'}
                  >
                    {item.label}
                  </AppText>
                  {selected ? <AppText color="primary">✓</AppText> : null}
                </Pressable>
              );
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  backdrop: { flex: 1 },
  sheet: { maxHeight: hp(70) },
  sheetHeader: { flexDirection: 'row', alignItems: 'center' },
  search: { borderWidth: 1, height: 44 },
  option: { flexDirection: 'row', alignItems: 'center' },
});
