import { useRef } from 'react';
import { flushSync } from 'react-dom';

import type { CalculatedColumn, StateSetter } from '../types';
import { useLayoutEffect } from './useLayoutEffect';
import type { DataGridProps } from '../DataGrid';

export function useColumnWidths<R, SR>(
  columns: readonly CalculatedColumn<R, SR>[],
  viewportColumns: readonly CalculatedColumn<R, SR>[],
  templateColumns: readonly string[],
  gridRef: React.RefObject<HTMLDivElement>,
  gridWidth: number,
  resizedColumnWidths: ReadonlyMap<string, number>,
  measuredColumnWidths: ReadonlyMap<string, number>,
  setResizedColumnWidths: StateSetter<ReadonlyMap<string, number>>,
  setMeasuredColumnWidths: StateSetter<ReadonlyMap<string, number>>,
  onColumnResize: DataGridProps<R, SR>['onColumnResize']
) {
  const prevGridWidthRef = useRef(gridWidth);
  const columnsCanFlex: boolean = columns.length === viewportColumns.length;
  // Allow columns to flex again when...
  const ignorePreviouslyMeasuredColumns: boolean =
    // there is enough space for columns to flex and the grid was resized
    columnsCanFlex && gridWidth !== prevGridWidthRef.current;
  const newTemplateColumns = [...templateColumns];
  const columnsToMeasure: string[] = [];

  for (const { key, idx, width } of viewportColumns) {
    if (
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
  }

  function handleColumnResize(column: CalculatedColumn<R, SR>, nextWidth: number | 'max-content') {
    const { key: resizingKey } = column;
    const newTemplateColumns = [...templateColumns];
    const columnsToMeasure: string[] = [];

    for (const { key, idx, width } of viewportColumns) {
      if (resizingKey === key) {
        const width = typeof nextWidth === 'number' ? `${nextWidth}px` : nextWidth;
        newTemplateColumns[idx] = width;
      } else if (columnsCanFlex && typeof width === 'string' && !resizedColumnWidths.has(key)) {
        newTemplateColumns[idx] = width;
        columnsToMeasure.push(key);
      }
    }

    gridRef.current!.style.gridTemplateColumns = newTemplateColumns.join(' ');
    const measuredWidth =
      typeof nextWidth === 'number' ? nextWidth : measureColumnWidth(gridRef, resizingKey)!;

    // TODO: remove
    // need flushSync to keep frozen column offsets in sync
    // we may be able to use `startTransition` or even `requestIdleCallback` instead
    flushSync(() => {
      setResizedColumnWidths((resizedColumnWidths) => {
        const newResizedColumnWidths = new Map(resizedColumnWidths);
        newResizedColumnWidths.set(resizingKey, measuredWidth);
        return newResizedColumnWidths;
      });
      updateMeasuredWidths(columnsToMeasure);
    });

    onColumnResize?.(column.idx, measuredWidth);
  }

  return {
    gridTemplateColumns,
    handleColumnResize
  } as const;
}

function measureColumnWidth(gridRef: React.RefObject<HTMLDivElement>, key: string) {
  const selector = `[data-measuring-cell-key="${CSS.escape(key)}"]`;
  const measuringCell = gridRef.current!.querySelector(selector);
  return measuringCell?.getBoundingClientRect().width;
}
