import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { Dimension } from '../common/types';

export type CellMaskProps = React.HTMLAttributes<HTMLDivElement> & Dimension;

export default forwardRef<HTMLDivElement, CellMaskProps>(function CellMask({ width, height, top, left, zIndex, className, ...props }, ref) {
  return (
    <div
      className={clsx('rdg-cell-mask', className)}
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
