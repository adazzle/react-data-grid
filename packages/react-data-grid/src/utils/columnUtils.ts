import { Column, CalculatedColumn, ColumnMetrics, CellContentRenderer } from '../common/types';
import { getScrollbarSize } from './domUtils';
import { SelectColumn } from '../Columns';

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

// get column width, fallback on defaultWidth when width is undefined
function getWidth(
  viewportWidth: number,
  minWidth?: number | string,
  defaultWidth?: number
): number | void {
  switch (typeof minWidth) {
    case 'string':
      return /^\d+%$/.test(minWidth)
        ? Math.floor((viewportWidth * parseInt(minWidth, 10)) / 100)
        : defaultWidth;
    case 'number':
      return minWidth;
    default:
      return defaultWidth;
  }
}

function getSpecifiedWidth<R>(
  column: Column<R>,
  columnWidths: Map<keyof R, number>,
  viewportWidth: number,
  defaultMinColumnWidth: number
): number | void {
  // get column min width from grid or column prop, fallback on defaultMinColumnWidth if undefined
  const minWidth = typeof column.minWidth === 'number' ? column.minWidth : defaultMinColumnWidth;
  const width = getWidth(viewportWidth, column.width);

  // SelectColumn must always use width prop when defined
  if (column.key === SelectColumn.key) {
    return width || minWidth;
  }

  if (columnWidths.has(column.key)) {
    // Use the resized width if available
    return columnWidths.get(column.key);
  }
  if (width !== undefined) {
    return Math.max(width, minWidth);
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
