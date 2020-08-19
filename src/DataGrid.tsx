import React, {
  forwardRef,
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useImperativeHandle,
  useCallback,
  createElement
} from 'react';
import clsx from 'clsx';

import { useGridWidth, useViewportColumns, useViewportRows } from './hooks';
import EventBus from './EventBus';
import HeaderRow from './HeaderRow';
import FilterRow from './FilterRow';
import Row from './Row';
import GroupRowRenderer from './GroupRow';
import SummaryRow from './SummaryRow';
import {
  assertIsValidKey,
  getColumnScrollPosition,
  getScrollbarSize,
  getNextSelectedCellPosition,
  isSelectedCellEditable,
  canExitGrid,
  isCtrlKeyHeldDown,
  isDefaultCellInput,
  isGroupedRow
} from './utils';

import {
  CalculatedColumn,
  CheckCellIsEditableEvent,
  Column,
  Filters,
  Position,
  RowRendererProps,
  RowsUpdateEvent,
  SelectRowEvent,
  CommitEvent,
  SelectedCellProps,
  EditCellProps,
  Dictionary
} from './types';
import { CellNavigationMode, SortDirection, UpdateActions } from './enums';

interface SelectCellState extends Position {
  mode: 'SELECT';
}

interface EditCellState<R> extends Position {
  mode: 'EDIT';
  row: R;
  originalRow: R;
  key: string | null;
}

type DefaultColumnOptions<R, SR> = Pick<Column<R, SR>,
  | 'formatter'
  | 'minWidth'
  | 'resizable'
  | 'sortable'
>;

export interface DataGridHandle {
  scrollToColumn: (colIdx: number) => void;
  scrollToRow: (rowIdx: number) => void;
  selectCell: (position: Position, openEditor?: boolean) => void;
  commitChanges: () => void;
}

type SharedDivProps = Pick<React.HTMLAttributes<HTMLDivElement>,
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-describedby'
>;

export interface DataGridProps<R, K extends keyof R, SR = unknown> extends SharedDivProps {
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
  summaryRows?: readonly SR[];
  /** The primary key property of each row */
  rowKey?: K;
  /**
   * Callback called whenever row data is updated
   * When editing is enabled, this callback will be called for the following scenarios
   * 1. Using the supplied editor of the column. The default editor is the SimpleTextEditor.
   * 2. Copy/pasting the value from one cell to another <kbd>CTRL</kbd>+<kbd>C</kbd>, <kbd>CTRL</kbd>+<kbd>V</kbd>
   * 3. Update multiple cells by dragging the fill handle of a cell up or down to a destination cell.
   * 4. Update all cells under a given cell by double clicking the cell's fill handle.
   */
  onRowsUpdate?: <E extends RowsUpdateEvent>(event: E) => void;
  onRowsChange?: (rows: R[]) => void;

  /**
   * Dimensions props
   */
  /** The width of the grid in pixels */
  width?: number;
  /** The height of the grid in pixels */
  height?: number;
  /** The height of each row in pixels */
  rowHeight?: number;
  /** The height of the header row in pixels */
  headerRowHeight?: number;
  /** The height of the header filter row in pixels */
  headerFiltersHeight?: number;

  /**
   * Feature props
   */
  /** Set of selected row keys */
  selectedRows?: ReadonlySet<R[K]>;
  /** Function called whenever row selection is changed */
  onSelectedRowsChange?: (selectedRows: Set<R[K]>) => void;
  /** The key of the column which is currently being sorted */
  sortColumn?: string;
  /** The direction to sort the sortColumn*/
  sortDirection?: SortDirection;
  /** Function called whenever grid is sorted*/
  onSort?: (columnKey: string, direction: SortDirection) => void;
  filters?: Filters;
  onFiltersChange?: (filters: Filters) => void;
  defaultColumnOptions?: DefaultColumnOptions<R, SR>;
  groupBy?: readonly string[];
  rowGrouper?: (rows: readonly R[], columnKey: string) => Dictionary<R[]>;

  /**
   * Custom renderers
   */
  rowRenderer?: React.ComponentType<RowRendererProps<R, SR>>;
  emptyRowsRenderer?: React.ComponentType;

