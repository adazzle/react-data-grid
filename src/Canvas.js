/* @flow */
/**
 * @jsx React.DOM
 */
"use strict";

var React          = require('react/addons');
var cx             = React.addons.classSet;
var PropTypes      = React.PropTypes;
var cloneWithProps = React.addons.cloneWithProps;
var shallowEqual   = require('./shallowEqual');
var emptyFunction  = require('./emptyFunction');
var ScrollShim     = require('./ScrollShim');
var Row            = require('./Row');
var ExcelColumn = require('./addons/grids/ExcelColumn');
var Canvas = React.createClass({
  mixins: [ScrollShim],

  propTypes: {
    rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    rowHeight: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    displayStart: PropTypes.number.isRequired,
    displayEnd: PropTypes.number.isRequired,
    totalRows: PropTypes.number.isRequired,
    rows: PropTypes.oneOfType([
      PropTypes.func.isRequired,
      PropTypes.array.isRequired
    ]),
    onRows: PropTypes.func,
    columns: PropTypes.arrayOf(ExcelColumn).isRequired
  },

  render(): ?ReactElement {
    var displayStart = this.state.displayStart;
    var displayEnd = this.state.displayEnd;
    var rowHeight = this.props.rowHeight;
    var length = this.props.totalRows;

    var rows = this
        .getRows(displayStart, displayEnd)
        .map((row, idx) => this.renderRow({
          key: displayStart + idx,
          ref: idx,
          idx: displayStart + idx,
          row: row,
          height: rowHeight,
          columns: this.props.columns,
          isSelected : this.isRowSelected(displayStart + idx),
          expandedRows : this.props.expandedRows,
          cellMetaData : this.props.cellMetaData
        }));

    this._currentRowsLength = rows.length;

    if (displayStart > 0) {
      rows.unshift(this.renderPlaceholder('top', displayStart * rowHeight));
    }

    if (length - displayEnd > 0) {
      rows.push(
        this.renderPlaceholder('bottom', (length - displayEnd) * rowHeight));
    }

    var style = {
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
        className={cx("react-grid-Canvas", this.props.className)}>
        <div style={{width: this.props.width, overflow: 'hidden'}}>
          {rows}
        </div>
      </div>
    );
  },

  renderRow(props: any) {
    if(typeof this.props.rowRenderer === 'function') {
      return this.props.rowRenderer.call(this,props);
    }
    else if (React.isValidElement(this.props.rowRenderer)) {
      return cloneWithProps(this.props.rowRenderer, props);
    } else {
      return this.props.rowRenderer(props);
    }
  },

  renderPlaceholder(key: string, height: number): ?ReactElement {
    return (
      <div key={key} style={{height: height}}>
        {this.props.columns.map(
          (column, idx) => <div style={{width: column.width}} key={idx} />)}
      </div>
    );
  },

  getDefaultProps() {
    return {
      rowRenderer: Row,
      onRows: emptyFunction
    };
  },

  isRowSelected(rowIdx: number): boolean{
   return this.props.selectedRows && this.props.selectedRows[rowIdx] === true;
  },

  _currentRowsLength : 0,
  _currentRowsRange : { start: 0, end: 0 },
  _scroll : { scrollTop : 0, scrollLeft: 0 },

  getInitialState() {
    return {
      shouldUpdate: true,
      displayStart: this.props.displayStart,
      displayEnd: this.props.displayEnd
    };
  },

  componentWillMount() {
    this._currentRowsLength = 0;
    this._currentRowsRange = {start: 0, end: 0};
    this._scroll = {scrollTop : 0, scrollLeft: 0};
  },

  componentDidMount() {
    this.onRows();
  },

  componentDidUpdate(nextProps: any) {
    if (this._scroll !== {start: 0, end: 0}) {
      this.setScrollLeft(this._scroll.scrollLeft);
    }
    this.onRows();
  },

  componentWillUnmount() {
    this._currentRowsLength = 0;
    this._currentRowsRange = {start: 0, end: 0};
    this._scroll = {scrollTop : 0, scrollLeft: 0};
  },

  componentWillReceiveProps(nextProps: any) {
    if(nextProps.rows.length > this.props.rows.length){
      this.getDOMNode().scrollTop =nextProps.rows.length * this.props.rowHeight;
    }
    var shouldUpdate = !(nextProps.visibleStart > this.state.displayStart
                        && nextProps.visibleEnd < this.state.displayEnd)
                        || nextProps.totalRows !== this.props.totalRows
                        || nextProps.rowHeight !== this.props.rowHeight
                        || nextProps.columns !== this.props.columns
                        || nextProps.width !== this.props.width
                        || !shallowEqual(nextProps.style, this.props.style);

    if (shouldUpdate) {
      this.setState({
        shouldUpdate: true,
        displayStart: nextProps.displayStart,
        displayEnd: nextProps.displayEnd
      });
    } else {
      this.setState({shouldUpdate: false});
    }
  },

  shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    return !nextState || nextState.shouldUpdate;
  },

  onRows() {
    if (this._currentRowsRange !== {start: 0, end: 0}) {
      this.props.onRows(this._currentRowsRange);
      this._currentRowsRange = {start: 0, end: 0};
    }
  },

  getRows(displayStart: number, displayEnd: number): Array<any> {
    this._currentRowsRange = {start: displayStart, end: displayEnd};
    if (Array.isArray(this.props.rows)) {
      return this.props.rows.slice(displayStart, displayEnd);
    } else {
      return this.props.rows(displayStart, displayEnd);
    }
  },

  setScrollLeft(scrollLeft: number) {
    if (this._currentRowsLength !== 0) {
      for (var i = 0, len = this._currentRowsLength; i < len; i++) {
        if(this.refs[i]) {
          this.refs[i].setScrollLeft(scrollLeft);
        }
      }
    }
  },

  getScroll(): {scrollTop: number; scrollLeft: number} {
    var {scrollTop, scrollLeft} = this.getDOMNode();
    return {scrollTop, scrollLeft};
  },

  onScroll(e: any) {
    this.appendScrollShim();
    var {scrollTop, scrollLeft} = e.target;
    var scroll = {scrollTop, scrollLeft};
    this._scroll = scroll;
    this.props.onScroll(scroll);
  }
});


module.exports = Canvas;
