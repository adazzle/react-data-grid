'use strict';

Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

const react = require('react');
const clsx = require('clsx');
const jsxRuntime = require('react/jsx-runtime');

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$f = ".cj343x070_0-beta_7{background-color:inherit;border-bottom:1px solid var(--border-color);border-right:1px solid var(--border-color);contain:strict;contain:size layout style paint;outline:none;overflow:hidden;overflow:clip;padding:0 8px;text-overflow:ellipsis;white-space:nowrap}.cj343x070_0-beta_7[aria-selected=true]{box-shadow:inset 0 0 0 2px var(--selection-color)}.csofj7r70_0-beta_7{position:sticky;z-index:1}.ch2wcw870_0-beta_7{box-shadow:2px 0 5px -2px hsla(0,0%,53%,.3)}";
styleInject(css_248z$f,{"insertAt":"top"});

const cell = "cj343x070_0-beta_7";
const cellClassname = `rdg-cell ${cell}`;
const cellFrozen = "csofj7r70_0-beta_7";
const cellFrozenClassname = `rdg-cell-frozen ${cellFrozen}`;
const cellFrozenLast = "ch2wcw870_0-beta_7";
const cellFrozenLastClassname = `rdg-cell-frozen-last ${cellFrozenLast}`;

var css_248z$e = ".rnvodz570_0-beta_7{--color:#000;--border-color:#ddd;--summary-border-color:#aaa;--background-color:#fff;--header-background-color:#f9f9f9;--row-hover-background-color:#f5f5f5;--row-selected-background-color:#dbecfa;--row-selected-hover-background-color:#c9e3f8;--checkbox-color:#005194;--checkbox-focus-color:#61b8ff;--checkbox-disabled-border-color:#ccc;--checkbox-disabled-background-color:#ddd;--selection-color:#66afe9;--font-size:14px;content-visibility:auto;background-color:var(--background-color);border:1px solid var(--border-color);box-sizing:border-box;color:var(--color);color-scheme:var(--color-scheme,light dark);contain:strict;contain:size layout style paint;direction:ltr;font-size:var(--font-size);height:350px;overflow:auto;user-select:none}@supports not (contain:strict){.rnvodz570_0-beta_7{position:relative;z-index:0}}.rnvodz570_0-beta_7 *,.rnvodz570_0-beta_7 :after,.rnvodz570_0-beta_7 :before{box-sizing:inherit}.rnvodz570_0-beta_7.rdg-dark{--color-scheme:dark;--color:#ddd;--border-color:#444;--summary-border-color:#555;--background-color:#212121;--header-background-color:#1b1b1b;--row-hover-background-color:#171717;--row-selected-background-color:#1a73bc;--row-selected-hover-background-color:#1768ab;--checkbox-color:#94cfff;--checkbox-focus-color:#c7e6ff;--checkbox-disabled-border-color:#000;--checkbox-disabled-background-color:#333}.rnvodz570_0-beta_7.rdg-light{--color-scheme:light}@media (prefers-color-scheme:dark){.rnvodz570_0-beta_7:not(.rdg-light){--color:#ddd;--border-color:#444;--summary-border-color:#555;--background-color:#212121;--header-background-color:#1b1b1b;--row-hover-background-color:#171717;--row-selected-background-color:#1a73bc;--row-selected-hover-background-color:#1768ab;--checkbox-color:#94cfff;--checkbox-focus-color:#c7e6ff;--checkbox-disabled-border-color:#000;--checkbox-disabled-background-color:#333}}.vlqv91k70_0-beta_7.r1upfr8070_0-beta_7{cursor:move}";
styleInject(css_248z$e,{"insertAt":"top"});

const root = "rnvodz570_0-beta_7";
const rootClassname = `rdg ${root}`;
const viewportDragging = "vlqv91k70_0-beta_7";
const viewportDraggingClassname = `rdg-viewport-dragging ${viewportDragging}`;

var css_248z$d = ".r1upfr8070_0-beta_7{background-color:var(--background-color);contain:strict;contain:size layout style paint;display:grid;grid-template-columns:var(--template-columns);grid-template-rows:var(--row-height);height:var(--row-height);left:0;line-height:var(--row-height);position:absolute;width:var(--row-width)}.r1upfr8070_0-beta_7:hover{background-color:var(--row-hover-background-color)}.r1upfr8070_0-beta_7[aria-selected=true]{background-color:var(--row-selected-background-color)}.r1upfr8070_0-beta_7[aria-selected=true]:hover{background-color:var(--row-selected-hover-background-color)}";
styleInject(css_248z$d,{"insertAt":"top"});

const row = "r1upfr8070_0-beta_7";
const rowClassname = `rdg-row ${row}`;

const useLayoutEffect = typeof window === 'undefined' ? react.useEffect : react.useLayoutEffect;

function useFocusRef(isSelected) {
  const ref = react.useRef(null);
  useLayoutEffect(() => {
    var _ref$current;

    if (!isSelected) return;
    (_ref$current = ref.current) == null ? void 0 : _ref$current.focus({
      preventScroll: true
    });
  }, [isSelected]);
  return {
    ref,
    tabIndex: isSelected ? 0 : -1
  };
}

var css_248z$c = ".c4l3n6v70_0-beta_7{align-items:center;cursor:pointer;display:flex;inset:0;justify-content:center;margin-right:1px;position:absolute}.c1bikpmb70_0-beta_7{all:unset;margin:0;width:0}.c1eyot7g70_0-beta_7{background-color:var(--background-color);border:2px solid var(--border-color);content:\"\";height:20px;width:20px}.c1bikpmb70_0-beta_7:checked+.c1eyot7g70_0-beta_7{background-color:var(--checkbox-color);box-shadow:inset 0 0 0 4px var(--background-color)}.c1bikpmb70_0-beta_7:focus+.c1eyot7g70_0-beta_7{border-color:var(--checkbox-focus-color)}.c1jlcvp470_0-beta_7{cursor:default}.c1jlcvp470_0-beta_7 .c1eyot7g70_0-beta_7{background-color:var(--checkbox-disabled-background-color);border-color:var(--checkbox-disabled-border-color)}";
styleInject(css_248z$c,{"insertAt":"top"});

const checkboxLabel = "c4l3n6v70_0-beta_7";
const checkboxLabelClassname = `rdg-checkbox-label ${checkboxLabel}`;
const checkboxInput = "c1bikpmb70_0-beta_7";
const checkboxInputClassname = `rdg-checkbox-input ${checkboxInput}`;
const checkbox = "c1eyot7g70_0-beta_7";
const checkboxClassname = `rdg-checkbox ${checkbox}`;
const checkboxLabelDisabled = "c1jlcvp470_0-beta_7";
const checkboxLabelDisabledClassname = `rdg-checkbox-label-disabled ${checkboxLabelDisabled}`;
function SelectCellFormatter({
  value,
  isCellSelected,
  disabled,
  onClick,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy
}) {
  const {
    ref,
    tabIndex
  } = useFocusRef(isCellSelected);

  function handleChange(e) {
    onChange(e.target.checked, e.nativeEvent.shiftKey);
  }

  return /*#__PURE__*/jsxRuntime.jsxs("label", {
    className: clsx(checkboxLabelClassname, disabled && checkboxLabelDisabledClassname),
    children: [/*#__PURE__*/jsxRuntime.jsx("input", {
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ref: ref,
      type: "checkbox",
      tabIndex: tabIndex,
      className: checkboxInputClassname,
      disabled: disabled,
      checked: value,
      onChange: handleChange,
      onClick: onClick
    }), /*#__PURE__*/jsxRuntime.jsx("div", {
      className: checkboxClassname
    })]
  });
}

function ValueFormatter(props) {
  try {
    return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: props.row[props.column.key]
    });
  } catch {
    return null;
  }
}

var css_248z$b = ".g1vzro7t70_0-beta_7{outline:none}.c1fsqdic70_0-beta_7{stroke:currentColor;stroke-width:1.5px;fill:transparent;margin-left:4px;vertical-align:middle}.c1fsqdic70_0-beta_7>path{transition:d .1s}";
styleInject(css_248z$b,{"insertAt":"top"});

const groupCellContent = "g1vzro7t70_0-beta_7";
const groupCellContentClassname = `rdg-group-cell-content ${groupCellContent}`;
const caret = "c1fsqdic70_0-beta_7";
const caretClassname = `rdg-caret ${caret}`;
function ToggleGroupFormatter({
  groupKey,
  isExpanded,
  isCellSelected,
  toggleGroup
}) {
  const {
    ref,
    tabIndex
  } = useFocusRef(isCellSelected);

  function handleKeyDown({
    key
  }) {
    if (key === 'Enter') {
      toggleGroup();
    }
  }

  const d = isExpanded ? 'M1 1 L 7 7 L 13 1' : 'M1 7 L 7 1 L 13 7';
  return /*#__PURE__*/jsxRuntime.jsxs("span", {
    ref: ref,
    className: groupCellContentClassname,
    tabIndex: tabIndex,
    onKeyDown: handleKeyDown,
    children: [groupKey, /*#__PURE__*/jsxRuntime.jsx("svg", {
      viewBox: "0 0 14 8",
      width: "14",
      height: "8",
      className: caretClassname,
      "aria-hidden": true,
      children: /*#__PURE__*/jsxRuntime.jsx("path", {
        d: d
      })
    })]
  });
}

const RowSelectionContext = /*#__PURE__*/react.createContext(undefined);
const RowSelectionProvider = RowSelectionContext.Provider;
const RowSelectionChangeContext = /*#__PURE__*/react.createContext(undefined);
const RowSelectionChangeProvider = RowSelectionChangeContext.Provider;
function useRowSelection() {
  const rowSelectionContext = react.useContext(RowSelectionContext);
  const rowSelectionChangeContext = react.useContext(RowSelectionChangeContext);

  if (rowSelectionContext === undefined || rowSelectionChangeContext === undefined) {
    throw new Error('useRowSelection must be used within DataGrid cells');
  }

  return [rowSelectionContext, rowSelectionChangeContext];
}

function getColSpan(column, lastFrozenColumnIndex, args) {
  const colSpan = typeof column.colSpan === 'function' ? column.colSpan(args) : 1;

  if (Number.isInteger(colSpan) && colSpan > 1 && (!column.frozen || column.idx + colSpan - 1 <= lastFrozenColumnIndex)) {
    return colSpan;
  }

  return undefined;
}

