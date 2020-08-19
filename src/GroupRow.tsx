import React, { memo } from 'react';
import clsx from 'clsx';
import { GroupRowRendererProps, CalculatedColumn } from './types';
import { SELECT_COLUMN_KEY } from './Columns';

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
  isCellSelected,
  isRowSelected,
  groupBy,
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
    eventBus.dispatch('SELECT_CELL', { rowIdx, idx });
  }

  function toggleGroup() {
    eventBus.dispatch('TOGGLE_GROUP', id);
  }

  function onRowSelectionChange(checked: boolean) {
    eventBus.dispatch('SELECT_ROW', { rowIdx, checked, isShiftClick: false });
  }

  // Expand groupBy column widths
  const visibleColumns: CalculatedColumn<R, SR>[] = [...viewportColumns];
  visibleColumns[idx] = { ...visibleColumns[idx] };
  let colSpan = 0;
  for (let i = idx + 1; i < visibleColumns.length; i++) {
    const nextColumn = visibleColumns[i];
    if (!nextColumn.frozen || (nextColumn.groupFormatter && !groupBy.includes(nextColumn.key))) break;
    visibleColumns[idx].width += nextColumn.width;
    colSpan++;
  }
  visibleColumns.splice(idx + 1, colSpan);

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
        'rdg-group-row-selected': isCellSelected
      })}
      onClick={selectGroup}
      onKeyDown={onKeyDown}
      style={{ top }}
      {...props}
    >
      {visibleColumns.map(column => (
        <div
          role="gridcell"
          aria-colindex={column.idx + 1}
          key={column.key}
          className={clsx('rdg-cell', {
            'rdg-cell-frozen': column.frozen,
            'rdg-cell-frozen-last': column.idx === lastFrozenColumnIndex
          })}
          style={{
            width: column.width,
            left: column.left
          }}
        >
          {column.groupFormatter && (groupBy.includes(column.key) ? idx === column.idx : true) && (
            <column.groupFormatter
              groupKey={groupKey}
              childRows={childRows}
              column={column}
              isExpanded={isExpanded}
              isCellSelected={isCellSelected}
              isRowSelected={isRowSelected}
              onRowSelectionChange={onRowSelectionChange}
              toggleGroup={toggleGroup}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default memo(GroupedRow) as <R, SR>(props: GroupRowRendererProps<R, SR>) => JSX.Element;
