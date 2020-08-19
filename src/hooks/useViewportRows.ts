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
  const [groupedRows, rowsCount] = useMemo(() => {
    if (groupBy.length === 0 || !rowGrouper) return [undefined, rawRows.length];

    const groupRows = (rows: readonly R[], [groupByKey, ...remainingGroupByKeys]: readonly string[], startIndex: number): [GroupByDictionary<R>, number] => {
      let groupRowsCount = 0;
      const groups: GroupByDictionary<R> = {};
      for (const [key, childRows] of Object.entries(rowGrouper(rows, groupByKey))) {
        // Recursively group each parent group
        const [childGroups, childRowsCount] = remainingGroupByKeys.length === 0
          ? [childRows, childRows.length]
          : groupRows(childRows, remainingGroupByKeys, startIndex + groupRowsCount + 1); // 1 for parent row
        groups[key] = { childRows, childGroups, startRowIndex: startIndex + groupRowsCount };
        groupRowsCount += childRowsCount + 1; // 1 for parent row
      }

      return [groups, groupRowsCount];
    };

    return groupRows(rawRows, groupBy, 0);
  }, [groupBy, rowGrouper, rawRows]);

  const rows = useMemo(() => {
    if (!groupedRows) return rawRows;

    const expandGroup = (rows: GroupByDictionary<R> | R[], parentKey: string | undefined, level: number): Array<GroupRow<R> | R> => {
      if (Array.isArray(rows)) return rows;
      const flattenedRows: Array<R | GroupRow<R>> = [];
      Object.keys(rows).forEach((key, posInSet, keys) => {
        const id = parentKey !== undefined ? `${parentKey}__${key}` : key;
        const isExpanded = expandedGroupIds?.has(id) ?? false;
        const { childRows, childGroups, startRowIndex } = rows[key];
        flattenedRows.push({
          id,
          key,
          isExpanded,
          childRows,
          level,
          posInSet,
          startRowIndex,
          setSize: keys.length,
          __isGroup: true
        });
        if (isExpanded) {
          flattenedRows.push(...expandGroup(childGroups, key, level + 1));
        }
      });

      return flattenedRows;
    };

    return expandGroup(groupedRows, undefined, 0);
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
    rowsCount
  };
}
