import React, { forwardRef } from 'react';
import CellMask, { CellMaskProps } from './CellMask';

export default forwardRef<HTMLDivElement, CellMaskProps>(function CopyMask(props, ref) {
  return (
    <CellMask
      {...props}
      className="react-grid-cell-copied"
      ref={ref}
    />
  );
});
