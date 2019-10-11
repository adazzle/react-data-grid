import { Column, CalculatedColumn, ColumnMetrics } from '../common/types';
import { getScrollbarSize } from './domUtils';

type Metrics<R> = Pick<ColumnMetrics<R>, 'viewportWidth' | 'minColumnWidth' | 'columnWidths'> & {
  columns: Column<R>[];
};

export function getColumnMetrics<R>(metrics: Metrics<R>): ColumnMetrics<R> {
  let left = 0;
  let totalWidth = 0;

  const columns = metrics.columns.map(c => ({ ...c }));
  setSpecifiedWidths(columns, metrics.columnWidths, metrics.viewportWidth, metrics.minColumnWidth);

  const allocatedWidths = columns.map(c => c.width || 0).reduce((acc, w) => acc + w, 0);
  const unallocatedWidth = metrics.viewportWidth - allocatedWidths - getScrollbarSize();

  setRemainingWidths(columns, unallocatedWidth, metrics.minColumnWidth);

  let calculatedColumns: CalculatedColumn<R>[] = columns.map(column => {
    // Every column should have a valid width as this stage
    const width = column.width as number;
    const newColumn: CalculatedColumn<R> = {
      ...column,
      idx: 0,
      width,
      left
    };
    totalWidth += width;
    left += width;
    return newColumn;
  });

  const frozenColumns = calculatedColumns.filter(c => isFrozen(c));
  const nonFrozenColumns = calculatedColumns.filter(c => !isFrozen(c));
  calculatedColumns = frozenColumns.concat(nonFrozenColumns);
  calculatedColumns.forEach((c, i) => c.idx = i);
  return {
    columns: calculatedColumns,
    lastFrozenColumnIndex: frozenColumns.length - 1,
    totalColumnWidth: totalWidth,
    minColumnWidth: metrics.minColumnWidth,
    columnWidths: metrics.columnWidths,
    viewportWidth: metrics.viewportWidth
  };
}

function setSpecifiedWidths<R>(
  columns: Column<R>[],
  columnWidths: Map<keyof R, number>,
  viewportWidth: number,
  minColumnWidth: number
): void {
  for (const column of columns) {
    if (columnWidths.has(column.key)) {
      // Use the resized width if available
      column.width = columnWidths.get(column.key);
    } else if (typeof column.width === 'number') {
      // TODO: allow width to be less than minWidth?
      column.width = Math.max(column.width, minColumnWidth);
    } else if (typeof column.width === 'string' && /^\d+%$/.test(column.width)) {
      column.width = Math.max(Math.floor(viewportWidth * column.width / 100), minColumnWidth);
    }
  }
}

function setRemainingWidths<R>(
  columns: Column<R>[],
  unallocatedWidth: number,
  minColumnWidth: number
) {
  const unassignedColumns = columns.filter(c => c.width === undefined);
  const columnWidth = Math.max(
    Math.floor(unallocatedWidth / unassignedColumns.length),
    minColumnWidth
  );

  for (const column of unassignedColumns) {
    column.width = columnWidth;
  }
}

// Logic extented to allow for functions to be passed down in column.editable
// this allows us to deicde whether we can be editing from a cell level
export function canEdit<R>(column: CalculatedColumn<R>, rowData: R, enableCellSelect?: boolean): boolean {
  if (typeof column.editable === 'function') {
    return enableCellSelect === true && column.editable(rowData);
  }
  return enableCellSelect === true && (!!column.editor || !!column.editable);
}

export function isFrozen<R>(column: Column<R> | CalculatedColumn<R>): boolean {
  return column.frozen === true;
}

export function getColumnScrollPosition<R>(columns: CalculatedColumn<R>[], idx: number, currentScrollLeft: number, currentClientWidth: number): number {
  let left = 0;
  let frozen = 0;

  for (let i = 0; i < idx; i++) {
    const column = columns[i];
    if (column) {
      if (column.width) {
        left += column.width;
      }
      if (isFrozen(column)) {
        frozen += column.width;
      }
    }
  }

  const selectedColumn = columns[idx];
  if (selectedColumn) {
    const scrollLeft = left - frozen - currentScrollLeft;
    const scrollRight = left + selectedColumn.width - currentScrollLeft;

    if (scrollLeft < 0) {
      return scrollLeft;
    }
    if (scrollRight > currentClientWidth) {
      return scrollRight - currentClientWidth;
    }
  }

  return 0;
}