  /**
   * Event props
   */
  /** Function called whenever a row is clicked */
  onRowClick?: (rowIdx: number, row: R, column: CalculatedColumn<R, SR>) => void;
  /** Called when the grid is scrolled */
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  /** Called when a column is resized */
  onColumnResize?: (idx: number, width: number) => void;
  /** Function called whenever selected cell is changed */
  onSelectedCellChange?: (position: Position) => void;
  /** called before cell is set active, returns a boolean to determine whether cell is editable */
  onCheckCellIsEditable?: (event: CheckCellIsEditableEvent<R, SR>) => boolean;

  /**
   * Toggles and modes
   */
  /** Toggles whether filters row is displayed or not */
  enableFilters?: boolean;
  enableCellCopyPaste?: boolean;
  enableCellDragAndDrop?: boolean;
  cellNavigationMode?: CellNavigationMode;

  /**
   * Miscellaneous
   */
  /** The node where the editor portal should mount. */
  editorPortalTarget?: Element;
  rowClass?: (row: R) => string | undefined;
}

/**
 * Main API Component to render a data grid of rows and columns
 *
 * @example
 *
 * <DataGrid columns={columns} rows={rows} />
*/
function DataGrid<R, K extends keyof R, SR>({
  // Grid and data Props
  columns: rawColumns,
  rows: rawRows,
  summaryRows,
  rowKey,
  onRowsUpdate,
  onRowsChange,
  // Dimensions props
  width,
  height = 350,
  rowHeight = 35,
  headerRowHeight = rowHeight,
  headerFiltersHeight = 45,
  // Feature props
  selectedRows,
  onSelectedRowsChange,
  sortColumn,
  sortDirection,
  onSort,
  filters,
  onFiltersChange,
  defaultColumnOptions,
  groupBy: rawGroupBy,
  rowGrouper,
  // Custom renderers
  rowRenderer: RowRenderer = Row,
  emptyRowsRenderer,
  // Event props
  onRowClick,
  onScroll,
  onColumnResize,
  onSelectedCellChange,
  onCheckCellIsEditable,
  // Toggles and modes
  enableFilters = false,
  enableCellCopyPaste = false,
  enableCellDragAndDrop = false,
  cellNavigationMode = CellNavigationMode.NONE,
  // Miscellaneous
  editorPortalTarget = document.body,
  rowClass,
  // ARIA
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy
}: DataGridProps<R, K, SR>, ref: React.Ref<DataGridHandle>) {
  /**
   * states
   */
  const [eventBus] = useState(() => new EventBus());
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [columnWidths, setColumnWidths] = useState<ReadonlyMap<string, number>>(() => new Map());
  const [selectedPosition, setSelectedPosition] = useState<SelectCellState | EditCellState<R>>({ idx: -1, rowIdx: -1, mode: 'SELECT' });
  const [copiedPosition, setCopiedPosition] = useState<Position & { value: unknown } | null>(null);
  const [isDragging, setDragging] = useState(false);
  const [draggedOverRowIdx, setOverRowIdx] = useState<number | undefined>(undefined);

  // TODO: change it to props
  const [expandedGroupIds, setExpandedGroupIds] = useState<Set<unknown>>(new Set());

  const setDraggedOverRowIdx = useCallback((rowIdx?: number) => {
    setOverRowIdx(rowIdx);
    latestDraggedOverRowIdx.current = rowIdx;
  }, []);

  /**
   * refs
   */
  const focusSinkRef = useRef<HTMLDivElement>(null);
  const prevSelectedPosition = useRef(selectedPosition);
  const latestDraggedOverRowIdx = useRef(draggedOverRowIdx);
  const lastSelectedRowIdx = useRef(-1);

  /**
   * computed values
   */
  const [gridRef, gridWidth] = useGridWidth(width);
  const viewportWidth = gridWidth - 2; // 2 for border width;
  const headerRowsCount = enableFilters ? 2 : 1;
  const summaryRowsCount = summaryRows?.length ?? 0;
  const isSelectable = selectedRows !== undefined && onSelectedRowsChange !== undefined;

  const { columns, viewportColumns, totalColumnWidth, lastFrozenColumnIndex, groupBy } = useViewportColumns({
    columns: rawColumns,
    columnWidths,
    scrollLeft,
    viewportWidth,
    defaultColumnOptions,
    groupBy: rawGroupBy,
    rowGrouper
  });

  const totalHeaderHeight = headerRowHeight + (enableFilters ? headerFiltersHeight : 0);
  const clientHeight = height
    - 2 // border width
    - totalHeaderHeight
    - summaryRowsCount * rowHeight
    - (totalColumnWidth > viewportWidth ? getScrollbarSize() : 0);

  const { viewportRows, rows, startRowIdx, rowsCount } = useViewportRows({
    rawRows,
    groupBy,
    rowGrouper,
    rowHeight,
    clientHeight,
    scrollTop,
    expandedGroupIds
  });

  const hasGroups = groupBy.length > 0 && rowGrouper;

  if (hasGroups) {
    // TODO: finalize if these flags need to be supported on treegrid
    enableCellDragAndDrop = false;
    enableCellDragAndDrop = false;
  }

  /**
   * effects
   */
  useLayoutEffect(() => {
    if (selectedPosition === prevSelectedPosition.current || selectedPosition.mode === 'EDIT' || !isCellWithinBounds(selectedPosition)) return;
    prevSelectedPosition.current = selectedPosition;
    scrollToCell(selectedPosition);

    const row = rows[selectedPosition.rowIdx];
    if (isGroupedRow(row)) return;

    // Let the formatter handle focus
    const column = columns[selectedPosition.idx];
    if (column.formatterOptions?.focusable) return;

    focusSinkRef.current!.focus();
  });

  useEffect(() => {
    if (!onSelectedRowsChange) return;

    const handleRowSelectionChange = ({ rowIdx, checked, isShiftClick }: SelectRowEvent) => {
      assertIsValidKey(rowKey);
      const newSelectedRows = new Set(selectedRows);
      const row = rows[rowIdx];
      if (isGroupedRow(row)) {
        for (const childRow of row.childRows) {
          if (checked) {
            newSelectedRows.add(childRow[rowKey]);
          } else {
            newSelectedRows.delete(childRow[rowKey]);
          }
        }
      } else {
        const rowId = row[rowKey];
        if (checked) {
          newSelectedRows.add(rowId);
          const previousRowIdx = lastSelectedRowIdx.current;
          lastSelectedRowIdx.current = rowIdx;
          if (isShiftClick && previousRowIdx !== -1 && previousRowIdx !== rowIdx) {
            const step = Math.sign(rowIdx - previousRowIdx);
            for (let i = previousRowIdx + step; i !== rowIdx; i += step) {
              const row = rows[i];
              if (isGroupedRow(row)) continue;
              newSelectedRows.add(row[rowKey]);
            }
          }
        } else {
          newSelectedRows.delete(rowId);
          lastSelectedRowIdx.current = -1;
        }
      }

      onSelectedRowsChange(newSelectedRows);
    };

    return eventBus.subscribe('SELECT_ROW', handleRowSelectionChange);
  }, [rows, eventBus, onSelectedRowsChange, rowKey, selectedRows]);

  useEffect(() => {
    return eventBus.subscribe('SELECT_CELL', selectCell);
  });

  useEffect(() => {
    function toggleGroup(expandedGroupId: unknown) {
      const newExpandedGroupIds = new Set(expandedGroupIds);
      if (expandedGroupIds.has(expandedGroupId)) {
        newExpandedGroupIds.delete(expandedGroupId);
      } else {
        newExpandedGroupIds.add(expandedGroupId);
      }
      setExpandedGroupIds(newExpandedGroupIds);
    }

    return eventBus.subscribe('TOGGLE_GROUP', toggleGroup);
  }, [eventBus, expandedGroupIds]);

  useImperativeHandle(ref, () => ({
    scrollToColumn(idx: number) {
      scrollToCell({ idx });
    },
    scrollToRow(rowIdx: number) {
      const { current } = gridRef;
      if (!current) return;
      current.scrollTop = rowIdx * rowHeight;
    },
    selectCell,
    commitChanges: handleCommit2
  }));

  /**
   * event handlers
   */
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (enableCellCopyPaste && isCtrlKeyHeldDown(event) && isCellWithinBounds(selectedPosition)) {
      // event.key may be uppercase `C` or `V`
      const lowerCaseKey = event.key.toLowerCase();
      if (lowerCaseKey === 'c') {
        handleCopy();
        return;
      }
      if (lowerCaseKey === 'v') {
        handlePaste();
        return;
      }
    }

    switch (event.key) {
      case 'Escape':
        setCopiedPosition(null);
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

  function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    const { scrollTop, scrollLeft } = event.currentTarget;
    setScrollTop(scrollTop);
    setScrollLeft(scrollLeft);
    onScroll?.(event);
  }

  const handleColumnResize = useCallback((column: CalculatedColumn<R, SR>, width: number) => {
    const newColumnWidths = new Map(columnWidths);
    newColumnWidths.set(column.key, width);
    setColumnWidths(newColumnWidths);

    onColumnResize?.(column.idx, width);
  }, [columnWidths, onColumnResize]);

  function getRawRowIdx(rowIdx: number) {
    return hasGroups ? rawRows.indexOf(rows[rowIdx] as R) : rowIdx;
  }

  function handleCommit({ cellKey, rowIdx, updated }: CommitEvent) {
    rowIdx = getRawRowIdx(rowIdx);
    onRowsUpdate?.({
      cellKey,
      fromRow: rowIdx,
      toRow: rowIdx,
      updated,
      action: UpdateActions.CELL_UPDATE
    });

    closeEditor();
  }

  function handleRowsChange(row: R) {
    const rowIdx = getRawRowIdx(selectedPosition.rowIdx);
    const updatedRows = [...rawRows];
    updatedRows[rowIdx] = row;
    onRowsChange?.(updatedRows);
    closeEditor();
  }

  function handleCommit2() {
    const { idx, rowIdx } = selectedPosition;
    const column = columns[idx];
    if (
      selectedPosition.mode === 'SELECT'
      || column?.editor2 === undefined
      || selectedPosition.row === rows[rowIdx]
    ) {
      return;
    }

    handleRowsChange(selectedPosition.row);
  }

  function handleCopy() {
    const { idx, rowIdx } = selectedPosition;
    const value = rawRows[rowIdx][columns[idx].key as keyof R];
    setCopiedPosition({ idx, rowIdx, value });
  }

  function handlePaste() {
    if (
      copiedPosition === null
      || !isCellEditable(selectedPosition)
      || (copiedPosition.idx === selectedPosition.idx && copiedPosition.rowIdx === selectedPosition.rowIdx)
    ) {
      return;
    }

    const { rowIdx: toRow } = selectedPosition;

    const cellKey = columns[selectedPosition.idx].key;
    const { rowIdx: fromRow, idx, value } = copiedPosition;
    const fromCellKey = columns[idx].key;

    onRowsUpdate?.({
      cellKey,
      fromRow,
      toRow,
      updated: { [cellKey]: value } as unknown as never,
      action: UpdateActions.COPY_PASTE,
      fromCellKey
    });
  }

  function handleCellInput(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!isCellWithinBounds(selectedPosition)) return;
    const { key } = event;
    const row = rows[selectedPosition.rowIdx];
    if (isGroupedRow(row)) return;
    const column = columns[selectedPosition.idx];

    if (selectedPosition.mode === 'EDIT') {
      if (column.editor2 !== undefined && key === 'Enter') {
        // Custom editors can listen for the event and stop propagation to prevent commit
        handleCommit2();
      }
      return;
    }

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

  function handleDragEnd() {
    if (latestDraggedOverRowIdx.current === undefined) return;

    const { idx, rowIdx } = selectedPosition;
    const column = columns[idx];
    const cellKey = column.key;
    const value = rawRows[rowIdx][cellKey as keyof R];

    onRowsUpdate?.({
      cellKey,
      fromRow: rowIdx,
      toRow: latestDraggedOverRowIdx.current,
      updated: { [cellKey]: value } as unknown as never,
      action: UpdateActions.CELL_DRAG
    });

    setDraggedOverRowIdx(undefined);
  }

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (event.buttons !== 1) return;
    setDragging(true);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseup', onMouseUp);

    function onMouseOver(event: MouseEvent) {
      // Trigger onMouseup in edge cases where we release the mouse button but `mouseup` isn't triggered,
      // for example when releasing the mouse button outside the iframe the grid is rendered in.
      // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
      if (event.buttons !== 1) onMouseUp();
    }

    function onMouseUp() {
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseup', onMouseUp);
      setDragging(false);
      handleDragEnd();
    }
  }

  function handleDoubleClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();

    const column = columns[selectedPosition.idx];
    const cellKey = column.key;
    const value = rawRows[selectedPosition.rowIdx][cellKey as keyof R];

    onRowsUpdate?.({
      cellKey,
      fromRow: selectedPosition.rowIdx,
      toRow: rawRows.length - 1,
      updated: { [cellKey]: value } as unknown as never,
      action: UpdateActions.COLUMN_FILL
    });
  }

  function handleRowChange(row: Readonly<R>, commitChanges?: boolean) {
    if (selectedPosition.mode === 'SELECT') return;
    if (commitChanges) {
      handleRowsChange(row);
    } else {
      setSelectedPosition(position => ({ ...position, row }));
    }
  }

  function handleOnClose(commitChanges?: boolean) {
    if (selectedPosition.mode === 'SELECT') return;
    if (commitChanges) {
      handleRowsChange(selectedPosition.row);
    }
    closeEditor();
  }

  /**
   * utils
   */

  function isCellWithinBounds({ idx, rowIdx }: Position): boolean {
    return rowIdx >= 0 && rowIdx < rows.length && idx >= 0 && idx < columns.length;
  }

  function isCellEditable(position: Position): boolean {
    return isCellWithinBounds(position)
      && isSelectedCellEditable<R, SR>({ columns, rows, selectedPosition: position, onCheckCellIsEditable });
  }

  function selectCell(position: Position, enableEditor = false): void {
    if (!isCellWithinBounds(position)) return;
    handleCommit2();

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

  function getFrozenColumnsWidth(): number {
    if (lastFrozenColumnIndex === -1) return 0;
    const lastFrozenCol = columns[lastFrozenColumnIndex];
    return lastFrozenCol.left + lastFrozenCol.width;
  }

  function scrollToCell({ idx, rowIdx }: Partial<Position>): void {
    const { current } = gridRef;
    if (!current) return;

    if (typeof idx === 'number' && idx > lastFrozenColumnIndex) {
      const { clientWidth } = current;
      const { left, width } = columns[idx];
      const isCellAtLeftBoundary = left < scrollLeft + width + getFrozenColumnsWidth();
      const isCellAtRightBoundary = left + width > clientWidth + scrollLeft;
      if (isCellAtLeftBoundary || isCellAtRightBoundary) {
        const newScrollLeft = getColumnScrollPosition(columns, idx, scrollLeft, clientWidth);
        current.scrollLeft = scrollLeft + newScrollLeft;
      }
    }

    if (typeof rowIdx === 'number') {
      if (rowIdx * rowHeight < scrollTop) {
        // at top boundary, scroll to the row's top
        current.scrollTop = rowIdx * rowHeight;
      } else if ((rowIdx + 1) * rowHeight > scrollTop + clientHeight) {
        // at bottom boundary, scroll the next row's top to the bottom of the viewport
        current.scrollTop = (rowIdx + 1) * rowHeight - clientHeight;
      }
    }
  }

  function getNextPosition(key: string, ctrlKey: boolean, shiftKey: boolean): Position {
    const { idx, rowIdx } = selectedPosition;
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
        if (selectedPosition.idx === -1 && selectedPosition.rowIdx === -1) {
          return shiftKey ? { idx: columns.length - 1, rowIdx: rows.length - 1 } : { idx: 0, rowIdx: 0 };
        }
        return { idx: idx + (shiftKey ? -1 : 1), rowIdx };
      case 'Home':
        return ctrlKey ? { idx: 0, rowIdx: 0 } : { idx: 0, rowIdx };
      case 'End':
        return ctrlKey ? { idx: columns.length - 1, rowIdx: rows.length - 1 } : { idx: columns.length - 1, rowIdx };
      case 'PageUp':
        return { idx, rowIdx: rowIdx - Math.floor(clientHeight / rowHeight) };
      case 'PageDown':
        return { idx, rowIdx: rowIdx + Math.floor(clientHeight / rowHeight) };
      default:
        return selectedPosition;
    }
  }

  function navigate(event: React.KeyboardEvent<HTMLDivElement>) {
    const { key, shiftKey } = event;
    const ctrlKey = isCtrlKeyHeldDown(event);
    let nextPosition = getNextPosition(key, ctrlKey, shiftKey);
    let mode = cellNavigationMode;
    if (key === 'Tab') {
      // If we are in a position to leave the grid, stop editing but stay in that cell
      if (canExitGrid({ shiftKey, cellNavigationMode, columns, rowsCount: rows.length, selectedPosition })) {
        // Allow focus to leave the grid so the next control in the tab order can be focused
        return;
      }

      mode = cellNavigationMode === CellNavigationMode.NONE
        ? CellNavigationMode.CHANGE_ROW
        : cellNavigationMode;
    }

    // Do not allow focus to leave
    event.preventDefault();

    nextPosition = getNextSelectedCellPosition<R, SR>({
      columns,
      rowsCount: rows.length,
      cellNavigationMode: mode,
      nextPosition
    });

    selectCell(nextPosition);
  }

  function getDraggedOverCellIdx(currentRowIdx: number): number | undefined {
    if (draggedOverRowIdx === undefined) return;
    const { rowIdx } = selectedPosition;

    const isDraggedOver = rowIdx < draggedOverRowIdx
      ? rowIdx < currentRowIdx && currentRowIdx <= draggedOverRowIdx
      : rowIdx > currentRowIdx && currentRowIdx >= draggedOverRowIdx;

    return isDraggedOver ? selectedPosition.idx : undefined;
  }

  function getSelectedCellProps(rowIdx: number): SelectedCellProps | EditCellProps<R> | undefined {
    if (selectedPosition.rowIdx !== rowIdx) return;

    if (selectedPosition.mode === 'EDIT') {
      return {
        mode: 'EDIT',
        idx: selectedPosition.idx,
        onKeyDown: handleKeyDown,
        editorPortalTarget,
        editorContainerProps: {
          rowHeight,
          scrollLeft,
          scrollTop,
          firstEditorKeyPress: selectedPosition.key,
          onCommit: handleCommit,
          onCommitCancel: closeEditor
        },
        editor2Props: {
          rowHeight,
          row: selectedPosition.row,
          onRowChange: handleRowChange,
          onClose: handleOnClose
        }
      };
    }

    return {
      mode: 'SELECT',
      idx: selectedPosition.idx,
      onKeyDown: handleKeyDown,
      dragHandleProps: enableCellDragAndDrop && isCellEditable(selectedPosition)
        ? { onMouseDown: handleMouseDown, onDoubleClick: handleDoubleClick }
        : undefined
    };
  }

  function getViewportRows() {
    // TODO: cleanup rowIndex/rowIdx logic
    let startRowIndex = 0;
    return viewportRows.map((row, index) => {
      const rowIdx = startRowIdx + index;
      const top = rowIdx * rowHeight + totalHeaderHeight;
      if (isGroupedRow(row)) {
        const isSelected = selectedPosition.rowIdx === rowIdx;
        ({ startRowIndex } = row);
        return (
          <GroupRowRenderer<R, SR>
            aria-level={row.level + 1} // aria-level is 1-based
            aria-setsize={row.setSize}
            aria-posinset={row.posInSet + 1} // aria-posinset is 1-based
            aria-rowindex={headerRowsCount + startRowIndex + 1} // aria-rowindex is 1 based
            key={row.id} // TODO: id or index?
            id={row.id}
            groupKey={row.key}
            viewportColumns={viewportColumns}
            childRows={row.childRows}
            rowIdx={rowIdx}
            lastFrozenColumnIndex={lastFrozenColumnIndex}
            groupBy={groupBy}
            top={top}
            level={row.level}
            isExpanded={row.isExpanded}
            isCellSelected={isSelected}
            isRowSelected={isSelectable && row.childRows.every(cr => selectedRows?.has(cr[rowKey!]))}
            eventBus={eventBus}
            onKeyDown={isSelected ? handleKeyDown : undefined}
          />
        );
      }
      startRowIndex++;

      let key: string | number = hasGroups ? startRowIndex : rowIdx;
      let isRowSelected = false;
      if (rowKey !== undefined) {
        const rowId = row[rowKey];
        isRowSelected = selectedRows?.has(rowId) ?? false;
        if (typeof rowId === 'string' || typeof rowId === 'number') {
          key = rowId;
        }
      }

      return (
        <RowRenderer
          aria-rowindex={headerRowsCount + (hasGroups ? startRowIndex : rowIdx) + 1}
          aria-selected={isSelectable ? isRowSelected : undefined}
          key={key}
          rowIdx={rowIdx}
          row={row}
          viewportColumns={viewportColumns}
          lastFrozenColumnIndex={lastFrozenColumnIndex}
          eventBus={eventBus}
          isRowSelected={isRowSelected}
          onRowClick={onRowClick}
          rowClass={rowClass}
          top={top}
          copiedCellIdx={copiedPosition?.rowIdx === rowIdx ? copiedPosition.idx : undefined}
          draggedOverCellIdx={getDraggedOverCellIdx(rowIdx)}
          setDraggedOverRowIdx={isDragging ? setDraggedOverRowIdx : undefined}
          selectedCellProps={getSelectedCellProps(rowIdx)}
        />
      );
    });
  }

  // Reset the positions if the current values are no longer valid. This can happen if a column or row is removed
  if (selectedPosition.idx >= columns.length || selectedPosition.rowIdx >= rows.length) {
    setSelectedPosition({ idx: -1, rowIdx: -1, mode: 'SELECT' });
    setCopiedPosition(null);
    setDraggedOverRowIdx(undefined);
  }

  if (selectedPosition.mode === 'EDIT' && rows[selectedPosition.rowIdx] !== selectedPosition.originalRow) {
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
      className={clsx('rdg', { 'rdg-viewport-dragging': isDragging })}
      style={{
        width,
        height,
        '--header-row-height': `${headerRowHeight}px`,
        '--filter-row-height': `${headerFiltersHeight}px`,
        '--row-width': `${totalColumnWidth}px`,
        '--row-height': `${rowHeight}px`
      } as unknown as React.CSSProperties}
      ref={gridRef}
      onScroll={handleScroll}
    >
      <HeaderRow<R, K, SR>
        rowKey={rowKey}
        rows={rawRows}
        columns={viewportColumns}
        onColumnResize={handleColumnResize}
        lastFrozenColumnIndex={lastFrozenColumnIndex}
        allRowsSelected={selectedRows?.size === rawRows.length}
        onSelectedRowsChange={onSelectedRowsChange}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={onSort}
      />
      {enableFilters && (
        <FilterRow<R, SR>
          lastFrozenColumnIndex={lastFrozenColumnIndex}
          columns={viewportColumns}
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      )}
      {rows.length === 0 && emptyRowsRenderer ? createElement(emptyRowsRenderer) : (
        <>
          <div
            ref={focusSinkRef}
            tabIndex={0}
            className="rdg-focus-sink"
            onKeyDown={handleKeyDown}
          />
          <div style={{ height: Math.max(rows.length * rowHeight, clientHeight) }} />
          {getViewportRows()}
          {summaryRows?.map((row, rowIdx) => (
            <SummaryRow<R, SR>
              aria-rowindex={headerRowsCount + rowsCount + rowIdx + 1}
              key={rowIdx}
              rowIdx={rowIdx}
              row={row}
              bottom={rowHeight * (summaryRows.length - 1 - rowIdx)}
              viewportColumns={viewportColumns}
              lastFrozenColumnIndex={lastFrozenColumnIndex}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default forwardRef(
  DataGrid as React.RefForwardingComponent<DataGridHandle>
) as <R, K extends keyof R, SR = unknown>(props: DataGridProps<R, K, SR> & { ref?: React.Ref<DataGridHandle> }) => JSX.Element;
