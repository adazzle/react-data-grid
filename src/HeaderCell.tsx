import React, { createElement } from 'react';
import classNames from 'classnames';

import { CalculatedColumn } from './common/types';
import { HeaderRowProps } from './HeaderRow';
import SortableHeaderCell from './headerCells/SortableHeaderCell';
import ResizableHeaderCell from './headerCells/ResizableHeaderCell';

type SharedHeaderRowProps<R, K extends keyof R> = Pick<HeaderRowProps<R, K>,
| 'sortColumn'
| 'sortDirection'
| 'onSort'
| 'height'
| 'onHeaderDrop'
| 'allRowsSelected'
| 'draggableHeaderCell'
>;

export interface HeaderCellProps<R, K extends keyof R> extends SharedHeaderRowProps<R, K> {
  column: CalculatedColumn<R>;
  lastFrozenColumnIndex: number;
  scrollLeft: number | undefined;
  onResize(column: CalculatedColumn<R>, width: number): void;
  onAllRowsSelectionChange(checked: boolean): void;
}

export default function HeaderCell<R, K extends keyof R>({
  height,
  column,
  allRowsSelected,
  onAllRowsSelectionChange,
  scrollLeft,
  ...props
}: HeaderCellProps<R, K>) {
  function getCell() {
    if (!column.headerRenderer) return column.name;

    return createElement(column.headerRenderer, { column, allRowsSelected, onAllRowsSelectionChange });
  }

  let cell = getCell();

  if (column.sortable) {
    cell = (
      <SortableHeaderCell
        column={column}
        onSort={props.onSort}
        sortColumn={props.sortColumn}
        sortDirection={props.sortDirection}
      >
        {cell}
      </SortableHeaderCell>
    );
  }

  const className = classNames('rdg-cell', column.headerCellClass, {
    'rdg-cell-frozen': column.frozen,
    'rdg-cell-frozen-last': column.idx === props.lastFrozenColumnIndex
  });
  const style: React.CSSProperties = {
    width: column.width,
    left: column.left
  };

  if (typeof scrollLeft === 'number') {
    style.transform = `translateX(${scrollLeft}px)`;
  }

  cell = (
    <div
      className={className}
      style={style}
    >
      {cell}
    </div>
  );

  if (column.resizable) {
    cell = (
      <ResizableHeaderCell
        column={column}
        onResize={props.onResize}
      >
        {cell as React.ReactElement<React.ComponentProps<'div'>>}
      </ResizableHeaderCell>
    );
  }

  const DraggableHeaderCell = props.draggableHeaderCell;
  if (column.draggable && DraggableHeaderCell) {
    return (
      <DraggableHeaderCell
        column={column}
        onHeaderDrop={props.onHeaderDrop!}
      >
        {cell}
      </DraggableHeaderCell>
    );
  }

  return cell;
}
