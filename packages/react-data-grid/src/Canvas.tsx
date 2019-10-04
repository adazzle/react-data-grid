import React, { useState, useRef, useEffect, useMemo } from 'react';
import { isElement } from 'react-is';

import Row from './Row';
import RowsContainerDefault from './RowsContainer';
import RowGroup from './RowGroup';
import { InteractionMasks } from './masks';
import * as rowUtils from './RowUtils';
import { getColumnScrollPosition, isPositionStickySupported } from './utils';
import { EventTypes, SCROLL_DIRECTION } from './common/enums';
import { CalculatedColumn, Position, ScrollState, SubRowDetails, RowRenderer, RowRendererProps, RowData } from './common/types';
import { GridProps } from './Grid';
import { getScrollDirection, getVerticalRangeToRender, getHorizontalRangeToRender } from './utils/viewportUtils';

type SharedGridProps<R> = Pick<GridProps<R>,
| 'rowKey'
| 'rowGetter'
| 'rowsCount'
| 'selectedRows'
| 'columnMetrics'
| 'rowRenderer'
| 'cellMetaData'
| 'rowHeight'
| 'scrollToRowIndex'
| 'contextMenu'
| 'rowSelection'
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
| 'onViewportKeydown'
| 'onViewportKeyup'
>;

export interface CanvasProps<R> extends SharedGridProps<R> {
  columns: CalculatedColumn<R>[];
  height: number;
  width: number;
  lastFrozenColumnIndex: number;
  onScroll(position: ScrollState): void;
}

type RendererProps<R> = Pick<CanvasProps<R>, 'columns' | 'cellMetaData' | 'lastFrozenColumnIndex'> & {
  ref(row: (RowRenderer<R> & React.Component<RowRendererProps<R>>) | null): void;
  key: number;
  idx: number;
  row: R;
  subRowDetails?: SubRowDetails;
  height: number;
  isSelected: boolean;
  scrollLeft: number;
  isScrolling: boolean;
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
};