function stopPropagation(event) {
  event.stopPropagation();
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
  return !isGroupRow(row) && isCellEditable(column, row);
}
function isCellEditable(column, row) {
  return column.editor != null && !column.rowGroup && (typeof column.editable === 'function' ? column.editable(row) : column.editable) !== false;
}
function getSelectedCellColSpan({
  rows,
  summaryRows,
  rowIdx,
  lastFrozenColumnIndex,
  column,
  isGroupRow
}) {
  if (rowIdx === -1) {
    return getColSpan(column, lastFrozenColumnIndex, {
      type: 'HEADER'
    });
  }

  if (rowIdx >= 0 && rowIdx < rows.length) {
    const row = rows[rowIdx];

    if (!isGroupRow(row)) {
      return getColSpan(column, lastFrozenColumnIndex, {
        type: 'ROW',
        row
      });
    }

    return undefined;
  }

  if (summaryRows) {
    return getColSpan(column, lastFrozenColumnIndex, {
      type: 'SUMMARY',
      row: summaryRows[rowIdx - rows.length]
    });
  }

  return undefined;
}
function getNextSelectedCellPosition({
  cellNavigationMode,
  columns,
  colSpanColumns,
  rows,
  summaryRows,
  minRowIdx,
  maxRowIdx,
  currentPosition: {
    idx: currentIdx
  },
  nextPosition,
  lastFrozenColumnIndex,
  isCellWithinBounds,
  isGroupRow
}) {
  let {
    idx: nextIdx,
    rowIdx: nextRowIdx
  } = nextPosition;

  const setColSpan = moveRight => {
    if (nextRowIdx >= 0 && nextRowIdx < rows.length) {
      const row = rows[nextRowIdx];
      if (isGroupRow(row)) return;
    }

    for (const column of colSpanColumns) {
      const colIdx = column.idx;
      if (colIdx > nextIdx) break;
      const colSpan = getSelectedCellColSpan({
        rows,
        summaryRows,
        rowIdx: nextRowIdx,
        lastFrozenColumnIndex,
        column,
        isGroupRow
      });

      if (colSpan && nextIdx > colIdx && nextIdx < colSpan + colIdx) {
        nextIdx = colIdx + (moveRight ? colSpan : 0);
        break;
      }
    }
  };

  if (isCellWithinBounds(nextPosition)) {
    setColSpan(nextIdx - currentIdx > 0);
  }

  if (cellNavigationMode !== 'NONE') {
    const columnsCount = columns.length;
    const isAfterLastColumn = nextIdx === columnsCount;
    const isBeforeFirstColumn = nextIdx === -1;

    if (isAfterLastColumn) {
      if (cellNavigationMode === 'CHANGE_ROW') {
        const isLastRow = nextRowIdx === maxRowIdx;

        if (!isLastRow) {
          nextIdx = 0;
          nextRowIdx += 1;
        }
      } else {
        nextIdx = 0;
      }
    } else if (isBeforeFirstColumn) {
      if (cellNavigationMode === 'CHANGE_ROW') {
        const isFirstRow = nextRowIdx === minRowIdx;

        if (!isFirstRow) {
          nextRowIdx -= 1;
          nextIdx = columnsCount - 1;
        }
      } else {
        nextIdx = columnsCount - 1;
      }

      setColSpan(false);
    }
  }

  return {
    idx: nextIdx,
    rowIdx: nextRowIdx
  };
}
function canExitGrid({
  cellNavigationMode,
  maxColIdx,
  minRowIdx,
  maxRowIdx,
  selectedPosition: {
    rowIdx,
    idx
  },
  shiftKey
}) {
  if (cellNavigationMode === 'NONE' || cellNavigationMode === 'CHANGE_ROW') {
    const atLastCellInRow = idx === maxColIdx;
    const atFirstCellInRow = idx === 0;
    const atLastRow = rowIdx === maxRowIdx;
    const atFirstRow = rowIdx === minRowIdx;
    return shiftKey ? atFirstCellInRow && atFirstRow : atLastCellInRow && atLastRow;
  }

  return false;
}

const {
  min,
  max,
  floor,
  sign
} = Math;
function assertIsValidKeyGetter(keyGetter) {
  if (typeof keyGetter !== 'function') {
    throw new Error('Please specify the rowKeyGetter prop to use selection');
  }
}
function getCellStyle(column, colSpan) {
  return {
    gridColumnStart: column.idx + 1,
    gridColumnEnd: colSpan !== undefined ? `span ${colSpan}` : undefined,
    left: column.frozen ? `var(--frozen-left-${column.idx})` : undefined
  };
}
function getCellClassname(column, ...extraClasses) {
  return clsx(cellClassname, ...extraClasses, column.frozen && cellFrozenClassname, column.isLastFrozenColumn && cellFrozenLastClassname);
}

const SELECT_COLUMN_KEY = 'select-row';

function SelectFormatter(props) {
  const [isRowSelected, onRowSelectionChange] = useRowSelection();
  return /*#__PURE__*/jsxRuntime.jsx(SelectCellFormatter, {
    "aria-label": "Select",
    isCellSelected: props.isCellSelected,
    value: isRowSelected,
    onClick: stopPropagation,
    onChange: (checked, isShiftClick) => {
      onRowSelectionChange({
        row: props.row,
        checked,
        isShiftClick
      });
    }
  });
}

function SelectGroupFormatter(props) {
  const [isRowSelected, onRowSelectionChange] = useRowSelection();
  return /*#__PURE__*/jsxRuntime.jsx(SelectCellFormatter, {
    "aria-label": "Select Group",
    isCellSelected: props.isCellSelected,
    value: isRowSelected,
    onChange: checked => {
      onRowSelectionChange({
        row: props.row,
        checked,
        isShiftClick: false
      });
    },
    onClick: stopPropagation
  });
}

const SelectColumn = {
  key: SELECT_COLUMN_KEY,
  name: '',
  width: 35,
  maxWidth: 35,
  resizable: false,
  sortable: false,
  frozen: true,

  headerRenderer(props) {
    return /*#__PURE__*/jsxRuntime.jsx(SelectCellFormatter, {
      "aria-label": "Select All",
      isCellSelected: props.isCellSelected,
      value: props.allRowsSelected,
      onChange: props.onAllRowsSelectionChange,
      onClick: stopPropagation
    });
  },

  formatter: SelectFormatter,
  groupFormatter: SelectGroupFormatter
};

function useCalculatedColumns({
  rawColumns,
  columnWidths,
  viewportWidth,
  scrollLeft,
  defaultColumnOptions,
  rawGroupBy,
  enableVirtualization
}) {
  var _defaultColumnOptions, _defaultColumnOptions2, _defaultColumnOptions3, _defaultColumnOptions4;

  const minColumnWidth = (_defaultColumnOptions = defaultColumnOptions == null ? void 0 : defaultColumnOptions.minWidth) != null ? _defaultColumnOptions : 80;
  const defaultFormatter = (_defaultColumnOptions2 = defaultColumnOptions == null ? void 0 : defaultColumnOptions.formatter) != null ? _defaultColumnOptions2 : ValueFormatter;
  const defaultSortable = (_defaultColumnOptions3 = defaultColumnOptions == null ? void 0 : defaultColumnOptions.sortable) != null ? _defaultColumnOptions3 : false;
  const defaultResizable = (_defaultColumnOptions4 = defaultColumnOptions == null ? void 0 : defaultColumnOptions.resizable) != null ? _defaultColumnOptions4 : false;
  const {
    columns,
    colSpanColumns,
    lastFrozenColumnIndex,
    groupBy
  } = react.useMemo(() => {
    const groupBy = [];
    let lastFrozenColumnIndex = -1;
    const columns = rawColumns.map(rawColumn => {
      var _rawGroupBy$includes, _rawColumn$sortable, _rawColumn$resizable, _rawColumn$formatter;

      const rowGroup = (_rawGroupBy$includes = rawGroupBy == null ? void 0 : rawGroupBy.includes(rawColumn.key)) != null ? _rawGroupBy$includes : false;
      const frozen = rowGroup || rawColumn.frozen || false;
      const column = { ...rawColumn,
        idx: 0,
        frozen,
        isLastFrozenColumn: false,
        rowGroup,
        sortable: (_rawColumn$sortable = rawColumn.sortable) != null ? _rawColumn$sortable : defaultSortable,
        resizable: (_rawColumn$resizable = rawColumn.resizable) != null ? _rawColumn$resizable : defaultResizable,
        formatter: (_rawColumn$formatter = rawColumn.formatter) != null ? _rawColumn$formatter : defaultFormatter
      };

      if (rowGroup) {
        var _column$groupFormatte;

        (_column$groupFormatte = column.groupFormatter) != null ? _column$groupFormatte : column.groupFormatter = ToggleGroupFormatter;
      }

      if (frozen) {
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
    const colSpanColumns = [];
    columns.forEach((column, idx) => {
      column.idx = idx;

      if (column.rowGroup) {
        groupBy.push(column.key);
      }

      if (column.colSpan != null) {
        colSpanColumns.push(column);
      }
    });

    if (lastFrozenColumnIndex !== -1) {
      columns[lastFrozenColumnIndex].isLastFrozenColumn = true;
    }

    return {
      columns,
      colSpanColumns,
      lastFrozenColumnIndex,
      groupBy
    };
  }, [rawColumns, defaultFormatter, defaultResizable, defaultSortable, rawGroupBy]);
  const {
    layoutCssVars,
    totalColumnWidth,
    totalFrozenColumnWidth,
    columnMetrics
  } = react.useMemo(() => {
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
      layoutCssVars[`--frozen-left-${column.idx}`] = `${columnMetrics.get(column).left}px`;
    }

    return {
      layoutCssVars,
      totalColumnWidth,
      totalFrozenColumnWidth,
      columnMetrics
    };
  }, [columnWidths, columns, viewportWidth, minColumnWidth, lastFrozenColumnIndex]);
  const [colOverscanStartIdx, colOverscanEndIdx] = react.useMemo(() => {
    if (!enableVirtualization) {
      return [0, columns.length - 1];
    }

    const viewportLeft = scrollLeft + totalFrozenColumnWidth;
    const viewportRight = scrollLeft + viewportWidth;
    const lastColIdx = columns.length - 1;
    const firstUnfrozenColumnIdx = min(lastFrozenColumnIndex + 1, lastColIdx);

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

    const colOverscanStartIdx = max(firstUnfrozenColumnIdx, colVisibleStartIdx - 1);
    const colOverscanEndIdx = min(lastColIdx, colVisibleEndIdx + 1);
    return [colOverscanStartIdx, colOverscanEndIdx];
  }, [columnMetrics, columns, lastFrozenColumnIndex, scrollLeft, totalFrozenColumnWidth, viewportWidth, enableVirtualization]);
  return {
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
    return floor(viewportWidth * parseInt(width, 10) / 100);
  }

  return undefined;
}

function clampColumnWidth(width, {
  minWidth,
  maxWidth
}, minColumnWidth) {
  width = max(width, minWidth != null ? minWidth : minColumnWidth);

  if (typeof maxWidth === 'number') {
    return min(width, maxWidth);
  }

  return width;
}

function useCombinedRefs(...refs) {
  return react.useCallback(handle => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(handle);
      } else if (ref !== null && 'current' in ref) {
        ref.current = handle;
      }
    }
  }, refs);
}

