import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import {
  AppButton,
  AppInput,
  AppText,
  Card,
  Divider,
  Dropdown,
  Header,
  ScreenWrapper,
  Spacer,
} from '@components/index';
import { STORAGE_KEYS } from '@constants/storageKeys';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setLanguage, setThemeMode } from '@store/slices/appSlice';
import type { ThemeMode } from '@theme/index';
import { storage } from '@utils/storage';

const THEME_OPTIONS = [
  { label: 'System default', value: 'system' as ThemeMode },
  { label: 'Light', value: 'light' as ThemeMode },
  { label: 'Dark', value: 'dark' as ThemeMode },
];

const LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: 'हिन्दी', value: 'hi' },
  { label: 'Español', value: 'es' },
];

const SettingsScreen = () => {
  const dispatch = useAppDispatch();
  const { themeMode, language } = useAppSelector(state => state.app);
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState<string | null>(null);

  useEffect(() => {
    storage.get<string>(STORAGE_KEYS.DEMO_NOTE).then(setSavedNote);
  }, []);

  const saveNote = async () => {
    await storage.set(STORAGE_KEYS.DEMO_NOTE, note);
    setSavedNote(note);
    setNote('');
  };

  const removeNote = async () => {
    await storage.remove(STORAGE_KEYS.DEMO_NOTE);
    setSavedNote(null);
  };

  return (
    <ScreenWrapper scrollable header={<Header title="Settings" showMenu />}>
      <Card>
        <AppText variant="title">Appearance</AppText>
        <AppText variant="caption" color="textSecondary">
          Saved with redux-persist, restored on next launch.
        </AppText>
        <Divider />
        <Dropdown
          label="Theme"
          options={THEME_OPTIONS}
          value={themeMode}
          onChange={mode => dispatch(setThemeMode(mode))}
        />
        <Dropdown
          label="Language"
          options={LANGUAGES}
          value={language}
          onChange={lang => dispatch(setLanguage(lang))}
          containerStyle={styles.last}
        />
      </Card>
      <Spacer size="lg" />

      <Card>
        <AppText variant="title">AsyncStorage</AppText>
        <AppText variant="caption" color="textSecondary">
          Use the `storage` helper from @utils/storage for anything outside
          Redux.
        </AppText>
        <Divider />
        <AppText variant="label">Saved value</AppText>
        <AppText color={savedNote ? 'text' : 'textSecondary'}>
          {savedNote || '(empty)'}
        </AppText>
        <Spacer />
        <AppInput
          placeholder="Write a note"
          value={note}
          onChangeText={setNote}
        />
        <AppButton title="Save note" disabled={!note} onPress={saveNote} />
        <Spacer size="sm" />
        <AppButton title="Remove note" variant="ghost" onPress={removeNote} />
      </Card>
      <Spacer size="lg" />

      <AppButton
        title="Clear all storage"
        variant="danger"
        onPress={() =>
          Alert.alert(
            'Clear storage?',
            'This removes all saved data. Restart the app after.',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Clear',
                style: 'destructive',
                onPress: () => storage.clear(),
              },
            ],
          )
        }
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  last: { marginBottom: 0 },
});

export default SettingsScreen;
