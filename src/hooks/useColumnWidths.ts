import { useLayoutEffect, useState } from 'react';

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
  setMeasuredColumnWidths: StateSetter<ReadonlyMap<string, number>>,
  onColumnResize: DataGridProps<R, SR>['onColumnResize']
) {
  const [columnToAutoResize, setColumnToAutoResize] = useState<{
    readonly key: string;
    readonly width: ResizedWidth;
  } | null>(null);
  const [prevGridWidth, setPreviousGridWidth] = useState(gridWidth);
  const columnsCanFlex: boolean = columns.length === viewportColumns.length;
  // Allow columns to flex again when...
  const ignorePreviouslyMeasuredColumns: boolean =
    // there is enough space for columns to flex and the grid was resized
    columnsCanFlex && gridWidth !== prevGridWidth;
  const newTemplateColumns = [...templateColumns];
  const columnsToMeasure: string[] = [];

  for (const column of viewportColumns) {
    const { key, idx, width } = column;
    if (key === columnToAutoResize?.key) {
      newTemplateColumns[idx] = getColumnWidthForMeasurement(columnToAutoResize.width, column);
      columnsToMeasure.push(key);
    } else if (
      (ignorePreviouslyMeasuredColumns || !measuredColumnWidths.has(key)) &&
      // If the column is resized by the user, we don't want to measure it again
      !resizedColumnWidths.has(key)
    ) {
      newTemplateColumns[idx] = getColumnWidthForMeasurement(width, column);
      columnsToMeasure.push(key);
    }
  }

  const gridTemplateColumns = newTemplateColumns.join(' ');

  useLayoutEffect(updateMeasuredAndResizedWidths);

  function updateMeasuredAndResizedWidths() {
    setPreviousGridWidth(gridWidth);

    if (columnsToMeasure.length > 0) {
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

    if (columnToAutoResize !== null) {
      setColumnToAutoResize(null);
      setResizedColumnWidths((resizedColumnWidths) => {
        const resizingKey = columnToAutoResize.key;
        const oldWidth = resizedColumnWidths.get(resizingKey);
        const newWidth = measureColumnWidth(gridRef, resizingKey);
        if (newWidth !== undefined && oldWidth !== newWidth) {
          const newResizedColumnWidths = new Map(resizedColumnWidths);
          newResizedColumnWidths.set(resizingKey, newWidth);
          onColumnResize?.(viewportColumns.find((c) => c.key === resizingKey)!, newWidth);
          return newResizedColumnWidths;
        }
        return resizedColumnWidths;
      });
    }
  }

  function handleColumnResize(column: CalculatedColumn<R, SR>, nextWidth: ResizedWidth) {
    const { key: resizingKey } = column;
    const columnsToMeasure: string[] = [];

    // remeasure all columns that can flex and are not resized by the user
    for (const { key, width } of viewportColumns) {
      if (
        columnsCanFlex &&
        resizingKey !== key &&
        typeof width === 'string' &&
        !resizedColumnWidths.has(key)
      ) {
        columnsToMeasure.push(key);
      }
    }

    if (columnsToMeasure.length > 0) {
      setMeasuredColumnWidths((measuredColumnWidths) => {
        const newMeasuredColumnWidths = new Map(measuredColumnWidths);
        for (const columnKey of columnsToMeasure) {
          newMeasuredColumnWidths.delete(columnKey);
        }
        return newMeasuredColumnWidths;
      });
    }

    setColumnToAutoResize({
      key: resizingKey,
      width: nextWidth
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

function getColumnWidthForMeasurement<R, SR>(
  width: number | string,
  { minWidth, maxWidth }: CalculatedColumn<R, SR>
) {
  const widthWithUnit = typeof width === 'number' ? `${width}px` : width;

  // don't break in Node.js (SSR) and jsdom
  if (typeof CSS === 'undefined') {
    return widthWithUnit;
  }

  const hasMaxWidth = maxWidth != null;
  const clampedWidth = hasMaxWidth
    ? `clamp(${minWidth}px, ${widthWithUnit}, ${maxWidth}px)`
    : `max(${minWidth}px, ${widthWithUnit})`;

  // clamp() and max() do not handle all the css grid column width values
  if (isValidCSSGridColumnWidth(clampedWidth)) {
    return clampedWidth;
  }

  if (
    hasMaxWidth &&
    // ignore maxWidth if it less than minWidth
    maxWidth >= minWidth &&
    // we do not want to use minmax with max-content as it
    // can result in width being larger than max-content
    widthWithUnit !== 'max-content'
  ) {
    // We are setting maxWidth on the measuring cell but the browser only applies
    // it after all the widths are calculated. This results in left over space in some cases.
    const minMaxWidth = `minmax(${widthWithUnit}, ${maxWidth}px)`;
    if (isValidCSSGridColumnWidth(minMaxWidth)) {
      return minMaxWidth;
    }
  }

  return isValidCSSGridColumnWidth(widthWithUnit) ? widthWithUnit : 'auto';
}

function isValidCSSGridColumnWidth(width: string) {
  return CSS.supports('grid-template-columns', width);
}
