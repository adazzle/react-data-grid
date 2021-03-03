import { useRef, useState, useLayoutEffect } from 'react';
import { getPropertyValue } from '../utils';

export function useGridDimensions() {
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
      setGridWidth(clientWidth);
      setGridHeight(clientHeight);
    });

    resizeObserver.observe(gridRef.current!);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const rowHeight = getPropertyValue(gridRef.current, '--row-height');
  const headerRowHeight = getPropertyValue(gridRef.current, '--header-row-height') || rowHeight;
  const headerFiltersHeight = getPropertyValue(gridRef.current, '--filter-row-height');
  const summaryRowHeight = getPropertyValue(gridRef.current, '--summary-row-height') || rowHeight;

  return {
    gridRef,
    gridWidth,
    gridHeight,
    rowHeight,
    headerRowHeight,
    headerFiltersHeight,
    summaryRowHeight
  };
}
