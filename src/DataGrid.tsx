import {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
  useCallback,
  useMemo,
  useEffect
} from 'react';
import type { Key, RefAttributes, ReactNode, RefObject } from 'react';
import clsx from 'clsx';
import { fromEvent } from 'rxjs';
import 'simplebar/dist/simplebar.min.css';

import { rootClassname, viewportDraggingClassname, wrapperClassname } from './style';
import {
  useLayoutEffect,
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
  RowHeightArgs,
  Maybe,
  DragOverflowHide
} from './types';
import SimpleBar from 'simplebar-react';
import useDragOver from './dragOver';

export interface SelectCellState extends Position {
  readonly mode: 'SELECT';
}

export interface EditCellState<R> extends Position {
  readonly mode: 'EDIT';
  readonly row: R;
  readonly originalRow: R;
}

export type SelectedPosition<R> = SelectCellState | EditCellState<R>;

type DefaultColumnOptions<R, SR> = Pick<
  Column<R, SR>,
  'formatter' | 'minWidth' | 'resizable' | 'sortable'
>;

const initialPosition: SelectCellState = {
  idx: -1,
  rowIdx: -2,
  mode: 'SELECT'
};

enum Direction {
  left = -1,
  right = 1
}

export interface DataGridHandle {
  element: HTMLDivElement | null;
  scrollToColumn: (colIdx: number) => void;
  scrollToRow: (rowIdx: number) => void;
  selectCell: (position: Position, enableEditor?: Maybe<boolean>) => void;
  manualNavigate: (control: { key: string; ctrlKey?: boolean; shiftKey?: boolean }) => void;
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
  summaryRows?: Maybe<readonly SR[]>;
  /** The getter should return a unique key for each row */
  rowKeyGetter?: Maybe<(row: R) => K>;
  onRowsChange?: Maybe<(rows: R[], data: RowsChangeData<R, SR>) => void>;

  /**
   * Dimensions props
   */
  /**
   * The height of each row in pixels
   * @default 35
   */
  rowHeight?: Maybe<number | ((args: RowHeightArgs<R>) => number)>;
  /**
   * The height of the header row in pixels
   * @default 35
   */
  headerRowHeight?: Maybe<number>;
  /**
   * The height of each summary row in pixels
   * @default 35
   */
  summaryRowHeight?: Maybe<number>;

  /**
   * Feature props
   */
  /** Set of selected row keys */
  selectedRows?: Maybe<ReadonlySet<K>>;
  /** Function called whenever row selection is changed */
  onSelectedRowsChange?: Maybe<(selectedRows: Set<K>) => void>;
  /** Used for multi column sorting */
  sortColumns?: Maybe<readonly SortColumn[]>;
  onSortColumnsChange?: Maybe<(sortColumns: SortColumn[]) => void>;
  defaultColumnOptions?: Maybe<DefaultColumnOptions<R, SR>>;
  groupBy?: Maybe<readonly string[]>;
  rowGrouper?: Maybe<(rows: readonly R[], columnKey: string) => Record<string, readonly R[]>>;
  expandedGroupIds?: Maybe<ReadonlySet<unknown>>;
  onExpandedGroupIdsChange?: Maybe<(expandedGroupIds: Set<unknown>) => void>;
  onFill?: Maybe<(event: FillEvent<R>) => R>;
  onPaste?: Maybe<(event: PasteEvent<R>) => R>;

  /**
   * Event props
   */
  /** Function called whenever a row is clicked */
  onRowClick?: Maybe<(row: R, column: CalculatedColumn<R, SR>) => void>;
  /** Function called whenever a row is double clicked */
  onRowDoubleClick?: Maybe<(row: R, column: CalculatedColumn<R, SR>) => void>;
  /** Called when the grid is scrolled */
  onScroll?: Maybe<(event: React.UIEvent<HTMLDivElement>) => void>;
  /** Called when a column is resized */
  onColumnResize?: Maybe<(idx: number, width: number) => void>;

  /**
   * Toggles and modes
   */
  /** @default 'NONE' */
  cellNavigationMode?: Maybe<CellNavigationMode>;
  /** @default true */
  enableVirtualization?: Maybe<boolean>;

