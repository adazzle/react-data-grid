import { useCallback, useRef, useEffect, useState, useLayoutEffect, useMemo, memo, forwardRef, useImperativeHandle } from 'react';
import clsx from 'clsx';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { createPortal } from 'react-dom';

function useCombinedRefs(...refs) {
  return useCallback(handle => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(handle);
      } else if (ref !== null) {
        ref.current = handle;
      }
    }
  }, refs);
}

function useClickOutside(onClick) {
  const frameRequestRef = useRef();

  function cancelAnimationFrameRequest() {
    if (typeof frameRequestRef.current === 'number') {
      cancelAnimationFrame(frameRequestRef.current);
      frameRequestRef.current = undefined;
    }
  }

  const onClickRef = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });
  useEffect(() => {
    onClickRef.current = onClick;
  });
  useEffect(() => {
    function onOutsideClick() {
      frameRequestRef.current = undefined;
      onClickRef.current();
    }

    function onWindowCaptureClick() {
      cancelAnimationFrameRequest();
      frameRequestRef.current = requestAnimationFrame(onOutsideClick);
    }

    window.addEventListener('click', onWindowCaptureClick, {
      capture: true
    });
    return () => {
      window.removeEventListener('click', onWindowCaptureClick, {
        capture: true
      });
      cancelAnimationFrameRequest();
    };
  }, []);
  return cancelAnimationFrameRequest;
}

function useGridDimensions() {
  const gridRef = useRef(null);
  const [gridWidth, setGridWidth] = useState(1);
  const [gridHeight, setGridHeight] = useState(1);
  useLayoutEffect(() => {
    const {
      ResizeObserver
    } = window;
    if (ResizeObserver == null) return;
    const resizeObserver = new ResizeObserver(() => {
      const {
        clientWidth,
        clientHeight
      } = gridRef.current;
      setGridWidth(clientWidth);
      setGridHeight(clientHeight);
    });
    resizeObserver.observe(gridRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return [gridRef, gridWidth, gridHeight];
}

function useFocusRef(isCellSelected) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    var _ref$current;

    if (!isCellSelected) return;
    (_ref$current = ref.current) == null ? void 0 : _ref$current.focus({
      preventScroll: true
    });
  }, [isCellSelected]);
  return ref;
}

function SelectCellFormatter({
  value,
  tabIndex,
  isCellSelected,
  disabled,
  onClick,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy
}) {
  const inputRef = useFocusRef(isCellSelected);

  function handleChange(e) {
    onChange(e.target.checked, e.nativeEvent.shiftKey);
  }

  return /*#__PURE__*/jsxs("label", {
    className: 'rdg-checkbox-label' + (disabled ? " rdg-checkbox-label-disabled" : ""),
    children: [/*#__PURE__*/jsx("input", {
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      tabIndex: tabIndex,
      ref: inputRef,
      type: "checkbox",
      className: "rdg-checkbox-input",
      disabled: disabled,
      checked: value,
      onChange: handleChange,
      onClick: onClick
    }), /*#__PURE__*/jsx("div", {
      className: "rdg-checkbox"
    })]
  });
}

function ValueFormatter(props) {
  try {
    return /*#__PURE__*/jsx(Fragment, {
      children: props.row[props.column.key]
    });
  } catch {
    return null;
  }
}

function ToggleGroupFormatter({
  groupKey,
  isExpanded,
  isCellSelected,
  toggleGroup
}) {
  const cellRef = useFocusRef(isCellSelected);

  function handleKeyDown({
    key
  }) {
    if (key === 'Enter') {
      toggleGroup();
    }
  }

  const d = isExpanded ? 'M1 1 L 7 7 L 13 1' : 'M1 7 L 7 1 L 13 7';
  return /*#__PURE__*/jsxs("span", {
    ref: cellRef,
    className: "rdg-group-cell-content",
    tabIndex: -1,
    onKeyDown: handleKeyDown,
    children: [groupKey, /*#__PURE__*/jsx("svg", {
      viewBox: "0 0 14 8",
      width: "14",
      height: "8",
      className: "rdg-caret",
      children: /*#__PURE__*/jsx("path", {
        d: d
      })
    })]
  });
}

function stopPropagation(event) {
  event.stopPropagation();
}
function wrapEvent(ourHandler, theirHandler) {
  if (theirHandler === undefined) return ourHandler;
  return function (event) {
    ourHandler(event);
    theirHandler(event);
  };
}

const SELECT_COLUMN_KEY = 'select-row';
const SelectColumn = {
  key: SELECT_COLUMN_KEY,
  name: '',
  width: 35,
  maxWidth: 35,
  resizable: false,
  sortable: false,
  frozen: true,

  headerRenderer(props) {
    return /*#__PURE__*/jsx(SelectCellFormatter, {
      "aria-label": "Select All",
      value: props.allRowsSelected,
      onChange: props.onAllRowsSelectionChange
    });
  },

  formatter(props) {
    return /*#__PURE__*/jsx(SelectCellFormatter, {
      "aria-label": "Select",
      tabIndex: -1,
      isCellSelected: props.isCellSelected,
      value: props.isRowSelected,
      onClick: stopPropagation,
      onChange: props.onRowSelectionChange
    });
  },

  groupFormatter(props) {
    return /*#__PURE__*/jsx(SelectCellFormatter, {
      "aria-label": "Select Group",
      tabIndex: -1,
      isCellSelected: props.isCellSelected,
      value: props.isRowSelected,
      onChange: props.onRowSelectionChange,
      onClick: stopPropagation
    });
  }

};

