import { useLayoutEffect, useRef, useState } from 'react';

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
  const [columnToAutoresize, setColumnToAutoResize] = useState<string | null>(null);
  const prevGridWidthRef = useRef(gridWidth);
  const columnsCanFlex: boolean = columns.length === viewportColumns.length;
  // Allow columns to flex again when...
  const ignorePreviouslyMeasuredColumns: boolean =
    // there is enough space for columns to flex and the grid was resized
    columnsCanFlex && gridWidth !== prevGridWidthRef.current;
  const newTemplateColumns = [...templateColumns];
  const columnsToMeasure: string[] = [];

  for (const { key, idx, width } of viewportColumns) {
    if (key === columnToAutoresize) {
      newTemplateColumns[idx] = 'max-content';
      columnsToMeasure.push(key);
    } else if (
      typeof width === 'string' &&
      (ignorePreviouslyMeasuredColumns || !measuredColumnWidths.has(key)) &&
      !resizedColumnWidths.has(key)
    ) {
      newTemplateColumns[idx] = width;
      columnsToMeasure.push(key);
    }
  }

  const gridTemplateColumns = newTemplateColumns.join(' ');

  useLayoutEffect(() => {
    prevGridWidthRef.current = gridWidth;
    updateMeasuredWidths(columnsToMeasure);
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

    if (columnToAutoresize !== null) {
      setColumnToAutoResize(null);
      setResizedColumnWidths((resizedColumnWidths) => {
        const newResizedColumnWidths = new Map(resizedColumnWidths);
        newResizedColumnWidths.set(
          columnToAutoresize,
          measureColumnWidth(gridRef, columnToAutoresize)!
        );
        return newResizedColumnWidths;
      });
    }
  }

  function handleColumnResize(column: CalculatedColumn<R, SR>, nextWidth: number | 'max-content') {
    const { key: resizingKey } = column;
    const columnsToMeasure: string[] = [];

    for (const { key, width } of viewportColumns) {
      if (
        resizingKey !== key &&
        columnsCanFlex &&
        typeof width === 'string' &&
        !resizedColumnWidths.has(key)
      ) {
        columnsToMeasure.push(key);
      }
    }

    setMeasuredColumnWidths((measuredColumnWidths) => {
      const newMeasuredColumnWidths = new Map(measuredColumnWidths);
      for (const columnKey of columnsToMeasure) {
        newMeasuredColumnWidths.delete(columnKey);
      }
      return newMeasuredColumnWidths;
    });

    if (typeof nextWidth === 'number') {
      setResizedColumnWidths((resizedColumnWidths) => {
        const newResizedColumnWidths = new Map(resizedColumnWidths);
        newResizedColumnWidths.set(resizingKey, nextWidth);
        return newResizedColumnWidths;
      });
      onColumnResize?.(column, nextWidth);
    } else {
      setColumnToAutoResize(resizingKey);
    }
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
