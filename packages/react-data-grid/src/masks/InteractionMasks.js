import React, { isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';

import SelectionMask from './SelectionMask';
import SelectionRangeMask from './SelectionRangeMask';
import CopyMask from './CopyMask';
import DragMask from './DragMask';
import DragHandle from './DragHandle';
import EditorContainer from 'common/editors/EditorContainer';
import { UpdateActions } from 'common/constants';
import { isKeyPrintable, isCtrlKeyHeldDown } from 'common/utils/keyboardUtils';
import {
  getSelectedDimensions,
  getSelectedCellValue,
  getSelectedRow,
  getSelectedColumn,
  getNextSelectedCellPosition,
  canExitGrid,
  isSelectedCellEditable,
  selectedRangeIsSingleCell
} from '../utils/SelectedCellUtils';
import { isFunction } from 'common/utils';
import {getSize, getColumn, isFrozen} from '../ColumnUtils';
import * as keyCodes from '../KeyCodes';
import { CellNavigationMode, EventTypes } from 'common/constants';

require('../../../../themes/interaction-masks.css');

const SCROLL_CELL_BUFFER = 2;

class InteractionMasks extends React.Component {
  static dispplayName = 'InteractionMasks';

  static propTypes = {
    colVisibleStartIdx: PropTypes.number.isRequired,
    colVisibleEndIdx: PropTypes.number.isRequired,
    rowVisibleStartIdx: PropTypes.number.isRequired,
    rowVisibleEndIdx: PropTypes.number.isRequired,
    rowOverscanStartIdx: PropTypes.number.isRequired,
    columns: PropTypes.array,
    width: PropTypes.number,
    rowHeight: PropTypes.number.isRequired,
    rowGetter: PropTypes.func.isRequired,
    rowsCount: PropTypes.number.isRequired,
    enableCellSelect: PropTypes.bool.isRequired,
    enableCellAutoFocus: PropTypes.bool.isRequired,
    cellNavigationMode: PropTypes.oneOf([
      CellNavigationMode.NONE,
      CellNavigationMode.LOOP_OVER_ROW,
      CellNavigationMode.CHANGE_ROW
    ]).isRequired,
    eventBus: PropTypes.object.isRequired,
    contextMenu: PropTypes.element,
    onCheckCellIsEditable: PropTypes.func,
    onCellCopyPaste: PropTypes.func,
    onGridRowsUpdated: PropTypes.func.isRequired,
    onHitBottomBoundary: PropTypes.func.isRequired,
    onHitTopBoundary: PropTypes.func.isRequired,
    onHitRightBoundary: PropTypes.func.isRequired,
    onHitLeftBoundary: PropTypes.func.isRequired,
    onCommit: PropTypes.func.isRequired,
    onCommitCancel: PropTypes.func,
    onCellSelected: PropTypes.func,
    onCellDeSelected: PropTypes.func,
    onCellRangeSelectionStarted: PropTypes.func,
    onCellRangeSelectionUpdated: PropTypes.func,
    onCellRangeSelectionCompleted: PropTypes.func,
    onCellsDragged: PropTypes.func,
    onDragHandleDoubleClick: PropTypes.func.isRequired,
    scrollLeft: PropTypes.number.isRequired,
    scrollTop: PropTypes.number.isRequired,
    rows: PropTypes.array.isRequired,
    getRowHeight: PropTypes.func.isRequired,
    getRowTop: PropTypes.func.isRequired,
    getRowColumns: PropTypes.func.isRequired
  };

  state = {
    selectedPosition: {
      idx: -1,
      rowIdx: -1
    },
    selectedRange: {
      topLeft: {
        idx: -1, rowIdx: -1
      },
      bottomRight: {
        idx: -1, rowIdx: -1
      }
    },
    copiedPosition: null,
    draggedPosition: null,
    isEditorEnabled: false,
    firstEditorKeyPress: null
  };

  componentDidUpdate(prevProps, prevState) {
    const { selectedPosition, isEditorEnabled } = this.state;
    const { selectedPosition: prevSelectedPosition, isEditorEnabled: prevIsEditorEnabled } = prevState;
    const isSelectedPositionChanged = selectedPosition !== prevSelectedPosition && (selectedPosition.rowIdx !== prevSelectedPosition.rowIdx || selectedPosition.idx !== prevSelectedPosition.idx);
    const isEditorClosed = isEditorEnabled !== prevIsEditorEnabled && !isEditorEnabled;

    if (isSelectedPositionChanged) {
      // Call event handlers if selected cell has changed
      const { onCellSelected, onCellDeSelected } = this.props;
      if (isFunction(onCellDeSelected) && this.isCellWithinBounds(prevSelectedPosition)) {
        onCellDeSelected({ ...prevSelectedPosition });
      }

      if (isFunction(onCellSelected) && this.isCellWithinBounds(selectedPosition)) {
        onCellSelected({ ...selectedPosition });
      }
    }

    if ((isSelectedPositionChanged && this.isCellWithinBounds(selectedPosition)) || isEditorClosed) {
      this.focus();
      this.saveEditorPosition();
    }
  }

  componentDidMount() {
    const { eventBus, enableCellAutoFocus } = this.props;
    this.unsubscribeSelectCell = eventBus.subscribe(EventTypes.SELECT_CELL, this.selectCell);
    this.unsubscribeSelectStart = eventBus.subscribe(EventTypes.SELECT_START, this.onSelectCellRangeStarted);
    this.unsubscribeSelectUpdate = eventBus.subscribe(EventTypes.SELECT_UPDATE, this.onSelectCellRangeUpdated);
    this.unsubscribeSelectEnd = eventBus.subscribe(EventTypes.SELECT_END, this.onSelectCellRangeEnded);
    this.unsubscribeDragEnter = eventBus.subscribe(EventTypes.DRAG_ENTER, this.handleDragEnter);

    if (enableCellAutoFocus && this.isFocusedOnBody()) {
      this.selectFirstCell();
    }
  }

  componentWillUnmount() {
    this.unsubscribeSelectCell();
    this.unsubscribeSelectStart();
    this.unsubscribeSelectUpdate();
    this.unsubscribeSelectEnd();
    this.unsubscribeDragEnter();
  }

  saveEditorPosition = () => {
    if (this.selectionMask) {
      const { left, top } = this.selectionMask.getBoundingClientRect();
      const { scrollLeft, scrollTop } = document.documentElement;
      this.editorPosition = { left: left + scrollLeft, top: top + scrollTop };
    }
  };

  setMaskScollLeft = (mask, position, scrollLeft) => {
    if (mask) {
      const { idx, rowIdx } = position;
      if (idx >= 0 && rowIdx >= 0) {
        const { columns, getRowTop } = this.props;
        const column = getColumn(columns, idx);
        const frozen = isFrozen(column);
        if (frozen) {
          const top = getRowTop(rowIdx);
          const left = scrollLeft + column.left;
          const transform = `translate(${left}px, ${top}px)`;
          if (mask.style.transform !== transform) {
            mask.style.transform = transform;
          }
        }
      }
    }
  };

  /**
   * Sets the position of SelectionMask and CopyMask components when the canvas is scrolled
   * This is only required on the frozen columns
   * @param scrollLeft number
   */
  setScrollLeft = (scrollLeft) => {
    const { selectionMask, copyMask, state: { selectedPosition, copiedPosition } } = this;
    this.setMaskScollLeft(selectionMask, selectedPosition, scrollLeft);
    this.setMaskScollLeft(copyMask, copiedPosition, scrollLeft);
  };

  onKeyDown = e => {
    if (isCtrlKeyHeldDown(e)) {
      this.onPressKeyWithCtrl(e);
    } else if (e.keyCode === keyCodes.Escape) {
      this.onPressEscape(e);
    } else if (e.keyCode === keyCodes.Tab) {
      this.onPressTab(e);
    } else if (this.isKeyboardNavigationEvent(e)) {
      this.changeCellFromEvent(e);
    } else if (isKeyPrintable(e.keyCode) || [keyCodes.Backspace, keyCodes.Delete, keyCodes.Enter].indexOf(e.keyCode) !== -1) {
      this.openEditor(e);
    }
  };

  isSelectedCellEditable = () => {
    const { enableCellSelect, columns, rowGetter, onCheckCellIsEditable } = this.props;
    const { selectedPosition } = this.state;
    return isSelectedCellEditable({ enableCellSelect, columns, rowGetter, selectedPosition, onCheckCellIsEditable });
  };

  openEditor = ({ key } = {}) => {
    if (this.isSelectedCellEditable() && !this.state.isEditorEnabled) {
      this.setState({
        isEditorEnabled: true,
        firstEditorKeyPress: key
      });
    }
  };

  closeEditor = () => {
    this.setState({
      isEditorEnabled: false,
      firstEditorKeyPress: null
    });
  };

  onPressKeyWithCtrl = ({ keyCode }) => {
    if (this.copyPasteEnabled()) {
      if (keyCode === keyCodes.c) {
        const { columns, rowGetter } = this.props;
        const { selectedPosition } = this.state;
        const value = getSelectedCellValue({ selectedPosition, columns, rowGetter });
        this.handleCopy({ value });
      } else if (keyCode === keyCodes.v) {
        this.handlePaste();
      }
    }
  };

  onFocus = (e) => {
    const shift = e.shiftKey === true;
    const { selectedPosition: { idx, rowIdx } } = this.state;
    if (idx === -1 && rowIdx === -1) {
      if (shift) {
        // FIXME: How to check if shift was pressed?
        this.selectLastCell();
      } else {
        this.selectFirstCell();
      }
    }
  };

  onPressTab = (e) => {
    const { cellNavigationMode, columns, rowsCount } = this.props;
    const { selectedPosition, isEditorEnabled } = this.state;
    // When there are no rows in the grid, pressing tab needs to allow the browser to handle it
    if (rowsCount === 0) {
      return;
    }

    // If we are in a position to leave the grid, stop editing but stay in that cell
    if (canExitGrid(e, { cellNavigationMode, columns, rowsCount, selectedPosition })) {
      if (isEditorEnabled) {
        this.closeEditor();
        return;
      }

      // Reset the selected position before exiting
      this.setState({ selectedPosition: { idx: -1, rowIdx: -1 } });
      return;
    }

    this.changeCellFromEvent(e);
  };

  onPressEscape = () => {
    if (this.copyPasteEnabled()) {
      this.handleCancelCopy();
      this.closeEditor();
    }
  };

  copyPasteEnabled = () => {
    return this.props.onCellCopyPaste !== null && this.isSelectedCellEditable();
  };

  handleCopy = ({ value }) => {
    const { rowIdx, idx } = this.state.selectedPosition;
    this.setState({
      copiedPosition: { rowIdx, idx, value }
    });
  };

  handleCancelCopy = () => {
    this.setState({ copiedPosition: null });
  };

  handlePaste = () => {
    const { columns, onCellCopyPaste, onGridRowsUpdated } = this.props;
    const { selectedPosition, copiedPosition } = this.state;
    const { rowIdx: toRow } = selectedPosition;

    if (copiedPosition == null) {
      return;
    }

    const { key: cellKey } = getSelectedColumn({ selectedPosition, columns });
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

    onGridRowsUpdated(cellKey, toRow, toRow, { [cellKey]: textToCopy }, UpdateActions.COPY_PASTE, fromRow);
  };

  isKeyboardNavigationEvent(e) {
    return this.getKeyNavActionFromEvent(e) != null;
  }

  isGroupedRowSelected() {
    const { rowGetter } = this.props;
    const { selectedPosition } = this.state;
    const rowData = getSelectedRow({ selectedPosition, rowGetter });
    return rowData && rowData.__metaData ? rowData.__metaData.isGroup : false;
  }

  getKeyNavActionFromEvent(e) {
    const { rowVisibleEndIdx, rowVisibleStartIdx, colVisibleEndIdx, colVisibleStartIdx, onHitBottomBoundary, onHitRightBoundary, onHitLeftBoundary, onHitTopBoundary } = this.props;
    const isCellAtBottomBoundary = cell => cell.rowIdx >= rowVisibleEndIdx - SCROLL_CELL_BUFFER;
    const isCellAtTopBoundary = cell => cell.rowIdx !== 0 && cell.rowIdx <= rowVisibleStartIdx - 1;
    const isCellAtRightBoundary = cell => cell.idx !== 0 && cell.idx >= colVisibleEndIdx - 1;
    const isCellAtLeftBoundary = cell => cell.idx !== 0 && cell.idx <= colVisibleStartIdx + 1;

    const keyNavActions = {
      ArrowDown: {
        getNext: current => ({ ...current, rowIdx: current.rowIdx + 1 }),
        isCellAtBoundary: isCellAtBottomBoundary,
        onHitBoundary: onHitBottomBoundary
      },
      ArrowUp: {
        getNext: current => ({ ...current, rowIdx: current.rowIdx - 1 }),
        isCellAtBoundary: isCellAtTopBoundary,
        onHitBoundary: onHitTopBoundary
      },
      ArrowRight: {
        getNext: current => ({ ...current, idx: current.idx + 1 }),
        isCellAtBoundary: isCellAtRightBoundary,
        onHitBoundary: (next) => {
          onHitRightBoundary(next);
          // Selected cell can hit the bottom boundary when the cellNavigationMode is 'changeRow'
          if (isCellAtBottomBoundary(next)) {
            onHitBottomBoundary(next);
          }
        }
      },
      ArrowLeft: {
        getNext: current => ({ ...current, idx: current.idx - 1 }),
        isCellAtBoundary: isCellAtLeftBoundary,
        onHitBoundary: (next) => {
          onHitLeftBoundary(next);
          // Selected cell can hit the top boundary when the cellNavigationMode is 'changeRow'
          if (isCellAtTopBoundary(next)) {
            onHitTopBoundary(next);
          }
        }
      }
    };
    if (e.keyCode === keyCodes.Tab) {
      return e.shiftKey === true ? keyNavActions.ArrowLeft : keyNavActions.ArrowRight;
    }
    return keyNavActions[e.key];
  }

  changeCellFromEvent(e) {
    e.preventDefault();
    const isTab = e.keyCode === keyCodes.Tab;
    const isShift = e.shiftKey;

    if (isTab) {
      const cellNavigationMode = this.props.cellNavigationMode === CellNavigationMode.NONE ?
        CellNavigationMode.CHANGE_ROW :
        this.props.cellNavigationMode;
      this.changeCellFromKeyAction(e, cellNavigationMode);
    } else if (isShift) {
      this.changeSelectedRangeFromArrowKeyAction(e);
    } else {
      this.changeCellFromKeyAction(e, this.props.cellNavigationMode);
    }
  }

  changeCellFromKeyAction(e, cellNavigationMode) {
    const currentPosition = this.state.selectedPosition;
    const keyNavAction = this.getKeyNavActionFromEvent(e);
    const next = this.getNextSelectedCellPositionForKeyNavAction(keyNavAction, currentPosition, cellNavigationMode);
    this.checkIsAtGridBoundary(keyNavAction, next);
    this.selectCell({ ...next });
  }

  changeSelectedRangeFromArrowKeyAction(e) {
    const { cellNavigationMode } = this.props;
    const currentPosition = this.state.selectedRange.cursorCell || this.state.selectedPosition;
    const keyNavAction = this.getKeyNavActionFromEvent(e);
    const next = this.getNextSelectedCellPositionForKeyNavAction(keyNavAction, currentPosition, cellNavigationMode);
    this.checkIsAtGridBoundary(keyNavAction, next);
    this.onSelectCellRangeUpdated({ ...next }, true, () => { this.onSelectCellRangeEnded(); });
  }

  getNextSelectedCellPositionForKeyNavAction(keyNavAction, currentPosition, cellNavigationMode) {
    const { getNext } = keyNavAction;
    const nextPosition = getNext(currentPosition);
    const { columns, rowsCount } = this.props;
    return getNextSelectedCellPosition({
      columns,
      rowsCount,
      cellNavigationMode
    }, nextPosition);
  }

  checkIsAtGridBoundary(keyNavAction, next) {
    const { isCellAtBoundary, onHitBoundary } = keyNavAction;
    const { changeRowOrColumn, ...nextPos } = next;
    if (isCellAtBoundary(nextPos) || changeRowOrColumn) {
      onHitBoundary(nextPos);
    }
  }

  isCellWithinBounds = ({ idx, rowIdx }) => {
    const { columns, rowsCount } = this.props;
    return rowIdx >= 0 && rowIdx < rowsCount && idx >= 0 && idx < getSize(columns);
  };

  isGridSelected = () => {
    return this.isCellWithinBounds(this.state.selectedPosition);
  };

  isFocused = () => {
    return document.activeElement === this.selectionMask;
  };

  isFocusedOnBody = () => {
    return document.activeElement === document.body;
  };

  focus = () => {
    if (this.selectionMask && !this.isFocused()) {
      this.selectionMask.focus();
    }
  };

  selectFirstCell = () => {
    this.selectCell({ rowIdx: 0, idx: 0 });
  };

  selectLastCell = () => {
    const { rowsCount, columns } = this.props;
    this.selectCell({ rowIdx: rowsCount - 1, idx: getSize(columns) - 1 });
  };

  selectCell = (cell, openEditor) => {
    const callback = openEditor ? this.openEditor : () => null;
    this.setState(prevState => {
      const next = { ...prevState.selectedPosition, ...cell };
      if (this.isCellWithinBounds(next)) {
        return {
          selectedPosition: next,
          selectedRange: {
            topLeft: next,
            bottomRight: next,
            startCell: next,
            cursorCell: next,
            isDragging: false
          }
        };
      }
      return prevState;
    }, callback);
  };

  createSingleCellSelectedRange(cellPosition, isDragging) {
    return {
      topLeft: cellPosition,
      bottomRight: cellPosition,
      startCell: cellPosition,
      cursorCell: cellPosition,
      isDragging
    };
  }

  onSelectCellRangeStarted = (selectedPosition) => {
    this.setState({
      selectedRange: this.createSingleCellSelectedRange(selectedPosition, true),
      selectedPosition
    }, () => {
      if (isFunction(this.props.onCellRangeSelectionStarted)) {
        this.props.onCellRangeSelectionStarted(this.state.selectedRange);
      }
    });
  };

  onSelectCellRangeUpdated = (cellPosition, isFromKeyboard, callback) => {
    if (!this.state.selectedRange.isDragging && !isFromKeyboard) {
      return;
    }

    if (!this.isCellWithinBounds(cellPosition)) {
      return;
    }

    const startCell = this.state.selectedRange.startCell || this.state.selectedPosition;
    const colIdxs = [startCell.idx, cellPosition.idx].sort((a, b) => a - b);
    const rowIdxs = [startCell.rowIdx, cellPosition.rowIdx].sort((a, b) => a - b);
    const topLeft = { idx: colIdxs[0], rowIdx: rowIdxs[0] };
    const bottomRight = { idx: colIdxs[1], rowIdx: rowIdxs[1] };

    const selectedRange = {
      // default the startCell to the selected cell, in case we've just started via keyboard
      startCell: this.state.selectedPosition,
      // assign the previous state (which will override the startCell if we already have one)
      ...this.state.selectedRange,
      // assign the new state - the bounds of the range, and the new cursor cell
      topLeft,
      bottomRight,
      cursorCell: cellPosition
    };

    this.setState({
      selectedRange
    }, () => {
      if (isFunction(this.props.onCellRangeSelectionUpdated)) {
        this.props.onCellRangeSelectionUpdated(this.state.selectedRange);
      }
      if (isFunction(callback)) {
        callback();
      }
    });
  };

  onSelectCellRangeEnded = () => {
    const selectedRange = { ...this.state.selectedRange, isDragging: false };
    this.setState({ selectedRange }, () => {
      if (isFunction(this.props.onCellRangeSelectionCompleted)) {
        this.props.onCellRangeSelectionCompleted(this.state.selectedRange);
      }

      // Focus the InteractionMasks, so it can receive keyboard events
      this.focus();
    });
  };

  isDragEnabled = () => {
    const { onGridRowsUpdated, onCellsDragged } = this.props;
    return this.isSelectedCellEditable() && (isFunction(onGridRowsUpdated) || isFunction(onCellsDragged));
  };

  handleDragStart = (e) => {
    const { selectedPosition: { idx, rowIdx } } = this.state;
    // To prevent dragging down/up when reordering rows. (TODO: is this required)
    const isViewportDragging = e && e.target && e.target.className;
    if (idx > -1 && isViewportDragging) {
      e.dataTransfer.effectAllowed = 'copy';
      // Setting data is required to make an element draggable in FF
      const transferData = JSON.stringify({ idx, rowIdx });
      try {
        e.dataTransfer.setData('text/plain', transferData);
      } catch (ex) {
        // IE only supports 'text' and 'URL' for the 'type' argument
        e.dataTransfer.setData('text', transferData);
      }
      this.setState({
        draggedPosition: { idx, rowIdx }
      });
    }
  };

  handleDragEnter = ({ overRowIdx }) => {
    if (this.state.draggedPosition != null) {
      this.setState(({ draggedPosition }) => ({
        draggedPosition: { ...draggedPosition, overRowIdx }
      }));
    }
  };

  handleDragEnd = () => {
    const { draggedPosition } = this.state;
    if (draggedPosition != null) {
      const { rowIdx, overRowIdx } = draggedPosition;
      if (overRowIdx != null) {
        const { columns, onCellsDragged, onGridRowsUpdated, rowGetter } = this.props;
        const column = getSelectedColumn({ selectedPosition: draggedPosition, columns });
        const value = getSelectedCellValue({ selectedPosition: draggedPosition, columns, rowGetter });
        const cellKey = column.key;
        const fromRow = rowIdx < overRowIdx ? rowIdx : overRowIdx;
        const toRow = rowIdx > overRowIdx ? rowIdx : overRowIdx;

        if (isFunction(onCellsDragged)) {
          onCellsDragged({ cellKey, fromRow, toRow, value });
        }
        if (isFunction(onGridRowsUpdated)) {
          onGridRowsUpdated(cellKey, fromRow, toRow, { [cellKey]: value }, UpdateActions.CELL_DRAG);
        }
      }
      this.setState({
        draggedPosition: null
      });
    }
  };

  onDragHandleDoubleClick = () => {
    const { onDragHandleDoubleClick, rowGetter } = this.props;
    const { selectedPosition } = this.state;
    const { idx, rowIdx } = selectedPosition;
    const rowData = getSelectedRow({ selectedPosition, rowGetter });
    onDragHandleDoubleClick({ idx, rowIdx, rowData });
  };

  onCommit = (...args) => {
    this.props.onCommit(...args);
    this.closeEditor();
  };

  onCommitCancel = () => {
    this.closeEditor();
  };

  setSelectionMaskRef = (node) => {
    this.selectionMask = node;
  };

  setCopyMaskRef = (node) => {
    this.copyMask = node;
  };

  getSelectedDimensions = (selectedPosition) => {
    const { scrollLeft, getRowHeight, getRowTop, getRowColumns } = this.props;
    const columns = getRowColumns(selectedPosition.idx);
    const top = getRowTop(selectedPosition.rowIdx);
    const rowHeight = getRowHeight(selectedPosition.rowIdx);
    return { ...getSelectedDimensions({ selectedPosition, columns, scrollLeft, rowHeight }), top };
  };

  renderSingleCellSelectView = () => {
    const { selectedPosition } = this.state;
    return (
      !this.state.isEditorEnabled && this.isGridSelected() && (
        <SelectionMask
          selectedPosition={selectedPosition}
          innerRef={this.setSelectionMaskRef}
          getSelectedDimensions={this.getSelectedDimensions}
        >
          {this.isDragEnabled() && (
            <DragHandle
              onDragStart={this.handleDragStart}
              onDragEnd={this.handleDragEnd}
              onDoubleClick={this.onDragHandleDoubleClick}
            />
          )}
        </SelectionMask>
      )
    );
  };

  renderCellRangeSelectView = () => {
    const { columns, rowHeight } = this.props;
    return [
      <SelectionRangeMask
        key="range-mask"
        selectedRange={this.state.selectedRange}
        columns={columns}
        rowHeight={rowHeight}
      />,
      <SelectionMask
        key="selection-mask"
        selectedPosition={this.state.selectedRange.startCell}
        innerRef={this.setSelectionMaskRef}
        getSelectedDimensions={this.getSelectedDimensions}
      />
    ];
  };

  render() {
    const { rowGetter, contextMenu, getRowColumns, scrollLeft, scrollTop } = this.props;
    const { isEditorEnabled, firstEditorKeyPress, selectedPosition, draggedPosition, copiedPosition } = this.state;
    const rowData = getSelectedRow({ selectedPosition, rowGetter });
    const columns = getRowColumns(selectedPosition.rowIdx);
    return (
      <div
        onKeyDown={this.onKeyDown}
        onFocus={this.onFocus}
      >
        {copiedPosition && (
          <CopyMask
            copiedPosition={copiedPosition}
            innerRef={this.setCopyMaskRef}
            getSelectedDimensions={this.getSelectedDimensions}
          />
        )}
        {draggedPosition && (
          <DragMask
            draggedPosition={draggedPosition}
            getSelectedDimensions={this.getSelectedDimensions}
          />
        )}
        {selectedRangeIsSingleCell(this.state.selectedRange) ?
          this.renderSingleCellSelectView() :
          this.renderCellRangeSelectView()
        }
        {isEditorEnabled && (
          <EditorContainer
            firstEditorKeyPress={firstEditorKeyPress}
            onCommit={this.onCommit}
            onCommitCancel={this.onCommitCancel}
            rowIdx={selectedPosition.rowIdx}
            value={getSelectedCellValue({ selectedPosition, columns, rowGetter })}
            rowData={rowData}
            column={getSelectedColumn({ selectedPosition, columns })}
            scrollLeft={scrollLeft}
            scrollTop={scrollTop}
            {...{
              ...this.getSelectedDimensions(selectedPosition),
              ...this.editorPosition
            }}
          />
        )}
        {isValidElement(contextMenu) && cloneElement(contextMenu, { ...selectedPosition })}
      </div>
    );
  }
}

export default InteractionMasks;
