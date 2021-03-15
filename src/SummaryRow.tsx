import { rowClassname, summaryRowClassname } from './style';
import { useColumns, useAriaRowIndex, useRowPosition } from './hooks';
import SummaryCell from './SummaryCell';

export interface SummaryRowProps<SR> {
  row: SR;
}

export default function SummaryRow<R, SR>({ row }: SummaryRowProps<SR>) {
  const ariaRowIndex = useAriaRowIndex();
  const viewportColumns = useColumns<R, SR>();
  const bottom = useRowPosition();
  return (
    <div
      role="row"
      aria-rowindex={ariaRowIndex}
      className={`${rowClassname} ${summaryRowClassname}`}
      style={{ bottom }}
    >
      {viewportColumns.map(column => (
        <SummaryCell<R, SR>
          key={column.key}
          column={column}
          row={row}
        />
      ))}
    </div>
  );
}
