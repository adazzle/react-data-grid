const React = require('react');
import PropTypes from 'prop-types';
const Row = require('./Row');
const cellMetaDataShape = require('./PropTypeShapes/CellMetaDataShape');
import * as rowUtils from './RowUtils';
import RowsContainer from './RowsContainer';
import RowGroup from './RowGroup';
import { InteractionMasks } from './masks';
import { getColumnScrollPosition } from './utils/canvasUtils';
import { EventTypes } from './constants';
require('../../../themes/react-data-grid-core.css');

class Canvas extends React.Component {
  static displayName = 'Canvas';

  static propTypes = {
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
    isScrolling: PropTypes.bool,
    length: PropTypes.number,
    enableCellSelect: PropTypes.bool.isRequired,
    enableCellAutoFocus: PropTypes.bool.isRequired,
    cellNavigationMode: PropTypes.string.isRequired,
    eventBus: PropTypes.object.isRequired,
    onCheckCellIsEditable: PropTypes.func,
    onCellCopyPaste: PropTypes.func,
    onGridRowsUpdated: PropTypes.func.isRequired,
    onDragHandleDoubleClick: PropTypes.func.isRequired,
    onCellSelected: PropTypes.func,
    onCellDeSelected: PropTypes.func,
    onCommit: PropTypes.func.isRequired
  };

  static defaultProps = {
    rowRenderer: Row,
    onRows: () => { },
    selectedRows: [],
    rowScrollTimeout: 0,
    scrollToRowIndex: 0
  };

  state = {
    scrollingTimeout: null
  };

  rows = [];
  _currentRowsLength = 0;
  _currentRowsRange = { start: 0, end: 0 };
  _scroll = { scrollTop: 0, scrollLeft: 0 };

  componentDidMount() {
    this.unsubscribeScrollToColumn = this.props.eventBus.subscribe(EventTypes.SCROLL_TO_COLUMN, this.scrollToColumn);
    this.onRows();
  }

  componentWillUnmount() {
    this._currentRowsLength = 0;
    this._currentRowsRange = { start: 0, end: 0 };
    this._scroll = { scrollTop: 0, scrollLeft: 0 };
    this.rows = [];
    this.unsubscribeScrollToColumn();
  }

  componentDidUpdate(prevProps) {
    if (this._scroll.scrollTop !== 0 && this._scroll.scrollLeft !== 0) {
      this.setScrollLeft(this._scroll.scrollLeft);
    }

    const { scrollToRowIndex } = this.props;
    if (prevProps.scrollToRowIndex !== scrollToRowIndex && scrollToRowIndex !== 0) {
      this.scrollToRow(scrollToRowIndex);
    }
    this.onRows();
  }

  onRows = () => {
    if (this._currentRowsRange !== { start: 0, end: 0 }) {
      this.props.onRows(this._currentRowsRange);
      this._currentRowsRange = { start: 0, end: 0 };
    }
  };

  scrollToRow = (scrollToRowIndex) => {
    const { rowHeight, rowsCount, height } = this.props;
    this.canvas.scrollTop = Math.min(
      scrollToRowIndex * rowHeight,
      rowsCount * rowHeight - height
    );
  };

  onFocusInteractionMask = (focus) => {
    const { scrollTop, scrollLeft } = this._scroll;
    focus();
    if (this.canvas) {
      this.canvas.scrollTop = scrollTop;
      this.canvas.scrollLeft = scrollLeft;
    }
  };

  onScroll = (e) => {
    if (this.canvas !== e.target) {
      return;
    }
    const { scrollLeft, scrollTop } = e.target;
    const scroll = { scrollTop, scrollLeft };
    this._scroll = scroll;
    this.props.onScroll(scroll);
  };

  getClientScrollTopOffset(node) {
    const { rowHeight } = this.props;
    const scrollVariation = node.scrollTop % rowHeight;
    return scrollVariation > 0 ? rowHeight - scrollVariation : 0;
  }

  onHitBottomCanvas = () =>  {
    const { rowHeight } = this.props;
    const node = this.canvas;
    node.scrollTop += rowHeight + this.getClientScrollTopOffset(node);
  }

  onHitTopCanvas = () =>  {
    const { rowHeight } = this.props;
    const node = this.canvas;
    node.scrollTop -= (rowHeight - this.getClientScrollTopOffset(node));
  }

  scrollToColumn = (idx) => {
    const { scrollLeft, clientWidth } = this.canvas;
    const newScrollLeft = getColumnScrollPosition(this.props.columns, idx, scrollLeft, clientWidth);

    if (newScrollLeft != null) {
      this.canvas.scrollLeft = scrollLeft + newScrollLeft;
    }
  }

  onHitLeftCanvas = ({ idx }) =>  {
    this.scrollToColumn(idx);
  }

  onHitRightCanvas = ({ idx }) =>  {
    this.scrollToColumn(idx);
  }

  getRows = (displayStart, displayEnd) => {
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
  };

