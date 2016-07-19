const React             = require('react');
const shallowEqual    = require('fbjs/lib/shallowEqual');
const BaseHeaderCell        = require('./HeaderCell');
const getScrollbarSize  = require('./getScrollbarSize');
const ExcelColumn  = require('./PropTypeShapes/ExcelColumn');
const ColumnUtilsMixin  = require('./ColumnUtils');
const SortableHeaderCell    = require('./addons/cells/headerCells/SortableHeaderCell');
const FilterableHeaderCell  = require('./addons/cells/headerCells/FilterableHeaderCell');
const HeaderCellType = require('./HeaderCellType');

const PropTypes         = React.PropTypes;

const HeaderRowStyle  = {
  overflow: React.PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: React.PropTypes.number,
  position: React.PropTypes.string
};

const DEFINE_SORT = ['ASC', 'DESC', 'NONE'];

const HeaderRow = React.createClass({
  propTypes: {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.number.isRequired,
    columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onColumnResize: PropTypes.func,
    onSort: PropTypes.func.isRequired,
    onColumnResizeEnd: PropTypes.func,
    style: PropTypes.shape(HeaderRowStyle),
    sortColumn: PropTypes.string,
    sortDirection: React.PropTypes.oneOf(DEFINE_SORT),
    cellRenderer: PropTypes.func,
    headerCellRenderer: PropTypes.func,
    filterable: PropTypes.bool,
    onFilterChange: PropTypes.func,
    resizing: PropTypes.object,
    onScroll: PropTypes.func,
    rowType: PropTypes.string,
    draggableHeaderCell: PropTypes.func
  },

  mixins: [ColumnUtilsMixin],

  shouldComponentUpdate(nextProps: {width: ?(number | string); height: number; columns: Array<ExcelColumn>; style: ?HeaderRowStyle; onColumnResize: ?any}): boolean {
    return (
      nextProps.width !== this.props.width
      || nextProps.height !== this.props.height
      || nextProps.columns !== this.props.columns
      || !shallowEqual(nextProps.style, this.props.style)
      || this.props.sortColumn !== nextProps.sortColumn
      || this.props.sortDirection !== nextProps.sortDirection
    );
  },

  getHeaderCellType(column) {
    if (column.filterable) {
      if (this.props.filterable) return HeaderCellType.FILTERABLE;
    }

    if (column.sortable) return HeaderCellType.SORTABLE;

    return HeaderCellType.NONE;
  },

  getFilterableHeaderCell(column) {
    let FilterRenderer = FilterableHeaderCell;
    if (column.filterRenderer !== undefined) {
      FilterRenderer = column.filterRenderer;
    }
    return <FilterRenderer {...this.props} onChange={this.props.onFilterChange} />;
  },

  getSortableHeaderCell(column) {
    let sortDirection = (this.props.sortColumn === column.key) ? this.props.sortDirection : DEFINE_SORT.NONE;
    return <SortableHeaderCell columnKey={column.key} onSort={this.props.onSort} sortDirection={sortDirection}/>;
  },

  getHeaderRenderer(column) {
    let renderer;
    if (column.headerRenderer) {
      renderer = column.headerRenderer;
    } else {
      let headerCellType = this.getHeaderCellType(column);
      switch (headerCellType) {
      case HeaderCellType.SORTABLE:
        renderer = this.getSortableHeaderCell(column);
        break;
      case HeaderCellType.FILTERABLE:
        renderer = this.getFilterableHeaderCell(column);
        break;
      default:
        break;
      }
    }
    return renderer;
  },

  getStyle(): HeaderRowStyle {
    return {
      overflow: 'hidden',
      width: '100%',
      height: this.props.height,
      position: 'absolute'
    };
  },

  getCells(): Array<HeaderCell> {
    let cells = [];
    let lockedCells = [];
    for (let i = 0, len = this.getSize(this.props.columns); i < len; i++) {
      let column = this.getColumn(this.props.columns, i);
      let _renderer = this.getHeaderRenderer(column);
      if (column.key === 'select-row' && this.props.rowType === 'filter') {
        _renderer = <div></div>;
      }
      let HeaderCell = column.draggable ? this.props.draggableHeaderCell : BaseHeaderCell;
      let cell = (
        <HeaderCell
          ref={i}
          key={i}
          height={this.props.height}
          column={column}
          renderer={_renderer}
          resizing={this.props.resizing === column}
          onResize={this.props.onColumnResize}
          onResizeEnd={this.props.onColumnResizeEnd}
          />
      );
      if (column.locked) {
        lockedCells.push(cell);
      } else {
        cells.push(cell);
      }
    }

    return cells.concat(lockedCells);
  },

  setScrollLeft(scrollLeft: number) {
    this.props.columns.forEach( (column, i) => {
      if (column.locked) {
        this.refs[i].setScrollLeft(scrollLeft);
      }
    });
  },

  render(): ?ReactElement {
    let cellsStyle = {
      width: this.props.width ? (this.props.width + getScrollbarSize()) : '100%',
      height: this.props.height,
      whiteSpace: 'nowrap',
      overflowX: 'hidden',
      overflowY: 'hidden'
    };

    let cells = this.getCells();
    return (
      <div {...this.props} className="react-grid-HeaderRow" onScroll={this.props.onScroll}>
        <div style={cellsStyle}>
          {cells}
        </div>
      </div>
    );
  }
});

module.exports = HeaderRow;
