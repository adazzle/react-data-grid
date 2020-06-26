import React, { useState, useRef } from 'react';
import DataGrid, { Column, DataGridHandle, SortColumn } from '../../src';

interface Row {
  id: number;
  title: string;
  count: number;
}

const columns: readonly Column<Row>[] = [
  { key: 'id', name: 'ID', sortable: true },
  { key: 'title', name: 'Title', sortable: true },
  { key: 'count', name: 'Count', sortable: true }
];

export default function MultipleSort() {
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

  const [sortDirection, setSortDirection] = useState<SortColumn[]>([]);

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
        sortDirection={sortDirection}
        onSort={(columnKey, direction) => {
          const newSortDirection = [];
          let existence = false;
          sortDirection.forEach(ele => {
            if (ele.columnKey === columnKey) {
              existence = true;
              newSortDirection.push({
                sortDirection: direction,
                columnKey
              });
            } else {
              newSortDirection.push({
                sortDirection: ele.sortDirection,
                columnKey: ele.columnKey
              });
            }
          });
          if (!existence) {
            newSortDirection.push({
              sortDirection: direction,
              columnKey
            });
          }
          setSortDirection(newSortDirection);
        }}
        rows={rows}
      />
    </>
  );
}
