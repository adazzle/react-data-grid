import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { isElement } from 'react-is';

import { EventTypes, SCROLL_DIRECTION } from './common/enums';
import { CalculatedColumn, Position, RowData, RowRenderer, RowRendererProps, ScrollState, SubRowDetails } from './common/types';
import { GridProps } from './Grid';
import InteractionMasks from './masks/InteractionMasks';
import Row from './Row';
import RowGroup from './RowGroup';
import { getColumnScrollPosition, getScrollbarSize, isIEOrEdge, isPositionStickySupported } from './utils';
import { getHorizontalRangeToRender, getScrollDirection, getVerticalRangeToRender } from './utils/viewportUtils';

type SharedGridProps<R> = Pick<GridProps<R>,
| 'rowKey'
| 'rowGetter'
| 'rowsCount'
| 'columnMetrics'
| 'selectedRows'
| 'onRowSelectionChange'
| 'rowRenderer'
| 'cellMetaData'
| 'rowHeight'
| 'scrollToRowIndex'
| 'contextMenu'
| 'getSubRowDetails'
| 'rowGroupRenderer'
| 'enableCellSelect'
| 'enableCellAutoFocus'
| 'cellNavigationMode'
| 'eventBus'
| 'RowsContainer'
| 'editorPortalTarget'
| 'interactionMasksMetaData'
| 'overscanRowCount'
| 'overscanColumnCount'
| 'enableIsScrolling'
| 'onCanvasKeydown'
| 'onCanvasKeyup'
>;

export interface CanvasProps<R> extends SharedGridProps<R> {
  height: number;
  onScroll(position: ScrollState): void;
  summaryRows?: R[];
}

interface RendererProps<R> extends Pick<CanvasProps<R>, 'cellMetaData' | 'onRowSelectionChange'> {
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
  isSummaryRow?: boolean;
}

export default function Canvas<R>({
  cellMetaData,
  cellNavigationMode,
  columnMetrics,
  contextMenu,
  editorPortalTarget,
  enableCellAutoFocus,
  enableCellSelect,
  enableIsScrolling,
  eventBus,
  getSubRowDetails,
  height,
  interactionMasksMetaData,
  onCanvasKeydown,
  onCanvasKeyup,
  onRowSelectionChange,
  onScroll,
  overscanColumnCount,
  overscanRowCount,
  rowGetter,
  rowGroupRenderer,
  rowHeight,
  rowKey,
  rowRenderer,
  RowsContainer = Fragment,
  rowsCount,
  scrollToRowIndex,
  selectedRows,
  summaryRows
}: CanvasProps<R>) {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(SCROLL_DIRECTION.NONE);
  const [isScrolling, setIsScrolling] = useState(false);
  const canvas = useRef<HTMLDivElement>(null);
  const interactionMasks = useRef<InteractionMasks<R>>(null);
  const prevScrollToRowIndex = useRef<number | undefined>();
  const resetScrollStateTimeoutId = useRef<number | null>(null);
  const [rows] = useState(() => new Map<number, RowRenderer<R> & React.Component<RowRendererProps<R>>>());
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
    onScroll({ scrollLeft: newScrollLeft, scrollTop: newScrollTop, scrollDirection });
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
      const row = rowGetter(idx);
      rows.push(renderRow(row, idx));
    }

    return rows;
  }

  function getSummaryRows() {
    if (!summaryRows) {
      return [];
    }

    return summaryRows.map((row, idx) => renderSummaryRow(row, rowsCount + 1 + idx));
  }

  function renderSummaryRow(row: R, idx: number) {
    const rendererProps: RendererProps<R> = {
      key: idx,
      ref: getRowRef(row, idx),
      idx,
      row,
      height: rowHeight,
      columns: columnMetrics.columns,
      isRowSelected: false,
      onRowSelectionChange,
      cellMetaData,
      colOverscanStartIdx,
      colOverscanEndIdx,
      lastFrozenColumnIndex: columnMetrics.lastFrozenColumnIndex,
      isScrolling,
      scrollLeft,
      isSummaryRow: summaryRows && summaryRows.includes(row)
    };

    if (rowRenderer) {
      return renderCustomRowRenderer(rendererProps);
    }

    return <Row<R> {...rendererProps} />;
  }

  function renderRow(row: R, idx: number) {
    const rendererProps: RendererProps<R> = {
      key: idx,
      ref: getRowRef(row, idx),
      idx,
      row,
      height: rowHeight,
      columns: columnMetrics.columns,
      isRowSelected: isRowSelected(row),
      onRowSelectionChange,
      cellMetaData,
      subRowDetails: getSubRowDetails ? getSubRowDetails(row) : undefined,
      colOverscanStartIdx,
      colOverscanEndIdx,
      lastFrozenColumnIndex: columnMetrics.lastFrozenColumnIndex,
      isScrolling,
      scrollLeft,
      isSummaryRow: summaryRows && summaryRows.includes(row)
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

  function getRowRef(row: R, idx: number) {
    return (rowRef: RowRenderer<R> & React.Component<RowRendererProps<R>>) => {
      if (row) {
        rows.set(idx, rowRef);
      } else {
        rows.delete(idx);
      }
    };
  }

  function isRowSelected(row: R): boolean {
    return selectedRows !== undefined && selectedRows.has(row[rowKey]);
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
      return React.cloneElement(CustomRowRenderer, customRowRendererProps);
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

  const summaryRowsHeight = isIEOrEdge && summaryRows ? summaryRows.length * rowHeight : 0;
  const paddingTop = rowOverscanStartIdx * rowHeight;
  const paddingBottom = rowsCount - rowOverscanEndIdx > 0 ? (rowsCount - 1 - rowOverscanEndIdx) * rowHeight + summaryRowsHeight : summaryRowsHeight;
  const { totalColumnWidth: width } = columnMetrics;

  // Set minHeight to show horizontal scrollbar when there are no rows
  const scrollableRowsWrapperStyle: React.CSSProperties = { width, paddingTop, paddingBottom };
  const summaryRowsWrapperStyle: React.CSSProperties = { width };
  let ieStickyWrapperStyle: React.CSSProperties | undefined;

  if (isIEOrEdge) {
    summaryRowsWrapperStyle.position = 'absolute';
    summaryRowsWrapperStyle.bottom = 0;

    ieStickyWrapperStyle = {
      position: 'absolute',
      top: 0,
      height: height - 17, // IE scroll bar width
      transform: `translateY(${scrollTop}px)`
    };
  }

  return (
    <div
      className="react-grid-Canvas"
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
        <div className="rdg-rows-container" style={scrollableRowsWrapperStyle}>
          {getRows()}
        </div>
      </RowsContainer>
      {summaryRows && summaryRows.length && (
        <div className="rdg-bottom-pinned-rows-sticky-wrapper" style={ieStickyWrapperStyle}>
          <div className="rdg-bottom-pinned-rows" style={summaryRowsWrapperStyle}>
            {getSummaryRows()}
          </div>
        </div>
      )}
    </div>
  );
}
