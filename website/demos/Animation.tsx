import { useState } from 'react';
import { css } from '@linaria/core';

import DataGrid from '../../src';
import type { Column } from '../../src';
import type { Props } from './types';

const rangeClassname = css`
  width: 500px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;

  > input {
    flex-grow: 1;
  }
`;

const transitionClassname = css`
  transition: grid-template-rows 0.5s;
`;

interface Row {
  id: number;
  task: string;
  complete: number;
  priority: string;
  issueType: string;
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

const rows = createRows();

export default function ColumnsReordering({ direction }: Props) {
  const [rowHeight, setRowHeight] = useState(30);

  return (
    <>
      <label className={rangeClassname}>
        Row Height
        <input
          type="range"
          min="30"
          max="90"
          value={rowHeight}
          onChange={(event) => {
            setRowHeight(event.target.valueAsNumber);
          }}
        />
      </label>
      <DataGrid
        className={`${transitionClassname} fill-grid`}
        columns={columns}
        rows={rows}
        direction={direction}
        rowHeight={rowHeight}
      />
    </>
  );
}
