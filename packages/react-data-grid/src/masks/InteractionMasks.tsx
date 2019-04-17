import React, { cloneElement } from 'react';
import { isElement } from 'react-is';

// Components
import SelectionMask from './SelectionMask';
import SelectionRangeMask from './SelectionRangeMask';
import CopyMask from './CopyMask';
import DragMask, { DraggedPosition } from './DragMask';
import DragHandle from './DragHandle';
import EditorContainer from '../common/editors/EditorContainer';
import EditorPortal from '../common/editors/EditorPortal';

// Utils
import { isKeyPrintable, isCtrlKeyHeldDown } from '../common/utils/keyboardUtils';
import {
  getSelectedDimensions,
  getSelectedCellValue,
  getSelectedRow,
  getSelectedRangeDimensions,
  getSelectedColumn,
  getNextSelectedCellPosition,
  canExitGrid,
  isSelectedCellEditable,
  selectedRangeIsSingleCell
} from '../utils/SelectedCellUtils';
import { isFunction } from '../common/utils';
import { getSize, getColumn, isFrozen } from '../ColumnUtils';
import keyCodes from '../KeyCodes';

// Types
import { UpdateActions, CellNavigationMode, EventTypes } from '../common/enums';
import { ColumnList, Position, Range, RowGetter } from '../common/types';
import EventBus from './EventBus';

const SCROLL_CELL_BUFFER = 2;

interface NavAction {
  getNext(current: Position): Position;
  isCellAtBoundary(cell: Position): boolean;
  onHitBoundary(next: Position): void;
}

interface Props {
  colVisibleStartIdx: number;
  colVisibleEndIdx: number;
  rowVisibleStartIdx: number;
  rowVisibleEndIdx: number;
  rowOverscanStartIdx: number;
  columns: ColumnList;
  width?: number;
  rowHeight: number;
  rowGetter: RowGetter;
  rowsCount: number;
  enableCellSelect: boolean;
  enableCellAutoFocus: boolean;
  cellNavigationMode: CellNavigationMode;
  eventBus: EventBus;
  contextMenu?: React.ReactElement;
  onCheckCellIsEditable?(): void;
  onCellCopyPaste?(arg: { cellKey: string; rowIdx: number; fromRow: number; toRow: number; value: unknown }): void;
  onGridRowsUpdated(
    cellKey: string,
    toRow1: number,
    toRow2: number,
    data: { [key: string]: unknown },
    updateAction: UpdateActions,
    fromRow: number
  ): void;
  onHitBottomBoundary(position: Position): void;
  onHitTopBoundary(position: Position): void;
  onHitRightBoundary(position: Position): void;
  onHitLeftBoundary(position: Position): void;
  onCommit(): void;
  onCommitCancel?(): void;
  onCellSelected?(position: Position): void;
  onCellDeSelected?(position: Position): void;
  onCellRangeSelectionStarted?(): void;
  onCellRangeSelectionUpdated?(): void;
  onCellRangeSelectionCompleted?(): void;
  onDragHandleDoubleClick(): void;
  scrollLeft: number;
  scrollTop: number;
  rows: unknown[];
  getRowHeight(): void;
  getRowTop(rowIdx: number): number;
  getRowColumns(): void;
  editorPortalTarget: Element;
}

interface State {
  selectedPosition: Position;
  selectedRange: Range;
  copiedPosition: Position & { value: unknown } | null;
  draggedPosition: Position | null;
  editorPosition: Position | null;
  isEditorEnabled: boolean;
  firstEditorKeyPress: null;
}

export default class InteractionMasks extends React.Component<Props, State> {
  static displayName = 'InteractionMasks';

  readonly state: Readonly<State> = {
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
    editorPosition: null,
    isEditorEnabled: false,
    firstEditorKeyPress: null
  };

  private readonly selectionMask = React.createRef<HTMLDivElement>();
  private readonly copyMask = React.createRef<HTMLDivElement>();

