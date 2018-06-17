import React, { isValidElement, cloneElement } from 'react';
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
  canExitGrid,
  isSelectedCellEditable
} from '../utils/SelectedCellUtils';
import isFunction from '../utils/isFunction';
import * as AppConstants from '../AppConstants';
import * as columnUtils from '../ColumnUtils';
import * as keyCodes from '../KeyCodes';
import { CellNavigationMode, EventTypes } from '../constants';

const SCROLL_CELL_BUFFER = 2;

class InteractionMasks extends React.Component {
  static propTypes = {
    colVisibleStart: PropTypes.number.isRequired,
    colVisibleEnd: PropTypes.number.isRequired,
    visibleStart: PropTypes.number.isRequired,
    visibleEnd: PropTypes.number.isRequired,
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
    onCellsDragged: PropTypes.func,
    onDragHandleDoubleClick: PropTypes.func.isRequired,
    onBeforeFocus: PropTypes.func.isRequired,
    scrollLeft: PropTypes.number.isRequired
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
    }
  }

  componentDidMount() {
    const { eventBus, enableCellAutoFocus } = this.props;

    this.unsubscribeSelectCell = eventBus.subscribe(EventTypes.SELECT_CELL, this.selectCell);
    this.unsubscribeDragEnter = eventBus.subscribe(EventTypes.DRAG_ENTER, this.handleDragEnter);

    if (enableCellAutoFocus && this.isFocusedOnBody()) {
      this.selectFirstCell();
    }
  }

  componentWillUnmount() {
    this.unsubscribeSelectCell();
    this.unsubscribeDragEnter();
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
    } else if (isKeyPrintable(e.keyCode) || [keyCodes.Backspace, keyCodes.Delete, keyCodes.Enter].indexOf(e.keyCode) !== -1) {
      this.openEditor(e);
    }
  };

  isSelectedCellEditable = () => {
    const { enableCellSelect, columns, rowGetter, onCheckCellIsEditable } = this.props;
    const { selectedPosition } = this.state;
    return isSelectedCellEditable({ enableCellSelect, columns, rowGetter, selectedPosition, onCheckCellIsEditable });
  }

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

    onGridRowsUpdated(cellKey, toRow, toRow, { [cellKey]: textToCopy }, AppConstants.UpdateActions.COPY_PASTE, fromRow);
  };

  isKeyboardNavigationEvent(e) {
    return this.getKeyNavActionFromEvent(e) != null;
  }

  getKeyNavActionFromEvent(e) {
    const { visibleEnd, visibleStart, colVisibleEnd, colVisibleStart, onHitBottomBoundary, onHitRightBoundary, onHitLeftBoundary, onHitTopBoundary } = this.props;
    const isCellAtBottomBoundary = cell => cell.rowIdx >= visibleEnd - SCROLL_CELL_BUFFER;
    const isCellAtTopBoundary = cell => cell.rowIdx !== 0 && cell.rowIdx <= visibleStart - 1;
    const isCellAtRightBoundary = cell => cell.idx !== 0 && cell.idx >= colVisibleEnd - 1;
    const isCellAtLeftBoundary = cell => cell.idx !== 0 && cell.idx <= colVisibleStart + 1;

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
    const keyNavAction = this.getKeyNavActionFromEvent(e);
    const { getNext, isCellAtBoundary, onHitBoundary } = keyNavAction;
    const currentPosition = this.state.selectedPosition;
    const nextPosition = getNext(currentPosition);
    const isTab = e.keyCode === keyCodes.Tab;
    const { cellNavigationMode, columns, rowsCount } = this.props;
    const { changeRowOrColumn, ...next } = getNextSelectedCellPosition({
      columns,
      rowsCount,
      cellNavigationMode: isTab && cellNavigationMode === CellNavigationMode.NONE ? CellNavigationMode.CHANGE_ROW : cellNavigationMode
    }, nextPosition);

    if (isCellAtBoundary(next) || changeRowOrColumn) {
      onHitBoundary(next);
    }

    this.selectCell(next);
  }

  isCellWithinBounds = ({ idx, rowIdx }) => {
    const { columns, rowsCount } = this.props;
    return rowIdx >= 0 && rowIdx < rowsCount && idx >= 0 && idx < columnUtils.getSize(columns);
  };

  isGridSelected = () => {
    return this.isCellWithinBounds(this.state.selectedPosition);
  };

  isFocused = () => {
    return document.activeElement === this.node;
  };

  isFocusedOnBody = () => {
    return document.activeElement === document.body;
  };

  focus = () => {
    if (this.node && !this.isFocused()) {
      this.props.onBeforeFocus(() => this.node.focus());
    }
  };

  selectFirstCell = () => {
    this.selectCell({ rowIdx: 0, idx: 0 });
  };

  selectLastCell = () => {
    const { rowsCount, columns } = this.props;
    this.selectCell({ rowIdx: rowsCount - 1, idx: columnUtils.getSize(columns) - 1 });
  };

  selectCell = (cell, openEditor) => {
    const callback = openEditor ? this.openEditor : undefined;
    const next = { ...this.state.selectedPosition, ...cell };
    if (this.isCellWithinBounds(next)) {
      this.setState({
        selectedPosition: next
      }, callback);
    }
  };

  dragEnabled = () => {
    const { onGridRowsUpdated, onCellsDragged } = this.props;
    return this.isSelectedCellEditable() && (isFunction(onGridRowsUpdated) || isFunction(onCellsDragged));
  };

  handleDragStart = (e) => {
    const { selectedPosition: { idx, rowIdx } } = this.state;
    // To prevent dragging down/up when reordering rows. (TODO: is this required)
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
          onGridRowsUpdated(cellKey, fromRow, toRow, { [cellKey]: value }, AppConstants.UpdateActions.CELL_DRAG);
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

  render() {
    const { rowHeight, rowGetter, columns, contextMenu } = this.props;
    const { isEditorEnabled, firstEditorKeyPress, selectedPosition, draggedPosition, copiedPosition } = this.state;
    const rowData = getSelectedRow({ selectedPosition, rowGetter });
    return (
      <div
        ref={node => {
          this.node = node;
        }}
        tabIndex="0"
        onKeyDown={this.onKeyDown}
        onFocus={this.onFocus}
      >
        {copiedPosition && (
          <CopyMask
            copiedPosition={copiedPosition}
            rowHeight={rowHeight}
            columns={columns}
          />
        )}
        {draggedPosition && (
          <DragMask
            draggedPosition={draggedPosition}
            rowHeight={rowHeight}
            columns={columns}
          />
        )}
        {!isEditorEnabled && this.isGridSelected() && (
          <SelectionMask
            selectedPosition={selectedPosition}
            rowHeight={rowHeight}
            columns={columns}
            isGroupedRow={rowData && rowData.__metaData ? rowData.__metaData.isGroup : false}
            scrollLeft={this.props.scrollLeft}
          >
            {this.dragEnabled() && (
              <DragHandle
                onDragStart={this.handleDragStart}
                onDragEnd={this.handleDragEnd}
                onDoubleClick={this.onDragHandleDoubleClick}
              />
            )}
          </SelectionMask>
        )}
        {isEditorEnabled && <EditorContainer
          firstEditorKeyPress={firstEditorKeyPress}
          onCommit={this.onCommit}
          onCommitCancel={this.onCommitCancel}
          rowIdx={selectedPosition.rowIdx}
          value={getSelectedCellValue({ selectedPosition, columns, rowGetter })}
          rowData={rowData}
          column={getSelectedColumn({ selectedPosition, columns })}
          {...getSelectedDimensions({ selectedPosition, rowHeight, columns })}
        />}
        {isValidElement(contextMenu) && cloneElement(contextMenu, { ...selectedPosition })}
      </div>
    );
  }
}

export default InteractionMasks;
