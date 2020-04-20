import React, { createElement } from 'react';
import classNames from 'classnames';

import { CalculatedColumn } from './common/types';
import { HeaderRowProps } from './HeaderRow';
import SortableHeaderCell from './headerCells/SortableHeaderCell';
import ResizableHeaderCell from './headerCells/ResizableHeaderCell';

type SharedHeaderRowProps<R, SR> = Pick<HeaderRowProps<R, never, SR>,
  | 'sortColumn'
  | 'sortDirection'
  | 'onSort'
  | 'allRowsSelected'
>;

export interface HeaderCellProps<R, SR> extends SharedHeaderRowProps<R, SR> {
  column: CalculatedColumn<R, SR>;
  lastFrozenColumnIndex: number;
  onResize: (column: CalculatedColumn<R, SR>, width: number) => void;
  onAllRowsSelectionChange: (checked: boolean) => void;
}

export default function HeaderCell<R, SR>({
  column,
  allRowsSelected,
  onAllRowsSelectionChange,
  ...props
}: HeaderCellProps<R, SR>) {
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

  return cell;
}
