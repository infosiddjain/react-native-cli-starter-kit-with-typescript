/** Each validator returns an error message, or undefined when valid. */
export type Validator = (value: string) => string | undefined;

export const required =
  (message = 'This field is required'): Validator =>
  value =>
    value.trim() ? undefined : message;

export const email =
  (message = 'Enter a valid email'): Validator =>
  value =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? undefined : message;

export const minLength =
  (min: number, message?: string): Validator =>
  value =>
    value.length >= min
      ? undefined
      : message ?? `Must be at least ${min} characters`;

export const phone =
  (message = 'Enter a valid phone number'): Validator =>
  value =>
    /^\+?[0-9]{7,15}$/.test(value.replace(/\s/g, '')) ? undefined : message;

/** Runs validators in order and returns the first error. */
export const validate = (value: string, rules: Validator[]) => {
  for (const rule of rules) {
    const error = rule(value);
    if (error) {
      return error;
    }
  }
  return undefined;
};