  // getScrollbarWidth = () => {
  //   // Get the scrollbar width
  //   const scrollbarWidth = this.canvas.offsetWidth - this.canvas.clientWidth;
  //   return scrollbarWidth;
  // };

  getScroll = () => {
    const { scrollTop, scrollLeft } = this.canvas;
    return { scrollTop, scrollLeft };
  };

  isRowSelected = (idx, row) => {
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
      let { keys, indexes, isSelectedKey } = this.props.rowSelection;
      return rowUtils.isRowSelected(keys, indexes, isSelectedKey, row, idx);
    }

    return false;
  };

  setScrollLeft = (scrollLeft) => {
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
  };

  getRowByRef = (i) => {
    // check if wrapped with React DND drop target
    let wrappedRow = this.rows[i].getDecoratedComponentInstance ? this.rows[i].getDecoratedComponentInstance(i) : null;
    if (wrappedRow) {
      return wrappedRow.row;
    }
    return this.rows[i];
  };

  setCanvasRef = (canvas) => {
    // It is important to define ref callback as a bound method
    // https://reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs
    this.canvas = canvas;
  };

  renderRow = (props) => {
    let row = props.row;
    if (row.__metaData && row.__metaData.getRowRenderer) {
      return row.__metaData.getRowRenderer(this.props, props.idx);
    }
    if (row.__metaData && row.__metaData.isGroup) {
      return (<RowGroup
        {...props}
        {...row.__metaData}
        name={row.name}
        eventBus={this.props.eventBus}
        renderer={this.props.rowGroupRenderer} />);
    }
    let RowsRenderer = this.props.rowRenderer;
    if (typeof RowsRenderer === 'function') {
      return <RowsRenderer {...props} />;
    }

    if (React.isValidElement(this.props.rowRenderer)) {
      return React.cloneElement(this.props.rowRenderer, props);
    }
  };

  renderPlaceholder = (key, height) => {
    // just renders empty cells
    // if we wanted to show gridlines, we'd need classes and position as with renderScrollingPlaceholder
    return (<div key={key} style={{ height: height }}>
      {
        this.props.columns.map(
          (column, idx) => <div style={{ width: column.width }} key={idx} />
        )
      }
    </div >
    );
  };

  render() {
    const { displayStart, displayEnd, cellMetaData, columns, colDisplayStart, colDisplayEnd, colVisibleStart, colVisibleEnd, expandedRows, rowHeight, rowsCount, width, height, rowGetter } = this.props;

    const rows = this.getRows(displayStart, displayEnd)
      .map((r, idx) => this.renderRow({
        key: `row-${displayStart + idx}`,
        ref: (node) => this.rows[idx] = node,
        idx: displayStart + idx,
        visibleStart: this.props.visibleStart,
        visibleEnd: this.props.visibleEnd,
        row: r.row,
        height: rowHeight,
        onMouseOver: this.onMouseOver,
        columns,
        isSelected: this.isRowSelected(displayStart + idx, r.row, displayStart, displayEnd),
        expandedRows,
        cellMetaData,
        subRowDetails: r.subRowDetails,
        colVisibleStart,
        colVisibleEnd,
        colDisplayStart,
        colDisplayEnd,
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

    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      overflowX: 'auto',
      overflowY: 'scroll',
      width: this.props.totalWidth,
      height
    };

    return (
        <div
          ref={this.setCanvasRef}
          style={style}
          onScroll={this.onScroll}
          className="react-grid-Canvas">
          <InteractionMasks
            rowGetter={rowGetter}
            rowsCount={rowsCount}
            width={this.props.totalWidth}
            height={height}
            rowHeight={rowHeight}
            columns={columns}
            visibleStart={this.props.visibleStart}
            visibleEnd={this.props.visibleEnd}
            colVisibleStart={colVisibleStart}
            colVisibleEnd={colVisibleEnd}
            enableCellSelect={this.props.enableCellSelect}
            enableCellAutoFocus={this.props.enableCellAutoFocus}
            cellNavigationMode={this.props.cellNavigationMode}
            eventBus={this.props.eventBus}
            contextMenu={this.props.contextMenu}
            onHitBottomBoundary={this.onHitBottomCanvas}
            onHitTopBoundary={this.onHitTopCanvas}
            onHitLeftBoundary={this.onHitLeftCanvas}
            onHitRightBoundary={this.onHitRightCanvas}
            onCommit={this.props.onCommit}
            onCheckCellIsEditable={this.props.onCheckCellIsEditable}
            onCellCopyPaste={this.props.onCellCopyPaste}
            onGridRowsUpdated={this.props.onGridRowsUpdated}
            onDragHandleDoubleClick={this.props.onDragHandleDoubleClick}
            onBeforeFocus={this.onFocusInteractionMask}
            onCellSelected={this.props.onCellSelected}
            onCellDeSelected={this.props.onCellDeSelected}
            scrollLeft={this._scroll.scrollLeft}
          />
          <RowsContainer
            width={width}
            rows={rows}
            contextMenu={this.props.contextMenu}
          />
        </div>
    );
  }
}

module.exports = Canvas;