export default function Canvas<R>({
  cellMetaData,
  cellNavigationMode,
  columnMetrics,
  columns,
  contextMenu,
  editorPortalTarget,
  enableCellAutoFocus,
  enableCellSelect,
  enableIsScrolling,
  eventBus,
  getSubRowDetails,
  height,
  interactionMasksMetaData,
  lastFrozenColumnIndex,
  onScroll,
  onViewportKeydown,
  onViewportKeyup,
  overscanColumnCount,
  overscanRowCount,
  rowGetter,
  rowGroupRenderer,
  rowHeight,
  rowKey,
  rowRenderer,
  RowsContainer = RowsContainerDefault,
  rowsCount,
  rowSelection,
  scrollToRowIndex,
  selectedRows,
  viewportWidth,
  width
}: CanvasProps<R>) {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(SCROLL_DIRECTION.NONE);
  const [isScrolling, setIsScrolling] = useState(false);
  const canvas = useRef<HTMLDivElement>(null);
  const interactionMasks = useRef<InteractionMasks<R>>(null);
  const resetScrollStateTimeoutId = useRef<number | null>(null);
  const [rows] = useState(() => new Map<number, RowRenderer<R> & React.Component<RowRendererProps<R>>>());

  const { rowOverscanStartIdx, rowOverscanEndIdx, rowVisibleStartIdx, rowVisibleEndIdx } = useMemo(() => {
    return getVerticalRangeToRender({
      height,
      rowHeight,
      scrollTop,
      rowsCount,
      scrollDirection,
      overscanRowCount
    });
  }, [height, overscanRowCount, rowHeight, rowsCount, scrollDirection, scrollTop]);

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
    return eventBus.subscribe(EventTypes.SCROLL_TO_COLUMN, idx => scrollToColumn(idx, columns));
  }, [eventBus, columns]);

  useEffect(() => {
    if (scrollToRowIndex) {
      scrollToRow(scrollToRowIndex);
    }
  }, [scrollToRowIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const { scrollLeft: newScrollLeft, scrollTop: newScrollTop } = e.currentTarget;
    // Freeze columns on legacy browsers
    setComponentsScrollLeft(scrollLeft);

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
    onScroll({ scrollLeft, scrollTop, scrollDirection });
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

  function onHitBottomCanvas() {
    const { current } = canvas;
    if (current) {
      current.scrollTop += rowHeight + getClientScrollTopOffset(current);
    }
  }

  function onHitTopCanvas() {
    const { current } = canvas;
    if (current) {
      current.scrollTop -= rowHeight - getClientScrollTopOffset(current);
    }
  }

  function handleHitColummBoundary({ idx }: Position) {
    scrollToColumn(idx, columns);
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

  // TODO: remove map so we only do 1 loop
  function getRows(rowOverscanStartIdx: number, rowOverscanEndIdx: number) {
    const rowsDivs = [];
    let i = rowOverscanStartIdx;
    while (i < rowOverscanEndIdx) {
      const row = rowGetter(i);
      let subRowDetails: SubRowDetails | undefined;
      if (getSubRowDetails) {
        subRowDetails = getSubRowDetails(row);
      }
      rowsDivs.push({ row, subRowDetails });
      i++;
    }
    return rowsDivs.map(({ row, subRowDetails }, idx) => {
      const rowIdx = rowOverscanStartIdx + idx;
      return row && renderRow({
        key: rowIdx,
        ref(row: (RowRenderer<R> & React.Component<RowRendererProps<R>>) | null) {
          if (row) {
            rows.set(rowIdx, row);
          } else {
            rows.delete(rowIdx);
          }
        },
        idx: rowIdx,
        row,
        height: rowHeight,
        columns,
        isSelected: isRowSelected(rowIdx, row),
        cellMetaData,
        subRowDetails,
        colOverscanStartIdx,
        colOverscanEndIdx,
        lastFrozenColumnIndex,
        isScrolling,
        scrollLeft
      });
    });
  }

  function getClientScrollTopOffset(node: HTMLDivElement) {
    const scrollVariation = node.scrollTop % rowHeight;
    return scrollVariation > 0 ? rowHeight - scrollVariation : 0;
  }

  function isRowSelected(idx: number, row: R) {
    // Use selectedRows if set
    if (selectedRows) {
      const selectedRow = selectedRows.find(r => {
        const rowKeyValue = rowUtils.get(row, rowKey);
        return r[rowKey] === rowKeyValue;
      });
      return !!(selectedRow && selectedRow.isSelected);
    }

    // Else use new rowSelection props
    if (rowSelection) {
      const { keys, indexes, isSelectedKey } = rowSelection as { [key: string]: unknown };
      return rowUtils.isRowSelected(keys as { rowKey?: string; values?: string[] } | null, indexes as number[] | null, isSelectedKey as string | null, row, idx);
    }

    return false;
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
    return row && row.props ? row.props.columns : columns;
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

  function renderRow(rendererProps: RendererProps<R>) {
    const row = rendererProps.row as RowData;

    if (row.__metaData && row.__metaData.getRowRenderer) {
      return row.__metaData.getRowRenderer({}, rendererProps.idx);
    }
    if (row.__metaData && row.__metaData.isGroup) {
      return renderGroupRow(rendererProps);
    }

    if (rowRenderer) {
      return renderCustomRowRenderer(rendererProps);
    }

    return <Row<R> {...rendererProps} />;
  }

  const paddingTop = rowOverscanStartIdx * rowHeight;
  const paddingBottom = (rowsCount - rowOverscanEndIdx) * rowHeight;

  return (
    <div
      className="react-grid-Canvas"
      style={{ height }}
      ref={canvas}
      onScroll={handleScroll}
      onKeyDown={onViewportKeydown}
      onKeyUp={onViewportKeyup}
    >
      <InteractionMasks<R>
        ref={interactionMasks}
        rowGetter={rowGetter}
        rowsCount={rowsCount}
        rowHeight={rowHeight}
        columns={columns}
        rowVisibleStartIdx={rowVisibleStartIdx}
        rowVisibleEndIdx={rowVisibleEndIdx}
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
        {/* Set minHeight to show horizontal scrollbar when there are no rows */}
        <div style={{ width, paddingTop, paddingBottom, minHeight: 1 }}>
          {getRows(rowOverscanStartIdx, rowOverscanEndIdx)}
        </div>
      </RowsContainer>
    </div>
  );
}
