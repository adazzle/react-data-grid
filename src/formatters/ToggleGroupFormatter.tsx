import React from 'react';
import { GroupFormatterProps } from '../types';
import { useFocusRef } from '../hooks';


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
    <>
      {groupKey}
      <span
        ref={cellRef}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={isExpanded ? 'rdg-caret-expanded' : 'rdg-caret-collapsed'}
      />
    </>
  );
}
