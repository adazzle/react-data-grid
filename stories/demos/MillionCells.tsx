import React, { useState } from 'react';
import DataGrid, { Column, FormatterProps } from '../../src';

interface Row {
  id: number;
  [key: string]: unknown; // TODO: remove
}

function CellFormatter(props: FormatterProps<Row>) {
  return <>{props.column.key}&times;{props.rowIdx}</>;
}

export default function MillionCells() {
  const [columns] = useState(() => {
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
  });

  const [rows] = useState(() => {
    const rows: Row[] = [];

    for (let i = 0; i < 1000; i++) {
      rows.push({ id: i });
    }

    return rows;
  });

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowHeight={22}
      className="fill-grid"
    />
  );
}
