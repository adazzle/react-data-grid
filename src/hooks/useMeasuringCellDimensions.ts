import { useMemo, useState } from 'react';

export function useMeasuringCellDimensions() {
  const [measuredColumnWidths, setMeasuredColumnWidths] = useState(
    (): ReadonlyMap<string, number> => new Map()
  );

  const observeMeasuringCell = useMemo(() => {
    const resizeObserver = new ResizeObserver((entries) => {
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

    return (measuringCell: HTMLDivElement | null) => {
      if (measuringCell !== null) {
        resizeObserver.observe(measuringCell);
      }
    };
  }, []);

  return [measuredColumnWidths, setMeasuredColumnWidths, observeMeasuringCell] as const;
}
