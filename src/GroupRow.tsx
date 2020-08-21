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
  lastFrozenColumnIndex,
  top,
  level,
  isExpanded,
  selectedCellIdx,
  isRowSelected,
  eventBus,
  onKeyDown,
  'aria-setsize': ariaSetSize,
  'aria-posinset': ariaPosInSet,
  'aria-rowindex': ariaRowIndex,
  ...props
}: GroupRowRendererProps<R, SR>) {
  // Select is always the first column
  const idx = viewportColumns[0].key === SELECT_COLUMN_KEY ? level + 1 : level;

  function selectGroup() {
    eventBus.dispatch('SELECT_CELL', { rowIdx, idx: -1 });
  }

  // TODO: how to handle this with cell selection?
  // Expand groupBy column widths
  // const visibleColumns: CalculatedColumn<R, SR>[] = [...viewportColumns];
  // visibleColumns[idx] = { ...visibleColumns[idx] };
  // let colSpan = 0;
  // for (let i = idx + 1; i < visibleColumns.length; i++) {
  //   const nextColumn = visibleColumns[i];
  //   if (!nextColumn.frozen || (nextColumn.groupFormatter && !nextColumn.rowGroup)) break;
  //   visibleColumns[idx].width += nextColumn.width;
  //   colSpan++;
  // }
  // visibleColumns.splice(idx + 1, colSpan);

  return (
    <div
      role="row"
      aria-level={level}
      aria-setsize={ariaSetSize}
      aria-posinset={ariaPosInSet}
      aria-rowindex={ariaRowIndex}
      aria-expanded={isExpanded}
      className={clsx('rdg-row rdg-group-row', {
        'rdg-row-even': rowIdx % 2 === 0,
        'rdg-row-odd': rowIdx % 2 !== 0,
        'rdg-group-row-selected': selectedCellIdx === -1 // Select row if there is no selected cell
      })}
      onClick={selectGroup}
      onKeyDown={onKeyDown}
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
          lastFrozenColumnIndex={lastFrozenColumnIndex}
          groupColumnIndex={idx}
        />
      ))}
    </div>
  );
}

export default memo(GroupedRow) as <R, SR>(props: GroupRowRendererProps<R, SR>) => JSX.Element;
