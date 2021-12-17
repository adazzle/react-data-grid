import { forwardRef, useMemo, useRef } from 'react';
import type { Key, RefAttributes } from 'react';

import DataGrid from './DataGrid';
import type { DataGridProps, DataGridHandle } from './DataGrid';
import Row from './Row';
import GroupRowRenderer from './GroupRow';
import type {
  CalculatedColumn,
  Column,
  RowRendererProps,
  RowsChangeData,
  PasteEvent,
  RowHeightArgs,
  Maybe,
  GroupRow,
  Omit,
  GroupRowHeightArgs
} from './types';
import { ToggleGroupFormatter } from '.';
import type { GroupApi } from './hooks';
import { useCombinedRefs, useLatestFunc, useGroupApi, GroupApiProvider } from './hooks';

export interface TreeDataGridProps<R, SR = unknown, K extends Key = Key>
  extends Pick<DataGridProps<R | GroupRow<R>, SR, K>, 'defaultColumnOptions' | 'rowRenderer'>,
    Omit<DataGridProps<R, SR, K>, 'defaultColumnOptions' | 'rowRenderer' | 'onFill'> {
  rowHeight?: Maybe<number | ((args: GroupRowHeightArgs<R>) => number)>;
  groupBy: readonly string[];
  rowGrouper: (rows: readonly R[], columnKey: string) => Record<string, readonly R[]>;
  expandedGroupIds: ReadonlySet<unknown>;
  onExpandedGroupIdsChange: (expandedGroupIds: Set<unknown>) => void;
}

type GroupByDictionary<TRow> = Record<
  string,
  {
    readonly childRows: readonly TRow[];
    readonly childGroups: readonly TRow[] | Readonly<GroupByDictionary<TRow>>;
    readonly startRowIndex: number;
  }
>;

