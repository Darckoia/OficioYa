'use client';

import { useCallback, useState } from 'react';

export function useModal<T>() {
  const [item, setItem] = useState<T | null>(null);

  const open = useCallback((value: T) => {
    setItem(value);
  }, []);

  const close = useCallback(() => {
    setItem(null);
  }, []);

  return {
    item,
    isOpen: item !== null,
    open,
    close
  };
}
