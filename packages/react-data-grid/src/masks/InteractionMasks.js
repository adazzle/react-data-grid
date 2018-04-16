import React from 'react';
import PropTypes from 'prop-types';

import SelectionMask from './SelectionMask';
import DragHandle from './DragHandle';
import EditorContainer from '../editors/EditorContainer';
import { isKeyPrintable, isCtrlKeyHeldDown } from '../utils/keyboardUtils';
import {
  getSelectedDimensions,
  getSelectedCellValue,
  getSelectedRowIndex,
  getSelectedRow,
  getSelectedColumn,
  getNextSelectedCellPosition,
  isSelectedCellEditable
} from '../utils/SelectedCellUtils';
import isFunction from '../utils/isFunction';
import * as AppConstants from '../AppConstants';
import * as keyCodes from '../KeyCodes';

const SCROLL_CELL_BUFFER = 2;

class InteractionMasks extends React.Component {
  static propTypes = {
    colVisibleStart: PropTypes.number,
    colVisibleEnd: PropTypes.number,
    visibleStart: PropTypes.number,
    visibleEnd: PropTypes.number,
    columns: PropTypes.array,
    selectedPosition: PropTypes.object,
    copiedPosition: PropTypes.object,
    draggedPosition: PropTypes.object,
    rowHeight: PropTypes.number,
    toggleCellEdit: PropTypes.func,
    selectCell: PropTypes.func,
    onHitBottomBoundary: PropTypes.func,
    onHitTopBoundary: PropTypes.func,
    onHitRightBoundary: PropTypes.func,
    onHitLeftBoundary: PropTypes.func,
    onCommit: PropTypes.func,
    onCommitCancel: PropTypes.func,
    isEditorEnabled: PropTypes.bool,
    firstEditorKeyPress: PropTypes.number,
    rowGetter: PropTypes.func.isRequired,
    rowsCount: PropTypes.func.isRequired,
    enableCellSelect: PropTypes.bool.isRequired,
    onCheckCellIsEditable: PropTypes.func,
    onCellCopyPaste: PropTypes.func,
    onGridRowsUpdated: PropTypes.func.isRequired,
    cellNavigationMode: PropTypes.oneOf(['none', 'loopOverRow', 'changeRow']).isRequired,
    copyCell: PropTypes.func.isRequired,
    cancelCopyCell: PropTypes.func.isRequired,
    dragStart: PropTypes.func.isRequired,
    dragEnd: PropTypes.func.isRequired,
    onCellsDragged: PropTypes.func,
    onDragHandleDoubleClick: PropTypes.func
  };

  state = {
    lockedPosition: null
  };

  componentDidUpdate(prevProps) {
    const { selectedPosition } = this.props;
    if (selectedPosition !== prevProps.selectedPosition && selectedPosition.rowIdx !== -1 && selectedPosition.idx !== -1) {
      this.focus();
    }
  }

  onKeyDown = e => {
    e.preventDefault();
    // TODO: cleanup
    if (isCtrlKeyHeldDown(e)) {
      this.onPressKeyWithCtrl(e);
    } else if (e.keyCode === keyCodes.Escape) {
      this.onPressEscape(e);
    } else if (e.keyCode === keyCodes.Tab) {
      this.onPressTab(e);
    } else if (this.isKeyboardNavigationEvent(e)) {
      const keyNavAction = this.getKeyNavActionFromEvent(e);
      this.moveUsingKeyboard(keyNavAction);
    } else if (isKeyPrintable(e.keyCode) || e.keyCode === keyCodes.Backspace || e.keyCode === keyCodes.Delete) {
      this.toggleCellEdit(e);
    }
  };

  onKeyUp = (e) => {
    if (this.isKeyboardNavigationEvent(e)) {
      this._enableSelectionAnimation = false;
      // set selected state from temporary srolling metrics
      if (this._scrollingMetrics != null) {
        this.selectCell(this._scrollingMetrics.position);
      }
    }
  }

  toggleCellEdit = (e) => {
    const { props } = this;
    if (isSelectedCellEditable(props)) {
      const { isEditorEnabled, toggleCellEdit } = props;
      const enableEdit = !isEditorEnabled;
      toggleCellEdit(enableEdit, e.key);
      if (enableEdit === false) {
        this.focus();
      }
    }
  };

  onPressKeyWithCtrl = ({ keyCode }) => {
    if (this.copyPasteEnabled()) {
      if (keyCode === keyCodes.c) {
        const value = getSelectedCellValue(this.props);
        this.handleCopy({ value });
      } else if (keyCode === keyCodes.v) {
        this.handlePaste();
      }
    }
  };

  onPressEscape = () => {
    if (this.copyPasteEnabled()) {
      this.handleCancelCopy();
      // this.props.toggleCellEdit(false);
      // this.focus();
    }
  };

