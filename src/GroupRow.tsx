import React, { memo } from 'react';
import clsx from 'clsx';
import { GroupRowRendererProps } from './types';
import { SELECT_COLUMN_KEY } from './Columns';

function GroupedRow<R, SR>({
  'aria-rowindex': ariaRowIndex,
  viewportColumns,
  row,
  rowIdx,
  lastFrozenColumnIndex,
  top,
  isCellSelected,
  isRowSelected,
  groupBy,
  eventBus,
  onKeyDown,
  ...props
}: GroupRowRendererProps<R, SR>) {
  const level = viewportColumns[0].key === SELECT_COLUMN_KEY ? row.level + 1 : row.level;

  function selectGroup() {
    eventBus.dispatch('SELECT_CELL', { rowIdx, idx: level });
  }

  function toggleGroup() {
    eventBus.dispatch('TOGGLE_GROUP', row.id);
  }


  return (
    <div
      role="row"
      aria-rowindex={ariaRowIndex}
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
      {viewportColumns.map(column => (
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
          {column.groupFormatter && (groupBy.includes(column.key) ? level === column.idx : true) && (
            <column.groupFormatter
              row={row}
              column={column}
              isCellSelected={isCellSelected}
              isRowSelected={isRowSelected}
              toggleGroup={toggleGroup}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default memo(GroupedRow) as <R, SR>(props: GroupRowRendererProps<R, SR>) => JSX.Element;
