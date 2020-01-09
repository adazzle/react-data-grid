import React, { cloneElement, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Components
import SelectionMask from './SelectionMask';
import CopyMask from './CopyMask';
import DragMask, { DraggedPosition } from './DragMask';
import DragHandle from './DragHandle';
import EditorContainer from '../common/editors/EditorContainer';
import EditorPortal from '../common/editors/EditorPortal';

// Utils
import { isKeyPrintable, isCtrlKeyHeldDown } from '../utils/keyboardUtils';
import {
  getSelectedDimensions as getDimensions,
  getSelectedCellValue,
  getNextSelectedCellPosition,
  canExitGrid,
  isSelectedCellEditable
} from '../utils/selectedCellUtils';

// Types
import EventBus from '../EventBus';
import { UpdateActions, CellNavigationMode, EventTypes } from '../common/enums';
import { Position, Dimension, CommitEvent, ColumnMetrics } from '../common/types';
import { CanvasProps } from '../Canvas';

export enum KeyCodes {
  Backspace = 8,
  Tab = 9,
  Enter = 13,
  Escape = 27,
  ArrowLeft = 37,
  ArrowUp = 38,
  ArrowRight = 39,
  ArrowDown = 40,
  Delete = 46,
  c = 67,
  v = 86
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
  height: number;
  canvasRef: React.RefObject<HTMLDivElement>;
  scrollLeft: number;
  scrollTop: number;
  eventBus: EventBus;
  scrollToCell(cell: Position): void;
}

function isKeyboardNavigationEvent(e: React.KeyboardEvent<HTMLDivElement>): boolean {
  return [
    KeyCodes.ArrowLeft,
    KeyCodes.ArrowUp,
    KeyCodes.ArrowRight,
    KeyCodes.ArrowDown
  ].includes(e.keyCode);
}

export default function InteractionMasks<R, K extends keyof R>({
  columns,
  rowGetter,
  rowsCount,
  rowHeight,
  eventBus,
  enableCellSelect,
  enableCellAutoFocus,
  enableCellCopyPaste,
  enableCellDragAndDrop,
  editorPortalTarget,
  cellNavigationMode,
  canvasRef,
  scrollLeft,
  scrollTop,
  contextMenu,
  onSelectedCellChange,
  onCheckCellIsEditable,
  onGridRowsUpdated,
  scrollToCell
}: InteractionMasksProps<R, K>) {
  const [selectedPosition, setSelectedPosition] = useState<Position>(() => {
    if (enableCellAutoFocus && document.activeElement === document.body && columns.length > 0 && rowsCount > 0) {
      return { idx: 0, rowIdx: 0 };
    }
    return { idx: -1, rowIdx: -1 };
  });
  const [copiedPosition, setCopiedPosition] = useState<Position & { value: unknown } | null>(null);
  const [draggedPosition, setDraggedPosition] = useState<DraggedPosition | null>(null);
  const [firstEditorKeyPress, setFirstEditorKeyPress] = useState<string | null>(null);
  const [isEditorEnabled, setIsEditorEnabled] = useState(false);
  const selectionMaskRef = useRef<HTMLDivElement>(null);
  const isCellEditable = isCellWithinBounds(selectedPosition) && isSelectedCellEditable<R>({ enableCellSelect, columns, rowGetter, selectedPosition, onCheckCellIsEditable });

  // Focus on the selection mask when the selected position is changed
  useEffect(() => {
    if (selectedPosition.rowIdx === -1 || selectedPosition.idx === -1) return;
    selectionMaskRef.current?.focus();
  }, [selectedPosition]);

  // Focus on the selection mask after the editor is closed
  useEffect(() => {
    if (isEditorEnabled) return;
    selectionMaskRef.current?.focus();
  }, [isEditorEnabled]);

  useEffect(() => {
    return eventBus.subscribe(EventTypes.SELECT_CELL, selectCell);
  });

  useEffect(() => {
    if (draggedPosition === null) return;
    const handleDragEnter = (overRowIdx: number) => {
      setDraggedPosition({ ...draggedPosition, overRowIdx });
    };
    return eventBus.subscribe(EventTypes.DRAG_ENTER, handleDragEnter);
  }, [draggedPosition, eventBus]);

  function getEditorPosition() {
    if (!canvasRef.current) return null;
    const { left, top } = canvasRef.current.getBoundingClientRect();
    return {
      left: columns[selectedPosition.idx].left - scrollLeft + left,
      top: selectedPosition.rowIdx * rowHeight - scrollTop + top
    };
  }

  function getNextPosition(keyCode: number) {
    switch (keyCode) {
      case KeyCodes.ArrowUp:
        return { ...selectedPosition, rowIdx: selectedPosition.rowIdx - 1 };
      case KeyCodes.ArrowDown:
        return { ...selectedPosition, rowIdx: selectedPosition.rowIdx + 1 };
      case KeyCodes.ArrowLeft:
        return { ...selectedPosition, idx: selectedPosition.idx - 1 };
      case KeyCodes.ArrowRight:
        return { ...selectedPosition, idx: selectedPosition.idx + 1 };
      default:
        return selectedPosition;
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>): void {
    if (isCtrlKeyHeldDown(e)) {
      onPressKeyWithCtrl(e);
    } else if (e.keyCode === KeyCodes.Escape) {
      onPressEscape();
    } else if (e.keyCode === KeyCodes.Tab) {
      onPressTab(e);
    } else if (isKeyboardNavigationEvent(e)) {
      changeCellFromEvent(e);
    } else if (isKeyPrintable(e.keyCode) || [KeyCodes.Backspace, KeyCodes.Delete, KeyCodes.Enter].includes(e.keyCode)) {
      openEditor(e);
    }
  }

  function openEditor(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (isCellEditable && !isEditorEnabled) {
      setFirstEditorKeyPress(event.key);
      setIsEditorEnabled(true);
    }
  }

  function closeEditor(): void {
    setIsEditorEnabled(false);
    setFirstEditorKeyPress(null);
  }

  function onPressKeyWithCtrl({ keyCode }: React.KeyboardEvent<HTMLDivElement>): void {
    if (!enableCellCopyPaste) return;
    if (keyCode === KeyCodes.c) {
      handleCopy();
    } else if (keyCode === KeyCodes.v) {
      handlePaste();
    }
  }

  function onPressTab(e: React.KeyboardEvent<HTMLDivElement>): void {
    // When there are no rows in the grid, we need to allow the browser to handle tab presses
    if (rowsCount === 0) {
      return;
    }

    // If we are in a position to leave the grid, stop editing but stay in that cell
    if (canExitGrid(e, { cellNavigationMode, columns, rowsCount, selectedPosition })) {
      if (isEditorEnabled) {
        closeEditor();
        return;
      }

      // Reset the selected position before exiting
      setSelectedPosition({ idx: -1, rowIdx: -1 });
      return;
    }

    e.preventDefault();
    const tabCellNavigationMode = cellNavigationMode === CellNavigationMode.NONE
      ? CellNavigationMode.CHANGE_ROW
      : cellNavigationMode;
    const keyCode = e.shiftKey ? KeyCodes.ArrowLeft : KeyCodes.ArrowRight;
    let nextPosition = getNextPosition(keyCode);
    nextPosition = getNextSelectedCellPosition<R>({
      columns,
      rowsCount,
      cellNavigationMode: tabCellNavigationMode,
      nextPosition
    });
    selectCell(nextPosition);
  }

  function onPressEscape(): void {
    closeEditor();
    setCopiedPosition(null);
  }

  function handleCopy(): void {
    const value = getSelectedCellValue({ selectedPosition, columns, rowGetter });
    setCopiedPosition({ ...selectedPosition, value });
  }

  function handlePaste(): void {
    if (copiedPosition === null || !isCellEditable) {
      return;
    }

    const { rowIdx: toRow } = selectedPosition;

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

  function changeCellFromEvent(e: React.KeyboardEvent<HTMLDivElement>): void {
    e.preventDefault();
    const nextPosition = getNextPosition(e.keyCode);
    selectCell(nextPosition);
  }

  function isCellWithinBounds({ idx, rowIdx }: Position): boolean {
    return rowIdx >= 0 && rowIdx < rowsCount && idx >= 0 && idx < columns.length;
  }

  function selectCell(position: Position, enableEditor = false): void {
    // Close the editor to commit any pending changes
    if (isEditorEnabled) {
      closeEditor();
    }

    if (!isCellWithinBounds(position)) return;

    scrollToCell(position);
    setSelectedPosition(position);
    onSelectedCellChange?.({ ...position });
    if (enableEditor) {
      // The editor position is dependent on the selectionMask position so we need to wait
      // for the next render cycle when the updated selection mask position is set
      setIsEditorEnabled(true);
    }
  }

  function isDragEnabled(): boolean {
    return enableCellDragAndDrop && isCellEditable;
  }

  function handleDragStart(e: React.DragEvent<HTMLDivElement>): void {
    e.dataTransfer.effectAllowed = 'copy';
    // Setting data is required to make an element draggable in FF
    const transferData = JSON.stringify(selectedPosition);
    try {
      e.dataTransfer.setData('text/plain', transferData);
    } catch (ex) {
      // IE only supports 'text' and 'URL' for the 'type' argument
      e.dataTransfer.setData('text', transferData);
    }
    setDraggedPosition({ ...selectedPosition, overRowIdx: selectedPosition.rowIdx });
  }

  function handleDragEnd() {
    if (draggedPosition === null) return;

    const { rowIdx, overRowIdx } = draggedPosition;
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

    setDraggedPosition(null);
  }

  function onDragHandleDoubleClick(): void {
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
  }

  function onCommit({ cellKey, rowIdx, updated }: CommitEvent<R>): void {
    onGridRowsUpdated({
      cellKey,
      fromRow: rowIdx,
      toRow: rowIdx,
      updated,
      action: UpdateActions.CELL_UPDATE
    });
    closeEditor();
  }

  function getSelectedDimensions(selectedPosition: Position): Dimension {
    const top = rowHeight * selectedPosition.rowIdx;
    const dimension = getDimensions({ selectedPosition, columns, scrollLeft, rowHeight });
    dimension.top = top;
    return dimension;
  }

  function renderSingleCellSelectView() {
    return (
      !isEditorEnabled && isCellWithinBounds(selectedPosition) && (
        <SelectionMask
          {...getSelectedDimensions(selectedPosition)}
          ref={selectionMaskRef}
        >
          {isDragEnabled() && (
            <DragHandle
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDoubleClick={onDragHandleDoubleClick}
            />
          )}
        </SelectionMask>
      )
    );
  }

  return (
    <div
      onKeyDown={onKeyDown}
    >
      {copiedPosition && <CopyMask {...getSelectedDimensions(copiedPosition)} />}
      {draggedPosition && (
        <DragMask
          draggedPosition={draggedPosition}
          getSelectedDimensions={getSelectedDimensions}
        />
      )}
      {renderSingleCellSelectView()}
      {isEditorEnabled && (
        <EditorPortal target={editorPortalTarget}>
          <EditorContainer<R, K>
            firstEditorKeyPress={firstEditorKeyPress}
            onCommit={onCommit}
            onCommitCancel={closeEditor}
            rowIdx={selectedPosition.rowIdx}
            value={getSelectedCellValue({ selectedPosition, columns, rowGetter })!}
            rowData={rowGetter(selectedPosition.rowIdx)}
            column={columns[selectedPosition.idx]}
            scrollLeft={scrollLeft}
            scrollTop={scrollTop}
            {...getSelectedDimensions(selectedPosition)}
            {...getEditorPosition()}
          />
        </EditorPortal>
      )}
      {contextMenu && createPortal(
        cloneElement(contextMenu, { ...selectedPosition }),
        editorPortalTarget
      )}
    </div>
  );
}
