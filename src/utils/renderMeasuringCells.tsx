import { css } from '@linaria/core';

import type { CalculatedColumn } from '../types';

const measuringCellClassname = css`
  @layer rdg.MeasuringCell {
    contain: strict;
    grid-row: 1;
    visibility: hidden;
  }
`;

export function renderMeasuringCells<R, SR>(viewportColumns: readonly CalculatedColumn<R, SR>[]) {
  return viewportColumns.map(({ key, idx, minWidth }) => (
    <div
      key={key}
      className={measuringCellClassname}
      style={{ gridColumnStart: idx + 1, minWidth }}
      data-measuring-cell-key={key}
    />
  ));
}
