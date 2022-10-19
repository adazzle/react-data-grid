import { useRef, useState } from 'react';
import { useLayoutEffect } from './useLayoutEffect';

import { ceil } from '../utils';

export function useGridDimensions(
  parentEl?: HTMLDivElement
): [ref: React.RefObject<HTMLDivElement>, width: number, height: number] {
  const parentRef = useRef<HTMLDivElement>(parentEl ?? null);
  const gridRef = useRef<HTMLDivElement>(null);
  const refForHeight = parentEl ? parentRef : gridRef;
  const [inlineSize, setInlineSize] = useState(1);
  const [blockSize, setBlockSize] = useState(1);

  useLayoutEffect(() => {
    const { ResizeObserver } = window;

    // don't break in Node.js (SSR), jest/jsdom, and browsers that don't support ResizeObserver
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (ResizeObserver == null) return;

    const { clientWidth, offsetWidth } = gridRef.current!;
    const { clientHeight, offsetHeight } = refForHeight.current!;
    const { width } = gridRef.current!.getBoundingClientRect();
    const { height } = refForHeight.current!.getBoundingClientRect();
    const initialWidth = width - offsetWidth + clientWidth;
    const initialHeight = height - offsetHeight + clientHeight;

    setInlineSize(handleDevicePixelRatio(initialWidth));
    setBlockSize(initialHeight);

    // for width
    const resizeObserverWidth = new ResizeObserver((entries) => {
      const size = entries[0].contentBoxSize[0];
      setInlineSize(handleDevicePixelRatio(size.inlineSize));
    });
    resizeObserverWidth.observe(gridRef.current!);

    // for height
    const resizeObserverHeight = new ResizeObserver((entries) => {
      const size = entries[0].contentBoxSize[0];
      setBlockSize(size.blockSize);
    });
    resizeObserverHeight.observe(refForHeight.current!);

    return () => {
      resizeObserverWidth.disconnect();
      resizeObserverHeight.disconnect();
    };
  }, [refForHeight]);

  return [refForHeight, inlineSize, blockSize];
}

// TODO: remove once fixed upstream
// we reduce width by 1px here to avoid layout issues in Chrome
// https://bugs.chromium.org/p/chromium/issues/detail?id=1206298
function handleDevicePixelRatio(size: number) {
  return size - (devicePixelRatio === 1 ? 0 : ceil(devicePixelRatio));
}
