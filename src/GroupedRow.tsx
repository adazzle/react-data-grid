import React, { useRef, useLayoutEffect } from 'react';
import clsx from 'clsx';

type SharedDivProps = Pick<React.HTMLAttributes<HTMLDivElement>,
  | 'onClick'
  | 'onKeyDown'
  | 'aria-rowindex'
>;

interface GroupedRowProps extends SharedDivProps {
  groupKey: string;
  top: number;
  width: number;
  columnWidth: number;
  isExpanded: boolean;
  isSelected: boolean;
  toggleGroup: () => void;
}

export default function GroupedRow({
  'aria-rowindex': ariaRowIndex,
  groupKey,
  top,
  width,
  columnWidth,
  isExpanded,
  isSelected,
  onClick,
  onKeyDown,
  toggleGroup
}: GroupedRowProps) {
  const cellRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!isSelected) return;
    cellRef.current?.focus();
  }, [isSelected]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleGroup();
    }
  }

  return (
    <div
      role="row"
      aria-rowindex={ariaRowIndex}
      className="rdg-row rdg-grouped-row"
      style={{ top }}
      onClick={onClick}
    >
      <div
        className={clsx('rdg-cell', 'rdg-cell-frozen', { 'rdg-cell-selected': isSelected })}
        style={{ left: 0, paddingLeft: 8 + columnWidth, width }}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <span
          ref={cellRef}
          tabIndex={-1}
          style={{ cursor: 'pointer' }}
          onClick={toggleGroup}
          onKeyDown={handleKeyDown}
        >
          {groupKey}{' '}{isExpanded ? '\u25BC' : '\u25B6'}
        </span>
      </div>
    </div>
  );
}
