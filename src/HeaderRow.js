/* @flow */
/**
 * @jsx React.DOM
 */
"use strict";

var React             = require('react/addons');
var PropTypes         = React.PropTypes;
var shallowEqual      = require('./shallowEqual');
var HeaderCell        = require('./HeaderCell');
var getScrollbarSize  = require('./getScrollbarSize');
var ExcelColumn  = require('./addons/grids/ExcelColumn');


class HeaderRowStyle {
  overflow: string;
  width: string;
  height: number;
  position: string;
};

var HeaderRow = React.createClass({

  propTypes: {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.number.isRequired,
    columns: PropTypes.arrayOf(ExcelColumn).isRequired,
    onColumnResize: PropTypes.func,
    style: PropTypes.shape(HeaderRowStyle)
  },

  render(): ?ReactElement {
    var cellsStyle = {
      width: this.props.width ? (this.props.width + getScrollbarSize()) : '100%',
      height: this.props.height,
      whiteSpace: 'nowrap',
      overflowX: 'hidden',
      overflowY: 'hidden'
    };

    var cells = this.getCells();
    return (
      <div {...this.props}  className="react-grid-HeaderRow">
        <div style={cellsStyle}>
          {cells}
        </div>
      </div>
    );
  },

  getCells(): Array<HeaderCell> {
    var cells = [];
    var lockedCells = [];

    for (var i = 0, len = this.props.columns.length; i < len; i++) {
      var column = this.props.columns[i];
      var cell = (
        <HeaderCell
          ref={i}
          key={i}
          height={this.props.height}
          column={column}
          renderer={this.props.headerCellRenderer || column.headerRenderer || this.props.cellRenderer}
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
    for (var i = 0, len = this.props.columns.length; i < len; i++) {
      if (this.props.columns[i].locked) {
        this.refs[i].setScrollLeft(scrollLeft);
      }
    }
  },


  shouldComponentUpdate(nextProps: {width: ?(number | string); height: number; columns: Array<ExcelColumn>; style: ?HeaderRowStyle; onColumnResize: ?any}): boolean {
    return (
      nextProps.width !== this.props.width
      || nextProps.height !== this.props.height
      || nextProps.columns !== this.props.columns
      || !shallowEqual(nextProps.style, this.props.style)
    );
  },

  getStyle(): HeaderRowStyle {
    return {
      overflow: 'hidden',
      width: '100%',
      height: this.props.height,
      position: 'absolute'
    };
  }

});

module.exports = HeaderRow;
