import { useRef, useState } from 'react';
import { useLayoutEffect } from './useLayoutEffect';

export function useGridDimensions(): [
  ref: React.RefObject<HTMLDivElement>,
  width: number,
  height: number
] {
  const gridRef = useRef<HTMLDivElement>(null);
  const [inlineSize, setInlineSize] = useState(1);
  const [blockSize, setBlockSize] = useState(1);

  useLayoutEffect(() => {
    const { ResizeObserver } = window;

    // don't break in Node.js (SSR), jest/jsdom, and browsers that don't support ResizeObserver
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (ResizeObserver == null) return;

    const resizeObserver = new ResizeObserver((entries) => {
      // The dimensions given by the callback entries in Firefox do not substract the scrollbar sizes.
      const size = entries[0].contentBoxSize[0];
      // TODO: remove once fixed upstream
      // we reduce width by 1px here to avoid layout issues in Chrome
      // https://bugs.chromium.org/p/chromium/issues/detail?id=1206298
      setInlineSize(size.inlineSize - (devicePixelRatio % 1 === 0 ? 0 : 1));
      setBlockSize(size.blockSize);
    });

    resizeObserver.observe(gridRef.current!);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return [gridRef, inlineSize, blockSize];
}
