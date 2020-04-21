/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from 'react';
import groupBy from 'lodash/groupBy';

import { GroupRowRenderer, RowData, RowExpandToggleEvent } from './components/RowRenderers';
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

function groupByColumn(rows: Row[], columnKeys: string[], expandedGroups: Set<string>, treeDepth = 0, parentKey = '') {
  if (columnKeys.length === 0) return rows;
  const gridRows: any = [];
  const [columnKey, ...remainingColumnKeys] = columnKeys;
  const groupedRows = groupBy(rows, columnKey);
  const groupedKeys = Object.keys(groupedRows);
  for (const key of groupedKeys) {
    const groupKey = parentKey ? `${parentKey}_${key}` : key;
    const isExpanded = expandedGroups.has(groupKey);
    const rowGroupHeader = {
      groupKey,
      name: key,
      __metaData: {
        isGroup: true,
        treeDepth,
        isExpanded,
        columnGroupName: groupByColumn,
        columnGroupDisplayName: columns.find(c => c.key === columnKey)!.name
      }
    };
    gridRows.push(rowGroupHeader);
    if (isExpanded) {
      gridRows.push(...groupByColumn(groupedRows[key], remainingColumnKeys, expandedGroups, treeDepth + 1, key));
    }
  }

  return gridRows;
}

export default function LegacyGrouping() {
  const [rows] = useState(createRows);
  const [groupByColumns] = useState(['priority', 'issueType']);
  const [expandedGroups, setExpandedGroups] = useState(new Set(['Low', 'Low_Epic']));

  const gridRows = useMemo(() => {
    return groupByColumn(rows, groupByColumns, expandedGroups);
  }, [rows, groupByColumns, expandedGroups]);

  function onRowExpandToggle({ groupKey }: RowExpandToggleEvent) {
    const newExpandedGroups = new Set(expandedGroups);
    if (newExpandedGroups.has(groupKey)) {
      newExpandedGroups.delete(groupKey);
    } else {
      newExpandedGroups.add(groupKey);
    }
    setExpandedGroups(newExpandedGroups);
  }

  return (
    <DataGrid
      columns={columns}
      rows={gridRows}
      height={650}
      rowRenderer={p => <GroupRowRenderer {...p} onRowExpandToggle={onRowExpandToggle} />}
    />
  );
}
