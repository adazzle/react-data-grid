import { startTransition, useLayoutEffect, useRef, useState } from 'react';

import type { CalculatedColumn, StateSetter } from '../types';
import type { DataGridProps } from '../DataGrid';

export type ColumnResizeWidth = number | 'max-content';

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
  const [resizedColumnsToMeasure, setResizedColumnsToMeasure] = useState<
    Map<string, ColumnResizeWidth>
  >(() => new Map());
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

    if (resizedColumnsToMeasure.size > 0) {
      const tempWidth = resizedColumnsToMeasure.get(key);
      if (tempWidth !== undefined) {
        if (typeof tempWidth === 'number') {
          newTemplateColumns[idx] = `${tempWidth}px`;
          columnsToMeasure.delete(key);
        } else {
          newTemplateColumns[idx] = tempWidth;
          columnsToMeasure.add(key);
        }
      } else if (columnsCanFlex && typeof width === 'string' && !resizedColumnWidths.has(key)) {
        newTemplateColumns[idx] = width;
        columnsToMeasure.add(key);
      }
    }
  }

  const gridTemplateColumns = newTemplateColumns.join(' ');

  useLayoutEffect(() => {
    startTransition(() => {
      prevGridWidthRef.current = gridWidth;

      if (resizedColumnsToMeasure.size > 0) {
        for (const [resizingKey] of resizedColumnsToMeasure) {
          const measuredWidth = measureColumnWidth(gridRef, resizingKey)!;
          setResizedColumnWidths((resizedColumnWidths) => {
            const newResizedColumnWidths = new Map(resizedColumnWidths);
            newResizedColumnWidths.set(resizingKey, measuredWidth);
            return newResizedColumnWidths;
          });

          const column = columns.find((c) => c.key === resizingKey)!;
          onColumnResize?.(column, measuredWidth);
        }
        setResizedColumnsToMeasure(new Map());
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

  function handleColumnResize(column: CalculatedColumn<R, SR>, nextWidth: ColumnResizeWidth) {
    const { key: resizingKey } = column;

    setResizedColumnsToMeasure((resizedColumnsToMeasure) => {
      const newResizedColumnsToMeasure = new Map(resizedColumnsToMeasure);
      newResizedColumnsToMeasure.set(resizingKey, nextWidth);
      return newResizedColumnsToMeasure;
    });
  }

  return {
    columnsToMeasure,
    gridTemplateColumns,
    handleColumnResize
  } as const;
}

function measureColumnWidth(gridRef: React.RefObject<HTMLDivElement | null>, key: string) {
  const selector = `[data-measuring-cell-key="${CSS.escape(key)}"]`;
  const measuringCell = gridRef.current?.querySelector(selector);
  return measuringCell?.getBoundingClientRect().width;
}
