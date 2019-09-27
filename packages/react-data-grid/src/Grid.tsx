import React, { createElement, useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { isValidElementType } from 'react-is';
import { DEFINE_SORT, SCROLL_DIRECTION } from './common/enums';
import { CellMetaData, HeaderRowData, InteractionMasksMetaData, RowSelection, SelectedRow, ScrollPosition } from './common/types';
import Header from './Header';
import { EventBus } from './masks';
import { DataGridProps, DataGridState } from './ReactDataGrid';
import Viewport from './Viewport';
import { getScrollDirection, getVerticalRangeToRender, getHorizontalRangeToRender } from './utils/viewportUtils';

type SharedDataGridProps<R> = Pick<DataGridProps<R>,
'rowKey'
| 'draggableHeaderCell'
| 'getValidFilterValues'
| 'rowGetter'
| 'rowsCount'
| 'rowHeight'
| 'rowRenderer'
| 'rowGroupRenderer'
| 'minHeight'
| 'scrollToRowIndex'
| 'contextMenu'
| 'enableCellSelect'
| 'enableCellAutoFocus'
| 'cellNavigationMode'
| 'onScroll'
| 'RowsContainer'
| 'emptyRowsView'
| 'onHeaderDrop'
| 'getSubRowDetails'
| 'editorPortalTarget'
| 'overscanRowCount'
| 'overscanColumnCount'
| 'enableIsScrolling'
>;

type SharedDataGridState<R> = Pick<DataGridState<R>,
'columnMetrics'
| 'sortColumn'
| 'sortDirection'
>;

export interface GridProps<R> extends SharedDataGridProps<R>, SharedDataGridState<R> {
  headerRows: [HeaderRowData<R>, HeaderRowData<R> | undefined];
  cellMetaData: CellMetaData<R>;
  selectedRows?: SelectedRow<R>[];
  rowSelection?: RowSelection;
  rowOffsetHeight: number;
  eventBus: EventBus;
  interactionMasksMetaData: InteractionMasksMetaData<R>;
  onSort(columnKey: keyof R, sortDirection: DEFINE_SORT): void;
  onViewportKeydown(e: React.KeyboardEvent<HTMLDivElement>): void;
  onViewportKeyup(e: React.KeyboardEvent<HTMLDivElement>): void;
  onColumnResize(idx: number, width: number): void;
}

export default function Grid<R>({ emptyRowsView, headerRows, ...props }: GridProps<R>) {
  const isWidthInitialized = useRef(false);
  const grid = useRef<HTMLDivElement>(null);
  const header = useRef<Header<R>>(null);

  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  // const resetScrollStateTimeoutId = useRef<number | null>(null);
  const [scrollDirection, setScrollDirection] = useState(SCROLL_DIRECTION.NONE);
  // const [isScrolling, setIsScrolling] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // Delay rendering until width is initialized
    // Width is needed to calculate the number of displayed columns
    isWidthInitialized.current = true;
  }, []);

  // function resetScrollStateAfterDelayCallback() {
  //   resetScrollStateTimeoutId.current = null;
  //   setIsScrolling(false);
  // }

  // function clearScrollTimer() {
  //   if (resetScrollStateTimeoutId.current !== null) {
  //     window.clearTimeout(resetScrollStateTimeoutId.current);
  //     resetScrollStateTimeoutId.current = null;
  //   }
  // }

  // const resetScrollStateAfterDelay = useCallback(() => {
  //   clearScrollTimer();
  //   resetScrollStateTimeoutId.current = window.setTimeout(
  //     resetScrollStateAfterDelayCallback,
  //     150
  //   );
  // }, []);

  const onScroll = useCallback(({ scrollLeft: newScrollLeft, scrollTop: newScrollTop }: ScrollPosition) => {
    // if (props.enableIsScrolling) {
    //   setIsScrolling(true);
    //   resetScrollStateAfterDelay();
    // }

    const newScrollDirection = getScrollDirection({ scrollLeft, scrollTop }, { scrollLeft: newScrollLeft, scrollTop: newScrollTop });
    setScrollTop(newScrollTop);
    setScrollLeft(newScrollLeft);
    setScrollDirection(newScrollDirection);
  }, [scrollLeft, scrollTop]);

  const canvasHeight = props.minHeight - props.rowOffsetHeight;

  const verticalRangeToRender = useMemo(() => {
    return getVerticalRangeToRender({
      height: canvasHeight,
      rowHeight: props.rowHeight,
      scrollTop,
      rowsCount: props.rowsCount,
      scrollDirection,
      overscanRowCount: props.overscanRowCount
    });
  }, [canvasHeight, props.overscanRowCount, props.rowHeight, props.rowsCount, scrollDirection, scrollTop]);

  const horizontalRangeToRender = useMemo(() => {
    return getHorizontalRangeToRender({
      columnMetrics: props.columnMetrics,
      scrollLeft,
      viewportWidth: grid.current ? grid.current.offsetWidth : 0,
      scrollDirection,
      overscanColumnCount: props.overscanColumnCount
    });
  }, [props.columnMetrics, props.overscanColumnCount, scrollDirection, scrollLeft]);

  const onBarScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollTop } = e.currentTarget;
    onScroll({ scrollLeft, scrollTop });
  }, [onScroll]);

  const onVerticalScroll = useCallback(({ scrollTop }: ScrollPosition) => {
    onScroll({ scrollLeft, scrollTop });
  }, [onScroll, scrollLeft]);

  return (
    <div
      className="react-grid-Grid"
      ref={grid}
    >
      <Header<R>
        ref={header}
        columnMetrics={props.columnMetrics}
        onColumnResize={props.onColumnResize}
        headerRows={headerRows}
        rowOffsetHeight={props.rowOffsetHeight}
        sortColumn={props.sortColumn}
        sortDirection={props.sortDirection}
        draggableHeaderCell={props.draggableHeaderCell}
        onSort={props.onSort}
        onHeaderDrop={props.onHeaderDrop}
        getValidFilterValues={props.getValidFilterValues}
        cellMetaData={props.cellMetaData}
        scrollLeft={scrollLeft || 0}
      />
      {props.rowsCount === 0 && isValidElementType(emptyRowsView) ? (
        <div className="react-grid-Empty">
          {createElement(emptyRowsView)}
        </div>
      ) : (
        isWidthInitialized.current && (
          <Viewport<R>
            onVerticalScroll={onVerticalScroll}
            scrollTop={scrollTop}
            scrollLeft={scrollLeft}
            verticalRangeToRender={verticalRangeToRender}
            horizontalRangeToRender={horizontalRangeToRender}
            rowKey={props.rowKey}
            rowHeight={props.rowHeight}
            rowRenderer={props.rowRenderer}
            rowGetter={props.rowGetter}
            rowsCount={props.rowsCount}
            selectedRows={props.selectedRows}
            columnMetrics={props.columnMetrics}
            cellMetaData={props.cellMetaData}
            rowOffsetHeight={props.rowOffsetHeight}
            minHeight={props.minHeight}
            scrollToRowIndex={props.scrollToRowIndex}
            contextMenu={props.contextMenu}
            rowSelection={props.rowSelection}
            getSubRowDetails={props.getSubRowDetails}
            rowGroupRenderer={props.rowGroupRenderer}
            enableCellSelect={props.enableCellSelect}
            enableCellAutoFocus={props.enableCellAutoFocus}
            cellNavigationMode={props.cellNavigationMode}
            eventBus={props.eventBus}
            interactionMasksMetaData={props.interactionMasksMetaData}
            RowsContainer={props.RowsContainer}
            editorPortalTarget={props.editorPortalTarget}
            overscanRowCount={props.overscanRowCount}
            overscanColumnCount={props.overscanColumnCount}
            enableIsScrolling={props.enableIsScrolling}
            onViewportKeydown={props.onViewportKeydown}
            onViewportKeyup={props.onViewportKeyup}
            viewportWidth={grid.current ? grid.current.offsetWidth : 0}
          />
        )
      )}
      <div style={{ height: 35, background: '#ddd' }}>This is a super long gap area that works as a static footer to split the viewport and bottom stand alone scroll bar</div>
      <div style={{ width: '100%', height: 17, overflowX: 'auto' }} onScroll={onBarScroll}>
        <div style={{ width: props.columnMetrics.totalColumnWidth, height: 17 }} />
      </div>
    </div>
  );
}
