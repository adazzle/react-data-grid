import { memo } from 'react';

import { useColumns } from './hooks';
import SummaryCell from './SummaryCell';

export interface SummaryRowProps<SR> {
  row: SR;
}

function SummaryRow<R, SR>({ row }: SummaryRowProps<SR>) {
  const viewportColumns = useColumns<R, SR>();
  return (
    < >
      {viewportColumns.map(column => (
        <SummaryCell<R, SR>
          key={column.key}
          column={column}
          row={row}
        />
      ))}
    </>
  );
}

export default memo(SummaryRow) as <R>(props: SummaryRowProps<R>) => JSX.Element;
