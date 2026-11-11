import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKey } from '@constants/storageKeys';

/**
 * Small typed wrapper around AsyncStorage.
 * Values are stored as JSON, so you can save objects, arrays, numbers...
 *
 *   await storage.set(STORAGE_KEYS.LANGUAGE, 'en');
 *   const lang = await storage.get<string>(STORAGE_KEYS.LANGUAGE);
 */
export const storage = {
  async get<T>(key: StorageKey): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? (JSON.parse(value) as T) : null;
    } catch (e) {
      console.warn(`[storage] get "${key}" failed`, e);
      return null;
    }
  },

  async set<T>(key: StorageKey, value: T): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn(`[storage] set "${key}" failed`, e);
      return false;
    }
  },

  async remove(key: StorageKey): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (e) {
      console.warn(`[storage] remove "${key}" failed`, e);
      return false;
    }
  },

  async clear(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (e) {
      console.warn('[storage] clear failed', e);
      return false;
    }
  },
};

/** Raw instance, used by redux-persist. */
export { AsyncStorage };
