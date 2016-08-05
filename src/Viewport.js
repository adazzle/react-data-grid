const React                = require('react');
const Canvas               = require('./Canvas');
const ViewportScroll       = require('./ViewportScrollMixin');
const cellMetaDataShape    = require('./PropTypeShapes/CellMetaDataShape');
const PropTypes            = React.PropTypes;

const Viewport = React.createClass({
  mixins: [ViewportScroll],

  propTypes: {
    rowOffsetHeight: PropTypes.number.isRequired,
    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    columnMetrics: PropTypes.object.isRequired,
    rowGetter: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
    selectedRows: PropTypes.array,
    rowSelection: React.PropTypes.shape({
      enableShiftSelect: React.PropTypes.bool,
      onRowsSelected: React.PropTypes.func,
      onRowsDeselected: React.PropTypes.func,
      showCheckbox: React.PropTypes.bool,
      selectBy: React.PropTypes.oneOfType([
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
      ]).isRequired
    }),
    expandedRows: PropTypes.array,
    rowRenderer: PropTypes.func,
    rowsCount: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    onRows: PropTypes.func,
    onScroll: PropTypes.func,
    minHeight: PropTypes.number,
    cellMetaData: PropTypes.shape(cellMetaDataShape),
    rowKey: PropTypes.string.isRequired,
    rowScrollTimeout: PropTypes.number,
    contextMenu: PropTypes.element,
    getSubRowDetails: PropTypes.func,
    rowGroupRenderer: PropTypes.func
  },

  onScroll(scroll: {scrollTop: number; scrollLeft: number}) {
    this.updateScroll(
      scroll.scrollTop, scroll.scrollLeft,
      this.state.height,
      this.props.rowHeight,
      this.props.rowsCount
    );

    if (this.props.onScroll) {
      this.props.onScroll({scrollTop: scroll.scrollTop, scrollLeft: scroll.scrollLeft});
    }
  },

  getScroll(): {scrollLeft: number; scrollTop: number} {
    return this.refs.canvas.getScroll();
  },

  setScrollLeft(scrollLeft: number) {
    this.refs.canvas.setScrollLeft(scrollLeft);
  },

  render(): ?ReactElement {
    let style = {
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
          rowKey={this.props.rowKey}
          totalWidth={this.props.totalWidth}
          width={this.props.columnMetrics.width}
          rowGetter={this.props.rowGetter}
          rowsCount={this.props.rowsCount}
          selectedRows={this.props.selectedRows}
          expandedRows={this.props.expandedRows}
          columns={this.props.columnMetrics.columns}
          rowRenderer={this.props.rowRenderer}
          displayStart={this.state.displayStart}
          displayEnd={this.state.displayEnd}
          cellMetaData={this.props.cellMetaData}
          height={this.state.height}
          rowHeight={this.props.rowHeight}
          onScroll={this.onScroll}
          onRows={this.props.onRows}
          rowScrollTimeout={this.props.rowScrollTimeout}
          contextMenu={this.props.contextMenu}
          rowSelection={this.props.rowSelection}
          getSubRowDetails={this.props.getSubRowDetails}
          rowGroupRenderer={this.props.rowGroupRenderer}
        />
      </div>
    );
  }
});

module.exports = Viewport;
