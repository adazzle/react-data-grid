import React from 'react';
import { GroupFormatterProps } from '../types';
import { useFocusRef } from '../hooks';

export function ToggleGroupFormatter<R, SR>({
  groupKey,
  isExpanded,
  isCellSelected,
  toggleGroup
}: GroupFormatterProps<R, SR>) {
  const cellRef = useFocusRef<HTMLSpanElement>(isCellSelected);

  function handleKeyDown({ key }: React.KeyboardEvent<HTMLSpanElement>) {
    if (key === 'Enter') {
      toggleGroup();
    }
  }

  const d = isExpanded ? 'M1 1 L 7 7 L 13 1' : 'M1 7 L 7 1 L 13 7';

  return (
    <span
      ref={cellRef}
      className="rdg-group-cell-content"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      {groupKey}
      <svg viewBox="0 0 14 8" width="14" height="8" className="rdg-caret">
        <path d={d} />
      </svg>
    </span>
  );
}
