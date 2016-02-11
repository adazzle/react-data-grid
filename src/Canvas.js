const React           = require('react');
const ReactDOM = require('react-dom');
const joinClasses     = require('classnames');
const PropTypes       = React.PropTypes;
const ScrollShim      = require('./ScrollShim');
const Row             = require('./Row');
const cellMetaDataShape = require('./PropTypeShapes/CellMetaDataShape');
import shallowEqual from 'fbjs/lib/shallowEqual';

const Canvas = React.createClass({
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
    rowKey: React.PropTypes.string,
    rowScrollTimeout: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      rowRenderer: Row,
      onRows: () => {},
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
    this._currentRowsLength = 0;
    this._currentRowsRange = {start: 0, end: 0};
    this._scroll = {scrollTop: 0, scrollLeft: 0};
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
  || nextProps.rowsCount !== this.props.rowsCount
  || nextProps.rowHeight !== this.props.rowHeight
  || nextProps.columns !== this.props.columns
  || nextProps.width !== this.props.width
  || nextProps.cellMetaData !== this.props.cellMetaData
  || !shallowEqual(nextProps.style, this.props.style);
    return shouldUpdate;
  },

  componentWillUnmount() {
    this._currentRowsLength = 0;
    this._currentRowsRange = {start: 0, end: 0};
    this._scroll = {scrollTop: 0, scrollLeft: 0};
  },

  componentDidUpdate() {
    if (this._scroll.scrollTop !== 0 && this._scroll.scrollLeft !== 0) {
      this.setScrollLeft(this._scroll.scrollLeft);
    }
    this.onRows();
  },

  onRows() {
    if (this._currentRowsRange !== {start: 0, end: 0}) {
      this.props.onRows(this._currentRowsRange);
      this._currentRowsRange = {start: 0, end: 0};
    }
  },

  onScroll(e: any) {
    this.appendScrollShim();
    let {scrollTop, scrollLeft} = e.target;
    let scroll = {scrollTop, scrollLeft};
    // check how far we have scrolled, and if this means we are being taken out of range
    let scrollYRange = Math.abs(this._scroll.scrollTop - scroll.scrollTop) / this.props.rowHeight;
    let scrolledOutOfRange = scrollYRange > (this.props.displayEnd - this.props.displayStart);

    this._scroll = scroll;
    this.props.onScroll(scroll);
    // if we go out of range, we queue the actual render, just rendering cheap placeholders
    // avoiding rendering anything expensive while a user scrolls down
    if (scrolledOutOfRange && this.props.rowScrollTimeout > 0) {
      let scrollTO = this.state.scrollingTimeout;
      if (scrollTO) {
        clearTimeout(scrollTO);
      }
     // queue up, and set state to clear the TO so we render the rows (not placeholders)
      scrollTO = setTimeout(() => {
        if (this.state.scrollingTimeout !== null) {
          this.setState({scrollingTimeout: null});
        }
      }, this.props.rowScrollTimeout);

      this.setState({scrollingTimeout: scrollTO});
    }
  },

  getRows(displayStart: number, displayEnd: number): Array<any> {
    this._currentRowsRange = {start: displayStart, end: displayEnd};
    if (Array.isArray(this.props.rowGetter)) {
      return this.props.rowGetter.slice(displayStart, displayEnd);
    }

    let rows = [];
    for (let i = displayStart; i < displayEnd; i++) {
      rows.push(this.props.rowGetter(i));
    }
    return rows;
  },

  getScrollbarWidth() {
    let scrollbarWidth = 0;
    // Get the scrollbar width
    let canvas = ReactDOM.findDOMNode(this);
    scrollbarWidth  = canvas.offsetWidth - canvas.clientWidth;
    return scrollbarWidth;
  },

  getScroll(): {scrollTop: number; scrollLeft: number} {
    let {scrollTop, scrollLeft} = ReactDOM.findDOMNode(this);
    return {scrollTop, scrollLeft};
  },

  isRowSelected(row): boolean {
    let selectedRows = this.props.selectedRows.filter(r => {
      let rowKeyValue = row.get ? row.get(this.props.rowKey) : row[this.props.rowKey];
      return r[this.props.rowKey] === rowKeyValue;
    });
    return selectedRows.length > 0 && selectedRows[0].isSelected;
  },

  _currentRowsLength: 0,
  _currentRowsRange: { start: 0, end: 0 },
  _scroll: { scrollTop: 0, scrollLeft: 0 },

  setScrollLeft(scrollLeft: number) {
    if (this._currentRowsLength !== 0) {
      if (!this.refs) return;
      for (let i = 0, len = this._currentRowsLength; i < len; i++) {
        if (this.refs[i] && this.refs[i].setScrollLeft) {
          this.refs[i].setScrollLeft(scrollLeft);
        }
      }
    }
  },

  renderRow(props: any) {
    if (this.state.scrollingTimeout !== null) {
      // in the midst of a rapid scroll, so we render placeholders
      // the actual render is then queued (through a timeout)
      // this avoids us redering a bunch of rows that a user is trying to scroll past
      return this.renderScrollingPlaceholder(props);
    }
    let RowsRenderer = this.props.rowRenderer;
    if (typeof RowsRenderer === 'function') {
      return <RowsRenderer {...props}/>;
    }

    if (React.isValidElement(this.props.rowRenderer)) {
      return React.cloneElement(this.props.rowRenderer, props);
    }
  },

  renderScrollingPlaceholder(props: any): ?ReactElement {
    // here we are just rendering empty cells
    // we may want to allow a user to inject this, and/or just render the cells that are in view
    // for now though we essentially are doing a (very lightweight) row + cell with empty content
    let styles = {
      row: {height: props.height, overflow: 'hidden'},
      cell: {height: props.height, position: 'absolute'},
      placeholder: {backgroundColor: 'rgba(211, 211, 211, 0.45)', width: '60%', height: Math.floor(props.height * 0.3)}
    };
    return (
      <div key={props.key} style={styles.row} className="react-grid-Row">
        {this.props.columns.map(
          (col, idx) =>
              <div style={Object.assign(styles.cell, {width: col.width, left: col.left})} key={idx} className="react-grid-Cell">
                <div style={Object.assign(styles.placeholder, {width: Math.floor(col.width * 0.6)})}></div>
              </div>
        )}
      </div>
    );
  },

  renderPlaceholder(key: string, height: number): ?ReactElement {
    // just renders empty cells
    // if we wanted to show gridlines, we'd need classes and position as with renderScrollingPlaceholder
    return (
      <div key={key} style={{height: height}}>
        {this.props.columns.map(
          (column, idx) => <div style={{width: column.width}} key={idx} />
		)}
      </div>
    );
  },

  render(): ?ReactElement {
    let displayStart = this.state.displayStart;
    let displayEnd = this.state.displayEnd;
    let rowHeight = this.props.rowHeight;
    let length = this.props.rowsCount;

    let rows = this.getRows(displayStart, displayEnd)
        .map((row, idx) => this.renderRow({
          key: displayStart + idx,
          ref: idx,
          idx: displayStart + idx,
          row: row,
          height: rowHeight,
          columns: this.props.columns,
          isSelected: this.isRowSelected(row),
          expandedRows: this.props.expandedRows,
          cellMetaData: this.props.cellMetaData
        }));

    this._currentRowsLength = rows.length;

    if (displayStart > 0) {
      rows.unshift(this.renderPlaceholder('top', displayStart * rowHeight));
    }

    if (length - displayEnd > 0) {
      rows.push(
        this.renderPlaceholder('bottom', (length - displayEnd) * rowHeight));
    }

    let style = {
      position: 'absolute',
      top: 0,
      left: 0,
      overflowX: 'auto',
      overflowY: 'scroll',
      width: this.props.totalWidth,
      height: this.props.height,
      transform: 'translate3d(0, 0, 0)'
    };

    return (
      <div
        style={style}
        onScroll={this.onScroll}
        className={joinClasses('react-grid-Canvas', this.props.className, {opaque: this.props.cellMetaData.selected && this.props.cellMetaData.selected.active})}>
        <div style={{width: this.props.width, overflow: 'hidden'}}>
          {rows}
        </div>
      </div>
    );
  }
});

module.exports = Canvas;
