import React, { useCallback, useRef, useState, useImperativeHandle, forwardRef } from 'react';

import { ColumnMetrics, Position, ScrollPosition } from './common/types';
import { EventTypes } from './common/enums';
import EventBus from './EventBus';
import InteractionMasks from './masks/InteractionMasks';
import { DataGridProps } from './DataGrid';
import Row from './Row';
import RowRenderer from './RowRenderer';
import SummaryRowRenderer from './SummaryRowRenderer';
import { getColumnScrollPosition, getScrollbarSize, isPositionStickySupported, getVerticalRangeToRender } from './utils';

type SharedDataGridProps<R, K extends keyof R> = Pick<DataGridProps<R, K>,
| 'rowGetter'
| 'rowsCount'
| 'rowRenderer'
| 'rowGroupRenderer'
| 'contextMenu'
| 'RowsContainer'
| 'getSubRowDetails'
| 'selectedRows'
| 'summaryRows'
| 'onCheckCellIsEditable'
| 'onSelectedCellChange'
| 'onSelectedCellRangeChange'
| 'onRowClick'
| 'onRowDoubleClick'
| 'onCellExpand'
| 'onRowExpandToggle'
| 'onDeleteSubRow'
| 'onAddSubRow'
| 'getCellActions'
> & Required<Pick<DataGridProps<R, K>,
| 'rowKey'
| 'enableCellAutoFocus'
| 'enableCellSelect'
| 'enableCellCopyPaste'
| 'enableCellDragAndDrop'
| 'rowHeight'
| 'cellNavigationMode'
| 'editorPortalTarget'
| 'renderBatchSize'
| 'onGridRowsUpdated'
>>;

export interface CanvasProps<R, K extends keyof R> extends SharedDataGridProps<R, K> {
  columnMetrics: ColumnMetrics<R>;
  height: number;
  scrollLeft: number;
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
  colVisibleStartIdx: number;
  colVisibleEndIdx: number;
  onScroll(position: ScrollPosition): void;
  onCanvasKeydown?(e: React.KeyboardEvent<HTMLDivElement>): void;
  onCanvasKeyup?(e: React.KeyboardEvent<HTMLDivElement>): void;
  onRowSelectionChange(rowIdx: number, row: R, checked: boolean, isShiftClick: boolean): void;
}

export interface CanvasHandle {
  scrollToColumn(colIdx: number): void;
  scrollToRow(rowIdx: number): void;
  selectCell(position: Position, openEditor?: boolean): void;
  openCellEditor(rowIdx: number, colIdx: number): void;
}

