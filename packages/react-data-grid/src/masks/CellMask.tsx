import React, { forwardRef } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
  top: number;
  left: number;
  zIndex: number;
}

function setMaskStyle({ left, top, width, height, zIndex }: Props): React.CSSProperties {
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

const CellMask = forwardRef<HTMLDivElement, Props>(function CellMask({ width, height, top, left, zIndex, ...props }, ref) {
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
