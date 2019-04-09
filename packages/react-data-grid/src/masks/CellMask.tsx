import React, { forwardRef } from 'react';

export interface CellMaskDimensions {
  width: number;
  height: number;
  top: number;
  left: number;
  zIndex: number;
}

function setMaskStyle({ left, top, width, height, zIndex }: CellMaskDimensions): React.CSSProperties {
  return {
    height,
    width,
    zIndex,
    position: 'absolute',
    pointerEvents: 'none',
    transform: `translate(${left}px, ${top}px)`,
    outline: 0
  };
}

export type CellMaskProps = React.HTMLAttributes<HTMLDivElement> & CellMaskDimensions;

const CellMask = forwardRef<HTMLDivElement, CellMaskProps>(function CellMask({ width, height, top, left, zIndex, ...props }, ref) {
  return (
    <div
      style={setMaskStyle({ left, top, width, height, zIndex })}
      data-test="cell-mask"
      ref={ref}
      {...props}
    />
  );
});

export default CellMask;