function Canvas<R, K extends keyof R>({
  columnMetrics,
  contextMenu,
  height,
  scrollLeft,
  onScroll,
  colOverscanStartIdx,
  colOverscanEndIdx,
  renderBatchSize,
  rowGetter,
  rowHeight,
  rowKey,
  RowsContainer,
  rowsCount,
  summaryRows,
  ...props
}: CanvasProps<R, K>, ref: React.Ref<CanvasHandle>) {
  const [eventBus] = useState(() => new EventBus());
  const [scrollTop, setScrollTop] = useState(0);
  const canvas = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const [rowRefs] = useState(() => new Map<number, Row<R>>());

  const clientHeight = getClientHeight();
  const nonStickyScrollLeft = isPositionStickySupported() ? undefined : scrollLeft;

  const [rowOverscanStartIdx, rowOverscanEndIdx] = getVerticalRangeToRender(
    clientHeight,
    rowHeight,
    scrollTop,
    rowsCount,
    renderBatchSize
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
    if (canvas.current) return canvas.current.clientHeight;
    const scrollbarSize = columnMetrics.totalColumnWidth > columnMetrics.viewportWidth ? getScrollbarSize() : 0;
    return height - scrollbarSize;
  }

  function onHitBottomCanvas({ rowIdx }: Position) {
    const { current } = canvas;
    if (!current) return;
    // We do not need to check for the index being in range, as the scrollTop setter will adequately clamp the value.
    current.scrollTop = (rowIdx + 1) * rowHeight - clientHeight;
  }

  function onHitTopCanvas({ rowIdx }: Position) {
    scrollToRow(rowIdx);
  }

  function handleHitColummBoundary({ idx }: Position) {
    scrollToColumn(idx);
  }

  function getRowColumns(rowIdx: number) {
    const row = rowRefs.get(rowIdx);
    return row && row.props ? row.props.columns : columnMetrics.columns;
  }

  function scrollToColumn(idx: number) {
    const { current } = canvas;
    if (!current) return;

    const { scrollLeft, clientWidth } = current;
    const newScrollLeft = getColumnScrollPosition(columnMetrics.columns, idx, scrollLeft, clientWidth);
    if (newScrollLeft !== 0) {
      current.scrollLeft = scrollLeft + newScrollLeft;
    }
  }

  function scrollToRow(rowIdx: number) {
    const { current } = canvas;
    if (!current) return;
    current.scrollTop = rowIdx * rowHeight;
  }

  function selectCell(position: Position, openEditor?: boolean) {
    eventBus.dispatch(EventTypes.SELECT_CELL, position, openEditor);
  }

  function openCellEditor(rowIdx: number, idx: number) {
    selectCell({ rowIdx, idx }, true);
  }

  const setRowRef = useCallback((row: Row<R> | null, idx: number) => {
    if (row === null) {
      rowRefs.delete(idx);
    } else {
      rowRefs.set(idx, row);
    }
  }, [rowRefs]);

  useImperativeHandle(ref, () => ({
    scrollToColumn,
    scrollToRow,
    selectCell,
    openCellEditor
  }));

  function getViewportRows() {
    const rowElements = [];
    for (let idx = rowOverscanStartIdx; idx <= rowOverscanEndIdx; idx++) {
      const rowData = rowGetter(idx);
      rowElements.push(
        <RowRenderer<R, K>
          key={idx}
          idx={idx}
          rowData={rowData}
          setRowRef={setRowRef}
          colOverscanEndIdx={colOverscanEndIdx}
          colOverscanStartIdx={colOverscanStartIdx}
          columnMetrics={columnMetrics}
          eventBus={eventBus}
          getSubRowDetails={props.getSubRowDetails}
          onRowSelectionChange={props.onRowSelectionChange}
          rowGroupRenderer={props.rowGroupRenderer}
          rowHeight={rowHeight}
          rowKey={rowKey}
          rowRenderer={props.rowRenderer}
          scrollLeft={nonStickyScrollLeft}
          selectedRows={props.selectedRows}
          onRowClick={props.onRowClick}
          onRowDoubleClick={props.onRowDoubleClick}
          onCellExpand={props.onCellExpand}
          onRowExpandToggle={props.onRowExpandToggle}
          onDeleteSubRow={props.onDeleteSubRow}
          onAddSubRow={props.onAddSubRow}
          getCellActions={props.getCellActions}
          enableCellRangeSelection={typeof props.onSelectedCellRangeChange === 'function'}
        />
      );
    }

    return rowElements;
  }

  let grid = (
    <div
      className="rdg-grid"
      style={{
        width: columnMetrics.totalColumnWidth,
        paddingTop: rowOverscanStartIdx * rowHeight,
        paddingBottom: (rowsCount - 1 - rowOverscanEndIdx) * rowHeight
      }}
    >
      {getViewportRows()}
    </div>
  );

  if (RowsContainer !== undefined) {
    grid = <RowsContainer id={contextMenu ? contextMenu.props.id : 'rowsContainer'}>{grid}</RowsContainer>;
  }

  const summary = summaryRows && summaryRows.length > 0 && (
    <div ref={summaryRef} className="rdg-summary">
      {summaryRows.map((rowData, idx) => (
        <SummaryRowRenderer<R, K>
          key={idx}
          idx={idx}
          rowData={rowData}
          colOverscanEndIdx={colOverscanEndIdx}
          colOverscanStartIdx={colOverscanStartIdx}
          columnMetrics={columnMetrics}
          rowHeight={rowHeight}
          scrollLeft={nonStickyScrollLeft}
          eventBus={eventBus}
        />
      ))}
    </div>
  );

  return (
    <>
      <div
        className="rdg-viewport"
        style={{ height: height - 2 - (summaryRows ? summaryRows.length * rowHeight + 2 : 0) }}
        ref={canvas}
        onScroll={handleScroll}
        onKeyDown={props.onCanvasKeydown}
        onKeyUp={props.onCanvasKeyup}
      >
        <InteractionMasks<R, K>
          rowGetter={rowGetter}
          rowsCount={rowsCount}
          rowHeight={rowHeight}
          columns={columnMetrics.columns}
          height={clientHeight}
          colVisibleStartIdx={props.colVisibleStartIdx}
          colVisibleEndIdx={props.colVisibleEndIdx}
          enableCellSelect={props.enableCellSelect}
          enableCellAutoFocus={props.enableCellAutoFocus}
          enableCellCopyPaste={props.enableCellCopyPaste}
          enableCellDragAndDrop={props.enableCellDragAndDrop}
          cellNavigationMode={props.cellNavigationMode}
          eventBus={eventBus}
          contextMenu={contextMenu}
          onHitBottomBoundary={onHitBottomCanvas}
          onHitTopBoundary={onHitTopCanvas}
          onHitLeftBoundary={handleHitColummBoundary}
          onHitRightBoundary={handleHitColummBoundary}
          scrollLeft={scrollLeft}
          scrollTop={scrollTop}
          getRowColumns={getRowColumns}
          editorPortalTarget={props.editorPortalTarget}
          onCheckCellIsEditable={props.onCheckCellIsEditable}
          onGridRowsUpdated={props.onGridRowsUpdated}
          onSelectedCellChange={props.onSelectedCellChange}
          onSelectedCellRangeChange={props.onSelectedCellRangeChange}
        />
        {grid}
      </div>
      {summary}
    </>
  );
}

export default forwardRef(
  Canvas as React.RefForwardingComponent<CanvasHandle, CanvasProps<{ [key: string]: unknown }, string>>
) as <R, K extends keyof R>(props: CanvasProps<R, K> & { ref?: React.Ref<CanvasHandle> }) => JSX.Element;
