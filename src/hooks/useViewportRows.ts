import { useMemo } from 'react';
import { ceil, floor, max, min } from '../utils';
import type { GroupRow, GroupByDictionary, RowHeightArgs } from '../types';

const RENDER_BATCH_SIZE = 8;

interface ViewportRowsArgs<R> {
  rawRows: readonly R[];
  rowHeight: number | ((args: RowHeightArgs<R>) => number);
  clientHeight: number;
  scrollTop: number;
  groupBy: readonly string[];
  rowGrouper:
    | ((rows: readonly R[], columnKey: string) => Record<string, readonly R[]>)
    | undefined
    | null;
  expandedGroupIds: ReadonlySet<unknown> | undefined | null;
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
    if (groupBy.length === 0 || rowGrouper == null) return [undefined, rawRows.length];

    const groupRows = (
      rows: readonly R[],
      [groupByKey, ...remainingGroupByKeys]: readonly string[],
      startRowIndex: number
    ): [GroupByDictionary<R>, number] => {
      let groupRowsCount = 0;
      const groups: GroupByDictionary<R> = {};
      for (const [key, childRows] of Object.entries(rowGrouper(rows, groupByKey))) {
        // Recursively group each parent group
        const [childGroups, childRowsCount] =
          remainingGroupByKeys.length === 0
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
    const expandGroup = (
      rows: GroupByDictionary<R> | readonly R[],
      parentId: string | undefined,
      level: number
    ): void => {
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

  const { totalRowHeight, getRowTop, getRowHeight, findRowIdx } = useMemo(() => {
    if (typeof rowHeight === 'number') {
      return {
        totalRowHeight: rowHeight * rows.length,
        getRowTop: (rowIdx: number) => rowIdx * rowHeight,
        getRowHeight: () => rowHeight,
        findRowIdx: (offset: number) => floor(offset / rowHeight)
      };
    }

    let totalRowHeight = 0;
    // Calcule the height of all the rows upfront. This can cause performance issues
    // and we can consider using a similar approach as react-window
    // https://github.com/bvaughn/react-window/blob/master/src/VariableSizeList.js#L68
    const rowPositions = rows.map((row: R | GroupRow<R>) => {
      const currentRowHeight = isGroupRow(row)
        ? rowHeight({ type: 'GROUP', row })
        : rowHeight({ type: 'ROW', row });
      const position = { top: totalRowHeight, height: currentRowHeight };
      totalRowHeight += currentRowHeight;
      return position;
    });

    const validateRowIdx = (rowIdx: number) => {
      return max(0, min(rows.length - 1, rowIdx));
    };

    return {
      totalRowHeight,
      getRowTop: (rowIdx: number) => rowPositions[validateRowIdx(rowIdx)].top,
      getRowHeight: (rowIdx: number) => rowPositions[validateRowIdx(rowIdx)].height,
      findRowIdx(offset: number) {
        let start = 0;
        let end = rowPositions.length - 1;
        while (start <= end) {
          const middle = start + floor((end - start) / 2);
          const currentOffset = rowPositions[middle].top;

          if (currentOffset === offset) return middle;

          if (currentOffset < offset) {
            start = middle + 1;
          } else if (currentOffset > offset) {
            end = middle - 1;
          }

          if (start > end) return end;
        }
        return 0;
      }
    };
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
      getRowHeight,
      findRowIdx
    };
  }

  const overscanThreshold = 4;
  const rowVisibleStartIdx = findRowIdx(scrollTop);
  const rowVisibleEndIdx = min(rows.length - 1, findRowIdx(scrollTop + clientHeight));
  const rowOverscanStartIdx = max(
    0,
    floor((rowVisibleStartIdx - overscanThreshold) / RENDER_BATCH_SIZE) * RENDER_BATCH_SIZE
  );
  const rowOverscanEndIdx = min(
    rows.length - 1,
    ceil((rowVisibleEndIdx + overscanThreshold) / RENDER_BATCH_SIZE) * RENDER_BATCH_SIZE
  );

  return {
    rowOverscanStartIdx,
    rowOverscanEndIdx,
    rows,
    rowsCount,
    totalRowHeight,
    isGroupRow,
    getRowTop,
    getRowHeight,
    findRowIdx
  };
}
