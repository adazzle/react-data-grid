import { useState, useCallback, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { DraggableHeaderRenderer } from './components/HeaderRenderers';
import DataGrid from '../../src';
import type { Column, HeaderRendererProps, SortDirection } from '../../src';

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
      priority: ['Critical', 'High', 'Medium', 'Low'][Math.round(Math.random() * 3)],
      issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.round(Math.random() * 3)]
    });
  }

  return rows;
}

function createColumns(): Column<Row>[] {
  return [
    {
      key: 'id',
      name: 'ID',
      width: 80
    },
    {
      key: 'task',
      name: 'Title',
      resizable: true,
      sortable: true
    },
    {
      key: 'priority',
      name: 'Priority',
      resizable: true,
      sortable: true
    },
    {
      key: 'issueType',
      name: 'Issue Type',
      resizable: true,
      sortable: true
    },
    {
      key: 'complete',
      name: '% Complete',
      resizable: true,
      sortable: true
    }
  ];
}

export function ColumnsReordering() {
  const [rows] = useState(createRows);
  const [columns, setColumns] = useState(createColumns);
  const [[sortColumn, sortDirection], setSort] = useState<[string, SortDirection]>(['task', 'NONE']);

  const handleSort = useCallback((columnKey: string, direction: SortDirection) => {
    setSort([columnKey, direction]);
  }, []);

  const draggableColumns = useMemo(() => {
    function HeaderRenderer(props: HeaderRendererProps<Row>) {
      return <DraggableHeaderRenderer {...props} onColumnsReorder={handleColumnsReorder} />;
    }

    function handleColumnsReorder(sourceKey: string, targetKey: string) {
      const sourceColumnIndex = columns.findIndex(c => c.key === sourceKey);
      const targetColumnIndex = columns.findIndex(c => c.key === targetKey);
      const reorderedColumns = [...columns];

      reorderedColumns.splice(
        targetColumnIndex,
        0,
        reorderedColumns.splice(sourceColumnIndex, 1)[0]
      );

      setColumns(reorderedColumns);
    }

    return columns.map(c => {
      if (c.key === 'id') return c;
      return { ...c, headerRenderer: HeaderRenderer };
    });
  }, [columns]);

  const sortedRows = useMemo((): readonly Row[] => {
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

  return (
    <DndProvider backend={HTML5Backend}>
      <DataGrid
        columns={draggableColumns}
        rows={sortedRows}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    </DndProvider>
  );
}

ColumnsReordering.storyName = 'Columns Reordering';
