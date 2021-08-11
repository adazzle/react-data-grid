import {
  forwardRef,
  useState,
  useRef,
  useLayoutEffect,
  useImperativeHandle,
  useCallback,
  useMemo
} from 'react';
import type { Key, RefAttributes } from 'react';
import clsx from 'clsx';

import { rootClassname, viewportDraggingClassname, focusSinkClassname } from './style';
import {
  useGridDimensions,
  useCalculatedColumns,
  useViewportColumns,
  useViewportRows,
  useLatestFunc,
  RowSelectionChangeProvider
} from './hooks';
import HeaderRow from './HeaderRow';
import Row from './Row';
import GroupRowRenderer from './GroupRow';
import SummaryRow from './SummaryRow';
import EditCell from './EditCell';
import DragHandle from './DragHandle';
import {
  assertIsValidKeyGetter,
  onEditorNavigation,
  getNextSelectedCellPosition,
  isSelectedCellEditable,
  canExitGrid,
  isCtrlKeyHeldDown,
  isDefaultCellInput,
  getColSpan,
  max,
  sign,
  getSelectedCellColSpan
} from './utils';

import type {
  CalculatedColumn,
  Column,
  Position,
  RowRendererProps,
  RowsChangeData,
  SelectRowEvent,
  FillEvent,
  PasteEvent,
  CellNavigationMode,
  SortColumn,
  RowHeightArgs
} from './types';

export interface SelectCellState extends Position {
  readonly mode: 'SELECT';
}

interface EditCellState<R> extends Position {
  readonly mode: 'EDIT';
  readonly row: R;
  readonly originalRow: R;
  readonly key: string | null;
}

type DefaultColumnOptions<R, SR> = Pick<
  Column<R, SR>,
  'formatter' | 'minWidth' | 'resizable' | 'sortable'
>;

type SelectedCellProps<R, SR> =
  | Pick<
      RowRendererProps<R, SR>,
      'selectedCellIdx' | 'onKeyDown' | 'onFocus' | 'selectedCellEditor'
    >
  | Pick<
      RowRendererProps<R, SR>,
      'selectedCellIdx' | 'onKeyDown' | 'onFocus' | 'selectedCellDragHandle'
    >;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const body = globalThis.document?.body;

const initialPosition: SelectCellState = {
  idx: -1,
  rowIdx: -1,
  mode: 'SELECT'
};

export interface DataGridHandle {
  element: HTMLDivElement | null;
  scrollToColumn: (colIdx: number) => void;
  scrollToRow: (rowIdx: number) => void;
  selectCell: (position: Position, enableEditor?: boolean | null) => void;
}

type SharedDivProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  'aria-label' | 'aria-labelledby' | 'aria-describedby' | 'className' | 'style'
>;

export interface DataGridProps<R, SR = unknown, K extends Key = Key> extends SharedDivProps {
  /**
   * Grid and data Props
   */
  /** An array of objects representing each column on the grid */
  columns: readonly Column<R, SR>[];
  /** A function called for each rendered row that should return a plain key/value pair object */
  rows: readonly R[];
  /**
   * Rows to be pinned at the bottom of the rows view for summary, the vertical scroll bar will not scroll these rows.
   * Bottom horizontal scroll bar can move the row left / right. Or a customized row renderer can be used to disabled the scrolling support.
   */
  summaryRows?: readonly SR[] | null;
  /** The getter should return a unique key for each row */
  rowKeyGetter?: ((row: R) => K) | null;
  onRowsChange?: ((rows: R[], data: RowsChangeData<R, SR>) => void) | null;

  /**
   * Dimensions props
   */
  /** The height of each row in pixels */
  rowHeight?: number | ((args: RowHeightArgs<R>) => number) | null;
  /** The height of the header row in pixels */
  headerRowHeight?: number | null;
  /** The height of each summary row in pixels */
  summaryRowHeight?: number | null;

  /**
   * Feature props
   */
  /** Set of selected row keys */
  selectedRows?: ReadonlySet<K> | null;
  /** Function called whenever row selection is changed */
  onSelectedRowsChange?: ((selectedRows: Set<K>) => void) | null;
  /**Used for multi column sorting */
  sortColumns?: readonly SortColumn[] | null;
  onSortColumnsChange?: ((sortColumns: SortColumn[]) => void) | null;
  defaultColumnOptions?: DefaultColumnOptions<R, SR> | null;
  groupBy?: readonly string[] | null;
  rowGrouper?: ((rows: readonly R[], columnKey: string) => Record<string, readonly R[]>) | null;
  expandedGroupIds?: ReadonlySet<unknown> | null;
  onExpandedGroupIdsChange?: ((expandedGroupIds: Set<unknown>) => void) | null;
  onFill?: ((event: FillEvent<R>) => R) | null;
  onPaste?: ((event: PasteEvent<R>) => R) | null;

