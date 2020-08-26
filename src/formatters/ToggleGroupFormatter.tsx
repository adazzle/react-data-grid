import React from 'react';
import { GroupFormatterProps } from '../types';
import { useFocusRef } from '../hooks';

export function ToggleGroupedFormatter<R, SR>({
  groupKey,
  isExpanded,
  isCellSelected,
  toggleGroup
}: GroupFormatterProps<R, SR>) {
  const cellRef = useFocusRef<HTMLDivElement>(isCellSelected);

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
