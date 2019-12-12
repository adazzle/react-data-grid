import React, { cloneElement } from 'react';
import { createPortal } from 'react-dom';
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
import { isKeyPrintable, isCtrlKeyHeldDown } from '../utils/keyboardUtils';
import {
  getSelectedDimensions,
  getSelectedCellValue,
  getSelectedRangeDimensions,
  getNextSelectedCellPosition,
  canExitGrid,
  isSelectedCellEditable,
  selectedRangeIsSingleCell,
  NextSelectedCellPosition
} from '../utils/selectedCellUtils';

// Types
import EventBus from '../EventBus';
import { UpdateActions, CellNavigationMode, EventTypes } from '../common/enums';
import { CalculatedColumn, Position, SelectedRange, Dimension, CommitEvent, ColumnMetrics } from '../common/types';
import { CanvasProps } from '../Canvas';

export enum KeyCodes {
  Backspace = 8,
  Tab = 9,
  Enter = 13,
  Escape = 27,
  Delete = 46,
  c = 67,
  v = 86
}

interface NavAction {
  getNext(current: Position): Position;
  isCellAtBoundary(cell: Position): boolean;
  onHitBoundary(next: Position): void;
}

type SharedCanvasProps<R, K extends keyof R> = Pick<CanvasProps<R, K>,
| 'rowGetter'
| 'rowsCount'
| 'rowHeight'
| 'enableCellSelect'
| 'enableCellAutoFocus'
| 'enableCellCopyPaste'
| 'enableCellDragAndDrop'
| 'cellNavigationMode'
| 'contextMenu'
| 'editorPortalTarget'
| 'onCheckCellIsEditable'
| 'onSelectedCellChange'
| 'onSelectedCellRangeChange'
| 'onGridRowsUpdated'
> & Pick<ColumnMetrics<R>, 'columns'>;

export interface InteractionMasksProps<R, K extends keyof R> extends SharedCanvasProps<R, K> {
  onHitTopBoundary(position: Position): void;
  onHitBottomBoundary(position: Position): void;
  onHitLeftBoundary(position: Position): void;
  onHitRightBoundary(position: Position): void;
  height: number;
  scrollLeft: number;
  scrollTop: number;
  getRowColumns(rowIdx: number): CalculatedColumn<R>[];
  colVisibleStartIdx: number;
  colVisibleEndIdx: number;
  eventBus: EventBus;
}

export interface InteractionMasksState {
  selectedPosition: Position;
  selectedRange: SelectedRange;
  copiedPosition: Position & { value: unknown } | null;
  draggedPosition: DraggedPosition | null;
  editorPosition: { top: number; left: number } | null;
  isEditorEnabled: boolean;
  firstEditorKeyPress: string | null;
}

export default class InteractionMasks<R, K extends keyof R> extends React.Component<InteractionMasksProps<R, K>, InteractionMasksState> {
  static displayName = 'InteractionMasks';

