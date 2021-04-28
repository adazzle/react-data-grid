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
  | 'onSortColumnsChange'
  | 'allRowsSelected'
  | 'sortColumns'
>;

export interface HeaderCellProps<R, SR> extends SharedHeaderRowProps<R, SR> {
  column: CalculatedColumn<R, SR>;
  colSpan?: number;
  onResize: (column: CalculatedColumn<R, SR>, width: number) => void;
  onAllRowsSelectionChange: (checked: boolean) => void;
}

export default function HeaderCell<R, SR>({
  column,
  colSpan,
  onResize,
  allRowsSelected,
  onAllRowsSelectionChange,
  sortColumns,
  onSortColumnsChange
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
        onPointerUp(event);
        return;
      }
      const width = event.clientX + offset - currentTarget.getBoundingClientRect().left;
      if (width > 0) {
        onResize(column, width);
      }
    }

    function onPointerUp(event: PointerEvent) {
      if (event.pointerId !== pointerId) return;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    }

    event.preventDefault();
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }
  const sortDirection = sortColumns?.find(item => item.columnKey === column.key)?.direction;
  const index = sortColumns?.findIndex(sort => sort.columnKey === column.key);
  const priority = index !== undefined ? index + 1 : undefined;

  const onSort = (columnKey: string, direction: SortDirection, ctrlClick: boolean) => {
    if (!onSortColumnsChange) return;
    if (ctrlClick) {
      const newSorts = sortColumns ? [...sortColumns] : [];
      const index = newSorts.findIndex((sort) => sort.columnKey === columnKey);
      if (index > -1) {
        const sort = newSorts.find(sort => sort.columnKey === columnKey);
        if (sort?.direction === 'ASC') newSorts[index] = { columnKey, direction };
        else newSorts.splice(index, 1);
      } else {
        newSorts.push({ columnKey, direction });
      }
      onSortColumnsChange([...newSorts]);
    } else if (direction === 'NONE') onSortColumnsChange([]);
    else onSortColumnsChange([{ columnKey, direction }]);
  };

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
          priority={priority}
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
      aria-colspan={colSpan}
      className={className}
      style={getCellStyle(column, colSpan)}
      onPointerDown={column.resizable ? onPointerDown : undefined}
    >
      {getCell()}
    </div>
  );
}
