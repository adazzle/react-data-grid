import { useMemo } from 'react';

import DataGrid from '../../src';
import type { Column, FormatterProps } from '../../src';

type Row = number;
const rows: readonly Row[] = [...Array(500).keys()];

function CellFormatter(props: FormatterProps<Row>) {
  return (
    <>
      {props.column.key}&times;{props.rowIdx}
    </>
  );
}

export function VariableRowHeight() {
  const columns = useMemo((): readonly Column<Row>[] => {
    const columns: Column<Row>[] = [];

    for (let i = 0; i < 30; i++) {
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

  return <DataGrid columns={columns} rows={rows} rowHeight={rowHeight} className="fill-grid" />;
}

function rowHeight() {
  // should be based on the content of the row
  return 25 + Math.round(Math.random() * 75);
}

VariableRowHeight.storyName = 'Variable Row Height';
