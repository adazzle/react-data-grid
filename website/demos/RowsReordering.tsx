import { useState } from 'react';
import DataGrid, { TextEditor } from '../../src';
import type { Column } from '../../src';

interface Row {
  id: number;
  task: string;
  complete: number;
  priority: string;
  issueType: string;
}

function createRows(): readonly Row[] {
  const rows = [];
  for (let i = 1; i < 500; i++) {
    rows.push({
      id: i,
      task: `Task ${i}`,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority: ['Critical', 'High', 'Medium', 'Low'][Math.round(Math.random() * 3)],
      issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.round(Math.random() * 3)]
    });
  }

  return rows;
}

const columns: readonly Column<Row>[] = [
  {
    key: 'id',
    name: 'ID',
    width: 80
  },
  {
    key: 'task',
    name: 'Title',
    editor: TextEditor
  },
  {
    key: 'priority',
    name: 'Priority'
  },
  {
    key: 'issueType',
    name: 'Issue Type'
  },
  {
    key: 'complete',
    name: '% Complete'
  }
];

const hideRows = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];

export default function RowsReordering() {
  const [rows, setRows] = useState(createRows);

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      onRowsChange={setRows}
      hideRows={hideRows}
      enableVirtualization={false}
      cellNavigationMode="CHANGE_ROW"
    />
  );
}
