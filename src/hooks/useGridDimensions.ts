import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { useLayoutEffect } from './useLayoutEffect';

export function useGridDimensions() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [inlineSize, setInlineSize] = useState(1);
  const [blockSize, setBlockSize] = useState(1);
  const [horizontalScrollbarWidth, setHorizontalScrollbarWidth] = useState(0);

  useLayoutEffect(() => {
    const { ResizeObserver } = window;

    // don't break in Node.js (SSR), jsdom, and browsers that don't support ResizeObserver
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (ResizeObserver == null) return;

    const { clientWidth, clientHeight, offsetWidth, offsetHeight } = gridRef.current!;
    const { width, height } = gridRef.current!.getBoundingClientRect();
    const horizontalScrollbarWidth = offsetHeight - clientHeight;
    const initialWidth = width - offsetWidth + clientWidth;
    const initialHeight = height - horizontalScrollbarWidth;

    setInlineSize(initialWidth);
    setBlockSize(initialHeight);
    setHorizontalScrollbarWidth(horizontalScrollbarWidth);

    const resizeObserver = new ResizeObserver((entries) => {
      const size = entries[0].contentBoxSize[0];
      // we use flushSync here to avoid flashing scrollbars
      flushSync(() => {
        setInlineSize(size.inlineSize);
        setBlockSize(size.blockSize);
      });
    });
    resizeObserver.observe(gridRef.current!);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return [gridRef, inlineSize, blockSize, horizontalScrollbarWidth] as const;
}
