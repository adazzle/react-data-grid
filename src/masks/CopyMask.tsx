import React from 'react';
import CellMask, { CellMaskProps } from './CellMask';

export default function CopyMask(props: CellMaskProps) {
  return (
    <CellMask
      {...props}
      className="react-grid-cell-copied"
    />
  );
}
