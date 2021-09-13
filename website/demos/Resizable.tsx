import DataGrid from '../../src';
import type { Column, FormatterProps } from '../../src';

type Row = number;
const rows: readonly Row[] = [...Array(100).keys()];

function CellFormatter(props: FormatterProps<Row>) {
  return (
    <>
      {props.column.key}&times;{props.row}
    </>
  );
}

const columns: Column<Row>[] = [];

for (let i = 0; i < 50; i++) {
  const key = String(i);
  columns.push({
    key,
    name: key,
    formatter: CellFormatter
  });
}

export default function ResizableGrid() {
  return (
    <DataGrid columns={columns} rows={rows} className="fill-grid" style={{ resize: 'both' }} />
  );
}
