import {useEffect, useState} from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {}, [theme]);

  return theme;
}