function useViewportColumns({
  rawColumns,
  columnWidths,
  viewportWidth,
  scrollLeft,
  defaultColumnOptions,
  rawGroupBy
}) {
  var _defaultColumnOptions, _defaultColumnOptions2, _defaultColumnOptions3, _defaultColumnOptions4;

  const minColumnWidth = (_defaultColumnOptions = defaultColumnOptions == null ? void 0 : defaultColumnOptions.minWidth) != null ? _defaultColumnOptions : 80;
  const defaultFormatter = (_defaultColumnOptions2 = defaultColumnOptions == null ? void 0 : defaultColumnOptions.formatter) != null ? _defaultColumnOptions2 : ValueFormatter;
  const defaultSortable = (_defaultColumnOptions3 = defaultColumnOptions == null ? void 0 : defaultColumnOptions.sortable) != null ? _defaultColumnOptions3 : false;
  const defaultResizable = (_defaultColumnOptions4 = defaultColumnOptions == null ? void 0 : defaultColumnOptions.resizable) != null ? _defaultColumnOptions4 : false;
  const {
    columns,
    lastFrozenColumnIndex,
    groupBy
  } = useMemo(() => {
    const groupBy = [];
    let lastFrozenColumnIndex = -1;
    const columns = rawColumns.map(rawColumn => {
      var _rawColumn$sortable, _rawColumn$resizable, _rawColumn$formatter;

      const isGroup = rawGroupBy == null ? void 0 : rawGroupBy.includes(rawColumn.key);
      const column = { ...rawColumn,
        idx: 0,
        frozen: isGroup || rawColumn.frozen || false,
        isLastFrozenColumn: false,
        rowGroup: isGroup,
        sortable: (_rawColumn$sortable = rawColumn.sortable) != null ? _rawColumn$sortable : defaultSortable,
        resizable: (_rawColumn$resizable = rawColumn.resizable) != null ? _rawColumn$resizable : defaultResizable,
        formatter: (_rawColumn$formatter = rawColumn.formatter) != null ? _rawColumn$formatter : defaultFormatter
      };

      if (column.frozen) {
        lastFrozenColumnIndex++;
      }

      return column;
    });
    columns.sort(({
      key: aKey,
      frozen: frozenA
    }, {
      key: bKey,
      frozen: frozenB
    }) => {
      if (aKey === SELECT_COLUMN_KEY) return -1;
      if (bKey === SELECT_COLUMN_KEY) return 1;

      if (rawGroupBy != null && rawGroupBy.includes(aKey)) {
        if (rawGroupBy.includes(bKey)) {
          return rawGroupBy.indexOf(aKey) - rawGroupBy.indexOf(bKey);
        }

        return -1;
      }

      if (rawGroupBy != null && rawGroupBy.includes(bKey)) return 1;

      if (frozenA) {
        if (frozenB) return 0;
        return -1;
      }

      if (frozenB) return 1;
      return 0;
    });
    columns.forEach((column, idx) => {
      column.idx = idx;

      if (idx === lastFrozenColumnIndex) {
        column.isLastFrozenColumn = true;
      }

      if (column.rowGroup) {
        var _column$groupFormatte;

        groupBy.push(column.key);
        (_column$groupFormatte = column.groupFormatter) != null ? _column$groupFormatte : column.groupFormatter = ToggleGroupFormatter;
      }
    });
    return {
      columns,
      lastFrozenColumnIndex,
      groupBy
    };
  }, [rawColumns, defaultFormatter, defaultResizable, defaultSortable, rawGroupBy]);
  const {
    layoutCssVars,
    totalColumnWidth,
    totalFrozenColumnWidth,
    columnMetrics
  } = useMemo(() => {
    const columnMetrics = new Map();
    let left = 0;
    let totalColumnWidth = 0;
    let totalFrozenColumnWidth = 0;
    let templateColumns = '';
    let allocatedWidth = 0;
    let unassignedColumnsCount = 0;

    for (const column of columns) {
      let width = getSpecifiedWidth(column, columnWidths, viewportWidth);

      if (width === undefined) {
        unassignedColumnsCount++;
      } else {
        width = clampColumnWidth(width, column, minColumnWidth);
        allocatedWidth += width;
        columnMetrics.set(column, {
          width,
          left: 0
        });
      }
    }

    const unallocatedWidth = viewportWidth - allocatedWidth;
    const unallocatedColumnWidth = unallocatedWidth / unassignedColumnsCount;

    for (const column of columns) {
      let width;

      if (columnMetrics.has(column)) {
        const columnMetric = columnMetrics.get(column);
        columnMetric.left = left;
        ({
          width
        } = columnMetric);
      } else {
        width = clampColumnWidth(unallocatedColumnWidth, column, minColumnWidth);
        columnMetrics.set(column, {
          width,
          left
        });
      }

      totalColumnWidth += width;
      left += width;
      templateColumns += `${width}px `;
    }

    if (lastFrozenColumnIndex !== -1) {
      const columnMetric = columnMetrics.get(columns[lastFrozenColumnIndex]);
      totalFrozenColumnWidth = columnMetric.left + columnMetric.width;
    }

    const layoutCssVars = {
      '--template-columns': templateColumns
    };

    for (let i = 0; i <= lastFrozenColumnIndex; i++) {
      const column = columns[i];
      layoutCssVars[`--frozen-left-${column.key}`] = `${columnMetrics.get(column).left}px`;
    }

    return {
      layoutCssVars,
      totalColumnWidth,
      totalFrozenColumnWidth,
      columnMetrics
    };
  }, [columnWidths, columns, viewportWidth, minColumnWidth, lastFrozenColumnIndex]);
  const [colOverscanStartIdx, colOverscanEndIdx] = useMemo(() => {
    const viewportLeft = scrollLeft + totalFrozenColumnWidth;
    const viewportRight = scrollLeft + viewportWidth;
    const lastColIdx = columns.length - 1;
    const firstUnfrozenColumnIdx = Math.min(lastFrozenColumnIndex + 1, lastColIdx);

    if (viewportLeft >= viewportRight) {
      return [firstUnfrozenColumnIdx, firstUnfrozenColumnIdx];
    }

    let colVisibleStartIdx = firstUnfrozenColumnIdx;

    while (colVisibleStartIdx < lastColIdx) {
      const {
        left,
        width
      } = columnMetrics.get(columns[colVisibleStartIdx]);

      if (left + width > viewportLeft) {
        break;
      }

      colVisibleStartIdx++;
    }

    let colVisibleEndIdx = colVisibleStartIdx;

    while (colVisibleEndIdx < lastColIdx) {
      const {
        left,
        width
      } = columnMetrics.get(columns[colVisibleEndIdx]);

      if (left + width >= viewportRight) {
        break;
      }

      colVisibleEndIdx++;
    }

    const colOverscanStartIdx = Math.max(firstUnfrozenColumnIdx, colVisibleStartIdx - 1);
    const colOverscanEndIdx = Math.min(lastColIdx, colVisibleEndIdx + 1);
    return [colOverscanStartIdx, colOverscanEndIdx];
  }, [columns, columnMetrics, lastFrozenColumnIndex, scrollLeft, totalFrozenColumnWidth, viewportWidth]);
  const viewportColumns = useMemo(() => {
    const viewportColumns = [];

    for (let colIdx = 0; colIdx <= colOverscanEndIdx; colIdx++) {
      const column = columns[colIdx];
      if (colIdx < colOverscanStartIdx && !column.frozen) continue;
      viewportColumns.push(column);
    }

    return viewportColumns;
  }, [colOverscanEndIdx, colOverscanStartIdx, columns]);
  return {
    columns,
    viewportColumns,
    layoutCssVars,
    columnMetrics,
    totalColumnWidth,
    lastFrozenColumnIndex,
    totalFrozenColumnWidth,
    groupBy
  };
}

function getSpecifiedWidth({
  key,
  width
}, columnWidths, viewportWidth) {
  if (columnWidths.has(key)) {
    return columnWidths.get(key);
  }

  if (typeof width === 'number') {
    return width;
  }

  if (typeof width === 'string' && /^\d+%$/.test(width)) {
    return Math.floor(viewportWidth * parseInt(width, 10) / 100);
  }

  return undefined;
}

function clampColumnWidth(width, {
  minWidth,
  maxWidth
}, minColumnWidth) {
  width = Math.max(width, minWidth != null ? minWidth : minColumnWidth);

  if (typeof maxWidth === 'number') {
    return Math.min(width, maxWidth);
  }

  return width;
}

const RENDER_BACTCH_SIZE = 8;

function isReadonlyArray(arr) {
  return Array.isArray(arr);
}

