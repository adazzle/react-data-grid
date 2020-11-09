import { useState, useRef } from 'react';
import DataGrid from '../../src';
import type { Column, DataGridHandle } from '../../src';

interface Row {
  id: number;
  title: string;
  count: number;
}

const columns: readonly Column<Row>[] = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' },
  { key: 'count', name: 'Count' }
];

export function ScrollToRow() {
  const [rows] = useState(() => {
    const rows: Row[] = [];

    for (let i = 0; i < 1000; i++) {
      rows.push({
        id: i,
        title: `Title ${i}`,
        count: i * 1000
      });
    }

    return rows;
  });
  const [value, setValue] = useState('10');
  const gridRef = useRef<DataGridHandle>(null);

  return (
    <>
      <div style={{ marginBottom: 5 }}>
        <span style={{ marginRight: 5 }}>Row index: </span>
        <input
          style={{ width: 50 }}
          type="number"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
        <button
          type="button"
          onClick={() => gridRef.current!.scrollToRow(Number(value))}
        >
          Scroll to row
        </button>
      </div>
      <DataGrid
        ref={gridRef}
        columns={columns}
        rows={rows}
      />
    </>
  );
}

ScrollToRow.storyName = 'Scroll To Row';
