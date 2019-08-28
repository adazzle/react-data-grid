import React, { useRef, createElement } from 'react';
import { isValidElementType } from 'react-is';

import Header from './Header';
import Viewport, { ScrollState } from './Viewport';
import { HeaderRowData, CellMetaData, RowSelection, InteractionMasksMetaData, SelectedRow } from './common/types';
import { DEFINE_SORT } from './common/enums';
import { DataGridProps, DataGridState } from './ReactDataGrid';
import { EventBus } from './masks';

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
| 'useIsScrolling'
>;

type SharedDataGridState<R> = Pick<DataGridState<R>,
'columnMetrics'
| 'sortColumn'
| 'sortDirection'
>;

export interface GridProps<R> extends SharedDataGridProps<R>, SharedDataGridState<R> {
  headerRows: HeaderRowData<R>[];
  cellMetaData: CellMetaData<R>;
  selectedRows?: SelectedRow<R>[];
  rowSelection?: RowSelection;
  rowOffsetHeight: number;
  eventBus: EventBus;
  totalWidth: number | string;
  interactionMasksMetaData: InteractionMasksMetaData<R>;
  onSort(columnKey: keyof R, sortDirection: DEFINE_SORT): void;
  onViewportKeydown(e: React.KeyboardEvent<HTMLDivElement>): void;
  onViewportKeyup(e: React.KeyboardEvent<HTMLDivElement>): void;
  onColumnResize(idx: number, width: number): void;
}

export default function Grid<R>({ emptyRowsView, headerRows, ...props }: GridProps<R>) {
  const header = useRef<Header<R>>(null);

  function onScroll(scrollState: ScrollState) {
    header.current!.setScrollLeft(scrollState.scrollLeft);
    if (props.onScroll) {
      props.onScroll(scrollState);
    }
  }


  return (
    <div className="react-grid-Grid" style={{ minHeight: props.minHeight }}>
      <Header<R>
        ref={header}
        columnMetrics={props.columnMetrics}
        onColumnResize={props.onColumnResize}
        rowHeight={props.rowHeight}
        totalWidth={props.totalWidth}
        headerRows={headerRows}
        sortColumn={props.sortColumn}
        sortDirection={props.sortDirection}
        draggableHeaderCell={props.draggableHeaderCell}
        onSort={props.onSort}
        onHeaderDrop={props.onHeaderDrop}
        getValidFilterValues={props.getValidFilterValues}
        cellMetaData={props.cellMetaData}
      />
      {props.rowsCount === 0 && isValidElementType(emptyRowsView) ? (
        <div className="react-grid-Empty">
          {createElement(emptyRowsView)}
        </div>
      ) : (
        <div
          onKeyDown={props.onViewportKeydown}
          onKeyUp={props.onViewportKeyup}
        >
          <Viewport<R>
            rowKey={props.rowKey}
            rowHeight={props.rowHeight}
            rowRenderer={props.rowRenderer}
            rowGetter={props.rowGetter}
            rowsCount={props.rowsCount}
            selectedRows={props.selectedRows}
            columnMetrics={props.columnMetrics}
            totalWidth={props.totalWidth}
            onScroll={onScroll}
            cellMetaData={props.cellMetaData}
            rowOffsetHeight={props.rowOffsetHeight || props.rowHeight * headerRows.length}
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
            useIsScrolling={props.useIsScrolling}
          />
        </div>
      )}
    </div>
  );
}
