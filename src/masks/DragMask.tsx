import React from 'react';

import { Position, Dimension } from '../common/types';
import CellMask from './CellMask';

export interface DraggedPosition extends Position {
  overRowIdx: number;
}

interface Props {
  draggedPosition: DraggedPosition;
  getSelectedDimensions: (position: Position) => Dimension;
}

export default function DragMask({ draggedPosition, getSelectedDimensions }: Props) {
  const { overRowIdx, idx, rowIdx } = draggedPosition;
  if (rowIdx === overRowIdx) return null;

  const isDraggedOverDown = rowIdx < overRowIdx;
  const startRowIdx = isDraggedOverDown ? rowIdx + 1 : overRowIdx;
  const endRowIdx = isDraggedOverDown ? overRowIdx : rowIdx - 1;
  const className = isDraggedOverDown ? 'react-grid-cell-dragged-over-down' : 'react-grid-cell-dragged-over-up';

  const dimensions = getSelectedDimensions({ idx, rowIdx: startRowIdx });
  for (let currentRowIdx = startRowIdx + 1; currentRowIdx <= endRowIdx; currentRowIdx++) {
    const { height } = getSelectedDimensions({ idx, rowIdx: currentRowIdx });
    dimensions.height += height;
  }

  return (
    <CellMask {...dimensions} className={className} />
  );
}
