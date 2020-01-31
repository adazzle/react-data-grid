import React, { useState, useCallback, useMemo } from 'react';
import faker from 'faker';
import { AutoSizer } from 'react-virtualized';
import DataGrid, { SelectColumn, Column, RowsUpdateEvent, DEFINE_SORT, SummaryFormatterProps } from '../../src';

const dateFormatter = new Intl.DateTimeFormat(navigator.language);
const currencyFormatter = new Intl.NumberFormat(navigator.language, {
  style: 'currency',
  currency: 'eur'
});

function TimestampFormatter({ timestamp }: { timestamp: number }) {
  return <>{dateFormatter.format(timestamp)}</>;
}

function CurrencyFormatter({ value }: { value: number }) {
  return <>{currencyFormatter.format(value)}</>;
}

interface SummaryRow {
  id: string;
  totalCount: number;
  availableCount: {
    yes: number;
    no: number;
  };
}

type SummaryRowFormatterProps = SummaryFormatterProps<SummaryRow, Row>;

interface Row {
  id: number;
  title: string;
  client: string;
  area: string;
  country: string;
  contact: string;
  assignee: string;
  progress: number;
  startTimestamp: number;
  endTimestamp: number;
  budget: number;
  transaction: string;
  account: string;
  version: string;
  available: boolean;
}

const columns: readonly Column<Row>[] = [
  {
    ...SelectColumn,
    summaryFormatter() {
      return <strong>Total</strong>;
    }
  },
  {
    key: 'id',
    name: 'ID',
    width: 60,
    frozen: true,
    sortable: true,
    summaryFormatter({ row }: SummaryRowFormatterProps) {
      return <>{row.totalCount}</>;
    }
  },
  {
    key: 'title',
    name: 'Task',
    width: 120,
    editable: true,
    frozen: true,
    resizable: true,
    sortable: true
  },
  {
    key: 'client',
    name: 'Client',
    width: 220,
    editable: true,
    resizable: true,
    sortable: true
  },
  {
    key: 'area',
    name: 'Area',
    width: 120,
    editable: true,
    resizable: true,
    sortable: true
  },
  {
    key: 'country',
    name: 'Country',
    width: 120,
    editable: true,
    resizable: true,
    sortable: true
  },
  {
    key: 'contact',
    name: 'Contact',
    width: 160,
    editable: true,
    resizable: true,
    sortable: true
  },
  {
    key: 'assignee',
    name: 'Assignee',
    width: 150,
    editable: true,
    resizable: true,
    sortable: true
  },
  {
    key: 'progress',
    name: 'Completion',
    width: 110,
    resizable: true,
    sortable: true,
    formatter(props) {
      const value = props.row.progress;
      return (
        <>
          <progress max={100} value={value} style={{ width: 50 }} /> {Math.round(value)}%
        </>
      );
    }
  },
  {
    key: 'startTimestamp',
    name: 'Start date',
    width: 100,
    resizable: true,
    sortable: true,
    formatter(props) {
      return <TimestampFormatter timestamp={props.row.startTimestamp} />;
    }
  },
  {
    key: 'endTimestamp',
    name: 'Deadline',
    width: 100,
    resizable: true,
    sortable: true,
    formatter(props) {
      return <TimestampFormatter timestamp={props.row.endTimestamp} />;
    }
  },
  {
    key: 'budget',
    name: 'Budget',
    width: 100,
    resizable: true,
    sortable: true,
    formatter(props) {
      return <CurrencyFormatter value={props.row.budget} />;
    }
  },
  {
    key: 'transaction',
    name: 'Transaction type',
    resizable: true,
    sortable: true
  },
  {
    key: 'account',
    name: 'Account',
    width: 150,
    resizable: true,
    sortable: true
  },
  {
    key: 'version',
    name: 'Version',
    editable: true,
    resizable: true,
    sortable: true
  },
  {
    key: 'available',
    name: 'Available',
    resizable: true,
    sortable: true,
    width: 80,
    summaryCellClass: 'common-feature-summary-available',
    formatter(props) {
      return <>{props.row.available ? '✔️' : '❌'}</>;
    },
    summaryFormatter({ column, row }: SummaryRowFormatterProps) {
      return (
        <>{column.key === 'available' && (
          <>
            <div>{`✔️: ${row.availableCount.yes}`}</div>
            <div>{`❌: ${row.availableCount.no}`}</div>
          </>
        )}
        </>
      );
    }
  }
];