  readonly state: Readonly<InteractionMasksState> = {
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
      },
      startCell: null,
      cursorCell: null,
      isDragging: false
    },
    copiedPosition: null,
    draggedPosition: null,
    editorPosition: null,
    isEditorEnabled: false,
    firstEditorKeyPress: null
  };

  private readonly selectionMask = React.createRef<HTMLDivElement>();

  private unsubscribeEventHandlers: Array<() => void> = [];

  componentDidUpdate(prevProps: InteractionMasksProps<R, K>, prevState: InteractionMasksState) {
    const { selectedPosition, isEditorEnabled } = this.state;
    const { selectedPosition: prevSelectedPosition, isEditorEnabled: prevIsEditorEnabled } = prevState;
    const isSelectedPositionChanged = selectedPosition !== prevSelectedPosition
      && (selectedPosition.rowIdx !== prevSelectedPosition.rowIdx || selectedPosition.idx !== prevSelectedPosition.idx)
      && this.isCellWithinBounds(selectedPosition);
    const isEditorClosed = isEditorEnabled !== prevIsEditorEnabled && !isEditorEnabled;

    if (isSelectedPositionChanged) {
      this.props.onSelectedCellChange?.({ ...selectedPosition });
    }

    if (isSelectedPositionChanged || isEditorClosed) {
      this.focus();
    }
  }

  componentDidMount() {
    const { eventBus, enableCellAutoFocus } = this.props;

    this.unsubscribeEventHandlers = [
      eventBus.subscribe(EventTypes.SELECT_CELL, this.selectCell),
      eventBus.subscribe(EventTypes.SELECT_START, this.onSelectCellRangeStarted),
      eventBus.subscribe(EventTypes.SELECT_UPDATE, this.onSelectCellRangeUpdated),
      eventBus.subscribe(EventTypes.SELECT_END, this.onSelectCellRangeEnded),
      eventBus.subscribe(EventTypes.DRAG_ENTER, this.handleDragEnter)
    ];

    if (enableCellAutoFocus && this.isFocusedOnBody()) {
      this.selectFirstCell();
    }
  }

  componentWillUnmount() {
    this.unsubscribeEventHandlers.forEach(h => h());
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

  onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (isCtrlKeyHeldDown(e)) {
      this.onPressKeyWithCtrl(e);
    } else if (e.keyCode === KeyCodes.Escape) {
      this.onPressEscape();
    } else if (e.keyCode === KeyCodes.Tab) {
      this.onPressTab(e);
    } else if (this.isKeyboardNavigationEvent(e)) {
      this.changeCellFromEvent(e);
    } else if (isKeyPrintable(e.keyCode) || ([KeyCodes.Backspace, KeyCodes.Delete, KeyCodes.Enter] as number[]).includes(e.keyCode)) {
      this.openEditor(e);
    }
  };

  isSelectedCellEditable(): boolean {
    const { enableCellSelect, columns, rowGetter, onCheckCellIsEditable } = this.props;
    const { selectedPosition } = this.state;
    return isSelectedCellEditable<R>({ enableCellSelect, columns, rowGetter, selectedPosition, onCheckCellIsEditable });
  }

  openEditor = (event?: React.KeyboardEvent<HTMLDivElement>): void => {
    if (this.isSelectedCellEditable() && !this.state.isEditorEnabled) {
      this.setState({
        isEditorEnabled: true,
        firstEditorKeyPress: event ? event.key : null,
        editorPosition: this.getEditorPosition()
      });
    }
  };

  closeEditor(): void {
    this.setState({
      isEditorEnabled: false,
      firstEditorKeyPress: null,
      editorPosition: null
    });
  }

  onPressKeyWithCtrl({ keyCode }: React.KeyboardEvent<HTMLDivElement>): void {
    if (this.copyPasteEnabled()) {
      if (keyCode === KeyCodes.c) {
        this.handleCopy();
      } else if (keyCode === KeyCodes.v) {
        this.handlePaste();
      }
    }
  }

  onFocus = (): void => {
    const { idx, rowIdx } = this.state.selectedPosition;
    if (idx === -1 && rowIdx === -1) {
      this.selectFirstCell();
    }
  };

  onPressTab(e: React.KeyboardEvent<HTMLDivElement>): void {
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

  onPressEscape(): void {
    if (this.copyPasteEnabled()) {
      this.handleCancelCopy();
      this.closeEditor();
    }
  }

  copyPasteEnabled(): boolean {
    return this.props.enableCellCopyPaste && this.isSelectedCellEditable();
  }

  handleCopy(): void {
    const { columns, rowGetter } = this.props;
    const { selectedPosition } = this.state;
    const value = getSelectedCellValue({ selectedPosition, columns, rowGetter });
    this.setState({
      copiedPosition: { ...selectedPosition, value }
    });
  }

  handleCancelCopy(): void {
    this.setState({ copiedPosition: null });
  }

  handlePaste(): void {
    const { columns, onGridRowsUpdated } = this.props;
    const { selectedPosition, copiedPosition } = this.state;
    const { rowIdx: toRow } = selectedPosition;

    if (copiedPosition === null) {
      return;
    }

    const cellKey = columns[selectedPosition.idx].key;
    const { rowIdx: fromRow, idx, value } = copiedPosition;
    const fromCellKey = columns[idx].key;

    onGridRowsUpdated({
      cellKey,
      fromRow,
      toRow,
      updated: { [cellKey]: value } as never,
      action: UpdateActions.COPY_PASTE,
      fromCellKey
    });
  }

  isKeyboardNavigationEvent(e: React.KeyboardEvent<HTMLDivElement>): boolean {
    return this.getKeyNavActionFromEvent(e) !== null;
  }

  getKeyNavActionFromEvent(e: React.KeyboardEvent<HTMLDivElement>): NavAction | null {
    const { colVisibleEndIdx, colVisibleStartIdx, onHitBottomBoundary, onHitRightBoundary, onHitLeftBoundary, onHitTopBoundary } = this.props;
    const isCellAtBottomBoundary = (cell: Position): boolean => {
      return (cell.rowIdx + 1) * this.props.rowHeight > this.props.scrollTop + this.props.height;
    };
    const isCellAtTopBoundary = (cell: Position): boolean => {
      return cell.rowIdx * this.props.rowHeight < this.props.scrollTop;
    };
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

    if (e.keyCode === KeyCodes.Tab) {
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

  changeCellFromEvent(e: React.KeyboardEvent<HTMLDivElement>): void {
    e.preventDefault();
    const isTab = e.keyCode === KeyCodes.Tab;
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

  changeCellFromKeyAction(e: React.KeyboardEvent<HTMLDivElement>, cellNavigationMode: CellNavigationMode): void {
    const keyNavAction = this.getKeyNavActionFromEvent(e);
    if (keyNavAction) {
      const currentPosition = this.state.selectedPosition;
      const next = this.getNextSelectedCellPositionForKeyNavAction(keyNavAction, currentPosition, cellNavigationMode);
      this.checkIsAtGridBoundary(keyNavAction, next);
      this.selectCell(next);
    }
  }

  changeSelectedRangeFromArrowKeyAction(e: React.KeyboardEvent<HTMLDivElement>): void {
    const keyNavAction = this.getKeyNavActionFromEvent(e);
    if (keyNavAction) {
      const { cellNavigationMode } = this.props;
      const currentPosition = this.state.selectedRange.cursorCell || this.state.selectedPosition;
      const next = this.getNextSelectedCellPositionForKeyNavAction(keyNavAction, currentPosition, cellNavigationMode);
      this.checkIsAtGridBoundary(keyNavAction, next);
      this.onSelectCellRangeUpdated({ ...next }, true, () => { this.onSelectCellRangeEnded(); });
    }
  }

  getNextSelectedCellPositionForKeyNavAction(keyNavAction: NavAction, currentPosition: Position, cellNavigationMode: CellNavigationMode): NextSelectedCellPosition {
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

  checkIsAtGridBoundary(keyNavAction: NavAction, next: NextSelectedCellPosition): void {
    const { isCellAtBoundary, onHitBoundary } = keyNavAction;
    const { changeRowOrColumn, ...nextPos } = next;
    if (isCellAtBoundary(nextPos) || changeRowOrColumn) {
      onHitBoundary(nextPos);
    }
  }

  isCellWithinBounds({ idx, rowIdx }: Position): boolean {
    const { columns, rowsCount } = this.props;
    return rowIdx >= 0 && rowIdx < rowsCount && idx >= 0 && idx < columns.length;
  }

  isGridSelected(): boolean {
    return this.isCellWithinBounds(this.state.selectedPosition);
  }

  isFocused(): boolean {
    return document.activeElement === this.selectionMask.current;
  }

  isFocusedOnBody(): boolean {
    return document.activeElement === document.body;
  }

  focus = (): void => {
    if (this.selectionMask.current && !this.isFocused()) {
      this.selectionMask.current.focus();
    }
  };

  selectFirstCell(): void {
    this.selectCell({ rowIdx: 0, idx: 0 });
  }

  selectCell = (cell: Position, openEditor?: boolean): void => {
    const callback = openEditor ? this.openEditor : undefined;
    // Close the editor to commit any pending changes
    if (this.state.isEditorEnabled) {
      this.closeEditor();
    }
    this.setState(() => {
      if (!this.isCellWithinBounds(cell)) return null;

      return {
        selectedPosition: cell,
        selectedRange: {
          topLeft: cell,
          bottomRight: cell,
          startCell: cell,
          cursorCell: cell,
          isDragging: false
        }
      };
    }, callback);
  };

  createSingleCellSelectedRange(cellPosition: Position, isDragging: boolean): SelectedRange {
    return {
      topLeft: cellPosition,
      bottomRight: cellPosition,
      startCell: cellPosition,
      cursorCell: cellPosition,
      isDragging
    };
  }

  onSelectCellRangeStarted = (selectedPosition: Position): void => {
    this.setState({
      selectedRange: this.createSingleCellSelectedRange(selectedPosition, true),
      selectedPosition
    }, () => {
      this.props.onSelectedCellRangeChange?.(this.state.selectedRange);
    });
  };

  onSelectCellRangeUpdated = (cellPosition: Position, isFromKeyboard?: boolean, callback?: () => void): void => {
    if (!this.state.selectedRange.isDragging && !isFromKeyboard || !this.isCellWithinBounds(cellPosition)) {
      return;
    }

    const startCell = this.state.selectedRange.startCell || this.state.selectedPosition;
    const colIdxs = [startCell.idx, cellPosition.idx].sort((a, b) => a - b);
    const rowIdxs = [startCell.rowIdx, cellPosition.rowIdx].sort((a, b) => a - b);
    const topLeft: Position = { idx: colIdxs[0], rowIdx: rowIdxs[0] };
    const bottomRight: Position = { idx: colIdxs[1], rowIdx: rowIdxs[1] };

    const selectedRange: SelectedRange = {
      ...this.state.selectedRange,
      // default the startCell to the selected cell, in case we've just started via keyboard
      startCell: this.state.selectedRange.startCell || this.state.selectedPosition,
      // assign the new state - the bounds of the range, and the new cursor cell
      topLeft,
      bottomRight,
      cursorCell: cellPosition
    };

    this.setState({
      selectedRange
    }, () => {
      this.props.onSelectedCellRangeChange?.(this.state.selectedRange);
      if (callback) {
        callback();
      }
    });
  };

  onSelectCellRangeEnded = (): void => {
    const selectedRange = { ...this.state.selectedRange, isDragging: false };
    this.setState({ selectedRange }, () => {
      this.props.onSelectedCellRangeChange?.(this.state.selectedRange);

      // Focus the InteractionMasks, so it can receive keyboard events
      this.focus();
    });
  };

  isDragEnabled(): boolean {
    return this.props.enableCellDragAndDrop && this.isSelectedCellEditable();
  }

  handleDragStart = (e: React.DragEvent<HTMLDivElement>): void => {
    const { selectedPosition } = this.state;
    // To prevent dragging down/up when reordering rows. (TODO: is this required)
    if (selectedPosition.idx > -1) {
      e.dataTransfer.effectAllowed = 'copy';
      // Setting data is required to make an element draggable in FF
      const transferData = JSON.stringify(selectedPosition);
      try {
        e.dataTransfer.setData('text/plain', transferData);
      } catch (ex) {
        // IE only supports 'text' and 'URL' for the 'type' argument
        e.dataTransfer.setData('text', transferData);
      }
      this.setState({
        draggedPosition: {
          ...selectedPosition,
          overRowIdx: selectedPosition.rowIdx
        }
      });
    }
  };

  handleDragEnter = (overRowIdx: number): void => {
    this.setState(({ draggedPosition }) => {
      if (draggedPosition) {
        return { draggedPosition: { ...draggedPosition, overRowIdx } };
      }
      return null;
    });
  };

  handleDragEnd = () => {
    const { draggedPosition } = this.state;
    if (draggedPosition === null) return;

    const { rowIdx, overRowIdx } = draggedPosition;
    const { columns, onGridRowsUpdated, rowGetter } = this.props;
    const column = columns[draggedPosition.idx];
    const value = getSelectedCellValue({ selectedPosition: draggedPosition, columns, rowGetter });
    const cellKey = column.key;

    onGridRowsUpdated({
      cellKey,
      fromRow: rowIdx,
      toRow: overRowIdx,
      updated: { [cellKey]: value } as never,
      action: UpdateActions.CELL_DRAG
    });

    this.setState({
      draggedPosition: null
    });
  };

  onDragHandleDoubleClick = (): void => {
    const { selectedPosition } = this.state;
    const { columns, onGridRowsUpdated, rowGetter, rowsCount } = this.props;
    const column = columns[selectedPosition.idx];
    const value = getSelectedCellValue({ selectedPosition, columns, rowGetter });
    const cellKey = column.key;

    onGridRowsUpdated({
      cellKey,
      fromRow: selectedPosition.rowIdx,
      toRow: rowsCount - 1,
      updated: { [cellKey]: value } as never,
      action: UpdateActions.COLUMN_FILL
    });
  };

  onCommit = ({ cellKey, rowIdx, updated }: CommitEvent<R>): void => {
    this.props.onGridRowsUpdated({
      cellKey,
      fromRow: rowIdx,
      toRow: rowIdx,
      updated,
      action: UpdateActions.CELL_UPDATE
    });
    this.closeEditor();
  };

  onCommitCancel = (): void => {
    this.closeEditor();
  };

  getRowTop(rowIdx: number): number {
    return rowIdx * this.props.rowHeight;
  }

  getSelectedDimensions = (selectedPosition: Position, useGridColumns = false): Dimension => {
    const { scrollLeft, rowHeight, getRowColumns } = this.props;
    const columns = useGridColumns ? this.props.columns : getRowColumns(selectedPosition.rowIdx);
    const top = this.getRowTop(selectedPosition.rowIdx);
    const dimension = getSelectedDimensions({ selectedPosition, columns, scrollLeft, rowHeight });
    dimension.top = top;
    return dimension;
  };

  renderSingleCellSelectView() {
    return (
      !this.state.isEditorEnabled && this.isGridSelected() && (
        <SelectionMask
          {...this.getSelectedDimensions(this.state.selectedPosition, true)}
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
          {...this.getSelectedDimensions(this.state.selectedPosition, true)}
          ref={this.selectionMask}
        />
      </>
    );
  }

  render() {
    const { rowGetter, contextMenu, getRowColumns, scrollLeft, scrollTop, editorPortalTarget } = this.props;
    const { isEditorEnabled, firstEditorKeyPress, selectedPosition, draggedPosition, copiedPosition } = this.state;
    const rowData = rowGetter(selectedPosition.rowIdx);
    const columns = getRowColumns(selectedPosition.rowIdx);
    return (
      <div
        onKeyDown={this.onKeyDown}
        onFocus={this.onFocus}
      >
        {copiedPosition && <CopyMask {...this.getSelectedDimensions(copiedPosition)} />}
        {draggedPosition && (
          <DragMask
            draggedPosition={draggedPosition}
            getSelectedDimensions={this.getSelectedDimensions}
          />
        )}
        {selectedRangeIsSingleCell(this.state.selectedRange)
          ? this.renderSingleCellSelectView()
          : this.renderCellRangeSelectView()}
        {isEditorEnabled && (
          <EditorPortal target={editorPortalTarget}>
            <EditorContainer<R, K>
              firstEditorKeyPress={firstEditorKeyPress}
              onCommit={this.onCommit}
              onCommitCancel={this.onCommitCancel}
              rowIdx={selectedPosition.rowIdx}
              value={getSelectedCellValue({ selectedPosition, columns, rowGetter })!}
              rowData={rowData}
              column={columns[selectedPosition.idx]}
              scrollLeft={scrollLeft}
              scrollTop={scrollTop}
              {...this.getSelectedDimensions(selectedPosition)}
              {...this.state.editorPosition}
            />
          </EditorPortal>
        )}
        {isElement(contextMenu) && createPortal(
          cloneElement(contextMenu, { ...selectedPosition }),
          editorPortalTarget
        )}
      </div>
    );
  }
}
