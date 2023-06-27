import { forwardRef, memo, RefAttributes } from 'react';
import { css } from '@linaria/core';

import { useRovingTabIndex } from './hooks';
import { createCellEvent, getCellClassname, getCellStyle, isCellEditable } from './utils';
import type { CellRendererProps } from './types';

const cellCopied = css`
  @layer rdg.Cell {
    background-color: #ccccff;
  }
`;

const cellCopiedClassname = `rdg-cell-copied ${cellCopied}`;

const cellDraggedOver = css`
  @layer rdg.Cell {
    background-color: #ccccff;

    &.${cellCopied} {
      background-color: #9999ff;
    }
  }
`;

const cellDraggedOverClassname = `rdg-cell-dragged-over ${cellDraggedOver}`;

function Cell<R, SR>(
  {
    column,
    colSpan,
    isCellSelected,
    isCopied,
    isDraggedOver,
    row,
    rowIdx,
    dragHandle,
    className,
    onClick,
    onDoubleClick,
    onContextMenu,
    onRowChange,
    selectCell,
    ...props
  }: CellRendererProps<R, SR>,
  refComponent: React.Ref<HTMLDivElement>
) {
  const { tabIndex, childTabIndex, onFocus } = useRovingTabIndex(isCellSelected);

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
  const isEditable = isCellEditable(column, row);

  function selectCellWrapper(openEditor?: boolean) {
    selectCell({ rowIdx, idx: column.idx }, openEditor);
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    if (onClick) {
      const cellEvent = createCellEvent(event);
      onClick({ row, column, selectCell: selectCellWrapper }, cellEvent);
      if (cellEvent.isGridDefaultPrevented()) return;
    }
    selectCellWrapper();
  }

  function handleContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    if (onContextMenu) {
      const cellEvent = createCellEvent(event);
      onContextMenu({ row, column, selectCell: selectCellWrapper }, cellEvent);
      if (cellEvent.isGridDefaultPrevented()) return;
    }
    selectCellWrapper();
  }

  function handleDoubleClick(event: React.MouseEvent<HTMLDivElement>) {
    if (onDoubleClick) {
      const cellEvent = createCellEvent(event);
      onDoubleClick({ row, column, selectCell: selectCellWrapper }, cellEvent);
      if (cellEvent.isGridDefaultPrevented()) return;
    }
    selectCellWrapper(true);
  }

  function handleRowChange(newRow: R) {
    onRowChange(column, newRow);
  }

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1} // aria-colindex is 1-based
      aria-selected={isCellSelected}
      aria-colspan={colSpan}
      aria-readonly={!isEditable || undefined}
      ref={refComponent}
      tabIndex={tabIndex}
      className={className}
      style={getCellStyle(column, colSpan)}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onFocus={onFocus}
      {...props}
    >
      {column.renderCell({
        column,
        row,
        isCellEditable: isEditable,
        tabIndex: childTabIndex,
        onRowChange: handleRowChange
      })}
      {dragHandle}
    </div>
  );
}

const CellComponent = memo(forwardRef(Cell)) as <R, SR>(
  props: CellRendererProps<R, SR> & RefAttributes<HTMLDivElement>
) => JSX.Element;

export default CellComponent;

export function defaultRenderCell<R, SR>(key: React.Key, props: CellRendererProps<R, SR>) {
  return <CellComponent key={key} {...props} />;
}
