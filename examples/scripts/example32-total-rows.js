import React, { useCallback, useMemo, useState } from 'react';
import ReactDataGrid, { SelectColumn } from 'react-data-grid';
import exampleWrapper from '../components/exampleWrapper';

const columns = [
  SelectColumn,
  {
    key: 'id',
    name: 'ID',
    frozen: true
  },
  {
    key: 'task',
    name: 'Title',
    width: 200,
    frozen: true,
    formatter({ value, row: { selectedRowsCount }, isBottomPinned }) {
      if (isBottomPinned) {
        return <strong>{ selectedRowsCount >= 0 ? `${selectedRowsCount} row${selectedRowsCount > 1 ? 's' : ''} selected` : 'Total'}</strong>;
      }

      return <div>{value}</div>;
    }
  },
  {
    key: 'priority',
    name: 'Priority',
    width: 200
  },
  {
    key: 'issueType',
    name: 'Issue Type',
    width: 200
  },
  {
    key: 'complete',
    name: '% Complete',
    width: 200
  },
  {
    key: 'startDate',
    name: 'Start Date',
    width: 200
  },
  {
    key: 'completeDate',
    name: 'Expected Complete',
    width: 200
  },
  {
    key: 'cost',
    name: 'Resource cost (USD)',
    width: 200,
    formatter: ({ value }) => <div>{ value.toLocaleString('en-US') }</div>
  },
  {
    key: 'hours',
    name: '# of working hours',
    width: 200,
    formatter: ({ value }) => <div>{ value.toLocaleString('en-US', { maximumFractionDigits: 0 }) }</div>
  },
  {
    key: 'issueCount',
    name: '# of issues',
    width: 200,
    formatter: ({ value }) => <div>{ value.toLocaleString('en-US', { maximumFractionDigits: 0 }) }</div>
  }
];

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

function Example() {
  const [selectedRowIndexes, setSelectedRowIndexes] = useState(new Set([]));

  const rows = useMemo(() => {
    const rows = [];

    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        task: `Task ${i}`,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor(Math.random() * 4)],
        issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor(Math.random() * 4)],
        startDate: getRandomDate(new Date(2015, 3, 1), new Date()),
        completeDate: getRandomDate(new Date(), new Date(2016, 0, 1)),
        cost: Math.random() * 25.2 + 1,
        hours: Math.floor(Math.random() * 4 + 1),
        issueCount: Math.floor(Math.random() * 8 + 1)
      });
    }

    return rows;
  }, []);

  const pinnedRows = useMemo(() => {
    const selectedTotalRow = {
      cost: 0,
      hours: 0,
      issueCount: 0,
      selectedRowsCount: selectedRowIndexes.size || 0
    };

    const totalRow = {
      cost: 0,
      hours: 0,
      issueCount: 0,
      selectedRowsCount: -1
    };

    rows.forEach((row, idx) => {
      totalRow.cost += row.cost;
      totalRow.hours += row.hours;
      totalRow.issueCount += row.issueCount;

      if (selectedRowIndexes.has(idx + 1)) {
        selectedTotalRow.cost += row.cost;
        selectedTotalRow.hours += row.hours;
        selectedTotalRow.issueCount += row.issueCount;
      }
    });

    return [selectedTotalRow, totalRow];
  }, [rows, selectedRowIndexes]);

  const rowGetter = useCallback((i) => rows[i], [rows]);

  return (
    <>
      <ReactDataGrid
        rowKey="id"
        columns={columns}
        rowGetter={rowGetter}
        pinnedRows={pinnedRows}
        rowsCount={rows.length}
        minHeight={700}
        selectedRows={selectedRowIndexes}
        onSelectedRowsChange={setSelectedRowIndexes}
      />
      <div
        style={{
          padding: '0 20px',
          lineHeight: '35px',
          textAlign: 'right',
          width: '100%',
          background: '#eee',
          border: '1px solid #ddd',
          borderTop: 'none'
        }}
      >
        <div>This is just a plain customized footer which renders next to the canvas. This area can potentially be used for pagination for example.</div>
      </div>
    </>
  );
}

const exampleDescription = <></>;

export default exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Total row(s) Example',
  exampleDescription,
  examplePath: './scripts/example32-total-rows.js',
  examplePlaygroundLink: 'https://jsfiddle.net/k7tfnw1n/5/'
});
