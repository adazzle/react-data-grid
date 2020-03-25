import React, { useRef, useState, useMemo, useImperativeHandle, useEffect, forwardRef } from 'react';

import { Position, ScrollPosition, CalculatedColumn, SelectRowEvent } from './common/types';
import EventBus from './EventBus';
import InteractionMasks from './masks/InteractionMasks';
import { DataGridProps } from './DataGrid';
import HeaderRow from './HeaderRow';
import FilterRow from './FilterRow';
import RowRenderer from './RowRenderer';
import SummaryRow from './SummaryRow';
import {
  assertIsValidKey,
  getColumnMetrics,
  getColumnScrollPosition,
  getHorizontalRangeToRender,
  getScrollbarSize,
  getVerticalRangeToRender,
  getViewportColumns,
  isPositionStickySupported
} from './utils';

type SharedDataGridProps<R, K extends keyof R, SR> = Pick<DataGridProps<R, K, SR>,
  | 'columns'
  | 'draggableHeaderCell'
  | 'onCheckCellIsEditable'
  | 'onColumnResize'
  | 'onRowClick'
  | 'onRowExpandToggle'
  | 'onSelectedCellChange'
  | 'onSelectedCellRangeChange'
  | 'filters'
  | 'onFiltersChange'
  | 'onSelectedRowsChange'
  | 'rowGroupRenderer'
  | 'rowKey'
  | 'onHeaderDrop'
  | 'onSort'
  | 'sortDirection'
  | 'rowRenderer'
  | 'rows'
  | 'sortColumn'
  | 'selectedRows'
  | 'summaryRows'
> & Required<Pick<DataGridProps<R, K, SR>,
  | 'cellNavigationMode'
  | 'defaultFormatter'
  | 'editorPortalTarget'
  | 'enableCellAutoFocus'
  | 'enableCellCopyPaste'
  | 'enableFilters'
  | 'enableCellDragAndDrop'
  | 'headerRowHeight'
  | 'headerFiltersHeight'
  | 'minColumnWidth'
  | 'onRowsUpdate'
  | 'rowHeight'
>>;

export interface CanvasProps<R, K extends keyof R, SR> extends SharedDataGridProps<R, K, SR> {
  viewportWidth: number;
  height: number;
  scrollLeft: number;
  onScroll(position: ScrollPosition): void;
}

export interface CanvasHandle {
  scrollToColumn(colIdx: number): void;
  scrollToRow(rowIdx: number): void;
  selectCell(position: Position, openEditor?: boolean): void;
  openCellEditor(rowIdx: number, colIdx: number): void;
}

