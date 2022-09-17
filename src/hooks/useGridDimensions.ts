import { useMemo, useRef, useState } from 'react';
import { useLayoutEffect } from './useLayoutEffect';

export function useGridDimensions() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [inlineSize, setInlineSize] = useState(1);
  const [blockSize, setBlockSize] = useState(1);
  const [measuredColumnWidths, setMeasuredColumnWidths] = useState(
    (): ReadonlyMap<string, number> => new Map()
  );

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

    const resizeObserver = new ResizeObserver((entries) => {
      const size = entries[0].contentBoxSize[0];
      setInlineSize(size.inlineSize);
      setBlockSize(size.blockSize);
      // TODO: only clear flex columns, if any?
      setMeasuredColumnWidths(new Map());
    });
    resizeObserver.observe(gridRef.current!);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const observeMeasuringCell = useMemo(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setMeasuredColumnWidths((measuredColumnWidths) => {
        const newMeasuredColumnWidths = new Map(measuredColumnWidths);
        let hasChanges = false;

        for (const entry of entries) {
          const { inlineSize } = entry.contentBoxSize[0];
          const key = (entry.target as HTMLDivElement).dataset.measuringCellKey!;
          newMeasuredColumnWidths.set(key, inlineSize);
          hasChanges ||= measuredColumnWidths.get(key) !== inlineSize;
        }

        return hasChanges ? newMeasuredColumnWidths : measuredColumnWidths;
      });
    });

    return (measuringCell: HTMLDivElement | null) => {
      if (measuringCell !== null) {
        resizeObserver.observe(measuringCell);
      }
    };
  }, []);

  return [
    gridRef,
    inlineSize,
    blockSize,
    measuredColumnWidths,
    setMeasuredColumnWidths,
    observeMeasuringCell
  ] as const;
}
