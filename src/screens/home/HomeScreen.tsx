import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
import { ROUTES } from '@constants/routes';
import { useTheme } from '@hooks/useTheme';
import type { TabScreen } from '@navigation/types';
import { useAppSelector } from '@store/hooks';

const SIZES = [
  { label: 'Small', value: 'sm' as const },
  { label: 'Medium', value: 'md' as const },
  { label: 'Large', value: 'lg' as const },
];

/** Showcase of the reusable components. Delete when you start your app. */
const HomeScreen = ({ navigation }: TabScreen<typeof ROUTES.HOME>) => {
  const { spacing } = useTheme();
  const user = useAppSelector(state => state.auth.user);
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [loading, setLoading] = useState(false);

  const fakeLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <ScreenWrapper scrollable header={<Header title="Home" showMenu />}>
      <AppText variant="h2">Hi {user?.firstName ?? 'there'} 👋</AppText>
      <AppText color="textSecondary">
        Here is everything the starter kit gives you.
      </AppText>
      <Spacer size="lg" />

      <Card>
        <AppText variant="title">Typography</AppText>
        <Divider />
        <AppText variant="h1">Heading 1</AppText>
        <AppText variant="h2">Heading 2</AppText>
        <AppText variant="h3">Heading 3</AppText>
        <AppText variant="body">Body text scales with the screen size.</AppText>
        <AppText variant="caption" color="textSecondary">
          Caption text
        </AppText>
      </Card>
      <Spacer size="lg" />

      <Card>
        <AppText variant="title">Buttons</AppText>
        <Divider />
        <Dropdown
          label="Button size"
          options={SIZES}
          value={size}
          onChange={setSize}
        />
        <AppButton title="Primary" size={size} />
        <Spacer size="sm" />
        <AppButton title="Secondary" variant="secondary" size={size} />
        <Spacer size="sm" />
        <AppButton title="Outline" variant="outline" size={size} />
        <Spacer size="sm" />
        <AppButton title="Ghost" variant="ghost" size={size} />
        <Spacer size="sm" />
        <AppButton title="Danger" variant="danger" size={size} />
        <Spacer size="sm" />
        <View style={styles.row}>
          <AppButton
            title="Loading"
            size={size}
            loading={loading}
            onPress={fakeLoad}
            fullWidth={false}
          />
          <Spacer horizontal />
          <AppButton title="Disabled" size={size} disabled fullWidth={false} />
          <Spacer horizontal />
          <AppButton
            title="Pill"
            size={size}
            rounded
            fullWidth={false}
            backgroundColor="#10B981"
          />
        </View>
      </Card>
      <Spacer size="lg" />

      <Card>
        <AppText variant="title">Inputs</AppText>
        <Divider />
        <AppInput label="Default" placeholder="Type something" />
        <AppInput
          label="With error"
          error="This field has an error"
          defaultValue="Wrong value"
        />
        <AppInput label="Password" password placeholder="••••••••" />
        <AppInput
          label="Disabled"
          disabled
          defaultValue="Can't edit me"
          containerStyle={styles.last}
        />
      </Card>
      <Spacer size="lg" />

      <Card onPress={() => navigation.navigate(ROUTES.POSTS)}>
        <AppText variant="title">API + Redux Thunk →</AppText>
        <AppText color="textSecondary">
          See posts loaded with createAsyncThunk.
        </AppText>
      </Card>
      <Spacer size="md" />
      <Card onPress={() => navigation.navigate(ROUTES.SETTINGS)}>
        <AppText variant="title">Theme & Storage →</AppText>
        <AppText color="textSecondary">
          Switch dark mode, try AsyncStorage.
        </AppText>
      </Card>
      <Spacer size="md" />
      <Card onPress={() => navigation.navigate(ROUTES.PERMISSIONS)}>
        <AppText variant="title">Permissions →</AppText>
        <AppText color="textSecondary">
          Camera, location, photos, notifications.
        </AppText>
      </Card>
      <View style={{ height: spacing.xl }} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
  last: { marginBottom: 0 },
});

export default HomeScreen;
