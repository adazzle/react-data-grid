import { useState } from 'react';
import { css } from '@linaria/core';

import { useRovingTabIndex } from './hooks';
import {
  clampColumnWidth,
  getCellClassname,
  getCellStyle,
  getHeaderCellRowSpan,
  getHeaderCellStyle,
  stopPropagation
} from './utils';
import type { CalculatedColumn, SortColumn } from './types';
import type { HeaderRowProps } from './HeaderRow';
import defaultRenderHeaderCell from './renderHeaderCell';

const cellSortableClassname = css`
  @layer rdg.HeaderCell {
    cursor: pointer;
  }
`;

const cellResizable = css`
  @layer rdg.HeaderCell {
    touch-action: none;
  }
`;

const cellResizableClassname = `rdg-cell-resizable ${cellResizable}`;

export const resizeHandleClassname = css`
  @layer rdg.HeaderCell {
    cursor: col-resize;
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    inset-block-end: 0;
    inline-size: 10px;
  }
`;

const cellDraggingClassname = css`
  opacity: 0.5;
`;

const cellOverClassname = css`
  background-color: var(--rdg-header-draggable-background-color);
`;

type SharedHeaderRowProps<R, SR> = Pick<
  HeaderRowProps<R, SR, React.Key>,
  | 'sortColumns'
  | 'onSortColumnsChange'
  | 'selectCell'
  | 'onColumnResize'
  | 'shouldFocusGrid'
  | 'direction'
  | 'onColumnsReorder'
>;

export interface HeaderCellProps<R, SR> extends SharedHeaderRowProps<R, SR> {
  column: CalculatedColumn<R, SR>;
  colSpan: number | undefined;
  rowIdx: number;
  isCellSelected: boolean;
}

export default function HeaderCell<R, SR>({
  column,
  colSpan,
  rowIdx,
  isCellSelected,
  onColumnResize,
  onColumnsReorder,
  sortColumns,
  onSortColumnsChange,
  selectCell,
  shouldFocusGrid,
  direction
}: HeaderCellProps<R, SR>) {
  const [isDragging, setIsDragging] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const isRtl = direction === 'rtl';
  const rowSpan = getHeaderCellRowSpan(column, rowIdx);
  const { tabIndex, childTabIndex, onFocus } = useRovingTabIndex(isCellSelected);
  const sortIndex = sortColumns?.findIndex((sort) => sort.columnKey === column.key);
  const sortColumn =
    sortIndex !== undefined && sortIndex > -1 ? sortColumns![sortIndex] : undefined;
  const sortDirection = sortColumn?.direction;
  const priority = sortColumn !== undefined && sortColumns!.length > 1 ? sortIndex! + 1 : undefined;
  const ariaSort =
    sortDirection && !priority ? (sortDirection === 'ASC' ? 'ascending' : 'descending') : undefined;
  const { sortable, resizable, draggable } = column;

  const className = getCellClassname(column, column.headerCellClass, {
    [cellSortableClassname]: sortable,
    [cellResizableClassname]: resizable,
    [cellDraggingClassname]: isDragging,
    [cellOverClassname]: isOver
  });

  const renderHeaderCell = column.renderHeaderCell ?? defaultRenderHeaderCell;

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.buttons !== 1) {
      return;
    }

    const { currentTarget, pointerId } = event;
    const headerCell = currentTarget.parentElement!;
    const { right, left } = headerCell.getBoundingClientRect();
    const offset = isRtl ? event.clientX - left : right - event.clientX;

    function onPointerMove(event: PointerEvent) {
      // prevents text selection in Chrome, which fixes scrolling the grid while dragging, and fixes re-size on an autosized column
      event.preventDefault();
      const { right, left } = headerCell.getBoundingClientRect();
      const width = isRtl ? right + offset - event.clientX : event.clientX + offset - left;
      if (width > 0) {
        onColumnResize(column, clampColumnWidth(width, column));
      }
    }

    function onLostPointerCapture() {
      currentTarget.removeEventListener('pointermove', onPointerMove);
      currentTarget.removeEventListener('lostpointercapture', onLostPointerCapture);
    }

    currentTarget.setPointerCapture(pointerId);
    currentTarget.addEventListener('pointermove', onPointerMove);
    currentTarget.addEventListener('lostpointercapture', onLostPointerCapture);
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
        (sortDescendingFirst === true && sortDirection === 'DESC') ||
        (sortDescendingFirst !== true && sortDirection === 'ASC')
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

  function onClick(event: React.MouseEvent<HTMLSpanElement>) {
    selectCell({ idx: column.idx, rowIdx });

    if (sortable) {
      onSort(event.ctrlKey || event.metaKey);
    }
  }

  function onDoubleClick() {
    onColumnResize(column, 'max-content');
  }

  function handleFocus(event: React.FocusEvent<HTMLDivElement>) {
    onFocus?.(event);
    if (shouldFocusGrid) {
      // Select the first header cell if there is no selected cell
      selectCell({ idx: 0, rowIdx });
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLSpanElement>) {
    if (event.key === ' ' || event.key === 'Enter') {
      // prevent scrolling
      event.preventDefault();
      onSort(event.ctrlKey || event.metaKey);
    }
  }

  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData('text/plain', column.key);
    setIsDragging(true);
  }

  function handleDragEnd() {
    setIsDragging(false);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    // prevent default to allow drop
    event.preventDefault();
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    setIsOver(false);
    const sourceKey = event.dataTransfer.getData('text/plain');
    if (sourceKey !== column.key) {
      event.preventDefault();
      onColumnsReorder?.(sourceKey, column.key);
    }
  }

  function handleDragEnter() {
    setIsOver(true);
  }

  function handleDragLeave() {
    setIsOver(false);
  }

  return (
    <div
      role="columnheader"
      aria-colindex={column.idx + 1}
      aria-colspan={colSpan}
      aria-rowspan={rowSpan}
      aria-selected={isCellSelected}
      aria-sort={ariaSort}
      // set the tabIndex to 0 when there is no selected cell so grid can receive focus
      tabIndex={shouldFocusGrid ? 0 : tabIndex}
      className={className}
      draggable={draggable ? true : undefined}
      style={{
        ...getHeaderCellStyle(column, rowIdx, rowSpan),
        ...getCellStyle(column, colSpan)
      }}
      onFocus={handleFocus}
      onClick={onClick}
      onKeyDown={sortable ? onKeyDown : undefined}
      /* events fired on the draggable target */
      onDragStart={draggable ? handleDragStart : undefined}
      onDragEnd={draggable ? handleDragEnd : undefined}
      /* events fired on the drop targets */
      onDragOver={draggable ? handleDragOver : undefined}
      onDragEnter={draggable ? handleDragEnter : undefined}
      onDragLeave={draggable ? handleDragLeave : undefined}
      onDrop={draggable ? handleDrop : undefined}
    >
      {renderHeaderCell({
        column,
        sortDirection,
        priority,
        tabIndex: childTabIndex
      })}

      {resizable && (
        <div
          className={resizeHandleClassname}
          onClick={stopPropagation}
          onDoubleClick={onDoubleClick}
          onPointerDown={onPointerDown}
        />
      )}
    </div>
  );
}
