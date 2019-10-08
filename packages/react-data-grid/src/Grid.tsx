import React from 'react';
import { isValidElementType } from 'react-is';

import Header from './Header';
import Viewport, { ScrollState } from './Viewport';
import { isFrozen } from './ColumnUtils';
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
  onSort(columnKey: keyof R, sortDirection: DEFINE_SORT): void;
  totalWidth: number | string;
  onViewportKeydown(e: React.KeyboardEvent<HTMLDivElement>): void;
  onViewportKeyup(e: React.KeyboardEvent<HTMLDivElement>): void;
  onColumnResize(idx: number, width: number): void;
  eventBus: EventBus;
  interactionMasksMetaData: InteractionMasksMetaData<R>;
}

export default class Grid<R> extends React.Component<GridProps<R>> {
  static displayName = 'Grid';

  private readonly header = React.createRef<Header<R>>();
  private readonly viewport = React.createRef<Viewport<R>>();
  private _scrollLeft?: number = undefined;

  _onScroll() {
    if (this._scrollLeft !== undefined) {
      this.header.current!.setScrollLeft(this._scrollLeft);
      if (this.viewport.current) {
        this.viewport.current.setScrollLeft(this._scrollLeft);
      }
    }
  }

  areFrozenColumnsScrolledLeft(scrollLeft: number) {
    return scrollLeft > 0 && this.props.columnMetrics.columns.some(c => isFrozen(c));
  }

  onScroll = (scrollState: ScrollState) => {
    if (this.props.onScroll) {
      this.props.onScroll(scrollState);
    }
    const { scrollLeft } = scrollState;
    if (this._scrollLeft !== scrollLeft || this.areFrozenColumnsScrolledLeft(scrollLeft)) {
      this._scrollLeft = scrollLeft;
      this._onScroll();
    }
  };

  componentDidMount() {
    this._scrollLeft = this.viewport.current ? this.viewport.current.getScroll().scrollLeft : 0;
    this._onScroll();
  }

  componentDidUpdate() {
    this._onScroll();
  }

  render() {
    const { headerRows } = this.props;
    const EmptyRowsView = this.props.emptyRowsView;

    return (
      <div className="react-grid-Grid" style={{ minHeight: this.props.minHeight }}>
        <Header<R>
          ref={this.header}
          columnMetrics={this.props.columnMetrics}
          onColumnResize={this.props.onColumnResize}
          rowHeight={this.props.rowHeight}
          totalWidth={this.props.totalWidth}
          headerRows={headerRows}
          sortColumn={this.props.sortColumn}
          sortDirection={this.props.sortDirection}
          draggableHeaderCell={this.props.draggableHeaderCell}
          onSort={this.props.onSort}
          onHeaderDrop={this.props.onHeaderDrop}
          getValidFilterValues={this.props.getValidFilterValues}
          cellMetaData={this.props.cellMetaData}
        />
        {this.props.rowsCount === 0 && isValidElementType(EmptyRowsView) ? (
          <div className="react-grid-Empty">
            <EmptyRowsView />
          </div>
        ) : (
          <div
            onKeyDown={this.props.onViewportKeydown}
            onKeyUp={this.props.onViewportKeyup}
          >
            <Viewport<R>
              ref={this.viewport}
              rowKey={this.props.rowKey}
              rowHeight={this.props.rowHeight}
              rowRenderer={this.props.rowRenderer}
              rowGetter={this.props.rowGetter}
              rowsCount={this.props.rowsCount}
              selectedRows={this.props.selectedRows}
              columnMetrics={this.props.columnMetrics}
              totalWidth={this.props.totalWidth}
              onScroll={this.onScroll}
              cellMetaData={this.props.cellMetaData}
              rowOffsetHeight={this.props.rowOffsetHeight || this.props.rowHeight * headerRows.length}
              minHeight={this.props.minHeight}
              scrollToRowIndex={this.props.scrollToRowIndex}
              contextMenu={this.props.contextMenu}
              rowSelection={this.props.rowSelection}
              getSubRowDetails={this.props.getSubRowDetails}
              rowGroupRenderer={this.props.rowGroupRenderer}
              enableCellSelect={this.props.enableCellSelect}
              enableCellAutoFocus={this.props.enableCellAutoFocus}
              cellNavigationMode={this.props.cellNavigationMode}
              eventBus={this.props.eventBus}
              interactionMasksMetaData={this.props.interactionMasksMetaData}
              RowsContainer={this.props.RowsContainer}
              editorPortalTarget={this.props.editorPortalTarget}
            />
          </div>
        )}
      </div>
    );
  }
}