function useViewportRows({
  rawRows,
  rowHeight,
  clientHeight,
  scrollTop,
  groupBy,
  rowGrouper,
  expandedGroupIds
}) {
  const [groupedRows, rowsCount] = useMemo(() => {
    if (groupBy.length === 0 || !rowGrouper) return [undefined, rawRows.length];

    const groupRows = (rows, [groupByKey, ...remainingGroupByKeys], startRowIndex) => {
      let groupRowsCount = 0;
      const groups = {};

      for (const [key, childRows] of Object.entries(rowGrouper(rows, groupByKey))) {
        const [childGroups, childRowsCount] = remainingGroupByKeys.length === 0 ? [childRows, childRows.length] : groupRows(childRows, remainingGroupByKeys, startRowIndex + groupRowsCount + 1);
        groups[key] = {
          childRows,
          childGroups,
          startRowIndex: startRowIndex + groupRowsCount
        };
        groupRowsCount += childRowsCount + 1;
      }

      return [groups, groupRowsCount];
    };

    return groupRows(rawRows, groupBy, 0);
  }, [groupBy, rowGrouper, rawRows]);
  const [rows, allGroupRows] = useMemo(() => {
    const allGroupRows = new Set();
    if (!groupedRows) return [rawRows, allGroupRows];
    const flattenedRows = [];

    const expandGroup = (rows, parentId, level) => {
      if (isReadonlyArray(rows)) {
        flattenedRows.push(...rows);
        return;
      }

      Object.keys(rows).forEach((groupKey, posInSet, keys) => {
        var _expandedGroupIds$has;

        const id = parentId !== undefined ? `${parentId}__${groupKey}` : groupKey;
        const isExpanded = (_expandedGroupIds$has = expandedGroupIds == null ? void 0 : expandedGroupIds.has(id)) != null ? _expandedGroupIds$has : false;
        const {
          childRows,
          childGroups,
          startRowIndex
        } = rows[groupKey];
        const groupRow = {
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
    return [flattenedRows, allGroupRows];
  }, [expandedGroupIds, groupedRows, rawRows]);

  const isGroupRow = row => allGroupRows.has(row);

  const overscanThreshold = 4;
  const rowVisibleStartIdx = Math.floor(scrollTop / rowHeight);
  const rowVisibleEndIdx = Math.min(rows.length - 1, Math.floor((scrollTop + clientHeight) / rowHeight));
  const rowOverscanStartIdx = Math.max(0, Math.floor((rowVisibleStartIdx - overscanThreshold) / RENDER_BACTCH_SIZE) * RENDER_BACTCH_SIZE);
  const rowOverscanEndIdx = Math.min(rows.length - 1, Math.ceil((rowVisibleEndIdx + overscanThreshold) / RENDER_BACTCH_SIZE) * RENDER_BACTCH_SIZE);
  return {
    rowOverscanStartIdx,
    rowOverscanEndIdx,
    rows,
    rowsCount,
    isGroupRow
  };
}

function useLatestFunc(fn) {
  const ref = useRef(fn);
  useEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args) => {
    ref.current(...args);
  }, []);
}

function SortableHeaderCell({
  column,
  onSort,
  sortColumn,
  sortDirection,
  children
}) {
  sortDirection = sortColumn === column.key && sortDirection || 'NONE';
  let sortText = '';

  if (sortDirection === 'ASC') {
    sortText = '\u25B2';
  } else if (sortDirection === 'DESC') {
    sortText = '\u25BC';
  }

  function onClick() {
    if (!onSort) return;
    const {
      sortDescendingFirst
    } = column;
    let direction;

    switch (sortDirection) {
      case 'ASC':
        direction = sortDescendingFirst ? 'NONE' : 'DESC';
        break;

      case 'DESC':
        direction = sortDescendingFirst ? 'ASC' : 'NONE';
        break;

      default:
        direction = sortDescendingFirst ? 'DESC' : 'ASC';
        break;
    }

    onSort(column.key, direction);
  }

  return /*#__PURE__*/jsxs("span", {
    className: "rdg-header-sort-cell",
    onClick: onClick,
    children: [/*#__PURE__*/jsx("span", {
      className: "rdg-header-sort-name",
      children: children
    }), /*#__PURE__*/jsx("span", {
      children: sortText
    })]
  });
}

const nonInputKeys = new Set(['Unidentified', 'Alt', 'AltGraph', 'CapsLock', 'Control', 'Fn', 'FnLock', 'Meta', 'NumLock', 'ScrollLock', 'Shift', 'Tab', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'End', 'Home', 'PageDown', 'PageUp', 'Insert', 'ContextMenu', 'Escape', 'Pause', 'Play', 'PrintScreen', 'F1', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12']);
function isCtrlKeyHeldDown(e) {
  return (e.ctrlKey || e.metaKey) && e.key !== 'Control';
}
function isDefaultCellInput(event) {
  return !nonInputKeys.has(event.key);
}
function onEditorNavigation({
  key,
  target
}) {
  if (key === 'Tab' && (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) {
    return target.matches('.rdg-editor-container > :only-child, .rdg-editor-container > label:only-child > :only-child');
  }

  return false;
}

function isSelectedCellEditable({
  selectedPosition,
  columns,
  rows,
  isGroupRow
}) {
  const column = columns[selectedPosition.idx];
  const row = rows[selectedPosition.rowIdx];
  return column.editor != null && !column.rowGroup && !isGroupRow(row) && (typeof column.editable === 'function' ? column.editable(row) : column.editable) !== false;
}
function getNextSelectedCellPosition({
  cellNavigationMode,
  columns,
  rowsCount,
  nextPosition
}) {
  if (cellNavigationMode !== 'NONE') {
    const {
      idx,
      rowIdx
    } = nextPosition;
    const columnsCount = columns.length;
    const isAfterLastColumn = idx === columnsCount;
    const isBeforeFirstColumn = idx === -1;

    if (isAfterLastColumn) {
      if (cellNavigationMode === 'CHANGE_ROW') {
        const isLastRow = rowIdx === rowsCount - 1;

        if (!isLastRow) {
          return {
            idx: 0,
            rowIdx: rowIdx + 1
          };
        }
      } else if (cellNavigationMode === 'LOOP_OVER_ROW') {
        return {
          rowIdx,
          idx: 0
        };
      }
    } else if (isBeforeFirstColumn) {
      if (cellNavigationMode === 'CHANGE_ROW') {
        const isFirstRow = rowIdx === 0;

        if (!isFirstRow) {
          return {
            rowIdx: rowIdx - 1,
            idx: columnsCount - 1
          };
        }
      } else if (cellNavigationMode === 'LOOP_OVER_ROW') {
        return {
          rowIdx,
          idx: columnsCount - 1
        };
      }
    }
  }

  return nextPosition;
}
function canExitGrid({
  cellNavigationMode,
  columns,
  rowsCount,
  selectedPosition: {
    rowIdx,
    idx
  },
  shiftKey
}) {
  if (cellNavigationMode === 'NONE' || cellNavigationMode === 'CHANGE_ROW') {
    const atLastCellInRow = idx === columns.length - 1;
    const atFirstCellInRow = idx === 0;
    const atLastRow = rowIdx === rowsCount - 1;
    const atFirstRow = rowIdx === 0;
    return shiftKey ? atFirstCellInRow && atFirstRow : atLastCellInRow && atLastRow;
  }

  return false;
}

function assertIsValidKeyGetter(keyGetter) {
  if (typeof keyGetter !== 'function') {
    throw new Error('Please specify the rowKeyGetter prop to use selection');
  }
}
function getCellStyle(column) {
  return column.frozen ? {
    left: `var(--frozen-left-${column.key})`
  } : {
    gridColumnStart: column.idx + 1
  };
}

function getAriaSort(sortDirection) {
  switch (sortDirection) {
    case 'ASC':
      return 'ascending';

    case 'DESC':
      return 'descending';

    default:
      return 'none';
  }
}

function HeaderCell({
  column,
  onResize,
  allRowsSelected,
  onAllRowsSelectionChange,
  sortColumn,
  sortDirection,
  onSort
}) {
  function onPointerDown(event) {
    if (event.pointerType === 'mouse' && event.buttons !== 1) {
      return;
    }

    const {
      currentTarget,
      pointerId
    } = event;
    const {
      right
    } = currentTarget.getBoundingClientRect();
    const offset = right - event.clientX;

    if (offset > 11) {
      return;
    }

    function onPointerMove(event) {
      if (event.pointerId !== pointerId) return;

      if (event.pointerType === 'mouse' && event.buttons !== 1) {
        onPointerUp(event);
        return;
      }

      const width = event.clientX + offset - currentTarget.getBoundingClientRect().left;

      if (width > 0) {
        onResize(column, width);
      }
    }

    function onPointerUp(event) {
      if (event.pointerId !== pointerId) return;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    }

    event.preventDefault();
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }

  function getCell() {
    if (column.headerRenderer) {
      return /*#__PURE__*/jsx(column.headerRenderer, {
        column: column,
        sortColumn: sortColumn,
        sortDirection: sortDirection,
        onSort: onSort,
        allRowsSelected: allRowsSelected,
        onAllRowsSelectionChange: onAllRowsSelectionChange
      });
    }

    if (column.sortable) {
      return /*#__PURE__*/jsx(SortableHeaderCell, {
        column: column,
        onSort: onSort,
        sortColumn: sortColumn,
        sortDirection: sortDirection,
        children: column.name
      });
    }

    return column.name;
  }

  const className = clsx('rdg-cell', column.headerCellClass, column.resizable && 'rdg-cell-resizable', column.frozen && 'rdg-cell-frozen', column.isLastFrozenColumn && 'rdg-cell-frozen-last');
  return /*#__PURE__*/jsx("div", {
    role: "columnheader",
    "aria-colindex": column.idx + 1,
    "aria-sort": sortColumn === column.key ? getAriaSort(sortDirection) : undefined,
    className: className,
    style: getCellStyle(column),
    onPointerDown: column.resizable ? onPointerDown : undefined,
    children: getCell()
  });
}

function HeaderRow({
  columns,
  rows,
  rowKeyGetter,
  onSelectedRowsChange,
  allRowsSelected,
  onColumnResize,
  sortColumn,
  sortDirection,
  onSort
}) {
  const handleAllRowsSelectionChange = useCallback(checked => {
    if (!onSelectedRowsChange) return;
    assertIsValidKeyGetter(rowKeyGetter);
    const newSelectedRows = new Set();

    if (checked) {
      for (const row of rows) {
        newSelectedRows.add(rowKeyGetter(row));
      }
    }

    onSelectedRowsChange(newSelectedRows);
  }, [onSelectedRowsChange, rows, rowKeyGetter]);
  return /*#__PURE__*/jsx("div", {
    role: "row",
    "aria-rowindex": 1,
    className: "rdg-header-row",
    children: columns.map(column => {
      return /*#__PURE__*/jsx(HeaderCell, {
        column: column,
        onResize: onColumnResize,
        allRowsSelected: allRowsSelected,
        onAllRowsSelectionChange: handleAllRowsSelectionChange,
        onSort: onSort,
        sortColumn: sortColumn,
        sortDirection: sortDirection
      }, column.key);
    })
  });
}

const HeaderRow$1 = /*#__PURE__*/memo(HeaderRow);

function FilterRow({
  columns,
  filters,
  onFiltersChange
}) {
  function onChange(key, value) {
    const newFilters = { ...filters
    };
    newFilters[key] = value;
    onFiltersChange == null ? void 0 : onFiltersChange(newFilters);
  }

  return /*#__PURE__*/jsx("div", {
    role: "row",
    "aria-rowindex": 2,
    className: "rdg-filter-row",
    children: columns.map(column => {
      const {
        key
      } = column;
      const className = clsx('rdg-cell', column.frozen && 'rdg-cell-frozen', column.isLastFrozenColumn && 'rdg-cell-frozen-last');
      return /*#__PURE__*/jsx("div", {
        className: className,
        style: getCellStyle(column),
        children: column.filterRenderer && /*#__PURE__*/jsx(column.filterRenderer, {
          column: column,
          value: filters == null ? void 0 : filters[column.key],
          onChange: value => onChange(key, value)
        })
      }, key);
    })
  });
}

const FilterRow$1 = /*#__PURE__*/memo(FilterRow);

function Cell({
  className,
  column,
  isCellSelected,
  isCopied,
  isDraggedOver,
  isRowSelected,
  row,
  rowIdx,
  dragHandleProps,
  onRowClick,
  onClick,
  onDoubleClick,
  onContextMenu,
  onRowChange,
  selectCell,
  selectRow,
  ...props
}, ref) {
  const cellRef = useRef(null);
  const {
    cellClass
  } = column;
  className = clsx('rdg-cell', typeof cellClass === 'function' ? cellClass(row) : cellClass, className, column.frozen && 'rdg-cell-frozen', column.isLastFrozenColumn && 'rdg-cell-frozen-last', isCellSelected && 'rdg-cell-selected', isCopied && 'rdg-cell-copied', isDraggedOver && 'rdg-cell-dragged-over');

  function selectCellWrapper(openEditor) {
    selectCell({
      idx: column.idx,
      rowIdx
    }, openEditor);
  }

  function handleClick() {
    var _column$editorOptions;

    selectCellWrapper((_column$editorOptions = column.editorOptions) == null ? void 0 : _column$editorOptions.editOnClick);
    onRowClick == null ? void 0 : onRowClick(rowIdx, row, column);
  }

  function handleContextMenu() {
    selectCellWrapper();
  }

  function handleDoubleClick() {
    selectCellWrapper(true);
  }

  function handleRowChange(newRow) {
    onRowChange(rowIdx, newRow);
  }

  function onRowSelectionChange(checked, isShiftClick) {
    selectRow({
      rowIdx,
      checked,
      isShiftClick
    });
  }

  return /*#__PURE__*/jsx("div", {
    role: "gridcell",
    "aria-colindex": column.idx + 1,
    "aria-selected": isCellSelected,
    ref: useCombinedRefs(cellRef, ref),
    className: className,
    style: getCellStyle(column),
    onClick: wrapEvent(handleClick, onClick),
    onDoubleClick: wrapEvent(handleDoubleClick, onDoubleClick),
    onContextMenu: wrapEvent(handleContextMenu, onContextMenu),
    ...props,
    children: !column.rowGroup && /*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsx(column.formatter, {
        column: column,
        rowIdx: rowIdx,
        row: row,
        isCellSelected: isCellSelected,
        isRowSelected: isRowSelected,
        onRowSelectionChange: onRowSelectionChange,
        onRowChange: handleRowChange
      }), dragHandleProps && /*#__PURE__*/jsx("div", {
        className: "rdg-cell-drag-handle",
        ...dragHandleProps
      })]
    })
  });
}

const Cell$1 = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Cell));

