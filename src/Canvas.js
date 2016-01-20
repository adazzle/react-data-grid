/* @flow */
/**
 * @jsx React.DOM
 */
"use strict";

var React           = require('react');
var joinClasses     = require('classnames');
var PropTypes       = React.PropTypes;
var cloneWithProps  = require('react/lib/cloneWithProps');
var shallowEqual    = require('react/lib//shallowEqual');
var emptyFunction   = require('react/lib/emptyFunction');
var ScrollShim      = require('./ScrollShim');
var Row             = require('./Row');
var ExcelColumn     = require('./addons/grids/ExcelColumn');

var Canvas = React.createClass({
  mixins: [ScrollShim],

  propTypes: {
    rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    rowHeight: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    displayStart: PropTypes.number.isRequired,
    displayEnd: PropTypes.number.isRequired,
    rowsCount: PropTypes.number.isRequired,
    rowGetter: PropTypes.oneOfType([
      PropTypes.func.isRequired,
      PropTypes.array.isRequired
    ]),
    onRows: PropTypes.func,
    columns: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    rowScrollTimeout: PropTypes.number
  },

  render(): ?ReactElement {
    var displayStart = this.state.displayStart;
    var displayEnd = this.state.displayEnd;
    var rowHeight = this.props.rowHeight;
    var length = this.props.rowsCount;

    var rows = this.getRows(displayStart, displayEnd)
        .map((row, idx) => this.renderRow({
          key: displayStart + idx,
          ref: idx,
          idx: displayStart + idx,
          row: row,
          height: rowHeight,
          columns: this.props.columns,
          isSelected : this.isRowSelected(row),
          expandedRows : this.props.expandedRows,
          cellMetaData : this.props.cellMetaData,
          gridWidth: this.props.totalWidth
        }));

    this._currentRowsLength = rows.length;

    if (displayStart > 0) {
      rows.unshift(this.renderPlaceholder('top', displayStart * rowHeight));
    }

    if (length - displayEnd > 0) {
      rows.push(
        this.renderPlaceholder('bottom', (length - displayEnd) * rowHeight));
    }

    var scrollbarWidth = 0;
    if(this.isMounted()){
      // Get the scrollbar width
     var canvas = this.getDOMNode();
     scrollbarWidth  = canvas.offsetWidth - canvas.clientWidth;
    }


    var style = {
      position: 'absolute',
      top: 0,
      left: 0,
      overflowX: 'auto',
      overflowY: 'scroll',
      width: this.props.totalWidth + scrollbarWidth,
      height: this.props.height,
      transform: 'translate3d(0, 0, 0)'
    };


    return (
      <div
        style={style}
        onScroll={this.onScroll}
        className={joinClasses("react-grid-Canvas", this.props.className, {opaque : this.props.cellMetaData.selected && this.props.cellMetaData.selected.active})}>
        <div style={{width: this.props.width, overflow: 'hidden'}}>
          {rows}
        </div>
      </div>
    );
  },

  renderRow(props: any) {
    if(this.state.scrollingTimeout !== null) {
      //in the midst of a rapid scroll, so we render placeholders
      //the actual render is then queued (through a timeout)
      //this avoids us redering a bunch of rows that a user is trying to scroll past
      return this.renderScrollingPlaceholder(props)
    }
    var RowsRenderer = this.props.rowRenderer;
    if(typeof RowsRenderer === 'function') {
      return <RowsRenderer {...props}/>;
    }
    else if (React.isValidElement(this.props.rowRenderer)) {
      return cloneWithProps(this.props.rowRenderer, props);
    }
  },
  renderScrollingPlaceholder(props: any): ?ReactElement {
    //here we are just rendering empty cells
    //we may want to allow a user to inject this, and/or just render the cells that are in view
    //for now though we essentially are doing a (very lightweight) row + cell with empty content
    return (
      <div key={props.key} style={{height: props.height, overflow:'hidden'}} className="react-grid-Row">
        {this.props.columns.map(
          (col, idx) => <div style={{width: col.width, height: props.height, left: col.left, position:'absolute'}} key={idx} className="react-grid-Cell"/>
        )}
      </div>
    );
  },
  renderPlaceholder(key: string, height: number): ?ReactElement {
    //just renders empty cells
    //if we wanted to show gridlines, we'd need classes and position as with renderScrollingPlaceholder
    return (
      <div key={key} style={{height: height}}>
        {this.props.columns.map(
          (column, idx) => <div style={{width: column.width}} key={idx} />
		)}
      </div>
    );
  },

  getDefaultProps() {
    return {
      rowRenderer: Row,
      onRows: emptyFunction,
      rowScrollTimeout: 0
    };
  },

  isRowSelected(row): boolean{
   var selectedRows = this.props.selectedRows.filter(r => {
     var rowKeyValue = row.get ? row.get(this.props.rowKey) : row[this.props.rowKey]
     return r[this.props.rowKey] === rowKeyValue;
   });
   return selectedRows.length > 0 && selectedRows[0].isSelected;
  },

  //TODO shouldnt this go in state?
  _currentRowsLength : 0,
  _currentRowsRange : { start: 0, end: 0 },
  _scroll : { scrollTop : 0, scrollLeft: 0 },

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
    if(nextProps.rowsCount > this.props.rowsCount){
      this.getDOMNode().scrollTop =nextProps.rowsCount * this.props.rowHeight;
    }

    if (nextProps.displayStart !== this.state.displayStart
    || nextProps.displayEnd !== this.state.displayEnd) {
      this.setState({
        displayStart: nextProps.displayStart,
        displayEnd: nextProps.displayEnd
      });
    }
  },

  shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    let shouldUpdate=nextState.displayStart !== this.state.displayStart
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

  onRows() {
    if (this._currentRowsRange !== {start: 0, end: 0}) {
      this.props.onRows(this._currentRowsRange);
      this._currentRowsRange = {start: 0, end: 0};
    }
  },

  getRows(displayStart: number, displayEnd: number): Array<any> {
    this._currentRowsRange = {start: displayStart, end: displayEnd};
    if (Array.isArray(this.props.rowGetter)) {
      return this.props.rowGetter.slice(displayStart, displayEnd);
    } else {
      var rows = [];
      for (var i = displayStart; i < displayEnd; i++){
        rows.push(this.props.rowGetter(i));
      }
      return rows;
    }
  },

  setScrollLeft(scrollLeft: number) {
    if (this._currentRowsLength !== 0) {
      if(!this.refs) return;
      for (var i = 0, len = this._currentRowsLength; i < len; i++) {
        if(this.refs[i] && this.refs[i].setScrollLeft) {
          this.refs[i].setScrollLeft(scrollLeft, this.props.totalWidth);
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
    //check how far we have scrolled, and if this means we are being taken out of range
    let scrollYRange = Math.abs(this._scroll.scrollTop - scroll.scrollTop)/this.props.rowHeight;
    let scrolledOutOfRange = scrollYRange > (this.props.displayEnd - this.props.displayStart);

    this._scroll = scroll;
    this.props.onScroll(scroll);
    //if we go out of range, we queue the actual render, just rendering cheap placeholders
    //avoiding rendering anything expensive while a user scrolls down
    if(scrolledOutOfRange && this.props.rowScrollTimeout > 0) {
      var scrollTO = this.state.scrollingTimeout;
      if(scrollTO) {
        clearTimeout(scrollTO);
      }
      //queue up, and set state to clear the TO so we render the rows (not placeholders)
      scrollTO = setTimeout(() => {
        if(this.state.scrollingTimeout !== null) {

          this.setState({scrollingTimeout:null})
        }
      }, this.props.rowScrollTimeout);

      this.setState({scrollingTimeout: scrollTO});
    }
  },


});


module.exports = Canvas;