function useGridDimensions() {
  const gridRef = react.useRef(null);
  const [gridWidth, setGridWidth] = react.useState(1);
  const [gridHeight, setGridHeight] = react.useState(1);
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
      setGridWidth(clientWidth - (devicePixelRatio % 1 === 0 ? 0 : 1));
      setGridHeight(clientHeight);
    });
    resizeObserver.observe(gridRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return [gridRef, gridWidth, gridHeight];
}

function useLatestFunc(fn) {
  const ref = react.useRef(fn);
  react.useEffect(() => {
    ref.current = fn;
  });
  return react.useCallback((...args) => {
    ref.current(...args);
  }, []);
}

function useRovingCellRef(isSelected) {
  const ref = react.useRef(null);
  const isChildFocused = react.useRef(false);
  const [, forceRender] = react.useState({});
  useLayoutEffect(() => {
    var _ref$current;

    if (!isSelected) {
      isChildFocused.current = false;
      return;
    }

    if (isChildFocused.current) {
      forceRender({});
      return;
    }

    (_ref$current = ref.current) == null ? void 0 : _ref$current.focus({
      preventScroll: true
    });
  }, [isSelected]);

  function onFocus(event) {
    if (event.target !== ref.current) {
      isChildFocused.current = true;
    }
  }

  const isFocused = isSelected && !isChildFocused.current;
  return {
    ref,
    tabIndex: isFocused ? 0 : -1,
    onFocus
  };
}

var css_248z$a = ".r1v67ork70_0-beta_7{outline:none}.r1v67ork70_0-beta_7:after{box-shadow:inset 0 0 0 2px var(--selection-color);content:\"\";inset:0;pointer-events:none;position:absolute;z-index:2}.r1v67ork70_0-beta_7>.cj343x070_0-beta_7:first-child{box-shadow:inset 2px 0 0 0 var(--selection-color)}";
styleInject(css_248z$a,{"insertAt":"top"});

const rowSelected = "r1v67ork70_0-beta_7";
const rowSelectedClassname = `rdg-row-selected ${rowSelected}`;
function useRovingRowRef(selectedCellIdx) {
  const isSelected = selectedCellIdx === -1;
  const {
    ref,
    tabIndex
  } = useFocusRef(isSelected);
  return {
    ref,
    tabIndex,
    className: isSelected ? rowSelectedClassname : undefined
  };
}

function useViewportColumns({
  columns,
  colSpanColumns,
  rows,
  summaryRows,
  colOverscanStartIdx,
  colOverscanEndIdx,
  lastFrozenColumnIndex,
  rowOverscanStartIdx,
  rowOverscanEndIdx,
  isGroupRow
}) {
  const startIdx = react.useMemo(() => {
    if (colOverscanStartIdx === 0) return 0;
    let startIdx = colOverscanStartIdx;

    const updateStartIdx = (colIdx, colSpan) => {
      if (colSpan !== undefined && colIdx + colSpan > colOverscanStartIdx) {
        startIdx = colIdx;
        return true;
      }

      return false;
    };

    for (const column of colSpanColumns) {
      const colIdx = column.idx;
      if (colIdx >= startIdx) break;

      if (updateStartIdx(colIdx, getColSpan(column, lastFrozenColumnIndex, {
        type: 'HEADER'
      }))) {
        break;
      }

      for (let rowIdx = rowOverscanStartIdx; rowIdx <= rowOverscanEndIdx; rowIdx++) {
        const row = rows[rowIdx];
        if (isGroupRow(row)) continue;

        if (updateStartIdx(colIdx, getColSpan(column, lastFrozenColumnIndex, {
          type: 'ROW',
          row
        }))) {
          break;
        }
      }

      if (summaryRows != null) {
        for (const row of summaryRows) {
          if (updateStartIdx(colIdx, getColSpan(column, lastFrozenColumnIndex, {
            type: 'SUMMARY',
            row
          }))) {
            break;
          }
        }
      }
    }

    return startIdx;
  }, [rowOverscanStartIdx, rowOverscanEndIdx, rows, summaryRows, colOverscanStartIdx, lastFrozenColumnIndex, colSpanColumns, isGroupRow]);
  return react.useMemo(() => {
    const viewportColumns = [];

    for (let colIdx = 0; colIdx <= colOverscanEndIdx; colIdx++) {
      const column = columns[colIdx];
      if (colIdx < startIdx && !column.frozen) continue;
      viewportColumns.push(column);
    }

    return viewportColumns;
  }, [startIdx, colOverscanEndIdx, columns]);
}

function isReadonlyArray(arr) {
  return Array.isArray(arr);
}