  /**
   * Miscellaneous
   */
  rowRenderer?: Maybe<React.ComponentType<RowRendererProps<R, SR>>>;
  noRowsFallback?: React.ReactNode;
  rowClass?: Maybe<(row: R) => Maybe<string>>;
  'data-testid'?: Maybe<string>;
  onSelectedPositionChange?: Maybe<(position: SelectCellState | EditCellState<R>) => void>;

  hideRows?: number[];
  noShowRowsFallback?: ReactNode;
  dragOverflowHide?: DragOverflowHide;
  onDragging?: (idDragging: boolean) => void;
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
    // Event props
    onRowClick,
    onRowDoubleClick,
    onScroll,
    onColumnResize,
    onFill,
    onPaste,
    // Toggles and modes
    cellNavigationMode: rawCellNavigationMode,
    enableVirtualization,
    // Miscellaneous
    rowRenderer,
    noRowsFallback,
    className,
    style,
    rowClass,
    // ARIA
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    'data-testid': testId,

    // added props
    onSelectedPositionChange,
    noShowRowsFallback,
    hideRows = [],
    dragOverflowHide,
    onDragging
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
  enableVirtualization = hideRows.length <= 0 ? false : enableVirtualization ?? true;

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

  useEffect(() => {
    onDragging?.(isDragging);
  }, [isDragging, onDragging]);

  /**
   * refs
   */
  const prevSelectedPosition = useRef(selectedPosition);
  const latestDraggedOverRowIdx = useRef(draggedOverRowIdx);
  const lastSelectedRowIdx = useRef(-1);

  /**
   * computed values
   */
  const [gridRef, gridWidth, gridHeight] = useGridDimensions();
  const scrollRef = useRef<SimpleBar>(null);

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

  useEffect(() => {
    if (onSelectedPositionChange) {
      onSelectedPositionChange(selectedPosition);
    }
  }, [selectedPosition, onSelectedPositionChange]);

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
    enableVirtualization,
    hideRows
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
  const maxColIdx = columns.length - 1;
  const minRowIdx = -1; // change it to 0?
  const maxRowIdx = headerRowsCount + rows.length + summaryRowsCount - 2;
  const selectedCellIsWithinSelectionBounds = isCellWithinSelectionBounds(selectedPosition);
  const selectedCellIsWithinViewportBounds = isCellWithinViewportBounds(selectedPosition);

  /**
   * The identity of the wrapper function is stable so it won't break memoization
   */
  const selectRowLatest = useLatestFunc(selectRow);
  const selectAllRowsLatest = useLatestFunc(selectAllRows);
  const handleFormatterRowChangeLatest = useLatestFunc(updateRow);
  const selectViewportCellLatest = useLatestFunc(
    (row: R, column: CalculatedColumn<R, SR>, enableEditor: Maybe<boolean>) => {
      const rowIdx = rows.indexOf(row);
      selectCell({ rowIdx, idx: column.idx }, enableEditor);
    }
  );
  const selectGroupLatest = useLatestFunc((rowIdx: number) => {
    selectCell({ rowIdx, idx: -1 });
  });
  const selectHeaderCellLatest = useLatestFunc((idx: number) => {
    selectCell({ rowIdx: -1, idx });
  });
  const selectSummaryCellLatest = useLatestFunc(
    (summaryRow: SR, column: CalculatedColumn<R, SR>) => {
      const rowIdx = summaryRows!.indexOf(summaryRow) + headerRowsCount + rows.length - 1;
      selectCell({ rowIdx, idx: column.idx });
    }
  );
  const toggleGroupLatest = useLatestFunc(toggleGroup);

  const dragoverHook = useDragOver({ selectedPosition });

