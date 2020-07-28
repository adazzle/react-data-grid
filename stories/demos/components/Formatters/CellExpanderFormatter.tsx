import React, { useRef, useLayoutEffect } from 'react';

import './CellExpanderFormatter.less';

export interface CellExpanderFormatterProps {
  isCellSelected: boolean;
  expanded: boolean;
  onCellExpand: () => void;
}

export function CellExpanderFormatter({ isCellSelected, expanded, onCellExpand }: CellExpanderFormatterProps) {
  const iconRef = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    if (!isCellSelected) return;
    iconRef.current?.focus({ preventScroll: true });
  }, [isCellSelected]);

  function handleClick(e: React.MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    onCellExpand();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onCellExpand();
    }
  }

  return (
    <div className="rdg-cell-expand">
      <span
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <span
          ref={iconRef}
          tabIndex={-1}
        >
          {expanded ? '\u25BC' : '\u25B6'}
        </span>
      </span>
    </div>
  );
}
