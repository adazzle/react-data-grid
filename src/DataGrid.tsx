import {
  forwardRef,
  useState,
  useCallback,
  useImperativeHandle,
  useMemo
} from 'react';
import type { RefAttributes } from 'react';
import clsx from 'clsx';

import { rootClassname, viewportDraggingClassname } from './style';
import type { Viewport } from './context';
import { HeaderRowProvider, ViewportColumnsProvider, ViewportContextProvider } from './context';
import {
  useGridDimensions,
  useViewportColumns,
  useViewportRows,
  useChildren,
  AriaRowIndexContext,
  RowPositionContext
} from './hooks';
import { DEFAULT_HEADER_ROW_HEIGHT } from './HeaderRow';
import { DEFAULT_ROW_HEIGHT } from './Viewport';
import { DEFAULT_FILTER_ROW_HEIGHT } from './FilterRow';
import { DEFAULT_SUMMARY_ROW_HEIGHT } from './SummaryRow';
import { assertIsValidKeyGetter } from './utils';

import type { Column, Position } from './types';

type DefaultColumnOptions<R, SR> = Pick<Column<R, SR>,
  | 'formatter'
  | 'minWidth'
  | 'resizable'
  | 'sortable'
>;

export interface DataGridHandle {
  element: HTMLDivElement | null;
  scrollToColumn: (colIdx: number) => void;
  scrollToRow: (rowIdx: number) => void;
  // selectCell: (position: Position, openEditor?: boolean) => void;
}

type SharedDivProps = Pick<React.HTMLAttributes<HTMLDivElement>,
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-describedby'
  | 'className'
  | 'style'
>;

export interface DataGridProps<R, SR = unknown> extends SharedDivProps {
  /** An array of objects representing each column on the grid */
  columns: readonly Column<R, SR>[];
  defaultColumnOptions?: DefaultColumnOptions<R, SR>;

  /** Called when the grid is scrolled */
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;

  // TODO: type children
  children?: React.ReactElement | Array<React.ReactElement>;
}

