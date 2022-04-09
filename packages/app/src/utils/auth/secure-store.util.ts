import * as SecureStore from 'expo-secure-store';

const SECURE_STORE_TOKEN = 'secure_store_token';

const getItem = async (key: string): Promise<string | null> =>
  SecureStore.getItemAsync(key);

const setItem = async (key: string, value: string): Promise<void> =>
  SecureStore.setItemAsync(key, value);

const removeItem = async (key: string): Promise<void> =>
  SecureStore.deleteItemAsync(key);

export const getToken = () => getItem(SECURE_STORE_TOKEN);
export const removeToken = () => removeItem(SECURE_STORE_TOKEN);
export const setToken = (value: string) => setItem(SECURE_STORE_TOKEN, value);
