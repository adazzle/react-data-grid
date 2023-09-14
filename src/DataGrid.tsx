import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type { Key, KeyboardEvent, RefAttributes } from 'react';
import { flushSync } from 'react-dom';
import clsx from 'clsx';

import {
  RowSelectionChangeProvider,
  RowSelectionProvider,
  useCalculatedColumns,
  useColumnWidths,
  useGridDimensions,
  useLatestFunc,
  useLayoutEffect,
  useViewportColumns,
  useViewportRows
} from './hooks';
import {
  abs,
  assertIsValidKeyGetter,
  canExitGrid,
  createCellEvent,
  getColSpan,
  getNextSelectedCellPosition,
  isCtrlKeyHeldDown,
  isDefaultCellInput,
  isSelectedCellEditable,
  renderMeasuringCells,
  scrollIntoView,
  sign
} from './utils';
import type {
  CalculatedColumn,
  CellClickArgs,
  CellKeyboardEvent,
  CellKeyDownArgs,
  CellMouseEvent,
  CellNavigationMode,
  CellSelectArgs,
  Column,
  ColumnOrColumnGroup,
  CopyEvent,
  Direction,
  FillEvent,
  Maybe,
  PasteEvent,
  Position,
  Renderers,
  RowsChangeData,
  SelectRowEvent,
  SortColumn
} from './types';
import { renderCheckbox as defaultRenderCheckbox } from './cellRenderers';
import {
  DataGridDefaultRenderersProvider,
  useDefaultRenderers
} from './DataGridDefaultRenderersProvider';
import DragHandle from './DragHandle';
import EditCell from './EditCell';
import GroupedColumnHeaderRow from './GroupedColumnHeaderRow';
import HeaderRow from './HeaderRow';
import { defaultRenderRow } from './Row';
import type { PartialPosition } from './ScrollToCell';
import ScrollToCell from './ScrollToCell';
import { default as defaultRenderSortStatus } from './sortStatus';
import {
  focusSinkClassname,
  focusSinkHeaderAndSummaryClassname,
  rootClassname,
  viewportDraggingClassname
} from './style/core';
import { rowSelected, rowSelectedWithFrozenCell } from './style/row';
import SummaryRow from './SummaryRow';

export interface SelectCellState extends Position {
  readonly mode: 'SELECT';
}

interface EditCellState<R> extends Position {
  readonly mode: 'EDIT';
  readonly row: R;
  readonly originalRow: R;
}

type DefaultColumnOptions<R, SR> = Pick<
  Column<R, SR>,
  'renderCell' | 'width' | 'minWidth' | 'maxWidth' | 'resizable' | 'sortable' | 'draggable'
>;

export interface DataGridHandle {
  element: HTMLDivElement | null;
  scrollToCell: (position: PartialPosition) => void;
  selectCell: (position: Position, enableEditor?: Maybe<boolean>) => void;
}

type SharedDivProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  | 'role'
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-describedby'
  | 'aria-rowcount'
  | 'className'
  | 'style'
>;

export interface DataGridProps<R, SR = unknown, K extends Key = Key> extends SharedDivProps {
  /**
   * Grid and data Props
   */
  /** An array of objects representing each column on the grid */
  columns: readonly ColumnOrColumnGroup<R, SR>[];
  /** A function called for each rendered row that should return a plain key/value pair object */
  rows: readonly R[];
  /**
   * Rows to be pinned at the top of the rows view for summary, the vertical scroll bar will not scroll these rows.
   */
  topSummaryRows?: Maybe<readonly SR[]>;
  /**
   * Rows to be pinned at the bottom of the rows view for summary, the vertical scroll bar will not scroll these rows.
   */
  bottomSummaryRows?: Maybe<readonly SR[]>;
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
  rowHeight?: Maybe<number | ((row: R) => number)>;
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
  onFill?: Maybe<(event: FillEvent<R>) => R>;
  onCopy?: Maybe<(event: CopyEvent<R>) => void>;
  onPaste?: Maybe<(event: PasteEvent<R>) => R>;

