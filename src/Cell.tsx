import React, { forwardRef, memo, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { legacyCellInput } from './editors/CellInputHandlers';
import EditorContainer from './editors/EditorContainer';
import EditorPortal from './editors/EditorPortal';
import { CellRendererProps, CommitEvent, Position } from './common/types';
import { preventDefault, wrapEvent, canEdit, isCtrlKeyHeldDown } from './utils';
import { useCombinedRefs } from './hooks';

function getNextPosition(key: string, shiftKey: boolean, currentPosition: Position) {
  const { idx, rowIdx } = currentPosition;
  switch (key) {
    case 'ArrowUp':
      return { idx, rowIdx: rowIdx - 1 };
    case 'ArrowDown':
      return { idx, rowIdx: rowIdx + 1 };
    case 'ArrowLeft':
      return { idx: idx - 1, rowIdx };
    case 'ArrowRight':
      return { idx: idx + 1, rowIdx };
    case 'Tab':
      return { idx: idx + (shiftKey ? -1 : 1), rowIdx };
    default:
      return currentPosition;
  }
}

function Cell<R, SR>({
  className,
  column,
  isSelected,
  isCopied,
  isDraggedOver,
  isRowSelected,
  lastFrozenColumnIndex,
  row,
  rowIdx,
  rowHeight,
  eventBus,
  enableCellDragAndDrop,
  onRowClick,
  onClick,
  onDoubleClick,
  onKeyDown,
  onContextMenu,
  onDragOver,
  ...props
}: CellRendererProps<R, SR>, ref: React.Ref<HTMLDivElement>) {
  const cellRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [inputKey, setInputKey] = useState<string | null>(null);

  useEffect(() => {
    if (!isEditing && isSelected) {
      cellRef.current?.focus();
    }
  }, [isEditing, isSelected]);

  function selectCell(openEditor?: boolean) {
    if (openEditor && canEdit(column, row)) {
      setIsEditing(true);
    }
    eventBus.dispatch('CELL_SELECT', { idx: column.idx, rowIdx });
  }

  function handleClick() {
    selectCell();
    onRowClick?.(rowIdx, row, column);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const isActivatedByUser = (column.unsafe_onCellInput ?? legacyCellInput)(event, row) === true;
    const canOpenEditor = !isEditing && canEdit(column, row);

    const { key, shiftKey } = event;
    if (isCtrlKeyHeldDown(event)) {
      // event.key may be uppercase `C` or `V`
      const lowerCaseKey = key.toLowerCase();
      if (lowerCaseKey === 'c') {
        eventBus.dispatch('CELL_COPY', row[column.key as keyof R]);
        return;
      }

      if (lowerCaseKey === 'v') {
        eventBus.dispatch('CELL_PASTE', { idx: column.idx, rowIdx });
        return;
      }
    }

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(key)) {
      event.preventDefault();
      eventBus.dispatch('CELL_NAVIGATE',
        key,
        shiftKey,
        getNextPosition(key, shiftKey, { idx: column.idx, rowIdx })
      );
      return;
    }

    // Use CELL_EDIT action instead?
    switch (key) {
      case 'Enter':
        if (canOpenEditor) {
          setIsEditing(true);
          setInputKey(key);
        } else if (isEditing) {
          setIsEditing(false);
          setInputKey(null);
        }
        break;
      case 'Escape':
        setIsEditing(false);
        setInputKey(null);
        break;
      default:
        if (canOpenEditor && isActivatedByUser) {
          setIsEditing(true);
          setInputKey(key);
        }
        break;
    }
  }

  function handleContextMenu() {
    selectCell();
  }

  function handleDoubleClick() {
    selectCell(true);
  }

  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.dataTransfer.effectAllowed = 'copy';
    // Setting data is required to make an element draggable in FF
    const transferData = JSON.stringify({});
    try {
      event.dataTransfer.setData('text/plain', transferData);
    } catch (ex) {
      // IE only supports 'text' and 'URL' for the 'type' argument
      event.dataTransfer.setData('text', transferData);
    }
    eventBus.dispatch('CELL_DRAG_START');
  }

  function handleDragEnd() {
    eventBus.dispatch('CELL_DRAG_END');
  }

  function handleDragHandleDoubleClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    eventBus.dispatch('CELL_DRAG_HANDLE_DOUBLE_CLICK');
  }

  function onRowSelectionChange(checked: boolean, isShiftClick: boolean) {
    eventBus.dispatch('ROW_SELECT', { rowIdx, checked, isShiftClick });
  }

  function onCommit(event: CommitEvent): void {
    eventBus.dispatch('CELL_COMMIT', event);
    setIsEditing(false);
  }

  const { cellClass } = column;
  className = clsx(
    'rdg-cell',
    {
      'rdg-cell-frozen': column.frozen,
      'rdg-cell-frozen-last': column.idx === lastFrozenColumnIndex,
      'rdg-cell-selected': isSelected,
      'rdg-cell-copied': isCopied,
      'rdg-cell-dragged-over': isDraggedOver
    },
    typeof cellClass === 'function' ? cellClass(row) : cellClass,
    className
  );

  return (
    <div
      ref={useCombinedRefs(cellRef, ref)}
      className={className}
      tabIndex={isSelected ? 0 : undefined}
      style={{
        width: column.width,
        left: column.left
      }}
      onClick={wrapEvent(handleClick, onClick)}
      onDoubleClick={wrapEvent(handleDoubleClick, onDoubleClick)}
      onContextMenu={wrapEvent(handleContextMenu, onContextMenu)}
      onDragOver={wrapEvent(preventDefault, onDragOver)}
      onKeyDown={wrapEvent(handleKeyDown, onKeyDown)}
      {...props}
    >
      {!isEditing && (
        <>
          <column.formatter
            column={column}
            rowIdx={rowIdx}
            row={row}
            isRowSelected={isRowSelected}
            onRowSelectionChange={onRowSelectionChange}
          />
          {enableCellDragAndDrop && isSelected && canEdit(column, row) && (
            <div
              className="rdg-cell-drag-handle"
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDoubleClick={handleDragHandleDoubleClick}
            />
          )}
        </>
      )}
      {isEditing && (
        <EditorPortal target={document.body}>
          <EditorContainer<R, SR>
            firstEditorKeyPress={inputKey}
            onCommit={onCommit}
            onCommitCancel={() => setIsEditing(false)}
            rowIdx={rowIdx}
            row={row}
            rowHeight={rowHeight}
            column={column}
            scrollLeft={0}
            scrollTop={0}
            left={cellRef.current?.getBoundingClientRect().left ?? 0}
            top={cellRef.current?.getBoundingClientRect().top ?? 0}
          />
        </EditorPortal>
      )}
    </div>
  );
}

export default memo(forwardRef(Cell)) as <R, SR = unknown>(props: CellRendererProps<R, SR>) => JSX.Element;
