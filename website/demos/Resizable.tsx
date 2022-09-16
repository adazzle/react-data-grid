import DataGrid from '../../src';
import type { Column, FormatterProps } from '../../src';
import type { Props } from './types';

type Row = number;
const rows: readonly Row[] = [...Array(100).keys()];

function cellFormatter(props: FormatterProps<Row>) {
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
    formatter: cellFormatter
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
