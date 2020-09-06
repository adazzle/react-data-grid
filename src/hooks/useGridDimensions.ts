import { useRef, useState, useLayoutEffect } from 'react';

// https://github.com/microsoft/TypeScript/issues/37861
interface ResizeObserverEntry {
  contentRect: {
    width: number;
    height: number;
  };
}

type ResizeObserver = new (callback: (entries: readonly ResizeObserverEntry[]) => void) => {
  observe: (target: Element) => void;
  disconnect: () => void;
};

export function useGridDimensions(): [React.RefObject<HTMLDivElement>, number, number] {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridWidth, setGridWidth] = useState(1);
  const [gridHeight, setGridHeight] = useState(1);

  useLayoutEffect(() => {
    const { ResizeObserver } = window as typeof window & { ResizeObserver: ResizeObserver };

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

  return [gridRef, gridWidth, gridHeight];
}
