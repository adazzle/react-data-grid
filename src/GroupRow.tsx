import React, { memo } from 'react';
import clsx from 'clsx';
import { GroupRowRendererProps } from './types';
import { SELECT_COLUMN_KEY } from './Columns';
import GroupCell from './GroupCell';

function GroupedRow<R, SR>({
  id,
  groupKey,
  viewportColumns,
  childRows,
  rowIdx,
  top,
  level,
  isExpanded,
  selectedCellIdx,
  isRowSelected,
  eventBus,
  ...props
}: GroupRowRendererProps<R, SR>) {
  // Select is always the first column
  const idx = viewportColumns[0].key === SELECT_COLUMN_KEY ? level + 1 : level;

  function selectGroup() {
    eventBus.dispatch('SELECT_CELL', { rowIdx, idx: -1 });
  }

  return (
    <div
      role="row"
      aria-level={level}
      aria-expanded={isExpanded}
      className={clsx(
        'rdg-row',
        'rdg-group-row',
        `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`, {
          'rdg-row-selected': isRowSelected,
          'rdg-group-row-selected': selectedCellIdx === -1 // Select row if there is no selected cell
        })}
      onClick={selectGroup}
      style={{ top }}
      {...props}
    >
      {viewportColumns.map(column => (
        <GroupCell<R, SR>
          key={column.key}
          id={id}
          rowIdx={rowIdx}
          groupKey={groupKey}
          childRows={childRows}
          isExpanded={isExpanded}
          isRowSelected={isRowSelected}
          isCellSelected={selectedCellIdx === column.idx}
          eventBus={eventBus}
          column={column}
          groupColumnIndex={idx}
        />
      ))}
    </div>
  );
}

export default memo(GroupedRow) as <R, SR>(props: GroupRowRendererProps<R, SR>) => JSX.Element;
