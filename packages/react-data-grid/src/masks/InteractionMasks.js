import React from 'react';
import PropTypes from 'prop-types';

import SelectionMask from './SelectionMask';
import CopyMask from './CopyMask';
import DragMask from './DragMask';
import DragHandle from './DragHandle';
import EditorContainer from '../editors/EditorContainer';
import { isKeyPrintable, isCtrlKeyHeldDown } from '../utils/keyboardUtils';
import {
  getSelectedDimensions,
  getSelectedCellValue,
  getSelectedRow,
  getSelectedColumn,
  getNextSelectedCellPosition,
  isSelectedCellEditable
} from '../utils/SelectedCellUtils';
import isFunction from '../utils/isFunction';
import * as AppConstants from '../AppConstants';
import * as keyCodes from '../KeyCodes';
import { EventTypes } from '../constants';

const SCROLL_CELL_BUFFER = 2;
export const CELL_NAVIGATION_MODES = {
  NONE: 'none',
  LOOP_OVER_ROW: 'loopOverRow',
  CHANGE_ROW: 'changeRow'
};

class InteractionMasks extends React.Component {
  static propTypes = {
    colVisibleStart: PropTypes.number,
    colVisibleEnd: PropTypes.number,
    visibleStart: PropTypes.number,
    visibleEnd: PropTypes.number,
    columns: PropTypes.array,
    rowHeight: PropTypes.number,
    onHitBottomBoundary: PropTypes.func,
    onHitTopBoundary: PropTypes.func,
    onHitRightBoundary: PropTypes.func,
    onHitLeftBoundary: PropTypes.func,
    onCommit: PropTypes.func,
    onCommitCancel: PropTypes.func,
    isEditorEnabled: PropTypes.bool,
    firstEditorKeyPress: PropTypes.number,
    rowGetter: PropTypes.func.isRequired,
    rowsCount: PropTypes.number.isRequired,
    enableCellSelect: PropTypes.bool.isRequired,
    onCheckCellIsEditable: PropTypes.func,
    onCellCopyPaste: PropTypes.func,
    onGridRowsUpdated: PropTypes.func.isRequired,
    onCellDeSelected: PropTypes.func,
    onCellSelected: PropTypes.func,
    cellNavigationMode: PropTypes.oneOf(['none', 'loopOverRow', 'changeRow']).isRequired,
    onCellsDragged: PropTypes.func,
    onDragHandleDoubleClick: PropTypes.func,
    eventBus: PropTypes.object.isRequired,
    onBeforeFocus: PropTypes.func.isRequired
  };

  state = {
    selectedPosition: {
      idx: -1,
      rowIdx: -1
    },
    copiedPosition: null,
    draggedPosition: null,
    lockedPosition: null,
    isEditorEnabled: false,
    firstEditorKeyPress: null
  };

  componentDidUpdate(prevProps, prevState) {
    const { selectedPosition, isEditorEnabled } = this.state;
    const isSelectedPositionChanged = selectedPosition !== prevState.selectedPosition && selectedPosition.rowIdx !== -1 && selectedPosition.idx !== -1;
    const isEditorClosed = isEditorEnabled !== prevState.isEditorEnabled && !isEditorEnabled;
    if (isSelectedPositionChanged || isEditorClosed) {
      this.focus();
    }
  }

  componentDidMount() {
    const { eventBus } = this.props;

    this.unsubscribeSelectCell = eventBus.subscribe(EventTypes.SELECT_CELL, this.selectCell);
    this.unsubscribeDragEnter = eventBus.subscribe(EventTypes.DRAG_ENTER, this.handleDragEnter);
    this.unsubscribeCellDoubleClick = eventBus.subscribe(EventTypes.CELL_DOUBLE_CLICK, () => this.openEditor({}));
  }

  componentWillUnmount() {
    this.unsubscribeSelectCell();
    this.unsubscribeDragEnter();
    this.unsubscribeCellDoubleClick();
  }

  onKeyDown = e => {
    if (isCtrlKeyHeldDown(e)) {
      this.onPressKeyWithCtrl(e);
    } else if (e.keyCode === keyCodes.Escape) {
      this.onPressEscape(e);
    } else if (e.keyCode === keyCodes.Tab) {
      this.onPressTab(e);
    } else if (this.isKeyboardNavigationEvent(e)) {
      this.changeCellFromEvent(e);
    } else if (isKeyPrintable(e.keyCode) || [keyCodes.Backspace, keyCodes.Delete, keyCodes.Enter].includes(e.keyCode)) {
      this.openEditor(e);
    }
  };

  isSelectedCellEditable = () => {
    const { enableCellSelect, columns, rowGetter } = this.props;
    const { selectedPosition } = this.state;
    return isSelectedCellEditable({ enableCellSelect, columns, rowGetter, selectedPosition });
  }

  openEditor = (e) => {
    if (this.isSelectedCellEditable() && !this.state.isEditorEnabled) {
      const { key } = e;
      this.setState({
        isEditorEnabled: true,
        firstEditorKeyPress: key
      });
    }
  };

