import {StorageConstant} from '@instances';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {LightTheme, DarkTheme} from './themeMode';

export const ThemeContext = React.createContext({
  theme: LightTheme,
  updateTheme: (isLight: boolean) => {},
});

const ThemeProvider = (props: any) => {
  const [theme, setTheme] = React.useState(DarkTheme);

  const onChangeTheme = React.useCallback(async () => {
    let oldTheme = (await AsyncStorage.getItem(StorageConstant.THEME)) || '';
    setTheme(!oldTheme ? DarkTheme : LightTheme);
  }, [setTheme]);
  React.useEffect(() => {
    onChangeTheme();
  }, [onChangeTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        updateTheme: (isLight: boolean) => {
          setTheme(isLight ? LightTheme : DarkTheme);
        },
      }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export {ThemeProvider};
