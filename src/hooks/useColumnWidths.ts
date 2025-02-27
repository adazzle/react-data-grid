import { startTransition, useLayoutEffect, useRef, useState } from 'react';

import type { CalculatedColumn, StateSetter } from '../types';
import type { DataGridProps } from '../DataGrid';

export function useColumnWidths<R, SR>(
  columns: readonly CalculatedColumn<R, SR>[],
  viewportColumns: readonly CalculatedColumn<R, SR>[],
  templateColumns: readonly string[],
  gridRef: React.RefObject<HTMLDivElement | null>,
  gridWidth: number,
  resizedColumnWidths: ReadonlyMap<string, number>,
  measuredColumnWidths: ReadonlyMap<string, number>,
  setResizedColumnWidths: StateSetter<ReadonlyMap<string, number>>,
  setMeasuredColumnWidths: StateSetter<ReadonlyMap<string, number>>,
  onColumnResize: DataGridProps<R, SR>['onColumnResize']
) {
  const [templateColumnsToMeasure, setTemplateColumnsToMeasure] = useState<Map<string, string>>(
    () => new Map()
  );
  const prevGridWidthRef = useRef(gridWidth);
  const columnsCanFlex: boolean = columns.length === viewportColumns.length;
  // Allow columns to flex again when...
  const ignorePreviouslyMeasuredColumns: boolean =
    // there is enough space for columns to flex and the grid was resized
    columnsCanFlex && gridWidth !== prevGridWidthRef.current;
  const newTemplateColumns = [...templateColumns];
  const columnsToMeasure = new Set<string>();

  for (const { key, idx, width } of viewportColumns) {
    if (
      typeof width === 'string' &&
      (ignorePreviouslyMeasuredColumns || !measuredColumnWidths.has(key)) &&
      !resizedColumnWidths.has(key)
    ) {
      newTemplateColumns[idx] = width;
      columnsToMeasure.add(key);
    }

    if (templateColumnsToMeasure.size > 0) {
      const temp = templateColumnsToMeasure.get(key);
      if (temp) {
        newTemplateColumns[idx] = temp;
      } else if (columnsCanFlex && typeof width === 'string' && !resizedColumnWidths.has(key)) {
        newTemplateColumns[idx] = width;
      }
      columnsToMeasure.add(key);
    }
  }

  const gridTemplateColumns = newTemplateColumns.join(' ');

  useLayoutEffect(() => {
    startTransition(() => {
      prevGridWidthRef.current = gridWidth;

      if (templateColumnsToMeasure.size > 0) {
        for (const [resizingKey] of templateColumnsToMeasure) {
          const measuredWidth = measureColumnWidth(gridRef, resizingKey)!;
          setResizedColumnWidths((resizedColumnWidths) => {
            const newResizedColumnWidths = new Map(resizedColumnWidths);
            newResizedColumnWidths.set(resizingKey, measuredWidth);
            return newResizedColumnWidths;
          });

          const column = columns.find((c) => c.key === resizingKey)!;
          onColumnResize?.(column, measuredWidth);
        }
        setTemplateColumnsToMeasure(new Map());
      }

      if (columnsToMeasure.size > 0) {
        updateMeasuredWidths([...columnsToMeasure]);
      }
    });
  });

  function updateMeasuredWidths(columnsToMeasure: readonly string[]) {
    if (columnsToMeasure.length === 0) return;

    setMeasuredColumnWidths((measuredColumnWidths) => {
      const newMeasuredColumnWidths = new Map(measuredColumnWidths);
      let hasChanges = false;

      for (const key of columnsToMeasure) {
        const measuredWidth = measureColumnWidth(gridRef, key);
        hasChanges ||= measuredWidth !== measuredColumnWidths.get(key);
        if (measuredWidth === undefined) {
          newMeasuredColumnWidths.delete(key);
        } else {
          newMeasuredColumnWidths.set(key, measuredWidth);
        }
      }

      return hasChanges ? newMeasuredColumnWidths : measuredColumnWidths;
    });
  }

  function handleColumnResize(column: CalculatedColumn<R, SR>, nextWidth: number | 'max-content') {
    const { key: resizingKey } = column;

    setTemplateColumnsToMeasure((templateColumnsToMeasure) => {
      const newTemplateColumnsToMeasure = new Map(templateColumnsToMeasure);
      newTemplateColumnsToMeasure.set(
        resizingKey,
        typeof nextWidth === 'number' ? `${nextWidth}px` : nextWidth
      );
      return newTemplateColumnsToMeasure;
    });
  }

  return {
    gridTemplateColumns,
    handleColumnResize
  } as const;
}

function measureColumnWidth(gridRef: React.RefObject<HTMLDivElement | null>, key: string) {
  const selector = `[data-measuring-cell-key="${CSS.escape(key)}"]`;
  const measuringCell = gridRef.current?.querySelector(selector);
  return measuringCell?.getBoundingClientRect().width;
}
