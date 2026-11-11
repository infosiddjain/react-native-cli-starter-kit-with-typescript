/** All AsyncStorage keys in one place, to avoid typos and clashes. */
export const STORAGE_KEYS = {
  PERSIST_ROOT: 'persist:root',
  ONBOARDING_DONE: '@app/onboarding_done',
  LANGUAGE: '@app/language',
  DEMO_NOTE: '@app/demo_note',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
