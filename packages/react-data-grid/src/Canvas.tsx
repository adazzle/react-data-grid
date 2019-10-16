import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';

import RowRenderer from './RowRenderer';
import InteractionMasks from './masks/InteractionMasks';
import Row from './Row';
import { getColumnScrollPosition, isPositionStickySupported, getScrollbarSize } from './utils';
import { EventTypes } from './common/enums';
import { CalculatedColumn, Position, ScrollPosition, ColumnMetrics, CellMetaData, InteractionMasksMetaData } from './common/types';
import { ReactDataGridProps } from './ReactDataGrid';
import EventBus from './EventBus';
import { getVerticalRangeToRender, getHorizontalRangeToRender } from './utils/viewportUtils';

type SharedDataGridProps<R, K extends keyof R> = Pick<ReactDataGridProps<R, K>,
| 'rowGetter'
| 'rowsCount'
| 'rowRenderer'
| 'rowGroupRenderer'
| 'scrollToRowIndex'
| 'contextMenu'
| 'RowsContainer'
| 'getSubRowDetails'
| 'selectedRows'
> & Required<Pick<ReactDataGridProps<R, K>,
| 'rowKey'
| 'enableCellSelect'
| 'rowHeight'
| 'cellNavigationMode'
| 'enableCellAutoFocus'
| 'editorPortalTarget'
| 'renderBatchSize'
>>;

export interface CanvasProps<R, K extends keyof R> extends SharedDataGridProps<R, K> {
  columnMetrics: ColumnMetrics<R>;
  cellMetaData: CellMetaData<R>;
  height: number;
  eventBus: EventBus;
  interactionMasksMetaData: InteractionMasksMetaData<R>;
  onScroll(position: ScrollPosition): void;
  onCanvasKeydown?(e: React.KeyboardEvent<HTMLDivElement>): void;
  onCanvasKeyup?(e: React.KeyboardEvent<HTMLDivElement>): void;
  onRowSelectionChange(rowIdx: number, row: R, checked: boolean, isShiftClick: boolean): void;
}

export default function Canvas<R, K extends keyof R>({
  cellMetaData,
  cellNavigationMode,
  columnMetrics,
  contextMenu,
  editorPortalTarget,
  enableCellAutoFocus,
  enableCellSelect,
  eventBus,
  getSubRowDetails,
  height,
  interactionMasksMetaData,
  onCanvasKeydown,
  onCanvasKeyup,
  onRowSelectionChange,
  onScroll,
  renderBatchSize,
  rowGetter,
  rowGroupRenderer,
  rowHeight,
  rowKey,
  rowRenderer,
  RowsContainer,
  rowsCount,
  scrollToRowIndex,
  selectedRows
}: CanvasProps<R, K>) {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const canvas = useRef<HTMLDivElement>(null);
  const prevScrollToRowIndex = useRef<number | undefined>();
  const [rowRefs] = useState(() => new Map<number, Row<R>>());
  const clientHeight = getClientHeight();

  const [rowOverscanStartIdx, rowOverscanEndIdx] = getVerticalRangeToRender(
    clientHeight,
    rowHeight,
    scrollTop,
    rowsCount,
    renderBatchSize
  );

  const { colOverscanStartIdx, colOverscanEndIdx, colVisibleStartIdx, colVisibleEndIdx } = useMemo(() => {
    return getHorizontalRangeToRender({
      columnMetrics,
      scrollLeft
    });
  }, [columnMetrics, scrollLeft]);

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
    setScrollLeft(newScrollLeft);
    setScrollTop(newScrollTop);
    onScroll({ scrollLeft: newScrollLeft, scrollTop: newScrollTop });
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

  const setRowRef = useCallback((row: Row<R> | null, idx: number) => {
    if (row === null) {
      rowRefs.delete(idx);
    } else {
      rowRefs.set(idx, row);
    }
  }, [rowRefs]);

  function getRows() {
    const left = isPositionStickySupported() ? undefined : scrollLeft;
    const rowElements = [];

    for (let idx = rowOverscanStartIdx; idx <= rowOverscanEndIdx; idx++) {
      const rowData = rowGetter(idx);
      rowElements.push(
        <RowRenderer<R, K>
          key={idx}
          idx={idx}
          rowData={rowData}
          setRowRef={setRowRef}
          cellMetaData={cellMetaData}
          colOverscanEndIdx={colOverscanEndIdx}
          colOverscanStartIdx={colOverscanStartIdx}
          columnMetrics={columnMetrics}
          eventBus={eventBus}
          getSubRowDetails={getSubRowDetails}
          onRowSelectionChange={onRowSelectionChange}
          rowGroupRenderer={rowGroupRenderer}
          rowHeight={rowHeight}
          rowKey={rowKey}
          rowRenderer={rowRenderer}
          scrollLeft={left}
          selectedRows={selectedRows}
        />
      );
    }

    return rowElements;
  }

  function getRowColumns(rowIdx: number) {
    const row = rowRefs.get(rowIdx);
    return row && row.props ? row.props.columns : columnMetrics.columns;
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
      {getRows()}
    </div>
  );

  if (RowsContainer !== undefined) {
    grid = <RowsContainer id={contextMenu ? contextMenu.props.id : 'rowsContainer'}>{grid}</RowsContainer>;
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
      <InteractionMasks<R, K>
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
        getRowColumns={getRowColumns}
        editorPortalTarget={editorPortalTarget}
        {...interactionMasksMetaData}
      />
      {grid}
    </div>
  );
}
