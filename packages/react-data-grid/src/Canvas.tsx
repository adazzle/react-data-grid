import React, { createElement, Fragment, useState, useRef, useEffect, useMemo } from 'react';
import { isValidElementType } from 'react-is';

import Header from './Header';
import ActualRow from './ActualRow';
import { InteractionMasks, EventBus } from './masks';
import { getColumnScrollPosition, getScrollbarSize } from './utils';
import { EventTypes, SCROLL_DIRECTION } from './common/enums';
import { CalculatedColumn, Position, CellMetaData, ColumnMetrics, HeaderRowData, InteractionMasksMetaData } from './common/types';
import { ReactDataGridProps } from './ReactDataGrid';
import { getScrollDirection, getVerticalRangeToRender, getHorizontalRangeToRender } from './utils/viewportUtils';

type SharedDataGridProps<R> = Pick<ReactDataGridProps<R>,
| 'draggableHeaderCell'
| 'getValidFilterValues'
| 'rowGetter'
| 'rowsCount'
| 'rowRenderer'
| 'rowGroupRenderer'
| 'scrollToRowIndex'
| 'contextMenu'
| 'onScroll'
| 'RowsContainer'
| 'emptyRowsView'
| 'onHeaderDrop'
| 'getSubRowDetails'
| 'overscanRowCount'
| 'overscanColumnCount'
| 'enableIsScrolling'
| 'selectedRows'
| 'onSelectedRowsChange'
| 'sortColumn'
| 'sortDirection'
| 'onGridSort'
> & Required<Pick<ReactDataGridProps<R>,
| 'rowKey'
| 'enableCellSelect'
| 'rowHeight'
| 'minHeight'
| 'cellNavigationMode'
| 'enableCellAutoFocus'
| 'editorPortalTarget'
>>;

export interface CanvasProps<R> extends SharedDataGridProps<R> {
  cellMetaData: CellMetaData<R>;
  columnMetrics: ColumnMetrics<R>;
  eventBus: EventBus;
  headerRows: [HeaderRowData<R>, HeaderRowData<R> | undefined];
  interactionMasksMetaData: InteractionMasksMetaData<R>;
  rowOffsetHeight: number;
  onCanvasKeydown?(e: React.KeyboardEvent<HTMLDivElement>): void;
  onCanvasKeyup?(e: React.KeyboardEvent<HTMLDivElement>): void;
  onColumnResize(idx: number, width: number): void;
  onRowSelectionChange(rowIdx: number, row: R, checked: boolean, isShiftClick: boolean): void;
}