  /**
   * Custom renderers
   */
  rowRenderer?: React.ComponentType<RowRendererProps<R, SR>> | null;
  emptyRowsRenderer?: React.ComponentType | null;

  /**
   * Event props
   */
  /** Function called whenever a row is clicked */
  onRowClick?: ((row: R, column: CalculatedColumn<R, SR>) => void) | null;
  /** Function called whenever a row is double clicked */
  onRowDoubleClick?: ((row: R, column: CalculatedColumn<R, SR>) => void) | null;
  /** Called when the grid is scrolled */
  onScroll?: ((event: React.UIEvent<HTMLDivElement>) => void) | null;
  /** Called when a column is resized */
  onColumnResize?: ((idx: number, width: number) => void) | null;
  /** Function called whenever selected cell is changed */
  onSelectedCellChange?: ((position: Position) => void) | null;

  /**
   * Toggles and modes
   */
  cellNavigationMode?: CellNavigationMode | null;
  enableVirtualization?: boolean | null;

  /**
   * Miscellaneous
   */
  /** The node where the editor portal should mount. */
  editorPortalTarget?: Element | null;
  rowClass?: ((row: R) => string | undefined | null) | null;
}

/**
 * Main API Component to render a data grid of rows and columns
 *
 * @example
 *
 * <DataGrid columns={columns} rows={rows} />
 */
