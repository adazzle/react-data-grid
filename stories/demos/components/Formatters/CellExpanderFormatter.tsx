import React, { useRef, useEffect } from 'react';

import './CellExpanderFormatter.less';

export interface CellExpanderFormatterProps {
  isCellActive?: boolean;
  expanded: boolean;
  onCellExpand: () => void;
}

export function CellExpanderFormatter({ isCellActive, expanded, onCellExpand }: CellExpanderFormatterProps) {
  const iconRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (isCellActive) {
      iconRef.current?.focus();
    }
  }, [isCellActive]);

  function handleClick(e: React.MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    onCellExpand();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === ' ') {
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
