import { useLayoutEffect, useState } from 'react';
import { flushSync } from 'react-dom';

import type { CalculatedColumn, ResizedWidth } from '../types';
import type { DataGridProps } from '../DataGrid';

export function useColumnWidths<R, SR>(
  columns: readonly CalculatedColumn<R, SR>[],
  viewportColumns: readonly CalculatedColumn<R, SR>[],
  templateColumns: readonly string[],
  gridRef: React.RefObject<HTMLDivElement | null>,
  gridWidth: number,
  resizedColumnWidths: ReadonlyMap<string, number>,
  measuredColumnWidths: ReadonlyMap<string, number>,
  setResizedColumnWidths: (resizedColumnWidths: ReadonlyMap<string, number>) => void,
  setMeasuredColumnWidths: (measuredColumnWidths: ReadonlyMap<string, number>) => void,
  onColumnResize: DataGridProps<R, SR>['onColumnResize']
) {
  const [columnToAutoResize, setColumnToAutoResize] = useState<{
    readonly key: string;
    readonly width: ResizedWidth;
  } | null>(null);
  const [prevGridWidth, setPreviousGridWidth] = useState(gridWidth);
  const [columnsToRemeasure, setColumnsToRemeasure] = useState<ReadonlySet<string> | null>(null);
  const columnsCanFlex: boolean = columns.length === viewportColumns.length;
  // Allow columns to flex again when...
  const ignorePreviouslyMeasuredColumns: boolean =
    // there is enough space for columns to flex and the grid was resized
    columnsCanFlex && gridWidth !== prevGridWidth;
  const newTemplateColumns = [...templateColumns];
  const columnsToMeasure: string[] = [];

  for (const { key, idx, width } of viewportColumns) {
    if (key === columnToAutoResize?.key) {
      newTemplateColumns[idx] =
        columnToAutoResize.width === 'max-content'
          ? columnToAutoResize.width
          : `${columnToAutoResize.width}px`;
      columnsToMeasure.push(key);
    } else if (
      typeof width === 'string' &&
      (ignorePreviouslyMeasuredColumns ||
        (columnsToRemeasure !== null
          ? columnsToRemeasure.has(key)
          : !measuredColumnWidths.has(key))) &&
      !resizedColumnWidths.has(key)
    ) {
      newTemplateColumns[idx] = width;
      columnsToMeasure.push(key);
    }
  }

  const gridTemplateColumns = newTemplateColumns.join(' ');

  useLayoutEffect(updateMeasuredWidths);

  function updateMeasuredWidths() {
    setPreviousGridWidth(gridWidth);
    if (columnsToMeasure.length === 0) return;

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

    if (hasChanges) {
      setMeasuredColumnWidths(newMeasuredColumnWidths);
    }

    if (columnToAutoResize !== null) {
      const resizingKey = columnToAutoResize.key;
      const oldWidth = resizedColumnWidths.get(resizingKey);
      const newWidth = measureColumnWidth(gridRef, resizingKey);
      if (newWidth !== undefined && oldWidth !== newWidth) {
        const newResizedColumnWidths = new Map(resizedColumnWidths);
        newResizedColumnWidths.set(resizingKey, newWidth);
        setResizedColumnWidths(newResizedColumnWidths);
      }
      setColumnToAutoResize(null);
    }
  }

  function handleColumnResize(column: CalculatedColumn<R, SR>, nextWidth: ResizedWidth) {
    const { key: resizingKey } = column;

    flushSync(() => {
      if (columnsCanFlex) {
        // remeasure all the columns that can flex and are not resized by the user
        const columnsToRemeasure = new Set<string>();
        for (const { key, width } of viewportColumns) {
          if (resizingKey !== key && typeof width === 'string' && !resizedColumnWidths.has(key)) {
            columnsToRemeasure.add(key);
          }
        }

        setColumnsToRemeasure(columnsToRemeasure);
      }

      setColumnToAutoResize({
        key: resizingKey,
        width: nextWidth
      });
    });

    setColumnsToRemeasure(null);

    if (onColumnResize) {
      const previousWidth = resizedColumnWidths.get(resizingKey);
      const newWidth =
        typeof nextWidth === 'number' ? nextWidth : measureColumnWidth(gridRef, resizingKey);
      if (newWidth !== undefined && newWidth !== previousWidth) {
        onColumnResize(column, newWidth);
      }
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
