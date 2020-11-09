import { useMemo } from 'react';
import DataGrid from '../../src';
import type { Column, FormatterProps } from '../../src';

type Row = undefined;
const rows: readonly Row[] = Array(1000);

function CellFormatter(props: FormatterProps<Row>) {
  return <>{props.column.key}&times;{props.rowIdx}</>;
}

export function MillionCells() {
  const columns = useMemo((): readonly Column<Row>[] => {
    const columns: Column<Row>[] = [];

    for (let i = 0; i < 1000; i++) {
      const key = String(i);
      columns.push({
        key,
        name: key,
        frozen: i < 5,
        resizable: true,
        formatter: CellFormatter
      });
    }

    return columns;
  }, []);

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowHeight={22}
      className="fill-grid"
    />
  );
}

MillionCells.storyName = 'A Million Cells';
