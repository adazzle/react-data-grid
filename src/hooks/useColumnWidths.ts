import { useRef, useState } from 'react';
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
  const [autoResizeColumn, setAutoResizeColumn] = useState<CalculatedColumn<R, SR> | null>(null);
  const prevGridWidthRef = useRef(gridWidth);
  const columnsCanFlex: boolean = columns.length === viewportColumns.length;
  // Allow columns to flex again when...
  const ignorePreviouslyMeasuredColumns: boolean =
    // there is enough space for columns to flex and...
    columnsCanFlex &&
    // the grid has resized, or a column is being `max-content`-sized.
    (gridWidth !== prevGridWidthRef.current || autoResizeColumn !== null);

  const columnsToMeasure = viewportColumns.filter(
    ({ key, width }) =>
      !resizedColumnWidths.has(key) &&
      (ignorePreviouslyMeasuredColumns || !measuredColumnWidths.has(key)) &&
      typeof width === 'string' &&
      key !== autoResizeColumn?.key
  );

  useLayoutEffect(() => {
    prevGridWidthRef.current = gridWidth;

    if (columnsToMeasure.length === 0) return;

    setMeasuredColumnWidths((measuredColumnWidths) => {
      const newMeasuredColumnWidths = new Map(measuredColumnWidths);
      let hasChanges = false;

      for (const { key } of columnsToMeasure) {
        const measuredWidth = measureColumnWidth(gridRef, key);
        hasChanges ||= measuredWidth !== measuredColumnWidths.get(key);
        newMeasuredColumnWidths.set(key, measuredWidth);
      }

      return hasChanges ? newMeasuredColumnWidths : measuredColumnWidths;
    });
  });

  function resetMeasuredColumnWidths() {
    if (!columnsCanFlex) return;

    setMeasuredColumnWidths((measuredColumnWidths) => {
      const newMeasuredColumnWidths = new Map(measuredColumnWidths);
      for (const column of columns) {
        if (!resizedColumnWidths.has(column.key) && typeof column.width === 'string') {
          newMeasuredColumnWidths.delete(column.key);
        }
      }
      return newMeasuredColumnWidths;
    });
  }

  function handleColumnResize(column: CalculatedColumn<R, SR>, width: number | 'max-content') {
    const { key, idx } = column;

    if (width === 'max-content') {
      flushSync(() => {
        // Clear resized and measured width of the resized column
        setResizedColumnWidths((resizedColumnWidths) => {
          const newResizedColumnWidths = new Map(resizedColumnWidths);
          newResizedColumnWidths.delete(key);
          return newResizedColumnWidths;
        });
        setMeasuredColumnWidths((measuredColumnWidths) => {
          const newMeasuredColumnWidths = new Map(measuredColumnWidths);
          newMeasuredColumnWidths.delete(key);
          return newMeasuredColumnWidths;
        });
        setAutoResizeColumn(column);
      });

      const measuredWidth = measureColumnWidth(gridRef, key);

      setResizedColumnWidths((resizedColumnWidths) => {
        const newResizedColumnWidths = new Map(resizedColumnWidths);
        newResizedColumnWidths.set(key, measuredWidth);
        return newResizedColumnWidths;
      });

      setAutoResizeColumn(null);
      onColumnResize?.(idx, measuredWidth);
      return;
    }

    resetMeasuredColumnWidths();
    setResizedColumnWidths((resizedColumnWidths) => {
      const newResizedColumnWidths = new Map(resizedColumnWidths);
      newResizedColumnWidths.set(key, width);
      return newResizedColumnWidths;
    });

    onColumnResize?.(idx, width);
  }

  function getGridTemplateColumns() {
    const newTemplateColumns = [...templateColumns];
    for (const column of columnsToMeasure) {
      newTemplateColumns[column.idx] = column.width as string;
    }

    if (autoResizeColumn !== null) {
      newTemplateColumns[autoResizeColumn.idx] = 'max-content';
    }

    return newTemplateColumns.join(' ');
  }

  return {
    handleColumnResize,
    getGridTemplateColumns
  } as const;
}

function measureColumnWidth(gridRef: React.RefObject<HTMLDivElement>, key: string) {
  const selector = `[data-measuring-cell-key="${CSS.escape(key)}"]`;
  const measuringCell = gridRef.current!.querySelector(selector)!;
  return measuringCell.getBoundingClientRect().width;
}