function Canvas<R, K extends keyof R, SR>({
  viewportWidth,
  height,
  minColumnWidth,
  defaultFormatter,
  scrollLeft,
  onScroll,
  columns: rawColumns,
  rows,
  rowHeight,
  headerRowHeight,
  rowKey,
  summaryRows,
  selectedRows,
  onSelectedRowsChange,
  ...props
}: CanvasProps<R, K, SR>, ref: React.Ref<CanvasHandle>) {
  const [eventBus] = useState(() => new EventBus());
  const [columnWidths, setColumnWidths] = useState<ReadonlyMap<string, number>>(() => new Map());
  const [scrollTop, setScrollTop] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const lastSelectedRowIdx = useRef(-1);
  const nonStickyScrollLeft = isPositionStickySupported() ? undefined : scrollLeft;

  const columnMetrics = useMemo(() => {
    return getColumnMetrics<R, SR>({
      columns: rawColumns,
      minColumnWidth,
      viewportWidth,
      columnWidths,
      defaultFormatter
    });
  }, [columnWidths, rawColumns, defaultFormatter, minColumnWidth, viewportWidth]);

  const { columns, lastFrozenColumnIndex } = columnMetrics;
  const clientHeight = getClientHeight();

  const [colOverscanStartIdx, colOverscanEndIdx] = useMemo((): [number, number] => {
    return getHorizontalRangeToRender({
      columnMetrics,
      scrollLeft
    });
  }, [columnMetrics, scrollLeft]);

  const viewportColumns = useMemo((): readonly CalculatedColumn<R, SR>[] => {
    return getViewportColumns(
      columns,
      colOverscanStartIdx,
      colOverscanEndIdx
    );
  }, [colOverscanEndIdx, colOverscanStartIdx, columns]);

  const [rowOverscanStartIdx, rowOverscanEndIdx] = getVerticalRangeToRender(
    clientHeight,
    rowHeight,
    scrollTop,
    rows.length
  );

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const { scrollLeft, scrollTop } = e.currentTarget;
    setScrollTop(scrollTop);
    onScroll({ scrollLeft, scrollTop });
  }

  function getClientHeight() {
    const scrollbarSize = columnMetrics.totalColumnWidth > columnMetrics.viewportWidth ? getScrollbarSize() : 0;
    return height - scrollbarSize;
  }

  function getFrozenColumnsWidth() {
    if (lastFrozenColumnIndex === -1) return 0;
    const lastFrozenCol = columns[lastFrozenColumnIndex];
    return lastFrozenCol.left + lastFrozenCol.width;
  }

  function handleColumnResize(column: CalculatedColumn<R, SR>, width: number) {
    const newColumnWidths = new Map(columnWidths);
    const originalWidth = columns.find(col => col.key === column.key)!.width;
    const minWidth = typeof originalWidth === 'number'
      ? Math.min(originalWidth, minColumnWidth)
      : minColumnWidth;
    width = Math.max(width, minWidth);
    newColumnWidths.set(column.key, width);
    setColumnWidths(newColumnWidths);

    props.onColumnResize?.(column.idx, width);
  }

  function scrollToCell({ idx, rowIdx }: Partial<Position>) {
    const { current } = canvasRef;
    if (!current) return;

    const { clientWidth, clientHeight, scrollLeft, scrollTop } = current;

    if (typeof idx === 'number' && idx > lastFrozenColumnIndex) {
      const { left, width } = columns[idx];
      const isCellAtLeftBoundary = left < scrollLeft + width + getFrozenColumnsWidth();
      const isCellAtRightBoundary = left + width > clientWidth + scrollLeft;
      if (isCellAtLeftBoundary || isCellAtRightBoundary) {
        const newScrollLeft = getColumnScrollPosition(columns, idx, scrollLeft, clientWidth);
        current.scrollLeft = scrollLeft + newScrollLeft;
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
  }

  function scrollToColumn(idx: number) {
    scrollToCell({ idx });
  }

  function scrollToRow(rowIdx: number) {
    const { current } = canvasRef;
    if (!current) return;
    current.scrollTop = rowIdx * rowHeight;
  }

  function selectCell(position: Position, openEditor?: boolean) {
    eventBus.dispatch('SELECT_CELL', position, openEditor);
  }

  function openCellEditor(rowIdx: number, idx: number) {
    selectCell({ rowIdx, idx }, true);
  }

  useEffect(() => {
    if (!onSelectedRowsChange) return;

    const handleRowSelectionChange = ({ rowIdx, checked, isShiftClick }: SelectRowEvent) => {
      assertIsValidKey(rowKey);
      const newSelectedRows = new Set(selectedRows);
      const rowId = rows[rowIdx][rowKey];

      if (checked) {
        newSelectedRows.add(rowId);
        const previousRowIdx = lastSelectedRowIdx.current;
        lastSelectedRowIdx.current = rowIdx;
        if (isShiftClick && previousRowIdx !== -1 && previousRowIdx !== rowIdx) {
          const step = Math.sign(rowIdx - previousRowIdx);
          for (let i = previousRowIdx + step; i !== rowIdx; i += step) {
            newSelectedRows.add(rows[i][rowKey]);
          }
        }
      } else {
        newSelectedRows.delete(rowId);
        lastSelectedRowIdx.current = -1;
      }

      onSelectedRowsChange(newSelectedRows);
    };

    return eventBus.subscribe('SELECT_ROW', handleRowSelectionChange);
  }, [eventBus, onSelectedRowsChange, rows, rowKey, selectedRows]);

  useImperativeHandle(ref, () => ({
    scrollToColumn,
    scrollToRow,
    selectCell,
    openCellEditor
  }));

  function getViewportRows() {
    const rowElements = [];
    for (let rowIdx = rowOverscanStartIdx; rowIdx <= rowOverscanEndIdx; rowIdx++) {
      const row = rows[rowIdx];
      let key: string | number = rowIdx;
      let isRowSelected = false;
      if (rowKey !== undefined) {
        const rowId = row[rowKey];
        isRowSelected = selectedRows?.has(rowId) ?? false;
        if (typeof rowId === 'string' || typeof rowId === 'number') {
          key = rowId;
        }
      }

      rowElements.push(
        <RowRenderer<R, SR>
          key={key}
          rowIdx={rowIdx}
          row={row}
          columnMetrics={columnMetrics}
          viewportColumns={viewportColumns}
          eventBus={eventBus}
          rowGroupRenderer={props.rowGroupRenderer}
          rowHeight={rowHeight}
          rowRenderer={props.rowRenderer}
          scrollLeft={nonStickyScrollLeft}
          isRowSelected={isRowSelected}
          onRowClick={props.onRowClick}
          onRowExpandToggle={props.onRowExpandToggle}
          enableCellRangeSelection={typeof props.onSelectedCellRangeChange === 'function'}
        />
      );
    }

    return rowElements;
  }

  return (
    <div
      className="rdg-viewport"
      style={{ height: height - 2 - (summaryRows ? summaryRows.length * rowHeight + 2 : 0) }}
      ref={canvasRef}
      onScroll={handleScroll}
    >
      <InteractionMasks<R, SR>
        rows={rows}
        rowHeight={rowHeight}
        columns={columns}
        height={clientHeight}
        enableCellAutoFocus={props.enableCellAutoFocus}
        enableCellCopyPaste={props.enableCellCopyPaste}
        enableCellDragAndDrop={props.enableCellDragAndDrop}
        cellNavigationMode={props.cellNavigationMode}
        eventBus={eventBus}
        canvasRef={canvasRef}
        scrollLeft={scrollLeft}
        scrollTop={scrollTop}
        scrollToCell={scrollToCell}
        editorPortalTarget={props.editorPortalTarget}
        onCheckCellIsEditable={props.onCheckCellIsEditable}
        onRowsUpdate={props.onRowsUpdate}
        onSelectedCellChange={props.onSelectedCellChange}
        onSelectedCellRangeChange={props.onSelectedCellRangeChange}
      />
      <div
        className="rdg-grid"
        style={{
          width: columnMetrics.totalColumnWidth,
          paddingTop: rowOverscanStartIdx * rowHeight,
          paddingBottom: (rows.length - 1 - rowOverscanEndIdx) * rowHeight
        }}
      >
        <HeaderRow<R, K, SR>
          rowKey={rowKey}
          rows={rows}
          height={headerRowHeight}
          width={columnMetrics.totalColumnWidth + getScrollbarSize()}
          columns={viewportColumns}
          onColumnResize={handleColumnResize}
          lastFrozenColumnIndex={columnMetrics.lastFrozenColumnIndex}
          draggableHeaderCell={props.draggableHeaderCell}
          onHeaderDrop={props.onHeaderDrop}
          allRowsSelected={selectedRows?.size === rows.length}
          onSelectedRowsChange={onSelectedRowsChange}
          sortColumn={props.sortColumn}
          sortDirection={props.sortDirection}
          onSort={props.onSort}
          scrollLeft={nonStickyScrollLeft}
        />
        {props.enableFilters && (
          <FilterRow<R, SR>
            headerRowHeight={headerRowHeight}
            height={props.headerFiltersHeight}
            width={columnMetrics.totalColumnWidth + getScrollbarSize()}
            lastFrozenColumnIndex={columnMetrics.lastFrozenColumnIndex}
            columns={viewportColumns}
            scrollLeft={nonStickyScrollLeft}
            filters={props.filters}
            onFiltersChange={props.onFiltersChange}
          />
        )}
        {getViewportRows()}
        {summaryRows?.map((row, rowIdx) => (
          <SummaryRow<R, SR>
            key={rowIdx}
            rowIdx={rowIdx}
            row={row}
            width={columnMetrics.totalColumnWidth + getScrollbarSize()}
            height={rowHeight}
            viewportColumns={viewportColumns}
            lastFrozenColumnIndex={columnMetrics.lastFrozenColumnIndex}
            scrollLeft={nonStickyScrollLeft}
          />
        ))}
      </div>
    </div>
  );
}

export default forwardRef(
  Canvas as React.RefForwardingComponent<CanvasHandle>
) as <R, K extends keyof R, SR>(props: CanvasProps<R, K, SR> & { ref?: React.Ref<CanvasHandle> }) => JSX.Element;
