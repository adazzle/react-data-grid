import { forwardRef, memo, type RefAttributes } from 'react';
import { css } from '@linaria/core';
import clsx from 'clsx';

import { RowSelectionChangeProvider, RowSelectionProvider } from './hooks';
import { getRowStyle } from './utils';
import type { GroupRow, BaseRenderRowProps, SelectRowEvent } from './types';
import { SELECT_COLUMN_KEY } from './Columns';
import GroupCell from './GroupCell';
import { cell, cellFrozenLast } from './style/cell';
import { rowClassname, rowSelectedClassname } from './style/row';

const groupRow = css`
  @layer rdg.GroupedRow {
    &:not([aria-selected='true']) {
      background-color: var(--rdg-header-background-color);
    }

    > .${cell}:not(:last-child):not(.${cellFrozenLast}) {
      border-inline-end: none;
    }
  }
`;

const groupRowClassname = `rdg-group-row ${groupRow}`;

interface GroupRowRendererProps<R, SR> extends BaseRenderRowProps<R, SR> {
  row: GroupRow<R>;
  toggleGroup: (expandedGroupId: unknown) => void;
  toggleGroupSelection: (selectRowEvent: SelectRowEvent<GroupRow<R>>) => void;
}

function GroupedRow<R, SR>(
  {
    className,
    row,
    rowIdx,
    viewportColumns,
    selectedCellIdx,
    lastFrozenColumnIndex,
    isRowSelected,
    selectCell,
    gridRowStart,
    height,
    toggleGroup,
    toggleGroupSelection,
    ...props
  }: GroupRowRendererProps<R, SR>,
  ref: React.Ref<HTMLDivElement>
) {
  // Select is always the first column
  const idx = viewportColumns[0].key === SELECT_COLUMN_KEY ? row.level + 1 : row.level;
  className = clsx(className, {
    [rowSelectedClassname]: selectedCellIdx === -1
  });

  function handleSelectGroup() {
    // @ts-expect-error
    selectCell(row, -1);
  }

  return (
    <RowSelectionChangeProvider value={toggleGroupSelection}>
      <RowSelectionProvider value={isRowSelected}>
        <div
          role="row"
          aria-level={row.level + 1} // aria-level is 1-based
          aria-setsize={row.setSize}
          aria-posinset={row.posInSet + 1} // aria-posinset is 1-based
          aria-expanded={row.isExpanded}
          ref={ref}
          key={row.id}
          className={clsx(
            rowClassname,
            groupRowClassname,
            `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`,
            className
          )}
          onClick={handleSelectGroup}
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

const GroupRowComponent = memo(forwardRef(GroupedRow)) as <R, SR>(
  props: GroupRowRendererProps<R, SR> & RefAttributes<HTMLDivElement>
) => JSX.Element;

export default GroupRowComponent;

export function groupRowRenderer<R, SR>(key: React.Key, props: GroupRowRendererProps<R, SR>) {
  return <GroupRowComponent key={key} {...props} />;
}
