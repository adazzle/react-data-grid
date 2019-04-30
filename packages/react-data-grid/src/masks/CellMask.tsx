import React, { forwardRef } from 'react';
import { Dimension } from '../common/types';

export type CellMaskProps = React.HTMLAttributes<HTMLDivElement> & Dimension;

const CellMask = forwardRef<HTMLDivElement, CellMaskProps>(function CellMask({ width, height, top, left, zIndex, ...props }, ref) {
  return (
    <div
      className="rdg-cell-mask"
      style={{
        height,
        width,
        zIndex,
        transform: `translate(${left}px, ${top}px)`
      }}
      data-test="cell-mask"
      ref={ref}
      {...props}
    />
  );
});

export default CellMask;
