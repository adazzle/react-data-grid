import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { DraggableRowRenderer } from './components/RowRenderers';
import DataGrid from '../../src';
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
    name: 'Title'
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

export function RowsReordering() {
  const [rows, setRows] = useState(createRows);

  function onRowReorder(fromIndex: number, toIndex: number) {
    const newRows = [...rows];
    newRows.splice(
      toIndex,
      0,
      newRows.splice(fromIndex, 1)[0]
    );

    setRows(newRows);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <DataGrid
        columns={columns}
        rows={rows}
        rowRenderer={p => <DraggableRowRenderer {...p} onRowReorder={onRowReorder} />}
      />
    </DndProvider>
  );
}

RowsReordering.storyName = 'Rows Reordering';