  /**
   * Event props
   */
  /** Function called whenever a cell is clicked */
  onCellClick?: Maybe<(args: CellClickArgs<R, SR>, event: CellMouseEvent) => void>;
  /** Function called whenever a cell is double clicked */
  onCellDoubleClick?: Maybe<(args: CellClickArgs<R, SR>, event: CellMouseEvent) => void>;
  /** Function called whenever a cell is right clicked */
  onCellContextMenu?: Maybe<(args: CellClickArgs<R, SR>, event: CellMouseEvent) => void>;
  onCellKeyDown?: Maybe<(args: CellKeyDownArgs<R, SR>, event: CellKeyboardEvent) => void>;
  /** Function called whenever cell selection is changed */
  onSelectedCellChange?: Maybe<(args: CellSelectArgs<R, SR>) => void>;
  /** Called when the grid is scrolled */
  onScroll?: Maybe<(event: React.UIEvent<HTMLDivElement>) => void>;
  /** Called when a column is resized */
  onColumnResize?: Maybe<(idx: number, width: number) => void>;
  /** Called when a column is reordered */
  onColumnsReorder?: Maybe<(sourceColumnKey: string, targetColumnKey: string) => void>;

  /**
   * Toggles and modes
   */
  /** @default true */
  enableVirtualization?: Maybe<boolean>;

  /**
   * Miscellaneous
   */
  renderers?: Maybe<Renderers<R, SR>>;
  rowClass?: Maybe<(row: R, rowIdx: number) => Maybe<string>>;
  /** @default 'ltr' */
  direction?: Maybe<Direction>;
  'data-testid'?: Maybe<string>;
}

/**
 * Main API Component to render a data grid of rows and columns
 *
 * @example
 *
 * <DataGrid columns={columns} rows={rows} />
 */
