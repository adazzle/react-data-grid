import React, { useState, useMemo } from 'react';
import { groupBy } from 'lodash';

import DataGrid, { Column, Row, RowRendererProps } from '../../src';
import './LegacyGrouping.less';

interface RowGroupMetaData {
  groupId: string;
  groupKey: string;
  treeDepth: number;
  isExpanded: boolean;
  columnGroupName: string;
}

interface RowGroup {
  __metaData: RowGroupMetaData;
}

interface RowData {
  id: number;
  task: string;
  complete: number;
  priority: string;
  issueType: string;
}

type GridRow = RowGroup | RowData;

interface GroupRowRendererProps extends RowRendererProps<GridRow> {
  onRowExpandToggle: (groupId: string) => void;
}

const columns: Column<GridRow>[] = [
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

const groups = ['priority', 'issueType'];

function createRows(): GridRow[] {
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

function groupByColumn(rows: GridRow[], columnKeys: string[], expandedGroups: Set<string>, treeDepth = 0, parentId = '') {
  if (columnKeys.length === 0) return rows;
  const gridRows: GridRow[] = [];
  const [columnKey, ...remainingColumnKeys] = columnKeys;
  const groupedRows = groupBy(rows, columnKey);
  const groupedKeys = Object.keys(groupedRows);

  for (const groupKey of groupedKeys) {
    const groupId = parentId ? `${parentId}_${groupKey}` : groupKey;
    const isExpanded = expandedGroups.has(groupId);
    const rowGroupHeader: GridRow = {
      __metaData: {
        groupId,
        groupKey,
        treeDepth,
        isExpanded,
        columnGroupName: columns.find(c => c.key === columnKey)!.name
      }
    };
    gridRows.push(rowGroupHeader);
    if (isExpanded) {
      gridRows.push(...groupByColumn(groupedRows[groupKey], remainingColumnKeys, expandedGroups, treeDepth + 1, groupId));
    }
  }

  return gridRows;
}

function isRowGroup(row: GridRow): row is RowGroup {
  return typeof (row as RowGroup).__metaData !== 'undefined';
}

function GroupRowRenderer({ onRowExpandToggle, ...props }: GroupRowRendererProps) {
  if (!isRowGroup(props.row)) {
    return <Row {...props} />;
  }

  const { groupKey, isExpanded, treeDepth, columnGroupName, groupId } = props.row.__metaData;
  return (
    <div
      className="rdg-row-default-group"
      tabIndex={0}
    >
      <span
        className="rdg-row-expand-icon"
        style={{ marginLeft: treeDepth * 20 }}
        onClick={() => onRowExpandToggle(groupId)}
      >
        {isExpanded ? String.fromCharCode(9660) : String.fromCharCode(9658)}
      </span>
      <strong>{' '}{columnGroupName}: {groupKey}</strong>
    </div>
  );
}

export default function LegacyGrouping() {
  const [rows] = useState(createRows);
  const [expandedGroups, setExpandedGroups] = useState(() => new Set(['Low', 'Low_Epic']));

  const gridRows = useMemo(() => {
    return groupByColumn(rows, groups, expandedGroups);
  }, [rows, expandedGroups]);

  function onRowExpandToggle(groupId: string) {
    const newExpandedGroups = new Set(expandedGroups);
    if (newExpandedGroups.has(groupId)) {
      newExpandedGroups.delete(groupId);
    } else {
      newExpandedGroups.add(groupId);
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
