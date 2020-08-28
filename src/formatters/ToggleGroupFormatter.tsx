import React from 'react';
import { GroupFormatterProps } from '../types';
import { useFocusRef } from '../hooks';

import './ToggleGroupFormatter.less';

export function ToggleGroupFormatter<R, SR>({
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
        className={isExpanded ? 'caret-expanded' : 'caret-collapsed'}
      />
    </span>
  );
}