function DataGrid<R, SR, K extends Key>(
  {
    // Grid and data Props
    columns: rawColumns,
    rows: rawRows,
    summaryRows,
    rowKeyGetter,
    onRowsChange,
    // Dimensions props
    rowHeight,
    headerRowHeight: rawHeaderRowHeight,
    summaryRowHeight: rawSummaryRowHeight,
    // Feature props
    selectedRows,
    onSelectedRowsChange,
    sortColumns,
    onSortColumnsChange,
    defaultColumnOptions,
    groupBy: rawGroupBy,
    rowGrouper,
    expandedGroupIds,
    onExpandedGroupIdsChange,
    // Custom renderers
    rowRenderer,
    emptyRowsRenderer: EmptyRowsRenderer,
    // Event props
    onRowClick,
    onRowDoubleClick,
    onScroll,
    onColumnResize,
    onSelectedCellChange,
    onFill,
    onPaste,
    // Toggles and modes
    cellNavigationMode: rawCellNavigationMode,
    enableVirtualization,
    // Miscellaneous
    editorPortalTarget: rawEditorPortalTarget,
    className,
    style,
    rowClass,
    // ARIA
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy
  }: DataGridProps<R, SR, K>,
  ref: React.Ref<DataGridHandle>
) {
  /**
   * defaults
   */
  rowHeight ??= 35;
  const headerRowHeight = rawHeaderRowHeight ?? (typeof rowHeight === 'number' ? rowHeight : 35);
  const summaryRowHeight = rawSummaryRowHeight ?? (typeof rowHeight === 'number' ? rowHeight : 35);
  const RowRenderer = rowRenderer ?? Row;
  const cellNavigationMode = rawCellNavigationMode ?? 'NONE';
  enableVirtualization ??= true;
  const editorPortalTarget = rawEditorPortalTarget ?? body;

  /**
   * states
   */
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [columnWidths, setColumnWidths] = useState<ReadonlyMap<string, number>>(() => new Map());
  const [selectedPosition, setSelectedPosition] = useState<SelectCellState | EditCellState<R>>(
    initialPosition
  );
  const [copiedCell, setCopiedCell] = useState<{ row: R; columnKey: string } | null>(null);
  const [isDragging, setDragging] = useState(false);
  const [draggedOverRowIdx, setOverRowIdx] = useState<number | undefined>(undefined);

  /**
   * refs
   */
  const focusSinkRef = useRef<HTMLDivElement>(null);
  const prevSelectedPosition = useRef(selectedPosition);
  const latestDraggedOverRowIdx = useRef(draggedOverRowIdx);
  const lastSelectedRowIdx = useRef(-1);
  const isCellFocusable = useRef(false);

  /**
   * computed values
   */
  const [gridRef, gridWidth, gridHeight] = useGridDimensions();
  const headerRowsCount = 1;
  const summaryRowsCount = summaryRows?.length ?? 0;
  const clientHeight = gridHeight - headerRowHeight - summaryRowsCount * summaryRowHeight;
  const isSelectable = selectedRows != null && onSelectedRowsChange != null;
  const isHeaderRowSelected = selectedPosition.rowIdx === -1;

  const allRowsSelected = useMemo((): boolean => {
    // no rows to select = explicitely unchecked
    const { length } = rawRows;
    return (
      length !== 0 &&
      selectedRows != null &&
      rowKeyGetter != null &&
      selectedRows.size >= length &&
      rawRows.every((row) => selectedRows.has(rowKeyGetter(row)))
    );
  }, [rawRows, selectedRows, rowKeyGetter]);

  const {
    columns,
    colSpanColumns,
    colOverscanStartIdx,
    colOverscanEndIdx,
    layoutCssVars,
    columnMetrics,
    totalColumnWidth,
    lastFrozenColumnIndex,
    totalFrozenColumnWidth,
    groupBy
  } = useCalculatedColumns({
    rawColumns,
    columnWidths,
    scrollLeft,
    viewportWidth: gridWidth,
    defaultColumnOptions,
    rawGroupBy: rowGrouper ? rawGroupBy : undefined,
    enableVirtualization
  });

  const {
    rowOverscanStartIdx,
    rowOverscanEndIdx,
    rows,
    rowsCount,
    totalRowHeight,
    isGroupRow,
    getRowTop,
    getRowHeight,
    findRowIdx
  } = useViewportRows({
    rawRows,
    groupBy,
    rowGrouper,
    rowHeight,
    clientHeight,
    scrollTop,
    expandedGroupIds,
    enableVirtualization
  });

  const viewportColumns = useViewportColumns({
    columns,
    colSpanColumns,
    colOverscanStartIdx,
    colOverscanEndIdx,
    lastFrozenColumnIndex,
    rowOverscanStartIdx,
    rowOverscanEndIdx,
    rows,
    summaryRows,
    isGroupRow
  });

  const hasGroups = groupBy.length > 0 && typeof rowGrouper === 'function';
  const minColIdx = hasGroups ? -1 : 0;
  const minRowIdx = -1;
  const maxRowIdx = headerRowsCount + rows.length + summaryRowsCount - 2;

  /**
   * The identity of the wrapper function is stable so it won't break memoization
   */
  const selectRowLatest = useLatestFunc(selectRow);
  const selectAllRowsLatest = useLatestFunc(selectAllRows);
  const handleFormatterRowChangeLatest = useLatestFunc(updateRow);
  const selectViewportCellLatest = useLatestFunc(
    (row: R, column: CalculatedColumn<R, SR>, enableEditor: boolean | undefined | null) => {
      const rowIdx = rows.indexOf(row);
      selectCell({ rowIdx, idx: column.idx }, enableEditor);
    }
  );
  const selectGroupLatest = useLatestFunc((rowIdx: number) => {
    selectCell({ rowIdx, idx: -1 });
  });
  const selectHeaderCellLatest = useLatestFunc((column: CalculatedColumn<R, SR>) => {
    selectCell({ rowIdx: -1, idx: column.idx });
  });
  const selectSummaryCellLatest = useLatestFunc(
    (summaryRow: SR, column: CalculatedColumn<R, SR>) => {
      if (!summaryRows) return;
      const rowIdx = summaryRows.indexOf(summaryRow) + headerRowsCount + rows.length - 1;
      selectCell({ rowIdx, idx: column.idx });
    }
  );
  const toggleGroupLatest = useLatestFunc(toggleGroup);

  /**
   * effects
   */
  useLayoutEffect(() => {
    if (
      // !isGridFocused.current ||
      selectedPosition === prevSelectedPosition.current ||
      selectedPosition.mode === 'EDIT' ||
      !isCellWithinSelectionBounds(selectedPosition)
    ) {
      return;
    }
    prevSelectedPosition.current = selectedPosition;
    scrollToCell(selectedPosition);

    if (isCellFocusable.current) {
      isCellFocusable.current = false;
      return;
    }
    focusSinkRef.current!.focus({ preventScroll: true });
  });

  useImperativeHandle(ref, () => ({
    element: gridRef.current,
    scrollToColumn(idx: number) {
      scrollToCell({ idx });
    },
    scrollToRow(rowIdx: number) {
      const { current } = gridRef;
      if (!current) return;
      current.scrollTo({
        top: getRowTop(rowIdx),
        behavior: 'smooth'
      });
    },
    selectCell
  }));

  /**
   * callbacks
   */
  const handleColumnResize = useCallback(
    (column: CalculatedColumn<R, SR>, width: number) => {
      setColumnWidths((columnWidths) => {
        const newColumnWidths = new Map(columnWidths);
        newColumnWidths.set(column.key, width);
        return newColumnWidths;
      });

      onColumnResize?.(column.idx, width);
    },
    [onColumnResize]
  );

  const setDraggedOverRowIdx = useCallback((rowIdx?: number) => {
    setOverRowIdx(rowIdx);
    latestDraggedOverRowIdx.current = rowIdx;
  }, []);

  /**
   * event handlers
   */
  function selectRow({ row, checked, isShiftClick }: SelectRowEvent<R>) {
    if (!onSelectedRowsChange) return;

    assertIsValidKeyGetter<R, K>(rowKeyGetter);
    const newSelectedRows = new Set(selectedRows);
    if (isGroupRow(row)) {
      for (const childRow of row.childRows) {
        const rowKey = rowKeyGetter(childRow);
        if (checked) {
          newSelectedRows.add(rowKey);
        } else {
          newSelectedRows.delete(rowKey);
        }
      }
      onSelectedRowsChange(newSelectedRows);
      return;
    }

    const rowKey = rowKeyGetter(row);
    if (checked) {
      newSelectedRows.add(rowKey);
      const previousRowIdx = lastSelectedRowIdx.current;
      const rowIdx = rows.indexOf(row);
      lastSelectedRowIdx.current = rowIdx;
      if (isShiftClick && previousRowIdx !== -1 && previousRowIdx !== rowIdx) {
        const step = sign(rowIdx - previousRowIdx);
        for (let i = previousRowIdx + step; i !== rowIdx; i += step) {
          const row = rows[i];
          if (isGroupRow(row)) continue;
          newSelectedRows.add(rowKeyGetter(row));
        }
      }
    } else {
      newSelectedRows.delete(rowKey);
      lastSelectedRowIdx.current = -1;
    }

    onSelectedRowsChange(newSelectedRows);
  }

  function selectAllRows(checked: boolean) {
    if (!onSelectedRowsChange) return;

    assertIsValidKeyGetter<R, K>(rowKeyGetter);
    const newSelectedRows = new Set(selectedRows);

    for (const row of rawRows) {
      const rowKey = rowKeyGetter(row);
      if (checked) {
        newSelectedRows.add(rowKey);
      } else {
        newSelectedRows.delete(rowKey);
      }
    }

    onSelectedRowsChange(newSelectedRows);
  }

  function toggleGroup(expandedGroupId: unknown) {
    if (!onExpandedGroupIdsChange) return;
    const newExpandedGroupIds = new Set(expandedGroupIds);
    if (newExpandedGroupIds.has(expandedGroupId)) {
      newExpandedGroupIds.delete(expandedGroupId);
    } else {
      newExpandedGroupIds.add(expandedGroupId);
    }
    onExpandedGroupIdsChange(newExpandedGroupIds);
  }

  function onGridFocus() {
    if (!isCellWithinSelectionBounds(selectedPosition)) {
      // Tabbing into the grid should initiate keyboard navigation
      const initialPosition: SelectCellState = { idx: 0, rowIdx: minRowIdx, mode: 'SELECT' };
      if (isCellWithinSelectionBounds(initialPosition)) {
        setSelectedPosition(initialPosition);
      }
    } else {
      // otherwise if we already have a selected cell, we should scroll back to it when focusing the grid
      scrollToCell(selectedPosition);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const { key, keyCode } = event;
    const { rowIdx } = selectedPosition;

    if (
      onPaste &&
      isCtrlKeyHeldDown(event) &&
      isCellWithinEditBounds(selectedPosition) &&
      !isGroupRow(rows[rowIdx]) &&
      selectedPosition.mode === 'SELECT'
    ) {
      // event.key may differ by keyboard input language, so we use event.keyCode instead
      // event.nativeEvent.code cannot be used either as it would break copy/paste for the DVORAK layout
      const cKey = 67;
      const vKey = 86;
      if (keyCode === cKey) {
        handleCopy();
        return;
      }
      if (keyCode === vKey) {
        handlePaste();
        return;
      }
    }

    if (isViewportRowIdx(rowIdx)) {
      const row = rows[rowIdx];

      if (
        isGroupRow(row) &&
        selectedPosition.idx === -1 &&
        // Collapse the current group row if it is focused and is in expanded state
        ((key === 'ArrowLeft' && row.isExpanded) ||
          // Expand the current group row if it is focused and is in collapsed state
          (key === 'ArrowRight' && !row.isExpanded))
      ) {
        event.preventDefault(); // Prevents scrolling
        toggleGroup(row.id);
        return;
      }
    }

    switch (event.key) {
      case 'Escape':
        setCopiedCell(null);
        closeEditor();
        return;
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'Tab':
      case 'Home':
      case 'End':
      case 'PageUp':
      case 'PageDown':
        navigate(event);
        break;
      default:
        handleCellInput(event);
        break;
    }
  }

  function handleFocus() {
    isCellFocusable.current = true;
  }

  function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    const { scrollTop, scrollLeft } = event.currentTarget;
    setScrollTop(scrollTop);
    setScrollLeft(scrollLeft);
    onScroll?.(event);
  }

  function getRawRowIdx(rowIdx: number) {
    return hasGroups ? rawRows.indexOf(rows[rowIdx] as R) : rowIdx;
  }

  function updateRow(rowIdx: number, row: R) {
    if (typeof onRowsChange !== 'function') return;
    if (row === rawRows[rowIdx]) return;
    const updatedRows = [...rawRows];
    updatedRows[rowIdx] = row;
    onRowsChange(updatedRows, {
      indexes: [rowIdx],
      column: columns[selectedPosition.idx]
    });
  }

  function commitEditorChanges() {
    if (
      columns[selectedPosition.idx]?.editor == null ||
      selectedPosition.mode === 'SELECT' ||
      selectedPosition.row === selectedPosition.originalRow
    ) {
      return;
    }

    const rowIdx = getRawRowIdx(selectedPosition.rowIdx);
    updateRow(rowIdx, selectedPosition.row);
  }

  function handleCopy() {
    const { idx, rowIdx } = selectedPosition;
    setCopiedCell({ row: rawRows[getRawRowIdx(rowIdx)], columnKey: columns[idx].key });
  }

  function handlePaste() {
    const { idx, rowIdx } = selectedPosition;
    const targetRow = rawRows[getRawRowIdx(rowIdx)];
    if (!onPaste || !onRowsChange || copiedCell === null || !isCellEditable(selectedPosition)) {
      return;
    }

    const updatedTargetRow = onPaste({
      sourceRow: copiedCell.row,
      sourceColumnKey: copiedCell.columnKey,
      targetRow,
      targetColumnKey: columns[idx].key
    });

    updateRow(rowIdx, updatedTargetRow);
  }

  function handleCellInput(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!isCellWithinEditBounds(selectedPosition)) return;
    const row = rows[selectedPosition.rowIdx];
    if (isGroupRow(row)) return;
    const { key } = event;

    if (selectedPosition.mode === 'EDIT') {
      if (key === 'Enter') {
        // Custom editors can listen for the event and stop propagation to prevent commit
        commitEditorChanges();
        closeEditor();
      }
      return;
    }

    const column = columns[selectedPosition.idx];
    column.editorOptions?.onCellKeyDown?.(event);
    if (event.isDefaultPrevented()) return;

    if (isCellEditable(selectedPosition) && isDefaultCellInput(event)) {
      setSelectedPosition(({ idx, rowIdx }) => ({
        idx,
        rowIdx,
        key,
        mode: 'EDIT',
        row,
        originalRow: row
      }));
    }
  }

  function handleEditorRowChange(row: R, commitChanges?: boolean) {
    if (selectedPosition.mode === 'SELECT') return;
    if (commitChanges) {
      updateRow(getRawRowIdx(selectedPosition.rowIdx), row);
      closeEditor();
    } else {
      setSelectedPosition((position) => ({ ...position, row }));
    }
  }

  function handleOnClose(commitChanges?: boolean) {
    if (commitChanges) {
      commitEditorChanges();
    }
    closeEditor();
  }

  /**
   * utils
   */
  function isCellWithinSelectionBounds({ idx, rowIdx }: Position): boolean {
    return rowIdx >= minRowIdx && rowIdx <= maxRowIdx && idx >= minColIdx && idx < columns.length;
  }

  function isViewportRowIdx(rowIdx: number) {
    return rowIdx >= 0 && rowIdx < rows.length;
  }

  function isCellWithinEditBounds({ idx, rowIdx }: Position): boolean {
    return isViewportRowIdx(rowIdx) && idx >= 0 && idx < columns.length;
  }

  function isCellEditable(position: Position): boolean {
    return (
      isCellWithinEditBounds(position) &&
      isSelectedCellEditable({ columns, rows, selectedPosition: position, isGroupRow })
    );
  }

  function selectCell(position: Position, enableEditor?: boolean | null): void {
    if (!isCellWithinSelectionBounds(position)) return;
    commitEditorChanges();

    if (enableEditor && isCellEditable(position)) {
      const row = rows[position.rowIdx] as R;
      setSelectedPosition({ ...position, mode: 'EDIT', key: null, row, originalRow: row });
    } else {
      setSelectedPosition({ ...position, mode: 'SELECT' });
    }
    onSelectedCellChange?.({ ...position });
  }

  function closeEditor() {
    if (selectedPosition.mode === 'SELECT') return;
    setSelectedPosition(({ idx, rowIdx }) => ({ idx, rowIdx, mode: 'SELECT' }));
  }

  function scrollToCell({ idx, rowIdx }: Partial<Position>): void {
    const { current } = gridRef;
    if (!current) return;

    if (typeof idx === 'number' && idx > lastFrozenColumnIndex) {
      rowIdx ??= selectedPosition.rowIdx;
      if (!isCellWithinSelectionBounds({ rowIdx, idx })) return;
      const { clientWidth } = current;
      const column = columns[idx];
      const { left, width } = columnMetrics.get(column)!;
      let right = left + width;

      const colSpan = getSelectedCellColSpan({
        rows,
        summaryRows,
        rowIdx,
        lastFrozenColumnIndex,
        column,
        isGroupRow
      });

      if (colSpan !== undefined) {
        const { left, width } = columnMetrics.get(columns[column.idx + colSpan - 1])!;
        right = left + width;
      }

      const isCellAtLeftBoundary = left < scrollLeft + totalFrozenColumnWidth;
      const isCellAtRightBoundary = right > clientWidth + scrollLeft;
      if (isCellAtLeftBoundary) {
        current.scrollLeft = left - totalFrozenColumnWidth;
      } else if (isCellAtRightBoundary) {
        current.scrollLeft = right - clientWidth;
      }
    }

    if (typeof rowIdx === 'number' && isViewportRowIdx(rowIdx)) {
      const rowTop = getRowTop(rowIdx);
      const rowHeight = getRowHeight(rowIdx);
      if (rowTop < scrollTop) {
        // at top boundary, scroll to the row's top
        current.scrollTop = rowTop;
      } else if (rowTop + rowHeight > scrollTop + clientHeight) {
        // at bottom boundary, scroll the next row's top to the bottom of the viewport
        current.scrollTop = rowTop + rowHeight - clientHeight;
      }
    }
  }

  function getNextPosition(key: string, ctrlKey: boolean, shiftKey: boolean): Position {
    const { idx, rowIdx } = selectedPosition;
    const row = rows[rowIdx];
    const isRowSelected = isCellWithinSelectionBounds(selectedPosition) && idx === -1;

    // If a group row is focused, and it is collapsed, move to the parent group row (if there is one).
    if (
      key === 'ArrowLeft' &&
      isRowSelected &&
      isGroupRow(row) &&
      !row.isExpanded &&
      row.level !== 0
    ) {
      let parentRowIdx = -1;
      for (let i = selectedPosition.rowIdx - 1; i >= 0; i--) {
        const parentRow = rows[i];
        if (isGroupRow(parentRow) && parentRow.id === row.parentId) {
          parentRowIdx = i;
          break;
        }
      }
      if (parentRowIdx !== -1) {
        return { idx, rowIdx: parentRowIdx };
      }
    }

    switch (key) {
      case 'ArrowUp':
        return { idx, rowIdx: rowIdx - 1 };
      case 'ArrowDown':
        return { idx, rowIdx: rowIdx + 1 };
      case 'ArrowLeft':
        return { idx: idx - 1, rowIdx };
      case 'ArrowRight':
        return { idx: idx + 1, rowIdx };
      case 'Tab':
        return { idx: idx + (shiftKey ? -1 : 1), rowIdx };
      case 'Home':
        // If row is selected then move focus to the first row
        if (isRowSelected) return { idx, rowIdx: 0 };
        return ctrlKey ? { idx: 0, rowIdx: minRowIdx } : { idx: 0, rowIdx };
      case 'End':
        // If row is selected then move focus to the last row.
        if (isRowSelected) return { idx, rowIdx: rows.length - 1 };
        return ctrlKey
          ? { idx: columns.length - 1, rowIdx: maxRowIdx }
          : { idx: columns.length - 1, rowIdx };
      case 'PageUp': {
        const nextRowY = getRowTop(rowIdx) + getRowHeight(rowIdx) - clientHeight;
        return { idx, rowIdx: nextRowY > 0 ? findRowIdx(nextRowY) : 0 };
      }
      case 'PageDown': {
        const nextRowY = getRowTop(rowIdx) + clientHeight;
        return { idx, rowIdx: nextRowY < totalRowHeight ? findRowIdx(nextRowY) : rows.length - 1 };
      }
      default:
        return selectedPosition;
    }
  }

  function navigate(event: React.KeyboardEvent<HTMLDivElement>) {
    if (selectedPosition.mode === 'EDIT') {
      const onNavigation =
        columns[selectedPosition.idx].editorOptions?.onNavigation ?? onEditorNavigation;
      if (!onNavigation(event)) return;
    }
    const { key, shiftKey } = event;
    let mode = cellNavigationMode;
    if (key === 'Tab') {
      // If we are in a position to leave the grid, stop editing but stay in that cell
      if (
        canExitGrid({
          shiftKey,
          cellNavigationMode,
          columns,
          maxRowIdx,
          selectedPosition
        })
      ) {
        commitEditorChanges();
        // Allow focus to leave the grid so the next control in the tab order can be focused
        return;
      }

      mode = cellNavigationMode === 'NONE' ? 'CHANGE_ROW' : cellNavigationMode;
    }

    // Do not allow focus to leave
    event.preventDefault();

    const ctrlKey = isCtrlKeyHeldDown(event);
    const nextPosition = getNextSelectedCellPosition({
      columns,
      colSpanColumns,
      rows,
      summaryRows,
      lastFrozenColumnIndex,
      cellNavigationMode: mode,
      currentPosition: selectedPosition,
      nextPosition: getNextPosition(key, ctrlKey, shiftKey),
      isCellWithinBounds: isCellWithinSelectionBounds,
      isGroupRow
    });

    selectCell(nextPosition);
  }

  function getDraggedOverCellIdx(currentRowIdx: number): number | undefined {
    if (draggedOverRowIdx === undefined) return;
    const { rowIdx } = selectedPosition;

    const isDraggedOver =
      rowIdx < draggedOverRowIdx
        ? rowIdx < currentRowIdx && currentRowIdx <= draggedOverRowIdx
        : rowIdx > currentRowIdx && currentRowIdx >= draggedOverRowIdx;

    return isDraggedOver ? selectedPosition.idx : undefined;
  }

  function getSelectedCellProps(rowIdx: number): SelectedCellProps<R, SR> | undefined {
    if (selectedPosition.rowIdx !== rowIdx) return;

    if (selectedPosition.mode === 'EDIT') {
      const { idx, row } = selectedPosition;
      const column = columns[idx];
      const colSpan = getColSpan(column, lastFrozenColumnIndex, { type: 'ROW', row });

      return {
        selectedCellIdx: idx,
        onFocus: handleFocus,
        onKeyDown: handleKeyDown,
        selectedCellEditor: (
          <EditCell
            key={column.key}
            column={column}
            colSpan={colSpan}
            row={row}
            editorPortalTarget={editorPortalTarget}
            onKeyDown={handleKeyDown}
            onRowChange={handleEditorRowChange}
            onClose={handleOnClose}
          />
        )
      };
    }

    return {
      selectedCellIdx: selectedPosition.idx,
      onFocus: handleFocus,
      onKeyDown: handleKeyDown,
      selectedCellDragHandle:
        // Cell drag is not supported on a treegrid
        !hasGroups && onFill != null ? (
          <DragHandle
            rows={rawRows}
            columns={columns}
            selectedPosition={selectedPosition}
            isCellEditable={isCellEditable}
            latestDraggedOverRowIdx={latestDraggedOverRowIdx}
            onRowsChange={onRowsChange}
            onFill={onFill}
            setDragging={setDragging}
            setDraggedOverRowIdx={setDraggedOverRowIdx}
          />
        ) : undefined
    };
  }

  function getViewportRows() {
    const rowElements = [];
    let startRowIndex = 0;
    for (let rowIdx = rowOverscanStartIdx; rowIdx <= rowOverscanEndIdx; rowIdx++) {
      const row = rows[rowIdx];
      const top = getRowTop(rowIdx) + headerRowHeight;
      if (isGroupRow(row)) {
        ({ startRowIndex } = row);
        const isGroupRowSelected =
          isSelectable && row.childRows.every((cr) => selectedRows?.has(rowKeyGetter!(cr)));
        rowElements.push(
          <GroupRowRenderer
            aria-level={row.level + 1} // aria-level is 1-based
            aria-setsize={row.setSize}
            aria-posinset={row.posInSet + 1} // aria-posinset is 1-based
            aria-rowindex={headerRowsCount + startRowIndex + 1} // aria-rowindex is 1 based
            aria-selected={isSelectable ? isGroupRowSelected : undefined}
            key={row.id}
            id={row.id}
            groupKey={row.groupKey}
            viewportColumns={viewportColumns}
            childRows={row.childRows}
            rowIdx={rowIdx}
            row={row}
            top={top}
            height={getRowHeight(rowIdx)}
            level={row.level}
            isExpanded={row.isExpanded}
            selectedCellIdx={selectedPosition.rowIdx === rowIdx ? selectedPosition.idx : undefined}
            isRowSelected={isGroupRowSelected}
            onFocus={selectedPosition.rowIdx === rowIdx ? handleFocus : undefined}
            onKeyDown={selectedPosition.rowIdx === rowIdx ? handleKeyDown : undefined}
            selectGroup={selectGroupLatest}
            toggleGroup={toggleGroupLatest}
          />
        );
        continue;
      }

      startRowIndex++;
      let key;
      let isRowSelected = false;
      if (typeof rowKeyGetter === 'function') {
        key = rowKeyGetter(row);
        isRowSelected = selectedRows?.has(key) ?? false;
      } else {
        key = hasGroups ? startRowIndex : rowIdx;
      }

      rowElements.push(
        <RowRenderer
          aria-rowindex={headerRowsCount + (hasGroups ? startRowIndex : rowIdx) + 1} // aria-rowindex is 1 based
          aria-selected={isSelectable ? isRowSelected : undefined}
          key={key}
          rowIdx={rowIdx}
          row={row}
          viewportColumns={viewportColumns}
          isRowSelected={isRowSelected}
          onRowClick={onRowClick}
          onRowDoubleClick={onRowDoubleClick}
          rowClass={rowClass}
          top={top}
          height={getRowHeight(rowIdx)}
          copiedCellIdx={
            copiedCell !== null && copiedCell.row === row
              ? columns.findIndex((c) => c.key === copiedCell.columnKey)
              : undefined
          }
          draggedOverCellIdx={getDraggedOverCellIdx(rowIdx)}
          setDraggedOverRowIdx={isDragging ? setDraggedOverRowIdx : undefined}
          lastFrozenColumnIndex={lastFrozenColumnIndex}
          onRowChange={handleFormatterRowChangeLatest}
          selectCell={selectViewportCellLatest}
          {...getSelectedCellProps(rowIdx)}
        />
      );
    }

    return rowElements;
  }

  // Reset the positions if the current values are no longer valid. This can happen if a column or row is removed
  if (selectedPosition.idx >= columns.length || selectedPosition.rowIdx > maxRowIdx) {
    setSelectedPosition(initialPosition);
    setDraggedOverRowIdx(undefined);
  }

  if (
    selectedPosition.mode === 'EDIT' &&
    rows[selectedPosition.rowIdx] !== selectedPosition.originalRow
  ) {
    // Discard changes if rows are updated from outside
    closeEditor();
  }

  return (
    <div
      role={hasGroups ? 'treegrid' : 'grid'}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-multiselectable={isSelectable ? true : undefined}
      aria-colcount={columns.length}
      aria-rowcount={headerRowsCount + rowsCount + summaryRowsCount}
      className={clsx(rootClassname, { [viewportDraggingClassname]: isDragging }, className)}
      style={
        {
          ...style,
          '--header-row-height': `${headerRowHeight}px`,
          '--row-width': `${totalColumnWidth}px`,
          '--summary-row-height': `${summaryRowHeight}px`,
          ...layoutCssVars
        } as unknown as React.CSSProperties
      }
      ref={gridRef}
      onScroll={handleScroll}
    >
      <HeaderRow
        columns={viewportColumns}
        onColumnResize={handleColumnResize}
        allRowsSelected={allRowsSelected}
        onAllRowsSelectionChange={selectAllRowsLatest}
        sortColumns={sortColumns}
        onSortColumnsChange={onSortColumnsChange}
        lastFrozenColumnIndex={lastFrozenColumnIndex}
        selectedColIdx={isHeaderRowSelected ? selectedPosition.idx : undefined}
        onKeyDown={isHeaderRowSelected ? handleKeyDown : undefined}
        onFocus={isHeaderRowSelected ? handleFocus : undefined}
        selectCell={selectHeaderCellLatest}
      />
      {rows.length === 0 && EmptyRowsRenderer ? (
        <EmptyRowsRenderer />
      ) : (
        <>
          {/*
            Ideally the focus should be set on the selected cell
            (https://www.w3.org/TR/wai-aria-practices-1.2/#kbd_roving_tabindex)
            but there are a few issues with this approach
            - onKeyDown/useLayoutEffect on the cell is not fast enough and grid
              looses focus if tab is pressed repeatedly
            - All the cells are not rendered so it is possible the focused cell
              is not in the viewport and unmounted and in this case the grid
              does not have any focusable element

            This first issue can be solved by setting onKeyDown on the root element
            but for the second issue we need to render the selected cell along with
            the cells in the viewport. This adds complexity.

            To circumvent this issue we are using an extra div element which is
            positioned on the top/left corner of the viewport and it listens for the
            keyboard event and sets the selected cell's position.
          */}
          <div
            ref={focusSinkRef}
            tabIndex={0}
            className={focusSinkClassname}
            onKeyDown={handleKeyDown}
            onFocus={onGridFocus}
          />
          <div style={{ height: max(totalRowHeight, clientHeight) }} />
          <RowSelectionChangeProvider value={selectRowLatest}>
            {getViewportRows()}
          </RowSelectionChangeProvider>
          {summaryRows?.map((row, rowIdx) => {
            const isSummaryRowSelected =
              selectedPosition.rowIdx === headerRowsCount + rows.length + rowIdx - 1;
            return (
              <SummaryRow
                aria-rowindex={headerRowsCount + rowsCount + rowIdx + 1}
                key={rowIdx}
                rowIdx={rowIdx}
                row={row}
                bottom={summaryRowHeight * (summaryRows.length - 1 - rowIdx)}
                viewportColumns={viewportColumns}
                lastFrozenColumnIndex={lastFrozenColumnIndex}
                selectedColIdx={isSummaryRowSelected ? selectedPosition.idx : undefined}
                onKeyDown={isSummaryRowSelected ? handleKeyDown : undefined}
                onFocus={isSummaryRowSelected ? handleFocus : undefined}
                selectCell={selectSummaryCellLatest}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default forwardRef(DataGrid) as <R, SR = unknown, K extends Key = Key>(
  props: DataGridProps<R, SR, K> & RefAttributes<DataGridHandle>
) => JSX.Element;
