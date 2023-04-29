import { useState } from 'react';
import { flushSync } from 'react-dom';

import type { CalculatedColumn, StateSetter } from '../types';
import { useLayoutEffect } from './useLayoutEffect';
import type { DataGridProps } from '../DataGrid';

export function useColumnWidths<R, SR>(
  columns: readonly CalculatedColumn<R, SR>[],
  viewportColumns: readonly CalculatedColumn<R, SR>[],
  gridRef: React.RefObject<HTMLDivElement>,
  gridWidth: number,
  resizedColumnWidths: ReadonlyMap<string, number>,
  measuredColumnWidths: ReadonlyMap<string, number>,
  setResizedColumnWidths: StateSetter<ReadonlyMap<string, number>>,
  setMeasuredColumnWidths: StateSetter<ReadonlyMap<string, number>>,
  onColumnResize: DataGridProps<R, SR>['onColumnResize']
) {
  const [prevGridWidth, setPrevGridWidth] = useState(gridWidth);
  const [autoResizeColumn, setAutoResizeColumn] = useState<CalculatedColumn<R, SR> | null>(null);

  // TODO:
  // can we do something like this?
  //   const ignoreMeasuredWidths = gridWidth !== prevGridWidth;
  //   measuredColumnWidths = ignoreMeasuredWidths ? new Map() : measuredColumnWidths;
  // this could lead to fewer re-renders
  // maybe we can just use `ignoreMeasuredWidths` in the `columnsToMeasure` filter?
  if (gridWidth !== prevGridWidth) {
    setPrevGridWidth(gridWidth);
    resetMeasuredColumnWidths();
  }

  // TODO:
  // when autoResizeColumn is set, can we skip calling `resetMeasuredColumnWidths`,
  // and instead handle flex columns here?
  const columnsToMeasure = viewportColumns.filter(
    ({ key, width }) =>
      !resizedColumnWidths.has(key) &&
      !measuredColumnWidths.has(key) &&
      typeof width === 'string' &&
      key !== autoResizeColumn?.key
  );

  useLayoutEffect(() => {
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
  }, [columnsToMeasure, gridRef, setMeasuredColumnWidths]);

  function resetMeasuredColumnWidths() {
    if (columns.length === viewportColumns.length) {
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
  }

  function handleColumnResize(column: CalculatedColumn<R, SR>, width: number | 'max-content') {
    const { key, idx } = column;

    if (width === 'max-content') {
      flushSync(() => {
        resetMeasuredColumnWidths();
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

    flushSync(() => {
      resetMeasuredColumnWidths();
      setResizedColumnWidths((resizedColumnWidths) => {
        const newResizedColumnWidths = new Map(resizedColumnWidths);
        newResizedColumnWidths.set(key, width);
        return newResizedColumnWidths;
      });
    });

    onColumnResize?.(idx, width);
  }

  return {
    autoResizeColumn,
    columnsToMeasure,
    handleColumnResize
  } as const;
}

function measureColumnWidth(gridRef: React.RefObject<HTMLDivElement>, key: string) {
  const selector = `[data-measuring-cell-key="${CSS.escape(key)}"]`;
  const measuringCell = gridRef.current!.querySelector(selector)!;
  return measuringCell.getBoundingClientRect().width;
}