function useViewportRows({
  rawRows,
  rowHeight,
  scrollTop,
  groupBy,
  rowGrouper,
  expandedGroupIds,
  enableVirtualization,
  headerRowHeight,
  gridHeight,
  summaryRowsCount,
  summaryRowHeight
}) {
  const [groupedRows, rowsCount] = react.useMemo(() => {
    if (groupBy.length === 0 || rowGrouper == null) return [undefined, rawRows.length];

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
  const [rows, isGroupRow] = react.useMemo(() => {
    const allGroupRows = new Set();
    if (!groupedRows) return [rawRows, isGroupRow];
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
    return [flattenedRows, isGroupRow];

    function isGroupRow(row) {
      return allGroupRows.has(row);
    }
  }, [expandedGroupIds, groupedRows, rawRows]);
  const stickyRowIndexes = react.useMemo(() => {
    const stickyRowInfo = [];
    rows.forEach((r, i) => {
      if (typeof r === 'object' && r.isStickyRow) {
        stickyRowInfo.push(i);
      }
    });
    return stickyRowInfo;
  }, [rows]);
  const {
    totalRowHeight,
    getRowTop,
    getRowHeight,
    findRowIdx
  } = react.useMemo(() => {
    if (typeof rowHeight === 'number') {
      return {
        totalRowHeight: rowHeight * rows.length,
        getRowTop: rowIdx => rowIdx * rowHeight,
        getRowHeight: () => rowHeight,
        findRowIdx: offset => floor(offset / rowHeight)
      };
    }

    let totalRowHeight = 0;
    const rowPositions = rows.map(row => {
      const currentRowHeight = isGroupRow(row) ? rowHeight({
        type: 'GROUP',
        row
      }) : rowHeight({
        type: 'ROW',
        row
      });
      const position = {
        top: totalRowHeight,
        height: currentRowHeight
      };
      totalRowHeight += currentRowHeight;
      return position;
    });

    const validateRowIdx = rowIdx => {
      return max(0, min(rows.length - 1, rowIdx));
    };

    return {
      totalRowHeight,
      getRowTop: rowIdx => rowPositions[validateRowIdx(rowIdx)].top,
      getRowHeight: rowIdx => rowPositions[validateRowIdx(rowIdx)].height,

      findRowIdx(offset) {
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
  const stickyRowIndex = react.useMemo(() => {
    if (!stickyRowIndexes.length) {
      return undefined;
    }

    const rowVisibleStartIdx = findRowIdx(scrollTop);

    for (const [i, rowIndex] of stickyRowIndexes.entries()) {
      if (rowIndex === rowVisibleStartIdx) {
        return i;
      }

      if (stickyRowIndexes[i] > rowVisibleStartIdx) {
        return i === 0 ? i : i - 1;
      }
    }

    return stickyRowIndexes.length - 1;
  }, [stickyRowIndexes, findRowIdx, scrollTop]);
  let rowOverscanStartIdx = 0;
  let rowOverscanEndIdx = rows.length - 1;
  let stickyRowHeight = 0;

  if (stickyRowIndex !== undefined) {
    stickyRowHeight = headerRowHeight;
  }

  const clientHeight = gridHeight - headerRowHeight - stickyRowHeight - summaryRowsCount * summaryRowHeight;

  if (enableVirtualization) {
    const overscanThreshold = 4;
    const rowVisibleStartIdx = findRowIdx(scrollTop);
    const rowVisibleEndIdx = findRowIdx(scrollTop + clientHeight);
    rowOverscanStartIdx = max(0, rowVisibleStartIdx - overscanThreshold);
    rowOverscanEndIdx = min(rows.length - 1, rowVisibleEndIdx + overscanThreshold);
  }

  return {
    rowOverscanStartIdx,
    rowOverscanEndIdx,
    rows,
    rowsCount,
    totalRowHeight,
    isGroupRow,
    getRowTop,
    getRowHeight,
    findRowIdx,
    stickyRowIndexes,
    stickyRowIndex,
    clientHeight
  };
}

var css_248z$9 = ".h1j9yp5q70_0-beta_7{cursor:pointer;display:flex}.h1j9yp5q70_0-beta_7:focus{outline:none}.h1e6at1o70_0-beta_7{flex-grow:1;overflow:hidden;overflow:clip;text-overflow:ellipsis}.a1t8izji70_0-beta_7{fill:currentColor}.a1t8izji70_0-beta_7>path{transition:d .1s}";
styleInject(css_248z$9,{"insertAt":"top"});

const headerSortCell = "h1j9yp5q70_0-beta_7";
const headerSortCellClassname = `rdg-header-sort-cell ${headerSortCell}`;
const headerSortName = "h1e6at1o70_0-beta_7";
const headerSortNameClassname = `rdg-header-sort-name ${headerSortName}`;
const arrow = "a1t8izji70_0-beta_7";
const arrowClassname = `rdg-sort-arrow ${arrow}`;
function SortableHeaderCell({
  onSort,
  sortDirection,
  priority,
  children,
  isCellSelected
}) {
  const {
    ref,
    tabIndex
  } = useFocusRef(isCellSelected);

  function handleKeyDown(event) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      onSort(event.ctrlKey || event.metaKey);
    }
  }

  function handleClick(event) {
    onSort(event.ctrlKey || event.metaKey);
  }

  return /*#__PURE__*/jsxRuntime.jsxs("span", {
    ref: ref,
    tabIndex: tabIndex,
    className: headerSortCellClassname,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    children: [/*#__PURE__*/jsxRuntime.jsx("span", {
      className: headerSortNameClassname,
      children: children
    }), /*#__PURE__*/jsxRuntime.jsxs("span", {
      children: [sortDirection !== undefined && /*#__PURE__*/jsxRuntime.jsx("svg", {
        viewBox: "0 0 12 8",
        width: "12",
        height: "8",
        className: arrowClassname,
        "aria-hidden": true,
        children: /*#__PURE__*/jsxRuntime.jsx("path", {
          d: sortDirection === 'ASC' ? 'M0 8 6 0 12 8' : 'M0 0 6 8 12 0'
        })
      }), priority]
    })]
  });
}

var css_248z$8 = ".c6l2wv170_0-beta_7{touch-action:none}.c6l2wv170_0-beta_7:after{bottom:0;content:\"\";cursor:col-resize;position:absolute;right:0;top:0;width:10px}";
styleInject(css_248z$8,{"insertAt":"top"});

const cellResizable = "c6l2wv170_0-beta_7";
const cellResizableClassname = `rdg-cell-resizable ${cellResizable}`;
function HeaderCell({
  column,
  colSpan,
  isCellSelected,
  onColumnResize,
  allRowsSelected,
  onAllRowsSelectionChange,
  sortColumns,
  onSortColumnsChange,
  selectCell,
  shouldFocusGrid
}) {
  const {
    ref,
    tabIndex,
    onFocus
  } = useRovingCellRef(isCellSelected);
  const sortIndex = sortColumns == null ? void 0 : sortColumns.findIndex(sort => sort.columnKey === column.key);
  const sortColumn = sortIndex !== undefined && sortIndex > -1 ? sortColumns[sortIndex] : undefined;
  const sortDirection = sortColumn == null ? void 0 : sortColumn.direction;
  const priority = sortColumn !== undefined && sortColumns.length > 1 ? sortIndex + 1 : undefined;
  const ariaSort = sortDirection && !priority ? sortDirection === 'ASC' ? 'ascending' : 'descending' : undefined;
  const className = getCellClassname(column, column.headerCellClass, column.resizable && cellResizableClassname);

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
      const width = event.clientX + offset - currentTarget.getBoundingClientRect().left;

      if (width > 0) {
        onColumnResize(column, width);
      }
    }

    function onLostPointerCapture() {
      currentTarget.removeEventListener('pointermove', onPointerMove);
      currentTarget.removeEventListener('lostpointercapture', onLostPointerCapture);
    }

    currentTarget.setPointerCapture(pointerId);
    currentTarget.addEventListener('pointermove', onPointerMove);
    currentTarget.addEventListener('lostpointercapture', onLostPointerCapture);
  }

  function onSort(ctrlClick) {
    if (onSortColumnsChange == null) return;
    const {
      sortDescendingFirst
    } = column;

    if (sortColumn === undefined) {
      const nextSort = {
        columnKey: column.key,
        direction: sortDescendingFirst ? 'DESC' : 'ASC'
      };
      onSortColumnsChange(sortColumns && ctrlClick ? [...sortColumns, nextSort] : [nextSort]);
    } else {
      let nextSortColumn;

      if (sortDescendingFirst && sortDirection === 'DESC' || !sortDescendingFirst && sortDirection === 'ASC') {
        nextSortColumn = {
          columnKey: column.key,
          direction: sortDirection === 'ASC' ? 'DESC' : 'ASC'
        };
      }

      if (ctrlClick) {
        const nextSortColumns = [...sortColumns];

        if (nextSortColumn) {
          nextSortColumns[sortIndex] = nextSortColumn;
        } else {
          nextSortColumns.splice(sortIndex, 1);
        }

        onSortColumnsChange(nextSortColumns);
      } else {
        onSortColumnsChange(nextSortColumn ? [nextSortColumn] : []);
      }
    }
  }

  function onClick() {
    selectCell(column.idx);
  }

  function handleFocus(event) {
    onFocus(event);

    if (shouldFocusGrid) {
      selectCell(0);
    }
  }

  function getCell() {
    if (column.headerRenderer) {
      return /*#__PURE__*/jsxRuntime.jsx(column.headerRenderer, {
        column: column,
        sortDirection: sortDirection,
        priority: priority,
        onSort: onSort,
        allRowsSelected: allRowsSelected,
        onAllRowsSelectionChange: onAllRowsSelectionChange,
        isCellSelected: isCellSelected
      });
    }

    if (column.sortable) {
      return /*#__PURE__*/jsxRuntime.jsx(SortableHeaderCell, {
        onSort: onSort,
        sortDirection: sortDirection,
        priority: priority,
        isCellSelected: isCellSelected,
        children: column.name
      });
    }

    return column.name;
  }

  return /*#__PURE__*/jsxRuntime.jsx("div", {
    role: "columnheader",
    "aria-colindex": column.idx + 1,
    "aria-selected": isCellSelected,
    "aria-sort": ariaSort,
    "aria-colspan": colSpan,
    ref: ref,
    tabIndex: shouldFocusGrid ? 0 : tabIndex,
    className: className,
    style: getCellStyle(column, colSpan),
    onFocus: handleFocus,
    onClick: onClick,
    onPointerDown: column.resizable ? onPointerDown : undefined,
    children: getCell()
  });
}

var css_248z$7 = ".h10tskcx70_0-beta_7{background-color:var(--header-background-color);contain:strict;contain:size layout style paint;display:grid;font-weight:700;grid-template-columns:var(--template-columns);grid-template-rows:var(--header-row-height);height:var(--header-row-height);line-height:var(--header-row-height);outline:none;position:sticky;top:0;width:var(--row-width);z-index:3}.h10tskcx70_0-beta_7[aria-selected=true]{box-shadow:inset 0 0 0 2px var(--selection-color)}";
styleInject(css_248z$7,{"insertAt":"top"});

const headerRow$1 = "h10tskcx70_0-beta_7";
const headerRowClassname = `rdg-header-row ${headerRow$1}`;

function HeaderRow({
  columns,
  allRowsSelected,
  onAllRowsSelectionChange,
  onColumnResize,
  sortColumns,
  onSortColumnsChange,
  lastFrozenColumnIndex,
  selectedCellIdx,
  selectCell,
  shouldFocusGrid
}) {
  const {
    ref,
    tabIndex,
    className
  } = useRovingRowRef(selectedCellIdx);
  const cells = [];

  for (let index = 0; index < columns.length; index++) {
    const column = columns[index];
    const colSpan = getColSpan(column, lastFrozenColumnIndex, {
      type: 'HEADER'
    });

    if (colSpan !== undefined) {
      index += colSpan - 1;
    }

    cells.push( /*#__PURE__*/jsxRuntime.jsx(HeaderCell, {
      column: column,
      colSpan: colSpan,
      isCellSelected: selectedCellIdx === column.idx,
      onColumnResize: onColumnResize,
      allRowsSelected: allRowsSelected,
      onAllRowsSelectionChange: onAllRowsSelectionChange,
      onSortColumnsChange: onSortColumnsChange,
      sortColumns: sortColumns,
      selectCell: selectCell,
      shouldFocusGrid: shouldFocusGrid && index === 0
    }, column.key));
  }

  return /*#__PURE__*/jsxRuntime.jsx("div", {
    role: "row",
    "aria-rowindex": 1,
    ref: ref,
    tabIndex: tabIndex,
    className: clsx(headerRowClassname, className),
    children: cells
  });
}

const HeaderRow$1 = /*#__PURE__*/react.memo(HeaderRow);

var css_248z$6 = ".c6ra8a370_0-beta_7,.cq910m070_0-beta_7{background-color:#ccf}.cq910m070_0-beta_7.c6ra8a370_0-beta_7{background-color:#99f}";
styleInject(css_248z$6,{"insertAt":"top"});

const cellCopied = "c6ra8a370_0-beta_7";
const cellCopiedClassname = `rdg-cell-copied ${cellCopied}`;
const cellDraggedOver = "cq910m070_0-beta_7";
const cellDraggedOverClassname = `rdg-cell-dragged-over ${cellDraggedOver}`;

function Cell({
  column,
  colSpan,
  isCellSelected,
  isCopied,
  isDraggedOver,
  row,
  dragHandle,
  onRowClick,
  onRowDoubleClick,
  onRowChange,
  selectCell,
  ...props
}) {
  const {
    ref,
    tabIndex,
    onFocus
  } = useRovingCellRef(isCellSelected);
  const {
    cellClass
  } = column;
  const className = getCellClassname(column, typeof cellClass === 'function' ? cellClass(row) : cellClass, isCopied && cellCopiedClassname, isDraggedOver && cellDraggedOverClassname);

  function selectCellWrapper(openEditor) {
    selectCell(row, column, openEditor);
  }

  function handleClick() {
    var _column$editorOptions;

    selectCellWrapper((_column$editorOptions = column.editorOptions) == null ? void 0 : _column$editorOptions.editOnClick);
    onRowClick == null ? void 0 : onRowClick(row, column);
  }

  function handleContextMenu() {
    selectCellWrapper();
  }

  function handleDoubleClick() {
    selectCellWrapper(true);
    onRowDoubleClick == null ? void 0 : onRowDoubleClick(row, column);
  }

  return /*#__PURE__*/jsxRuntime.jsx("div", {
    role: "gridcell",
    "aria-colindex": column.idx + 1,
    "aria-selected": isCellSelected,
    "aria-colspan": colSpan,
    "aria-readonly": !isCellEditable(column, row) || undefined,
    ref: ref,
    tabIndex: tabIndex,
    className: className,
    style: getCellStyle(column, colSpan),
    onClick: handleClick,
    onDoubleClick: handleDoubleClick,
    onContextMenu: handleContextMenu,
    onFocus: onFocus,
    ...props,
    children: !column.rowGroup && /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [/*#__PURE__*/jsxRuntime.jsx(column.formatter, {
        column: column,
        row: row,
        isCellSelected: isCellSelected,
        onRowChange: onRowChange
      }), dragHandle]
    })
  });
}

