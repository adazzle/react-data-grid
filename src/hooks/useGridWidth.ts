import { useRef, useState, useLayoutEffect, useMemo } from 'react';

// https://github.com/microsoft/TypeScript/issues/37861
interface ResizeObserverSize {
  inlineSize: number;
}

interface ResizeObserverEntry {
  target: Element;
  borderBoxSize?: ResizeObserverSize;
}

type ResizeObserverCallback = (entries?: ResizeObserverEntry[]) => void;

type ResizeObserver = new (callback: ResizeObserverCallback) => {
  observe: (target: Element) => void;
  disconnect: () => void;
};

export function useGridWidth<T>(width?: number): [React.RefObject<HTMLDivElement>, number] {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridWidth, setGridWidth] = useState(0);
  const resizeObserver = useMemo(() => {
    const { ResizeObserver } = window as (typeof window & { ResizeObserver?: ResizeObserver });
    if (ResizeObserver === undefined) {
      return null;
    }

    return new ResizeObserver((entries?: ResizeObserverEntry[]) => {
      if (Array.isArray(entries) && entries.length > 0) {
        const newWidth = entries[0].borderBoxSize?.inlineSize ?? entries[0].target.getBoundingClientRect().width;
        setGridWidth(newWidth);
      }
    });
  }, []);

  useLayoutEffect(() => {
    // Do not calculate the width if width is provided
    if (typeof width === 'number') return;

    // Use ResizeObserver if supported
    if (resizeObserver !== null) {
      const node = gridRef.current!;
      resizeObserver.observe(node);
      return () => resizeObserver.disconnect();
    }

    function onResize() {
      // Immediately re-render when the component is mounted to get valid columnMetrics.
      setGridWidth(gridRef.current!.getBoundingClientRect().width);
    }

    // Fallback to window resize
    onResize();

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [width, resizeObserver]);

  return [gridRef, width || gridWidth];
}