  /**
   * effects
   */
  useLayoutEffect(() => {
    if (
      !selectedCellIsWithinSelectionBounds ||
      isSamePosition(selectedPosition, prevSelectedPosition.current)
    ) {
      prevSelectedPosition.current = selectedPosition;
      return;
    }

    prevSelectedPosition.current = selectedPosition;
    scrollToCell(selectedPosition);
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
    selectCell,
    manualNavigate
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

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!(event.target instanceof Element)) return;
    const isCellEvent = event.target.closest('.rdg-cell') !== null;
    const isRowEvent = hasGroups && event.target.matches('.rdg-row, .rdg-header-row');
    if (!isCellEvent && !isRowEvent) return;

    const { key, keyCode } = event;
    const { rowIdx } = selectedPosition;

    if (
      selectedCellIsWithinViewportBounds &&
      onPaste != null &&
      isCtrlKeyHeldDown(event) &&
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

    if (isRowIdxWithinViewportBounds(rowIdx)) {
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
        return;
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'Home':
      case 'End':
      case 'PageUp':
      case 'Enter':
      case 'Tab':
      case 'PageDown':
        navigate(event);
        break;
      default:
        handleCellInput(event);
        break;
    }
  }

  function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    const { scrollTop, scrollLeft } = event.currentTarget;
    setScrollTop(scrollTop);
    setScrollLeft(scrollLeft);
    onScroll?.(event);
  }

  useEffect(() => {
    const element = (gridRef as unknown as RefObject<HTMLDivElement>).current;

    if (!element) {
      return;
    }

    let scrollDirection: 'horizontal' | 'vertical' = 'horizontal';
    const onMouseWheel = (event: WheelEvent) => {
      const { scrollHeight } = element;
      const elementHeight = element.clientHeight;
      const { scrollTop } = element;
      const { deltaY } = event;
      const { deltaX } = event;

      if (deltaX !== 0 && scrollDirection === 'horizontal') {
        event.preventDefault();
        return (element.scrollLeft += deltaX);
      }
      if (deltaY !== 0 && scrollDirection === 'vertical') {
        if (scrollTop + deltaY <= -5 || scrollTop + elementHeight + deltaY > scrollHeight + 5) {
          return;
        }
        event.preventDefault();
        return (element.scrollTop += deltaY);
      }
      event.preventDefault();
      return 0;
    };

    fromEvent(element, 'wheel').subscribe((e) => {
      const wheelEvent = e as WheelEvent;
      const stringDeltaY = wheelEvent.deltaY.toString();
      const stringDeltaX = wheelEvent.deltaX.toString();
      const deltaY = Number(stringDeltaY);
      const deltaX = Number(stringDeltaX);
      scrollDirection = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical';
    });

    element.addEventListener('wheel', onMouseWheel, { passive: false });

    return () => {
      element.removeEventListener('wheel', onMouseWheel);
    };
  }, [gridRef]);

  useEffect(() => {
    const element = (scrollRef as unknown as RefObject<HTMLDivElement>).current;

    if (!element) {
      return;
    }

    const observer = new MutationObserver(function (event) {
      const latestClassname = (event[0].target as HTMLElement).className;

      if (latestClassname.includes('simplebar-dragging')) {
        document.body.style.cursor = 'grabbing';
      } else {
        document.body.style.cursor = 'auto';
      }
    });

    observer.observe(scrollRef.current?.el as Node, {
      attributes: true,
      attributeFilter: ['class'],
      childList: false,
      characterData: false
    });

    return () => {
      observer.disconnect();
    };
  }, [scrollRef]);

  function getRawRowIdx(rowIdx: number) {
    return hasGroups ? rawRows.indexOf(rows[rowIdx] as R) : rowIdx;
  }

  function updateRow(rowIdx: number, row: R) {
    if (typeof onRowsChange !== 'function') return;
    const rawRowIdx = getRawRowIdx(rowIdx);
    if (row === rawRows[rawRowIdx]) return;
    const updatedRows = [...rawRows];
    updatedRows[rawRowIdx] = row;
    onRowsChange(updatedRows, {
      indexes: [rawRowIdx],
      column: columns[selectedPosition.idx]
    });
  }

  function commitEditorChanges() {
    if (selectedPosition.mode !== 'EDIT') return;
    updateRow(selectedPosition.rowIdx, selectedPosition.row);
  }

