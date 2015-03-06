/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React             = require('react/addons');
var Canvas            = require('./Canvas');
var PropTypes            = React.PropTypes;

var ViewportScroll      = require('./ViewportScrollMixin');



var Viewport = React.createClass({
  mixins: [ViewportScroll],

  propTypes: {
    rowOffsetHeight: PropTypes.number.isRequired,
    totalWidth: PropTypes.number.isRequired,
    columns: PropTypes.shape({
      width: PropTypes.number.isRequired,
      columns: PropTypes.array.isRequired,
    }),
    rows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
    selectedRows: PropTypes.array,
    expandedRows: PropTypes.array,
    rowRenderer: PropTypes.func,
    totalRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    onRows: PropTypes.func,
    onScroll: PropTypes.func
  },
  render(): ?ReactElement {
    var style = {
      padding: 0,
      bottom: 0,
      left: 0,
      right: 0,
      overflow: 'hidden',
      position: 'absolute',
      top: this.props.rowOffsetHeight
    };
    return (
      <div
        className="react-grid-Viewport"
        style={style}>
        <Canvas
          ref="canvas"
          totalWidth={this.props.totalWidth}
          width={this.props.columns.width}
          rows={this.props.rows}
          selectedRows={this.props.selectedRows}
          expandedRows={this.props.expandedRows}
          columns={this.props.columns.columns}
          rowRenderer={this.props.rowRenderer}

          visibleStart={this.state.visibleStart}
          visibleEnd={this.state.visibleEnd}
          displayStart={this.state.displayStart}
          displayEnd={this.state.displayEnd}
          cellMetaData={this.props.cellMetaData}
          totalRows={this.props.totalRows}
          height={this.state.height}
          rowHeight={this.props.rowHeight}
          onScroll={this.onScroll}
          onRows={this.props.onRows}
          />
      </div>
    );
  },

  getScroll(): {scrollLeft: number; scrollTop: number} {
    return this.refs.canvas.getScroll();
  },

  onScroll(scroll: {scrollTop: number; scrollLeft: number}) {
    this.updateScroll(
      scroll.scrollTop, scroll.scrollLeft,
      this.state.height,
      this.props.rowHeight,
      this.props.totalRows
    );

    if (this.props.onScroll) {
      this.props.onScroll({scrollTop: scroll.scrollTop, scrollLeft: scroll.scrollLeft});
    }
  },

  setScrollLeft(scrollLeft: number) {
    this.refs.canvas.setScrollLeft(scrollLeft);
  }
});

module.exports = Viewport;
