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
  | 'sortColumn'
  | 'sortDirection'
  | 'onSort'
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
  sortColumn,
  sortDirection,
  onSort
}: HeaderCellProps<R, SR>) {
  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.buttons !== 1) {
      return;
    }
    const { currentTarget, pointerId } = event;

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType === 'mouse' && event.buttons !== 1) {
        onPointerUp(event);
        return;
      }
      const width = event.clientX - currentTarget.getBoundingClientRect().left;

      if (width > 0) {
        onResize(column, width);
      }
    }

    function onPointerUp(event: PointerEvent) {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      const width = event.clientX - currentTarget.getBoundingClientRect().left;
      onResize(column, width);
    }

    event.preventDefault();
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }

  function getCell() {
    if (column.headerRenderer) {
      return (
        <column.headerRenderer
          column={column}
          sortColumn={sortColumn}
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
          sortColumn={sortColumn}
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
      aria-sort={sortColumn === column.key ? getAriaSort(sortDirection) : undefined}
      className={className}
      style={getCellStyle(column)}
      onPointerDown={column.resizable ? onPointerDown : undefined}
    >
      {getCell()}
    </div>
  );
}
