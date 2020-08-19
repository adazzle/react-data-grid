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

  function handleKeyDown(event: React.KeyboardEvent<HTMLSpanElement>) {
    const { key } = event;
    if (['ArrowLeft', 'ArrowRight', 'Enter'].includes(key)) {
      event.preventDefault();
      event.stopPropagation();
      if (key === 'Enter') {
        toggleGroup();
      }
    }
  }

  return (
    <span
      ref={cellRef}
      tabIndex={-1}
      style={{ cursor: 'pointer' }}
      onClick={toggleGroup}
      onKeyDown={handleKeyDown}
    >
      {groupKey}{' '}{isExpanded ? '\u25BC' : '\u25B6'}
    </span>
  );
}
