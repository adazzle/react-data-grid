const React = require('react');
const createReactClass = require('create-react-class');
const ReactDOM = require('react-dom');
const joinClasses = require('classnames');
import PropTypes from 'prop-types';
const ScrollShim = require('./ScrollShim');
const Row = require('./Row');
const cellMetaDataShape = require('./PropTypeShapes/CellMetaDataShape');
const RowUtils = require('./RowUtils');
require('../../../themes/react-data-grid-core.css');

import shallowEqual from 'fbjs/lib/shallowEqual';
import RowsContainer from './RowsContainer';
import RowGroup from './RowGroup';

const Canvas = createReactClass({
  displayName: 'Canvas',
  mixins: [ScrollShim],

  propTypes: {
    rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    rowHeight: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number,
    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.string,
    className: PropTypes.string,
    displayStart: PropTypes.number.isRequired,
    displayEnd: PropTypes.number.isRequired,
    visibleStart: PropTypes.number.isRequired,
    visibleEnd: PropTypes.number.isRequired,
    colVisibleStart: PropTypes.number.isRequired,
    colVisibleEnd: PropTypes.number.isRequired,
    colDisplayStart: PropTypes.number.isRequired,
    colDisplayEnd: PropTypes.number.isRequired,
    rowsCount: PropTypes.number.isRequired,
    rowGetter: PropTypes.oneOfType([
      PropTypes.func.isRequired,
      PropTypes.array.isRequired
    ]),
    expandedRows: PropTypes.array,
    onRows: PropTypes.func,
    onScroll: PropTypes.func,
    columns: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    cellMetaData: PropTypes.shape(cellMetaDataShape).isRequired,
    selectedRows: PropTypes.array,
    rowKey: PropTypes.string,
    rowScrollTimeout: PropTypes.number,
    scrollToRowIndex: PropTypes.number,
    contextMenu: PropTypes.element,
    contextMenuId: PropTypes.string,
    getSubRowDetails: PropTypes.func,
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
    rowGroupRenderer: PropTypes.func,
    isScrolling: PropTypes.bool
  },

  getDefaultProps() {
    return {
      rowRenderer: Row,
      onRows: () => { },
      selectedRows: [],
      rowScrollTimeout: 0
    };
  },

  getInitialState() {
    return {
      displayStart: this.props.displayStart,
      displayEnd: this.props.displayEnd,
      scrollingTimeout: null
    };
  },

  componentWillMount() {
    this.rows = [];
    this._currentRowsLength = 0;
    this._currentRowsRange = { start: 0, end: 0 };
    this._scroll = { scrollTop: 0, scrollLeft: 0 };
  },

  componentDidMount() {
    this.onRows();
  },

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.displayStart !== this.state.displayStart
      || nextProps.displayEnd !== this.state.displayEnd) {
      this.setState({
        displayStart: nextProps.displayStart,
        displayEnd: nextProps.displayEnd
      });
    }
  },

  shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    let shouldUpdate = nextState.displayStart !== this.state.displayStart
      || nextState.displayEnd !== this.state.displayEnd
      || nextState.scrollingTimeout !== this.state.scrollingTimeout
      || this.props.scrollToRowIndex !== nextProps.scrollToRowIndex
      || nextProps.rowsCount !== this.props.rowsCount
      || nextProps.rowHeight !== this.props.rowHeight
      || nextProps.columns !== this.props.columns
      || nextProps.width !== this.props.width
      || nextProps.height !== this.props.height
      || nextProps.cellMetaData !== this.props.cellMetaData
      || this.props.colDisplayStart !== nextProps.colDisplayStart
      || this.props.colDisplayEnd !== nextProps.colDisplayEnd
      || this.props.colVisibleStart !== nextProps.colVisibleStart
      || this.props.colVisibleEnd !== nextProps.colVisibleEnd
      || !shallowEqual(nextProps.style, this.props.style);
    return shouldUpdate;
  },

  componentWillUnmount() {
    this._currentRowsLength = 0;
    this._currentRowsRange = { start: 0, end: 0 };
    this._scroll = { scrollTop: 0, scrollLeft: 0 };
  },

  componentDidUpdate() {
    if (this._scroll.scrollTop !== 0 && this._scroll.scrollLeft !== 0) {
      this.setScrollLeft(this._scroll.scrollLeft);
    }
    if (this.props.scrollToRowIndex !== 0) {
      this.div.scrollTop = Math.min(
        this.props.scrollToRowIndex * this.props.rowHeight,
        this.props.rowsCount * this.props.rowHeight - this.props.height
      );
    }
    this.onRows();
  },

  onRows() {
    if (this._currentRowsRange !== { start: 0, end: 0 }) {
      this.props.onRows(this._currentRowsRange);
      this._currentRowsRange = { start: 0, end: 0 };
    }
  },

  onScroll(e: any) {
    if (ReactDOM.findDOMNode(this) !== e.target) {
      return;
    }
    this.appendScrollShim();
    let scrollLeft = e.target.scrollLeft;
    let scrollTop = e.target.scrollTop;
    let scroll = { scrollTop, scrollLeft };
    this._scroll = scroll;
    this.props.onScroll(scroll);
  },

  getRows(displayStart, displayEnd) {
    this._currentRowsRange = { start: displayStart, end: displayEnd };
    if (Array.isArray(this.props.rowGetter)) {
      return this.props.rowGetter.slice(displayStart, displayEnd);
    }
    let rows = [];
    let i = displayStart;
    while (i < displayEnd) {
      let row = this.props.rowGetter(i);
      let subRowDetails = {};
      if (this.props.getSubRowDetails) {
        subRowDetails = this.props.getSubRowDetails(row);
      }
      rows.push({ row, subRowDetails });
      i++;
    }
    return rows;
  },

  getScrollbarWidth() {
    let scrollbarWidth = 0;
    // Get the scrollbar width
    let canvas = ReactDOM.findDOMNode(this);
    scrollbarWidth = canvas.offsetWidth - canvas.clientWidth;
    return scrollbarWidth;
  },

  getScroll() {
    let {scrollTop, scrollLeft} = ReactDOM.findDOMNode(this);
    return { scrollTop, scrollLeft };
  },

  isRowSelected(idx, row) {
    // Use selectedRows if set
    if (this.props.selectedRows !== null) {
      let selectedRows = this.props.selectedRows.filter(r => {
        let rowKeyValue = row.get ? row.get(this.props.rowKey) : row[this.props.rowKey];
        return r[this.props.rowKey] === rowKeyValue;
      });
      return selectedRows.length > 0 && selectedRows[0].isSelected;
    }

    // Else use new rowSelection props
    if (this.props.rowSelection) {
      let {keys, indexes, isSelectedKey} = this.props.rowSelection;
      return RowUtils.isRowSelected(keys, indexes, isSelectedKey, row, idx);
    }

    return false;
  },

  _currentRowsLength: 0,
  _currentRowsRange: { start: 0, end: 0 },
  _scroll: { scrollTop: 0, scrollLeft: 0 },

  setScrollLeft(scrollLeft) {
    if (this._currentRowsLength !== 0) {
      if (!this.rows) return;
      for (let i = 0, len = this._currentRowsLength; i < len; i++) {
        if (this.rows[i]) {
          let row = this.getRowByRef(i);
          if (row && row.setScrollLeft) {
            row.setScrollLeft(scrollLeft);
          }
        }
      }
    }
  },

  getRowByRef(i) {
    // check if wrapped with React DND drop target
    let wrappedRow = this.rows[i].getDecoratedComponentInstance ? this.rows[i].getDecoratedComponentInstance(i) : null;
    if (wrappedRow) {
      return wrappedRow.row;
    }
    return this.rows[i];
  },

  renderRow(props: any) {
    let row = props.row;
    if (row.__metaData && row.__metaData.getRowRenderer) {
      return row.__metaData.getRowRenderer(this.props, props.idx);
    }
    if (row.__metaData && row.__metaData.isGroup) {
      return (<RowGroup
        {...props}
        {...row.__metaData}
        name={row.name}
        renderer={this.props.rowGroupRenderer} />);
    }
    let RowsRenderer = this.props.rowRenderer;
    if (typeof RowsRenderer === 'function') {
      return <RowsRenderer {...props}/>;
    }

    if (React.isValidElement(this.props.rowRenderer)) {
      return React.cloneElement(this.props.rowRenderer, props);
    }
  },

  renderPlaceholder(key: string, height: number): ?ReactElement {
    // just renders empty cells
    // if we wanted to show gridlines, we'd need classes and position as with renderScrollingPlaceholder
    return (<div key={ key } style={{ height: height }}>
      {
        this.props.columns.map(
          (column, idx) => <div style={{ width: column.width }} key={idx} />
        )
      }
    </div >
    );
  },

  render() {
    const { displayStart, displayEnd } = this.state;
    const { rowHeight, rowsCount } = this.props;

    let rows = this.getRows(displayStart, displayEnd)
      .map((r, idx) => this.renderRow({
        key: `row-${displayStart + idx}`,
        ref: (node) => this.rows[idx] = node,
        idx: displayStart + idx,
        visibleStart: this.props.visibleStart,
        visibleEnd: this.props.visibleEnd,
        row: r.row,
        height: rowHeight,
        onMouseOver: this.onMouseOver,
        columns: this.props.columns,
        isSelected: this.isRowSelected(displayStart + idx, r.row, displayStart, displayEnd),
        expandedRows: this.props.expandedRows,
        cellMetaData: this.props.cellMetaData,
        subRowDetails: r.subRowDetails,
        colVisibleStart: this.props.colVisibleStart,
        colVisibleEnd: this.props.colVisibleEnd,
        colDisplayStart: this.props.colDisplayStart,
        colDisplayEnd: this.props.colDisplayEnd,
        isScrolling: this.props.isScrolling
      }));

    this._currentRowsLength = rows.length;

    if (displayStart > 0) {
      rows.unshift(this.renderPlaceholder('top', displayStart * rowHeight));
    }

    if (rowsCount - displayEnd > 0) {
      rows.push(
        this.renderPlaceholder('bottom', (rowsCount - displayEnd) * rowHeight));
    }

    let style = {
      position: 'absolute',
      top: 0,
      left: 0,
      overflowX: 'auto',
      overflowY: 'scroll',
      width: this.props.totalWidth,
      height: this.props.height
    };

    return (
      <div
        ref={(div) => {this.div = div;}}
        style={style}
        onScroll={this.onScroll}
        className={joinClasses('react-grid-Canvas', this.props.className, { opaque: this.props.cellMetaData.selected && this.props.cellMetaData.selected.active }) }>
        <RowsContainer
          width={this.props.width}
          rows={rows}
          contextMenu={this.props.contextMenu}
          contextMenuId={this.props.contextMenuId}
          rowIdx={this.props.cellMetaData.selected.rowIdx}
          idx={this.props.cellMetaData.selected.idx} />
      </div>
    );
  }
});

module.exports = Canvas;