  function handleCopy() {
    const { idx, rowIdx } = selectedPosition;
    setCopiedCell({ row: rawRows[getRawRowIdx(rowIdx)], columnKey: columns[idx].key });
  }

  function handlePaste() {
    if (!onPaste || !onRowsChange || copiedCell === null || !isCellEditable(selectedPosition)) {
      return;
    }

    const { idx, rowIdx } = selectedPosition;
    const targetRow = rawRows[getRawRowIdx(rowIdx)];

    const updatedTargetRow = onPaste({
      sourceRow: copiedCell.row,
      sourceColumnKey: copiedCell.columnKey,
      targetRow,
      targetColumnKey: columns[idx].key
    });

    updateRow(rowIdx, updatedTargetRow);
  }

  function handleCellInput(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!selectedCellIsWithinViewportBounds) return;
    const row = rows[selectedPosition.rowIdx];
    if (isGroupRow(row)) return;
    const { key, shiftKey } = event;

    // Select the row on Shift + Space
    if (isSelectable && shiftKey && key === ' ') {
      assertIsValidKeyGetter<R, K>(rowKeyGetter);
      const rowKey = rowKeyGetter(row);
      selectRow({ row, checked: !selectedRows.has(rowKey), isShiftClick: false });
      // do not scroll
      event.preventDefault();
      return;
    }

    const column = columns[selectedPosition.idx];
    column.editorOptions?.onCellKeyDown?.(event);
    if (event.isDefaultPrevented()) return;

