import { useRef, useState, useLayoutEffect } from 'react';

export function useGridDimensions(): [
  ref: React.RefObject<HTMLDivElement>,
  width: number,
  height: number
] {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridWidth, setGridWidth] = useState(1);
  const [gridHeight, setGridHeight] = useState(1);

  useLayoutEffect(() => {
    const { ResizeObserver } = window;

    // don't break in jest/jsdom and browsers that don't support ResizeObserver
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (ResizeObserver == null) return;

    const resizeObserver = new ResizeObserver(() => {
      // Get dimensions without scrollbars.
      // The dimensions given by the callback entries in Firefox do not substract the scrollbar sizes.
      const { clientWidth, clientHeight } = gridRef.current!;
      // TODO: remove once fixed upstream
      // we reduce width by 1px here to avoid layout issues in Chrome
      // https://bugs.chromium.org/p/chromium/issues/detail?id=1206298
      setGridWidth(clientWidth - (devicePixelRatio % 0.5 === 0 ? 0 : 1));
      setGridHeight(clientHeight);
    });

    resizeObserver.observe(gridRef.current!);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return [gridRef, gridWidth, gridHeight];
}
