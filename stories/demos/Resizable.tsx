import DataGrid from '../../src';
import type { Column, FormatterProps } from '../../src';

type Row = undefined;
const rows: readonly Row[] = Array(100);

function CellFormatter(props: FormatterProps<Row>) {
  return <>{props.column.key}&times;{props.rowIdx}</>;
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

export function ResizableGrid() {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      className="fill-grid"
      style={{ resize: 'both' }}
    />
  );
}

ResizableGrid.storyName = 'Resizable Grid';
