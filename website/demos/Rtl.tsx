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
    frozen: i < 5,
    resizable: true,
    formatter: CellFormatter
  });
}

export default function Rtl() {
  return (
    <DataGrid columns={columns} rows={rows} className="fill-grid" style={{ direction: 'rtl' }} />
  );
}