    if (isCellHasEditor(selectedPosition) && isDefaultCellInput(event)) {
      setSelectedPosition(({ idx, rowIdx }) => ({
        idx,
        rowIdx,
        mode: 'EDIT',
        row,
        originalRow: row
      }));
    }
  }

  /**
   * utils
   */
  function isColIdxWithinSelectionBounds(idx: number) {
    return idx >= minColIdx && idx <= maxColIdx;
  }

  function isRowIdxWithinViewportBounds(rowIdx: number) {
    return rowIdx >= 0 && rowIdx < rows.length;
  }

  function isCellWithinSelectionBounds({ idx, rowIdx }: Position): boolean {
    return rowIdx >= minRowIdx && rowIdx <= maxRowIdx && isColIdxWithinSelectionBounds(idx);
  }

  function isCellWithinViewportBounds({ idx, rowIdx }: Position): boolean {
    return isRowIdxWithinViewportBounds(rowIdx) && isColIdxWithinSelectionBounds(idx);
  }

  function isCellEditable(position: Position): boolean {
    return (
      isCellWithinViewportBounds(position) &&
      isSelectedCellEditable({ columns, rows, selectedPosition: position, isGroupRow })
    );
  }

  function isCellHasEditor(position: Position) {
    const column = columns[position.idx];
    return !!column.editor;
  }

  function selectCell(position: Position, enableEditor?: Maybe<boolean>): void {
    if (position.idx === 0 || position.rowIdx === -1) {
      return;
    }

    if (!isCellWithinSelectionBounds(position)) return;
    commitEditorChanges();

    if (enableEditor && isCellEditable(position) && isCellHasEditor(position)) {
      const row = rows[position.rowIdx] as R;
      setSelectedPosition({ ...position, mode: 'EDIT', row, originalRow: row });
    } else if (isSamePosition(selectedPosition, position)) {
      // Avoid re-renders if the selected cell state is the same
      // TODO: replace with a #record? https://github.com/microsoft/TypeScript/issues/39831
      scrollToCell(position);
    } else {
      setSelectedPosition({ ...position, mode: 'SELECT' });
    }
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

    if (typeof rowIdx === 'number' && isRowIdxWithinViewportBounds(rowIdx)) {
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

  function getNextIdxAndRow({
    idx,
    shiftKey,
    rowIdx,
    direction
  }: {
    idx: number;
    rowIdx: number;
    shiftKey: boolean;
    direction: Direction;
  }) {
    const currentIdx = idx + (shiftKey ? -1 : direction);

    if (currentIdx === columns.length) {
      return { idx: 1, rowIdx: shiftKey ? rowIdx + Direction.left : rowIdx + direction };
    }
    if (currentIdx === 0) {
      if (rowIdx === 0) {
        return { idx: 0, rowIdx: 0 };
      }
      return {
        idx: columns.length - 1,
        rowIdx: shiftKey ? rowIdx + Direction.left : rowIdx + direction
      };
    }
    return { idx: currentIdx, rowIdx };
  }

  function getNextPosition(key: string, ctrlKey: boolean, shiftKey: boolean): Position {
    const { idx, rowIdx } = selectedPosition;
    const row = rows[rowIdx];
    const isRowSelected = selectedCellIsWithinSelectionBounds && idx === -1;

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

    const goToDown = () => {
      const rawNextRow = rowIdx + 1;

      let nextRow = rawNextRow;

      /* eslint-disable-next-line */
      while (true) {
        if (!hideRows.includes(nextRow)) {
          break;
        }
        nextRow += 1;
      }

      return { idx, rowIdx: nextRow };
    };

    switch (key) {
      case 'ArrowUp': {
        const rawPrevRow = rowIdx - 1;

        let prevRow = rawPrevRow;

        /* eslint-disable-next-line */
        while (true) {
          if (!hideRows.includes(prevRow)) {
            break;
          }
          prevRow -= 1;
        }

        if (rowIdx === 0) {
          return { idx, rowIdx };
        }

        return { idx, rowIdx: prevRow };
      }
      case 'ArrowDown':
      case 'Enter':
        return goToDown();
      case 'ArrowLeft':
        return getNextIdxAndRow({ idx, rowIdx, shiftKey, direction: Direction.left });
      case 'ArrowRight':
        return getNextIdxAndRow({ idx, rowIdx, shiftKey, direction: Direction.right });
      case 'Tab':
        return getNextIdxAndRow({ idx, rowIdx, shiftKey, direction: Direction.right });
      case 'Home':
        // If row is selected then move focus to the first row
        if (isRowSelected) return { idx, rowIdx: 0 };
        return { idx: 0, rowIdx: ctrlKey ? minRowIdx : rowIdx };
      case 'End':
        // If row is selected then move focus to the last row.
        if (isRowSelected) return { idx, rowIdx: rows.length - 1 };
        return { idx: maxColIdx, rowIdx: ctrlKey ? maxRowIdx : rowIdx };
      case 'PageUp': {
        if (selectedPosition.rowIdx === minRowIdx) return selectedPosition;
        const nextRowY = getRowTop(rowIdx) + getRowHeight(rowIdx) - clientHeight;
        return { idx, rowIdx: nextRowY > 0 ? findRowIdx(nextRowY) : 0 };
      }
      case 'PageDown': {
        if (selectedPosition.rowIdx >= rows.length) return selectedPosition;
        const nextRowY = getRowTop(rowIdx) + clientHeight;
        return { idx, rowIdx: nextRowY < totalRowHeight ? findRowIdx(nextRowY) : rows.length - 1 };
      }
      default:
        return selectedPosition;
    }
  }

  function manualNavigate({
    key,
    ctrlKey = false,
    shiftKey = false
  }: {
    key: string;
    ctrlKey?: boolean;
    shiftKey?: boolean;
  }) {
    const mode = cellNavigationMode;

    const nextPosition = getNextPosition(key, ctrlKey, shiftKey);
    if (isSamePosition(selectedPosition, nextPosition)) return;

    const nextSelectedCellPosition = getNextSelectedCellPosition({
      columns,
      colSpanColumns,
      rows,
      summaryRows,
      minRowIdx,
      maxRowIdx,
      lastFrozenColumnIndex,
      cellNavigationMode: mode,
      currentPosition: selectedPosition,
      nextPosition,
      isCellWithinBounds: isCellWithinSelectionBounds,
      isGroupRow,
      hideRows
    });

    selectCell(nextSelectedCellPosition);
  }

  function navigate(event: React.KeyboardEvent<HTMLDivElement>) {
    const { key, shiftKey } = event;
    let mode = cellNavigationMode;
    if (key === 'Tab') {
      if (
        canExitGrid({
          shiftKey,
          cellNavigationMode,
          maxColIdx,
          minRowIdx,
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
    const nextPosition = getNextPosition(key, ctrlKey, shiftKey);
    if (isSamePosition(selectedPosition, nextPosition)) return;

    const nextSelectedCellPosition = getNextSelectedCellPosition({
      columns,
      colSpanColumns,
      rows,
      summaryRows,
      minRowIdx,
      maxRowIdx,
      lastFrozenColumnIndex,
      cellNavigationMode: mode,
      currentPosition: selectedPosition,
      nextPosition,
      isCellWithinBounds: isCellWithinSelectionBounds,
      isGroupRow,
      hideRows
    });

    selectCell(nextSelectedCellPosition);
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

  function getDragHandle(rowIdx: number) {
    if (
      selectedPosition.rowIdx !== rowIdx ||
      selectedPosition.mode === 'EDIT' ||
      hasGroups || // drag fill is not supported when grouping is enabled
      onFill == null
    ) {
      return;
    }

    return (
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
        dragOverflowHide={dragOverflowHide}
        setLengthPosition={dragoverHook.setLengthPosition}
      />
    );
  }

  function getCellEditor(rowIdx: number) {
    if (selectedPosition.rowIdx !== rowIdx || selectedPosition.mode === 'SELECT') return;

    const { idx, row } = selectedPosition;
    const column = columns[idx];
    const colSpan = getColSpan(column, lastFrozenColumnIndex, { type: 'ROW', row });

    const closeEditor = () => {
      setSelectedPosition(({ idx, rowIdx }) => ({ idx, rowIdx, mode: 'SELECT' }));
    };

    const onRowChange = (row: R, commitChanges?: boolean) => {
      if (commitChanges) {
        updateRow(selectedPosition.rowIdx, row);
        closeEditor();
      } else {
        setSelectedPosition((position) => ({ ...position, row }));
      }
    };

    if (rows[selectedPosition.rowIdx] !== selectedPosition.originalRow) {
      // Discard changes if rows are updated from outside
      closeEditor();
    }

    return (
      <EditCell
        key={column.key}
        column={column}
        colSpan={colSpan}
        row={row}
        onRowChange={onRowChange}
        closeEditor={closeEditor}
        scrollToCell={() => scrollToCell(selectedPosition)}
      />
    );
  }

  function getViewportRows() {
    const rowElements = [];
    let startRowIndex = 0;

    const { idx: selectedIdx, rowIdx: selectedRowIdx } = selectedPosition;
    const startRowIdx =
      selectedCellIsWithinViewportBounds && selectedRowIdx < rowOverscanStartIdx
        ? rowOverscanStartIdx - 1
        : rowOverscanStartIdx;
    const endRowIdx =
      selectedCellIsWithinViewportBounds && selectedRowIdx > rowOverscanEndIdx
        ? rowOverscanEndIdx + 1
        : rowOverscanEndIdx;

    for (let viewportRowIdx = startRowIdx; viewportRowIdx <= endRowIdx; viewportRowIdx++) {
      const isRowOutsideViewport =
        viewportRowIdx === rowOverscanStartIdx - 1 || viewportRowIdx === rowOverscanEndIdx + 1;
      const rowIdx = isRowOutsideViewport ? selectedRowIdx : viewportRowIdx;

      let rowColumns = viewportColumns;
      const selectedColumn = columns[selectedIdx];
      // selectedIdx can be -1 if grouping is enabled
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (selectedColumn !== undefined) {
        if (isRowOutsideViewport) {
          // if the row is outside the viewport then only render the selected cell
          rowColumns = [selectedColumn];
        } else if (selectedRowIdx === rowIdx && !viewportColumns.includes(selectedColumn)) {
          // if the row is within the viewport and cell is not, add the selected column to viewport columns
          rowColumns =
            selectedIdx > viewportColumns[viewportColumns.length - 1].idx
              ? [...viewportColumns, selectedColumn]
              : [
                  ...viewportColumns.slice(0, lastFrozenColumnIndex + 1),
                  selectedColumn,
                  ...viewportColumns.slice(lastFrozenColumnIndex + 1)
                ];
        }
      }

      if (hideRows.includes(rowIdx)) {
        continue;
      }

      const row = rows[rowIdx];
      const top = getRowTop(rowIdx) + headerRowHeight;
      if (isGroupRow(row)) {
        ({ startRowIndex } = row);
        const isGroupRowSelected =
          isSelectable && row.childRows.every((cr) => selectedRows.has(rowKeyGetter!(cr)));
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
            viewportColumns={rowColumns}
            childRows={row.childRows}
            rowIdx={rowIdx}
            row={row}
            top={top}
            height={getRowHeight(rowIdx)}
            level={row.level}
            isExpanded={row.isExpanded}
            selectedCellIdx={selectedRowIdx === rowIdx ? selectedIdx : undefined}
            isRowSelected={isGroupRowSelected}
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
          viewportColumns={rowColumns}
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
          selectedCellIdx={selectedRowIdx === rowIdx ? selectedIdx : undefined}
          draggedOverCellIdx={getDraggedOverCellIdx(rowIdx)}
          setDraggedOverRowIdx={isDragging ? setDraggedOverRowIdx : undefined}
          lastFrozenColumnIndex={lastFrozenColumnIndex}
          onRowChange={handleFormatterRowChangeLatest}
          selectCell={selectViewportCellLatest}
          selectedCellDragHandle={getDragHandle(rowIdx)}
          selectedCellEditor={getCellEditor(rowIdx)}
          dragEndPosition={dragoverHook.endPosition}
        />
      );
    }

    return rowElements;
  }

  // Reset the positions if the current values are no longer valid. This can happen if a column or row is removed
  if (selectedPosition.idx > maxColIdx || selectedPosition.rowIdx > maxRowIdx) {
    setSelectedPosition(initialPosition);
    setDraggedOverRowIdx(undefined);
  }

  return (
    <SimpleBar
      ref={scrollRef}
      autoHide={false}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-multiselectable={isSelectable ? true : undefined}
      aria-colcount={columns.length}
      aria-rowcount={headerRowsCount + rowsCount + summaryRowsCount}
      style={
        {
          ...style,
          '--rdg-header-row-height': `${headerRowHeight}px`,
          '--rdg-row-width': `${totalColumnWidth}px`,
          '--rdg-summary-row-height': `${summaryRowHeight}px`,
          ...layoutCssVars
        } as unknown as React.CSSProperties
      }
      className={wrapperClassname}
      scrollableNodeProps={{
        ref: gridRef,
        onScroll: handleScroll,
        onKeyDown: handleKeyDown,
        role: hasGroups ? 'treegrid' : 'grid',
        className: clsx(rootClassname, { [viewportDraggingClassname]: isDragging }, className)
      }}
      data-testid={testId}
    >
      <HeaderRow
        columns={viewportColumns}
        onColumnResize={handleColumnResize}
        allRowsSelected={allRowsSelected}
        onAllRowsSelectionChange={selectAllRowsLatest}
        sortColumns={sortColumns}
        onSortColumnsChange={onSortColumnsChange}
        lastFrozenColumnIndex={lastFrozenColumnIndex}
        selectedCellIdx={isHeaderRowSelected ? selectedPosition.idx : undefined}
        selectCell={selectHeaderCellLatest}
        shouldFocusGrid={!selectedCellIsWithinSelectionBounds}
      />
      {rows.length === 0 && noRowsFallback ? (
        noRowsFallback
      ) : rows.every((data, rowIndex) => hideRows.includes(rowIndex)) ? (
        noShowRowsFallback
      ) : (
        <>
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
                selectedCellIdx={isSummaryRowSelected ? selectedPosition.idx : undefined}
                selectCell={selectSummaryCellLatest}
              />
            );
          })}
        </>
      )}
    </SimpleBar>
  );
}

function isSamePosition(p1: Position, p2: Position) {
  return p1.idx === p2.idx && p1.rowIdx === p2.rowIdx;
}

export default forwardRef(DataGrid) as <R, SR = unknown, K extends Key = Key>(
  props: DataGridProps<R, SR, K> & RefAttributes<DataGridHandle>
) => JSX.Element;
