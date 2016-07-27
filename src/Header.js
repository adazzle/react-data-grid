const React               = require('react');
const ReactDOM            = require('react-dom');
const joinClasses         = require('classnames');
const shallowCloneObject  = require('./shallowCloneObject');
const ColumnMetrics       = require('./ColumnMetrics');
const ColumnUtils         = require('./ColumnUtils');
const HeaderRow           = require('./HeaderRow');
const PropTypes           = React.PropTypes;

type Column = {
  width: number
}

const Header = React.createClass({
  propTypes: {
    columnMetrics: PropTypes.shape({  width: PropTypes.number.isRequired, columns: PropTypes.any }).isRequired,
    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.number.isRequired,
    headerRows: PropTypes.array.isRequired,
    sortColumn: PropTypes.string,
    sortDirection: PropTypes.oneOf(['ASC', 'DESC', 'NONE']),
    onSort: PropTypes.func,
    onColumnResize: PropTypes.func,
    onScroll: PropTypes.func,
    draggableHeaderCell: PropTypes.func,
    getValidFilterValues: PropTypes.func
  },

  getInitialState(): {resizing: any} {
    return {resizing: null};
  },

  componentWillReceiveProps() {
    this.setState({resizing: null});
  },

  shouldComponentUpdate: function(nextProps: any, nextState: any): boolean {
    let update =  !(ColumnMetrics.sameColumns(this.props.columnMetrics.columns, nextProps.columnMetrics.columns, ColumnMetrics.sameColumn))
    || this.props.totalWidth !== nextProps.totalWidth
    || (this.props.headerRows.length !== nextProps.headerRows.length)
    || (this.state.resizing !== nextState.resizing)
    || this.props.sortColumn !== nextProps.sortColumn
    || this.props.sortDirection !== nextProps.sortDirection;
    return update;
  },

  onColumnResize(column: Column, width: number) {
    let state = this.state.resizing || this.props;

    let pos = this.getColumnPosition(column);

    if (pos != null) {
      let resizing = {
        columnMetrics: shallowCloneObject(state.columnMetrics)
      };
      resizing.columnMetrics = ColumnMetrics.resizeColumn(
          resizing.columnMetrics, pos, width);

      // we don't want to influence scrollLeft while resizing
      if (resizing.columnMetrics.totalWidth < state.columnMetrics.totalWidth) {
        resizing.columnMetrics.totalWidth = state.columnMetrics.totalWidth;
      }

      resizing.column = ColumnUtils.getColumn(resizing.columnMetrics.columns, pos);
      this.setState({resizing});
    }
  },

  onColumnResizeEnd(column: Column, width: number) {
    let pos = this.getColumnPosition(column);
    if (pos !== null && this.props.onColumnResize) {
      this.props.onColumnResize(pos, width || column.width);
    }
  },

  getHeaderRows(): Array<HeaderRow> {
    let columnMetrics = this.getColumnMetrics();
    let resizeColumn;
    if (this.state.resizing) {
      resizeColumn = this.state.resizing.column;
    }
    let headerRows = [];
    this.props.headerRows.forEach((row, index) => {
      // To allow header filters to be visible
      let rowHeight = 'auto';
      if (row.rowType === 'filter') {
        rowHeight = '500px';
      }
      let headerRowStyle = {
        position: 'absolute',
        top: this.getCombinedHeaderHeights(index),
        left: 0,
        width: this.props.totalWidth,
        overflowX: 'hidden',
        minHeight: rowHeight
      };

      headerRows.push(<HeaderRow
        key={row.ref}
        ref={row.ref}
        rowType={row.rowType}
        style={headerRowStyle}
        onColumnResize={this.onColumnResize}
        onColumnResizeEnd={this.onColumnResizeEnd}
        width={columnMetrics.width}
        height={row.height || this.props.height}
        columns={columnMetrics.columns}
        resizing={resizeColumn}
        draggableHeaderCell={this.props.draggableHeaderCell}
        filterable={row.filterable}
        onFilterChange={row.onFilterChange}
        sortColumn={this.props.sortColumn}
        sortDirection={this.props.sortDirection}
        onSort={this.props.onSort}
        onScroll={this.props.onScroll}
        getValidFilterValues={this.props.getValidFilterValues}
        />);
    });
    return headerRows;
  },

  getColumnMetrics() {
    let columnMetrics;
    if (this.state.resizing) {
      columnMetrics = this.state.resizing.columnMetrics;
    } else {
      columnMetrics = this.props.columnMetrics;
    }
    return columnMetrics;
  },

  getColumnPosition(column: Column): ?number {
    let columnMetrics = this.getColumnMetrics();
    let pos = -1;
    columnMetrics.columns.forEach((c, idx) => {
      if (c.key === column.key) {
        pos = idx;
      }
    });
    return pos === -1 ? null : pos;
  },

  getCombinedHeaderHeights(until: ?number): number {
    let stopAt = this.props.headerRows.length;
    if (typeof until !== 'undefined') {
      stopAt = until;
    }

    let height = 0;
    for (let index = 0; index < stopAt; index++) {
      height += this.props.headerRows[index].height || this.props.height;
    }
    return height;
  },

  getStyle(): {position: string; height: number} {
    return {
      position: 'relative',
      height: this.getCombinedHeaderHeights()
    };
  },

  setScrollLeft(scrollLeft: number) {
    let node = ReactDOM.findDOMNode(this.refs.row);
    node.scrollLeft = scrollLeft;
    this.refs.row.setScrollLeft(scrollLeft);
    if (this.refs.filterRow) {
      let nodeFilters =  ReactDOM.findDOMNode(this.refs.filterRow);
      nodeFilters.scrollLeft = scrollLeft;
      this.refs.filterRow.setScrollLeft(scrollLeft);
    }
  },

  render(): ?ReactElement {
    let className = joinClasses({
      'react-grid-Header': true,
      'react-grid-Header--resizing': !!this.state.resizing
    });
    let headerRows = this.getHeaderRows();

    return (

      <div {...this.props} style={this.getStyle()} className={className}>
        {headerRows}
      </div>
    );
  }
});

module.exports = Header;
