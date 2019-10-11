import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { isElement } from 'react-is';

import { EventTypes } from './common/enums';
import { CalculatedColumn, CellMetaData, ColumnMetrics, InteractionMasksMetaData, Position, RowData, RowRenderer, RowRendererProps, ScrollPosition, SubRowDetails } from './common/types';
import EventBus from './EventBus';
import InteractionMasks from './masks/InteractionMasks';
import { ReactDataGridProps } from './ReactDataGrid';
import Row from './Row';
import RowGroup from './RowGroup';
import { getColumnScrollPosition, getScrollbarSize, isIEOrEdge, isPositionStickySupported } from './utils';
import { getHorizontalRangeToRender, getVerticalRangeToRender } from './utils/viewportUtils';

type SharedDataGridProps<R> = Pick<ReactDataGridProps<R>,
| 'rowGetter'
| 'rowsCount'
| 'rowRenderer'
| 'rowGroupRenderer'
| 'scrollToRowIndex'
| 'contextMenu'
| 'RowsContainer'
| 'getSubRowDetails'
| 'selectedRows'
> & Required<Pick<ReactDataGridProps<R>,
| 'rowKey'
| 'enableCellSelect'
| 'rowHeight'
| 'cellNavigationMode'
| 'enableCellAutoFocus'
| 'editorPortalTarget'
| 'renderBatchSize'
>>;

export interface CanvasProps<R> extends SharedDataGridProps<R> {
  columnMetrics: ColumnMetrics<R>;
  cellMetaData: CellMetaData<R>;
  height: number;
  eventBus: EventBus;
  interactionMasksMetaData: InteractionMasksMetaData<R>;
  onScroll(position: ScrollPosition): void;
  summaryRows?: R[];
  onCanvasKeydown?(e: React.KeyboardEvent<HTMLDivElement>): void;
  onCanvasKeyup?(e: React.KeyboardEvent<HTMLDivElement>): void;
  onRowSelectionChange(rowIdx: number, row: R, checked: boolean, isShiftClick: boolean): void;
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
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
  isSummaryRow: boolean;
}

export default function Canvas<R>({
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
  RowsContainer = Fragment,
  rowsCount,
  scrollToRowIndex,
  selectedRows,
  summaryRows
}: CanvasProps<R>) {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const canvas = useRef<HTMLDivElement>(null);
  const interactionMasks = useRef<InteractionMasks<R>>(null);
  const prevScrollToRowIndex = useRef<number | undefined>();
  // https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
  // The reason that we didn't choose to use useRef was due to the lazy initialization was only supported by useState() at the moment.
  const [rowRefs] = useState(() => new Map<number, RowRenderer<R> & React.Component<RowRendererProps<R>>>());
  const [summaryRowRefs] = useState(() => new Map<number, RowRenderer<R> & React.Component<RowRendererProps<R>>>());
  const clientHeight = getClientHeight();

  const { rowOverscanStartIdx, rowOverscanEndIdx } = useMemo(() => {
    return getVerticalRangeToRender({
      height: clientHeight,
      rowHeight,
      scrollTop,
      rowsCount,
      renderBatchSize
    });
  }, [clientHeight, renderBatchSize, rowHeight, rowsCount, scrollTop]);

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
    // Freeze columns on legacy browsers
    setComponentsScrollLeft(newScrollLeft);

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

  function getRows() {
    const rows = [];

    for (let idx = rowOverscanStartIdx; idx <= rowOverscanEndIdx; idx++) {
      const row = rowGetter(idx);
      rows.push(renderRow(row, idx));
    }

    return rows;
  }

  function getBaseRendererProps(row: R, idx: number): Omit<RendererProps<R>, 'ref'> {
    const { columns, lastFrozenColumnIndex } = columnMetrics;
    return {
      key: idx,
      idx,
      row,
      height: rowHeight,
      columns,
      isRowSelected: false,
      onRowSelectionChange,
      cellMetaData,
      colOverscanStartIdx,
      colOverscanEndIdx,
      lastFrozenColumnIndex,
      scrollLeft,
      isSummaryRow: false
    };
  }

  function renderSummaryRow(row: R, idx: number) {
    const rendererProps: RendererProps<R> = {
      ...getBaseRendererProps(row, idx),
      ref(rowRef) {
        if (rowRef) {
          summaryRowRefs.set(idx, rowRef);
        } else {
          summaryRowRefs.delete(idx);
        }
      },
      isSummaryRow: true
    };

    if (rowRenderer) {
      return renderCustomRowRenderer(rendererProps);
    }

    return <Row<R> {...rendererProps} />;
  }

  function renderRow(row: R, idx: number) {
    const rendererProps: RendererProps<R> = {
      ...getBaseRendererProps(row, idx),
      ref(rowRef) {
        if (rowRef) {
          rowRefs.set(idx, rowRef);
        } else {
          rowRefs.delete(idx);
        }
      },
      isRowSelected: isRowSelected(row),
      subRowDetails: getSubRowDetails ? getSubRowDetails(row) : undefined
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

  function setComponentsScrollLeft(scrollLeft: number) {
    if (isPositionStickySupported()) return;

    const { current } = interactionMasks;
    if (current) {
      current.setScrollLeft(scrollLeft);
    }

    rowRefs.forEach(setRowScrollLeft);
    summaryRowRefs.forEach(setRowScrollLeft);
  }

  function setRowScrollLeft(row: RowRenderer<R> & React.Component<RowRendererProps<R>>) {
    if (row.setScrollLeft) {
      row.setScrollLeft(scrollLeft);
    }
  }

  function getRowTop(rowIdx: number) {
    const row = rowRefs.get(rowIdx);
    if (row && row.getRowTop) {
      return row.getRowTop();
    }
    return rowHeight * rowIdx;
  }

  function getRowHeight(rowIdx: number) {
    const row = rowRefs.get(rowIdx);
    if (row && row.getRowHeight) {
      return row.getRowHeight();
    }
    return rowHeight;
  }

  function getRowColumns(rowIdx: number) {
    const row = rowRefs.get(rowIdx);
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
      height: height - getScrollbarSize(),
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
        <div className="rdg-summary-rows-sticky-wrapper" style={ieStickyWrapperStyle}>
          <div className="rdg-summary-rows" style={summaryRowsWrapperStyle}>
            {summaryRows.map(renderSummaryRow)}
          </div>
        </div>
      )}
    </div>
  );
}