const Cell$1 = /*#__PURE__*/react.memo(Cell);

function Row({
  className,
  rowIdx,
  selectedCellIdx,
  isRowSelected,
  copiedCellIdx,
  draggedOverCellIdx,
  lastFrozenColumnIndex,
  row,
  viewportColumns,
  selectedCellEditor,
  selectedCellDragHandle,
  onRowClick,
  onRowDoubleClick,
  rowClass,
  setDraggedOverRowIdx,
  onMouseEnter,
  top,
  height,
  zIndex,
  onRowChange,
  selectCell,
  ...props
}, ref) {
  const {
    ref: rowRef,
    tabIndex,
    className: rovingClassName
  } = useRovingRowRef(selectedCellIdx);
  const handleRowChange = useLatestFunc(newRow => {
    onRowChange(rowIdx, newRow);
  });

  function handleDragEnter(event) {
    setDraggedOverRowIdx == null ? void 0 : setDraggedOverRowIdx(rowIdx);
    onMouseEnter == null ? void 0 : onMouseEnter(event);
  }

  className = clsx(rowClassname, `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`, rovingClassName, rowClass == null ? void 0 : rowClass(row), className);
  const cells = [];

  for (let index = 0; index < viewportColumns.length; index++) {
    const column = viewportColumns[index];
    const {
      idx
    } = column;
    const colSpan = getColSpan(column, lastFrozenColumnIndex, {
      type: 'ROW',
      row
    });

    if (colSpan !== undefined) {
      index += colSpan - 1;
    }

    const isCellSelected = selectedCellIdx === idx;

    if (isCellSelected && selectedCellEditor) {
      cells.push(selectedCellEditor);
    } else {
      cells.push( /*#__PURE__*/jsxRuntime.jsx(Cell$1, {
        column: column,
        colSpan: colSpan,
        row: row,
        isCopied: copiedCellIdx === idx,
        isDraggedOver: draggedOverCellIdx === idx,
        isCellSelected: isCellSelected,
        dragHandle: isCellSelected ? selectedCellDragHandle : undefined,
        onRowClick: onRowClick,
        onRowDoubleClick: onRowDoubleClick,
        onRowChange: handleRowChange,
        selectCell: selectCell
      }, column.key));
    }
  }

  return /*#__PURE__*/jsxRuntime.jsx(RowSelectionProvider, {
    value: isRowSelected,
    children: /*#__PURE__*/jsxRuntime.jsx("div", {
      role: "row",
      ref: useCombinedRefs(ref, rowRef),
      tabIndex: tabIndex,
      className: className,
      onMouseEnter: handleDragEnter,
      style: {
        top,
        '--row-height': `${height}px`,
        zIndex
      },
      ...props,
      children: cells
    })
  });
}

const Row$1 = /*#__PURE__*/react.memo(Row);
const RowWithRef = /*#__PURE__*/react.memo( /*#__PURE__*/react.forwardRef(Row));

function GroupCell({
  id,
  groupKey,
  childRows,
  isExpanded,
  isCellSelected,
  column,
  row,
  groupColumnIndex,
  toggleGroup: toggleGroupWrapper
}) {
  const {
    ref,
    tabIndex,
    onFocus
  } = useRovingCellRef(isCellSelected);

  function toggleGroup() {
    toggleGroupWrapper(id);
  }

  const isLevelMatching = column.rowGroup && groupColumnIndex === column.idx;
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    role: "gridcell",
    "aria-colindex": column.idx + 1,
    "aria-selected": isCellSelected,
    ref: ref,
    tabIndex: tabIndex,
    className: getCellClassname(column),
    style: { ...getCellStyle(column),
      cursor: isLevelMatching ? 'pointer' : 'default'
    },
    onClick: isLevelMatching ? toggleGroup : undefined,
    onFocus: onFocus,
    children: (!column.rowGroup || groupColumnIndex === column.idx) && column.groupFormatter && /*#__PURE__*/jsxRuntime.jsx(column.groupFormatter, {
      groupKey: groupKey,
      childRows: childRows,
      column: column,
      row: row,
      isExpanded: isExpanded,
      isCellSelected: isCellSelected,
      toggleGroup: toggleGroup
    })
  }, column.key);
}

const GroupCell$1 = /*#__PURE__*/react.memo(GroupCell);

var css_248z$5 = ".g1yxluv370_0-beta_7:not([aria-selected=true]){background-color:var(--header-background-color)}.g1yxluv370_0-beta_7>.cj343x070_0-beta_7:not(:last-child):not(.ch2wcw870_0-beta_7){border-right:none}";
styleInject(css_248z$5,{"insertAt":"top"});

const groupRow = "g1yxluv370_0-beta_7";
const groupRowClassname = `rdg-group-row ${groupRow}`;

function GroupedRow({
  id,
  groupKey,
  viewportColumns,
  childRows,
  rowIdx,
  row,
  top,
  height,
  level,
  isExpanded,
  selectedCellIdx,
  isRowSelected,
  selectGroup,
  toggleGroup,
  ...props
}) {
  const {
    ref,
    tabIndex,
    className
  } = useRovingRowRef(selectedCellIdx);
  const idx = viewportColumns[0].key === SELECT_COLUMN_KEY ? level + 1 : level;

  function handleSelectGroup() {
    selectGroup(rowIdx);
  }

  return /*#__PURE__*/jsxRuntime.jsx(RowSelectionProvider, {
    value: isRowSelected,
    children: /*#__PURE__*/jsxRuntime.jsx("div", {
      role: "row",
      "aria-level": level,
      "aria-expanded": isExpanded,
      ref: ref,
      tabIndex: tabIndex,
      className: clsx(rowClassname, groupRowClassname, `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`, className),
      onClick: handleSelectGroup,
      style: {
        top,
        '--row-height': `${height}px`
      },
      ...props,
      children: viewportColumns.map(column => /*#__PURE__*/jsxRuntime.jsx(GroupCell$1, {
        id: id,
        groupKey: groupKey,
        childRows: childRows,
        isExpanded: isExpanded,
        isCellSelected: selectedCellIdx === column.idx,
        column: column,
        row: row,
        groupColumnIndex: idx,
        toggleGroup: toggleGroup
      }, column.key))
    })
  });
}

const GroupRowRenderer = /*#__PURE__*/react.memo(GroupedRow);

function SummaryCell({
  column,
  colSpan,
  row,
  isCellSelected,
  selectCell
}) {
  const {
    ref,
    tabIndex,
    onFocus
  } = useRovingCellRef(isCellSelected);
  const {
    summaryFormatter: SummaryFormatter,
    summaryCellClass
  } = column;
  const className = getCellClassname(column, typeof summaryCellClass === 'function' ? summaryCellClass(row) : summaryCellClass);

  function onClick() {
    selectCell(row, column);
  }

  return /*#__PURE__*/jsxRuntime.jsx("div", {
    role: "gridcell",
    "aria-colindex": column.idx + 1,
    "aria-colspan": colSpan,
    "aria-selected": isCellSelected,
    ref: ref,
    tabIndex: tabIndex,
    className: className,
    style: getCellStyle(column, colSpan),
    onClick: onClick,
    onFocus: onFocus,
    children: SummaryFormatter && /*#__PURE__*/jsxRuntime.jsx(SummaryFormatter, {
      column: column,
      row: row,
      isCellSelected: isCellSelected
    })
  });
}

const SummaryCell$1 = /*#__PURE__*/react.memo(SummaryCell);

var css_248z$4 = ".skuhp5570_0-beta_7.r1upfr8070_0-beta_7{grid-template-rows:var(--summary-row-height);height:var(--summary-row-height);line-height:var(--summary-row-height);position:sticky;z-index:3}.sf8l5ub70_0-beta_7>.cj343x070_0-beta_7{border-top:2px solid var(--summary-border-color)}";
styleInject(css_248z$4,{"insertAt":"top"});

const summaryRow = "skuhp5570_0-beta_7";
const summaryRowBorderClassname = "sf8l5ub70_0-beta_7";
const summaryRowClassname = `rdg-summary-row ${summaryRow}`;

function SummaryRow({
  rowIdx,
  row,
  viewportColumns,
  bottom,
  lastFrozenColumnIndex,
  selectedCellIdx,
  selectCell,
  'aria-rowindex': ariaRowIndex
}) {
  const {
    ref,
    tabIndex,
    className
  } = useRovingRowRef(selectedCellIdx);
  const cells = [];

  for (let index = 0; index < viewportColumns.length; index++) {
    const column = viewportColumns[index];
    const colSpan = getColSpan(column, lastFrozenColumnIndex, {
      type: 'SUMMARY',
      row
    });

    if (colSpan !== undefined) {
      index += colSpan - 1;
    }

    const isCellSelected = selectedCellIdx === column.idx;
    cells.push( /*#__PURE__*/jsxRuntime.jsx(SummaryCell$1, {
      column: column,
      colSpan: colSpan,
      row: row,
      isCellSelected: isCellSelected,
      selectCell: selectCell
    }, column.key));
  }

  return /*#__PURE__*/jsxRuntime.jsx("div", {
    role: "row",
    "aria-rowindex": ariaRowIndex,
    ref: ref,
    tabIndex: tabIndex,
    className: clsx(rowClassname, `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`, summaryRowClassname, className, rowIdx === 0 && summaryRowBorderClassname),
    style: {
      bottom
    },
    children: cells
  });
}

const SummaryRow$1 = /*#__PURE__*/react.memo(SummaryRow);

