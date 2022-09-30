import { useMemo, useState } from 'react';

export function useMeasuringCellDimensions() {
  const [measuredColumnWidths, setMeasuredColumnWidths] = useState(
    (): ReadonlyMap<string, number> => new Map()
  );

  const measuringCellResizeObserver = useMemo(() => {
    return new ResizeObserver((entries, resizeObserver) => {
      setMeasuredColumnWidths((measuredColumnWidths) => {
        const newMeasuredColumnWidths = new Map(measuredColumnWidths);
        let hasChanges = false;

        for (const entry of entries) {
          const measuringCell = entry.target as HTMLDivElement;
          if (measuringCell.parentNode === null) {
            resizeObserver.unobserve(measuringCell);
            continue;
          }

          const { inlineSize } = entry.contentBoxSize[0];
          const key = measuringCell.dataset.measuringCellKey!;
          newMeasuredColumnWidths.set(key, inlineSize);
          hasChanges ||= measuredColumnWidths.get(key) !== inlineSize;
        }

        return hasChanges ? newMeasuredColumnWidths : measuredColumnWidths;
      });
    });
  }, []);

  return [measuredColumnWidths, setMeasuredColumnWidths, measuringCellResizeObserver] as const;
}
