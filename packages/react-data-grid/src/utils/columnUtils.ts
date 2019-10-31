import { Column, CalculatedColumn, ColumnMetrics, CellContentRenderer } from '../common/types';
import { getScrollbarSize } from './domUtils';

interface Metrics<R> {
  columns: Column<R>[];
  columnWidths: Map<keyof R, number>;
  minColumnWidth: number;
  viewportWidth: number;
  defaultCellContentRenderer: CellContentRenderer<R>;
}

export function getColumnMetrics<R>(metrics: Metrics<R>): ColumnMetrics<R> {
  let left = 0;
  let totalWidth = 0;
  let allocatedWidths = 0;
  let unassignedColumnsCount = 0;
  let lastFrozenColumnIndex = -1;
  const columns: Array<Column<R> & { width: number | void }> = [];

  for (const metricsColumn of metrics.columns) {
    const width = getSpecifiedWidth(metricsColumn, metrics.columnWidths, metrics.viewportWidth, metrics.minColumnWidth);
    const column = { ...metricsColumn, width };

    if (width === undefined) {
      unassignedColumnsCount++;
    } else {
      allocatedWidths += width;
    }

    if (isFrozen(column)) {
      lastFrozenColumnIndex++;
      columns.splice(lastFrozenColumnIndex, 0, column);
    } else {
      columns.push(column);
    }
  }

  const unallocatedWidth = metrics.viewportWidth - allocatedWidths - getScrollbarSize();
  const unallocatedColumnWidth = Math.max(
    Math.floor(unallocatedWidth / unassignedColumnsCount),
    metrics.minColumnWidth
  );

  const calculatedColumns: CalculatedColumn<R>[] = columns.map((column, idx) => {
    // Every column should have a valid width as this stage
    const width = column.width === undefined ? unallocatedColumnWidth : column.width;
    const newColumn: CalculatedColumn<R> = {
      ...column,
      idx,
      width,
      left,
      cellContentRenderer: column.cellContentRenderer || metrics.defaultCellContentRenderer
    };
    totalWidth += width;
    left += width;
    return newColumn;
  });

  return {
    columns: calculatedColumns,
    lastFrozenColumnIndex,
    totalColumnWidth: totalWidth,
    viewportWidth: metrics.viewportWidth
  };
}

function getSpecifiedWidth<R>(
  column: Column<R>,
  columnWidths: Map<keyof R, number>,
  viewportWidth: number,
  minColumnWidth: number
): number | void {
  if (columnWidths.has(column.key)) {
    // Use the resized width if available
    return columnWidths.get(column.key);
  }
  if (typeof column.width === 'number') {
    // TODO: allow width to be less than minWidth?
    return Math.max(column.width, minColumnWidth);
  }
  if (typeof column.width === 'string' && /^\d+%$/.test(column.width)) {
    return Math.max(Math.floor(viewportWidth * parseInt(column.width, 10) / 100), minColumnWidth);
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
