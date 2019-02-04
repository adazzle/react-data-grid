import React from 'react';
import PropTypes from 'prop-types';

import Row from './Row';
import DefaultRowsContainer from './RowsContainer';
import cellMetaDataShape from 'common/prop-shapes/CellActionShape';
import * as rowUtils from './RowUtils';
import RowGroup from './RowGroup';
import { InteractionMasks } from './masks';
import { getColumnScrollPosition } from './utils/canvasUtils';
import { isFunction } from 'common/utils';
import { EventTypes } from 'common/constants';
require('../../../themes/react-data-grid-core.css');

class Canvas extends React.PureComponent {

  static propTypes = {
    rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    rowHeight: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number,
    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.string,
    className: PropTypes.string,
    rowOverscanStartIdx: PropTypes.number.isRequired,
    rowOverscanEndIdx: PropTypes.number.isRequired,
    rowVisibleStartIdx: PropTypes.number.isRequired,
    rowVisibleEndIdx: PropTypes.number.isRequired,
    colVisibleStartIdx: PropTypes.number.isRequired,
    colVisibleEndIdx: PropTypes.number.isRequired,
    colOverscanStartIdx: PropTypes.number.isRequired,
    colOverscanEndIdx: PropTypes.number.isRequired,
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
    onCellRangeSelectionStarted: PropTypes.func,
    onCellRangeSelectionUpdated: PropTypes.func,
    onCellRangeSelectionCompleted: PropTypes.func,
    onCommit: PropTypes.func.isRequired
  };

  static defaultProps = {
    onRows: () => { },
    selectedRows: [],
    rowScrollTimeout: 0,
    scrollToRowIndex: 0,
    RowsContainer: DefaultRowsContainer
  };

  state = {
    scrollingTimeout: null
  };

  rows = [];
  _currentRowsRange = { start: 0, end: 0 };
  _scroll = { scrollTop: 0, scrollLeft: 0 };

  componentDidMount() {
    this.unsubscribeScrollToColumn = this.props.eventBus.subscribe(EventTypes.SCROLL_TO_COLUMN, this.scrollToColumn);
    this.onRows();
  }

  componentWillUnmount() {
    this._currentRowsRange = { start: 0, end: 0 };
    this._scroll = { scrollTop: 0, scrollLeft: 0 };
    this.rows = [];
    this.unsubscribeScrollToColumn();
  }

