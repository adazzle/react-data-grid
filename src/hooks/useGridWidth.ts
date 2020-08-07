import { useRef, useState, useLayoutEffect } from 'react';

export function useGridWidth<T>(width?: number): [React.RefObject<HTMLDivElement>, number] {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridWidth, setGridWidth] = useState(0);

  useLayoutEffect(() => {
    // Do not calculate the width if width is provided
    if (typeof width === 'number') return;
    function onResize() {
    // Immediately re-render when the component is mounted to get valid columnMetrics.
      setGridWidth(gridRef.current!.getBoundingClientRect().width);
    }
    onResize();

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [width]);

  return [gridRef, width || gridWidth];
}
