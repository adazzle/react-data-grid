import React, { useState, useCallback, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import { DraggableHeaderRenderer } from './components/HeaderRenderers';
import DataGrid, { Column, HeaderRendererProps, SortDirection } from '../../src';

interface Row {
  id: number;
  task: string;
  complete: number;
  priority: string;
  issueType: string;
}

function createRows(): Row[] {
  const rows = [];
  for (let i = 1; i < 500; i++) {
    rows.push({
      id: i,
      task: `Task ${i}`,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
      issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)]
    });
  }

  return rows;
}

export default function ColumnsReordering() {
  const [rows] = useState(createRows);
  const [columns, setColumns] = useState<Column<Row>[]>(() => [
    {
      key: 'id',
      name: 'ID',
      width: 80
    },
    {
      key: 'task',
      name: 'Title',
      resizable: true,
      sortable: true,
      headerRenderer: HeaderRenderer
    },
    {
      key: 'priority',
      name: 'Priority',
      resizable: true,
      sortable: true,
      headerRenderer: HeaderRenderer
    },
    {
      key: 'issueType',
      name: 'Issue Type',
      resizable: true,
      sortable: true,
      headerRenderer: HeaderRenderer
    },
    {
      key: 'complete',
      name: '% Complete',
      resizable: true,
      sortable: true,
      headerRenderer: HeaderRenderer
    }
  ]);
  const [[sortColumn, sortDirection], setSort] = useState<[string, SortDirection]>(['task', 'NONE']);

  const sortedRows: readonly Row[] = useMemo(() => {
    if (sortDirection === 'NONE') return rows;

    let sortedRows: Row[] = [...rows];

    switch (sortColumn) {
      case 'task':
      case 'priority':
      case 'issueType':
        sortedRows = sortedRows.sort((a, b) => a[sortColumn].localeCompare(b[sortColumn]));
        break;
      case 'complete':
        sortedRows = sortedRows.sort((a, b) => a[sortColumn] - b[sortColumn]);
        break;
      default:
    }

    return sortDirection === 'DESC' ? sortedRows.reverse() : sortedRows;
  }, [rows, sortDirection, sortColumn]);

  function HeaderRenderer(props: HeaderRendererProps<Row>) {
    return <DraggableHeaderRenderer {...props} onColumnsReorder={handleColumnsReorder} />;
  }

  function handleColumnsReorder(sourceKey: string, targetKey: string) {
    const sourceColumn = columns.find(c => c.key === sourceKey)!;
    const targetColumn = columns.find(c => c.key === targetKey)!;

    const reorderedColumns = columns.map(c => {
      if (c === sourceColumn) return targetColumn;
      if (c === targetColumn) return sourceColumn;
      return c;
    });

    setColumns(reorderedColumns);
  }

  const handleSort = useCallback((columnKey: string, direction: SortDirection) => {
    setSort([columnKey, direction]);
  }, []);

  return (
    <DndProvider backend={Backend}>
      <DataGrid
        columns={columns}
        rows={sortedRows}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    </DndProvider>
  );
}