function EditorContainer({
  row,
  column,
  onRowChange,
  ...props
}) {
  var _column$editorOptions;

  const onClickCapture = useClickOutside(() => onRowChange(row, true));
  if (column.editor === undefined) return null;

  const editor = /*#__PURE__*/jsx("div", {
    className: "rdg-editor-container",
    onClickCapture: onClickCapture,
    children: /*#__PURE__*/jsx(column.editor, {
      row: row,
      column: column,
      onRowChange: onRowChange,
      ...props
    })
  });

  if ((_column$editorOptions = column.editorOptions) != null && _column$editorOptions.createPortal) {
    return /*#__PURE__*/createPortal(editor, props.editorPortalTarget);
  }

  return editor;
}

function EditCell({
  className,
  column,
  row,
  rowIdx,
  editorProps,
  ...props
}) {
  const [dimensions, setDimensions] = useState(null);
  const cellRef = useCallback(node => {
    if (node !== null) {
      const {
        left,
        top
      } = node.getBoundingClientRect();
      setDimensions({
        left,
        top
      });
    }
  }, []);
  const {
    cellClass
  } = column;
  className = clsx("rdg-cell rdg-cell-selected rdg-cell-editing", typeof cellClass === 'function' ? cellClass(row) : cellClass, className, column.frozen && 'rdg-cell-frozen', column.isLastFrozenColumn && 'rdg-cell-frozen-last');

  function getCellContent() {
    var _document$scrollingEl;

    if (dimensions === null) return;
    const {
      scrollTop: docTop,
      scrollLeft: docLeft
    } = (_document$scrollingEl = document.scrollingElement) != null ? _document$scrollingEl : document.documentElement;
    const {
      left,
      top
    } = dimensions;
    const gridLeft = left + docLeft;
    const gridTop = top + docTop;
    return /*#__PURE__*/jsx(EditorContainer, { ...editorProps,
      rowIdx: rowIdx,
      column: column,
      left: gridLeft,
      top: gridTop
    });
  }

  return /*#__PURE__*/jsx("div", {
    role: "gridcell",
    "aria-colindex": column.idx + 1,
    "aria-selected": true,
    ref: cellRef,
    className: className,
    style: getCellStyle(column),
    ...props,
    children: getCellContent()
  });
}

