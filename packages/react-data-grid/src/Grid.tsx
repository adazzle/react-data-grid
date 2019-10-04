import React, { useRef, createElement } from 'react';
import { isValidElementType } from 'react-is';

import Header, { HeaderHandle, HeaderProps } from './Header';
import Canvas from './Canvas';
import { HeaderRowData, CellMetaData, RowSelection, InteractionMasksMetaData, SelectedRow, ColumnMetrics, ScrollState } from './common/types';
import { DEFINE_SORT } from './common/enums';
import { ReactDataGridProps } from './ReactDataGrid';
import { EventBus } from './masks';

type SharedDataGridProps<R> = Pick<ReactDataGridProps<R>,
'draggableHeaderCell'
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
> & Required<Pick<ReactDataGridProps<R>,
'rowKey'
| 'enableCellSelect'
| 'rowHeight'
| 'minHeight'
| 'cellNavigationMode'
| 'enableCellAutoFocus'
| 'editorPortalTarget'
>> & {
  sortColumn?: keyof R;
  sortDirection?: DEFINE_SORT;
  columnMetrics: ColumnMetrics<R>;
};

export interface GridProps<R> extends SharedDataGridProps<R> {
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
  viewportWidth: number;
}

export default function Grid<R>({
  columnMetrics,
  emptyRowsView,
  headerRows,
  rowOffsetHeight,
  rowsCount,
  viewportWidth,
  ...props
}: GridProps<R>) {
  const header = useRef<HeaderHandle>(null);
  const scrollLeft = useRef(0);

  function onScroll(scrollState: ScrollState) {
    if (header.current && scrollLeft.current !== scrollState.scrollLeft) {
      scrollLeft.current = scrollState.scrollLeft;
      header.current.setScrollLeft(scrollState.scrollLeft);
    }
    if (props.onScroll) {
      props.onScroll(scrollState);
    }
  }

  type FullHeaderProps = HeaderProps<R> & React.RefAttributes<HeaderHandle>;

  return (
    <div className="react-grid-Grid">
      {
        React.createElement<FullHeaderProps>(Header as React.FunctionComponent<FullHeaderProps>, {
          ref: header,
          columnMetrics,
          onColumnResize: props.onColumnResize,
          headerRows,
          rowOffsetHeight,
          sortColumn: props.sortColumn,
          sortDirection: props.sortDirection,
          draggableHeaderCell: props.draggableHeaderCell,
          onSort: props.onSort,
          onHeaderDrop: props.onHeaderDrop,
          getValidFilterValues: props.getValidFilterValues,
          cellMetaData: props.cellMetaData
        })
      }
      {rowsCount === 0 && isValidElementType(emptyRowsView) ? (
        <div className="react-grid-Empty">
          {createElement(emptyRowsView)}
        </div>
      ) : (
        <Canvas<R>
          rowKey={props.rowKey}
          columnMetrics={columnMetrics}
          viewportWidth={viewportWidth}
          width={columnMetrics.totalColumnWidth}
          columns={columnMetrics.columns}
          lastFrozenColumnIndex={columnMetrics.lastFrozenColumnIndex}
          rowGetter={props.rowGetter}
          rowsCount={rowsCount}
          selectedRows={props.selectedRows}
          rowRenderer={props.rowRenderer}
          enableIsScrolling={props.enableIsScrolling}
          cellMetaData={props.cellMetaData}
          height={props.minHeight - rowOffsetHeight}
          rowHeight={props.rowHeight}
          onScroll={onScroll}
          scrollToRowIndex={props.scrollToRowIndex}
          contextMenu={props.contextMenu}
          rowSelection={props.rowSelection}
          getSubRowDetails={props.getSubRowDetails}
          rowGroupRenderer={props.rowGroupRenderer}
          enableCellSelect={props.enableCellSelect}
          enableCellAutoFocus={props.enableCellAutoFocus}
          cellNavigationMode={props.cellNavigationMode}
          eventBus={props.eventBus}
          RowsContainer={props.RowsContainer}
          editorPortalTarget={props.editorPortalTarget}
          interactionMasksMetaData={props.interactionMasksMetaData}
          onViewportKeydown={props.onViewportKeydown}
          onViewportKeyup={props.onViewportKeyup}
        />
      )}
    </div>
  );
}