var css_248z$3 = ".h1uwyxij70_0-beta_7{background-color:var(--header-background-color);border-bottom:1px solid var(--border-color);contain:strict;contain:size layout style paint;display:grid;font-weight:700;height:var(--header-row-height);line-height:var(--header-row-height);outline:none;padding-left:10px;position:sticky;top:0;width:var(--row-width);z-index:3}.h1uwyxij70_0-beta_7[aria-selected=true]{box-shadow:inset 0 0 0 2px var(--selection-color)}";
styleInject(css_248z$3,{"insertAt":"top"});

const headerRow = "h1uwyxij70_0-beta_7";
const stickyRowClassname = `rdg-sticky-row ${headerRow}`;

function StickyRow({
  content,
  top,
  isStuck
}) {
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    role: "row",
    "aria-rowindex": 2,
    className: stickyRowClassname,
    style: {
      top,
      position: isStuck ? 'sticky' : 'absolute'
    },
    children: content
  });
}

const StickyRow$1 = /*#__PURE__*/react.memo(StickyRow);

var css_248z$2 = ".cis5rrm70_0-beta_7.rdg-cell{padding:0}";
styleInject(css_248z$2,{"insertAt":"top"});

const cellEditing = "cis5rrm70_0-beta_7";
function EditCell({
  column,
  colSpan,
  row,
  onRowChange,
  closeEditor,
  scrollToCell
}) {
  var _column$editorOptions, _column$editorOptions4, _column$editorOptions5;

  const frameRequestRef = react.useRef();
  const commitOnOutsideClick = ((_column$editorOptions = column.editorOptions) == null ? void 0 : _column$editorOptions.commitOnOutsideClick) !== false;
  const commitOnOutsideMouseDown = useLatestFunc(() => {
    onClose(true);
  });
  react.useEffect(() => {
    if (!commitOnOutsideClick) return;

    function onWindowCaptureMouseDown() {
      frameRequestRef.current = requestAnimationFrame(commitOnOutsideMouseDown);
    }

    addEventListener('mousedown', onWindowCaptureMouseDown, {
      capture: true
    });
    return () => {
      removeEventListener('mousedown', onWindowCaptureMouseDown, {
        capture: true
      });
      cancelFrameRequest();
    };
  }, [commitOnOutsideClick, commitOnOutsideMouseDown]);

  function cancelFrameRequest() {
    cancelAnimationFrame(frameRequestRef.current);
  }

  function onKeyDown(event) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onClose();
    } else if (event.key === 'Enter') {
      event.stopPropagation();
      onClose(true);
      scrollToCell();
    } else {
      var _column$editorOptions2, _column$editorOptions3;

      const onNavigation = (_column$editorOptions2 = (_column$editorOptions3 = column.editorOptions) == null ? void 0 : _column$editorOptions3.onNavigation) != null ? _column$editorOptions2 : onEditorNavigation;

      if (!onNavigation(event)) {
        event.stopPropagation();
      }
    }
  }

  function onClose(commitChanges) {
    if (commitChanges) {
      onRowChange(row, true);
    } else {
      closeEditor();
    }
  }

  const {
    cellClass
  } = column;
  const className = getCellClassname(column, 'rdg-editor-container', typeof cellClass === 'function' ? cellClass(row) : cellClass, !((_column$editorOptions4 = column.editorOptions) != null && _column$editorOptions4.renderFormatter) && cellEditing);
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    role: "gridcell",
    "aria-colindex": column.idx + 1,
    "aria-colspan": colSpan,
    "aria-selected": true,
    className: className,
    style: getCellStyle(column, colSpan),
    onKeyDown: onKeyDown,
    onMouseDownCapture: commitOnOutsideClick ? cancelFrameRequest : undefined,
    children: column.editor != null && /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [/*#__PURE__*/jsxRuntime.jsx(column.editor, {
        column: column,
        row: row,
        onRowChange: onRowChange,
        onClose: onClose
      }), ((_column$editorOptions5 = column.editorOptions) == null ? void 0 : _column$editorOptions5.renderFormatter) && /*#__PURE__*/jsxRuntime.jsx(column.formatter, {
        column: column,
        row: row,
        isCellSelected: true,
        onRowChange: onRowChange
      })]
    })
  });
}

var css_248z$1 = ".c1w9bbhr70_0-beta_7{background-color:var(--selection-color);bottom:0;cursor:move;height:8px;position:absolute;right:0;width:8px}.c1w9bbhr70_0-beta_7:hover{background-color:var(--background-color);border:2px solid var(--selection-color);height:16px;width:16px}";
styleInject(css_248z$1,{"insertAt":"top"});

const cellDragHandle = "c1w9bbhr70_0-beta_7";
const cellDragHandleClassname = `rdg-cell-drag-handle ${cellDragHandle}`;
function DragHandle({
  rows,
  columns,
  selectedPosition,
  latestDraggedOverRowIdx,
  isCellEditable,
  onRowsChange,
  onFill,
  setDragging,
  setDraggedOverRowIdx
}) {
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

  function handleDragEnd() {
    const overRowIdx = latestDraggedOverRowIdx.current;
    if (overRowIdx === undefined) return;
    const {
      rowIdx
    } = selectedPosition;
    const startRowIndex = rowIdx < overRowIdx ? rowIdx + 1 : overRowIdx;
    const endRowIndex = rowIdx < overRowIdx ? overRowIdx + 1 : rowIdx;
    updateRows(startRowIndex, endRowIndex);
    setDraggedOverRowIdx(undefined);
  }

  function handleDoubleClick(event) {
    event.stopPropagation();
    updateRows(selectedPosition.rowIdx + 1, rows.length);
  }

  function updateRows(startRowIdx, endRowIdx) {
    const {
      idx,
      rowIdx
    } = selectedPosition;
    const column = columns[idx];
    const sourceRow = rows[rowIdx];
    const updatedRows = [...rows];
    const indexes = [];

    for (let i = startRowIdx; i < endRowIdx; i++) {
      if (isCellEditable({
        rowIdx: i,
        idx
      })) {
        const updatedRow = onFill({
          columnKey: column.key,
          sourceRow,
          targetRow: rows[i]
        });

        if (updatedRow !== rows[i]) {
          updatedRows[i] = updatedRow;
          indexes.push(i);
        }
      }
    }

    if (indexes.length > 0) {
      onRowsChange == null ? void 0 : onRowsChange(updatedRows, {
        indexes,
        column
      });
    }
  }

  return /*#__PURE__*/jsxRuntime.jsx("div", {
    className: cellDragHandleClassname,
    onMouseDown: handleMouseDown,
    onDoubleClick: handleDoubleClick
  });
}

const initialPosition = {
  idx: -1,
  rowIdx: -2,
  mode: 'SELECT'
};

