import {useCallback, useEffect, useState} from 'react';
import AsyncStorageManager from 'src/helper/AsyncStorageManager';
import {useAppSelector} from 'src/hooks';
import {LightTheme} from './themeMode';

// export const useTheme = () => {
//   const {theme, updateTheme} = useContext(ThemeContext);
//   return {
//     theme,
//     themeColor: theme.colors,
//     updateTheme,
//   };
// };

export const useTheme = () => {
  const theme = useAppSelector(state => state.common.theme);
  const [themeColor, setThemeColor] = useState(LightTheme);

  const test = useCallback(() => {
    // const res = AsyncStorageManager.getItemStorage('');
  }, []);

  useEffect(() => {
    test();
  }, [test, theme]);
  return themeColor;
};
