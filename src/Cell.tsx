import { forwardRef, memo, type RefAttributes } from 'react';
import { css } from '@linaria/core';

import { useRovingTabIndex } from './hooks';
import { createCellEvent, getCellClassname, getCellStyle, isCellEditableUtil } from './utils';
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
    className,
    onClick,
    onDoubleClick,
    onContextMenu,
    onRowChange,
    selectCell,
    style,
    rangeSelectionMode,
    onMouseDownCapture,
    onMouseUpCapture,
    onMouseEnter,
    ...props
  }: CellRendererProps<R, SR>,
  ref: React.Ref<HTMLDivElement>
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
  const isEditable = isCellEditableUtil(column, row);

  function selectCellWrapper(openEditor?: boolean) {
    selectCell({ rowIdx, idx: column.idx }, openEditor);
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    if (onClick) {
      const cellEvent = createCellEvent(event);
      onClick({ rowIdx, row, column, selectCell: selectCellWrapper }, cellEvent);
      if (cellEvent.isGridDefaultPrevented()) return;
    }
    selectCellWrapper();
  }

  function handleContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    if (onContextMenu) {
      const cellEvent = createCellEvent(event);
      onContextMenu({ rowIdx, row, column, selectCell: selectCellWrapper }, cellEvent);
      if (cellEvent.isGridDefaultPrevented()) return;
    }
    selectCellWrapper();
  }

  function handleDoubleClick(event: React.MouseEvent<HTMLDivElement>) {
    if (onDoubleClick) {
      const cellEvent = createCellEvent(event);
      onDoubleClick({ rowIdx, row, column, selectCell: selectCellWrapper }, cellEvent);
      if (cellEvent.isGridDefaultPrevented()) return;
    }
    selectCellWrapper(true);
  }

  function handleRowChange(newRow: R) {
    onRowChange(column, newRow);
  }

  function onMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    if (rangeSelectionMode) {
      selectCellWrapper(false);
    }
  }

  function getOnMouseEvent(handler: typeof onMouseDownCapture) {
    function onMouseEvent(event: React.MouseEvent<HTMLDivElement>) {
      if (handler) {
        const cellEvent = createCellEvent(event);
        handler({ row, column, selectCell: selectCellWrapper }, cellEvent);
      }
    }

    return onMouseEvent;
  }

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1} // aria-colindex is 1-based
      aria-colspan={colSpan}
      aria-selected={isCellSelected}
      aria-readonly={!isEditable || undefined}
      ref={ref}
      tabIndex={tabIndex}
      className={className}
      style={{
        ...getCellStyle(column, colSpan),
        ...style
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onFocus={onFocus}
      onMouseDown={onMouseDown}
      onMouseDownCapture={getOnMouseEvent(onMouseDownCapture)}
      onMouseUpCapture={getOnMouseEvent(onMouseUpCapture)}
      onMouseEnter={getOnMouseEvent(onMouseEnter)}
      {...props}
    >
      {column.renderCell({
        column,
        row,
        rowIdx,
        isCellEditable: isEditable,
        tabIndex: childTabIndex,
        onRowChange: handleRowChange
      })}
    </div>
  );
}

const CellComponent = memo(forwardRef(Cell)) as <R, SR>(
  props: CellRendererProps<R, SR> & RefAttributes<HTMLDivElement>
) => React.JSX.Element;

export default CellComponent;

export function defaultRenderCell<R, SR>(key: React.Key, props: CellRendererProps<R, SR>) {
  return <CellComponent key={key} {...props} />;
}
