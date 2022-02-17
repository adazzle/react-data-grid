import { useState } from 'react';

import DataGrid from '../../src';
import type { Column } from '../../src';
import type { Props } from './types';

interface Row {
  id: number;
  task: string;
  complete: number;
  priority: string;
  issueType: string;
  startDate: string;
  completeDate: string;
}

type CellNavigationMode = 'NONE' | 'CHANGE_ROW' | 'LOOP_OVER_ROW' | 'LOOP_OVER_COLUMN';

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
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toLocaleDateString();
}

function createRows(): Row[] {
  const rows = [];
  for (let i = 1; i < 500; i++) {
    rows.push({
      id: i,
      task: `Task ${i}`,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor(Math.random() * 3 + 1)],
      issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor(Math.random() * 3 + 1)],
      startDate: getRandomDate(new Date(2015, 3, 1), new Date()),
      completeDate: getRandomDate(new Date(), new Date(2016, 0, 1))
    });
  }

  return rows;
}

export default function CellNavigation({ direction }: Props) {
  const [rows] = useState(createRows);
  const [cellNavigationMode, setCellNavigationMode] = useState<CellNavigationMode>('CHANGE_ROW');

  return (
    <>
      <div style={{ marginBlockEnd: 5 }}>
        Cell Navigation Modes:
        <label>
          <input
            type="radio"
            name="mode"
            checked={cellNavigationMode === 'NONE'}
            onChange={() => setCellNavigationMode('NONE')}
          />
          None
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            checked={cellNavigationMode === 'CHANGE_ROW'}
            onChange={() => setCellNavigationMode('CHANGE_ROW')}
          />
          Change Row
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            checked={cellNavigationMode === 'LOOP_OVER_ROW'}
            onChange={() => setCellNavigationMode('LOOP_OVER_ROW')}
          />
          Loop Over Row
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            checked={cellNavigationMode === 'LOOP_OVER_COLUMN'}
            onChange={() => setCellNavigationMode('LOOP_OVER_COLUMN')}
          />
          Loop Over Column
        </label>
      </div>
      <DataGrid
        columns={columns}
        rows={rows}
        direction={direction}
        onKeyDown={(args, event) => {
          if (args.type === 'SUMMARY' || (args.type === 'ROW' && args.mode === 'EDIT')) return;
          const { column, ...props } = args;
          const { key, shiftKey } = event;
          const loopOverNavigation = () => {
            if (
              (key === 'ArrowRight' || (key === 'Tab' && !shiftKey)) &&
              column.idx === columns.length - 1
            ) {
              const rowIdx = props.type === 'HEADER' ? -1 : rows.indexOf(props.row);
              props.selectCell({ rowIdx, idx: 0 });
              event.preventDefault();
            } else if ((key === 'ArrowLeft' || (key === 'Tab' && shiftKey)) && column.idx === 0) {
              const rowIdx = props.type === 'HEADER' ? -1 : rows.indexOf(props.row);
              props.selectCell({ rowIdx, idx: columns.length - 1 });
              event.preventDefault();
            }
          };

          const changeRowNavigation = () => {
            if (key === 'ArrowRight' && column.idx === columns.length - 1) {
              if (rows.length === 0) return;
              let rowIdx: number;
              if (props.type === 'HEADER') {
                rowIdx = 0;
              } else {
                if (props.row === rows[rows.length - 1]) return;
                rowIdx = rows.indexOf(props.row) + 1;
              }
              props.selectCell({ rowIdx, idx: 0 });
              event.preventDefault();
            } else if (key === 'ArrowLeft' && column.idx === 0) {
              if (props.type === 'HEADER') return;
              props.selectCell({ rowIdx: rows.indexOf(props.row) - 1, idx: columns.length - 1 });
              event.preventDefault();
            }
          };

          const loopOverColumnNavigation = () => {
            let rowIdx: number;
            if (props.type === 'HEADER') {
              rowIdx = shiftKey ? rows.length - 1 : 0;
            } else {
              const { row } = props;
              rowIdx = shiftKey
                ? row === rows[0]
                  ? -1
                  : rows.indexOf(row) - 1
                : row === rows[rows.length - 1]
                ? -1
                : rows.indexOf(row) + 1;
            }
            props.selectCell({ rowIdx, idx: column.idx });
            event.preventDefault();
          };

          if (cellNavigationMode === 'LOOP_OVER_ROW') {
            loopOverNavigation();
          } else if (cellNavigationMode === 'CHANGE_ROW') {
            changeRowNavigation();
          } else if (cellNavigationMode === 'LOOP_OVER_COLUMN' && key === 'Tab') {
            loopOverColumnNavigation();
          }
        }}
      />
    </>
  );
}