  componentDidUpdate(prevProps) {
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

  onScroll = (e) => {
    if (this.canvas !== e.target) {
      return;
    }
    const { scrollLeft, scrollTop } = e.target;
    const scroll = { scrollTop, scrollLeft };
    this._scroll = scroll;
    this.props.onScroll(scroll);
  };

  getClientScrollTopOffset = (node) => {
    const { rowHeight } = this.props;
    const scrollVariation = node.scrollTop % rowHeight;
    return scrollVariation > 0 ? rowHeight - scrollVariation : 0;
  }

  onHitBottomCanvas = () => {
    const { rowHeight } = this.props;
    const node = this.canvas;
    node.scrollTop += rowHeight + this.getClientScrollTopOffset(node);
  }

  onHitTopCanvas = () => {
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

  onHitLeftCanvas = ({ idx }) => {
    this.scrollToColumn(idx);
  }

  onHitRightCanvas = ({ idx }) => {
    this.scrollToColumn(idx);
  }

  getRows = (rowOverscanStartIdx, rowOverscanEndIdx) => {
    this._currentRowsRange = { start: rowOverscanStartIdx, end: rowOverscanEndIdx };
    if (Array.isArray(this.props.rowGetter)) {
      return this.props.rowGetter.slice(rowOverscanStartIdx, rowOverscanEndIdx);
    }
    const rows = [];
    let i = rowOverscanStartIdx;
    while (i < rowOverscanEndIdx) {
      const row = this.props.rowGetter(i);
      let subRowDetails = {};
      if (this.props.getSubRowDetails) {
        subRowDetails = this.props.getSubRowDetails(row);
      }
      rows.push({ row, subRowDetails });
      i++;
    }
    return rows;
  };

  getScroll = () => {
    const { scrollTop, scrollLeft } = this.canvas;
    return { scrollTop, scrollLeft };
  };

  isRowSelected = (idx, row) => {
    // Use selectedRows if set
    if (this.props.selectedRows !== null) {
      const selectedRows = this.props.selectedRows.filter(r => {
        const rowKeyValue = row.get ? row.get(this.props.rowKey) : row[this.props.rowKey];
        return r[this.props.rowKey] === rowKeyValue;
      });
      return selectedRows.length > 0 && selectedRows[0].isSelected;
    }

    // Else use new rowSelection props
    if (this.props.rowSelection) {
      const { keys, indexes, isSelectedKey } = this.props.rowSelection;
      return rowUtils.isRowSelected(keys, indexes, isSelectedKey, row, idx);
    }

    return false;
  };

  setScrollLeft = (scrollLeft) => {
    if (this.interactionMasks && this.interactionMasks.setScrollLeft) {
      this.interactionMasks.setScrollLeft(scrollLeft);
    }

    this.rows.forEach((r, idx) => {
      if (r) {
        const row = this.getRowByRef(idx);
        if (row && row.setScrollLeft) {
          row.setScrollLeft(scrollLeft);
        }
      }
    });
  };

  getRowByRef = (i) => {
    // check if wrapped with React DND drop target
    const wrappedRow = this.rows[i] && this.rows[i].getDecoratedComponentInstance ? this.rows[i].getDecoratedComponentInstance(i) : null;
    if (wrappedRow) {
      return wrappedRow.row;
    }
    return this.rows[i];
  };

  getRowTop = (rowIdx) => {
    const row = this.getRowByRef(rowIdx);
    if (row && isFunction(row.getRowTop)) {
      return row.getRowTop();
    }
    return this.props.rowHeight * rowIdx;
  };

  getRowHeight = (rowIdx) => {
    const row = this.getRowByRef(rowIdx);
    if (row && isFunction(row.getRowHeight)) {
      return row.getRowHeight();
    }
    return this.props.rowHeight;
  };

  getRowColumns = (rowIdx) => {
    const row = this.getRowByRef(rowIdx);
    return row && row.props ? row.props.columns : this.props.columns;
  };

  setCanvasRef = el => {
    this.canvas = el;
  };

  setRowRef = idx => row => {
    this.rows[idx] = row;
  };

  setInteractionMasksRef = el => {
    this.interactionMasks = el;
  };

  renderCustomRowRenderer(props) {
    const { ref, ...otherProps } = props;
    const CustomRowRenderer = this.props.rowRenderer;
    const customRowRendererProps = { ...otherProps, renderBaseRow: (p) => <Row ref={ref} {...p} /> };
    if (CustomRowRenderer.type === Row) {
      // In the case where Row is specified as the custom render, ensure the correct ref is passed
      return <Row {...props} />;
    }
    if (isFunction(CustomRowRenderer)) {
      return <CustomRowRenderer {...customRowRendererProps} />;
    }
    if (React.isValidElement(CustomRowRenderer)) {
      return React.cloneElement(CustomRowRenderer, customRowRendererProps);
    }
  }

  renderGroupRow(props) {
    const { ref, ...rowGroupProps } = props;
    return (
      <RowGroup
        {...rowGroupProps}
        {...props.row.__metaData}
        rowRef={props.ref}
        name={props.row.name}
        eventBus={this.props.eventBus}
        renderer={this.props.rowGroupRenderer}
        renderBaseRow={(p) => <Row ref={ref} {...p} />}
      />
    );
  }

  renderRow = (props) => {
    const { row } = props;
    if (row.__metaData && row.__metaData.getRowRenderer) {
      return row.__metaData.getRowRenderer(this.props, props.idx);
    }
    if (row.__metaData && row.__metaData.isGroup) {
      return this.renderGroupRow(props);
    }
    if (this.props.rowRenderer) {
      return this.renderCustomRowRenderer(props);
    }

    return <Row {...props} />;
  };

  renderPlaceholder = (key, height) => {
    // just renders empty cells
    // if we wanted to show gridlines, we'd need classes and position as with renderScrollingPlaceholder
    return (
      <div key={key} style={{ height }}>
        {
          this.props.columns.map(
            (column, idx) => <div style={{ width: column.width }} key={idx} />
          )
        }
      </div >
    );
  };

  render() {
    const { rowOverscanStartIdx, rowOverscanEndIdx, cellMetaData, columns, colOverscanStartIdx, colOverscanEndIdx, colVisibleStartIdx, colVisibleEndIdx, lastFrozenColumnIndex, expandedRows, rowHeight, rowsCount, totalColumnWidth, totalWidth, height, rowGetter, RowsContainer, contextMenu } = this.props;

    const rows = this.getRows(rowOverscanStartIdx, rowOverscanEndIdx)
      .map((r, idx) => {
        const rowIdx = rowOverscanStartIdx + idx;
        const key = `row-${rowIdx}`;
        return r.row && this.renderRow({
          key,
          ref: this.setRowRef(rowIdx),
          idx: rowIdx,
          rowVisibleStartIdx: this.props.rowVisibleStartIdx,
          rowVisibleEndIdx: this.props.rowVisibleEndIdx,
          row: r.row,
          height: rowHeight,
          onMouseOver: this.onMouseOver,
          columns,
          isSelected: this.isRowSelected(rowIdx, r.row, rowOverscanStartIdx, rowOverscanEndIdx),
          expandedRows,
          cellMetaData,
          subRowDetails: r.subRowDetails,
          colVisibleStartIdx,
          colVisibleEndIdx,
          colOverscanStartIdx,
          colOverscanEndIdx,
          lastFrozenColumnIndex,
          isScrolling: this.props.isScrolling,
          scrollLeft: this._scroll.scrollLeft
        });
      });

    if (rowOverscanStartIdx > 0) {
      rows.unshift(this.renderPlaceholder('top', rowOverscanStartIdx * rowHeight));
    }

    if (rowsCount - rowOverscanEndIdx > 0) {
      rows.push(
        this.renderPlaceholder('bottom', (rowsCount - rowOverscanEndIdx) * rowHeight));
    }

    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      overflowX: 'auto',
      overflowY: 'scroll',
      width: totalWidth,
      height
    };

    return (
      <div
        ref={this.setCanvasRef}
        style={style}
        onScroll={this.onScroll}
        className="react-grid-Canvas">
        <InteractionMasks
          ref={this.setInteractionMasksRef}
          rowGetter={rowGetter}
          rowsCount={rowsCount}
          width={this.props.totalWidth}
          height={height}
          rowHeight={rowHeight}
          columns={columns}
          rowOverscanStartIdx={this.props.rowOverscanStartIdx}
          rowVisibleStartIdx={this.props.rowVisibleStartIdx}
          rowVisibleEndIdx={this.props.rowVisibleEndIdx}
          colVisibleStartIdx={colVisibleStartIdx}
          colVisibleEndIdx={colVisibleEndIdx}
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
          onCellSelected={this.props.onCellSelected}
          onCellDeSelected={this.props.onCellDeSelected}
          onCellRangeSelectionStarted={this.props.onCellRangeSelectionStarted}
          onCellRangeSelectionUpdated={this.props.onCellRangeSelectionUpdated}
          onCellRangeSelectionCompleted={this.props.onCellRangeSelectionCompleted}
          scrollLeft={this._scroll.scrollLeft}
          scrollTop={this._scroll.scrollTop}
          getRowHeight={this.getRowHeight}
          getRowTop={this.getRowTop}
          getRowColumns={this.getRowColumns}
        />
        <RowsContainer id={contextMenu ? contextMenu.props.id : 'rowsContainer'}>
          <div style={{ width: totalColumnWidth }}>{rows}</div>
        </RowsContainer>
      </div>
    );
  }
}

module.exports = Canvas;
