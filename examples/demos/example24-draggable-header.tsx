import React, { useState, useCallback } from 'react';
import DataGrid, { Column } from '../../src';
import Wrapper from './Wrapper';

interface Row {
  id: number;
  title: string;
  count: number;
}

type RowFields = keyof Row;

function createRows(): Row[] {
  const rows: Row[] = [];

  for (let i = 1; i < 1000; i++) {
    rows.push({
      id: i,
      title: `Title ${i}`,
      count: i * 1000
    });
  }

  return rows;
}

function DraggableHeaderExample() {
  const [rows] = useState<Row[]>(createRows);
  const [columns, setColumns] = useState<Column<Row>[]>([
    {
      key: 'id',
      name: 'ID',
      width: 50,
      draggable: true
    },
    {
      key: 'title',
      name: 'Title',
      draggable: true,
      resizable: true
    },
    {
      key: 'count',
      name: 'Count',
      resizable: true
    }
  ]);

  const onHeaderDrop = useCallback((source: string, target: string) => {
    const newColumns = [...columns];
    const columnSourceIndex = newColumns.findIndex(i => i.key === source);
    const columnTargetIndex = newColumns.findIndex(i => i.key === target);
    const temp = { ...newColumns[columnSourceIndex] };
    newColumns[columnSourceIndex] = { ...newColumns[columnTargetIndex] };
    newColumns[columnTargetIndex] = temp;
    setColumns(newColumns);
  }, [columns]);

  const rowGetter = useCallback((i: number) => rows[i], [rows]);

  return (
    <Wrapper title="Drag Columns to Reorder">
      <DataGrid
        columns={columns}
        rowGetter={rowGetter}
        rowsCount={rows.length}
        minHeight={500}
        onHeaderDrop={onHeaderDrop}
      />
    </Wrapper>
  );
}

export default DraggableHeaderExample;
