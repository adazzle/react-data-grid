import React, { useRef, createElement } from 'react';
import { isValidElementType } from 'react-is';

import Header, { HeaderHandle, HeaderProps } from './Header';
import Viewport, { ScrollState } from './Viewport';
import { HeaderRowData, CellMetaData, InteractionMasksMetaData, ColumnMetrics } from './common/types';
import { DEFINE_SORT } from './common/enums';
import { ReactDataGridProps } from './ReactDataGrid';
import { EventBus } from './masks';

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
> & Required<Pick<ReactDataGridProps<R>,
| 'rowKey'
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
  rowOffsetHeight: number;
  eventBus: EventBus;
  interactionMasksMetaData: InteractionMasksMetaData<R>;
  onSort(columnKey: keyof R, sortDirection: DEFINE_SORT): void;
  onViewportKeydown(e: React.KeyboardEvent<HTMLDivElement>): void;
  onViewportKeyup(e: React.KeyboardEvent<HTMLDivElement>): void;
  onColumnResize(idx: number, width: number): void;
  allRowsSelected: boolean;
  onRowSelectionChange(rowIdx: number, row: R, checked: boolean, isShiftClick: boolean): void;
  onAllRowsSelectionChange(checked: boolean): void;
  viewportWidth: number;
}

export default function Grid<R>({ emptyRowsView, headerRows, viewportWidth, ...props }: GridProps<R>) {
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
          columnMetrics: props.columnMetrics,
          onColumnResize: props.onColumnResize,
          headerRows,
          rowOffsetHeight: props.rowOffsetHeight,
          sortColumn: props.sortColumn,
          sortDirection: props.sortDirection,
          draggableHeaderCell: props.draggableHeaderCell,
          onSort: props.onSort,
          onHeaderDrop: props.onHeaderDrop,
          allRowsSelected: props.allRowsSelected,
          onRowSelectionChange: props.onRowSelectionChange,
          onAllRowsSelectionChange: props.onAllRowsSelectionChange,
          getValidFilterValues: props.getValidFilterValues,
          cellMetaData: props.cellMetaData
        })
      }
      {props.rowsCount === 0 && isValidElementType(emptyRowsView) ? (
        <div className="react-grid-Empty">
          {createElement(emptyRowsView)}
        </div>
      ) : (
        <Viewport<R>
          rowKey={props.rowKey}
          rowHeight={props.rowHeight}
          rowRenderer={props.rowRenderer}
          rowGetter={props.rowGetter}
          rowsCount={props.rowsCount}
          selectedRows={props.selectedRows}
          columnMetrics={props.columnMetrics}
          onScroll={onScroll}
          cellMetaData={props.cellMetaData}
          rowOffsetHeight={props.rowOffsetHeight}
          minHeight={props.minHeight}
          scrollToRowIndex={props.scrollToRowIndex}
          contextMenu={props.contextMenu}
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
          onRowSelectionChange={props.onRowSelectionChange}
          onAllRowsSelectionChange={props.onAllRowsSelectionChange}
          onViewportKeydown={props.onViewportKeydown}
          onViewportKeyup={props.onViewportKeyup}
          viewportWidth={viewportWidth}
        />
      )}
    </div>
  );
}
