import { type RefAttributes, forwardRef, memo } from 'react';
import { css } from '@linaria/core';

import { getCellStyle, getCellClassname, isCellEditable } from './utils';
import type { CellRendererProps } from './types';
import { useRovingCellRef } from './hooks';

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

function Cell<R, SR>(
  {
    column,
    colSpan,
    className,
    isCellSelected,
    isCopied,
    isDraggedOver,
    row,
    dragHandle,
    onRowClick,
    onRowDoubleClick,
    onRowChange,
    selectCell,
    onClick,
    onDoubleClick,
    onContextMenu,
    onMouseDown,
    onFocus: focusEventHandler,
    ...props
  }: CellRendererProps<R, SR>,
  refComponent: React.Ref<HTMLDivElement>
) {
  const { ref, tabIndex, onFocus } = useRovingCellRef(isCellSelected);

  function setRef(element: HTMLDivElement | null) {
    ref?.(element);

    if(typeof refComponent === 'function') { 
      refComponent(element);
    } else if(typeof refComponent === 'object' && refComponent !== null) {
      //@ts-expect-error ref mutation
      refComponent.current = element
    }
  }

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

  function selectCellWrapper(openEditor?: boolean | null) {
    selectCell(row, column, openEditor);
  }

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    selectCellWrapper(column.editorOptions?.editOnClick);
    onRowClick?.(row, column);
    onMouseDown?.(event)
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    onClick?.(event)
  }

  function handleContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    selectCellWrapper();
    onContextMenu?.(event);
  }

  function handleDoubleClick(event: React.MouseEvent<HTMLDivElement>) {
    selectCellWrapper(true);
    onRowDoubleClick?.(row, column);
    onDoubleClick?.(event)
  }

  function handleFocus(event: React.FocusEvent<HTMLDivElement, Element>) {
    onFocus?.(event);
    focusEventHandler?.(event);
  }

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1} // aria-colindex is 1-based
      aria-selected={isCellSelected}
      aria-colspan={colSpan}
      aria-readonly={!isCellEditable(column, row) || undefined}
      ref={setRef}
      tabIndex={tabIndex}
      className={className}
      style={getCellStyle(column, colSpan)}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onFocus={handleFocus}
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
          {dragHandle}
        </>
      )}
    </div>
  );
}

export default memo(forwardRef(Cell)) as <R, SR>(
  props: CellRendererProps<R, SR> & RefAttributes<HTMLDivElement>
) => JSX.Element;