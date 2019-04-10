import React from 'react';

import { CellExpand } from './common/constants';

export interface CellExpanderProps {
  expanded: boolean;
  onCellExpand(): void;
}

export default function CellExpander({ expanded, onCellExpand }: CellExpanderProps) {
  function handleCellExpand(e: React.MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    onCellExpand();
  }

  return (
    <div className="rdg-cell-expand">
      <span onClick={handleCellExpand}>
        {expanded ? CellExpand.DOWN_TRIANGLE : CellExpand.RIGHT_TRIANGLE}
      </span>
    </div>
  );
}
