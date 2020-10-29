import React, { useMemo } from 'react';
import DataGrid, { Column, FormatterProps } from '../../src';

type Row = undefined;
const rows: readonly Row[] = Array(100);

function CellFormatter(props: FormatterProps<Row>) {
  return <>{props.column.key}&times;{props.rowIdx}</>;
}

export function ResizableGrid() {
  const columns = useMemo((): readonly Column<Row>[] => {
    const columns: Column<Row>[] = [];

    for (let i = 0; i < 50; i++) {
      const key = String(i);
      columns.push({
        key,
        name: key,
        formatter: CellFormatter
      });
    }

    return columns;
  }, []);

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