function Row({
  cellRenderer: CellRenderer = Cell$1,
  className,
  rowIdx,
  isRowSelected,
  copiedCellIdx,
  draggedOverCellIdx,
  row,
  viewportColumns,
  selectedCellProps,
  onRowClick,
  rowClass,
  setDraggedOverRowIdx,
  onMouseEnter,
  top,
  onRowChange,
  selectCell,
  selectRow,
  'aria-rowindex': ariaRowIndex,
  'aria-selected': ariaSelected,
  ...props
}, ref) {
  function handleDragEnter() {
    setDraggedOverRowIdx == null ? void 0 : setDraggedOverRowIdx(rowIdx);
  }

  className = clsx(`rdg-row rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`, rowClass == null ? void 0 : rowClass(row), className, isRowSelected && 'rdg-row-selected', (selectedCellProps == null ? void 0 : selectedCellProps.idx) === -1 && 'rdg-group-row-selected');
  return /*#__PURE__*/jsx("div", {
    role: "row",
    "aria-rowindex": ariaRowIndex,
    "aria-selected": ariaSelected,
    ref: ref,
    className: className,
    onMouseEnter: wrapEvent(handleDragEnter, onMouseEnter),
    style: {
      top
    },
    ...props,
    children: viewportColumns.map(column => {
      const isCellSelected = (selectedCellProps == null ? void 0 : selectedCellProps.idx) === column.idx;

      if ((selectedCellProps == null ? void 0 : selectedCellProps.mode) === 'EDIT' && isCellSelected) {
        return /*#__PURE__*/jsx(EditCell, {
          rowIdx: rowIdx,
          column: column,
          row: row,
          onKeyDown: selectedCellProps.onKeyDown,
          editorProps: selectedCellProps.editorProps
        }, column.key);
      }

      return /*#__PURE__*/jsx(CellRenderer, {
        rowIdx: rowIdx,
        column: column,
        row: row,
        isCopied: copiedCellIdx === column.idx,
        isDraggedOver: draggedOverCellIdx === column.idx,
        isCellSelected: isCellSelected,
        isRowSelected: isRowSelected,
        dragHandleProps: isCellSelected ? selectedCellProps.dragHandleProps : undefined,
        onFocus: isCellSelected ? selectedCellProps.onFocus : undefined,
        onKeyDown: isCellSelected ? selectedCellProps.onKeyDown : undefined,
        onRowClick: onRowClick,
        onRowChange: onRowChange,
        selectCell: selectCell,
        selectRow: selectRow
      }, column.key);
    })
  });
}

const Row$1 = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Row));

function GroupCell({
  id,
  rowIdx,
  groupKey,
  childRows,
  isExpanded,
  isCellSelected,
  isRowSelected,
  column,
  groupColumnIndex,
  selectRow,
  toggleGroup: toggleGroupWrapper
}) {
  function toggleGroup() {
    toggleGroupWrapper(id);
  }

  function onRowSelectionChange(checked) {
    selectRow({
      rowIdx,
      checked,
      isShiftClick: false
    });
  }

  const isLevelMatching = column.rowGroup && groupColumnIndex === column.idx;
  return /*#__PURE__*/jsx("div", {
    role: "gridcell",
    "aria-colindex": column.idx + 1,
    className: clsx('rdg-cell', column.frozen && 'rdg-cell-frozen', column.isLastFrozenColumn && 'rdg-cell-frozen-last', isCellSelected && 'rdg-cell-selected'),
    style: { ...getCellStyle(column),
      cursor: isLevelMatching ? 'pointer' : 'default'
    },
    onClick: isLevelMatching ? toggleGroup : undefined,
    children: column.groupFormatter && (!column.rowGroup || groupColumnIndex === column.idx) && /*#__PURE__*/jsx(column.groupFormatter, {
      groupKey: groupKey,
      childRows: childRows,
      column: column,
      isExpanded: isExpanded,
      isCellSelected: isCellSelected,
      isRowSelected: isRowSelected,
      onRowSelectionChange: onRowSelectionChange,
      toggleGroup: toggleGroup
    })
  }, column.key);
}

const GroupCell$1 = /*#__PURE__*/memo(GroupCell);

function GroupedRow({
  id,
  groupKey,
  viewportColumns,
  childRows,
  rowIdx,
  top,
  level,
  isExpanded,
  selectedCellIdx,
  isRowSelected,
  selectCell,
  selectRow,
  toggleGroup,
  ...props
}) {
  const idx = viewportColumns[0].key === SELECT_COLUMN_KEY ? level + 1 : level;

  function selectGroup() {
    selectCell({
      rowIdx,
      idx: -1
    });
  }

  return /*#__PURE__*/jsx("div", {
    role: "row",
    "aria-level": level,
    "aria-expanded": isExpanded,
    className: clsx(`rdg-row rdg-group-row rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`, isRowSelected && 'rdg-row-selected', selectedCellIdx === -1 && 'rdg-group-row-selected'),
    onClick: selectGroup,
    style: {
      top
    },
    ...props,
    children: viewportColumns.map(column => /*#__PURE__*/jsx(GroupCell$1, {
      id: id,
      rowIdx: rowIdx,
      groupKey: groupKey,
      childRows: childRows,
      isExpanded: isExpanded,
      isRowSelected: isRowSelected,
      isCellSelected: selectedCellIdx === column.idx,
      column: column,
      groupColumnIndex: idx,
      selectRow: selectRow,
      toggleGroup: toggleGroup
    }, column.key))
  });
}

const GroupRowRenderer = /*#__PURE__*/memo(GroupedRow);

function SummaryCell({
  column,
  row
}) {
  const {
    summaryFormatter: SummaryFormatter,
    summaryCellClass
  } = column;
  const className = clsx('rdg-cell', typeof summaryCellClass === 'function' ? summaryCellClass(row) : summaryCellClass, column.frozen && 'rdg-cell-frozen', column.isLastFrozenColumn && 'rdg-cell-frozen-last');
  return /*#__PURE__*/jsx("div", {
    role: "gridcell",
    "aria-colindex": column.idx + 1,
    className: className,
    style: getCellStyle(column),
    children: SummaryFormatter && /*#__PURE__*/jsx(SummaryFormatter, {
      column: column,
      row: row
    })
  });
}

const SummaryCell$1 = /*#__PURE__*/memo(SummaryCell);

function SummaryRow({
  rowIdx,
  row,
  viewportColumns,
  bottom,
  'aria-rowindex': ariaRowIndex
}) {
  return /*#__PURE__*/jsx("div", {
    role: "row",
    "aria-rowindex": ariaRowIndex,
    className: `rdg-row rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'} rdg-summary-row`,
    style: {
      bottom
    },
    children: viewportColumns.map(column => /*#__PURE__*/jsx(SummaryCell$1, {
      column: column,
      row: row
    }, column.key))
  });
}

const SummaryRow$1 = /*#__PURE__*/memo(SummaryRow);

var _globalThis$document;
const body = (_globalThis$document = globalThis.document) == null ? void 0 : _globalThis$document.body;

