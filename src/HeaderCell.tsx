import { css } from '@linaria/core';

import type { CalculatedColumn, SortDirection } from './types';
import type { HeaderRowProps } from './HeaderRow';
import SortableHeaderCell from './headerCells/SortableHeaderCell';
import { getCellStyle, getCellClassname } from './utils';

const cellResizable = css`
  &::after {
    content: "";
    cursor: col-resize;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 10px;
  }
`;

const cellResizableClassname = `rdg-cell-resizable ${cellResizable}`;

function getAriaSort(sortDirection?: SortDirection) {
  switch (sortDirection) {
    case 'ASC':
      return 'ascending';
    case 'DESC':
      return 'descending';
    default:
      return 'none';
  }
}

type SharedHeaderRowProps<R, SR> = Pick<HeaderRowProps<R, SR>,
  | 'sortItems'
  | 'onSortItemsChange'
  | 'allRowsSelected'
>;

export interface HeaderCellProps<R, SR> extends SharedHeaderRowProps<R, SR> {
  column: CalculatedColumn<R, SR>;
  onResize: (column: CalculatedColumn<R, SR>, width: number) => void;
  onAllRowsSelectionChange: (checked: boolean) => void;
}

export default function HeaderCell<R, SR>({
  column,
  onResize,
  allRowsSelected,
  onAllRowsSelectionChange,
  sortItems,
  onSortItemsChange
}: HeaderCellProps<R, SR>) {
  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.buttons !== 1) {
      return;
    }

    const { currentTarget, pointerId } = event;
    const { right } = currentTarget.getBoundingClientRect();
    const offset = right - event.clientX;

    if (offset > 11) { // +1px to account for the border size
      return;
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerId !== pointerId) return;
      if (event.pointerType === 'mouse' && event.buttons !== 1) {
        onPointerUp();
        return;
      }
      const width = event.clientX + offset - currentTarget.getBoundingClientRect().left;
      if (width > 0) {
        onResize(column, width);
      }
    }

    function onPointerUp() {
      if (event.pointerId !== pointerId) return;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    }

    event.preventDefault();
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }

  const sortDirection = sortItems?.get(column.key);

  function onSort(columnKey: string, direction: SortDirection) {
    if (!onSortItemsChange) return;
    const newSortedItems = new Map();
    newSortedItems.set(columnKey, direction);
    onSortItemsChange(newSortedItems);
  }

  function getCell() {
    if (column.headerRenderer) {
      return (
        <column.headerRenderer
          column={column}
          sortDirection={sortDirection}
          onSort={onSort}
          allRowsSelected={allRowsSelected}
          onAllRowsSelectionChange={onAllRowsSelectionChange}
        />
      );
    }

    if (column.sortable) {
      return (
        <SortableHeaderCell
          column={column}
          onSort={onSort}
          sortDirection={sortDirection}
        >
          {column.name}
        </SortableHeaderCell>
      );
    }

    return column.name;
  }

  const className = getCellClassname(column, column.headerCellClass, {
    [cellResizableClassname]: column.resizable
  });

  return (
    <div
      role="columnheader"
      aria-colindex={column.idx + 1}
      aria-sort={sortDirection ? getAriaSort(sortDirection) : undefined}
      className={className}
      style={getCellStyle(column)}
      onPointerDown={column.resizable ? onPointerDown : undefined}
    >
      {getCell()}
    </div>
  );
}