function DataGrid({
  columns: rawColumns,
  rows: rawRows,
  summaryRows,
  rowKeyGetter,
  onRowsChange,
  rowHeight,
  headerRowHeight: rawHeaderRowHeight,
  summaryRowHeight: rawSummaryRowHeight,
  selectedRows,
  onSelectedRowsChange,
  sortColumns,
  onSortColumnsChange,
  defaultColumnOptions,
  groupBy: rawGroupBy,
  rowGrouper,
  expandedGroupIds,
  onExpandedGroupIdsChange,
  onRowClick,
  onRowDoubleClick,
  onScroll,
  onColumnResize,
  onFill,
  onPaste,
  cellNavigationMode: rawCellNavigationMode,
  enableVirtualization,
  rowRenderer,
  noRowsFallback,
  className,
  style,
  rowClass,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  'data-testid': testId
}, ref) {
  var _rowHeight, _enableVirtualization, _summaryRows$length;

  (_rowHeight = rowHeight) != null ? _rowHeight : rowHeight = 35;
  const headerRowHeight = rawHeaderRowHeight != null ? rawHeaderRowHeight : typeof rowHeight === 'number' ? rowHeight : 35;
  const summaryRowHeight = rawSummaryRowHeight != null ? rawSummaryRowHeight : typeof rowHeight === 'number' ? rowHeight : 35;
  const RowRenderer = rowRenderer != null ? rowRenderer : Row$1;
  const cellNavigationMode = rawCellNavigationMode != null ? rawCellNavigationMode : 'NONE';
  (_enableVirtualization = enableVirtualization) != null ? _enableVirtualization : enableVirtualization = true;
  const [scrollTop, setScrollTop] = react.useState(0);
  const [scrollLeft, setScrollLeft] = react.useState(0);
  const [columnWidths, setColumnWidths] = react.useState(() => new Map());
  const [selectedPosition, setSelectedPosition] = react.useState(initialPosition);
  const [copiedCell, setCopiedCell] = react.useState(null);
  const [isDragging, setDragging] = react.useState(false);
  const [draggedOverRowIdx, setOverRowIdx] = react.useState(undefined);
  const prevSelectedPosition = react.useRef(selectedPosition);
  const latestDraggedOverRowIdx = react.useRef(draggedOverRowIdx);
  const lastSelectedRowIdx = react.useRef(-1);
  const [gridRef, gridWidth, gridHeight] = useGridDimensions();
  const headerRowsCount = 1;
  const summaryRowsCount = (_summaryRows$length = summaryRows == null ? void 0 : summaryRows.length) != null ? _summaryRows$length : 0;
  const isSelectable = selectedRows != null && onSelectedRowsChange != null;
  const isHeaderRowSelected = selectedPosition.rowIdx === -1;
  const allRowsSelected = react.useMemo(() => {
    const {
      length
    } = rawRows;
    return length !== 0 && selectedRows != null && rowKeyGetter != null && selectedRows.size >= length && rawRows.every(row => selectedRows.has(rowKeyGetter(row)));
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
    stickyRowIndexes,
    stickyRowIndex,
    totalRowHeight,
    isGroupRow,
    getRowTop,
    getRowHeight,
    findRowIdx,
    clientHeight
  } = useViewportRows({
    rawRows,
    groupBy,
    rowGrouper,
    rowHeight,
    scrollTop,
    expandedGroupIds,
    enableVirtualization,
    headerRowHeight,
    gridHeight,
    summaryRowsCount,
    summaryRowHeight
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
  const minRowIdx = -1;
  const maxRowIdx = headerRowsCount + rows.length + summaryRowsCount - 2;
  const selectedCellIsWithinSelectionBounds = isCellWithinSelectionBounds(selectedPosition);
  const selectedCellIsWithinViewportBounds = isCellWithinViewportBounds(selectedPosition);
  const selectRowLatest = useLatestFunc(selectRow);
  const selectAllRowsLatest = useLatestFunc(selectAllRows);
  const handleFormatterRowChangeLatest = useLatestFunc(updateRow);
  const selectViewportCellLatest = useLatestFunc((row, column, enableEditor) => {
    const rowIdx = rows.indexOf(row);
    selectCell({
      rowIdx,
      idx: column.idx
    }, enableEditor);
  });
  const selectGroupLatest = useLatestFunc(rowIdx => {
    selectCell({
      rowIdx,
      idx: -1
    });
  });
  const selectHeaderCellLatest = useLatestFunc(idx => {
    selectCell({
      rowIdx: -1,
      idx
    });
  });
  const selectSummaryCellLatest = useLatestFunc((summaryRow, column) => {
    const rowIdx = summaryRows.indexOf(summaryRow) + headerRowsCount + rows.length - 1;
    selectCell({
      rowIdx,
      idx: column.idx
    });
  });
  const toggleGroupLatest = useLatestFunc(toggleGroup);
  useLayoutEffect(() => {
    if (!selectedCellIsWithinSelectionBounds || isSamePosition(selectedPosition, prevSelectedPosition.current)) {
      prevSelectedPosition.current = selectedPosition;
      return;
    }

    prevSelectedPosition.current = selectedPosition;
    scrollToCell(selectedPosition);
  });
  react.useImperativeHandle(ref, () => ({
    element: gridRef.current,

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
        top: getRowTop(rowIdx),
        behavior: 'smooth'
      });
    },

    selectCell
  }));
  const handleColumnResize = react.useCallback((column, width) => {
    setColumnWidths(columnWidths => {
      const newColumnWidths = new Map(columnWidths);
      newColumnWidths.set(column.key, width);
      return newColumnWidths;
    });
    onColumnResize == null ? void 0 : onColumnResize(column.idx, width);
  }, [onColumnResize]);
  const setDraggedOverRowIdx = react.useCallback(rowIdx => {
    setOverRowIdx(rowIdx);
    latestDraggedOverRowIdx.current = rowIdx;
  }, []);

  function selectRow({
    row,
    checked,
    isShiftClick
  }) {
    if (!onSelectedRowsChange) return;
    assertIsValidKeyGetter(rowKeyGetter);
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

  function selectAllRows(checked) {
    if (!onSelectedRowsChange) return;
    assertIsValidKeyGetter(rowKeyGetter);
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
    if (!(event.target instanceof Element)) return;
    const isCellEvent = event.target.closest('.rdg-cell') !== null;
    const isRowEvent = hasGroups && event.target.matches('.rdg-row, .rdg-header-row');
    if (!isCellEvent && !isRowEvent) return;
    const {
      key,
      keyCode
    } = event;
    const {
      rowIdx
    } = selectedPosition;

    if (selectedCellIsWithinViewportBounds && onPaste != null && isCtrlKeyHeldDown(event) && !isGroupRow(rows[rowIdx]) && selectedPosition.mode === 'SELECT') {
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

      if (isGroupRow(row) && selectedPosition.idx === -1 && (key === 'ArrowLeft' && row.isExpanded || key === 'ArrowRight' && !row.isExpanded)) {
        event.preventDefault();
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
    if (!onPaste || !onRowsChange || copiedCell === null || !isCellEditable(selectedPosition)) {
      return;
    }

    const {
      idx,
      rowIdx
    } = selectedPosition;
    const targetRow = rawRows[getRawRowIdx(rowIdx)];
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

    if (!selectedCellIsWithinViewportBounds) return;
    const row = rows[selectedPosition.rowIdx];
    if (isGroupRow(row)) return;
    const {
      key,
      shiftKey
    } = event;

    if (isSelectable && shiftKey && key === ' ') {
      assertIsValidKeyGetter(rowKeyGetter);
      const rowKey = rowKeyGetter(row);
      selectRow({
        row,
        checked: !selectedRows.has(rowKey),
        isShiftClick: false
      });
      event.preventDefault();
      return;
    }

    const column = columns[selectedPosition.idx];
    (_column$editorOptions = column.editorOptions) == null ? void 0 : _column$editorOptions.onCellKeyDown == null ? void 0 : _column$editorOptions.onCellKeyDown(event);
    if (event.isDefaultPrevented()) return;

    if (isCellEditable(selectedPosition) && isDefaultCellInput(event)) {
      setSelectedPosition(({
        idx,
        rowIdx
      }) => ({
        idx,
        rowIdx,
        mode: 'EDIT',
        row,
        originalRow: row
      }));
    }
  }

  function isColIdxWithinSelectionBounds(idx) {
    return idx >= minColIdx && idx <= maxColIdx;
  }

  function isRowIdxWithinViewportBounds(rowIdx) {
    return rowIdx >= 0 && rowIdx < rows.length;
  }

  function isCellWithinSelectionBounds({
    idx,
    rowIdx
  }) {
    return rowIdx >= minRowIdx && rowIdx <= maxRowIdx && isColIdxWithinSelectionBounds(idx);
  }

  function isCellWithinViewportBounds({
    idx,
    rowIdx
  }) {
    return isRowIdxWithinViewportBounds(rowIdx) && isColIdxWithinSelectionBounds(idx);
  }

  function isCellEditable(position) {
    return isCellWithinViewportBounds(position) && isSelectedCellEditable({
      columns,
      rows,
      selectedPosition: position,
      isGroupRow
    });
  }

  function selectCell(position, enableEditor) {
    if (!isCellWithinSelectionBounds(position)) return;
    commitEditorChanges();

    if (enableEditor && isCellEditable(position)) {
      const row = rows[position.rowIdx];
      setSelectedPosition({ ...position,
        mode: 'EDIT',
        row,
        originalRow: row
      });
    } else if (isSamePosition(selectedPosition, position)) {
      scrollToCell(position);
    } else {
      setSelectedPosition({ ...position,
        mode: 'SELECT'
      });
    }
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
      var _rowIdx;

      (_rowIdx = rowIdx) != null ? _rowIdx : rowIdx = selectedPosition.rowIdx;
      if (!isCellWithinSelectionBounds({
        rowIdx,
        idx
      })) return;
      const {
        clientWidth
      } = current;
      const column = columns[idx];
      const {
        left,
        width
      } = columnMetrics.get(column);
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
        const {
          left,
          width
        } = columnMetrics.get(columns[column.idx + colSpan - 1]);
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
        current.scrollTop = rowTop;
      } else if (rowTop + rowHeight > scrollTop + clientHeight) {
        current.scrollTop = rowTop + rowHeight - clientHeight;
      }
    }
  }

  function getNextPosition(key, ctrlKey, shiftKey) {
    const {
      idx,
      rowIdx
    } = selectedPosition;
    const row = rows[rowIdx];
    const isRowSelected = selectedCellIsWithinSelectionBounds && idx === -1;

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
        return {
          idx: idx + (shiftKey ? -1 : 1),
          rowIdx
        };

      case 'Home':
        if (isRowSelected) return {
          idx,
          rowIdx: 0
        };
        return {
          idx: 0,
          rowIdx: ctrlKey ? minRowIdx : rowIdx
        };

      case 'End':
        if (isRowSelected) return {
          idx,
          rowIdx: rows.length - 1
        };
        return {
          idx: maxColIdx,
          rowIdx: ctrlKey ? maxRowIdx : rowIdx
        };

      case 'PageUp':
        {
          if (selectedPosition.rowIdx === minRowIdx) return selectedPosition;
          const nextRowY = getRowTop(rowIdx) + getRowHeight(rowIdx) - clientHeight;
          return {
            idx,
            rowIdx: nextRowY > 0 ? findRowIdx(nextRowY) : 0
          };
        }

      case 'PageDown':
        {
          if (selectedPosition.rowIdx >= rows.length) return selectedPosition;
          const nextRowY = getRowTop(rowIdx) + clientHeight;
          return {
            idx,
            rowIdx: nextRowY < totalRowHeight ? findRowIdx(nextRowY) : rows.length - 1
          };
        }

      default:
        return selectedPosition;
    }
  }

  function navigate(event) {
    const {
      key,
      shiftKey
    } = event;
    let mode = cellNavigationMode;

    if (key === 'Tab') {
      if (canExitGrid({
        shiftKey,
        cellNavigationMode,
        maxColIdx,
        minRowIdx,
        maxRowIdx,
        selectedPosition
      })) {
        commitEditorChanges();
        return;
      }

      mode = cellNavigationMode === 'NONE' ? 'CHANGE_ROW' : cellNavigationMode;
    }

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
      isGroupRow
    });
    selectCell(nextSelectedCellPosition);
  }

  function getDraggedOverCellIdx(currentRowIdx) {
    if (draggedOverRowIdx === undefined) return;
    const {
      rowIdx
    } = selectedPosition;
    const isDraggedOver = rowIdx < draggedOverRowIdx ? rowIdx < currentRowIdx && currentRowIdx <= draggedOverRowIdx : rowIdx > currentRowIdx && currentRowIdx >= draggedOverRowIdx;
    return isDraggedOver ? selectedPosition.idx : undefined;
  }

  function getDragHandle(rowIdx) {
    if (selectedPosition.rowIdx !== rowIdx || selectedPosition.mode === 'EDIT' || hasGroups || onFill == null) {
      return;
    }

    return /*#__PURE__*/jsxRuntime.jsx(DragHandle, {
      rows: rawRows,
      columns: columns,
      selectedPosition: selectedPosition,
      isCellEditable: isCellEditable,
      latestDraggedOverRowIdx: latestDraggedOverRowIdx,
      onRowsChange: onRowsChange,
      onFill: onFill,
      setDragging: setDragging,
      setDraggedOverRowIdx: setDraggedOverRowIdx
    });
  }

  function getCellEditor(rowIdx) {
    if (selectedPosition.rowIdx !== rowIdx || selectedPosition.mode === 'SELECT') return;
    const {
      idx,
      row
    } = selectedPosition;
    const column = columns[idx];
    const colSpan = getColSpan(column, lastFrozenColumnIndex, {
      type: 'ROW',
      row
    });

    const closeEditor = () => {
      setSelectedPosition(({
        idx,
        rowIdx
      }) => ({
        idx,
        rowIdx,
        mode: 'SELECT'
      }));
    };

    const onRowChange = (row, commitChanges) => {
      if (commitChanges) {
        updateRow(selectedPosition.rowIdx, row);
        closeEditor();
      } else {
        setSelectedPosition(position => ({ ...position,
          row
        }));
      }
    };

    if (rows[selectedPosition.rowIdx] !== selectedPosition.originalRow) {
      closeEditor();
    }

    return /*#__PURE__*/jsxRuntime.jsx(EditCell, {
      column: column,
      colSpan: colSpan,
      row: row,
      onRowChange: onRowChange,
      closeEditor: closeEditor,
      scrollToCell: () => {
        scrollToCell(selectedPosition);
      }
    }, column.key);
  }

  function getViewportRows() {
    const rowElements = [];
    let startRowIndex = 0;
    const {
      idx: selectedIdx,
      rowIdx: selectedRowIdx
    } = selectedPosition;
    const startRowIdx = selectedCellIsWithinViewportBounds && selectedRowIdx < rowOverscanStartIdx ? rowOverscanStartIdx - 1 : rowOverscanStartIdx;
    const endRowIdx = selectedCellIsWithinViewportBounds && selectedRowIdx > rowOverscanEndIdx ? rowOverscanEndIdx + 1 : rowOverscanEndIdx;

    for (let viewportRowIdx = startRowIdx; viewportRowIdx <= endRowIdx; viewportRowIdx++) {
      const isRowOutsideViewport = viewportRowIdx === rowOverscanStartIdx - 1 || viewportRowIdx === rowOverscanEndIdx + 1;
      const rowIdx = isRowOutsideViewport ? selectedRowIdx : viewportRowIdx;
      let rowColumns = viewportColumns;
      const selectedColumn = columns[selectedIdx];

      if (selectedColumn !== undefined) {
        if (isRowOutsideViewport) {
          rowColumns = [selectedColumn];
        } else if (selectedRowIdx === rowIdx && !viewportColumns.includes(selectedColumn)) {
          rowColumns = selectedIdx > viewportColumns[viewportColumns.length - 1].idx ? [...viewportColumns, selectedColumn] : [...viewportColumns.slice(0, lastFrozenColumnIndex + 1), selectedColumn, ...viewportColumns.slice(lastFrozenColumnIndex + 1)];
        }
      }

      if (stickyRowIndex !== undefined && stickyRowIndexes[stickyRowIndex] === rowIdx) {
        continue;
      }

      const row = rows[rowIdx];
      const top = getRowTop(rowIdx) + headerRowHeight;

      if (isGroupRow(row)) {
        ({
          startRowIndex
        } = row);
        const isGroupRowSelected = isSelectable && row.childRows.every(cr => selectedRows.has(rowKeyGetter(cr)));
        rowElements.push( /*#__PURE__*/jsxRuntime.jsx(GroupRowRenderer, {
          "aria-level": row.level + 1,
          "aria-setsize": row.setSize,
          "aria-posinset": row.posInSet + 1,
          "aria-rowindex": headerRowsCount + startRowIndex + 1,
          "aria-selected": isSelectable ? isGroupRowSelected : undefined,
          id: row.id,
          groupKey: row.groupKey,
          viewportColumns: rowColumns,
          childRows: row.childRows,
          rowIdx: rowIdx,
          row: row,
          top: top,
          height: getRowHeight(rowIdx),
          level: row.level,
          isExpanded: row.isExpanded,
          selectedCellIdx: selectedRowIdx === rowIdx ? selectedIdx : undefined,
          isRowSelected: isGroupRowSelected,
          selectGroup: selectGroupLatest,
          toggleGroup: toggleGroupLatest
        }, row.id));
        continue;
      }

      startRowIndex++;
      let key;
      let isRowSelected = false;

      if (typeof rowKeyGetter === 'function') {
        var _selectedRows$has;

        key = rowKeyGetter(row);
        isRowSelected = (_selectedRows$has = selectedRows == null ? void 0 : selectedRows.has(key)) != null ? _selectedRows$has : false;
      } else {
        key = hasGroups ? startRowIndex : rowIdx;
      }

      if (typeof row === 'object' && row.isStickyRow) {
        rowElements.push( /*#__PURE__*/jsxRuntime.jsx(StickyRow$1, {
          content: row.content,
          isStuck: false,
          top: top
        }, key));
        continue;
      }

      rowElements.push( /*#__PURE__*/jsxRuntime.jsx(RowRenderer, {
        "aria-rowindex": headerRowsCount + (hasGroups ? startRowIndex : rowIdx) + 1,
        "aria-selected": isSelectable ? isRowSelected : undefined,
        rowIdx: rowIdx,
        row: row,
        viewportColumns: rowColumns,
        isRowSelected: isRowSelected,
        onRowClick: onRowClick,
        onRowDoubleClick: onRowDoubleClick,
        rowClass: rowClass,
        top: top,
        height: getRowHeight(rowIdx),
        copiedCellIdx: copiedCell !== null && copiedCell.row === row ? columns.findIndex(c => c.key === copiedCell.columnKey) : undefined,
        selectedCellIdx: selectedRowIdx === rowIdx ? selectedIdx : undefined,
        draggedOverCellIdx: getDraggedOverCellIdx(rowIdx),
        setDraggedOverRowIdx: isDragging ? setDraggedOverRowIdx : undefined,
        lastFrozenColumnIndex: lastFrozenColumnIndex,
        onRowChange: handleFormatterRowChangeLatest,
        selectCell: selectViewportCellLatest,
        selectedCellDragHandle: getDragHandle(rowIdx),
        selectedCellEditor: getCellEditor(rowIdx)
      }, key));
    }

    return rowElements;
  }

  if (selectedPosition.idx > maxColIdx || selectedPosition.rowIdx > maxRowIdx) {
    setSelectedPosition(initialPosition);
    setDraggedOverRowIdx(undefined);
  }

  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    role: hasGroups ? 'treegrid' : 'grid',
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "aria-multiselectable": isSelectable ? true : undefined,
    "aria-colcount": columns.length,
    "aria-rowcount": headerRowsCount + rowsCount + summaryRowsCount,
    className: clsx(rootClassname, className, isDragging && viewportDraggingClassname),
    style: { ...style,
      '--header-row-height': `${headerRowHeight}px`,
      '--row-width': `${totalColumnWidth}px`,
      '--summary-row-height': `${summaryRowHeight}px`,
      ...layoutCssVars
    },
    ref: gridRef,
    onScroll: handleScroll,
    onKeyDown: handleKeyDown,
    "data-testid": testId,
    children: [/*#__PURE__*/jsxRuntime.jsx(HeaderRow$1, {
      columns: viewportColumns,
      onColumnResize: handleColumnResize,
      allRowsSelected: allRowsSelected,
      onAllRowsSelectionChange: selectAllRowsLatest,
      sortColumns: sortColumns,
      onSortColumnsChange: onSortColumnsChange,
      lastFrozenColumnIndex: lastFrozenColumnIndex,
      selectedCellIdx: isHeaderRowSelected ? selectedPosition.idx : undefined,
      selectCell: selectHeaderCellLatest,
      shouldFocusGrid: !selectedCellIsWithinSelectionBounds
    }), stickyRowIndex !== undefined && stickyRowIndexes.length ? /*#__PURE__*/jsxRuntime.jsx(StickyRow$1, {
      content: rows[stickyRowIndexes[stickyRowIndex]].content,
      isStuck: true,
      top: headerRowHeight
    }) : null, rows.length === 0 && noRowsFallback ? noRowsFallback : /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [/*#__PURE__*/jsxRuntime.jsx("div", {
        style: {
          height: max(totalRowHeight, clientHeight)
        }
      }), /*#__PURE__*/jsxRuntime.jsx(RowSelectionChangeProvider, {
        value: selectRowLatest,
        children: getViewportRows()
      }), summaryRows == null ? void 0 : summaryRows.map((row, rowIdx) => {
        const isSummaryRowSelected = selectedPosition.rowIdx === headerRowsCount + rows.length + rowIdx - 1;
        return /*#__PURE__*/jsxRuntime.jsx(SummaryRow$1, {
          "aria-rowindex": headerRowsCount + rowsCount + rowIdx + 1,
          rowIdx: rowIdx,
          row: row,
          bottom: summaryRowHeight * (summaryRows.length - 1 - rowIdx),
          viewportColumns: viewportColumns,
          lastFrozenColumnIndex: lastFrozenColumnIndex,
          selectedCellIdx: isSummaryRowSelected ? selectedPosition.idx : undefined,
          selectCell: selectSummaryCellLatest
        }, rowIdx);
      })]
    })]
  });
}

