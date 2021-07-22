import { memo } from 'react';
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
  column,
  colSpan,
  isCellSelected,
  isCopied,
  isDraggedOver,
  row,
  dragHandleProps,
  onRowClick,
  onRowDoubleClick,
  onRowChange,
  selectCell,
  ...props
}: CellRendererProps<R, SR>) {
  const { cellClass } = column;
  const className = getCellClassname(
    column,
    {
      [cellCopiedClassname]: isCopied,
      [cellDraggedOverClassname]: isDraggedOver
    },
    typeof cellClass === 'function' ? cellClass(row) : cellClass
  );

  function selectCellWrapper(openEditor?: boolean | null) {
    selectCell(row, column, openEditor);
  }

  function handleClick() {
    selectCellWrapper(column.editorOptions?.editOnClick);
    onRowClick?.(row, column);
  }

  function handleContextMenu() {
    selectCellWrapper();
  }

  function handleDoubleClick() {
    selectCellWrapper(true);
    onRowDoubleClick?.(row, column);
  }

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1} // aria-colindex is 1-based
      aria-selected={isCellSelected}
      aria-colspan={colSpan}
      aria-readonly={!isCellEditable(column, row) || undefined}
      className={className}
      style={getCellStyle(column, colSpan)}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      {...props}
    >
      {!column.rowGroup && (
        <>
          <column.formatter
            column={column}
            row={row}
            isCellSelected={isCellSelected}
            onRowChange={onRowChange}
          />
          {dragHandleProps && <div className={cellDragHandleClassname} {...dragHandleProps} />}
        </>
      )}
    </div>
  );
}

export default memo(Cell) as <R, SR>(
  props: CellRendererProps<R, SR> & RefAttributes<HTMLDivElement>
) => JSX.Element;
