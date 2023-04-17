import { useRef, useState } from 'react';

import { useLayoutEffect } from './useLayoutEffect';

export function useGridDimensions(): [
  ref: React.RefObject<HTMLDivElement>,
  width: number,
  height: number,
  isWidthInitialized: boolean
] {
  const gridRef = useRef<HTMLDivElement>(null);
  const [inlineSize, setInlineSize] = useState(1);
  const [blockSize, setBlockSize] = useState(1);
  const [isWidthInitialized, setWidthInitialized] = useState(false);

  useLayoutEffect(() => {
    const { ResizeObserver } = window;

    // don't break in Node.js (SSR), jest/jsdom, and browsers that don't support ResizeObserver
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (ResizeObserver == null) return;

    const { clientWidth, clientHeight, offsetWidth, offsetHeight } = gridRef.current!;
    const { width, height } = gridRef.current!.getBoundingClientRect();
    const initialWidth = width - offsetWidth + clientWidth;
    const initialHeight = height - offsetHeight + clientHeight;

    setInlineSize(initialWidth);
    setBlockSize(initialHeight);
    setWidthInitialized(true);

    const resizeObserver = new ResizeObserver((entries) => {
      // contentBoxSize is not available in Chrome <84
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (entries?.[0].contentBoxSize?.[0]) {
        const size = entries[0].contentBoxSize[0];
        setInlineSize(size.inlineSize);
        setBlockSize(size.blockSize);
      } else {
        const size = entries[0].contentRect;
        setInlineSize(size.width);
        setBlockSize(size.height);
      }
    });
    resizeObserver.observe(gridRef.current!);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return [gridRef, inlineSize, blockSize, isWidthInitialized];
}