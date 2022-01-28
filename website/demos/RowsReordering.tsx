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
    width: 56
  },
  {
    key: 'task',
    name: 'Title',
    editor: TextEditor,
    width: 500
  },
  {
    key: 'priority',
    name: 'Priority',
    width: 500
  },
  {
    key: 'issueType',
    name: 'Issue Type',
    width: 500
  },
  {
    key: 'complete',
    name: '% Complete',
    width: 500
  }
];

export default function RowsReordering() {
  const [rows, setRows] = useState(createRows);

  const handleFill = ({ columnKey, sourceRow, targetRow, targetRowIndex }) => {
    return { ...targetRow, [columnKey]: sourceRow[columnKey] };
  };

  return (
    <div
      style={{
        padding: 32
      }}
    >
      <DataGrid
        columns={columns}
        rows={rows}
        onRowsChange={setRows}
        cellNavigationMode="CHANGE_ROW"
        onFill={handleFill}
      />
    </div>
  );
}
