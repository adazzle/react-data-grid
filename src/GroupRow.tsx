import { memo } from 'react';
import clsx from 'clsx';
import { css } from '@linaria/core';

import { cell, cellFrozenLast, rowClassname, rowSelectedClassname } from './style';
import { SELECT_COLUMN_KEY } from './Columns';
import Row from './Row';
import GroupCell from './GroupCell';
import type { GroupRow, RowRendererProps } from './types';
import { RowSelectionChangeProvider, RowSelectionProvider, useGroupApi } from './hooks';
import { getRowStyle, isCtrlKeyHeldDown } from './utils';

const groupRow = css`
  &:not([aria-selected='true']) {
    background-color: var(--rdg-header-background-color);
  }

  > .${cell}:not(:last-child):not(.${cellFrozenLast}) {
    border-inline-end: none;
  }
`;

const groupRowClassname = `rdg-group-row ${groupRow}`;

function GroupedRow<R, SR>({
  className,
  row,
  rowIdx,
  viewportColumns,
  selectedCellIdx,
  copiedCellIdx,
  draggedOverCellIdx,
  lastFrozenColumnIndex,
  isRowSelected,
  selectedCellEditor,
  selectedCellDragHandle,
  rowClass,
  onRowClick,
  onRowDoubleClick,
  onRowChange,
  setDraggedOverRowIdx,
  onMouseEnter,
  selectCell,
  gridRowStart,
  height,
  'aria-rowindex': ariaRowIndex, // ignore default value // TODO
  ...props
}: RowRendererProps<R | GroupRow<R>, SR>) {
  const { isGroupRow, toggleGroup, getParentRow, toggleGroupSelection, rowRenderer } = useGroupApi<
    R,
    SR
  >()!;
  const RowRenderer = rowRenderer ?? Row;

  // const leftKey = isRtl ? 'ArrowRight' : 'ArrowLeft';
  // const rightKey = isRtl ? 'ArrowLeft' : 'ArrowRight';

  className = clsx(className, {
    [rowSelectedClassname]: selectedCellIdx === -1
  });
  if (!isGroupRow(row)) {
    return (
      <RowRenderer
        className={className}
        row={row}
        rowIdx={rowIdx}
        isRowSelected={isRowSelected}
        viewportColumns={viewportColumns}
        selectedCellIdx={selectedCellIdx}
        copiedCellIdx={copiedCellIdx}
        draggedOverCellIdx={draggedOverCellIdx}
        lastFrozenColumnIndex={lastFrozenColumnIndex}
        gridRowStart={gridRowStart}
        height={height}
        selectedCellEditor={selectedCellEditor}
        selectedCellDragHandle={selectedCellDragHandle}
        rowClass={rowClass}
        onRowClick={onRowClick}
        onRowDoubleClick={onRowDoubleClick}
        onRowChange={onRowChange}
        setDraggedOverRowIdx={setDraggedOverRowIdx}
        onMouseEnter={onMouseEnter}
        selectCell={selectCell}
        {...props}
      />
    );
  }

  // Select is always the first column
  const idx = viewportColumns[0].key === SELECT_COLUMN_KEY ? row.level + 1 : row.level;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      selectedCellIdx === -1 &&
      // Collapse the current group row if it is focused and is in expanded state
      ((event.key === 'ArrowLeft' && row.isExpanded) ||
        // Expand the current group row if it is focused and is in collapsed state
        (event.key === 'ArrowRight' && !row.isExpanded))
    ) {
      event.preventDefault(); // Prevents scrolling
      event.stopPropagation();
      toggleGroup(row.id);
    }

    // If a group row is focused, and it is collapsed, move to the parent group row (if there is one).
    if (selectedCellIdx === -1 && event.key === 'ArrowLeft' && !row.isExpanded && row.level !== 0) {
      const parentRow = getParentRow(row);
      if (parentRow !== undefined) {
        event.preventDefault();
        event.stopPropagation();
        selectCell(parentRow, -1);
      }
    }

    if (isCtrlKeyHeldDown(event) && (event.keyCode === 67 || event.keyCode === 86)) {
      event.stopPropagation();
    }
  };

  const handleSelectGroup = () => {
    selectCell(row, -1);
  };

  return (
    <RowSelectionChangeProvider value={toggleGroupSelection}>
      <RowSelectionProvider value={false}>
        <div
          role="row"
          aria-rowindex={row.startRowIndex + 2}
          aria-level={row.level + 1} // aria-level is 1-based
          aria-setsize={row.setSize}
          aria-posinset={row.posInSet + 1} // aria-posinset is 1-based
          aria-expanded={row.isExpanded}
          key={row.id}
          className={clsx(
            rowClassname,
            groupRowClassname,
            `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`,
            className
          )}
          onClick={handleSelectGroup}
          onKeyDown={handleKeyDown}
          style={getRowStyle(gridRowStart, height)}
          {...props}
        >
          {viewportColumns.map((column) => (
            <GroupCell
              key={column.key}
              id={row.id}
              groupKey={row.groupKey}
              childRows={row.childRows}
              isExpanded={row.isExpanded}
              isCellSelected={selectedCellIdx === column.idx}
              column={column}
              row={row}
              groupColumnIndex={idx}
              toggleGroup={toggleGroup}
            />
          ))}
        </div>
      </RowSelectionProvider>
    </RowSelectionChangeProvider>
  );
}

export default memo(GroupedRow) as <R, SR>(props: RowRendererProps<R, SR>) => JSX.Element;
