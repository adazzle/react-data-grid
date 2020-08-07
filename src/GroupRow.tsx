import React, { useRef, useLayoutEffect, memo } from 'react';
import clsx from 'clsx';
import { GroupRowRendererProps } from './types';

function GroupedRow<R, SR>({
  'aria-rowindex': ariaRowIndex,
  viewportColumns,
  row,
  rowIdx,
  top,
  width,
  isSelected,
  eventBus,
  onKeyDown,
  ...props
}: GroupRowRendererProps<R, SR>) {
  const cellRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!isSelected) return;
    cellRef.current?.focus();
  }, [isSelected]);

  function selectGroup() {
    eventBus.dispatch('SELECT_GROUP_ROW', rowIdx);
  }

  function toggleGroup() {
    eventBus.dispatch('TOGGLE_GROUP', row.key);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLSpanElement>) {
    const { key } = event;
    if (['ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(key)) {
      event.preventDefault();
      event.stopPropagation();
      if (key === ' ' || key === 'Enter') {
        toggleGroup();
      }
    }
  }

  return (
    <div
      role="row"
      aria-rowindex={ariaRowIndex}
      className="rdg-row rdg-group-row"
      style={{ top }}
      onClick={selectGroup}
      {...props}
    >
      <div
        className={clsx('rdg-cell', 'rdg-cell-frozen', { 'rdg-cell-selected': isSelected })}
        style={{ left: 0, paddingLeft: viewportColumns[row.level + 1].left, width }} // TODO: how to handle checkbox?
        onKeyDown={onKeyDown}
      >
        <span
          ref={cellRef}
          tabIndex={-1}
          style={{ cursor: 'pointer' }}
          onClick={toggleGroup}
          onKeyDown={handleKeyDown}
        >
          {row.key}{' '}{row.isExpanded ? '\u25BC' : '\u25B6'}
        </span>
      </div>
    </div>
  );
}

export default memo(GroupedRow) as <R, SR>(props: GroupRowRendererProps<R, SR>) => JSX.Element;