  onPressTab = (e) => {
    if (e.shiftKey === true) {
      // this.move();
    } else {
      // this.move();
    }
  };

  copyPasteEnabled = () => {
    return this.props.onCellCopyPaste !== null && isSelectedCellEditable(this.props);
  };

  handleCopy = ({ value }) => {
    const { copyCell, selectedPosition } = this.props;
    const { rowIdx, idx } = selectedPosition;
    copyCell({ rowIdx, idx, value });
  };

  handleCancelCopy = () => {
    this.props.cancelCopyCell();
  };

  handlePaste = () => {
    const { props } = this;
    const { selectedPosition: { rowIdx: toRow }, copiedPosition, onCellCopyPaste, onGridRowsUpdated } = props;

    if (copiedPosition == null) {
      return;
    }

    const { key: cellKey } = getSelectedColumn(props);
    const { rowIdx: fromRow, value: textToCopy } = copiedPosition;

    if (isFunction(onCellCopyPaste)) {
      onCellCopyPaste({
        cellKey,
        rowIdx,
        fromRow,
        toRow,
        value: textToCopy
      });
    }

    onGridRowsUpdated(cellKey, toRow, toRow, { [cellKey]: textToCopy }, AppConstants.UpdateActions.COPY_PASTE, fromRow);
  };

  isKeyboardNavigationEvent(e) {
    return this.getKeyNavActionFromEvent(e) != null;
  }

  getKeyNavActionFromEvent(e) {
    const { visibleEnd, visibleStart, colVisibleEnd, colVisibleStart, onHitBottomBoundary, onHitRightBoundary, onHitLeftBoundary, onHitTopBoundary } = this.props;
    const keyNavActions = {
      ArrowDown: {
        getNext: current => ({ ...current, rowIdx: current.rowIdx + 1 }),
        isCellAtBoundary: cell => cell.rowIdx >= visibleEnd - SCROLL_CELL_BUFFER,
        onHitBoundary: onHitBottomBoundary
        // getBoundaryDimensions: () => this.getSelectedCellDimensions(),
        // scrollReadyCondition: scrollMetrics => scrollMetrics.visibleEnd === visibleEnd - 1
      },
      ArrowUp: {
        getNext: current => ({ ...current, rowIdx: current.rowIdx - 1 }),
        isCellAtBoundary: cell => cell.rowIdx !== 0 && cell.rowIdx <= visibleStart - 1,
        onHitBoundary: onHitTopBoundary
        // onHitBoundary: () => {
        //   this._enableSelectionAnimation = !this.isScrollingWithKeyboard() ? false : true;
        //   onHitTopBoundary();
        // },
        // getBoundaryDimensions: () => ({ ...this.getSelectedCellDimensions(), top: 0 }),
        // scrollReadyCondition: scrollMetrics => scrollMetrics.visibleStart === visibleStart
      },
      ArrowRight: {
        getNext: current => ({ ...current, idx: current.idx + 1 }),
        isCellAtBoundary: cell => cell.idx !== 0 && cell.idx >= colVisibleEnd - 1,
        onHitBoundary: onHitRightBoundary
        // getBoundaryDimensions: () => this.getSelectedCellDimensions()
      },
      ArrowLeft: {
        getNext: current => ({ ...current, idx: current.idx - 1 }),
        isCellAtBoundary: cell => cell.idx !== 0 && cell.idx <= colVisibleStart + 1,
        onHitBoundary: onHitLeftBoundary
        // getBoundaryDimensions: () => this.getSelectedCellDimensions()
      }
    };
    return keyNavActions[e.key];
  }

  moveUsingKeyboard(keyNavAction) {
    // const { getNext, isCellAtBoundary, onHitBoundary, getBoundaryDimensions } = keyNavAction;
    // this._enableSelectionAnimation = true;
    // const currentPosition = this.getSelectedCellPosition();
    // const next = getNext(currentPosition);
    // if (isCellAtBoundary(next)) {
    //   onHitBoundary(next);
    //   this.setScrollingMetrics(next, getBoundaryDimensions());
    // } else {
    //   this.resetScrollingMetrics();
    //   this.selectCell(next);
    // }

    const { getNext, isCellAtBoundary, onHitBoundary } = keyNavAction;
    const currentPosition = this.getSelectedCellPosition();
    const nextPosition = getNext(currentPosition);
    const { changeRowOrColumn, ...next } = getNextSelectedCellPosition(this.props, nextPosition);

    if (isCellAtBoundary(next) || changeRowOrColumn) {
      onHitBoundary(next);
    }

    this.selectCell(next);
  }

  isCellWithinBounds = ({ idx, rowIdx }) => {
    const { columns, rowsCount } = this.props;
    return rowIdx >= 0 && rowIdx < rowsCount && idx >= 0 && idx < columns.length;
  };

