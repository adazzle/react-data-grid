import { useMemo, useState } from 'react';
import { groupBy as lodashGroupBy, Dictionary } from 'lodash';

import { GroupedRow, GroupByDictionary } from '../types';

interface CalculatedRowsArgs<R, SR> {
  rawRows: readonly R[];
  groupBy?: readonly string[];
}

export function useViewportRows<R, SR>({ rawRows, groupBy }: CalculatedRowsArgs<R, SR>) {
  const [expandedGroupIds, setExpandedGroupIds] = useState<Set<string>>(new Set());

  const groupedRows = useMemo(() => {
    if (!groupBy || groupBy.length === 0) return;

    function groupParent(rows: readonly R[], [groupByKey, ...remainingGroupByKeys]: readonly string[]) {
      const parentGroup = lodashGroupBy(rows, groupByKey);
      if (remainingGroupByKeys.length === 0) return parentGroup;
      const childGroups: Dictionary<GroupByDictionary<R>> = {};
      for (const key in parentGroup) {
        childGroups[key] = groupParent(parentGroup[key], remainingGroupByKeys);
      }

      return childGroups;
    }

    return groupParent(rawRows, groupBy);
  }, [groupBy, rawRows]);

  const [calculatedRows, totalRowCount] = useMemo(() => {
    if (!groupedRows) return [rawRows, rawRows.length];

    function expandGroup(groupedRows: GroupByDictionary<R>, level: number): Array<GroupedRow | R> {
      const flattenedRows: Array<R | GroupedRow> = [];
      for (const key in groupedRows) {
        const isExpanded = expandedGroupIds.has(key);
        flattenedRows.push({ key, __isGroup: true, level, isExpanded });
        if (isExpanded) {
          const groupedRow = groupedRows[key];
          if (Array.isArray(groupedRow)) {
            flattenedRows.push(...groupedRow);
          } else {
            flattenedRows.push(...expandGroup(groupedRow, level + 1));
          }
        }
      }

      return flattenedRows;
    }
    return [expandGroup(groupedRows, 0), 0];
  }, [expandedGroupIds, groupedRows, rawRows]);

  function toggleGroup(key: string) {
    const newExpandedGroupIds = new Set(expandedGroupIds);
    if (expandedGroupIds.has(key)) {
      newExpandedGroupIds.delete(key);
    } else {
      newExpandedGroupIds.add(key);
    }
    setExpandedGroupIds(newExpandedGroupIds);
  }

  return { calculatedRows, totalRowCount, toggleGroup };
}
