import React, { useRef, createElement } from 'react';
import { isValidElementType } from 'react-is';

import Header, { HeaderHandle, HeaderProps } from './Header';
import Canvas from './Canvas';
import { HeaderRowData, CellMetaData, InteractionMasksMetaData, ColumnMetrics, ScrollState } from './common/types';
import { DEFINE_SORT } from './common/enums';
import { ReactDataGridProps } from './ReactDataGrid';
import EventBus from './EventBus';

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
| 'selectedRows'
| 'onSelectedRowsChange'
| 'sortColumn'
| 'sortDirection'
> & Required<Pick<ReactDataGridProps<R>,
| 'rowKey'
| 'enableCellSelect'
| 'rowHeight'
| 'minHeight'
| 'cellNavigationMode'
| 'enableCellAutoFocus'
| 'editorPortalTarget'
>>;

export interface GridProps<R> extends SharedDataGridProps<R> {
  columnMetrics: ColumnMetrics<R>;
  headerRows: [HeaderRowData<R>, HeaderRowData<R> | undefined];
  cellMetaData: CellMetaData<R>;
  rowOffsetHeight: number;
  eventBus: EventBus;
  interactionMasksMetaData: InteractionMasksMetaData<R>;
  onSort?(columnKey: keyof R, direction: DEFINE_SORT): void;
  onCanvasKeydown?(e: React.KeyboardEvent<HTMLDivElement>): void;
  onCanvasKeyup?(e: React.KeyboardEvent<HTMLDivElement>): void;
  onColumnResize(idx: number, width: number): void;
  onRowSelectionChange(rowIdx: number, row: R, checked: boolean, isShiftClick: boolean): void;
}

export default function Grid<R>({
  rowGetter,
  rowKey,
  rowOffsetHeight,
  rowsCount,
  columnMetrics,
  emptyRowsView,
  headerRows,
  selectedRows,
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
          rowKey,
          rowsCount,
          ref: header,
          rowGetter,
          columnMetrics,
          onColumnResize: props.onColumnResize,
          headerRows,
          rowOffsetHeight,
          sortColumn: props.sortColumn,
          sortDirection: props.sortDirection,
          draggableHeaderCell: props.draggableHeaderCell,
          onSort: props.onSort,
          onHeaderDrop: props.onHeaderDrop,
          allRowsSelected: selectedRows !== undefined && selectedRows.size === rowsCount,
          onSelectedRowsChange: props.onSelectedRowsChange,
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
          rowKey={rowKey}
          rowHeight={props.rowHeight}
          rowRenderer={props.rowRenderer}
          rowGetter={rowGetter}
          rowsCount={rowsCount}
          selectedRows={selectedRows}
          onRowSelectionChange={props.onRowSelectionChange}
          columnMetrics={columnMetrics}
          onScroll={onScroll}
          cellMetaData={props.cellMetaData}
          height={props.minHeight - rowOffsetHeight}
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
          onCanvasKeydown={props.onCanvasKeydown}
          onCanvasKeyup={props.onCanvasKeyup}
        />
      )}
    </div>
  );
}
