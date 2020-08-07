import { useMemo } from 'react';
import { groupBy as lodashGroupBy, Dictionary } from 'lodash';

import { GroupRow, GroupByDictionary } from '../types';
import { getVerticalRangeToRender } from '../utils';

interface ViewportRowsArgs<R, SR> {
  rawRows: readonly R[];
  rowHeight: number;
  clientHeight: number;
  scrollTop: number;
  groupBy?: readonly string[];
  expandedGroupIds?: Set<unknown>;
}

export function useViewportRows<R, SR>({
  rawRows,
  rowHeight,
  clientHeight,
  scrollTop,
  groupBy,
  expandedGroupIds
}: ViewportRowsArgs<R, SR>) {
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

  const [rows, totalRowCount] = useMemo(() => {
    if (!groupedRows) return [rawRows, rawRows.length];

    function expandGroup(rows: GroupByDictionary<R>, level: number): Array<GroupRow | R> {
      const flattenedRows: Array<R | GroupRow> = [];
      for (const key in rows) {
        const isExpanded = expandedGroupIds?.has(key) ?? false;
        flattenedRows.push({ key, __isGroup: true, level, isExpanded });
        if (isExpanded) {
          const groupedRow = rows[key];
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

  const [rowOverscanStartIdx, rowOverscanEndIdx] = getVerticalRangeToRender(
    clientHeight,
    rowHeight,
    scrollTop,
    rows.length
  );

  const viewportRows = rows.slice(rowOverscanStartIdx, rowOverscanEndIdx + 1);

  return {
    viewportRows,
    rows,
    startRowIdx: rowOverscanStartIdx,
    totalRowCount
  };
}
