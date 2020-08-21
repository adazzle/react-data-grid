import React, { useRef, useLayoutEffect } from 'react';
import { GroupFormatterProps } from '../types';

export function ToggleGroupedFormatter<R, SR>({
  groupKey,
  isExpanded,
  isCellSelected,
  toggleGroup
}: GroupFormatterProps<R, SR>) {
  const cellRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!isCellSelected) return;
    cellRef.current?.focus();
  }, [isCellSelected]);

  function handleKeyDown({ key }: React.KeyboardEvent<HTMLSpanElement>) {
    if (key === 'Enter') {
      toggleGroup();
    }
  }

  return (
    <span
      style={{ cursor: 'pointer' }}
      onClick={toggleGroup}
    >
      {groupKey}{' '}
      <span
        ref={cellRef}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        {isExpanded ? '\u25BC' : '\u25B6'}
      </span>
    </span>
  );
}
