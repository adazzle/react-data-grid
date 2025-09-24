import { useCallback, useLayoutEffect, useRef, useSyncExternalStore } from 'react';

type Dimensions = [inlineSize: number, blockSize: number, horizontalScrollbarHeight: number];

const defaultDimensions: Dimensions = [1, 1, 0];

function getServerSnapshot() {
  return defaultDimensions;
}

export function useGridDimensions() {
  const gridRef = useRef<HTMLDivElement>(null);
  const dimensionsRef = useRef(defaultDimensions);

  useLayoutEffect(() => {
    const { clientWidth, clientHeight, offsetWidth, offsetHeight } = gridRef.current!;
    const { width, height } = gridRef.current!.getBoundingClientRect();
    const initialHorizontalScrollbarHeight = offsetHeight - clientHeight;
    const initialWidth = width - offsetWidth + clientWidth;
    const initialHeight = height - initialHorizontalScrollbarHeight;

    dimensionsRef.current = [initialWidth, initialHeight, initialHorizontalScrollbarHeight];
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    const resizeObserver = new ResizeObserver((entries) => {
      const size = entries[0].contentBoxSize[0];
      const { clientHeight, offsetHeight } = gridRef.current!;
      dimensionsRef.current = [size.inlineSize, size.blockSize, offsetHeight - clientHeight];
      callback();
    });
    resizeObserver.observe(gridRef.current!);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const getSnapShot = useCallback(() => {
    return dimensionsRef.current;
  }, []);

  const [inlineSize, blockSize, horizontalScrollbarHeight] = useSyncExternalStore(
    subscribe,
    getSnapShot,
    getServerSnapshot
  );

  return [gridRef, inlineSize, blockSize, horizontalScrollbarHeight] as const;
}
