import { useState } from 'react';

import DataGrid from '../../src';
import type { Column, CellNavigationMode } from '../../src';

interface Row {
  id: number;
  task: string;
  complete: number;
  priority: string;
  issueType: string;
  startDate: string;
  completeDate: string;
}

const columns: Column<Row>[] = [
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
  },
  {
    key: 'startDate',
    name: 'Start Date'
  },
  {
    key: 'completeDate',
    name: 'Expected Complete',
    width: 200
  }
];

function getRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

function createRows(): Row[] {
  const rows = [];
  for (let i = 1; i < 500; i++) {
    rows.push({
      id: i,
      task: `Task ${i}`,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
      issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
      startDate: getRandomDate(new Date(2015, 3, 1), new Date()),
      completeDate: getRandomDate(new Date(), new Date(2016, 0, 1))
    });
  }

  return rows;
}

export function CellNavigation() {
  const [rows] = useState(createRows);
  const [cellNavigatioMode, setCellNavigationMode] = useState<CellNavigationMode>('CHANGE_ROW');

  return (
    <>
      <div style={{ marginBottom: 5 }}>
        Cell Navigation Modes:
        <label>
          <input
            type="radio"
            name="mode"
            checked={cellNavigatioMode === 'NONE'}
            onChange={() => setCellNavigationMode('NONE')}
          />
          None
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            checked={cellNavigatioMode === 'CHANGE_ROW'}
            onChange={() => setCellNavigationMode('CHANGE_ROW')}
          />
          Change Row
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            checked={cellNavigatioMode === 'LOOP_OVER_ROW'}
            onChange={() => setCellNavigationMode('LOOP_OVER_ROW')}
          />
          Loop Over Row
        </label>
      </div>
      <DataGrid
        columns={columns}
        rows={rows}
        cellNavigationMode={cellNavigatioMode}
      />
    </>
  );
}

CellNavigation.storyName = 'Cell Navigation';