function TreeDataGrid<R, SR, K extends Key>(
  {
    columns: rawColumns,
    rows: rawRows,
    rowKeyGetter: rawRowKeyGetter,
    rowHeight: rawRowHeight,
    rowClass: rawRowClass,
    onRowsChange: rawOnRowsChange,
    onRowClick: rawOnRowClick,
    onRowDoubleClick: rawOnRowDoubleClick,
    onPaste: rawOnPaste,
    onSelectedRowsChange: rawOnSelectedRowsChange,
    groupBy: rawGroupBy,
    rowGrouper,
    expandedGroupIds,
    onExpandedGroupIdsChange,
    ...props
  }: TreeDataGridProps<R, SR, K>,
  ref: React.Ref<DataGridHandle>
) {
  // const startRowIndex = 0;
  const gridRef = useRef<DataGridHandle>(null);
  const { columns, groupBy } = useMemo(() => {
    const groupBy: string[] = [];
    const columns: Column<R | GroupRow<R>, SR>[] = [];
    for (const rawColumn of rawColumns) {
      const rowGroup = rawGroupBy.includes(rawColumn.key);

      if (rowGroup) {
        groupBy.push(rawColumn.key);
      }

      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      const frozen = rowGroup || rawColumn.frozen || false;

      columns.push({
        ...rawColumn,
        frozen,
        rowGroup,
        // cellClass() {},
        groupFormatter: rowGroup
          ? rawColumn.groupFormatter ?? ToggleGroupFormatter
          : rawColumn.groupFormatter
      });
    }

    return { columns, groupBy };
  }, [rawColumns, rawGroupBy]);

  const [groupedRows, rowsCount] = useMemo(() => {
    const groupRows = (
      rows: readonly R[],
      [groupByKey, ...remainingGroupByKeys]: readonly string[],
      startRowIndex: number
    ): [Readonly<GroupByDictionary<R>>, number] => {
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

  const [rows, isGroupRow] = useMemo((): [
    ReadonlyArray<R | GroupRow<R>>,
    (row: R | GroupRow<R>) => row is GroupRow<R>
  ] => {
    const allGroupRows = new Set<unknown>();

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
        const isExpanded = expandedGroupIds.has(id);
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
  }, [expandedGroupIds, groupedRows]);

  const rowHeight = useMemo(() => {
    if (typeof rawRowHeight === 'function') {
      return ({ row, type }: RowHeightArgs<R | GroupRow<R>>): number => {
        if (isGroupRow(row)) {
          return rawRowHeight({ type: 'GROUP', row });
        }
        return rawRowHeight({ row, type });
      };
    }

    return rawRowHeight;
  }, [isGroupRow, rawRowHeight]);

  const rowKeyGetter = useMemo(() => {
    if (typeof rawRowKeyGetter === 'function') {
      return (row: R | GroupRow<R>): K | string => {
        if (isGroupRow(row)) {
          return row.id;
        }
        return rawRowKeyGetter(row);
      };
    }

    return rawRowKeyGetter;
  }, [isGroupRow, rawRowKeyGetter]);

  const rowClass = useMemo(() => {
    if (typeof rawRowClass === 'function') {
      return (row: R | GroupRow<R>) => {
        if (isGroupRow(row)) {
          throw new Error('rowClass is not supported on a group row');
        }
        return rawRowClass(row);
      };
    }

    return rawRowClass;
  }, [isGroupRow, rawRowClass]);

  const onRowClick = useMemo(() => {
    if (typeof rawOnRowClick === 'function') {
      return (row: R | GroupRow<R>, column: CalculatedColumn<R | GroupRow<R>, SR>) => {
        if (isGroupRow(row)) {
          throw new Error('onRowClick is not supported on a group row');
        }
        rawOnRowClick(row, column as CalculatedColumn<R, SR>);
      };
    }

    return rawOnRowClick;
  }, [isGroupRow, rawOnRowClick]);

  const onRowDoubleClick = useMemo(() => {
    if (typeof rawOnRowDoubleClick === 'function') {
      return (row: R | GroupRow<R>, column: CalculatedColumn<R | GroupRow<R>, SR>) => {
        if (isGroupRow(row)) {
          throw new Error('onRowDoubleClick is not supported on a group row');
        }
        rawOnRowDoubleClick(row, column as CalculatedColumn<R, SR>);
      };
    }

    return rawOnRowDoubleClick;
  }, [isGroupRow, rawOnRowDoubleClick]);

  const onSelectedRowsChange = useMemo(() => {
    if (typeof rawOnSelectedRowsChange === 'function') {
      return (selectedRows: Set<K>) => {
        rawOnSelectedRowsChange(selectedRows);
      };
    }

    return rawOnSelectedRowsChange;
  }, [rawOnSelectedRowsChange]);

  const onPaste = useMemo(() => {
    if (typeof rawOnPaste === 'function') {
      return ({ sourceRow, targetRow, ...rest }: PasteEvent<R | GroupRow<R>>) => {
        if (isGroupRow(sourceRow) || isGroupRow(targetRow)) {
          throw new Error('onPaste is not supported on a group row');
        }
        return rawOnPaste({ sourceRow, targetRow, ...rest });
      };
    }

    return rawOnPaste;
  }, [isGroupRow, rawOnPaste]);

  const onRowsChange =
    typeof rawOnRowsChange === 'function'
      ? (rows: (R | GroupRow<R>)[], { indexes, column }: RowsChangeData<R | GroupRow<R>, SR>) => {
          const rawIndexes = indexes.map((index) => rawRows.indexOf(rows[index] as R));
          rawOnRowsChange(rows as R[], {
            indexes: rawIndexes,
            column: column as CalculatedColumn<R, SR>
          });
        }
      : rawOnRowsChange;

  const toggleGroupLatest = useLatestFunc(toggleGroup);

  const value = useMemo(
    (): GroupApi<R> => ({
      isGroupRow,
      toggleGroup: toggleGroupLatest,
      selectGroup(rowIdx: number) {
        gridRef.current!.selectCell({ rowIdx, idx: -1 });
      }
    }),
    [isGroupRow, toggleGroupLatest]
  );

  function toggleGroup(expandedGroupId: unknown) {
    const newExpandedGroupIds = new Set(expandedGroupIds);
    if (newExpandedGroupIds.has(expandedGroupId)) {
      newExpandedGroupIds.delete(expandedGroupId);
    } else {
      newExpandedGroupIds.add(expandedGroupId);
    }
    onExpandedGroupIdsChange(newExpandedGroupIds);
  }

  return (
    <GroupApiProvider value={value}>
      <DataGrid<R | GroupRow<R>, SR, K | string>
        role="treegrid"
        aria-rowcount={rowsCount}
        ref={useCombinedRefs(ref, gridRef)}
        columns={columns}
        rows={rows}
        rowHeight={rowHeight}
        rowKeyGetter={rowKeyGetter}
        rowClass={rowClass}
        onRowsChange={onRowsChange}
        onRowClick={onRowClick}
        onRowDoubleClick={onRowDoubleClick}
        onSelectedRowsChange={onSelectedRowsChange}
        onPaste={onPaste}
        rowRenderer={RowRenderer}
        {...props}
      />
    </GroupApiProvider>
  );
}

function RowRenderer<R, SR>({ row, ...props }: RowRendererProps<R | GroupRow<R>, SR>) {
  const { isGroupRow, toggleGroup, selectGroup } = useGroupApi<R>()!;

  if (isGroupRow(row)) {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (
        isGroupRow(row) &&
        props.selectedCellIdx === -1 &&
        // Collapse the current group row if it is focused and is in expanded state
        ((event.key === 'ArrowLeft' && row.isExpanded) ||
          // Expand the current group row if it is focused and is in collapsed state
          (event.key === 'ArrowRight' && !row.isExpanded))
      ) {
        event.preventDefault(); // Prevents scrolling
        toggleGroup(row.id);
      }
    };

    return (
      <GroupRowRenderer
        aria-level={row.level + 1} // aria-level is 1-based
        aria-setsize={row.setSize}
        aria-posinset={row.posInSet + 1} // aria-posinset is 1-based
        aria-rowindex={props['aria-rowindex']}
        aria-selected={props['aria-selected']}
        key={row.id}
        id={row.id}
        groupKey={row.groupKey}
        viewportColumns={props.viewportColumns}
        childRows={row.childRows}
        rowIdx={props.rowIdx}
        row={row}
        top={props.top}
        height={props.height}
        level={row.level}
        isExpanded={row.isExpanded}
        selectedCellIdx={props.selectedCellIdx}
        isRowSelected={props.isRowSelected}
        selectGroup={selectGroup}
        toggleGroup={toggleGroup}
        onKeyDown={handleKeyDown}
      />
    );
  }
  return <Row row={row} {...props} />;
}

// TODO: https://github.com/microsoft/TypeScript/issues/41808
function isReadonlyArray(arr: unknown): arr is readonly unknown[] {
  return Array.isArray(arr);
}

export default forwardRef(TreeDataGrid) as <R, SR = unknown, K extends Key = Key>(
  props: TreeDataGridProps<R, SR, K> & RefAttributes<DataGridHandle>
) => JSX.Element;
