import AsyncStorage from '@react-native-async-storage/async-storage';

export const persistConfig = (key: string, params?: any) => {
  return {
    key: key,
    storage: AsyncStorage,
    // whitelist: ['navigation'],
    ...params,
  };
};
