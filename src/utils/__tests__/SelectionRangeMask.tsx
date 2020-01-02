import React from 'react';
import CellMask, { CellMaskProps } from './CellMask';

export default function SelectionRangeMask(props: CellMaskProps) {
  return (
    <CellMask
      {...props}
      className="rdg-selected-range"
    />
  );
}