  closeEditor = () => {
    this.setState({ isEditorEnabled: false });
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

  isAtLastCellInRow = () => {
    const {selectedPosition: {idx}} = this.state;
    return idx === this.props.columns - 1;
  };

  isAtLastRow = () => {
    const {rowIdx} = this.state.selectedPosition;
    return rowIdx === this.props.rowsCount - 1;
  };

  isAtFirstCellInRow = () => {
    return this.state.selectedPosition.idx === 0;
  };

  isAtFirstRow = () => {
    return this.state.selectedPosition.rowIdx === 0;
  };

  exitGrid = (oldSelectedCell, newSelectedValue) => {
    const {onCellDeSelected} = this.props;
    this.setState({ selectedPosition: newSelectedValue },
      () => {
        if (typeof onCellDeSelected === 'function') {
          onCellDeSelected(oldSelectedCell);
        }});
  };

  enterGrid = (newSelectedValue) => {
    this.setState({ selected: newSelectedValue },
      () => {
        if (typeof this.props.onCellSelected === 'function') {
          this.props.onCellSelected(newSelectedValue);
        }});
  };

  canExitGrid = (e) => {
    // When the cellNavigationMode is 'none', you can exit the grid if you're at the start or end of the row
    // When the cellNavigationMode is 'changeRow', you can exit the grid if you're at the first or last cell of the grid
    // When the cellNavigationMode is 'loopOverRow', there is no logical exit point so you can't exit the grid
    let atLastCellInRow = this.isAtLastCellInRow();
    let atFirstCellInRow = this.isAtFirstCellInRow();
    let atLastRow = this.isAtLastRow();
    let atFirstRow = this.isAtFirstRow();
    let shift = e.shiftKey === true;
    const { cellNavigationMode } = this.props;
    if (shift) {
      if (cellNavigationMode === CELL_NAVIGATION_MODES.NONE) {
        if (atFirstCellInRow) {
          return true;
        }
      } else if (cellNavigationMode === CELL_NAVIGATION_MODES.CHANGE_ROW) {
        if (atFirstCellInRow && atFirstRow) {
          return true;
        }
      }
    } else {
      if (cellNavigationMode === CELL_NAVIGATION_MODES.NONE) {
        if (atLastCellInRow) {
          return true;
        }
      } else if (cellNavigationMode === CELL_NAVIGATION_MODES.CHANGE_ROW) {
        if (atLastCellInRow && atLastRow) {
          return true;
        }
      }
    }
    return false;
  };

  onPressTab = (e) => {
    const {selectedPosition: {idx, rowIdx}, isEditorEnabled} = this.state;
    // Scenario 0a: When there are no rows in the grid, pressing tab needs to allow the browser to handle it
    if (this.props.rowsCount === 0) {
      return;
    }
    // Scenario 0b: When we're editing a cell
    if (isEditorEnabled === true) {
      // if we are in a position to leave the grid, stop editing but stay in that cell
      if (this.canExitGrid(e)) {
        this.selectCell(selectedPosition);
        return;
      }
      // otherwise move left or right as appropriate
      this.changeCellFromEvent(e);
      return;
    }
    const shift = e.shiftKey === true;
    // Scenario 1: we're at a cell where we can exit the grid
    if (this.canExitGrid(e) && this.isFocused()) {
      if (shift && idx >= 0) {
        this.exitGrid({ idx, rowIdx}, { idx: -1, rowIdx, exitedLeft: true });
        return;
      } else if (!shift && idx >= 0) {
        this.exitGrid({ idx, rowIdx }, { idx: -1, rowIdx });
        return;
      }
    }
    // Scenario 2: we're on the div surrounding the grid and press shift+Tab
    // and we just exited left, so we want to let the browser handle it
    // KNOWN ISSUE: Focus on the table can come from either side and at this point we can't know how
    // they user arrived, so it is possible that exitLeft gets set and then the user clicks out of the table
    // and they won't be able to Shift+Tab around the site to re-enter the table from the right.
    if (!this.isFocused() && shift && this.state.selectedPosition.exitedLeft) {
      this.enterGrid({ idx, rowIdx });
      return;
    }
    // Scenario 3: we're on the div surrounding the grid and we want to enter the grid
    if (!this.isFocused()) {
      // Scenario 3A: idx has been set to -1 (eg can happen when clicking into the filter box)
      // we want to go to the first cell in the row if we press Tab
      // we want to go to the last cell in the row if we press Shift+Tab
      if (idx === -1) {
        this.changeCellFromEvent(e);
        return;
      }
      // otherwise, there is a selected cell in the table already, and
      // we want to trigger it to focus - setting selected in state will update
      // the cell props, and checkFocus will be called
      this.enterGrid({ idx, rowIdx, changeSomething: true });
      // make sure the browser doesn't handle it
      e.preventDefault();
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
      },
      ArrowUp: {
        getNext: current => ({ ...current, rowIdx: current.rowIdx - 1 }),
        isCellAtBoundary: cell => cell.rowIdx !== 0 && cell.rowIdx <= visibleStart - 1,
        onHitBoundary: onHitTopBoundary
      },
      ArrowRight: {
        getNext: current => ({ ...current, idx: current.idx + 1 }),
        isCellAtBoundary: cell => cell.idx !== 0 && cell.idx >= colVisibleEnd - 1,
        onHitBoundary: onHitRightBoundary
      },
      ArrowLeft: {
        getNext: current => ({ ...current, idx: current.idx - 1 }),
        isCellAtBoundary: cell => cell.idx !== 0 && cell.idx <= colVisibleStart + 1,
        onHitBoundary: onHitLeftBoundary
      }
    };
    if (e.keyCode === keyCodes.Tab) {
      return e.shiftKey === true ? keyNavActions.ArrowLeft : keyNavActions.ArrowRight;
    }
    return keyNavActions[e.key];
  }

