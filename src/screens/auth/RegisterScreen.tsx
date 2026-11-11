import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import {
  AppButton,
  AppInput,
  AppText,
  Dropdown,
  DropdownOption,
  Header,
  ScreenWrapper,
} from '@components/index';
import { ROUTES } from '@constants/routes';
import type { AuthScreen } from '@navigation/types';
import { email, minLength, phone, required, validate } from '@utils/validators';

const GENDERS: DropdownOption[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const COUNTRIES: DropdownOption[] = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'Japan',
].map(c => ({ label: c, value: c }));

const INTERESTS: DropdownOption[] = [
  'Sports',
  'Music',
  'Travel',
  'Tech',
  'Food',
].map(i => ({
  label: i,
  value: i.toLowerCase(),
}));

type Field = 'name' | 'email' | 'phone' | 'password' | 'gender' | 'country';

/** Example form: inputs, single/multi/searchable dropdowns, validation. */
const RegisterScreen = ({ navigation }: AuthScreen<typeof ROUTES.REGISTER>) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [gender, setGender] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  const set = (key: keyof typeof form) => (value: string) =>
    setForm(f => ({ ...f, [key]: value }));

  const onSubmit = () => {
    const next: Partial<Record<Field, string>> = {
      name: validate(form.name, [required()]),
      email: validate(form.email, [required(), email()]),
      phone: validate(form.phone, [required(), phone()]),
      password: validate(form.password, [required(), minLength(8)]),
      gender: gender ? undefined : 'Please select a gender',
      country: country ? undefined : 'Please select a country',
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) {
      return;
    }
    Alert.alert('Account created', 'Connect this form to your register API.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScreenWrapper
      scrollable
      edges={['top', 'bottom']}
      header={<Header title="Create account" />}
    >
      <AppText color="textSecondary" style={styles.intro}>
        Fill in your details to get started.
      </AppText>
      <AppInput
        label="Full name"
        required
        value={form.name}
        onChangeText={set('name')}
        error={errors.name}
      />
      <AppInput
        label="Email"
        required
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={set('email')}
        error={errors.email}
      />
      <AppInput
        label="Phone"
        required
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={set('phone')}
        error={errors.phone}
      />
      <Dropdown
        label="Gender"
        required
        options={GENDERS}
        value={gender}
        onChange={setGender}
        error={errors.gender}
      />
      <Dropdown
        label="Country"
        required
        searchable
        options={COUNTRIES}
        value={country}
        onChange={setCountry}
        error={errors.country}
      />
      <Dropdown
        label="Interests"
        multiple
        placeholder="Pick a few"
        options={INTERESTS}
        value={interests}
        onChange={setInterests}
      />
      <AppInput
        label="Password"
        required
        password
        value={form.password}
        onChangeText={set('password')}
        error={errors.password}
      />
      <AppButton title="Create account" onPress={onSubmit} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  intro: { marginBottom: 16 },
});

export default RegisterScreen;
