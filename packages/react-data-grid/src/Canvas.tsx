import React, { Fragment, useState, useRef, useEffect, useMemo } from 'react';
import { isElement } from 'react-is';

import Row from './Row';
import RowGroup from './RowGroup';
import { InteractionMasks } from './masks';
import { getColumnScrollPosition, isPositionStickySupported, getScrollbarSize } from './utils';
import { EventTypes, SCROLL_DIRECTION } from './common/enums';
import { CalculatedColumn, Position, ScrollState, SubRowDetails, RowRenderer, RowRendererProps, RowData } from './common/types';
import { GridProps } from './Grid';
import { getScrollDirection, getVerticalRangeToRender, getHorizontalRangeToRender } from './utils/viewportUtils';

type SharedGridProps<R> = Pick<GridProps<R>,
| 'rowKey'
| 'rowGetter'
| 'rowsCount'
| 'columnMetrics'
| 'selectedRows'
| 'onSelectedRowsChange'
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
| 'viewportWidth'
| 'overscanRowCount'
| 'overscanColumnCount'
| 'enableIsScrolling'
| 'onCanvasKeydown'
| 'onCanvasKeyup'
>;

export interface CanvasProps<R> extends SharedGridProps<R> {
  height: number;
  onScroll(position: ScrollState): void;
}

interface RendererProps<R> extends Pick<CanvasProps<R>, 'cellMetaData'> {
  ref(row: (RowRenderer<R> & React.Component<RowRendererProps<R>>) | null): void;
  key: number;
  idx: number;
  columns: CalculatedColumn<R>[];
  lastFrozenColumnIndex: number;
  row: R;
  subRowDetails?: SubRowDetails;
  height: number;
  isRowSelected: boolean;
  onRowSelectionChange(rowIdx: number, row: R, checked: boolean, isShiftClick: boolean): void;
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
  onScroll,
  onSelectedRowsChange,
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
  viewportWidth
}: CanvasProps<R>) {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(SCROLL_DIRECTION.NONE);
  const [isScrolling, setIsScrolling] = useState(false);
  const canvas = useRef<HTMLDivElement>(null);
  const interactionMasks = useRef<InteractionMasks<R>>(null);
  const resetScrollStateTimeoutId = useRef<number | null>(null);
  const lastSelectedRowIdx = useRef(-1);
  const [rows] = useState(() => new Map<number, RowRenderer<R> & React.Component<RowRendererProps<R>>>());

  const clientHeight = useMemo(() => {
    if (canvas.current) return canvas.current.clientHeight;
    const scrollbarSize = columnMetrics.totalColumnWidth > columnMetrics.viewportWidth ? getScrollbarSize() : 0;
    return height - scrollbarSize;
  }, [columnMetrics.totalColumnWidth, columnMetrics.viewportWidth, height]);

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
      viewportWidth,
      scrollDirection,
      overscanColumnCount
    });
  }, [columnMetrics, overscanColumnCount, scrollDirection, scrollLeft, viewportWidth]);

  useEffect(() => {
    return eventBus.subscribe(EventTypes.SCROLL_TO_COLUMN, idx => scrollToColumn(idx, columnMetrics.columns));
  }, [columnMetrics.columns, eventBus]);

  useEffect(() => {
    if (scrollToRowIndex) {
      scrollToRow(scrollToRowIndex);
    }
  }, [scrollToRowIndex]); // eslint-disable-line react-hooks/exhaustive-deps

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

  function onHitBottomCanvas({ rowIdx }: Position) {
    const { current } = canvas;
    if (current) {
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

  function scrollToRow(scrollToRowIndex: number) {
    const { current } = canvas;
    if (!current) return;
    current.scrollTop = Math.min(
      scrollToRowIndex * rowHeight,
      rowsCount * rowHeight - height
    );
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

    for (let idx = rowOverscanStartIdx; idx < rowOverscanEndIdx; idx++) {
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
      columns: columnMetrics.columns,
      isRowSelected: isRowSelected(row),
      onRowSelectionChange: handleRowSelectionChange,
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

  function handleRowSelectionChange(rowIdx: number, row: R, checked: boolean, isShiftClick: boolean) {
    if (!onSelectedRowsChange) return;

    const newSelectedRows = new Set(selectedRows);

    if (checked) {
      newSelectedRows.add(row[rowKey]);
      const previousRowIdx = lastSelectedRowIdx.current;
      lastSelectedRowIdx.current = rowIdx;
      if (isShiftClick && previousRowIdx !== -1 && previousRowIdx !== rowIdx) {
        const step = Math.sign(rowIdx - previousRowIdx);
        for (let i = previousRowIdx + step; i !== rowIdx; i += step) {
          newSelectedRows.add(rowGetter(i)[rowKey]);
        }
      }
    } else {
      newSelectedRows.delete(row[rowKey]);
      lastSelectedRowIdx.current = -1;
    }

    onSelectedRowsChange(newSelectedRows);
  }

  function setComponentsScrollLeft(scrollLeft: number) {
    if (isPositionStickySupported()) return;
    const { current } = interactionMasks;
    if (current) {
      current.setScrollLeft(scrollLeft);
    }

    rows.forEach((r, idx) => {
      const row = getRowByRef(idx);
      if (row && row.setScrollLeft) {
        row.setScrollLeft(scrollLeft);
      }
    });
  }

  function getRowByRef(i: number) {
    // check if wrapped with React DND drop target
    if (!rows.has(i)) return;

    const row = rows.get(i)!;
    const wrappedRow = row.getDecoratedComponentInstance ? row.getDecoratedComponentInstance(i) : null;
    return wrappedRow ? wrappedRow.row : row;
  }

  function getRowTop(rowIdx: number) {
    const row = getRowByRef(rowIdx);
    if (row && row.getRowTop) {
      return row.getRowTop();
    }
    return rowHeight * rowIdx;
  }

  function getRowHeight(rowIdx: number) {
    const row = getRowByRef(rowIdx);
    if (row && row.getRowHeight) {
      return row.getRowHeight();
    }
    return rowHeight;
  }

  function getRowColumns(rowIdx: number) {
    const row = getRowByRef(rowIdx);
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

  const paddingTop = rowOverscanStartIdx * rowHeight;
  const paddingBottom = (rowsCount - rowOverscanEndIdx) * rowHeight;

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
        <div className="rdg-rows-container" style={{ width: columnMetrics.totalColumnWidth, paddingTop, paddingBottom }}>
          {getRows()}
        </div>
      </RowsContainer>
    </div>
  );
}
