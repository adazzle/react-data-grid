import { useLayoutEffect, useState } from 'react';
import { flushSync } from 'react-dom';

import type { CalculatedColumn, ResizedWidth, StateSetter } from '../types';
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
  setMeasuredColumnWidths: (columnWidths: ReadonlyMap<string, number>) => void,
  onColumnResize: DataGridProps<R, SR>['onColumnResize']
) {
  const [columnToAutoResize, setColumnToAutoResize] = useState<{
    readonly key: string;
    readonly width: ResizedWidth;
  } | null>(null);
  const [prevGridWidth, setPreviousGridWidth] = useState(gridWidth);
  const [temporaryMeasuredColumnWidths, setTemporaryMeasuredColumnWidths] = useState<ReadonlyMap<
    string,
    number
  > | null>(null);
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
        (temporaryMeasuredColumnWidths !== null
          ? !temporaryMeasuredColumnWidths.has(key)
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
      setResizedColumnWidths((resizedColumnWidths) => {
        const oldWidth = resizedColumnWidths.get(resizingKey);
        const newWidth = measureColumnWidth(gridRef, resizingKey);
        if (newWidth !== undefined && oldWidth !== newWidth) {
          const newResizedColumnWidths = new Map(resizedColumnWidths);
          newResizedColumnWidths.set(resizingKey, newWidth);
          return newResizedColumnWidths;
        }
        return resizedColumnWidths;
      });
      setColumnToAutoResize(null);
    }
  }

  function handleColumnResize(column: CalculatedColumn<R, SR>, nextWidth: ResizedWidth) {
    const { key: resizingKey } = column;

    flushSync(() => {
      if (columnsCanFlex) {
        // remeasure all the columns that can flex and are not resized by the user
        const newMeasuredColumnWidths = new Map(measuredColumnWidths);
        for (const { key, width } of viewportColumns) {
          if (resizingKey !== key && typeof width === 'string' && !resizedColumnWidths.has(key)) {
            newMeasuredColumnWidths.delete(key);
          }
        }

        setTemporaryMeasuredColumnWidths(newMeasuredColumnWidths);
      }

      setColumnToAutoResize({
        key: resizingKey,
        width: nextWidth
      });
    });

    setTemporaryMeasuredColumnWidths(null);

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