  isGridSelected = () => {
    return this.isCellWithinBounds(this.props.selectedPosition);
  };

  isReadyToScrollWithKeyboard = (scrollReadyCondition) => {
    if (this._scrollingMetrics == null) {
      return true;
    }
    return this._scrollingMetrics && scrollReadyCondition(this._scrollingMetrics) === true;
  };

  isScrollingWithKeyboard() {
    return this._scrollingMetrics != null;
  }

  focus = () => {
    if (this.node && document.activeElement !== this.node) {
      this.node.focus();
    }
  };

  getSelectedCellDimensions() {
    return this._scrollingMetrics ? this._scrollingMetrics.dimensions : getSelectedDimensions(this.props);
  }

  getSelectedCellPosition() {
    return this._scrollingMetrics ? this._scrollingMetrics.position : this.props.selectedPosition;
  }

  selectCell = cell => {
    if (this.isCellWithinBounds(cell)) {
      this.props.selectCell(cell);
    }
  };

  setScrollingMetrics(next, dimensions) {
    const { visibleEnd, visibleStart } = this.props;
    this._scrollingMetrics = {
      dimensions,
      position: next,
      visibleEnd,
      visibleStart
    };
  }

  resetScrollingMetrics() {
    this._scrollingMetrics = null;
  }

  dragEnabled = () => {
    const { onGridRowsUpdated, onCellsDragged } = this.props;
    return isSelectedCellEditable(this.props) && (isFunction(onGridRowsUpdated) || isFunction(onCellsDragged));
  };

  handleDragStart = (e) => {
    const { selectedPosition: { idx, rowIdx }, dragStart } = this.props;
    // To prevent dragging down/up when reordering rows.
    const isViewportDragging = e && e.target && e.target.className;
    if (idx > -1 && isViewportDragging) {
      e.dataTransfer.effectAllowed = 'copy';
      e.dataTransfer.setData('text/plain', JSON.stringify({ idx, rowIdx }));
      dragStart({ idx, rowIdx });
    }
  };

  handleDragEnd = () => {
    const { selectedPosition: { rowIdx }, draggedPosition, onCellsDragged, onGridRowsUpdated, dragEnd } = this.props;
    const column = getSelectedColumn(this.props);
    const value = getSelectedCellValue(this.props);
    if (draggedPosition && column) {
      const cellKey = column.key;
      const fromRow = rowIdx < draggedPosition.overRowIdx ? rowIdx : draggedPosition.overRowIdx;
      const toRow = rowIdx > draggedPosition.overRowIdx ? rowIdx : draggedPosition.overRowIdx;
      if (isFunction(onCellsDragged)) {
        onCellsDragged({ cellKey, fromRow, toRow, value });
      }
      if (isFunction(onGridRowsUpdated)) {
        onGridRowsUpdated(cellKey, fromRow, toRow, { [cellKey]: value }, AppConstants.UpdateActions.CELL_DRAG);
      }
      dragEnd();
    }
  };

  onDragHandleDoubleClick = () => {
    const { selectedPosition: { idx, rowIdx }, onDragHandleDoubleClick } = this.props;
    const rowData = getSelectedRow(this.props);
    onDragHandleDoubleClick({ idx, rowIdx, rowData });
  };

  render() {
    const { isEditorEnabled, firstEditorKeyPress, onCommit, onCommitCancel } = this.props;
    const { width, left, top, height } = this.getSelectedCellDimensions();
    const value = getSelectedCellValue(this.props);
    const rowIdx = getSelectedRowIndex(this.props);
    return (
      <div
        ref={node => {
          this.node = node;
        }}
        tabIndex="0"
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
      >
        {!isEditorEnabled && this.isGridSelected() && (
          <SelectionMask
            {...this.props}
            width={width}
            left={left}
            top={top}
            height={height}
            isAnimating={this._enableSelectionAnimation === true}
            isFixed={this.isScrollingWithKeyboard()}
          >
            {
              this.dragEnabled(this.props) &&
              <DragHandle
                onDragStart={this.handleDragStart}
                onDragEnd={this.handleDragEnd}
                onDoubleClick={this.onDragHandleDoubleClick}
              />
            }
          </SelectionMask>
        )}
        {isEditorEnabled && (
          <EditorContainer
            width={width}
            left={left}
            top={top}
            height={height}
            rowData={getSelectedRow(this.props)}
            column={getSelectedColumn(this.props)}
            rowIdx={rowIdx}
            value={value}
            firstEditorKeyPress={firstEditorKeyPress}
            onCommit={onCommit}
            onCommitCancel={onCommitCancel}
          />
        )}
      </div>
    );
  }
}

export default InteractionMasks;
