import { useCallback, useMemo, useState } from 'react';

import DataGrid from '../../src';
import type { Column, RenderHeaderCellProps, SortColumn } from '../../src';
import { DraggableHeaderRenderer } from './components';
import type { Props } from './types';

interface Row {
  readonly id: number;
  readonly task: string;
  readonly complete: number;
  readonly priority: string;
  readonly issueType: string;
}

function createRows(): Row[] {
  const rows: Row[] = [];

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
      sortable: true,
      draggable: true
    },
    {
      key: 'priority',
      name: 'Priority',
      resizable: true,
      sortable: true,
      draggable: true
    },
    {
      key: 'issueType',
      name: 'Issue Type',
      resizable: true,
      sortable: true,
      draggable: true
    },
    {
      key: 'complete',
      name: '% Complete',
      resizable: true,
      sortable: true,
      draggable: true
    }
  ];
}

export default function ColumnsReordering({ direction }: Props) {
  const [rows] = useState(createRows);
  const [columns, setColumns] = useState(createColumns);
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const onSortColumnsChange = useCallback((sortColumns: SortColumn[]) => {
    setSortColumns(sortColumns.slice(-1));
  }, []);

  const onColumnsReorder = useCallback((sourceKey: string, targetKey: string) => {
    setColumns((columns) => {
      const sourceColumnIndex = columns.findIndex((c) => c.key === sourceKey);
      const targetColumnIndex = columns.findIndex((c) => c.key === targetKey);
      const reorderedColumns = [...columns];

      reorderedColumns.splice(
        targetColumnIndex,
        0,
        reorderedColumns.splice(sourceColumnIndex, 1)[0]
      );
      return reorderedColumns;
    });
  }, []);

  const sortedRows = useMemo((): readonly Row[] => {
    if (sortColumns.length === 0) return rows;
    const { columnKey, direction } = sortColumns[0];

    let sortedRows: Row[] = [...rows];

    switch (columnKey) {
      case 'task':
      case 'priority':
      case 'issueType':
        sortedRows = sortedRows.sort((a, b) => a[columnKey].localeCompare(b[columnKey]));
        break;
      case 'complete':
        sortedRows = sortedRows.sort((a, b) => a[columnKey] - b[columnKey]);
        break;
      default:
    }
    return direction === 'DESC' ? sortedRows.reverse() : sortedRows;
  }, [rows, sortColumns]);

  return (
    <DataGrid
      columns={columns}
      rows={sortedRows}
      sortColumns={sortColumns}
      onSortColumnsChange={onSortColumnsChange}
      direction={direction}
      defaultColumnOptions={{ width: '1fr' }}
      onColumnsReorder={onColumnsReorder}
    />
  );
}