function createRows(): readonly Row[] {
  const now = Date.now();
  const rows: Row[] = [];

  for (let i = 0; i < 1000; i++) {
    rows.push({
      id: i,
      title: `Task #${i + 1}`,
      client: faker.company.companyName(),
      area: faker.name.jobArea(),
      country: faker.address.country(),
      contact: faker.internet.exampleEmail(),
      assignee: faker.name.findName(),
      progress: Math.random() * 100,
      startTimestamp: now - Math.round(Math.random() * 1e10),
      endTimestamp: now + Math.round(Math.random() * 1e10),
      budget: 500 + Math.random() * 10500,
      transaction: faker.finance.transactionType(),
      account: faker.finance.iban(),
      version: faker.system.semver(),
      available: Math.random() > 0.5
    });
  }

  return rows;
}

export default function CommonFeatures() {
  const [rows, setRows] = useState(createRows);
  const [[sortColumn, sortDirection], setSort] = useState<[keyof Row, DEFINE_SORT]>(['id', DEFINE_SORT.NONE]);
  const [selectedRows, setSelectedRows] = useState(() => new Set<number>());

  const summaryRows = useMemo(() => {
    const summaryRows: SummaryRow[] = [{ id: 'total_0', totalCount: 0, availableCount: { yes: 0, no: 0 } }];

    for (const row of rows) {
      if (row.available) {
        summaryRows[0].availableCount.yes++;
      } else {
        summaryRows[0].availableCount.no++;
      }
    }

    summaryRows[0].totalCount = rows.length;
    return summaryRows;
  }, [rows]);
  const sortedRows: readonly Row[] = useMemo(() => {
    if (sortDirection === DEFINE_SORT.NONE) return rows;

    let sortedRows: Row[] = [...rows];

    switch (sortColumn) {
      case 'assignee':
      case 'title':
      case 'client':
      case 'area':
      case 'country':
      case 'contact':
      case 'transaction':
      case 'account':
      case 'version':
        sortedRows = sortedRows.sort((a, b) => a[sortColumn].localeCompare(b[sortColumn]));
        break;
      case 'available':
        sortedRows = sortedRows.sort((a, b) => a[sortColumn] === b[sortColumn] ? 0 : a[sortColumn] ? 1 : -1);
        break;
      default:
        sortedRows = sortedRows.sort((a, b) => a[sortColumn] - b[sortColumn]);
        break;
    }

    return sortDirection === DEFINE_SORT.DESC ? sortedRows.reverse() : sortedRows;
  }, [rows, sortDirection, sortColumn]);

  const handleRowsUpdate = useCallback(({ fromRow, toRow, updated }: RowsUpdateEvent<Partial<Row>>) => {
    const newRows = [...sortedRows];

    for (let i = fromRow; i <= toRow; i++) {
      newRows[i] = { ...newRows[i], ...updated };
    }

    setRows(newRows);
  }, [sortedRows]);

  const handleSort = useCallback((columnKey: keyof Row, direction: DEFINE_SORT) => {
    setSort([columnKey, direction]);
  }, []);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <DataGrid
          rowKey="id"
          columns={columns}
          rows={sortedRows}
          width={width}
          height={height}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
          onRowsUpdate={handleRowsUpdate}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
          summaryRows={summaryRows}
        />
      )}
    </AutoSizer>
  );
}
