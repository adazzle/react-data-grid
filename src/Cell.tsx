import { memo, useMemo } from 'react';
import { css } from '@linaria/core';

import { getCellStyle, getCellClassname, isCellEditable } from './utils';
import type { CellRendererProps } from './types';
import { useRovingCellRef } from './hooks';
import { Direction } from './dragOver';

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

function Cell<R, SR>({
  column,
  colSpan,
  isCellSelected,
  isCopied,
  isDraggedOver,
  row,
  rowIndex,
  dragHandle,
  onRowClick,
  onRowDoubleClick,
  onRowChange,
  selectCell,
  dragEndPosition,
  dragDirection,
  handleCopy,
  handlePaste,
  ...props
}: CellRendererProps<R, SR>) {
  const { ref, tabIndex, onFocus } = useRovingCellRef(isCellSelected);

  const { cellClass } = column;
  const className = useMemo(() => {
    const isDragOverEnd = isDraggedOver && dragEndPosition === rowIndex + 1;
    return getCellClassname(
      column,
      {
        [cellCopiedClassname]: isCopied,
        [cellDraggedOverClassname]: isDraggedOver,
        'rdg-cell-dragged-over-end-top': isDragOverEnd && dragDirection === Direction.up,
        'rdg-cell-dragged-over-end-bottom': isDragOverEnd && dragDirection === Direction.down
      },
      typeof cellClass === 'function' ? cellClass(row) : cellClass
    );
  }, [dragEndPosition, isDraggedOver, cellClass, isCopied, row, column, rowIndex, dragDirection]);

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
      ref={ref}
      tabIndex={tabIndex}
      className={className}
      style={getCellStyle(column, colSpan)}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onFocus={onFocus}
      {...props}
    >
      {!column.rowGroup && (
        <>
          <column.formatter
            column={column}
            row={row}
            isCellSelected={isCellSelected}
            onRowChange={onRowChange}
            handleCopy={handleCopy}
            handlePaste={handlePaste}
          />
          {dragHandle}
        </>
      )}
    </div>
  );
}

export default memo(Cell) as <R, SR>(props: CellRendererProps<R, SR>) => JSX.Element;
