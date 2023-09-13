import { useCallback, useMemo, useState } from 'react';

import DataGrid from '../../src';
import type { Column, SortColumn } from '../../src';
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

const columns: Column<Row>[] = [
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

export default function ColumnsReordering({ direction }: Props) {
  const [rows] = useState(createRows);
  const [columnsOrder, setColumnsOrder] = useState((): readonly string[] => {
    return columns.map((column) => column.key);
  });
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const onSortColumnsChange = useCallback((sortColumns: SortColumn[]) => {
    setSortColumns(sortColumns.slice(-1));
  }, []);

  const onColumnsReorder = useCallback((sourceKey: string, targetKey: string) => {
    setColumnsOrder((columnsOrder) => {
      const sourceColumnIndex = columnsOrder.indexOf(sourceKey)!;
      const targetColumnIndex = columnsOrder.indexOf(targetKey)!;
      const newColumnsOrder = [...columnsOrder];

      newColumnsOrder.splice(targetColumnIndex, 0, newColumnsOrder.splice(sourceColumnIndex, 1)[0]);

      return newColumnsOrder;
    });
  }, []);

  const reorderedColumns = useMemo(() => {
    return columnsOrder.map((key) => columns.find((column) => column.key === key)!);
  }, [columnsOrder]);

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
      columns={reorderedColumns}
      rows={sortedRows}
      sortColumns={sortColumns}
      onSortColumnsChange={onSortColumnsChange}
      direction={direction}
      defaultColumnOptions={{ width: '1fr' }}
      onColumnsReorder={onColumnsReorder}
    />
  );
}
