import { useRef, useEffect } from 'react';

export function useLatest<T>(value: T) {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  });

  return ref;
}
