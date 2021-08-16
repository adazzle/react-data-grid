import { css } from '@linaria/core';

import type { CalculatedColumn, SortColumn } from './types';
import type { HeaderRowProps } from './HeaderRow';
import SortableHeaderCell from './headerCells/SortableHeaderCell';
import { getCellStyle, getCellClassname } from './utils';
import { useRovingRef } from './hooks';

const cellResizable = css`
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
  | 'selectCell'
>;

export interface HeaderCellProps<R, SR> extends SharedHeaderRowProps<R, SR> {
  column: CalculatedColumn<R, SR>;
  colSpan: number | undefined;
  isCellSelected: boolean;
  onResize: (column: CalculatedColumn<R, SR>, width: number) => void;
}

export default function HeaderCell<R, SR>({
  column,
  colSpan,
  onResize,
  isCellSelected,
  allRowsSelected,
  onAllRowsSelectionChange,
  sortColumns,
  onSortColumnsChange,
  selectCell
}: HeaderCellProps<R, SR>) {
  const { ref, tabIndex, onFocus } = useRovingRef(isCellSelected);
  const sortIndex = sortColumns?.findIndex((sort) => sort.columnKey === column.key);
  const sortColumn =
    sortIndex !== undefined && sortIndex > -1 ? sortColumns![sortIndex] : undefined;
  const sortDirection = sortColumn?.direction;
  const priority = sortColumn !== undefined && sortColumns!.length > 1 ? sortIndex! + 1 : undefined;
  const ariaSort =
    sortDirection && !priority ? (sortDirection === 'ASC' ? 'ascending' : 'descending') : undefined;

  const className = getCellClassname(column, column.headerCellClass, {
    [cellResizableClassname]: column.resizable
  });

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

  function onSort(ctrlClick: boolean) {
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
  }

  function onClick() {
    selectCell(column);
  }

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
          isCellSelected={isCellSelected}
        />
      );
    }

    if (column.sortable) {
      return (
        <SortableHeaderCell
          onSort={onSort}
          sortDirection={sortDirection}
          priority={priority}
          isCellSelected={isCellSelected}
        >
          {column.name}
        </SortableHeaderCell>
      );
    }

    return column.name;
  }

  return (
    <div
      role="columnheader"
      aria-colindex={column.idx + 1}
      aria-selected={isCellSelected}
      aria-sort={ariaSort}
      aria-colspan={colSpan}
      ref={ref}
      tabIndex={tabIndex}
      className={className}
      style={getCellStyle(column, colSpan)}
      onFocus={onFocus}
      onClick={onClick}
      onPointerDown={column.resizable ? onPointerDown : undefined}
    >
      {getCell()}
    </div>
  );
}