function DataGrid({
  columns: rawColumns,
  rows: rawRows,
  summaryRows,
  rowKeyGetter,
  onRowsChange,
  rowHeight = 35,
  headerRowHeight = rowHeight,
  headerFiltersHeight = 45,
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
  expandedGroupIds,
  onExpandedGroupIdsChange,
  rowRenderer: RowRenderer = Row$1,
  emptyRowsRenderer: EmptyRowsRenderer,
  onRowClick,
  onScroll,
  onColumnResize,
  onSelectedCellChange,
  onFill,
  onPaste,
  enableFilterRow = false,
  cellNavigationMode = 'NONE',
  editorPortalTarget = body,
  className,
  style,
  rowClass,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy
}, ref) {
  var _summaryRows$length;

  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [columnWidths, setColumnWidths] = useState(() => new Map());
  const [selectedPosition, setSelectedPosition] = useState({
    idx: -1,
    rowIdx: -1,
    mode: 'SELECT'
  });
  const [copiedCell, setCopiedCell] = useState(null);
  const [isDragging, setDragging] = useState(false);
  const [draggedOverRowIdx, setOverRowIdx] = useState(undefined);
  const focusSinkRef = useRef(null);
  const prevSelectedPosition = useRef(selectedPosition);
  const latestDraggedOverRowIdx = useRef(draggedOverRowIdx);
  const lastSelectedRowIdx = useRef(-1);
  const isCellFocusable = useRef(false);
  const selectRowWrapper = useLatestFunc(selectRow);
  const selectCellWrapper = useLatestFunc(selectCell);
  const toggleGroupWrapper = useLatestFunc(toggleGroup);
  const handleFormatterRowChangeWrapper = useLatestFunc(updateRow);
  const [gridRef, gridWidth, gridHeight] = useGridDimensions();
  const headerRowsCount = enableFilterRow ? 2 : 1;
  const summaryRowsCount = (_summaryRows$length = summaryRows == null ? void 0 : summaryRows.length) != null ? _summaryRows$length : 0;
  const totalHeaderHeight = headerRowHeight + (enableFilterRow ? headerFiltersHeight : 0);
  const clientHeight = gridHeight - totalHeaderHeight - summaryRowsCount * rowHeight;
  const isSelectable = selectedRows !== undefined && onSelectedRowsChange !== undefined;
  const {
    columns,
    viewportColumns,
    layoutCssVars,
    columnMetrics,
    totalColumnWidth,
    lastFrozenColumnIndex,
    totalFrozenColumnWidth,
    groupBy
  } = useViewportColumns({
    rawColumns,
    columnWidths,
    scrollLeft,
    viewportWidth: gridWidth,
    defaultColumnOptions,
    rawGroupBy: rowGrouper ? rawGroupBy : undefined
  });
  const {
    rowOverscanStartIdx,
    rowOverscanEndIdx,
    rows,
    rowsCount,
    isGroupRow
  } = useViewportRows({
    rawRows,
    groupBy,
    rowGrouper,
    rowHeight,
    clientHeight,
    scrollTop,
    expandedGroupIds
  });
  const hasGroups = groupBy.length > 0 && rowGrouper;
  const minColIdx = hasGroups ? -1 : 0;
  const enableCellDragAndDrop = hasGroups ? false : onFill !== undefined;
  useLayoutEffect(() => {
    if (selectedPosition === prevSelectedPosition.current || selectedPosition.mode === 'EDIT' || !isCellWithinBounds(selectedPosition)) return;
    prevSelectedPosition.current = selectedPosition;
    scrollToCell(selectedPosition);

    if (isCellFocusable.current) {
      isCellFocusable.current = false;
      return;
    }

    focusSinkRef.current.focus({
      preventScroll: true
    });
  });
  useImperativeHandle(ref, () => ({
    scrollToColumn(idx) {
      scrollToCell({
        idx
      });
    },

    scrollToRow(rowIdx) {
      const {
        current
      } = gridRef;
      if (!current) return;
      current.scrollTo({
        top: rowIdx * rowHeight,
        behavior: 'smooth'
      });
    },

    selectCell
  }));
  const handleColumnResize = useCallback((column, width) => {
    const newColumnWidths = new Map(columnWidths);
    newColumnWidths.set(column.key, width);
    setColumnWidths(newColumnWidths);
    onColumnResize == null ? void 0 : onColumnResize(column.idx, width);
  }, [columnWidths, onColumnResize]);
  const setDraggedOverRowIdx = useCallback(rowIdx => {
    setOverRowIdx(rowIdx);
    latestDraggedOverRowIdx.current = rowIdx;
  }, []);

  function selectRow({
    rowIdx,
    checked,
    isShiftClick
  }) {
    if (!onSelectedRowsChange) return;
    assertIsValidKeyGetter(rowKeyGetter);
    const newSelectedRows = new Set(selectedRows);
    const row = rows[rowIdx];

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
      lastSelectedRowIdx.current = rowIdx;

      if (isShiftClick && previousRowIdx !== -1 && previousRowIdx !== rowIdx) {
        const step = Math.sign(rowIdx - previousRowIdx);

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

  function toggleGroup(expandedGroupId) {
    if (!onExpandedGroupIdsChange) return;
    const newExpandedGroupIds = new Set(expandedGroupIds);

    if (newExpandedGroupIds.has(expandedGroupId)) {
      newExpandedGroupIds.delete(expandedGroupId);
    } else {
      newExpandedGroupIds.add(expandedGroupId);
    }

    onExpandedGroupIdsChange(newExpandedGroupIds);
  }

  function handleKeyDown(event) {
    const {
      key,
      keyCode
    } = event;
    const row = rows[selectedPosition.rowIdx];

    if (onPaste && isCtrlKeyHeldDown(event) && isCellWithinBounds(selectedPosition) && !isGroupRow(row) && selectedPosition.idx !== -1 && selectedPosition.mode === 'SELECT') {
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

    if (isCellWithinBounds(selectedPosition) && isGroupRow(row) && selectedPosition.idx === -1 && (key === 'ArrowLeft' && row.isExpanded || key === 'ArrowRight' && !row.isExpanded)) {
      event.preventDefault();
      toggleGroup(row.id);
      return;
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

  function handleScroll(event) {
    const {
      scrollTop,
      scrollLeft
    } = event.currentTarget;
    setScrollTop(scrollTop);
    setScrollLeft(scrollLeft);
    onScroll == null ? void 0 : onScroll(event);
  }

  function getRawRowIdx(rowIdx) {
    return hasGroups ? rawRows.indexOf(rows[rowIdx]) : rowIdx;
  }

  function updateRow(rowIdx, row) {
    if (typeof onRowsChange !== 'function') return;
    const updatedRows = [...rawRows];
    updatedRows[rowIdx] = row;
    onRowsChange(updatedRows, {
      indexes: [rowIdx],
      column: columns[selectedPosition.idx]
    });
  }

  function commitEditorChanges() {
    var _columns$selectedPosi;

    if (((_columns$selectedPosi = columns[selectedPosition.idx]) == null ? void 0 : _columns$selectedPosi.editor) === undefined || selectedPosition.mode === 'SELECT' || selectedPosition.row === selectedPosition.originalRow) {
      return;
    }

    const rowIdx = getRawRowIdx(selectedPosition.rowIdx);
    updateRow(rowIdx, selectedPosition.row);
  }

  function handleCopy() {
    const {
      idx,
      rowIdx
    } = selectedPosition;
    setCopiedCell({
      row: rawRows[getRawRowIdx(rowIdx)],
      columnKey: columns[idx].key
    });
  }

  function handlePaste() {
    const {
      idx,
      rowIdx
    } = selectedPosition;
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

  function handleCellInput(event) {
    var _column$editorOptions;

    if (!isCellWithinBounds(selectedPosition)) return;
    const row = rows[selectedPosition.rowIdx];
    if (isGroupRow(row)) return;
    const {
      key
    } = event;
    const column = columns[selectedPosition.idx];

    if (selectedPosition.mode === 'EDIT') {
      if (key === 'Enter') {
        commitEditorChanges();
        closeEditor();
      }

      return;
    }

    (_column$editorOptions = column.editorOptions) == null ? void 0 : _column$editorOptions.onCellKeyDown == null ? void 0 : _column$editorOptions.onCellKeyDown(event);
    if (event.isDefaultPrevented()) return;

    if (isCellEditable(selectedPosition) && isDefaultCellInput(event)) {
      setSelectedPosition(({
        idx,
        rowIdx
      }) => ({
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
    const overRowIdx = latestDraggedOverRowIdx.current;
    if (overRowIdx === undefined || !onFill || !onRowsChange) return;
    const {
      idx,
      rowIdx
    } = selectedPosition;
    const sourceRow = rawRows[rowIdx];
    const startRowIndex = rowIdx < overRowIdx ? rowIdx + 1 : overRowIdx;
    const endRowIndex = rowIdx < overRowIdx ? overRowIdx + 1 : rowIdx;
    const targetRows = rawRows.slice(startRowIndex, endRowIndex);
    const column = columns[idx];
    const updatedTargetRows = onFill({
      columnKey: column.key,
      sourceRow,
      targetRows
    });
    const updatedRows = [...rawRows];
    const indexes = [];

    for (let i = startRowIndex; i < endRowIndex; i++) {
      updatedRows[i] = updatedTargetRows[i - startRowIndex];
      indexes.push(i);
    }

    onRowsChange(updatedRows, {
      indexes,
      column
    });
    setDraggedOverRowIdx(undefined);
  }

  function handleMouseDown(event) {
    if (event.buttons !== 1) return;
    setDragging(true);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseup', onMouseUp);

    function onMouseOver(event) {
      if (event.buttons !== 1) onMouseUp();
    }

    function onMouseUp() {
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseup', onMouseUp);
      setDragging(false);
      handleDragEnd();
    }
  }

  function handleDoubleClick(event) {
    event.stopPropagation();
    if (!onFill || !onRowsChange) return;
    const {
      idx,
      rowIdx
    } = selectedPosition;
    const sourceRow = rawRows[rowIdx];
    const targetRows = rawRows.slice(rowIdx + 1);
    const column = columns[idx];
    const updatedTargetRows = onFill({
      columnKey: column.key,
      sourceRow,
      targetRows
    });
    const updatedRows = [...rawRows];
    const indexes = [];

    for (let i = rowIdx + 1; i < updatedRows.length; i++) {
      updatedRows[i] = updatedTargetRows[i - rowIdx - 1];
      indexes.push(i);
    }

    onRowsChange(updatedRows, {
      indexes,
      column
    });
  }

  function handleEditorRowChange(row, commitChanges) {
    if (selectedPosition.mode === 'SELECT') return;

    if (commitChanges) {
      updateRow(getRawRowIdx(selectedPosition.rowIdx), row);
      closeEditor();
    } else {
      setSelectedPosition(position => ({ ...position,
        row
      }));
    }
  }

  function handleOnClose(commitChanges) {
    if (commitChanges) {
      commitEditorChanges();
    }

    closeEditor();
  }

  function isCellWithinBounds({
    idx,
    rowIdx
  }) {
    return rowIdx >= 0 && rowIdx < rows.length && idx >= minColIdx && idx < columns.length;
  }

  function isCellEditable(position) {
    return isCellWithinBounds(position) && isSelectedCellEditable({
      columns,
      rows,
      selectedPosition: position,
      isGroupRow
    });
  }

  function selectCell(position, enableEditor = false) {
    if (!isCellWithinBounds(position)) return;
    commitEditorChanges();

    if (enableEditor && isCellEditable(position)) {
      const row = rows[position.rowIdx];
      setSelectedPosition({ ...position,
        mode: 'EDIT',
        key: null,
        row,
        originalRow: row
      });
    } else {
      setSelectedPosition({ ...position,
        mode: 'SELECT'
      });
    }

    onSelectedCellChange == null ? void 0 : onSelectedCellChange({ ...position
    });
  }

  function closeEditor() {
    if (selectedPosition.mode === 'SELECT') return;
    setSelectedPosition(({
      idx,
      rowIdx
    }) => ({
      idx,
      rowIdx,
      mode: 'SELECT'
    }));
  }

  function scrollToCell({
    idx,
    rowIdx
  }) {
    const {
      current
    } = gridRef;
    if (!current) return;

    if (typeof idx === 'number' && idx > lastFrozenColumnIndex) {
      const {
        clientWidth
      } = current;
      const {
        left,
        width
      } = columnMetrics.get(columns[idx]);
      const isCellAtLeftBoundary = left < scrollLeft + totalFrozenColumnWidth;
      const isCellAtRightBoundary = left + width > clientWidth + scrollLeft;

      if (isCellAtLeftBoundary) {
        current.scrollLeft = left - totalFrozenColumnWidth;
      } else if (isCellAtRightBoundary) {
        current.scrollLeft = left + width - clientWidth;
      }
    }

    if (typeof rowIdx === 'number') {
      if (rowIdx * rowHeight < scrollTop) {
        current.scrollTop = rowIdx * rowHeight;
      } else if ((rowIdx + 1) * rowHeight > scrollTop + clientHeight) {
        current.scrollTop = (rowIdx + 1) * rowHeight - clientHeight;
      }
    }
  }

  function getNextPosition(key, ctrlKey, shiftKey) {
    const {
      idx,
      rowIdx
    } = selectedPosition;
    const row = rows[rowIdx];
    const isRowSelected = isCellWithinBounds(selectedPosition) && idx === -1;

    if (key === 'ArrowLeft' && isRowSelected && isGroupRow(row) && !row.isExpanded && row.level !== 0) {
      let parentRowIdx = -1;

      for (let i = selectedPosition.rowIdx - 1; i >= 0; i--) {
        const parentRow = rows[i];

        if (isGroupRow(parentRow) && parentRow.id === row.parentId) {
          parentRowIdx = i;
          break;
        }
      }

      if (parentRowIdx !== -1) {
        return {
          idx,
          rowIdx: parentRowIdx
        };
      }
    }

    switch (key) {
      case 'ArrowUp':
        return {
          idx,
          rowIdx: rowIdx - 1
        };

      case 'ArrowDown':
        return {
          idx,
          rowIdx: rowIdx + 1
        };

      case 'ArrowLeft':
        return {
          idx: idx - 1,
          rowIdx
        };

      case 'ArrowRight':
        return {
          idx: idx + 1,
          rowIdx
        };

      case 'Tab':
        if (selectedPosition.idx === -1 && selectedPosition.rowIdx === -1) {
          return shiftKey ? {
            idx: columns.length - 1,
            rowIdx: rows.length - 1
          } : {
            idx: 0,
            rowIdx: 0
          };
        }

        return {
          idx: idx + (shiftKey ? -1 : 1),
          rowIdx
        };

      case 'Home':
        if (isRowSelected) return {
          idx,
          rowIdx: 0
        };
        return ctrlKey ? {
          idx: 0,
          rowIdx: 0
        } : {
          idx: 0,
          rowIdx
        };

      case 'End':
        if (isRowSelected) return {
          idx,
          rowIdx: rows.length - 1
        };
        return ctrlKey ? {
          idx: columns.length - 1,
          rowIdx: rows.length - 1
        } : {
          idx: columns.length - 1,
          rowIdx
        };

      case 'PageUp':
        return {
          idx,
          rowIdx: rowIdx - Math.floor(clientHeight / rowHeight)
        };

      case 'PageDown':
        return {
          idx,
          rowIdx: rowIdx + Math.floor(clientHeight / rowHeight)
        };

      default:
        return selectedPosition;
    }
  }

  function navigate(event) {
    if (selectedPosition.mode === 'EDIT') {
      var _columns$selectedPosi2, _columns$selectedPosi3;

      const onNavigation = (_columns$selectedPosi2 = (_columns$selectedPosi3 = columns[selectedPosition.idx].editorOptions) == null ? void 0 : _columns$selectedPosi3.onNavigation) != null ? _columns$selectedPosi2 : onEditorNavigation;
      if (!onNavigation(event)) return;
    }

    const {
      key,
      shiftKey
    } = event;
    const ctrlKey = isCtrlKeyHeldDown(event);
    let nextPosition = getNextPosition(key, ctrlKey, shiftKey);
    let mode = cellNavigationMode;

    if (key === 'Tab') {
      if (canExitGrid({
        shiftKey,
        cellNavigationMode,
        columns,
        rowsCount: rows.length,
        selectedPosition
      })) {
        commitEditorChanges();
        return;
      }

      mode = cellNavigationMode === 'NONE' ? 'CHANGE_ROW' : cellNavigationMode;
    }

    event.preventDefault();
    nextPosition = getNextSelectedCellPosition({
      columns,
      rowsCount: rows.length,
      cellNavigationMode: mode,
      nextPosition
    });
    selectCell(nextPosition);
  }

  function getDraggedOverCellIdx(currentRowIdx) {
    if (draggedOverRowIdx === undefined) return;
    const {
      rowIdx
    } = selectedPosition;
    const isDraggedOver = rowIdx < draggedOverRowIdx ? rowIdx < currentRowIdx && currentRowIdx <= draggedOverRowIdx : rowIdx > currentRowIdx && currentRowIdx >= draggedOverRowIdx;
    return isDraggedOver ? selectedPosition.idx : undefined;
  }

  function getSelectedCellProps(rowIdx) {
    if (selectedPosition.rowIdx !== rowIdx) return;

    if (selectedPosition.mode === 'EDIT') {
      return {
        mode: 'EDIT',
        idx: selectedPosition.idx,
        onKeyDown: handleKeyDown,
        editorProps: {
          editorPortalTarget,
          rowHeight,
          row: selectedPosition.row,
          onRowChange: handleEditorRowChange,
          onClose: handleOnClose
        }
      };
    }

    return {
      mode: 'SELECT',
      idx: selectedPosition.idx,
      onFocus: handleFocus,
      onKeyDown: handleKeyDown,
      dragHandleProps: enableCellDragAndDrop && isCellEditable(selectedPosition) ? {
        onMouseDown: handleMouseDown,
        onDoubleClick: handleDoubleClick
      } : undefined
    };
  }

  function getViewportRows() {
    const rowElements = [];
    let startRowIndex = 0;

    for (let rowIdx = rowOverscanStartIdx; rowIdx <= rowOverscanEndIdx; rowIdx++) {
      const row = rows[rowIdx];
      const top = rowIdx * rowHeight + totalHeaderHeight;

      if (isGroupRow(row)) {
        ({
          startRowIndex
        } = row);
        rowElements.push( /*#__PURE__*/jsx(GroupRowRenderer, {
          "aria-level": row.level + 1,
          "aria-setsize": row.setSize,
          "aria-posinset": row.posInSet + 1,
          "aria-rowindex": headerRowsCount + startRowIndex + 1,
          id: row.id,
          groupKey: row.groupKey,
          viewportColumns: viewportColumns,
          childRows: row.childRows,
          rowIdx: rowIdx,
          top: top,
          level: row.level,
          isExpanded: row.isExpanded,
          selectedCellIdx: selectedPosition.rowIdx === rowIdx ? selectedPosition.idx : undefined,
          isRowSelected: isSelectable && row.childRows.every(cr => selectedRows == null ? void 0 : selectedRows.has(rowKeyGetter(cr))),
          onFocus: selectedPosition.rowIdx === rowIdx ? handleFocus : undefined,
          onKeyDown: selectedPosition.rowIdx === rowIdx ? handleKeyDown : undefined,
          selectCell: selectCellWrapper,
          selectRow: selectRowWrapper,
          toggleGroup: toggleGroupWrapper
        }, row.id));
        continue;
      }

      startRowIndex++;
      let key = hasGroups ? startRowIndex : rowIdx;
      let isRowSelected = false;

      if (typeof rowKeyGetter === 'function') {
        var _selectedRows$has;

        key = rowKeyGetter(row);
        isRowSelected = (_selectedRows$has = selectedRows == null ? void 0 : selectedRows.has(key)) != null ? _selectedRows$has : false;
      }

      rowElements.push( /*#__PURE__*/jsx(RowRenderer, {
        "aria-rowindex": headerRowsCount + (hasGroups ? startRowIndex : rowIdx) + 1,
        "aria-selected": isSelectable ? isRowSelected : undefined,
        rowIdx: rowIdx,
        row: row,
        viewportColumns: viewportColumns,
        isRowSelected: isRowSelected,
        onRowClick: onRowClick,
        rowClass: rowClass,
        top: top,
        copiedCellIdx: copiedCell !== null && copiedCell.row === row ? columns.findIndex(c => c.key === copiedCell.columnKey) : undefined,
        draggedOverCellIdx: getDraggedOverCellIdx(rowIdx),
        setDraggedOverRowIdx: isDragging ? setDraggedOverRowIdx : undefined,
        selectedCellProps: getSelectedCellProps(rowIdx),
        onRowChange: handleFormatterRowChangeWrapper,
        selectCell: selectCellWrapper,
        selectRow: selectRowWrapper
      }, key));
    }

    return rowElements;
  }

  if (selectedPosition.idx >= columns.length || selectedPosition.rowIdx >= rows.length) {
    setSelectedPosition({
      idx: -1,
      rowIdx: -1,
      mode: 'SELECT'
    });
    setDraggedOverRowIdx(undefined);
  }

  if (selectedPosition.mode === 'EDIT' && rows[selectedPosition.rowIdx] !== selectedPosition.originalRow) {
    closeEditor();
  }

  return /*#__PURE__*/jsxs("div", {
    role: hasGroups ? 'treegrid' : 'grid',
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "aria-multiselectable": isSelectable ? true : undefined,
    "aria-colcount": columns.length,
    "aria-rowcount": headerRowsCount + rowsCount + summaryRowsCount,
    className: clsx('rdg', className, isDragging && 'rdg-viewport-dragging'),
    style: { ...style,
      '--header-row-height': `${headerRowHeight}px`,
      '--filter-row-height': `${headerFiltersHeight}px`,
      '--row-width': `${totalColumnWidth}px`,
      '--row-height': `${rowHeight}px`,
      ...layoutCssVars
    },
    ref: gridRef,
    onScroll: handleScroll,
    children: [/*#__PURE__*/jsx(HeaderRow$1, {
      rowKeyGetter: rowKeyGetter,
      rows: rawRows,
      columns: viewportColumns,
      onColumnResize: handleColumnResize,
      allRowsSelected: (selectedRows == null ? void 0 : selectedRows.size) === rawRows.length,
      onSelectedRowsChange: onSelectedRowsChange,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      onSort: onSort
    }), enableFilterRow && /*#__PURE__*/jsx(FilterRow$1, {
      columns: viewportColumns,
      filters: filters,
      onFiltersChange: onFiltersChange
    }), rows.length === 0 && EmptyRowsRenderer ? /*#__PURE__*/jsx(EmptyRowsRenderer, {}) : /*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsx("div", {
        ref: focusSinkRef,
        tabIndex: 0,
        className: "rdg-focus-sink",
        onKeyDown: handleKeyDown
      }), /*#__PURE__*/jsx("div", {
        style: {
          height: Math.max(rows.length * rowHeight, clientHeight)
        }
      }), getViewportRows(), summaryRows == null ? void 0 : summaryRows.map((row, rowIdx) => /*#__PURE__*/jsx(SummaryRow$1, {
        "aria-rowindex": headerRowsCount + rowsCount + rowIdx + 1,
        rowIdx: rowIdx,
        row: row,
        bottom: rowHeight * (summaryRows.length - 1 - rowIdx),
        viewportColumns: viewportColumns
      }, rowIdx))]
    })]
  });
}

const DataGrid$1 = /*#__PURE__*/forwardRef(DataGrid);

function autoFocusAndSelect(input) {
  input == null ? void 0 : input.focus();
  input == null ? void 0 : input.select();
}

function TextEditor({
  row,
  column,
  onRowChange,
  onClose
}) {
  return /*#__PURE__*/jsx("input", {
    className: "rdg-text-editor",
    ref: autoFocusAndSelect,
    value: row[column.key],
    onChange: event => onRowChange({ ...row,
      [column.key]: event.target.value
    }),
    onBlur: () => onClose(true)
  });
}

export default DataGrid$1;
export { Cell$1 as Cell, Row$1 as Row, SELECT_COLUMN_KEY, SelectCellFormatter, SelectColumn, SortableHeaderCell, TextEditor, ToggleGroupFormatter, ValueFormatter };
//# sourceMappingURL=bundle.js.map
