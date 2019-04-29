import React from 'react';
import { isValidElementType } from 'react-is';

import Header, { HeaderProps } from './Header';
import Viewport, { ViewportProps, ScrollState } from './Viewport';
import { isFrozen } from './ColumnUtils';
import { Column } from './common/types';
import { DEFINE_SORT } from './common/enums';

type SharedHeaderProps = Pick<HeaderProps,
'headerRows'
| 'onColumnResize'
| 'draggableHeaderCell'
| 'getValidFilterValues'
| 'sortDirection'
| 'sortColumn'
| 'onHeaderDrop'
| 'onSort'
>;


interface Props extends ViewportProps, SharedHeaderProps {
  columns: Column[];
  emptyRowsView?: React.ComponentType;
  scrollLeft?: number;
  onViewportKeydown(e: React.KeyboardEvent<HTMLDivElement>): void;
  onViewportKeyup(e: React.KeyboardEvent<HTMLDivElement>): void;
  onSort(columnKey: string, direction: DEFINE_SORT): void;
}

export default class Grid extends React.Component<Props> {
  static displayName = 'Grid';

  private readonly header = React.createRef<Header>();
  private readonly viewport = React.createRef<Viewport>();
  private _scrollLeft?: number = undefined;

  getStyle(): React.CSSProperties {
    return {
      overflow: 'hidden',
      outline: 0,
      position: 'relative',
      minHeight: this.props.minHeight
    };
  }

  _onScroll() {
    if (this._scrollLeft !== undefined) {
      this.header.current!.setScrollLeft(this._scrollLeft);
      if (this.viewport.current) {
        this.viewport.current.setScrollLeft(this._scrollLeft);
      }
    }
  }

  areFrozenColumnsScrolledLeft(scrollLeft: number) {
    return scrollLeft > 0 && this.props.columns.some(c => isFrozen(c));
  }

  onScroll = (scrollState: ScrollState) => {
    this.props.onScroll(scrollState);
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
      <div style={this.getStyle()} className="react-grid-Grid">
        <Header
          ref={this.header}
          columnMetrics={this.props.columnMetrics}
          onColumnResize={this.props.onColumnResize}
          height={this.props.rowHeight}
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
            <Viewport
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
