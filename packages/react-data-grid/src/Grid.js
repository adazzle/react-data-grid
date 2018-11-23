import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Viewport from './Viewport';
import cellMetaDataShape from 'common/prop-shapes/CellMetaDataShape';
import {isFrozen} from './ColumnUtils';
require('../../../themes/react-data-grid-core.css');

class Grid extends React.Component {
  static displayName = 'Grid';

  static propTypes = {
    rowGetter: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
    columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    columnMetrics: PropTypes.object,
    minHeight: PropTypes.number,
    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    headerRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    rowHeight: PropTypes.number,
    rowRenderer: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    emptyRowsView: PropTypes.func,
    expandedRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    selectedRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    rowSelection: PropTypes.oneOfType([
      PropTypes.shape({
        indexes: PropTypes.arrayOf(PropTypes.number).isRequired
      }),
      PropTypes.shape({
        isSelectedKey: PropTypes.string.isRequired
      }),
      PropTypes.shape({
        keys: PropTypes.shape({
          values: PropTypes.array.isRequired,
          rowKey: PropTypes.string.isRequired
        }).isRequired
      })
    ]),
    rowsCount: PropTypes.number,
    onRows: PropTypes.func,
    sortColumn: PropTypes.string,
    cellMetaData: PropTypes.shape(cellMetaDataShape).isRequired,
    sortDirection: PropTypes.oneOf(['ASC', 'DESC', 'NONE']),
    rowOffsetHeight: PropTypes.number.isRequired,
    onViewportKeydown: PropTypes.func.isRequired,
    onViewportKeyup: PropTypes.func,
    onColumnResize: PropTypes.func,
    onSort: PropTypes.func,
    onHeaderDrop: PropTypes.func,
    rowKey: PropTypes.string.isRequired,
    rowScrollTimeout: PropTypes.number,
    scrollToRowIndex: PropTypes.number,
    contextMenu: PropTypes.element,
    getSubRowDetails: PropTypes.func,
    draggableHeaderCell: PropTypes.func,
    getValidFilterValues: PropTypes.func,
    rowGroupRenderer: PropTypes.func,
    overScan: PropTypes.object,
    enableCellSelect: PropTypes.bool.isRequired,
    enableCellAutoFocus: PropTypes.bool.isRequired,
    cellNavigationMode: PropTypes.string.isRequired,
    eventBus: PropTypes.object.isRequired,
    onCheckCellIsEditable: PropTypes.func,
    onCellCopyPaste: PropTypes.func,
    onGridRowsUpdated: PropTypes.func.isRequired,
    onDragHandleDoubleClick: PropTypes.func.isRequired,
    onCellSelected: PropTypes.func,
    onCellDeSelected: PropTypes.func,
    onCellRangeSelectionStarted: PropTypes.func,
    onCellRangeSelectionUpdated: PropTypes.func,
    onCellRangeSelectionCompleted: PropTypes.func,
    onCommit: PropTypes.func.isRequired,
    onScroll: PropTypes.func,
    scrollLeft: PropTypes.number,
    RowsContainer: PropTypes.node
  };

  static defaultProps = {
    rowHeight: 35,
    minHeight: 350
  };

  _scrollLeft = undefined;

  getStyle = () => {
    return {
      overflow: 'hidden',
      outline: 0,
      position: 'relative',
      minHeight: this.props.minHeight
    };
  };

  _onScroll = () => {
    if (this._scrollLeft !== undefined) {
      this.header.setScrollLeft(this._scrollLeft);
      if (this.viewport) {
        this.viewport.setScrollLeft(this._scrollLeft);
      }
    }
  };

  areFrozenColumnsScrolledLeft(scrollLeft) {
    return scrollLeft > 0 && this.props.columns.some(c => isFrozen(c));
  }

  onScroll = (scrollState) => {
    this.props.onScroll(scrollState);
    const {scrollLeft} = scrollState;
    if (this._scrollLeft !== scrollLeft || this.areFrozenColumnsScrolledLeft(scrollLeft)) {
      this._scrollLeft = scrollLeft;
      this._onScroll();
    }
  };

  componentDidMount() {
    this._scrollLeft = this.viewport ? this.viewport.getScroll().scrollLeft : 0;
    this._onScroll();
  }

  componentDidUpdate() {
    this._onScroll();
  }

  componentWillUnmount() {
    this._scrollLeft = undefined;
  }

  setHeaderRef = (header) => {
    this.header = header;
  };

  setViewportRef = (viewport) => {
    this.viewport = viewport;
  };

  setViewportContainerRef = (viewportContainer) => {
    this.viewPortContainer = viewportContainer;
  };

  setEmptyViewRef = (emptyView) => {
    this.emptyView = emptyView;
  };

  render() {
    const { headerRows } = this.props;
    const EmptyRowsView = this.props.emptyRowsView;

    return (
      <div style={this.getStyle()} className="react-grid-Grid">
        <Header
          ref={this.setHeaderRef}
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
          {this.props.rowsCount >= 1 || (this.props.rowsCount === 0 && !this.props.emptyRowsView) ?
            <div
              ref={this.setViewportContainerRef}
              onKeyDown={this.props.onViewportKeydown}
              onKeyUp={this.props.onViewportKeyup}
              >
                <Viewport
                  {...this.props}
                  ref={this.setViewportRef}
                  rowKey={this.props.rowKey}
                  width={this.props.columnMetrics.width}
                  rowHeight={this.props.rowHeight}
                  rowRenderer={this.props.rowRenderer}
                  rowGetter={this.props.rowGetter}
                  rowsCount={this.props.rowsCount}
                  selectedRows={this.props.selectedRows}
                  expandedRows={this.props.expandedRows}
                  columnMetrics={this.props.columnMetrics}
                  totalWidth={this.props.totalWidth}
                  onScroll={this.onScroll}
                  onRows={this.props.onRows}
                  cellMetaData={this.props.cellMetaData}
                  rowOffsetHeight={this.props.rowOffsetHeight || this.props.rowHeight * headerRows.length}
                  minHeight={this.props.minHeight}
                  rowScrollTimeout={this.props.rowScrollTimeout}
                  scrollToRowIndex={this.props.scrollToRowIndex}
                  contextMenu={this.props.contextMenu}
                  rowSelection={this.props.rowSelection}
                  getSubRowDetails={this.props.getSubRowDetails}
                  rowGroupRenderer={this.props.rowGroupRenderer}
                  overScan={this.props.overScan}
                  enableCellSelect={this.props.enableCellSelect}
                  enableCellAutoFocus={this.props.enableCellAutoFocus}
                  cellNavigationMode={this.props.cellNavigationMode}
                  eventBus={this.props.eventBus}
                  onCheckCellIsEditable={this.props.onCheckCellIsEditable}
                  onCellCopyPaste={this.props.onCellCopyPaste}
                  onGridRowsUpdated={this.props.onGridRowsUpdated}
                  onDragHandleDoubleClick={this.props.onDragHandleDoubleClick}
                  onCellSelected={this.props.onCellSelected}
                  onCellDeSelected={this.props.onCellDeSelected}
                  onCellRangeSelectionStarted={this.props.onCellRangeSelectionStarted}
                  onCellRangeSelectionUpdated={this.props.onCellRangeSelectionUpdated}
                  onCellRangeSelectionCompleted={this.props.onCellRangeSelectionCompleted}
                  onCommit={this.props.onCommit}
                  RowsContainer={this.props.RowsContainer}
                />
            </div>
        :
            <div ref={this.setEmptyViewRef} className="react-grid-Empty">
                <EmptyRowsView />
            </div>
        }
      </div>
    );
  }
}

export default Grid;
