import { useRef } from 'react';
import { css } from '@linaria/core';

import { useLayoutEffect } from '../hooks';
import type { CalculatedColumn } from '../types';

const measuringCellClassname = css`
  @layer rdg.MeasuringCell {
    contain: strict;
    grid-row: 1;
    visibility: hidden;
  }
`;

export function renderMeasuringCells<R, SR>(
  viewportColumns: readonly CalculatedColumn<R, SR>[],
  measuringCellResizeObserver: ResizeObserver
) {
  return (
    <>
      {viewportColumns.map((column) => (
        <MeasuringCell
          key={column.key}
          column={column}
          measuringCellResizeObserver={measuringCellResizeObserver}
        />
      ))}
    </>
  );
}

function MeasuringCell<R, SR>({
  column,
  measuringCellResizeObserver
}: {
  column: CalculatedColumn<R, SR>;
  measuringCellResizeObserver: ResizeObserver;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { key, idx, minWidth, maxWidth } = column;

  useLayoutEffect(() => {
    const div = ref.current!;
    measuringCellResizeObserver.observe(div);

    return () => {
      measuringCellResizeObserver.unobserve(div);
    };
  }, [measuringCellResizeObserver]);

  return (
    <div
      ref={ref}
      className={measuringCellClassname}
      style={{ gridColumnStart: idx + 1, minWidth, maxWidth }}
      data-measuring-cell-key={key}
    />
  );
}
