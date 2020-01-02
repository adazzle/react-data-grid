import React from 'react';

import './CellExpanderFormatter.less';

export interface CellExpanderFormatterProps {
  expanded: boolean;
  onCellExpand(): void;
}

export function CellExpanderFormatter({ expanded, onCellExpand }: CellExpanderFormatterProps) {
  function handleCellExpand(e: React.MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    onCellExpand();
  }

  return (
    <div className="rdg-cell-expand">
      <span onClick={handleCellExpand}>
        {expanded ? '\u25BC' : '\u25B6'}
      </span>
    </div>
  );
}
