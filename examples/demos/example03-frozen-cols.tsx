import React, { useMemo, useCallback } from 'react';
import { AutoSizer } from 'react-virtualized';
import DataGrid, { Column } from '../../src';
import Wrapper from './Wrapper';

interface Row {
  id: number;
  task: string;
  complete: number;
  priority: string;
  issueType: string;
  startDate: string;
  completeDate: string;
  [key: string]: number | string;
}

function getRandomDate(start: Date, end: Date): string {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

function createRows(extraColumns: Column<Row>[]): Row[] {
  const rows: Row[] = [];

  for (let i = 1; i < 1000; i++) {
    rows.push({
      id: i,
      task: `Task ${i}`,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
      issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
      startDate: getRandomDate(new Date(2015, 3, 1), new Date()),
      completeDate: getRandomDate(new Date(), new Date(2016, 0, 1))
    });

    for (const extraColumn of extraColumns) {
      rows[rows.length - 1][extraColumn.key] = `${extraColumn.key}`;
    }
  }

  return rows;
}

export default function FrozenCols() {
  const [columns, rows] = useMemo(() => {
    const extraColumns: Column<Row>[] = [...Array(500).keys()].map(i => ({ key: `col${i}`, name: `col${i}` }));
    const columns: Column<Row>[] = [
      {
        key: 'id',
        name: 'ID',
        frozen: true
      },
      {
        key: 'task',
        name: 'Title',
        frozen: true
      },
      {
        key: 'priority',
        name: 'Priority',
        frozen: true
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        frozen: true
      },
      {
        key: 'complete',
        name: '% Complete'
      },
      {
        key: 'startDate',
        name: 'Start Date'
      },
      {
        key: 'completeDate',
        name: 'Expected Complete'
      },
      ...extraColumns
    ];

    const rows = createRows(extraColumns);
    return [columns, rows];
  }, []);

  const rowGetter = useCallback((i: number): Row => {
    return rows[i];
  }, [rows]);

  return (
    <Wrapper title="Frozen Columns Example">
      <div className="grid-autosizer-wrapper">
        <AutoSizer>
          {({ height, width }) => (
            <DataGrid<Row, 'id'>
              columns={columns}
              rowGetter={rowGetter}
              rowsCount={rows.length}
              minHeight={height}
              minWidth={width}
              headerRowHeight={27}
              rowHeight={18}
              minColumnWidth={60}
            />
          )}
        </AutoSizer>
      </div>
    </Wrapper>
  );
}