  changeCellFromEvent(e) {
    e.preventDefault();
    const keyNavAction = this.getKeyNavActionFromEvent(e);
    const { getNext, isCellAtBoundary, onHitBoundary } = keyNavAction;
    const currentPosition = this.state.selectedPosition;
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
    return this.isCellWithinBounds(this.state.selectedPosition);
  };

  isFocused = () => {
    return document.activeElement === this.node;
  };

  focus = () => {
    if (this.node && !this.isFocused()) {
      this.props.onBeforeFocus(() => this.node.focus());
    }
  };

  selectCell = cell => {
    if (this.isCellWithinBounds(cell)) {
      this.setState({
        selectedPosition: cell
      });
    }
  };

  dragEnabled = () => {
    const { onGridRowsUpdated, onCellsDragged } = this.props;
    return this.isSelectedCellEditable() && (isFunction(onGridRowsUpdated) || isFunction(onCellsDragged));
  };

  handleDragStart = (e) => {
    const { selectedPosition: { idx, rowIdx } } = this.state;
    // To prevent dragging down/up when reordering rows.
    const isViewportDragging = e && e.target && e.target.className;
    if (idx > -1 && isViewportDragging) {
      e.dataTransfer.effectAllowed = 'copy';
      e.dataTransfer.setData('text/plain', JSON.stringify({ idx, rowIdx }));
      this.setState({
        draggedPosition: { idx, rowIdx }
      });
    }
  };

  handleDragEnter = ({ overRowIdx }) => {
    this.setState(({ draggedPosition }) => ({
      draggedPosition: { ...draggedPosition, overRowIdx }
    }));
  };

  handleDragEnd = () => {
    const { columns, onCellsDragged, onGridRowsUpdated, rowGetter } = this.props;
    const { selectedPosition, draggedPosition } = this.state;
    const { rowIdx } = selectedPosition;
    const column = getSelectedColumn({ selectedPosition, columns });
    const value = getSelectedCellValue({ selectedPosition, columns, rowGetter });
    if (draggedPosition && column) {
      const { overRowIdx } = draggedPosition;
      const cellKey = column.key;
      const fromRow = rowIdx < overRowIdx ? rowIdx : overRowIdx;
      const toRow = rowIdx > overRowIdx ? rowIdx : overRowIdx;
      if (isFunction(onCellsDragged)) {
        onCellsDragged({ cellKey, fromRow, toRow, value });
      }
      if (isFunction(onGridRowsUpdated)) {
        onGridRowsUpdated(cellKey, fromRow, toRow, { [cellKey]: value }, AppConstants.UpdateActions.CELL_DRAG);
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

  render() {
    const { rowHeight, rowGetter, columns } = this.props;
    const { isEditorEnabled, firstEditorKeyPress, selectedPosition, draggedPosition, copiedPosition } = this.state;
    const copyMaskProps = { copiedPosition, rowHeight, columns };
    const dragMaskProps = { selectedPosition, draggedPosition, rowHeight, columns };
    const selectionMaskProps = { selectedPosition, rowHeight, columns };
    const editorContainerProps = {
      firstEditorKeyPress,
      onCommit: this.onCommit,
      onCommitCancel: this.onCommitCancel,
      value: getSelectedCellValue({ selectedPosition, columns, rowGetter }),
      rowIdx: selectedPosition.rowIdx,
      RowData: getSelectedRow({ selectedPosition, rowGetter }),
      column: getSelectedColumn({ selectedPosition, columns }),
      ...getSelectedDimensions(selectionMaskProps)
    };

    return (
      <div
        ref={node => {
          this.node = node;
        }}
        tabIndex="0"
        onKeyDown={this.onKeyDown}
      >
        <CopyMask {...copyMaskProps} />
        <DragMask {...dragMaskProps} />
        {!isEditorEnabled && this.isGridSelected() && (
          <SelectionMask {...selectionMaskProps}>
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
        {isEditorEnabled && <EditorContainer {...editorContainerProps} />}
      </div>
    );
  }
}

export default InteractionMasks;
