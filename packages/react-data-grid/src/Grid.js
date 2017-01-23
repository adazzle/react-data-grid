const React                = require('react');
const PropTypes            = React.PropTypes;
const Header               = require('./Header');
const Viewport             = require('./Viewport');
const GridScrollMixin      = require('./GridScrollMixin');
const DOMMetrics           = require('./DOMMetrics');
const cellMetaDataShape    = require('./PropTypeShapes/CellMetaDataShape');
require('../../../themes/react-data-grid-core.css');

const Grid = React.createClass({
  propTypes: {
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
    rowSelection: React.PropTypes.oneOfType([
      React.PropTypes.shape({
        indexes: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
      }),
      React.PropTypes.shape({
        isSelectedKey: React.PropTypes.string.isRequired
      }),
      React.PropTypes.shape({
        keys: React.PropTypes.shape({
          values: React.PropTypes.array.isRequired,
          rowKey: React.PropTypes.string.isRequired
        }).isRequired
      })
    ]),
    rowsCount: PropTypes.number,
    onRows: PropTypes.func,
    sortColumn: React.PropTypes.string,
    sortDirection: React.PropTypes.oneOf(['ASC', 'DESC', 'NONE']),
    rowOffsetHeight: PropTypes.number.isRequired,
    onViewportKeydown: PropTypes.func.isRequired,
    onViewportKeyup: PropTypes.func,
    onViewportDragStart: PropTypes.func.isRequired,
    onViewportDragEnd: PropTypes.func.isRequired,
    onViewportDoubleClick: PropTypes.func.isRequired,
    onColumnResize: PropTypes.func,
    onSort: PropTypes.func,
    cellMetaData: PropTypes.shape(cellMetaDataShape),
    rowKey: PropTypes.string.isRequired,
    rowScrollTimeout: PropTypes.number,
    contextMenu: PropTypes.element,
    getSubRowDetails: PropTypes.func,
    draggableHeaderCell: PropTypes.func,
    getValidFilterValues: PropTypes.func,
    rowGroupRenderer: PropTypes.func,
    overScan: PropTypes.object
  },

  mixins: [
    GridScrollMixin,
    DOMMetrics.MetricsComputatorMixin
  ],

  getDefaultProps() {
    return {
      rowHeight: 35,
      minHeight: 350
    };
  },

  getStyle: function(): { overflow: string; outline: number; position: string; minHeight: number } {
    return {
      overflow: 'hidden',
      outline: 0,
      position: 'relative',
      minHeight: this.props.minHeight
    };
  },

  render(): ?ReactElement {
    let headerRows = this.props.headerRows || [{ref: 'row'}];
    let EmptyRowsView = this.props.emptyRowsView;

    return (
      <div style={this.getStyle()} className="react-grid-Grid">
        <Header
          ref="header"
          columnMetrics={this.props.columnMetrics}
          onColumnResize={this.props.onColumnResize}
          height={this.props.rowHeight}
          totalWidth={this.props.totalWidth}
          headerRows={headerRows}
          sortColumn={this.props.sortColumn}
          sortDirection={this.props.sortDirection}
          draggableHeaderCell={this.props.draggableHeaderCell}
          onSort={this.props.onSort}
          onScroll={this.onHeaderScroll}
          getValidFilterValues={this.props.getValidFilterValues}
          cellMetaData={this.props.cellMetaData}
          />
          {this.props.rowsCount >= 1 || (this.props.rowsCount === 0 && !this.props.emptyRowsView) ?
            <div ref="viewPortContainer" tabIndex="0" onKeyDown={this.props.onViewportKeydown} onKeyUp={this.props.onViewportKeyup} onDoubleClick={this.props.onViewportDoubleClick}   onDragStart={this.props.onViewportDragStart} onDragEnd={this.props.onViewportDragEnd}>
                <Viewport
                  ref="viewport"
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
                  contextMenu={this.props.contextMenu}
                  rowSelection={this.props.rowSelection}
                  getSubRowDetails={this.props.getSubRowDetails}
                  rowGroupRenderer={this.props.rowGroupRenderer}
                  overScan={this.props.overScan}
                />
            </div>
        :
            <div ref="emptyView" className="react-grid-Empty">
                <EmptyRowsView />
            </div>
        }
      </div>
    );
  }
});

module.exports = Grid;