/**
 * Main API Component to render a data grid of rows and columns
 *
 * @example
 *
 * <DataGrid columns={columns} rows={rows} />
*/
function DataGrid<R, SR>({
  columns: rawColumns,
  defaultColumnOptions,
  onScroll,
  className,
  style,
  children,
  // ARIA
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy
}: DataGridProps<R, SR>, ref: React.Ref<DataGridHandle>) {
  /**
   * states
   */
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [columnWidths, setColumnWidths] = useState<ReadonlyMap<string, number>>(() => new Map());
  const [isDragging, setDragging] = useState(false);

  /**
   * computed values
   */
  const [gridRef, gridWidth, gridHeight] = useGridDimensions();
  const { headerRow, viewportRows, filterRow, summaryRows, emptyRowsRenderer } = useChildren<R, SR>(children);
  const rowHeight = viewportRows ? viewportRows.props.rowHeight ?? DEFAULT_ROW_HEIGHT : 0;
  const headerRowHeight = headerRow ? headerRow.props.height ?? DEFAULT_HEADER_ROW_HEIGHT : 0;
  const headerRowsCount = filterRow ? 2 : 1;
  const filterRowHeight = filterRow ? filterRow.props.height ?? DEFAULT_FILTER_ROW_HEIGHT : 0;
  const totalHeaderHeight = headerRowHeight + filterRowHeight;
  const summaryRowsHeight = summaryRows?.map(s => s.props.height ?? DEFAULT_SUMMARY_ROW_HEIGHT).reduce((p, c) => p + c, 0) ?? 0;
  const summaryRowsCount = summaryRows?.length ?? 0;
  const clientHeight = gridHeight - totalHeaderHeight - summaryRowsHeight;

  const {
    rows: rawRows,
    rowKeyGetter,
    selectedRows,
    onSelectedRowsChange,
    groupBy: rawGroupBy,
    rowGrouper,
    expandedGroupIds
  } = viewportRows?.props ?? {};

  const isSelectable = selectedRows !== undefined && onSelectedRowsChange !== undefined;

  const { columns, viewportColumns, layoutCssVars, columnMetrics, totalColumnWidth, lastFrozenColumnIndex, totalFrozenColumnWidth, groupBy } = useViewportColumns({
    rawColumns,
    columnWidths,
    scrollLeft,
    viewportWidth: gridWidth,
    defaultColumnOptions,
    rawGroupBy: rowGrouper ? rawGroupBy : undefined
  });

  const { rowOverscanStartIdx, rowOverscanEndIdx, rows, rowsCount, isGroupRow } = useViewportRows({
    rawRows,
    groupBy,
    rowGrouper,
    rowHeight,
    clientHeight,
    scrollTop,
    expandedGroupIds
  });

  const hasGroups = groupBy.length > 0 && typeof rowGrouper === 'function';

  useImperativeHandle(ref, () => ({
    element: gridRef.current,
    scrollToColumn(idx: number) {
      scrollToCell({ idx });
    },
    scrollToRow(rowIdx: number) {
      const { current } = gridRef;
      if (!current) return;
      current.scrollTo({
        top: rowIdx * rowHeight,
        behavior: 'smooth'
      });
    }
  }));

  /**
  * callbacks
  */
  const handleColumnResize = useCallback((columnKey: string, width: number) => {
    setColumnWidths(columnWidths => {
      const newColumnWidths = new Map(columnWidths);
      newColumnWidths.set(columnKey, width);
      return newColumnWidths;
    });
  }, []);

  const handleAllRowsSelectionChange = useCallback((checked: boolean) => {
    if (!onSelectedRowsChange) return;

    assertIsValidKeyGetter(rowKeyGetter);

    const newSelectedRows = new Set<React.Key>(checked ? rows.map(rowKeyGetter) : undefined);
    onSelectedRowsChange(newSelectedRows);
  }, [onSelectedRowsChange, rowKeyGetter, rows]);

  const scrollToCell = useCallback(({ idx, rowIdx }: Partial<Position>) => {
    const { current } = gridRef;
    if (!current) return;

    if (typeof idx === 'number' && idx > lastFrozenColumnIndex) {
      const { clientWidth } = current;
      const { left, width } = columnMetrics.get(columns[idx])!;
      const isCellAtLeftBoundary = left < scrollLeft + totalFrozenColumnWidth;
      const isCellAtRightBoundary = left + width > clientWidth + scrollLeft;
      if (isCellAtLeftBoundary) {
        current.scrollLeft = left - totalFrozenColumnWidth;
      } else if (isCellAtRightBoundary) {
        current.scrollLeft = left + width - clientWidth;
      }
    }

    if (typeof rowIdx === 'number') {
      if (rowIdx * rowHeight < scrollTop) {
        // at top boundary, scroll to the row's top
        current.scrollTop = rowIdx * rowHeight;
      } else if ((rowIdx + 1) * rowHeight > scrollTop + clientHeight) {
        // at bottom boundary, scroll the next row's top to the bottom of the viewport
        current.scrollTop = (rowIdx + 1) * rowHeight - clientHeight;
      }
    }
  }, [clientHeight, columnMetrics, columns, gridRef, lastFrozenColumnIndex, rowHeight, scrollLeft, scrollTop, totalFrozenColumnWidth]);

  const viewportObject = useMemo((): Viewport<R, SR> => ({
    columns,
    rows,
    rawRows,
    rowOverscanStartIdx,
    rowOverscanEndIdx,
    clientHeight,
    totalHeaderHeight,
    headerRowsCount,
    groupBy,
    isGroupRow,
    isDragging,
    setDragging,
    scrollToCell
  }), [
    columns,
    rows,
    rawRows,
    rowOverscanStartIdx,
    rowOverscanEndIdx,
    clientHeight,
    totalHeaderHeight,
    headerRowsCount,
    groupBy,
    isGroupRow,
    isDragging,
    setDragging,
    scrollToCell
  ]);

  /**
  * event handlers
  */

  function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    const { scrollTop, scrollLeft } = event.currentTarget;
    setScrollTop(scrollTop);
    setScrollLeft(scrollLeft);
    onScroll?.(event);
  }

  function getSummaryRows() {
    if (!summaryRows) return null;
    // TODO: add a generic position utility
    const bottomPosition = new Map<number, number>();
    for (let i = 0; i < summaryRows.length; i++) {
      let bottom = 0;
      for (let j = i + 1; j < summaryRows.length; j++) {
        bottom += summaryRows[j].props?.height ?? DEFAULT_SUMMARY_ROW_HEIGHT;
      }
      bottomPosition.set(i, bottom);
    }

    return (
      <>
        {summaryRows.map((child, rowIdx) => (
          <AriaRowIndexContext.Provider
            key={rowIdx}
            value={headerRowsCount + rowsCount + rowIdx + 1}
          >
            <RowPositionContext.Provider value={bottomPosition.get(rowIdx)}>
              {child}
            </RowPositionContext.Provider>
          </AriaRowIndexContext.Provider>
        ))}
      </>
    );
  }

  return (
    <div
      role={hasGroups ? 'treegrid' : 'grid'}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-multiselectable={isSelectable ? true : undefined}
      aria-colcount={columns.length}
      aria-rowcount={headerRowsCount + rowsCount + summaryRowsCount}
      className={clsx(rootClassname, { [viewportDraggingClassname]: isDragging }, className)}
      style={{
        ...style,
        '--row-width': `${totalColumnWidth}px`,
        '--row-height': `${rowHeight}px`,
        ...layoutCssVars
      } as unknown as React.CSSProperties}
      ref={gridRef}
      onScroll={handleScroll}
    >
      <ViewportColumnsProvider viewportColumns={viewportColumns}>
        <HeaderRowProvider
          allRowsSelected={selectedRows?.size === rawRows.length}
          onAllRowsSelectionChange={handleAllRowsSelectionChange}
          onColumnResize={handleColumnResize}
        >
          {headerRow}
        </HeaderRowProvider>
        {filterRow}
        {rows.length === 0 && emptyRowsRenderer ? emptyRowsRenderer : (
          <>
            <ViewportContextProvider value={viewportObject}>
              {viewportRows}
            </ViewportContextProvider>
            {getSummaryRows()}
          </>
        )}
      </ViewportColumnsProvider>
    </div>
  );
}

export default forwardRef(DataGrid) as <R, SR = unknown>(props: DataGridProps<R, SR> & RefAttributes<DataGridHandle>) => JSX.Element;
