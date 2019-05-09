import React, { forwardRef } from 'react';
import CellMask, { CellMaskProps } from './CellMask';

const CopyMask = forwardRef<HTMLDivElement, CellMaskProps>(function CopyMask(props, ref) {
  return (
    <CellMask
      {...props}
      className="react-grid-cell-copied"
      ref={ref}
    />
  );
});

export default CopyMask;
