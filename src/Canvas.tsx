import React, { useRef, useState, useImperativeHandle, useEffect, forwardRef } from 'react';

import { ColumnMetrics, Position, ScrollPosition, CalculatedColumn, SelectRowEvent } from './common/types';
import EventBus from './EventBus';
import InteractionMasks from './masks/InteractionMasks';
import { DataGridProps } from './DataGrid';
import RowRenderer from './RowRenderer';
import SummaryRow from './SummaryRow';
import { getColumnScrollPosition, getScrollbarSize, isPositionStickySupported, getVerticalRangeToRender, assertIsValidKey } from './utils';

type SharedDataGridProps<R, K extends keyof R, SR> = Pick<DataGridProps<R, K, SR>,
  | 'rows'
  | 'rowRenderer'
  | 'rowGroupRenderer'
  | 'selectedRows'
  | 'summaryRows'
  | 'onCheckCellIsEditable'
  | 'onSelectedCellChange'
  | 'onSelectedCellRangeChange'
  | 'onRowClick'
  | 'onRowExpandToggle'
  | 'onSelectedRowsChange'
  | 'rowKey'
> & Required<Pick<DataGridProps<R, K, SR>,
  | 'enableCellAutoFocus'
  | 'enableCellCopyPaste'
  | 'enableCellDragAndDrop'
  | 'rowHeight'
  | 'cellNavigationMode'
  | 'editorPortalTarget'
  | 'onRowsUpdate'
>>;

export interface CanvasProps<R, K extends keyof R, SR> extends SharedDataGridProps<R, K, SR> {
  columnMetrics: ColumnMetrics<R, SR>;
  viewportColumns: readonly CalculatedColumn<R, SR>[];
  height: number;
  scrollLeft: number;
  onScroll: (position: ScrollPosition) => void;
}

export interface CanvasHandle {
  scrollToColumn: (colIdx: number) => void;
  scrollToRow: (rowIdx: number) => void;
  selectCell: (position: Position, openEditor?: boolean) => void;
  openCellEditor: (rowIdx: number, colIdx: number) => void;
}

function Canvas<R, K extends keyof R, SR>({
  columnMetrics,
  viewportColumns,
  height,
  scrollLeft,
  onScroll,
  rows,
  rowHeight,
  rowKey,
  summaryRows,
  selectedRows,
  onSelectedRowsChange,
  ...props
}: CanvasProps<R, K, SR>, ref: React.Ref<CanvasHandle>) {
  const [eventBus] = useState(() => new EventBus());
  const [scrollTop, setScrollTop] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const lastSelectedRowIdx = useRef(-1);

  const clientHeight = getClientHeight();
  const nonStickyScrollLeft = isPositionStickySupported() ? undefined : scrollLeft;
  const { columns, lastFrozenColumnIndex } = columnMetrics;

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
    if (summaryRef.current) {
      summaryRef.current.scrollLeft = scrollLeft;
    }
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

  const summary = summaryRows && summaryRows.length > 0 && (
    <div ref={summaryRef} className="rdg-summary">
      {summaryRows.map((row, rowIdx) => (
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
  );

  return (
    <>
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
          {getViewportRows()}
        </div>
      </div>
      {summary}
    </>
  );
}

export default forwardRef(
  Canvas as React.RefForwardingComponent<CanvasHandle>
) as <R, K extends keyof R, SR>(props: CanvasProps<R, K, SR> & { ref?: React.Ref<CanvasHandle> }) => JSX.Element;