  private unsubscribeSelectCell: null | (() => void) = null;
  private unsubscribeSelectStart: null | (() => void) = null;
  private unsubscribeSelectUpdate: null | (() => void) = null;
  private unsubscribeSelectEnd: null | (() => void) = null;
  private unsubscribeDragEnter: null | (() => void) = null;

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { selectedPosition, isEditorEnabled } = this.state;
    const { selectedPosition: prevSelectedPosition, isEditorEnabled: prevIsEditorEnabled } = prevState;
    const isSelectedPositionChanged = selectedPosition !== prevSelectedPosition && (selectedPosition.rowIdx !== prevSelectedPosition.rowIdx || selectedPosition.idx !== prevSelectedPosition.idx);
    const isEditorClosed = isEditorEnabled !== prevIsEditorEnabled && !isEditorEnabled;

    if (isSelectedPositionChanged) {
      // Call event handlers if selected cell has changed
      const { onCellSelected, onCellDeSelected } = this.props;
      if (onCellDeSelected && this.isCellWithinBounds(prevSelectedPosition)) {
        onCellDeSelected({ ...prevSelectedPosition });
      }

      if (onCellSelected && this.isCellWithinBounds(selectedPosition)) {
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
    this.unsubscribeSelectStart = eventBus.subscribe(EventTypes.SELECT_START, this.onSelectCellRangeStarted);
    this.unsubscribeSelectUpdate = eventBus.subscribe(EventTypes.SELECT_UPDATE, this.onSelectCellRangeUpdated);
    this.unsubscribeSelectEnd = eventBus.subscribe(EventTypes.SELECT_END, this.onSelectCellRangeEnded);
    this.unsubscribeDragEnter = eventBus.subscribe(EventTypes.DRAG_ENTER, this.handleDragEnter);

    if (enableCellAutoFocus && this.isFocusedOnBody()) {
      this.selectFirstCell();
    }
  }

  componentWillUnmount() {
    this.unsubscribeSelectCell!();
    this.unsubscribeSelectStart!();
    this.unsubscribeSelectUpdate!();
    this.unsubscribeSelectEnd!();
    this.unsubscribeDragEnter!();
  }

  getEditorPosition() {
    if (!this.selectionMask.current) return null;

    const { editorPortalTarget } = this.props;
    const { left: selectionMaskLeft, top: selectionMaskTop } = this.selectionMask.current.getBoundingClientRect();
    if (editorPortalTarget === document.body) {
      const { scrollLeft, scrollTop } = document.scrollingElement || document.documentElement;
      return {
        left: selectionMaskLeft + scrollLeft,
        top: selectionMaskTop + scrollTop
      };
    }

    const { left: portalTargetLeft, top: portalTargetTop } = editorPortalTarget.getBoundingClientRect();
    const { scrollLeft, scrollTop } = editorPortalTarget;
    return {
      left: selectionMaskLeft - portalTargetLeft + scrollLeft,
      top: selectionMaskTop - portalTargetTop + scrollTop
    };
  }

  setMaskScollLeft(mask: HTMLDivElement | null, position: Position | null, scrollLeft: number) {
    if (!mask || !position) return;

    const { idx, rowIdx } = position;
    if (!(idx >= 0 && rowIdx >= 0)) return;

    const column = getColumn(this.props.columns, idx);
    if (!isFrozen(column)) return;

    const top = this.props.getRowTop(rowIdx);
    const left = scrollLeft + column.left;
    const transform = `translate(${left}px, ${top}px)`;
    if (mask.style.transform !== transform) {
      mask.style.transform = transform;
    }
  }

  /**
   * Sets the position of SelectionMask and CopyMask components when the canvas is scrolled
   * This is only required on the frozen columns
   */
  setScrollLeft(scrollLeft: number) {
    this.setMaskScollLeft(this.selectionMask.current, this.state.selectedPosition, scrollLeft);
    this.setMaskScollLeft(this.copyMask.current, this.state.copiedPosition, scrollLeft);
  }

  onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isCtrlKeyHeldDown(e)) {
      this.onPressKeyWithCtrl(e);
    } else if (e.keyCode === keyCodes.Escape) {
      this.onPressEscape();
    } else if (e.keyCode === keyCodes.Tab) {
      this.onPressTab(e);
    } else if (this.isKeyboardNavigationEvent(e)) {
      this.changeCellFromEvent(e);
    } else if (isKeyPrintable(e.keyCode) || [keyCodes.Backspace, keyCodes.Delete, keyCodes.Enter].includes(e.keyCode)) {
      this.openEditor(e);
    }
  };

  isSelectedCellEditable() {
    const { enableCellSelect, columns, rowGetter, onCheckCellIsEditable } = this.props;
    const { selectedPosition } = this.state;
    return isSelectedCellEditable({ enableCellSelect, columns, rowGetter, selectedPosition, onCheckCellIsEditable });
  }

  openEditor = ({ key } = {}) => {
    if (this.isSelectedCellEditable() && !this.state.isEditorEnabled) {
      this.setState({
        isEditorEnabled: true,
        firstEditorKeyPress: key,
        editorPosition: this.getEditorPosition()
      });
    }
  };

  closeEditor() {
    this.setState({
      isEditorEnabled: false,
      firstEditorKeyPress: null,
      editorPosition: null
    });
  }

  onPressKeyWithCtrl({ keyCode }: React.KeyboardEvent<HTMLDivElement>) {
    if (this.copyPasteEnabled()) {
      if (keyCode === keyCodes.c) {
        const { columns, rowGetter } = this.props;
        const { selectedPosition } = this.state;
        const value = getSelectedCellValue({ selectedPosition, columns, rowGetter });
        this.handleCopy(value);
      } else if (keyCode === keyCodes.v) {
        this.handlePaste();
      }
    }
  }

  onFocus = () => {
    const { idx, rowIdx } = this.state.selectedPosition;
    if (idx === -1 && rowIdx === -1) {
      this.selectFirstCell();
    }
  };

  onPressTab(e: React.KeyboardEvent<HTMLDivElement>) {
    const { cellNavigationMode, columns, rowsCount } = this.props;
    const { selectedPosition, isEditorEnabled } = this.state;
    // When there are no rows in the grid, we need to allow the browser to handle tab presses
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
  }

  onPressEscape() {
    if (this.copyPasteEnabled()) {
      this.handleCancelCopy();
      this.closeEditor();
    }
  }

  copyPasteEnabled(): boolean {
    return this.props.onCellCopyPaste !== null && this.isSelectedCellEditable();
  }

  handleCopy(value: unknown) {
    const { rowIdx, idx } = this.state.selectedPosition;
    this.setState({
      copiedPosition: { rowIdx, idx, value }
    });
  }

  handleCancelCopy() {
    this.setState({ copiedPosition: null });
  }

  handlePaste() {
    const { columns, onCellCopyPaste, onGridRowsUpdated } = this.props;
    const { selectedPosition, copiedPosition } = this.state;
    const { rowIdx: toRow } = selectedPosition;

    if (copiedPosition === null) {
      return;
    }

    const cellKey = getSelectedColumn({ selectedPosition, columns }).key;
    const { rowIdx: fromRow, value } = copiedPosition;

    if (onCellCopyPaste) {
      onCellCopyPaste({
        cellKey,
        rowIdx: toRow,
        fromRow,
        toRow,
        value
      });
    }

    onGridRowsUpdated(cellKey, toRow, toRow, { [cellKey]: value }, UpdateActions.COPY_PASTE, fromRow);
  }

  isKeyboardNavigationEvent(e: React.KeyboardEvent<HTMLDivElement>) {
    return this.getKeyNavActionFromEvent(e) !== null;
  }

  isGroupedRowSelected(): boolean {
    const { rowGetter } = this.props;
    const { selectedPosition } = this.state;
    const rowData = getSelectedRow({ selectedPosition, rowGetter });
    return rowData && rowData.__metaData ? rowData.__metaData.isGroup : false;
  }

  getKeyNavActionFromEvent(e: React.KeyboardEvent<HTMLDivElement>): NavAction | null {
    const { rowVisibleEndIdx, rowVisibleStartIdx, colVisibleEndIdx, colVisibleStartIdx, onHitBottomBoundary, onHitRightBoundary, onHitLeftBoundary, onHitTopBoundary } = this.props;
    const isCellAtBottomBoundary = (cell: Position): boolean => cell.rowIdx >= rowVisibleEndIdx - SCROLL_CELL_BUFFER;
    const isCellAtTopBoundary = (cell: Position): boolean => cell.rowIdx !== 0 && cell.rowIdx <= rowVisibleStartIdx - 1;
    const isCellAtRightBoundary = (cell: Position): boolean => cell.idx !== 0 && cell.idx >= colVisibleEndIdx - 1;
    const isCellAtLeftBoundary = (cell: Position): boolean => cell.idx !== 0 && cell.idx <= colVisibleStartIdx + 1;

    const ArrowDown: NavAction = {
      getNext: (current) => ({ ...current, rowIdx: current.rowIdx + 1 }),
      isCellAtBoundary: isCellAtBottomBoundary,
      onHitBoundary: onHitBottomBoundary
    };
    const ArrowUp: NavAction = {
      getNext: (current) => ({ ...current, rowIdx: current.rowIdx - 1 }),
      isCellAtBoundary: isCellAtTopBoundary,
      onHitBoundary: onHitTopBoundary
    };
    const ArrowRight: NavAction = {
      getNext: (current) => ({ ...current, idx: current.idx + 1 }),
      isCellAtBoundary: isCellAtRightBoundary,
      onHitBoundary(next) {
        onHitRightBoundary(next);
        // Selected cell can hit the bottom boundary when the cellNavigationMode is 'changeRow'
        if (isCellAtBottomBoundary(next)) {
          onHitBottomBoundary(next);
        }
      }
    };
    const ArrowLeft: NavAction = {
      getNext: (current) => ({ ...current, idx: current.idx - 1 }),
      isCellAtBoundary: isCellAtLeftBoundary,
      onHitBoundary(next) {
        onHitLeftBoundary(next);
        // Selected cell can hit the top boundary when the cellNavigationMode is 'changeRow'
        if (isCellAtTopBoundary(next)) {
          onHitTopBoundary(next);
        }
      }
    };

    if (e.keyCode === keyCodes.Tab) {
      return e.shiftKey === true ? ArrowLeft : ArrowRight;
    }

    switch (e.key) {
      case 'ArrowDown': return ArrowDown;
      case 'ArrowUp': return ArrowUp;
      case 'ArrowRight': return ArrowRight;
      case 'ArrowLeft': return ArrowLeft;
      default: return null;
    }
  }

  changeCellFromEvent(e: React.KeyboardEvent<HTMLDivElement>) {
    e.preventDefault();
    const isTab = e.keyCode === keyCodes.Tab;
    const isShift = e.shiftKey;

    if (isTab) {
      const cellNavigationMode = this.props.cellNavigationMode === CellNavigationMode.NONE
        ? CellNavigationMode.CHANGE_ROW
        : this.props.cellNavigationMode;
      this.changeCellFromKeyAction(e, cellNavigationMode);
    } else if (isShift) {
      this.changeSelectedRangeFromArrowKeyAction(e);
    } else {
      this.changeCellFromKeyAction(e, this.props.cellNavigationMode);
    }
  }

  changeCellFromKeyAction(e: React.KeyboardEvent<HTMLDivElement>, cellNavigationMode: CellNavigationMode) {
    const currentPosition = this.state.selectedPosition;
    const keyNavAction = this.getKeyNavActionFromEvent(e);
    const next = this.getNextSelectedCellPositionForKeyNavAction(keyNavAction, currentPosition, cellNavigationMode);
    this.checkIsAtGridBoundary(keyNavAction, next);
    this.selectCell(next);
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
      cellNavigationMode,
      nextPosition
    });
  }

  checkIsAtGridBoundary(keyNavAction: NavAction, next) {
    const { isCellAtBoundary, onHitBoundary } = keyNavAction;
    const { changeRowOrColumn, ...nextPos } = next;
    if (isCellAtBoundary(nextPos) || changeRowOrColumn) {
      onHitBoundary(nextPos);
    }
  }

  isCellWithinBounds({ idx, rowIdx }: Position) {
    const { columns, rowsCount } = this.props;
    return rowIdx >= 0 && rowIdx < rowsCount && idx >= 0 && idx < getSize(columns);
  }

  isGridSelected() {
    return this.isCellWithinBounds(this.state.selectedPosition);
  }

  isFocused(): boolean {
    return document.activeElement === this.selectionMask.current;
  }

  isFocusedOnBody(): boolean {
    return document.activeElement === document.body;
  }

  focus() {
    if (this.selectionMask.current && !this.isFocused()) {
      this.selectionMask.current.focus();
    }
  }

  selectFirstCell() {
    this.selectCell({ rowIdx: 0, idx: 0 });
  }

  selectLastCell() {
    const { rowsCount, columns } = this.props;
    this.selectCell({ rowIdx: rowsCount - 1, idx: getSize(columns) - 1 });
  }

  selectCell = (cell: Position, openEditor?: boolean) => {
    const callback = openEditor ? this.openEditor : () => null;
    // Close the editor to commit any pending changes
    if (this.state.isEditorEnabled) {
      this.closeEditor();
    }
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

  onSelectCellRangeStarted = (selectedPosition: Position) => {
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

  isDragEnabled() {
    const { onGridRowsUpdated } = this.props;
    return this.isSelectedCellEditable() && isFunction(onGridRowsUpdated);
  }

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

  handleDragEnter = ({ overRowIdx }: DraggedPosition) => {
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
        const { columns, onGridRowsUpdated, rowGetter } = this.props;
        const column = getSelectedColumn({ selectedPosition: draggedPosition, columns });
        const value = getSelectedCellValue({ selectedPosition: draggedPosition, columns, rowGetter });
        const cellKey = column.key;
        const fromRow = rowIdx < overRowIdx ? rowIdx : overRowIdx;
        const toRow = rowIdx > overRowIdx ? rowIdx : overRowIdx;

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

  getSelectedDimensions = (selectedPosition, useGridColumns) => {
    const { scrollLeft, getRowHeight, getRowTop, getRowColumns, columns: gridColumns } = this.props;
    const columns = useGridColumns ? gridColumns : getRowColumns(selectedPosition.rowIdx);
    const top = getRowTop(selectedPosition.rowIdx);
    const rowHeight = getRowHeight(selectedPosition.rowIdx);
    return { ...getSelectedDimensions({ selectedPosition, columns, scrollLeft, rowHeight }), top };
  };

  renderSingleCellSelectView() {
    const { selectedPosition } = this.state;
    return (
      !this.state.isEditorEnabled && this.isGridSelected() && (
        <SelectionMask
          {...this.getSelectedDimensions(selectedPosition, true)}
          ref={this.selectionMask}
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
  }

  renderCellRangeSelectView() {
    const { columns, rowHeight } = this.props;
    return (
      <>
        <SelectionRangeMask
          {...getSelectedRangeDimensions({ selectedRange: this.state.selectedRange, columns, rowHeight })}
        />
        <SelectionMask
          {...this.getSelectedDimensions(this.state.selectedRange.startCell, true)}
          ref={this.selectionMask}
        />
      </>
    );
  }

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
            {...this.getSelectedDimensions(copiedPosition)}
            ref={this.copyMask}
          />
        )}
        {draggedPosition && (
          <DragMask
            draggedPosition={draggedPosition}
            getSelectedDimensions={this.getSelectedDimensions}
          />
        )}
        {selectedRangeIsSingleCell(this.state.selectedRange)
          ? this.renderSingleCellSelectView()
          : this.renderCellRangeSelectView()
        }
        {isEditorEnabled && (
          <EditorPortal target={this.props.editorPortalTarget}>
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
              editorPortalTarget={this.props.editorPortalTarget}
              {...this.getSelectedDimensions(selectedPosition)}
              {...this.state.editorPosition}
            />
          </EditorPortal>
        )}
        {isElement(contextMenu) && cloneElement(contextMenu, { ...selectedPosition })}
      </div>
    );
  }
}
