import { Column, CalculatedColumn, FormatterProps, Omit, GroupRow } from '../types';
import { ToggleGroupedFormatter } from '../formatters';
import { SELECT_COLUMN_KEY } from '../Columns';

interface Metrics<R, SR> {
  columns: readonly Column<R, SR>[];
  columnWidths: ReadonlyMap<string, number>;
  minColumnWidth: number;
  viewportWidth: number;
  defaultResizable: boolean;
  defaultSortable: boolean;
  defaultFormatter: React.ComponentType<FormatterProps<R, SR>>;
  rawGroupBy?: readonly string[];
}

interface ColumnMetrics<TRow, TSummaryRow> {
  columns: readonly CalculatedColumn<TRow, TSummaryRow>[];
  lastFrozenColumnIndex: number;
  totalColumnWidth: number;
  groupBy: readonly string[];
}

export function getColumnMetrics<R, SR>(metrics: Metrics<R, SR>): ColumnMetrics<R, SR> {
  let left = 0;
  let totalWidth = 0;
  let allocatedWidths = 0;
  let unassignedColumnsCount = 0;
  let lastFrozenColumnIndex = -1;
  type IntermediateColumn = Omit<Column<R, SR>, 'width'> & { width: number | undefined; rowGroup?: boolean };
  let columns: IntermediateColumn[] = [];

  // Find valid groupBy columns
  const groupBy: readonly string[] = metrics.rawGroupBy?.filter(key => metrics.columns.find(c => c.key === key) !== undefined) ?? [];

  for (const metricsColumn of metrics.columns) {
    let width = getSpecifiedWidth(metricsColumn, metrics.columnWidths, metrics.viewportWidth);

    if (width === undefined) {
      unassignedColumnsCount++;
    } else {
      width = clampColumnWidth(width, metricsColumn, metrics.minColumnWidth);
      allocatedWidths += width;
    }

    let column: IntermediateColumn = { ...metricsColumn, width };

    if (groupBy.includes(column.key)) {
      lastFrozenColumnIndex++;
      const level = groupBy.indexOf(column.key);
      column = {
        ...column,
        frozen: true,
        rowGroup: true,
        groupFormatter: column.groupFormatter ?? ToggleGroupedFormatter,
        formatterOptions: {
          groupFocusable(row: GroupRow<R>) {
            return row.level === level;
          }
        }
      };
      columns.push(column);
    } else if (column.frozen) {
      lastFrozenColumnIndex++;
      columns.splice(lastFrozenColumnIndex, 0, column);
    } else {
      columns.push(column);
    }
  }

  // Sort groupBy columns
  if (groupBy.length >= 0) {
    const selectColumn = columns.find(c => c.key === SELECT_COLUMN_KEY);
    const groupByColumns = groupBy.map(key => columns.find(c => c.key === key)!);
    const remaningColumns = columns.filter(c => !groupByColumns.includes(c) && c !== selectColumn);
    columns = [
      ...groupByColumns,
      ...remaningColumns
    ];

    if (selectColumn) {
      columns.unshift(selectColumn);
    }
  }

  const unallocatedWidth = metrics.viewportWidth - allocatedWidths;
  const unallocatedColumnWidth = Math.max(
    Math.floor(unallocatedWidth / unassignedColumnsCount),
    metrics.minColumnWidth
  );

  const calculatedColumns: CalculatedColumn<R, SR>[] = columns.map((column, idx) => {
    // Every column should have a valid width as this stage
    const width = column.width ?? clampColumnWidth(unallocatedColumnWidth, column, metrics.minColumnWidth);
    const newColumn = {
      ...column,
      idx,
      width,
      left,
      sortable: column.sortable ?? metrics.defaultSortable,
      resizable: column.resizable ?? metrics.defaultResizable,
      formatter: column.formatter ?? metrics.defaultFormatter
    };
    totalWidth += width;
    left += width;
    return newColumn;
  });

  return {
    columns: calculatedColumns,
    lastFrozenColumnIndex,
    totalColumnWidth: totalWidth,
    groupBy
  };
}

function getSpecifiedWidth<R, SR>(
  { key, width }: Column<R, SR>,
  columnWidths: ReadonlyMap<string, number>,
  viewportWidth: number
): number | undefined {
  if (columnWidths.has(key)) {
    // Use the resized width if available
    return columnWidths.get(key);
  }
  if (typeof width === 'number') {
    return width;
  }
  if (typeof width === 'string' && /^\d+%$/.test(width)) {
    return Math.floor(viewportWidth * parseInt(width, 10) / 100);
  }
  return undefined;
}

function clampColumnWidth<R, SR>(
  width: number,
  { minWidth, maxWidth }: Column<R, SR>,
  minColumnWidth: number
): number {
  width = Math.max(width, minWidth ?? minColumnWidth);

  if (typeof maxWidth === 'number') {
    return Math.min(width, maxWidth);
  }

  return width;
}

// Logic extented to allow for functions to be passed down in column.editable
// this allows us to decide whether we can be editing from a cell level
export function canEdit<R, SR>(column: Column<R, SR>, row: R): boolean {
  if (typeof column.editable === 'function') {
    return column.editable(row);
  }
  return Boolean(column.editor || column.editor2 || column.editable);
}

export function getColumnScrollPosition<R, SR>(columns: readonly CalculatedColumn<R, SR>[], idx: number, currentScrollLeft: number, currentClientWidth: number): number {
  let left = 0;
  let frozen = 0;

  for (let i = 0; i < idx; i++) {
    const column = columns[i];
    if (column) {
      if (column.width) {
        left += column.width;
      }
      if (column.frozen) {
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