export default function Canvas<R>({
  cellMetaData,
  cellNavigationMode,
  columnMetrics,
  contextMenu,
  draggableHeaderCell,
  editorPortalTarget,
  emptyRowsView,
  enableCellAutoFocus,
  enableCellSelect,
  enableIsScrolling,
  eventBus,
  getSubRowDetails,
  getValidFilterValues,
  headerRows,
  interactionMasksMetaData,
  minHeight,
  onCanvasKeydown,
  onCanvasKeyup,
  onColumnResize,
  onGridSort,
  onHeaderDrop,
  onRowSelectionChange,
  onScroll,
  onSelectedRowsChange,
  overscanColumnCount,
  overscanRowCount,
  rowGetter,
  rowGroupRenderer,
  rowHeight,
  rowKey,
  rowOffsetHeight,
  rowRenderer,
  RowsContainer = Fragment,
  rowsCount,
  scrollToRowIndex,
  selectedRows,
  sortColumn,
  sortDirection
}: CanvasProps<R>) {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(SCROLL_DIRECTION.NONE);
  const [isScrolling, setIsScrolling] = useState(false);
  const canvas = useRef<HTMLDivElement>(null);
  const prevScrollToRowIndex = useRef<number | undefined>();
  const resetScrollStateTimeoutId = useRef<number | null>(null);
  const height = minHeight - rowOffsetHeight;
  const clientHeight = getClientHeight();

  const { rowOverscanStartIdx, rowOverscanEndIdx } = useMemo(() => {
    return getVerticalRangeToRender({
      height: clientHeight,
      rowHeight,
      scrollTop,
      rowsCount,
      scrollDirection,
      overscanRowCount
    });
  }, [clientHeight, overscanRowCount, rowHeight, rowsCount, scrollDirection, scrollTop]);

  const { colOverscanStartIdx, colOverscanEndIdx, colVisibleStartIdx, colVisibleEndIdx } = useMemo(() => {
    return getHorizontalRangeToRender({
      columnMetrics,
      scrollLeft,
      scrollDirection,
      overscanColumnCount
    });
  }, [columnMetrics, overscanColumnCount, scrollDirection, scrollLeft]);

  useEffect(() => {
    return eventBus.subscribe(EventTypes.SCROLL_TO_COLUMN, idx => scrollToColumn(idx, columnMetrics.columns));
  }, [columnMetrics.columns, eventBus]);

  useEffect(() => {
    if (prevScrollToRowIndex.current === scrollToRowIndex) return;
    prevScrollToRowIndex.current = scrollToRowIndex;
    const { current } = canvas;
    if (typeof scrollToRowIndex === 'number' && current) {
      current.scrollTop = scrollToRowIndex * rowHeight;
    }
  }, [rowHeight, scrollToRowIndex]);

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const { scrollLeft: newScrollLeft, scrollTop: newScrollTop } = e.currentTarget;

    if (enableIsScrolling) {
      setIsScrolling(true);
      resetScrollStateAfterDelay();
    }

    const scrollDirection = getScrollDirection(
      { scrollLeft, scrollTop },
      { scrollLeft: newScrollLeft, scrollTop: newScrollTop }
    );
    setScrollLeft(newScrollLeft);
    setScrollTop(newScrollTop);
    setScrollDirection(scrollDirection);

    if (onScroll) {
      onScroll({ scrollLeft: newScrollLeft, scrollTop: newScrollTop, scrollDirection });
    }
  }

  function resetScrollStateAfterDelay() {
    clearScrollTimer();
    resetScrollStateTimeoutId.current = window.setTimeout(
      resetScrollStateAfterDelayCallback,
      150
    );
  }

  function clearScrollTimer() {
    if (resetScrollStateTimeoutId.current !== null) {
      window.clearTimeout(resetScrollStateTimeoutId.current);
      resetScrollStateTimeoutId.current = null;
    }
  }

  function resetScrollStateAfterDelayCallback() {
    resetScrollStateTimeoutId.current = null;
    setIsScrolling(false);
  }

  function getClientHeight() {
    if (canvas.current) return canvas.current.clientHeight;
    const scrollbarSize = columnMetrics.totalColumnWidth > columnMetrics.viewportWidth ? getScrollbarSize() : 0;
    return height - scrollbarSize;
  }

  function onHitBottomCanvas({ rowIdx }: Position) {
    const { current } = canvas;
    if (current) {
      // We do not need to check for the index being in range, as the scrollTop setter will adequately clamp the value.
      current.scrollTop = (rowIdx + 1) * rowHeight - clientHeight;
    }
  }

  function onHitTopCanvas({ rowIdx }: Position) {
    const { current } = canvas;
    if (current) {
      current.scrollTop = rowIdx * rowHeight;
    }
  }

  function handleHitColummBoundary({ idx }: Position) {
    scrollToColumn(idx, columnMetrics.columns);
  }

  function scrollToColumn(idx: number, columns: CalculatedColumn<R>[]) {
    const { current } = canvas;
    if (!current) return;

    const { scrollLeft, clientWidth } = current;
    const newScrollLeft = getColumnScrollPosition(columns, idx, scrollLeft, clientWidth);
    if (newScrollLeft !== 0) {
      current.scrollLeft = scrollLeft + newScrollLeft;
    }
  }

  function getRows() {
    const rowProps = {
      cellMetaData,
      colOverscanEndIdx,
      colOverscanStartIdx,
      columnMetrics,
      eventBus,
      getSubRowDetails,
      isScrolling,
      onRowSelectionChange,
      rowGetter,
      rowGroupRenderer,
      rowHeight,
      rowKey,
      rowOffsetHeight,
      rowRenderer,
      selectedRows
    } as const;
    const rowElements = [];

    for (let idx = rowOverscanStartIdx; idx <= rowOverscanEndIdx; idx++) {
      rowElements.push(
        <ActualRow<R>
          key={idx}
          idx={idx}
          {...rowProps}
        />
      );
    }

    return rowElements;
  }

  function getRowTop(rowIdx: number) {
    return rowHeight * rowIdx;
  }

  function getRowHeight() {
    return rowHeight;
  }

  function getRowColumns() {
    return columnMetrics.columns;
  }

  return (
    <div
      className="rdg-viewport"
      style={{ height }}
      ref={canvas}
      onScroll={handleScroll}
      onKeyDown={onCanvasKeydown}
      onKeyUp={onCanvasKeyup}
    >
      <InteractionMasks<R>
        rowGetter={rowGetter}
        rowsCount={rowsCount}
        rowHeight={rowHeight}
        columns={columnMetrics.columns}
        height={clientHeight}
        colVisibleStartIdx={colVisibleStartIdx}
        colVisibleEndIdx={colVisibleEndIdx}
        enableCellSelect={enableCellSelect}
        enableCellAutoFocus={enableCellAutoFocus}
        cellNavigationMode={cellNavigationMode}
        eventBus={eventBus}
        contextMenu={contextMenu}
        onHitBottomBoundary={onHitBottomCanvas}
        onHitTopBoundary={onHitTopCanvas}
        onHitLeftBoundary={handleHitColummBoundary}
        onHitRightBoundary={handleHitColummBoundary}
        scrollLeft={scrollLeft}
        scrollTop={scrollTop}
        getRowHeight={getRowHeight}
        getRowTop={getRowTop}
        getRowColumns={getRowColumns}
        editorPortalTarget={editorPortalTarget}
        {...interactionMasksMetaData}
      />
      <RowsContainer id={contextMenu ? contextMenu.props.id : 'rowsContainer'}>
        <div className="rdg-grid" style={{ width: columnMetrics.totalColumnWidth, height: rowOffsetHeight + rowsCount * rowHeight }}>
          <Header<R>
            rowKey={rowKey}
            rowsCount={rowsCount}
            rowGetter={rowGetter}
            columnMetrics={columnMetrics}
            onColumnResize={onColumnResize}
            headerRows={headerRows}
            rowOffsetHeight={rowOffsetHeight}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            draggableHeaderCell={draggableHeaderCell}
            onGridSort={onGridSort}
            onHeaderDrop={onHeaderDrop}
            allRowsSelected={selectedRows !== undefined && selectedRows.size === rowsCount}
            onSelectedRowsChange={onSelectedRowsChange}
            getValidFilterValues={getValidFilterValues}
            cellMetaData={cellMetaData}
          />
          {
            rowsCount === 0 && isValidElementType(emptyRowsView)
              ? <div className="react-grid-Empty">{createElement(emptyRowsView)}</div>
              : getRows()
          }
        </div>
      </RowsContainer>
    </div>
  );
}
