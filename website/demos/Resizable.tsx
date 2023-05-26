import DataGrid from '../../src';
import type { Column } from '../../src';
import { renderCoordinates } from './renderers';
import type { Props } from './types';

type Row = number;
const rows: readonly Row[] = [...Array(100).keys()];

const columns: Column<Row>[] = [];

for (let i = 0; i < 50; i++) {
  const key = String(i);
  columns.push({
    key,
    name: key,
    renderCell: renderCoordinates
  });
}

export default function ResizableGrid({ direction }: Props) {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      className="fill-grid"
      style={{ resize: 'both' }}
      direction={direction}
    />
  );
}
