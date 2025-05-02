import { memo } from 'react';
import { css } from '@linaria/core';

import { useRovingTabIndex } from './hooks';
import { createCellEvent, getCellClassname, getCellStyle, isCellEditableUtil } from './utils';
import type { CellMouseEventHandler, CellRendererProps } from './types';

const cellDraggedOver = css`
  @layer rdg.Cell {
    background-color: #ccccff;
  }
`;

const cellDraggedOverClassname = `rdg-cell-dragged-over ${cellDraggedOver}`;

function Cell<R, SR>({
  column,
  colSpan,
  isCellSelected,
  isDraggedOver,
  row,
  rowIdx,
  className,
  onMouseDown,
  onClick,
  onDoubleClick,
  onContextMenu,
  onRowChange,
  selectCell,
  style,
  ...props
}: CellRendererProps<R, SR>) {
  const { tabIndex, childTabIndex, onFocus } = useRovingTabIndex(isCellSelected);

  const { cellClass } = column;
  className = getCellClassname(
    column,
    {
      [cellDraggedOverClassname]: isDraggedOver
    },
    typeof cellClass === 'function' ? cellClass(row) : cellClass,
    className
  );
  const isEditable = isCellEditableUtil(column, row);

  function selectCellWrapper(openEditor?: boolean) {
    selectCell({ rowIdx, idx: column.idx }, openEditor);
  }

  function handleMouseEvent(
    event: React.MouseEvent<HTMLDivElement>,
    eventHandler?: CellMouseEventHandler<R, SR>
  ) {
    if (eventHandler) {
      const cellEvent = createCellEvent(event);
      eventHandler({ rowIdx, row, column, selectCell: selectCellWrapper }, cellEvent);
      return cellEvent.isGridDefaultPrevented();
    }
    return false;
  }

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    if (handleMouseEvent(event, onMouseDown)) {
      // do not select cell if the event is prevented
      return;
    }
    selectCellWrapper();
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    handleMouseEvent(event, onClick);
  }

  function handleContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    handleMouseEvent(event, onContextMenu);
  }

  function handleDoubleClick(event: React.MouseEvent<HTMLDivElement>) {
    if (handleMouseEvent(event, onDoubleClick)) {
      // do not go into edit mode if the event is prevented
      return;
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
      aria-colspan={colSpan}
      aria-selected={isCellSelected}
      aria-readonly={!isEditable || undefined}
      tabIndex={tabIndex}
      className={className}
      style={{
        ...getCellStyle(column, colSpan),
        ...style
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onFocus={onFocus}
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

const CellComponent = memo(Cell) as <R, SR>(props: CellRendererProps<R, SR>) => React.JSX.Element;

export default CellComponent;

export function defaultRenderCell<R, SR>(key: React.Key, props: CellRendererProps<R, SR>) {
  return <CellComponent key={key} {...props} />;
}
