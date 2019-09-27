import React, { createElement, useCallback, useEffect, useRef, useState } from 'react';
import { isValidElementType } from 'react-is';
import { DEFINE_SORT } from './common/enums';
import { CellMetaData, HeaderRowData, InteractionMasksMetaData, RowSelection, SelectedRow } from './common/types';
import Header from './Header';
import { EventBus } from './masks';
import { DataGridProps, DataGridState } from './ReactDataGrid';
import Viewport from './Viewport';

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
  const [scrollLeft, setScrollLeft] = useState<number>();

  useEffect(() => {
    // Delay rendering until width is initialized
    // Width is needed to calculate the number of displayed columns
    isWidthInitialized.current = true;
  }, []);

  const onBarScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft: newScrollLeft } = e.currentTarget;
    setScrollLeft(newScrollLeft);
  }, []);

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
            scrollLeft={scrollLeft || 0}
            setScrollLeft={setScrollLeft}
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
      <div style={{ width: '100%', height: 17, overflowX: 'auto' }} onScroll={onBarScroll}>
        <div style={{ width: props.columnMetrics.totalColumnWidth, height: 17 }}></div>
      </div>
    </div>
  );
}
