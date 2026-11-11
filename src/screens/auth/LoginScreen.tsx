import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInputInstance, View } from 'react-native';
import {
  AppButton,
  AppInput,
  AppText,
  ScreenWrapper,
  Spacer,
} from '@components/index';
import { ROUTES } from '@constants/routes';
import type { AuthScreen } from '@navigation/types';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { clearAuthError } from '@store/slices/authSlice';
import { loginUser } from '@store/thunks/authThunks';
import { minLength, required, validate } from '@utils/validators';

/** Demo credentials for https://dummyjson.com — replace with your API. */
const DEMO = { username: 'emilys', password: 'emilyspass' };

const LoginScreen = ({ navigation }: AuthScreen<typeof ROUTES.LOGIN>) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);
  const passwordRef = useRef<TextInputInstance>(null);

  const [form, setForm] = useState(DEMO);
  const [errors, setErrors] = useState<Partial<typeof DEMO>>({});

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const onChange = (key: keyof typeof DEMO) => (value: string) => {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => ({ ...e, [key]: undefined }));
  };

  const onSubmit = () => {
    const next = {
      username: validate(form.username, [required('Username is required')]),
      password: validate(form.password, [
        required('Password is required'),
        minLength(6),
      ]),
    };
    setErrors(next);
    if (next.username || next.password) {
      return;
    }
    dispatch(loginUser(form));
  };

  return (
    <ScreenWrapper scrollable edges={['top', 'bottom']} padding="xl">
      <Spacer size="xxxl" />
      <AppText variant="h1">Welcome back</AppText>
      <AppText color="textSecondary">Sign in to continue</AppText>
      <Spacer size="xxl" />

      <AppInput
        label="Username"
        required
        value={form.username}
        onChangeText={onChange('username')}
        error={errors.username}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <AppInput
        ref={passwordRef}
        label="Password"
        required
        password
        value={form.password}
        onChangeText={onChange('password')}
        error={errors.password}
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        helperText="Demo: emilys / emilyspass"
      />

      {error ? (
        <AppText color="error" align="center" style={styles.error}>
          {error}
        </AppText>
      ) : null}

      <AppButton title="Sign in" loading={loading} onPress={onSubmit} />
      <Spacer size="lg" />
      <View style={styles.footer}>
        <AppText color="textSecondary">Don't have an account? </AppText>
        <Pressable onPress={() => navigation.navigate(ROUTES.REGISTER)}>
          <AppText color="primary" weight="semiBold">
            Sign up
          </AppText>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  error: { marginBottom: 12 },
  footer: { flexDirection: 'row', justifyContent: 'center' },
});

export default LoginScreen;
