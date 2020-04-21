/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from 'react';
import groupBy from 'lodash/groupBy';

import { GroupRowRenderer, RowData } from './components/RowRenderers';
import DataGrid, { Column } from '../../src';

interface Row extends RowData<Row, unknown> {
  id: number;
  task: string;
  complete: number;
  priority: string;
  issueType: string;
}

const columns: Column<any>[] = [
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
  }
];

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

export default function LegacyGrouping() {
  const [rows] = useState(createRows);
  const [groupByFields] = useState(['priority']);

  const groupedRows = useMemo(() => {
    const groupedRows = groupBy(rows, groupByFields[0]);
    const groupedFields = Object.keys(groupedRows);

    const dataviewRows = [];
    for (const field of groupedFields) {
      const rowGroupHeader = { name: field, __metaData: { isGroup: true, treeDepth: 0, isExpanded: false, columnGroupName: groupByFields[0], columnGroupDisplayName: groupByFields[0] } };
      dataviewRows.push(rowGroupHeader);
    }

    return dataviewRows;
  }, [rows, groupByFields]);

  return (
    <DataGrid
      columns={columns}
      rows={groupedRows}
      height={650}
      rowRenderer={GroupRowRenderer}
    />
  );
}
