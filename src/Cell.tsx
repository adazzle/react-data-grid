import { forwardRef, memo, useRef, useLayoutEffect } from 'react';
import type { RefAttributes } from 'react';
import { css } from '@linaria/core';

import { getCellStyle, getCellClassname, isCellEditable } from './utils';
import type { CellRendererProps } from './types';

const cellCopied = css`
  background-color: #ccccff;
`;

const cellCopiedClassname = `rdg-cell-copied ${cellCopied}`;

const cellDraggedOver = css`
  background-color: #ccccff;

  &.${cellCopied} {
    background-color: #9999ff;
  }
`;

const cellDraggedOverClassname = `rdg-cell-dragged-over ${cellDraggedOver}`;

const cellDragHandle = css`
  cursor: move;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 8px;
  height: 8px;
  background-color: var(--selection-color);

  &:hover {
    width: 16px;
    height: 16px;
    border: 2px solid var(--selection-color);
    background-color: var(--background-color);
  }
`;

const cellDragHandleClassname = `rdg-cell-drag-handle ${cellDragHandle}`;

function Cell<R, SR>({
  className,
  column,
  colSpan,
  isCellSelected,
  isCopied,
  isDraggedOver,
  isRowSelected,
  row,
  rowIdx,
  dragHandleProps,
  onRowClick,
  onClick,
  onDoubleClick,
  onContextMenu,
  onFocus,
  onRowChange,
  selectCell,
  selectRow,
  ...props
}: CellRendererProps<R, SR>) {
  const cellRef = useRef<HTMLDivElement>(null);
  const isCellFocusable = useRef(false);

  const { cellClass } = column;
  className = getCellClassname(
    column,
    {
      [cellCopiedClassname]: isCopied,
      [cellDraggedOverClassname]: isDraggedOver
    },
    typeof cellClass === 'function' ? cellClass(row) : cellClass,
    className
  );

  useLayoutEffect(() => {
    if (!isCellSelected) return;
    if (isCellFocusable.current) {
      isCellFocusable.current = false;
      return;
    }
    cellRef.current?.focus({ preventScroll: true });
  }, [isCellSelected]);

  function selectCellWrapper(openEditor?: boolean) {
    selectCell({ idx: column.idx, rowIdx }, openEditor);
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    selectCellWrapper(column.editorOptions?.editOnClick);
    onRowClick?.(rowIdx, row, column);
    onClick?.(event);
  }

  function handleContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    selectCellWrapper();
    onContextMenu?.(event);
  }

  function handleDoubleClick(event: React.MouseEvent<HTMLDivElement>) {
    selectCellWrapper(true);
    onDoubleClick?.(event);
  }

  function handleFocus(event: React.FocusEvent<HTMLDivElement>) {
    if (event.target !== cellRef.current) {
      isCellFocusable.current = true;
    }
    onFocus?.(event);
  }

  function handleRowChange(newRow: R) {
    onRowChange(rowIdx, newRow);
  }

  function onRowSelectionChange(checked: boolean, isShiftClick: boolean) {
    selectRow({ rowIdx, checked, isShiftClick });
  }

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1} // aria-colindex is 1-based
      aria-selected={isCellSelected}
      aria-colspan={colSpan}
      aria-readonly={!isCellEditable(column, row) || undefined}
      ref={cellRef}
      className={className}
      tabIndex={isCellSelected ? 0 : -1}
      style={getCellStyle(column, colSpan)}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onFocus={isCellSelected ? handleFocus : undefined}
      {...props}
    >
      {!column.rowGroup && (
        <>
          <column.formatter
            column={column}
            rowIdx={rowIdx}
            row={row}
            isCellSelected={isCellSelected}
            isRowSelected={isRowSelected}
            onRowSelectionChange={onRowSelectionChange}
            onRowChange={handleRowChange}
          />
          {dragHandleProps && (
            <div className={cellDragHandleClassname} {...dragHandleProps} />
          )}
        </>
      )}
    </div>
  );
}

export default memo(forwardRef(Cell)) as <R, SR = unknown>(props: CellRendererProps<R, SR> & RefAttributes<HTMLDivElement>) => JSX.Element;
