import { useMemo } from 'react';

import { GroupRow, GroupByDictionary, Dictionary } from '../types';
import { getVerticalRangeToRender } from '../utils';

interface ViewportRowsArgs<R, SR> {
  rawRows: readonly R[];
  rowHeight: number;
  clientHeight: number;
  scrollTop: number;
  groupBy: readonly string[];
  rowGrouper?: (rows: readonly R[], columnKey: string) => Dictionary<R[]>;
  expandedGroupIds?: Set<unknown>;
}

export function useViewportRows<R, SR>({
  rawRows,
  rowHeight,
  clientHeight,
  scrollTop,
  groupBy,
  rowGrouper,
  expandedGroupIds
}: ViewportRowsArgs<R, SR>) {
  const groupedRows = useMemo(() => {
    if (groupBy.length === 0 || !rowGrouper) return;

    const groupRows = (rows: readonly R[], [groupByKey, ...remainingGroupByKeys]: readonly string[]) => {
      const parentGroup = rowGrouper(rows, groupByKey);
      if (remainingGroupByKeys.length === 0) return parentGroup;

      // Recursively group each parent group
      const childGroups: GroupByDictionary<R> = {};
      for (const key in parentGroup) {
        const childRows = parentGroup[key];
        childGroups[key] = {
          rows: childRows,
          groups: groupRows(childRows, remainingGroupByKeys)
        };
      }

      return childGroups;
    };

    return groupRows(rawRows, groupBy);
  }, [groupBy, rowGrouper, rawRows]);

  const [rows, totalRowCount] = useMemo(() => { // TODO: fix totalRowCount
    if (!groupedRows) return [rawRows, rawRows.length];

    const expandGroup = (rows: GroupByDictionary<R>, parentKey: string | undefined, level: number): Array<GroupRow<R> | R> => {
      const flattenedRows: Array<R | GroupRow<R>> = [];
      Object.keys(rows).forEach((key, index, keys) => {
        const id = parentKey !== undefined ? `${parentKey}__${key}` : key;
        const isExpanded = expandedGroupIds?.has(id) ?? false;
        const group = rows[key];
        flattenedRows.push({
          id,
          key,
          isExpanded,
          childRows: Array.isArray(group) ? group : group.rows,
          level,
          setSize: keys.length,
          posInSet: index + 1, // aria-posinset is 1-based
          __isGroup: true
        });
        if (isExpanded) {
          if (Array.isArray(group)) {
            flattenedRows.push(...group);
          } else {
            flattenedRows.push(...expandGroup(group.groups, key, level + 1));
          }
        }
      });

      return flattenedRows;
    };

    return [expandGroup(groupedRows, undefined, 1), 0]; // aria-level is 1-based
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
