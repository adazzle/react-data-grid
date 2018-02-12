const React             = require('react');
const shallowEqual    = require('fbjs/lib/shallowEqual');
const BaseHeaderCell        = require('./HeaderCell');
const getScrollbarSize  = require('./getScrollbarSize');
const ExcelColumn  = require('./PropTypeShapes/ExcelColumn');
const columnUtils  = require('./ColumnUtils');
const SortableHeaderCell    = require('./cells/headerCells/SortableHeaderCell');
const FilterableHeaderCell  = require('./cells/headerCells/FilterableHeaderCell');
const HeaderCellType = require('./HeaderCellType');
const createObjectWithProperties = require('./createObjectWithProperties');
require('../../../themes/react-data-grid-header.css');

import PropTypes from 'prop-types';

const HeaderRowStyle  = {
  overflow: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.number,
  position: PropTypes.string
};

// The list of the propTypes that we want to include in the HeaderRow div
const knownDivPropertyKeys = ['width', 'height', 'style', 'onScroll'];

class HeaderRow extends React.Component {
  static displayName = 'HeaderRow';

  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.number.isRequired,
    columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    onColumnResize: PropTypes.func,
    onSort: PropTypes.func.isRequired,
    onColumnResizeEnd: PropTypes.func,
    style: PropTypes.shape(HeaderRowStyle),
    sortColumn: PropTypes.string,
    sortDirection: PropTypes.oneOf(Object.keys(SortableHeaderCell.DEFINE_SORT)),
    cellRenderer: PropTypes.func,
    headerCellRenderer: PropTypes.func,
    filterable: PropTypes.bool,
    onFilterChange: PropTypes.func,
    resizing: PropTypes.object,
    onScroll: PropTypes.func,
    rowType: PropTypes.string,
    draggableHeaderCell: PropTypes.func,
    onHeaderDrop: PropTypes.func
  };

  componentWillMount() {
    this.cells = [];
  }

  shouldComponentUpdate(
    nextProps: {width: ?(number | string); height: number; columns: Array<ExcelColumn>; style: ?HeaderRowStyle; onColumnResize: ?any},
  ): boolean {
    return (
      nextProps.width !== this.props.width
      || nextProps.height !== this.props.height
      || nextProps.columns !== this.props.columns
      || !shallowEqual(nextProps.style, this.props.style)
      || this.props.sortColumn !== nextProps.sortColumn
      || this.props.sortDirection !== nextProps.sortDirection
    );
  }

  getHeaderCellType = (column) => {
    if (column.filterable) {
      if (this.props.filterable) return HeaderCellType.FILTERABLE;
    }

    if (column.sortable && column.rowType !== 'filter') return HeaderCellType.SORTABLE;

    return HeaderCellType.NONE;
  };

  getFilterableHeaderCell = (column) => {
    let FilterRenderer = FilterableHeaderCell;
    if (column.filterRenderer !== undefined) {
      FilterRenderer = column.filterRenderer;
    }
    return <FilterRenderer {...this.props} onChange={this.props.onFilterChange} />;
  };

  getSortableHeaderCell = (column) => {
    let sortDirection = (this.props.sortColumn === column.key) ? this.props.sortDirection : SortableHeaderCell.DEFINE_SORT.NONE;
    let sortDescendingFirst = (column.sortDescendingFirst === undefined ) ? false : column.sortDescendingFirst;
    return <SortableHeaderCell columnKey={column.key} onSort={this.props.onSort} sortDirection={sortDirection} sortDescendingFirst={sortDescendingFirst} headerRenderer={column.headerRenderer} />;
  };

  getHeaderRenderer = (column) => {
    let renderer;
    if (column.headerRenderer && !column.sortable && !this.props.filterable) {
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
  };

  getStyle = (): HeaderRowStyle => {
    return {
      overflow: 'hidden',
      width: '100%',
      height: this.props.height,
      position: 'absolute'
    };
  };

  getCells = (): Array<HeaderCell> => {
    let cells = [];
    let lockedCells = [];
    for (let i = 0, len = columnUtils.getSize(this.props.columns); i < len; i++) {
      let column = Object.assign({ rowType: this.props.rowType }, columnUtils.getColumn(this.props.columns, i));
      let _renderer = this.getHeaderRenderer(column);
      if (column.key === 'select-row' && this.props.rowType === 'filter') {
        _renderer = <div></div>;
      }
      let HeaderCell = column.draggable ? this.props.draggableHeaderCell : BaseHeaderCell;
      let cell = (
        <HeaderCell
          ref={(node) => this.cells[i] = node}
          key={i}
          height={this.props.height}
          column={column}
          renderer={_renderer}
          resizing={this.props.resizing === column}
          onResize={this.props.onColumnResize}
          onResizeEnd={this.props.onColumnResizeEnd}
          onHeaderDrop={this.props.onHeaderDrop}
          />
      );
      if (column.locked) {
        lockedCells.push(cell);
      } else {
        cells.push(cell);
      }
    }

    return cells.concat(lockedCells);
  };

  setScrollLeft = (scrollLeft: number) => {
    this.props.columns.forEach( (column, i) => {
      if (column.locked) {
        this.cells[i].setScrollLeft(scrollLeft);
      } else {
        if (this.cells[i] && this.cells[i].removeScroll) {
          this.cells[i].removeScroll();
        }
      }
    });
  };

  getKnownDivProps = () => {
    return createObjectWithProperties(this.props, knownDivPropertyKeys);
  };

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
      <div {...this.getKnownDivProps()} className="react-grid-HeaderRow">
        <div style={cellsStyle}>
          {cells}
        </div>
      </div>
    );
  }
}

module.exports = HeaderRow;
