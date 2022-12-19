import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageManager {
  static getItemStorage = async (key: string) => {
    try {
      const result = await AsyncStorage.getItem(key);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  static setItemStorage = async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(error);
    }
  };

  static removeItemStorage = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  static clearAllStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error(error);
    }
  };

  static getAllStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const storage = await AsyncStorage.multiGet(keys);
      return storage;
    } catch (error) {
      console.error(error);
    }
  };
}

export default AsyncStorageManager;