function DataGrid<R, SR, K extends Key>(
  props: DataGridProps<R, SR, K>,
  ref: React.Ref<DataGridHandle>
) {
  const {
    // Grid and data Props
    columns: rawColumns,
    rows,
    topSummaryRows,
    bottomSummaryRows,
    rowKeyGetter,
    onRowsChange,
    // Dimensions props
    rowHeight: rawRowHeight,
    headerRowHeight: rawHeaderRowHeight,
    summaryRowHeight: rawSummaryRowHeight,
    // Feature props
    selectedRows,
    onSelectedRowsChange,
    sortColumns,
    onSortColumnsChange,
    defaultColumnOptions,
    // Event props
    onCellClick,
    onCellDoubleClick,
    onCellContextMenu,
    onCellKeyDown,
    onSelectedCellChange,
    onScroll,
    onColumnResize,
    onColumnsReorder,
    onFill,
    onCopy,
    onPaste,
    // Toggles and modes
    enableVirtualization: rawEnableVirtualization,
    // Miscellaneous
    renderers,
    className,
    style,
    rowClass,
    direction: rawDirection,
    // ARIA
    role: rawRole,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    'aria-rowcount': rawAriaRowCount,
    'data-testid': testId
  } = props;

  /**
   * defaults
   */
  const defaultRenderers = useDefaultRenderers<R, SR>();
  const role = rawRole ?? 'grid';
  const rowHeight = rawRowHeight ?? 35;
  const headerRowHeight = rawHeaderRowHeight ?? (typeof rowHeight === 'number' ? rowHeight : 35);
  const summaryRowHeight = rawSummaryRowHeight ?? (typeof rowHeight === 'number' ? rowHeight : 35);
  const renderRow = renderers?.renderRow ?? defaultRenderers?.renderRow ?? defaultRenderRow;
  const renderSortStatus =
    renderers?.renderSortStatus ?? defaultRenderers?.renderSortStatus ?? defaultRenderSortStatus;
  const renderCheckbox =
    renderers?.renderCheckbox ?? defaultRenderers?.renderCheckbox ?? defaultRenderCheckbox;
  const noRowsFallback = renderers?.noRowsFallback ?? defaultRenderers?.noRowsFallback;
  const enableVirtualization = rawEnableVirtualization ?? true;
  const direction = rawDirection ?? 'ltr';

  /**
   * states
   */
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [resizedColumnWidths, setResizedColumnWidths] = useState(
    (): ReadonlyMap<string, number> => new Map()
  );
  const [measuredColumnWidths, setMeasuredColumnWidths] = useState(
    (): ReadonlyMap<string, number> => new Map()
  );
  const [copiedCell, setCopiedCell] = useState<{ row: R; columnKey: string } | null>(null);
  const [isDragging, setDragging] = useState(false);
  const [draggedOverRowIdx, setOverRowIdx] = useState<number | undefined>(undefined);
  const [scrollToPosition, setScrollToPosition] = useState<PartialPosition | null>(null);

  const [gridRef, gridWidth, gridHeight] = useGridDimensions();
  const {
    columns,
    colSpanColumns,
    lastFrozenColumnIndex,
    headerRowsCount,
    colOverscanStartIdx,
    colOverscanEndIdx,
    templateColumns,
    layoutCssVars,
    totalFrozenColumnWidth
  } = useCalculatedColumns({
    rawColumns,
    defaultColumnOptions,
    measuredColumnWidths,
    resizedColumnWidths,
    scrollLeft,
    viewportWidth: gridWidth,
    enableVirtualization
  });

  const topSummaryRowsCount = topSummaryRows?.length ?? 0;
  const bottomSummaryRowsCount = bottomSummaryRows?.length ?? 0;
  const summaryRowsCount = topSummaryRowsCount + bottomSummaryRowsCount;
  const headerAndTopSummaryRowsCount = headerRowsCount + topSummaryRowsCount;
  const groupedColumnHeaderRowsCount = headerRowsCount - 1;
  const minRowIdx = -headerAndTopSummaryRowsCount;
  const mainHeaderRowIdx = minRowIdx + groupedColumnHeaderRowsCount;
  const maxRowIdx = rows.length + bottomSummaryRowsCount - 1;

  const [selectedPosition, setSelectedPosition] = useState(
    (): SelectCellState | EditCellState<R> => ({ idx: -1, rowIdx: minRowIdx - 1, mode: 'SELECT' })
  );

  /**
   * refs
   */
  const prevSelectedPosition = useRef(selectedPosition);
  const latestDraggedOverRowIdx = useRef(draggedOverRowIdx);
  const lastSelectedRowIdx = useRef(-1);
  const focusSinkRef = useRef<HTMLDivElement>(null);
  const shouldFocusCellRef = useRef(false);

  /**
   * computed values
   */
  const isTreeGrid = role === 'treegrid';
  const headerRowsHeight = headerRowsCount * headerRowHeight;
  const clientHeight = gridHeight - headerRowsHeight - summaryRowsCount * summaryRowHeight;
  const isSelectable = selectedRows != null && onSelectedRowsChange != null;
  const isRtl = direction === 'rtl';
  const leftKey = isRtl ? 'ArrowRight' : 'ArrowLeft';
  const rightKey = isRtl ? 'ArrowLeft' : 'ArrowRight';
  const ariaRowCount = rawAriaRowCount ?? headerRowsCount + rows.length + summaryRowsCount;

  const defaultGridComponents = useMemo(
    () => ({
      renderCheckbox,
      renderSortStatus
    }),
    [renderCheckbox, renderSortStatus]
  );

  const allRowsSelected = useMemo((): boolean => {
    // no rows to select = explicitely unchecked
    const { length } = rows;
    return (
      length !== 0 &&
      selectedRows != null &&
      rowKeyGetter != null &&
      selectedRows.size >= length &&
      rows.every((row) => selectedRows.has(rowKeyGetter(row)))
    );
  }, [rows, selectedRows, rowKeyGetter]);

  const {
    rowOverscanStartIdx,
    rowOverscanEndIdx,
    totalRowHeight,
    gridTemplateRows,
    getRowTop,
    getRowHeight,
    findRowIdx
  } = useViewportRows({
    rows,
    rowHeight,
    clientHeight,
    scrollTop,
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
    topSummaryRows,
    bottomSummaryRows
  });

  const { gridTemplateColumns, handleColumnResize } = useColumnWidths(
    columns,
    viewportColumns,
    templateColumns,
    gridRef,
    gridWidth,
    resizedColumnWidths,
    measuredColumnWidths,
    setResizedColumnWidths,
    setMeasuredColumnWidths,
    onColumnResize
  );

  const minColIdx = isTreeGrid ? -1 : 0;
  const maxColIdx = columns.length - 1;
  const selectedCellIsWithinSelectionBounds = isCellWithinSelectionBounds(selectedPosition);
  const selectedCellIsWithinViewportBounds = isCellWithinViewportBounds(selectedPosition);

  /**
   * The identity of the wrapper function is stable so it won't break memoization
   */
  const handleColumnResizeLatest = useLatestFunc(handleColumnResize);
  const onColumnsReorderLastest = useLatestFunc(onColumnsReorder);
  const onSortColumnsChangeLatest = useLatestFunc(onSortColumnsChange);
  const onCellClickLatest = useLatestFunc(onCellClick);
  const onCellDoubleClickLatest = useLatestFunc(onCellDoubleClick);
  const onCellContextMenuLatest = useLatestFunc(onCellContextMenu);
  const selectRowLatest = useLatestFunc(selectRow);
  const handleFormatterRowChangeLatest = useLatestFunc(updateRow);
  const selectCellLatest = useLatestFunc(selectCell);
  const selectHeaderCellLatest = useLatestFunc(({ idx, rowIdx }: Position) => {
    selectCell({ rowIdx: minRowIdx + rowIdx - 1, idx });
  });

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

    if (selectedPosition.idx === -1) {
      focusSinkRef.current!.focus({ preventScroll: true });
      scrollIntoView(focusSinkRef.current);
    }
  });

  useLayoutEffect(() => {
    if (!shouldFocusCellRef.current) return;
    shouldFocusCellRef.current = false;
    focusCellOrCellContent();
  });

  useImperativeHandle(ref, () => ({
    element: gridRef.current,
    scrollToCell({ idx, rowIdx }) {
      const scrollToIdx =
        idx !== undefined && idx > lastFrozenColumnIndex && idx < columns.length ? idx : undefined;
      const scrollToRowIdx =
        rowIdx !== undefined && isRowIdxWithinViewportBounds(rowIdx) ? rowIdx : undefined;

      if (scrollToIdx !== undefined || scrollToRowIdx !== undefined) {
        setScrollToPosition({ idx: scrollToIdx, rowIdx: scrollToRowIdx });
      }
    },
    selectCell
  }));

  /**
   * callbacks
   */
  const setDraggedOverRowIdx = useCallback((rowIdx?: number) => {
    setOverRowIdx(rowIdx);
    latestDraggedOverRowIdx.current = rowIdx;
  }, []);

  /**
   * event handlers
   */
  function selectRow(args: SelectRowEvent<R>) {
    if (!onSelectedRowsChange) return;

    assertIsValidKeyGetter<R, K>(rowKeyGetter);

    if (args.type === 'HEADER') {
      const newSelectedRows = new Set(selectedRows);
      for (const row of rows) {
        const rowKey = rowKeyGetter(row);
        if (args.checked) {
          newSelectedRows.add(rowKey);
        } else {
          newSelectedRows.delete(rowKey);
        }
      }
      onSelectedRowsChange(newSelectedRows);
      return;
    }

    const { row, checked, isShiftClick } = args;
    const newSelectedRows = new Set(selectedRows);
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
          newSelectedRows.add(rowKeyGetter(row));
        }
      }
    } else {
      newSelectedRows.delete(rowKey);
      lastSelectedRowIdx.current = -1;
    }

    onSelectedRowsChange(newSelectedRows);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const { idx, rowIdx, mode } = selectedPosition;
    if (mode === 'EDIT') return;

    if (onCellKeyDown && isRowIdxWithinViewportBounds(rowIdx)) {
      const row = rows[rowIdx];
      const cellEvent = createCellEvent(event);
      onCellKeyDown(
        {
          mode: 'SELECT',
          row,
          column: columns[idx],
          rowIdx,
          selectCell
        },
        cellEvent
      );
      if (cellEvent.isGridDefaultPrevented()) return;
    }
    if (!(event.target instanceof Element)) return;
    const isCellEvent = event.target.closest('.rdg-cell') !== null;
    const isRowEvent = isTreeGrid && event.target === focusSinkRef.current;
    if (!isCellEvent && !isRowEvent) return;

    const { keyCode } = event;

    if (
      selectedCellIsWithinViewportBounds &&
      (onPaste != null || onCopy != null) &&
      isCtrlKeyHeldDown(event)
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

    switch (event.key) {
      case 'Escape':
        setCopiedCell(null);
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

  function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    const { scrollTop, scrollLeft } = event.currentTarget;
    flushSync(() => {
      setScrollTop(scrollTop);
      // scrollLeft is nagative when direction is rtl
      setScrollLeft(abs(scrollLeft));
    });
    onScroll?.(event);
  }

  function updateRow(column: CalculatedColumn<R, SR>, rowIdx: number, row: R) {
    if (typeof onRowsChange !== 'function') return;
    if (row === rows[rowIdx]) return;
    const updatedRows = [...rows];
    updatedRows[rowIdx] = row;
    onRowsChange(updatedRows, {
      indexes: [rowIdx],
      column
    });
  }

  function commitEditorChanges() {
    if (selectedPosition.mode !== 'EDIT') return;
    updateRow(columns[selectedPosition.idx], selectedPosition.rowIdx, selectedPosition.row);
  }

  function handleCopy() {
    const { idx, rowIdx } = selectedPosition;
    const sourceRow = rows[rowIdx];
    const sourceColumnKey = columns[idx].key;
    setCopiedCell({ row: sourceRow, columnKey: sourceColumnKey });
    onCopy?.({ sourceRow, sourceColumnKey });
  }

  function handlePaste() {
    if (!onPaste || !onRowsChange || copiedCell === null || !isCellEditable(selectedPosition)) {
      return;
    }

    const { idx, rowIdx } = selectedPosition;
    const targetColumn = columns[idx];
    const targetRow = rows[rowIdx];

    const updatedTargetRow = onPaste({
      sourceRow: copiedCell.row,
      sourceColumnKey: copiedCell.columnKey,
      targetRow,
      targetColumnKey: targetColumn.key
    });

    updateRow(targetColumn, rowIdx, updatedTargetRow);
  }

  function handleCellInput(event: KeyboardEvent<HTMLDivElement>) {
    if (!selectedCellIsWithinViewportBounds) return;
    const row = rows[selectedPosition.rowIdx];
    const { key, shiftKey } = event;

    // Select the row on Shift + Space
    if (isSelectable && shiftKey && key === ' ') {
      assertIsValidKeyGetter<R, K>(rowKeyGetter);
      const rowKey = rowKeyGetter(row);
      selectRow({ type: 'ROW', row, checked: !selectedRows.has(rowKey), isShiftClick: false });
      // do not scroll
      event.preventDefault();
      return;
    }

    if (isCellEditable(selectedPosition) && isDefaultCellInput(event)) {
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
      isSelectedCellEditable({ columns, rows, selectedPosition: position })
    );
  }

  function selectCell(position: Position, enableEditor?: Maybe<boolean>): void {
    if (!isCellWithinSelectionBounds(position)) return;
    commitEditorChanges();

    const row = rows[position.rowIdx];
    const samePosition = isSamePosition(selectedPosition, position);

    if (enableEditor && isCellEditable(position)) {
      setSelectedPosition({ ...position, mode: 'EDIT', row, originalRow: row });
    } else if (samePosition) {
      // Avoid re-renders if the selected cell state is the same
      scrollIntoView(getCellToScroll(gridRef.current!));
    } else {
      shouldFocusCellRef.current = true;
      setSelectedPosition({ ...position, mode: 'SELECT' });
    }

    if (onSelectedCellChange && !samePosition) {
      onSelectedCellChange({
        rowIdx: position.rowIdx,
        row,
        column: columns[position.idx]
      });
    }
  }

  function getNextPosition(key: string, ctrlKey: boolean, shiftKey: boolean): Position {
    const { idx, rowIdx } = selectedPosition;
    const isRowSelected = selectedCellIsWithinSelectionBounds && idx === -1;

    switch (key) {
      case 'ArrowUp':
        return { idx, rowIdx: rowIdx - 1 };
      case 'ArrowDown':
        return { idx, rowIdx: rowIdx + 1 };
      case leftKey:
        return { idx: idx - 1, rowIdx };
      case rightKey:
        return { idx: idx + 1, rowIdx };
      case 'Tab':
        return { idx: idx + (shiftKey ? -1 : 1), rowIdx };
      case 'Home':
        // If row is selected then move focus to the first row
        if (isRowSelected) return { idx, rowIdx: minRowIdx };
        return { idx: 0, rowIdx: ctrlKey ? minRowIdx : rowIdx };
      case 'End':
        // If row is selected then move focus to the last row.
        if (isRowSelected) return { idx, rowIdx: maxRowIdx };
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

  function navigate(event: KeyboardEvent<HTMLDivElement>) {
    const { key, shiftKey } = event;
    let cellNavigationMode: CellNavigationMode = 'NONE';
    if (key === 'Tab') {
      if (
        canExitGrid({
          shiftKey,
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

      cellNavigationMode = 'CHANGE_ROW';
    }

    // Do not allow focus to leave and prevent scrolling
    event.preventDefault();

    const ctrlKey = isCtrlKeyHeldDown(event);
    const nextPosition = getNextPosition(key, ctrlKey, shiftKey);
    if (isSamePosition(selectedPosition, nextPosition)) return;

    const nextSelectedCellPosition = getNextSelectedCellPosition({
      moveUp: key === 'ArrowUp',
      moveNext: key === rightKey || (key === 'Tab' && !shiftKey),
      columns,
      colSpanColumns,
      rows,
      topSummaryRows,
      bottomSummaryRows,
      minRowIdx,
      mainHeaderRowIdx,
      maxRowIdx,
      lastFrozenColumnIndex,
      cellNavigationMode,
      currentPosition: selectedPosition,
      nextPosition,
      isCellWithinBounds: isCellWithinSelectionBounds
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

  function focusCellOrCellContent() {
    const cell = getCellToScroll(gridRef.current!);
    if (cell === null) return;

    scrollIntoView(cell);
    // Focus cell content when available instead of the cell itself
    const elementToFocus = cell.querySelector<Element & HTMLOrSVGElement>('[tabindex="0"]') ?? cell;
    elementToFocus.focus({ preventScroll: true });
  }

  function renderDragHandle() {
    if (
      onFill == null ||
      selectedPosition.mode === 'EDIT' ||
      !isCellWithinViewportBounds(selectedPosition)
    ) {
      return;
    }

    return (
      <DragHandle
        gridRowStart={headerAndTopSummaryRowsCount + selectedPosition.rowIdx + 1}
        rows={rows}
        columns={columns}
        selectedPosition={selectedPosition}
        isCellEditable={isCellEditable}
        latestDraggedOverRowIdx={latestDraggedOverRowIdx}
        onRowsChange={onRowsChange}
        onClick={focusCellOrCellContent}
        onFill={onFill}
        setDragging={setDragging}
        setDraggedOverRowIdx={setDraggedOverRowIdx}
      />
    );
  }

  function getCellEditor(rowIdx: number) {
    if (selectedPosition.rowIdx !== rowIdx || selectedPosition.mode === 'SELECT') return;

    const { idx, row } = selectedPosition;
    const column = columns[idx];
    const colSpan = getColSpan(column, lastFrozenColumnIndex, { type: 'ROW', row });

    const closeEditor = (shouldFocusCell: boolean) => {
      shouldFocusCellRef.current = shouldFocusCell;
      setSelectedPosition(({ idx, rowIdx }) => ({ idx, rowIdx, mode: 'SELECT' }));
    };

    const onRowChange = (row: R, commitChanges: boolean, shouldFocusCell: boolean) => {
      if (commitChanges) {
        // Prevents two issues when editor is closed by clicking on a different cell
        //
        // Otherwise commitEditorChanges may be called before the cell state is changed to
        // SELECT and this results in onRowChange getting called twice.
        flushSync(() => {
          updateRow(column, selectedPosition.rowIdx, row);
          closeEditor(shouldFocusCell);
        });
      } else {
        setSelectedPosition((position) => ({ ...position, row }));
      }
    };

    if (rows[selectedPosition.rowIdx] !== selectedPosition.originalRow) {
      // Discard changes if rows are updated from outside
      closeEditor(false);
    }

    return (
      <EditCell
        key={column.key}
        column={column}
        colSpan={colSpan}
        row={row}
        rowIdx={rowIdx}
        onRowChange={onRowChange}
        closeEditor={closeEditor}
        onKeyDown={onCellKeyDown}
        navigate={navigate}
      />
    );
  }

  function getRowViewportColumns(rowIdx: number) {
    // idx can be -1 if grouping is enabled
    const selectedColumn = selectedPosition.idx === -1 ? undefined : columns[selectedPosition.idx];
    if (
      selectedColumn !== undefined &&
      selectedPosition.rowIdx === rowIdx &&
      !viewportColumns.includes(selectedColumn)
    ) {
      // Add the selected column to viewport columns if the cell is not within the viewport
      return selectedPosition.idx > colOverscanEndIdx
        ? [...viewportColumns, selectedColumn]
        : [
            ...viewportColumns.slice(0, lastFrozenColumnIndex + 1),
            selectedColumn,
            ...viewportColumns.slice(lastFrozenColumnIndex + 1)
          ];
    }
    return viewportColumns;
  }

  function getViewportRows() {
    const rowElements: React.ReactNode[] = [];

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
      const selectedColumn = selectedIdx === -1 ? undefined : columns[selectedIdx];
      if (selectedColumn !== undefined) {
        if (isRowOutsideViewport) {
          // if the row is outside the viewport then only render the selected cell
          rowColumns = [selectedColumn];
        } else {
          // if the row is within the viewport and cell is not, add the selected column to viewport columns
          rowColumns = getRowViewportColumns(rowIdx);
        }
      }

      const row = rows[rowIdx];
      const gridRowStart = headerAndTopSummaryRowsCount + rowIdx + 1;
      let key: K | number = rowIdx;
      let isRowSelected = false;
      if (typeof rowKeyGetter === 'function') {
        key = rowKeyGetter(row);
        isRowSelected = selectedRows?.has(key) ?? false;
      }

      rowElements.push(
        renderRow(key, {
          // aria-rowindex is 1 based
          'aria-rowindex': headerAndTopSummaryRowsCount + rowIdx + 1,
          'aria-selected': isSelectable ? isRowSelected : undefined,
          rowIdx,
          row,
          viewportColumns: rowColumns,
          isRowSelected,
          onCellClick: onCellClickLatest,
          onCellDoubleClick: onCellDoubleClickLatest,
          onCellContextMenu: onCellContextMenuLatest,
          rowClass,
          gridRowStart,
          height: getRowHeight(rowIdx),
          copiedCellIdx:
            copiedCell !== null && copiedCell.row === row
              ? columns.findIndex((c) => c.key === copiedCell.columnKey)
              : undefined,

          selectedCellIdx: selectedRowIdx === rowIdx ? selectedIdx : undefined,
          draggedOverCellIdx: getDraggedOverCellIdx(rowIdx),
          setDraggedOverRowIdx: isDragging ? setDraggedOverRowIdx : undefined,
          lastFrozenColumnIndex,
          onRowChange: handleFormatterRowChangeLatest,
          selectCell: selectCellLatest,
          selectedCellEditor: getCellEditor(rowIdx)
        })
      );
    }

    return rowElements;
  }

  // Reset the positions if the current values are no longer valid. This can happen if a column or row is removed
  if (selectedPosition.idx > maxColIdx || selectedPosition.rowIdx > maxRowIdx) {
    setSelectedPosition({ idx: -1, rowIdx: minRowIdx - 1, mode: 'SELECT' });
    setDraggedOverRowIdx(undefined);
  }

  let templateRows = `repeat(${headerRowsCount}, ${headerRowHeight}px)`;
  if (topSummaryRowsCount > 0) {
    templateRows += ` repeat(${topSummaryRowsCount}, ${summaryRowHeight}px)`;
  }
  if (rows.length > 0) {
    templateRows += gridTemplateRows;
  }
  if (bottomSummaryRowsCount > 0) {
    templateRows += ` repeat(${bottomSummaryRowsCount}, ${summaryRowHeight}px)`;
  }

  const isGroupRowFocused =
    selectedPosition.idx === -1 && selectedPosition.rowIdx !== minRowIdx - 1;

  return (
    <div
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-multiselectable={isSelectable ? true : undefined}
      aria-colcount={columns.length}
      aria-rowcount={ariaRowCount}
      className={clsx(
        rootClassname,
        {
          [viewportDraggingClassname]: isDragging
        },
        className
      )}
      style={
        {
          ...style,
          // set scrollPadding to correctly position non-sticky cells after scrolling
          scrollPaddingInlineStart:
            selectedPosition.idx > lastFrozenColumnIndex || scrollToPosition?.idx !== undefined
              ? `${totalFrozenColumnWidth}px`
              : undefined,
          scrollPaddingBlock:
            isRowIdxWithinViewportBounds(selectedPosition.rowIdx) ||
            scrollToPosition?.rowIdx !== undefined
              ? `${headerRowsHeight + topSummaryRowsCount * summaryRowHeight}px ${
                  bottomSummaryRowsCount * summaryRowHeight
                }px`
              : undefined,
          gridTemplateColumns,
          gridTemplateRows: templateRows,
          '--rdg-header-row-height': `${headerRowHeight}px`,
          '--rdg-summary-row-height': `${summaryRowHeight}px`,
          '--rdg-sign': isRtl ? -1 : 1,
          ...layoutCssVars
        } as unknown as React.CSSProperties
      }
      dir={direction}
      ref={gridRef}
      onScroll={handleScroll}
      onKeyDown={handleKeyDown}
      data-testid={testId}
    >
      <DataGridDefaultRenderersProvider value={defaultGridComponents}>
        <RowSelectionChangeProvider value={selectRowLatest}>
          <RowSelectionProvider value={allRowsSelected}>
            {Array.from({ length: groupedColumnHeaderRowsCount }, (_, index) => (
              <GroupedColumnHeaderRow
                key={index}
                rowIdx={index + 1}
                level={-groupedColumnHeaderRowsCount + index}
                columns={getRowViewportColumns(minRowIdx + index)}
                selectedCellIdx={
                  selectedPosition.rowIdx === minRowIdx + index ? selectedPosition.idx : undefined
                }
                selectCell={selectHeaderCellLatest}
              />
            ))}
            <HeaderRow
              rowIdx={headerRowsCount}
              columns={getRowViewportColumns(mainHeaderRowIdx)}
              onColumnResize={handleColumnResizeLatest}
              onColumnsReorder={onColumnsReorderLastest}
              sortColumns={sortColumns}
              onSortColumnsChange={onSortColumnsChangeLatest}
              lastFrozenColumnIndex={lastFrozenColumnIndex}
              selectedCellIdx={
                selectedPosition.rowIdx === mainHeaderRowIdx ? selectedPosition.idx : undefined
              }
              selectCell={selectHeaderCellLatest}
              shouldFocusGrid={!selectedCellIsWithinSelectionBounds}
              direction={direction}
            />
          </RowSelectionProvider>
          {rows.length === 0 && noRowsFallback ? (
            noRowsFallback
          ) : (
            <>
              {topSummaryRows?.map((row, rowIdx) => {
                const gridRowStart = headerRowsCount + 1 + rowIdx;
                const summaryRowIdx = mainHeaderRowIdx + 1 + rowIdx;
                const isSummaryRowSelected = selectedPosition.rowIdx === summaryRowIdx;
                const top = headerRowsHeight + summaryRowHeight * rowIdx;

                return (
                  <SummaryRow
                    key={rowIdx}
                    aria-rowindex={gridRowStart}
                    rowIdx={summaryRowIdx}
                    gridRowStart={gridRowStart}
                    row={row}
                    top={top}
                    bottom={undefined}
                    viewportColumns={getRowViewportColumns(summaryRowIdx)}
                    lastFrozenColumnIndex={lastFrozenColumnIndex}
                    selectedCellIdx={isSummaryRowSelected ? selectedPosition.idx : undefined}
                    isTop
                    showBorder={rowIdx === topSummaryRowsCount - 1}
                    selectCell={selectCellLatest}
                  />
                );
              })}
              {getViewportRows()}
              {bottomSummaryRows?.map((row, rowIdx) => {
                const gridRowStart = headerAndTopSummaryRowsCount + rows.length + rowIdx + 1;
                const summaryRowIdx = rows.length + rowIdx;
                const isSummaryRowSelected = selectedPosition.rowIdx === summaryRowIdx;
                const top =
                  clientHeight > totalRowHeight
                    ? gridHeight - summaryRowHeight * (bottomSummaryRows.length - rowIdx)
                    : undefined;
                const bottom =
                  top === undefined
                    ? summaryRowHeight * (bottomSummaryRows.length - 1 - rowIdx)
                    : undefined;

                return (
                  <SummaryRow
                    aria-rowindex={ariaRowCount - bottomSummaryRowsCount + rowIdx + 1}
                    key={rowIdx}
                    rowIdx={summaryRowIdx}
                    gridRowStart={gridRowStart}
                    row={row}
                    top={top}
                    bottom={bottom}
                    viewportColumns={getRowViewportColumns(summaryRowIdx)}
                    lastFrozenColumnIndex={lastFrozenColumnIndex}
                    selectedCellIdx={isSummaryRowSelected ? selectedPosition.idx : undefined}
                    isTop={false}
                    showBorder={rowIdx === 0}
                    selectCell={selectCellLatest}
                  />
                );
              })}
            </>
          )}
        </RowSelectionChangeProvider>
      </DataGridDefaultRenderersProvider>

      {renderDragHandle()}

      {/* render empty cells that span only 1 column so we can safely measure column widths, regardless of colSpan */}
      {renderMeasuringCells(viewportColumns)}

      {/* extra div is needed for row navigation in a treegrid */}
      {isTreeGrid && (
        <div
          ref={focusSinkRef}
          tabIndex={isGroupRowFocused ? 0 : -1}
          className={clsx(focusSinkClassname, {
            [focusSinkHeaderAndSummaryClassname]: !isRowIdxWithinViewportBounds(
              selectedPosition.rowIdx
            ),
            [rowSelected]: isGroupRowFocused,
            [rowSelectedWithFrozenCell]: isGroupRowFocused && lastFrozenColumnIndex !== -1
          })}
          style={{
            gridRowStart: selectedPosition.rowIdx + headerAndTopSummaryRowsCount + 1
          }}
        />
      )}

      {scrollToPosition !== null && (
        <ScrollToCell
          scrollToPosition={scrollToPosition}
          setScrollToCellPosition={setScrollToPosition}
          gridElement={gridRef.current!}
        />
      )}
    </div>
  );
}

function getCellToScroll(gridEl: HTMLDivElement) {
  return gridEl.querySelector<HTMLDivElement>(':scope > [role="row"] > [tabindex="0"]');
}

function isSamePosition(p1: Position, p2: Position) {
  return p1.idx === p2.idx && p1.rowIdx === p2.rowIdx;
}

export default forwardRef(DataGrid) as <R, SR = unknown, K extends Key = Key>(
  props: DataGridProps<R, SR, K> & RefAttributes<DataGridHandle>
) => JSX.Element;
