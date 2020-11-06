import { useRef, useEffect, useCallback } from 'react';

// https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
export function useLatest<Func extends (...args: any[]) => any>(fn: Func) {
  const ref = useRef<Func>(fn);
  useEffect(() => {
    ref.current = fn;
  });

  return useCallback((...args: Parameters<Func>) => {
    ref.current(...args);
  }, []);
}
