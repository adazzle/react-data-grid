import { useMemo } from 'react';
import type { GroupRow, GroupByDictionary, RowHeightArgs } from '../types';

const RENDER_BACTCH_SIZE = 8;

interface ViewportRowsArgs<R> {
  rawRows: readonly R[];
  rowHeight: number | ((args: RowHeightArgs<R>) => number);
  clientHeight: number;
  scrollTop: number;
  groupBy: readonly string[];
  rowGrouper?: (rows: readonly R[], columnKey: string) => Record<string, readonly R[]>;
  expandedGroupIds?: ReadonlySet<unknown>;
  enableVirtualization: boolean;
}

// https://github.com/microsoft/TypeScript/issues/41808
function isReadonlyArray(arr: unknown): arr is readonly unknown[] {
  return Array.isArray(arr);
}

export function useViewportRows<R>({
  rawRows,
  rowHeight,
  clientHeight,
  scrollTop,
  groupBy,
  rowGrouper,
  expandedGroupIds,
  enableVirtualization
}: ViewportRowsArgs<R>) {
  const [groupedRows, rowsCount] = useMemo(() => {
    if (groupBy.length === 0 || !rowGrouper) return [undefined, rawRows.length];

    const groupRows = (rows: readonly R[], [groupByKey, ...remainingGroupByKeys]: readonly string[], startRowIndex: number): [GroupByDictionary<R>, number] => {
      let groupRowsCount = 0;
      const groups: GroupByDictionary<R> = {};
      for (const [key, childRows] of Object.entries(rowGrouper(rows, groupByKey))) {
        // Recursively group each parent group
        const [childGroups, childRowsCount] = remainingGroupByKeys.length === 0
          ? [childRows, childRows.length]
          : groupRows(childRows, remainingGroupByKeys, startRowIndex + groupRowsCount + 1); // 1 for parent row
        groups[key] = { childRows, childGroups, startRowIndex: startRowIndex + groupRowsCount };
        groupRowsCount += childRowsCount + 1; // 1 for parent row
      }

      return [groups, groupRowsCount];
    };

    return groupRows(rawRows, groupBy, 0);
  }, [groupBy, rowGrouper, rawRows]);

  const [rows, isGroupRow] = useMemo(() => {
    const allGroupRows = new Set<unknown>();
    if (!groupedRows) return [rawRows, isGroupRow];

    const flattenedRows: Array<R | GroupRow<R>> = [];
    const expandGroup = (rows: GroupByDictionary<R> | readonly R[], parentId: string | undefined, level: number): void => {
      if (isReadonlyArray(rows)) {
        flattenedRows.push(...rows);
        return;
      }
      Object.keys(rows).forEach((groupKey, posInSet, keys) => {
        // TODO: should users have control over the generated key?
        const id = parentId !== undefined ? `${parentId}__${groupKey}` : groupKey;
        const isExpanded = expandedGroupIds?.has(id) ?? false;
        const { childRows, childGroups, startRowIndex } = rows[groupKey];

        const groupRow: GroupRow<R> = {
          id,
          parentId,
          groupKey,
          isExpanded,
          childRows,
          level,
          posInSet,
          startRowIndex,
          setSize: keys.length
        };
        flattenedRows.push(groupRow);
        allGroupRows.add(groupRow);

        if (isExpanded) {
          expandGroup(childGroups, id, level + 1);
        }
      });
    };

    expandGroup(groupedRows, undefined, 0);
    return [flattenedRows, isGroupRow];

    function isGroupRow(row: R | GroupRow<R>): row is GroupRow<R> {
      return allGroupRows.has(row);
    }
  }, [expandedGroupIds, groupedRows, rawRows]);

  const { getRowTop, getRowHeight, totalRowHeight, rowOffsets } = useMemo(() => {
    const rowOffsets: number[] = [];
    if (typeof rowHeight === 'number') {
      const getRowTop = (rowIdx: number) => rowIdx * rowHeight;
      const getRowHeight = () => rowHeight;
      return { getRowTop, getRowHeight, totalRowHeight: rowHeight * rows.length, rowOffsets };
    }

    const rowHeights = new Map<number, number>();
    const rowTopMap = new Map<number, number>();
    let totalRowHeight = 0;
    rows.forEach((row: R | GroupRow<R>, rowIdx: number) => {
      const currentRowHeight = isGroupRow(row)
        ? rowHeight({ type: 'GROUP', row })
        : rowHeight({ type: 'ROW', row });

      rowTopMap.set(rowIdx, totalRowHeight);
      totalRowHeight += currentRowHeight;
      rowHeights.set(rowIdx, currentRowHeight);
      rowOffsets.push(totalRowHeight);
    });

    const getRowTop = (rowIdx: number): number => {
      return rowIdx >= rows.length ? rowTopMap.get(rows.length - 1)! : rowTopMap.get(rowIdx)!;
    };

    const getRowHeight = (rowIdx: number): number => {
      return rowHeights.get(rowIdx)!;
    };

    return { getRowTop, getRowHeight, totalRowHeight, rowOffsets };
  }, [isGroupRow, rowHeight, rows]);

  if (!enableVirtualization) {
    return {
      rowOverscanStartIdx: 0,
      rowOverscanEndIdx: rows.length - 1,
      rows,
      rowsCount,
      totalRowHeight,
      isGroupRow,
      getRowTop,
      getRowHeight
    };
  }

  const overscanThreshold = 4;
  let rowVisibleStartIdx: number;
  let rowVisibleEndIdx: number;
  if (typeof rowHeight === 'number') {
    rowVisibleStartIdx = Math.floor(scrollTop / rowHeight);
    rowVisibleEndIdx = Math.min(rows.length - 1, Math.floor((scrollTop + clientHeight) / rowHeight));
  } else {
    const findRowIdx = (offset: number): number => {
      let start = 0;
      let end = rowOffsets.length - 1;
      while (start <= end) {
        const middle = start + Math.floor((end - start) / 2);
        const currentOffset = rowOffsets[middle];

        if (currentOffset === offset) return middle;

        if (currentOffset < offset) {
          start = middle + 1;
        } else if (currentOffset > offset) {
          end = middle - 1;
        }

        if (start > end) return end;
      }
      return 0;
    };

    rowVisibleStartIdx = findRowIdx(scrollTop);
    rowVisibleEndIdx = Math.min(rows.length - 1, findRowIdx(scrollTop + clientHeight));
  }
  const rowOverscanStartIdx = Math.max(0, Math.floor((rowVisibleStartIdx - overscanThreshold) / RENDER_BACTCH_SIZE) * RENDER_BACTCH_SIZE);
  const rowOverscanEndIdx = Math.min(rows.length - 1, Math.ceil((rowVisibleEndIdx + overscanThreshold) / RENDER_BACTCH_SIZE) * RENDER_BACTCH_SIZE);

  return {
    rowOverscanStartIdx,
    rowOverscanEndIdx,
    rows,
    rowsCount,
    totalRowHeight,
    isGroupRow,
    getRowTop,
    getRowHeight
  };
}
