import { useRef, useState, useLayoutEffect } from 'react';

export function useGridDimensions() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridWidth, setGridWidth] = useState(1);
  const [gridHeight, setGridHeight] = useState(1);

  useLayoutEffect(() => {
    const { ResizeObserver } = window;

    // don't break in jest/jsdom and browsers that don't support ResizeObserver
    if (ResizeObserver == null) return;

    const resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setGridWidth(width);
      setGridHeight(height);
    });

    resizeObserver.observe(gridRef.current!);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return [gridRef, gridWidth, gridHeight] as const;
}
