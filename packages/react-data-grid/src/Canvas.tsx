import React, { createElement, cloneElement, Fragment, useState, useRef, useEffect, useMemo } from 'react';
import { isElement, isValidElementType } from 'react-is';

import Header, { HeaderHandle, HeaderProps } from './Header';
import Row from './Row';
import RowGroup from './RowGroup';
import { InteractionMasks, EventBus } from './masks';
import { getColumnScrollPosition, isPositionStickySupported, getScrollbarSize } from './utils';
import { EventTypes, SCROLL_DIRECTION } from './common/enums';
import { CalculatedColumn, Position, SubRowDetails, RowRenderer, RowRendererProps, RowData, CellMetaData, ColumnMetrics, HeaderRowData, InteractionMasksMetaData } from './common/types';
import { ReactDataGridProps } from './ReactDataGrid';
import { getScrollDirection, getVerticalRangeToRender, getHorizontalRangeToRender } from './utils/viewportUtils';

type FullHeaderProps<R> = HeaderProps<R> & React.RefAttributes<HeaderHandle>;

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

interface RendererProps<R> extends Pick<CanvasProps<R>, 'cellMetaData' | 'rowOffsetHeight' | 'onRowSelectionChange'> {
  ref(row: (RowRenderer<R> & React.Component<RowRendererProps<R>>) | null): void;
  key: number;
  idx: number;
  columns: CalculatedColumn<R>[];
  lastFrozenColumnIndex: number;
  row: R;
  subRowDetails?: SubRowDetails;
  height: number;
  isRowSelected: boolean;
  scrollLeft: number;
  isScrolling: boolean;
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
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
  const header = useRef<HeaderHandle>(null);
  const interactionMasks = useRef<InteractionMasks<R>>(null);
  const prevScrollToRowIndex = useRef<number | undefined>();
  const resetScrollStateTimeoutId = useRef<number | null>(null);
  const [rows] = useState(() => new Map<number, RowRenderer<R> & React.Component<RowRendererProps<R>>>());
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
    // Freeze columns on legacy browsers
    setComponentsScrollLeft(newScrollLeft);

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

    // if (header.current) {
    //   header.current.setScrollLeft(newScrollLeft);
    // }
    if (onScroll) {
      onScroll({ scrollLeft: newScrollLeft, scrollTop: newScrollTop, scrollDirection });
    }
  }

  function setComponentsScrollLeft(scrollLeft: number) {
    if (isPositionStickySupported()) return;
    const { current } = interactionMasks;
    if (current) {
      current.setScrollLeft(scrollLeft);
    }

    rows.forEach(row => {
      if (row && row.setScrollLeft) {
        row.setScrollLeft(scrollLeft);
      }
    });
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
    const rows = [];

    for (let idx = rowOverscanStartIdx; idx <= rowOverscanEndIdx; idx++) {
      rows.push(renderRow(idx));
    }

    return rows;
  }

  function renderRow(idx: number) {
    const row = rowGetter(idx);
    const rendererProps: RendererProps<R> = {
      key: idx,
      ref(row) {
        if (row) {
          rows.set(idx, row);
        } else {
          rows.delete(idx);
        }
      },
      idx,
      row,
      height: rowHeight,
      rowOffsetHeight,
      columns: columnMetrics.columns,
      isRowSelected: isRowSelected(row),
      onRowSelectionChange,
      cellMetaData,
      subRowDetails: getSubRowDetails ? getSubRowDetails(row) : undefined,
      colOverscanStartIdx,
      colOverscanEndIdx,
      lastFrozenColumnIndex: columnMetrics.lastFrozenColumnIndex,
      isScrolling,
      scrollLeft
    };
    const { __metaData } = row as RowData;

    if (__metaData) {
      if (__metaData.getRowRenderer) {
        return __metaData.getRowRenderer(rendererProps, idx);
      }
      if (__metaData.isGroup) {
        return renderGroupRow(rendererProps);
      }
    }

    if (rowRenderer) {
      return renderCustomRowRenderer(rendererProps);
    }

    return <Row<R> {...rendererProps} />;
  }

  function isRowSelected(row: R): boolean {
    return selectedRows !== undefined && selectedRows.has(row[rowKey]);
  }

  function getRowTop(rowIdx: number) {
    const row = rows.get(rowIdx);
    if (row && row.getRowTop) {
      return row.getRowTop();
    }
    return rowHeight * rowIdx;
  }

  function getRowHeight(rowIdx: number) {
    const row = rows.get(rowIdx);
    if (row && row.getRowHeight) {
      return row.getRowHeight();
    }
    return rowHeight;
  }

  function getRowColumns(rowIdx: number) {
    const row = rows.get(rowIdx);
    return row && row.props ? row.props.columns : columnMetrics.columns;
  }

  function renderCustomRowRenderer(rowProps: RendererProps<R>) {
    const { ref, ...otherProps } = rowProps;
    const CustomRowRenderer = rowRenderer!;
    const customRowRendererProps = { ...otherProps, renderBaseRow: (p: RowRendererProps<R>) => <Row ref={ref} {...p} /> };

    if (isElement(CustomRowRenderer)) {
      if (CustomRowRenderer.type === Row) {
        // In the case where Row is specified as the custom render, ensure the correct ref is passed
        return <Row<R> {...rowProps} />;
      }
      return cloneElement(CustomRowRenderer, customRowRendererProps);
    }

    return <CustomRowRenderer {...customRowRendererProps} />;
  }

  function renderGroupRow(groupRowProps: RendererProps<R>) {
    const { ref, columns, ...rowGroupProps } = groupRowProps;
    const row = groupRowProps.row as RowData;

    return (
      <RowGroup
        {...rowGroupProps}
        {...row.__metaData!}
        columns={columns as CalculatedColumn<unknown>[]}
        name={row.name!}
        eventBus={eventBus}
        renderer={rowGroupRenderer}
        renderBaseRow={(p: RowRendererProps<R>) => <Row ref={ref} {...p} />}
      />
    );
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
        ref={interactionMasks}
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
          {
            createElement<FullHeaderProps<R>>(Header as React.FunctionComponent<FullHeaderProps<R>>, {
              rowKey,
              rowsCount,
              ref: header,
              rowGetter,
              columnMetrics,
              onColumnResize,
              headerRows,
              rowOffsetHeight,
              sortColumn,
              sortDirection,
              draggableHeaderCell,
              onGridSort,
              onHeaderDrop,
              allRowsSelected: selectedRows !== undefined && selectedRows.size === rowsCount,
              onSelectedRowsChange,
              getValidFilterValues,
              cellMetaData
            })
          }
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
