import * as SecureStore from 'expo-secure-store';

const SECURE_STORE_ACCESS = 'secure_store_access_token';
const SECURE_STORE_REFRESH = 'secure_store_refresh_token';

const getItem = async (key: string): Promise<string | null> =>
  SecureStore.getItemAsync(key);

const setItem = async (key: string, value: string): Promise<void> =>
  SecureStore.setItemAsync(key, value);

const removeItem = async (key: string): Promise<void> =>
  SecureStore.deleteItemAsync(key);

export const getAccessToken = () => getItem(SECURE_STORE_ACCESS);
export const removeAccessToken = () => removeItem(SECURE_STORE_ACCESS);
export const setAccessToken = (value: string) =>
  setItem(SECURE_STORE_ACCESS, value);

export const getRefreshToken = () => getItem(SECURE_STORE_REFRESH);
export const removeRefreshToken = () => removeItem(SECURE_STORE_REFRESH);
export const setRefreshToken = (value: string) =>
  setItem(SECURE_STORE_REFRESH, value);
