import React, { createElement, cloneElement } from 'react';
import classNames from 'classnames';
import { isElement } from 'react-is';

import { CalculatedColumn, HeaderRendererProps } from './common/types';
import { DEFINE_SORT } from './common/enums';
import { HeaderRowProps } from './HeaderRow';
import SortableHeaderCell from './common/cells/headerCells/SortableHeaderCell';
import ResizableHeaderCell from './common/cells/headerCells/ResizableHeaderCell';

type SharedHeaderRowProps<R, K extends keyof R> = Pick<HeaderRowProps<R, K>,
| 'sortColumn'
| 'sortDirection'
| 'height'
| 'onHeaderDrop'
| 'allRowsSelected'
| 'draggableHeaderCell'
>;

export interface HeaderCellProps<R, K extends keyof R> extends SharedHeaderRowProps<R, K> {
  column: CalculatedColumn<R>;
  renderer?: React.ReactElement | React.ComponentType<HeaderRendererProps<R>>;
  lastFrozenColumnIndex: number;
  scrollLeft: number | undefined;
  onSort?(columnKey: keyof R, direction: DEFINE_SORT): void;
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
    const renderer = column.headerRenderer;

    if (isElement(renderer)) {
      // TODO: is this needed?
      // if it is a string, it's an HTML element, and column is not a valid property, so only pass height
      if (typeof renderer.type === 'string') {
        return cloneElement(renderer, { height });
      }
      return cloneElement(renderer, { column, height });
    }
    return createElement(renderer, { column, allRowsSelected, onAllRowsSelectionChange });
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

  const className = classNames('rdg-cell', {
    'rdg-cell-frozen': column.frozen,
    'rdg-cell-frozen-last': column.idx === props.lastFrozenColumnIndex
  }, column.cellClass);
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
        {cell}
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