function isSamePosition(p1, p2) {
  return p1.idx === p2.idx && p1.rowIdx === p2.rowIdx;
}

const DataGrid$1 = /*#__PURE__*/react.forwardRef(DataGrid);

var css_248z = ".t1u15qzo70_0-beta_7{appearance:none;background-color:var(--background-color);border:2px solid #ccc;box-sizing:border-box;color:var(--color);font-family:inherit;font-size:var(--font-size);height:100%;padding:0 6px;vertical-align:top;width:100%}.t1u15qzo70_0-beta_7:focus{border-color:var(--selection-color);outline:none}.t1u15qzo70_0-beta_7::placeholder{color:#999;opacity:1}";
styleInject(css_248z,{"insertAt":"top"});

const textEditor = "t1u15qzo70_0-beta_7";
const textEditorClassname = `rdg-text-editor ${textEditor}`;

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
  return /*#__PURE__*/jsxRuntime.jsx("input", {
    className: textEditorClassname,
    ref: autoFocusAndSelect,
    value: row[column.key],
    onChange: event => onRowChange({ ...row,
      [column.key]: event.target.value
    }),
    onBlur: () => onClose(true)
  });
}

exports.Row = RowWithRef;
exports.SELECT_COLUMN_KEY = SELECT_COLUMN_KEY;
exports.SelectCellFormatter = SelectCellFormatter;
exports.SelectColumn = SelectColumn;
exports.SortableHeaderCell = SortableHeaderCell;
exports.TextEditor = TextEditor;
exports.ToggleGroupFormatter = ToggleGroupFormatter;
exports.ValueFormatter = ValueFormatter;
exports.default = DataGrid$1;
exports.useRowSelection = useRowSelection;
//# sourceMappingURL=bundle.cjs.map
