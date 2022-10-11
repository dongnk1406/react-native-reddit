import {useEffect, useState} from 'react';

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timerHandler = setTimeout(
      () => setDebouncedValue(value),
      delay || 300,
    );

    return () => {
      clearTimeout(timerHandler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
