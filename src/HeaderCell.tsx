import { css } from '@linaria/core';

import type { CalculatedColumn, SortColumn } from './types';
import type { HeaderRowProps } from './HeaderRow';
import SortableHeaderCell from './headerCells/SortableHeaderCell';
import { getCellStyle, getCellClassname } from './utils';

const cellResizable = css`
  touch-action: none;

  &::after {
    content: '';
    cursor: col-resize;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 10px;
  }
`;

const cellResizableClassname = `rdg-cell-resizable ${cellResizable}`;

type SharedHeaderRowProps<R, SR> = Pick<
  HeaderRowProps<R, SR, React.Key>,
  | 'sortColumns'
  | 'onSortColumnsChange'
  | 'allRowsSelected'
  | 'onAllRowsSelectionChange'
  | 'onColumnResize'
>;

export interface HeaderCellProps<R, SR> extends SharedHeaderRowProps<R, SR> {
  column: CalculatedColumn<R, SR>;
  colSpan: number | undefined;
}

export default function HeaderCell<R, SR>({
  column,
  colSpan,
  onColumnResize,
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

    if (offset > 11) {
      // +1px to account for the border size
      return;
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType === 'mouse' && event.buttons !== 1) {
        // handle case where the pointer `up`'d outside an iframe
        // https://bugs.chromium.org/p/chromium/issues/detail?id=606896
        // https://bugs.chromium.org/p/chromium/issues/detail?id=693494
        onPointerUp();
        return;
      }

      const width = event.clientX + offset - currentTarget.getBoundingClientRect().left;
      if (width > 0) {
        onColumnResize(column, width);
      }
    }

    function onPointerUp() {
      currentTarget.removeEventListener('pointermove', onPointerMove);
      currentTarget.removeEventListener('pointerup', onPointerUp);
    }

    event.preventDefault();
    currentTarget.setPointerCapture(pointerId);
    currentTarget.addEventListener('pointermove', onPointerMove);
    currentTarget.addEventListener('pointerup', onPointerUp);
  }

  const sortIndex = sortColumns?.findIndex((sort) => sort.columnKey === column.key);
  const sortColumn =
    sortIndex !== undefined && sortIndex > -1 ? sortColumns![sortIndex] : undefined;
  const sortDirection = sortColumn?.direction;
  const priority = sortColumn !== undefined && sortColumns!.length > 1 ? sortIndex! + 1 : undefined;
  const ariaSort =
    sortDirection && !priority ? (sortDirection === 'ASC' ? 'ascending' : 'descending') : undefined;

  const onSort = (ctrlClick: boolean) => {
    if (onSortColumnsChange == null) return;
    const { sortDescendingFirst } = column;
    if (sortColumn === undefined) {
      // not currently sorted
      const nextSort: SortColumn = {
        columnKey: column.key,
        direction: sortDescendingFirst ? 'DESC' : 'ASC'
      };
      onSortColumnsChange(sortColumns && ctrlClick ? [...sortColumns, nextSort] : [nextSort]);
    } else {
      let nextSortColumn: SortColumn | undefined;
      if (
        (sortDescendingFirst && sortDirection === 'DESC') ||
        (!sortDescendingFirst && sortDirection === 'ASC')
      ) {
        nextSortColumn = {
          columnKey: column.key,
          direction: sortDirection === 'ASC' ? 'DESC' : 'ASC'
        };
      }
      if (ctrlClick) {
        const nextSortColumns = [...sortColumns!];
        if (nextSortColumn) {
          // swap direction
          nextSortColumns[sortIndex!] = nextSortColumn;
        } else {
          // remove sort
          nextSortColumns.splice(sortIndex!, 1);
        }
        onSortColumnsChange(nextSortColumns);
      } else {
        onSortColumnsChange(nextSortColumn ? [nextSortColumn] : []);
      }
    }
  };

  function getCell() {
    if (column.headerRenderer) {
      return (
        <column.headerRenderer
          column={column}
          sortDirection={sortDirection}
          priority={priority}
          onSort={onSort}
          allRowsSelected={allRowsSelected}
          onAllRowsSelectionChange={onAllRowsSelectionChange}
        />
      );
    }

    if (column.sortable) {
      return (
        <SortableHeaderCell onSort={onSort} sortDirection={sortDirection} priority={priority}>
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
      aria-sort={ariaSort}
      aria-colspan={colSpan}
      className={className}
      style={getCellStyle(column, colSpan)}
      onPointerDown={column.resizable ? onPointerDown : undefined}
    >
      {getCell()}
    </div>
  );
}
