import { createContext, memo, useCallback, useContext, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import clsx from "clsx";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

//#region src/utils/colSpanUtils.ts
function getColSpan(column, lastFrozenColumnIndex, args) {
	const colSpan = typeof column.colSpan === "function" ? column.colSpan(args) : 1;
	if (Number.isInteger(colSpan) && colSpan > 1 && (!column.frozen || column.idx + colSpan - 1 <= lastFrozenColumnIndex)) return colSpan;
	return void 0;
}

//#endregion
//#region src/utils/domUtils.ts
function stopPropagation(event) {
	event.stopPropagation();
}
function scrollIntoView(element, behavior = "instant") {
	element?.scrollIntoView({
		inline: "nearest",
		block: "nearest",
		behavior
	});
}

//#endregion
//#region src/utils/eventUtils.ts
function createCellEvent(event) {
	let defaultPrevented = false;
	const cellEvent = {
		...event,
		preventGridDefault() {
			defaultPrevented = true;
		},
		isGridDefaultPrevented() {
			return defaultPrevented;
		}
	};
	Object.setPrototypeOf(cellEvent, Object.getPrototypeOf(event));
	return cellEvent;
}

//#endregion
//#region src/utils/keyboardUtils.ts
const nonInputKeys = new Set([
	"Unidentified",
	"Alt",
	"AltGraph",
	"CapsLock",
	"Control",
	"Fn",
	"FnLock",
	"Meta",
	"NumLock",
	"ScrollLock",
	"Shift",
	"Tab",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
	"ArrowUp",
	"End",
	"Home",
	"PageDown",
	"PageUp",
	"Insert",
	"ContextMenu",
	"Escape",
	"Pause",
	"Play",
	"PrintScreen",
	"F1",
	"F3",
	"F4",
	"F5",
	"F6",
	"F7",
	"F8",
	"F9",
	"F10",
	"F11",
	"F12"
]);
function isCtrlKeyHeldDown(e) {
	return (e.ctrlKey || e.metaKey) && e.key !== "Control";
}
const vKey = 86;
function isDefaultCellInput(event, isUserHandlingPaste) {
	if (isCtrlKeyHeldDown(event) && (event.keyCode !== vKey || isUserHandlingPaste)) return false;
	return !nonInputKeys.has(event.key);
}
/**
* By default, the following navigation keys are enabled while an editor is open, under specific conditions:
* - Tab:
*   - The editor must be an <input>, a <textarea>, or a <select> element.
*   - The editor element must be the only immediate child of the editor container/a label.
*/
function onEditorNavigation({ key, target }) {
	if (key === "Tab" && (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) return target.closest(".rdg-editor-container")?.querySelectorAll("input, textarea, select").length === 1;
	return false;
}
function getLeftRightKey(direction) {
	const isRtl = direction === "rtl";
	return {
		leftKey: isRtl ? "ArrowRight" : "ArrowLeft",
		rightKey: isRtl ? "ArrowLeft" : "ArrowRight"
	};
}

//#endregion
//#region src/utils/renderMeasuringCells.tsx
const measuringCellClassname = "mlln6zg7-0-0-beta-56";
function renderMeasuringCells(viewportColumns) {
	return viewportColumns.map(({ key, idx, minWidth, maxWidth }) => /* @__PURE__ */ jsx("div", {
		className: measuringCellClassname,
		style: {
			gridColumnStart: idx + 1,
			minWidth,
			maxWidth
		},
		"data-measuring-cell-key": key
	}, key));
}

//#endregion
//#region src/utils/selectedCellUtils.ts
function isSelectedCellEditable({ selectedPosition, columns, rows }) {
	const column = columns[selectedPosition.idx];
	const row$1 = rows[selectedPosition.rowIdx];
	return isCellEditableUtil(column, row$1);
}
function isCellEditableUtil(column, row$1) {
	return column.renderEditCell != null && (typeof column.editable === "function" ? column.editable(row$1) : column.editable) !== false;
}
function getSelectedCellColSpan({ rows, topSummaryRows, bottomSummaryRows, rowIdx, mainHeaderRowIdx, lastFrozenColumnIndex, column }) {
	const topSummaryRowsCount = topSummaryRows?.length ?? 0;
	if (rowIdx === mainHeaderRowIdx) return getColSpan(column, lastFrozenColumnIndex, { type: "HEADER" });
	if (topSummaryRows && rowIdx > mainHeaderRowIdx && rowIdx <= topSummaryRowsCount + mainHeaderRowIdx) return getColSpan(column, lastFrozenColumnIndex, {
		type: "SUMMARY",
		row: topSummaryRows[rowIdx + topSummaryRowsCount]
	});
	if (rowIdx >= 0 && rowIdx < rows.length) {
		const row$1 = rows[rowIdx];
		return getColSpan(column, lastFrozenColumnIndex, {
			type: "ROW",
			row: row$1
		});
	}
	if (bottomSummaryRows) return getColSpan(column, lastFrozenColumnIndex, {
		type: "SUMMARY",
		row: bottomSummaryRows[rowIdx - rows.length]
	});
	return void 0;
}
function getNextSelectedCellPosition({ moveUp, moveNext, cellNavigationMode, columns, colSpanColumns, rows, topSummaryRows, bottomSummaryRows, minRowIdx, mainHeaderRowIdx, maxRowIdx, currentPosition: { idx: currentIdx, rowIdx: currentRowIdx }, nextPosition, lastFrozenColumnIndex, isCellWithinBounds }) {
	let { idx: nextIdx, rowIdx: nextRowIdx } = nextPosition;
	const columnsCount = columns.length;
	const setColSpan = (moveNext$1) => {
		for (const column of colSpanColumns) {
			const colIdx = column.idx;
			if (colIdx > nextIdx) break;
			const colSpan = getSelectedCellColSpan({
				rows,
				topSummaryRows,
				bottomSummaryRows,
				rowIdx: nextRowIdx,
				mainHeaderRowIdx,
				lastFrozenColumnIndex,
				column
			});
			if (colSpan && nextIdx > colIdx && nextIdx < colSpan + colIdx) {
				nextIdx = colIdx + (moveNext$1 ? colSpan : 0);
				break;
			}
		}
	};
	const getParentRowIdx = (parent) => {
		return parent.level + mainHeaderRowIdx;
	};
	const setHeaderGroupColAndRowSpan = () => {
		if (moveNext) {
			const nextColumn = columns[nextIdx];
			let parent = nextColumn.parent;
			while (parent !== void 0) {
				const parentRowIdx = getParentRowIdx(parent);
				if (nextRowIdx === parentRowIdx) {
					nextIdx = parent.idx + parent.colSpan;
					break;
				}
				parent = parent.parent;
			}
		} else if (moveUp) {
			const nextColumn = columns[nextIdx];
			let parent = nextColumn.parent;
			let found = false;
			while (parent !== void 0) {
				const parentRowIdx = getParentRowIdx(parent);
				if (nextRowIdx >= parentRowIdx) {
					nextIdx = parent.idx;
					nextRowIdx = parentRowIdx;
					found = true;
					break;
				}
				parent = parent.parent;
			}
			if (!found) {
				nextIdx = currentIdx;
				nextRowIdx = currentRowIdx;
			}
		}
	};
	if (isCellWithinBounds(nextPosition)) {
		setColSpan(moveNext);
		if (nextRowIdx < mainHeaderRowIdx) setHeaderGroupColAndRowSpan();
	}
	if (cellNavigationMode === "CHANGE_ROW") {
		const isAfterLastColumn = nextIdx === columnsCount;
		const isBeforeFirstColumn = nextIdx === -1;
		if (isAfterLastColumn) {
			const isLastRow = nextRowIdx === maxRowIdx;
			if (!isLastRow) {
				nextIdx = 0;
				nextRowIdx += 1;
			}
		} else if (isBeforeFirstColumn) {
			const isFirstRow = nextRowIdx === minRowIdx;
			if (!isFirstRow) {
				nextRowIdx -= 1;
				nextIdx = columnsCount - 1;
			}
			setColSpan(false);
		}
	}
	if (nextRowIdx < mainHeaderRowIdx && nextIdx > -1 && nextIdx < columnsCount) {
		const nextColumn = columns[nextIdx];
		let parent = nextColumn.parent;
		const nextParentRowIdx = nextRowIdx;
		nextRowIdx = mainHeaderRowIdx;
		while (parent !== void 0) {
			const parentRowIdx = getParentRowIdx(parent);
			if (parentRowIdx >= nextParentRowIdx) {
				nextRowIdx = parentRowIdx;
				nextIdx = parent.idx;
			}
			parent = parent.parent;
		}
	}
	return {
		idx: nextIdx,
		rowIdx: nextRowIdx
	};
}
function canExitGrid({ maxColIdx, minRowIdx, maxRowIdx, selectedPosition: { rowIdx, idx }, shiftKey }) {
	const atLastCellInRow = idx === maxColIdx;
	const atFirstCellInRow = idx === 0;
	const atLastRow = rowIdx === maxRowIdx;
	const atFirstRow = rowIdx === minRowIdx;
	return shiftKey ? atFirstCellInRow && atFirstRow : atLastCellInRow && atLastRow;
}

//#endregion
//#region src/style/cell.ts
const cell = "cj343x07-0-0-beta-56";
const cellClassname = `rdg-cell ${cell}`;
const cellFrozen = "csofj7r7-0-0-beta-56";
const cellFrozenClassname = `rdg-cell-frozen ${cellFrozen}`;
const cellDragHandle = "ch2wcw87-0-0-beta-56";
const cellDragHandleFrozenClassname = "c1wvphzh7-0-0-beta-56";
const cellDragHandleClassname = `rdg-cell-drag-handle ${cellDragHandle}`;

//#endregion
//#region src/utils/styleUtils.ts
function getRowStyle(rowIdx) {
	return { "--rdg-grid-row-start": rowIdx };
}
function getHeaderCellStyle(column, rowIdx, rowSpan) {
	const gridRowEnd = rowIdx + 1;
	const paddingBlockStart = `calc(${rowSpan - 1} * var(--rdg-header-row-height))`;
	if (column.parent === void 0) return {
		insetBlockStart: 0,
		gridRowStart: 1,
		gridRowEnd,
		paddingBlockStart
	};
	return {
		insetBlockStart: `calc(${rowIdx - rowSpan} * var(--rdg-header-row-height))`,
		gridRowStart: gridRowEnd - rowSpan,
		gridRowEnd,
		paddingBlockStart
	};
}
function getCellStyle(column, colSpan = 1) {
	const index = column.idx + 1;
	return {
		gridColumnStart: index,
		gridColumnEnd: index + colSpan,
		insetInlineStart: column.frozen ? `var(--rdg-frozen-left-${column.idx})` : void 0
	};
}
function getCellClassname(column, ...extraClasses) {
	return clsx(cellClassname, { [cellFrozenClassname]: column.frozen }, ...extraClasses);
}

//#endregion
//#region src/utils/index.ts
const { min, max, floor, sign, abs } = Math;
function assertIsValidKeyGetter(keyGetter) {
	if (typeof keyGetter !== "function") throw new Error("Please specify the rowKeyGetter prop to use selection");
}
function clampColumnWidth(width, { minWidth, maxWidth }) {
	width = max(width, minWidth);
	if (typeof maxWidth === "number" && maxWidth >= minWidth) return min(width, maxWidth);
	return width;
}
function getHeaderCellRowSpan(column, rowIdx) {
	return column.parent === void 0 ? rowIdx : column.level - column.parent.level;
}
const isValueInBetween = (value, num1, num2) => {
	if (num1 >= num2) return value <= num1 && value >= num2;
	return value >= num1 && value <= num2;
};

//#endregion
//#region src/cellRenderers/renderCheckbox.tsx
const checkbox = "c1bn88vv7-0-0-beta-56";
const checkboxClassname = `rdg-checkbox-input ${checkbox}`;
function renderCheckbox({ onChange, indeterminate,...props }) {
	function handleChange(e) {
		onChange(e.target.checked, e.nativeEvent.shiftKey);
	}
	return /* @__PURE__ */ jsx("input", {
		ref: (el) => {
			if (el) el.indeterminate = indeterminate === true;
		},
		type: "checkbox",
		className: checkboxClassname,
		onChange: handleChange,
		...props
	});
}

//#endregion
//#region src/cellRenderers/renderToggleGroup.tsx
const groupCellContent = "g1s9ylgp7-0-0-beta-56";
const groupCellContentClassname = `rdg-group-cell-content ${groupCellContent}`;
const caret = "cz54e4y7-0-0-beta-56";
const caretClassname = `rdg-caret ${caret}`;
function renderToggleGroup(props) {
	return /* @__PURE__ */ jsx(ToggleGroup, { ...props });
}
function ToggleGroup({ groupKey, isExpanded, tabIndex, toggleGroup }) {
	function handleKeyDown({ key }) {
		if (key === "Enter") toggleGroup();
	}
	const d = isExpanded ? "M1 1 L 7 7 L 13 1" : "M1 7 L 7 1 L 13 7";
	return /* @__PURE__ */ jsxs("span", {
		className: groupCellContentClassname,
		tabIndex,
		onKeyDown: handleKeyDown,
		children: [groupKey, /* @__PURE__ */ jsx("svg", {
			viewBox: "0 0 14 8",
			width: "14",
			height: "8",
			className: caretClassname,
			"aria-hidden": true,
			children: /* @__PURE__ */ jsx("path", { d })
		})]
	});
}

//#endregion
//#region src/cellRenderers/renderValue.tsx
function renderValue(props) {
	try {
		return props.row[props.column.key];
	} catch {
		return null;
	}
}

//#endregion
//#region src/DataGridDefaultRenderersContext.ts
const DataGridDefaultRenderersContext = createContext(void 0);
function useDefaultRenderers() {
	return useContext(DataGridDefaultRenderersContext);
}

//#endregion
//#region src/cellRenderers/SelectCellFormatter.tsx
function SelectCellFormatter({ value, tabIndex, indeterminate, disabled, onChange, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy }) {
	const renderCheckbox$1 = useDefaultRenderers().renderCheckbox;
	return renderCheckbox$1({
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledBy,
		tabIndex,
		indeterminate,
		disabled,
		checked: value,
		onChange
	});
}

//#endregion
//#region src/hooks/useRowSelection.ts
const RowSelectionContext = createContext(void 0);
const RowSelectionChangeContext = createContext(void 0);
function useRowSelection() {
	const rowSelectionContext = useContext(RowSelectionContext);
	const rowSelectionChangeContext = useContext(RowSelectionChangeContext);
	if (rowSelectionContext === void 0 || rowSelectionChangeContext === void 0) throw new Error("useRowSelection must be used within renderCell");
	return {
		isRowSelectionDisabled: rowSelectionContext.isRowSelectionDisabled,
		isRowSelected: rowSelectionContext.isRowSelected,
		onRowSelectionChange: rowSelectionChangeContext
	};
}
const HeaderRowSelectionContext = createContext(void 0);
const HeaderRowSelectionChangeContext = createContext(void 0);
function useHeaderRowSelection() {
	const headerRowSelectionContext = useContext(HeaderRowSelectionContext);
	const headerRowSelectionChangeContext = useContext(HeaderRowSelectionChangeContext);
	if (headerRowSelectionContext === void 0 || headerRowSelectionChangeContext === void 0) throw new Error("useHeaderRowSelection must be used within renderHeaderCell");
	return {
		isIndeterminate: headerRowSelectionContext.isIndeterminate,
		isRowSelected: headerRowSelectionContext.isRowSelected,
		onRowSelectionChange: headerRowSelectionChangeContext
	};
}

//#endregion
//#region src/Columns.tsx
const SELECT_COLUMN_KEY = "rdg-select-column";
function HeaderRenderer(props) {
	const { isIndeterminate, isRowSelected, onRowSelectionChange } = useHeaderRowSelection();
	return /* @__PURE__ */ jsx(SelectCellFormatter, {
		"aria-label": "Select All",
		tabIndex: props.tabIndex,
		indeterminate: isIndeterminate,
		value: isRowSelected,
		onChange: (checked) => {
			onRowSelectionChange({ checked: isIndeterminate ? false : checked });
		}
	});
}
function SelectFormatter(props) {
	const { isRowSelectionDisabled, isRowSelected, onRowSelectionChange } = useRowSelection();
	return /* @__PURE__ */ jsx(SelectCellFormatter, {
		"aria-label": "Select",
		tabIndex: props.tabIndex,
		disabled: isRowSelectionDisabled,
		value: isRowSelected,
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
	const { isRowSelected, onRowSelectionChange } = useRowSelection();
	return /* @__PURE__ */ jsx(SelectCellFormatter, {
		"aria-label": "Select Group",
		tabIndex: props.tabIndex,
		value: isRowSelected,
		onChange: (checked) => {
			onRowSelectionChange({
				row: props.row,
				checked,
				isShiftClick: false
			});
		}
	});
}
const SelectColumn = {
	key: SELECT_COLUMN_KEY,
	name: "",
	width: 35,
	minWidth: 35,
	maxWidth: 35,
	resizable: false,
	sortable: false,
	frozen: true,
	renderHeaderCell(props) {
		return /* @__PURE__ */ jsx(HeaderRenderer, { ...props });
	},
	renderCell(props) {
		return /* @__PURE__ */ jsx(SelectFormatter, { ...props });
	},
	renderGroupCell(props) {
		return /* @__PURE__ */ jsx(SelectGroupFormatter, { ...props });
	}
};

//#endregion
//#region src/renderHeaderCell.tsx
const headerSortCellClassname = "h44jtk67-0-0-beta-56";
const headerSortName = "hcgkhxz7-0-0-beta-56";
const headerSortNameClassname = `rdg-header-sort-name ${headerSortName}`;
function renderHeaderCell({ column, sortDirection, priority }) {
	if (!column.sortable) return column.name;
	return /* @__PURE__ */ jsx(SortableHeaderCell, {
		sortDirection,
		priority,
		children: column.name
	});
}
function SortableHeaderCell({ sortDirection, priority, children }) {
	const renderSortStatus$1 = useDefaultRenderers().renderSortStatus;
	return /* @__PURE__ */ jsxs("span", {
		className: headerSortCellClassname,
		children: [/* @__PURE__ */ jsx("span", {
			className: headerSortNameClassname,
			children
		}), /* @__PURE__ */ jsx("span", { children: renderSortStatus$1({
			sortDirection,
			priority
		}) })]
	});
}

//#endregion
//#region src/hooks/useCalculatedColumns.ts
const DEFAULT_COLUMN_WIDTH = "auto";
const DEFAULT_COLUMN_MIN_WIDTH = 50;
function useCalculatedColumns({ rawColumns, defaultColumnOptions, getColumnWidth, viewportWidth, scrollLeft, enableVirtualization }) {
	const defaultWidth = defaultColumnOptions?.width ?? DEFAULT_COLUMN_WIDTH;
	const defaultMinWidth = defaultColumnOptions?.minWidth ?? DEFAULT_COLUMN_MIN_WIDTH;
	const defaultMaxWidth = defaultColumnOptions?.maxWidth ?? void 0;
	const defaultRenderCell$1 = defaultColumnOptions?.renderCell ?? renderValue;
	const defaultRenderHeaderCell = defaultColumnOptions?.renderHeaderCell ?? renderHeaderCell;
	const defaultSortable = defaultColumnOptions?.sortable ?? false;
	const defaultResizable = defaultColumnOptions?.resizable ?? false;
	const defaultDraggable = defaultColumnOptions?.draggable ?? false;
	const { columns, colSpanColumns, lastFrozenColumnIndex, headerRowsCount } = useMemo(() => {
		let lastFrozenColumnIndex$1 = -1;
		let headerRowsCount$1 = 1;
		const columns$1 = [];
		collectColumns(rawColumns, 1);
		function collectColumns(rawColumns$1, level, parent) {
			for (const rawColumn of rawColumns$1) {
				if ("children" in rawColumn) {
					const calculatedColumnParent = {
						name: rawColumn.name,
						parent,
						idx: -1,
						colSpan: 0,
						level: 0,
						headerCellClass: rawColumn.headerCellClass
					};
					collectColumns(rawColumn.children, level + 1, calculatedColumnParent);
					continue;
				}
				const frozen = rawColumn.frozen ?? false;
				const column = {
					...rawColumn,
					parent,
					idx: 0,
					level: 0,
					frozen,
					width: rawColumn.width ?? defaultWidth,
					minWidth: rawColumn.minWidth ?? defaultMinWidth,
					maxWidth: rawColumn.maxWidth ?? defaultMaxWidth,
					sortable: rawColumn.sortable ?? defaultSortable,
					resizable: rawColumn.resizable ?? defaultResizable,
					draggable: rawColumn.draggable ?? defaultDraggable,
					renderCell: rawColumn.renderCell ?? defaultRenderCell$1,
					renderHeaderCell: rawColumn.renderHeaderCell ?? defaultRenderHeaderCell
				};
				columns$1.push(column);
				if (frozen) lastFrozenColumnIndex$1++;
				if (level > headerRowsCount$1) headerRowsCount$1 = level;
			}
		}
		columns$1.sort(({ key: aKey, frozen: frozenA }, { key: bKey, frozen: frozenB }) => {
			if (aKey === SELECT_COLUMN_KEY) return -1;
			if (bKey === SELECT_COLUMN_KEY) return 1;
			if (frozenA) {
				if (frozenB) return 0;
				return -1;
			}
			if (frozenB) return 1;
			return 0;
		});
		const colSpanColumns$1 = [];
		columns$1.forEach((column, idx) => {
			column.idx = idx;
			updateColumnParent(column, idx, 0);
			if (column.colSpan != null) colSpanColumns$1.push(column);
		});
		return {
			columns: columns$1,
			colSpanColumns: colSpanColumns$1,
			lastFrozenColumnIndex: lastFrozenColumnIndex$1,
			headerRowsCount: headerRowsCount$1
		};
	}, [
		rawColumns,
		defaultWidth,
		defaultMinWidth,
		defaultMaxWidth,
		defaultRenderCell$1,
		defaultRenderHeaderCell,
		defaultResizable,
		defaultSortable,
		defaultDraggable
	]);
	const { templateColumns, layoutCssVars, totalFrozenColumnWidth, columnMetrics } = useMemo(() => {
		const columnMetrics$1 = /* @__PURE__ */ new Map();
		let left = 0;
		let totalFrozenColumnWidth$1 = 0;
		const templateColumns$1 = [];
		for (const column of columns) {
			let width = getColumnWidth(column);
			if (typeof width === "number") width = clampColumnWidth(width, column);
			else width = column.minWidth;
			templateColumns$1.push(`${width}px`);
			columnMetrics$1.set(column, {
				width,
				left
			});
			left += width;
		}
		if (lastFrozenColumnIndex !== -1) {
			const columnMetric = columnMetrics$1.get(columns[lastFrozenColumnIndex]);
			totalFrozenColumnWidth$1 = columnMetric.left + columnMetric.width;
		}
		const layoutCssVars$1 = {};
		for (let i = 0; i <= lastFrozenColumnIndex; i++) {
			const column = columns[i];
			layoutCssVars$1[`--rdg-frozen-left-${column.idx}`] = `${columnMetrics$1.get(column).left}px`;
		}
		return {
			templateColumns: templateColumns$1,
			layoutCssVars: layoutCssVars$1,
			totalFrozenColumnWidth: totalFrozenColumnWidth$1,
			columnMetrics: columnMetrics$1
		};
	}, [
		getColumnWidth,
		columns,
		lastFrozenColumnIndex
	]);
	const [colOverscanStartIdx, colOverscanEndIdx] = useMemo(() => {
		if (!enableVirtualization) return [0, columns.length - 1];
		const viewportLeft = scrollLeft + totalFrozenColumnWidth;
		const viewportRight = scrollLeft + viewportWidth;
		const lastColIdx = columns.length - 1;
		const firstUnfrozenColumnIdx = min(lastFrozenColumnIndex + 1, lastColIdx);
		if (viewportLeft >= viewportRight) return [firstUnfrozenColumnIdx, firstUnfrozenColumnIdx];
		let colVisibleStartIdx = firstUnfrozenColumnIdx;
		while (colVisibleStartIdx < lastColIdx) {
			const { left, width } = columnMetrics.get(columns[colVisibleStartIdx]);
			if (left + width > viewportLeft) break;
			colVisibleStartIdx++;
		}
		let colVisibleEndIdx = colVisibleStartIdx;
		while (colVisibleEndIdx < lastColIdx) {
			const { left, width } = columnMetrics.get(columns[colVisibleEndIdx]);
			if (left + width >= viewportRight) break;
			colVisibleEndIdx++;
		}
		const colOverscanStartIdx$1 = max(firstUnfrozenColumnIdx, colVisibleStartIdx - 1);
		const colOverscanEndIdx$1 = min(lastColIdx, colVisibleEndIdx + 1);
		return [colOverscanStartIdx$1, colOverscanEndIdx$1];
	}, [
		columnMetrics,
		columns,
		lastFrozenColumnIndex,
		scrollLeft,
		totalFrozenColumnWidth,
		viewportWidth,
		enableVirtualization
	]);
	return {
		columns,
		colSpanColumns,
		colOverscanStartIdx,
		colOverscanEndIdx,
		templateColumns,
		layoutCssVars,
		headerRowsCount,
		lastFrozenColumnIndex,
		totalFrozenColumnWidth
	};
}
function updateColumnParent(column, index, level) {
	if (level < column.level) column.level = level;
	if (column.parent !== void 0) {
		const { parent } = column;
		if (parent.idx === -1) parent.idx = index;
		parent.colSpan += 1;
		updateColumnParent(parent, index, level - 1);
	}
}

//#endregion
//#region src/hooks/useColumnWidths.ts
function useColumnWidths(columns, viewportColumns, templateColumns, gridRef, gridWidth, columnWidths, onColumnWidthsChange, onColumnResize, setColumnResizing) {
	const [columnToAutoResize, setColumnToAutoResize] = useState(null);
	const [columnsToMeasureOnResize, setColumnsToMeasureOnResize] = useState(null);
	const [prevGridWidth, setPreviousGridWidth] = useState(gridWidth);
	const columnsCanFlex = columns.length === viewportColumns.length;
	const ignorePreviouslyMeasuredColumnsOnGridWidthChange = columnsCanFlex && gridWidth !== prevGridWidth;
	const newTemplateColumns = [...templateColumns];
	const columnsToMeasure = [];
	for (const { key, idx, width } of viewportColumns) {
		const columnWidth = columnWidths.get(key);
		if (key === columnToAutoResize?.key) {
			newTemplateColumns[idx] = columnToAutoResize.width === "max-content" ? columnToAutoResize.width : `${columnToAutoResize.width}px`;
			columnsToMeasure.push(key);
		} else if (typeof width === "string" && columnWidth?.type !== "resized" && (ignorePreviouslyMeasuredColumnsOnGridWidthChange || columnsToMeasureOnResize?.has(key) === true || columnWidth === void 0)) {
			newTemplateColumns[idx] = width;
			columnsToMeasure.push(key);
		}
	}
	const gridTemplateColumns = newTemplateColumns.join(" ");
	useLayoutEffect(updateMeasuredAndResizedWidths);
	function updateMeasuredAndResizedWidths() {
		setPreviousGridWidth(gridWidth);
		if (columnsToMeasure.length === 0) return;
		const newColumnWidths = new Map(columnWidths);
		let hasChanges = false;
		for (const key of columnsToMeasure) {
			const measuredWidth = measureColumnWidth(gridRef, key);
			hasChanges ||= measuredWidth !== columnWidths.get(key)?.width;
			if (measuredWidth === void 0) newColumnWidths.delete(key);
			else newColumnWidths.set(key, {
				type: "measured",
				width: measuredWidth
			});
		}
		if (columnToAutoResize !== null) {
			const resizingKey = columnToAutoResize.key;
			const oldWidth = columnWidths.get(resizingKey)?.width;
			const newWidth = measureColumnWidth(gridRef, resizingKey);
			if (newWidth !== void 0 && oldWidth !== newWidth) {
				hasChanges = true;
				newColumnWidths.set(resizingKey, {
					type: "resized",
					width: newWidth
				});
			}
			setColumnToAutoResize(null);
		}
		if (hasChanges) onColumnWidthsChange(newColumnWidths);
	}
	function handleColumnResize(column, nextWidth) {
		const { key: resizingKey } = column;
		flushSync(() => {
			if (columnsCanFlex) {
				const columnsToRemeasure = /* @__PURE__ */ new Set();
				for (const { key, width } of viewportColumns) if (resizingKey !== key && typeof width === "string" && columnWidths.get(key)?.type !== "resized") columnsToRemeasure.add(key);
				setColumnsToMeasureOnResize(columnsToRemeasure);
			}
			setColumnToAutoResize({
				key: resizingKey,
				width: nextWidth
			});
			setColumnResizing(typeof nextWidth === "number");
		});
		setColumnsToMeasureOnResize(null);
		if (onColumnResize) {
			const previousWidth = columnWidths.get(resizingKey)?.width;
			const newWidth = typeof nextWidth === "number" ? nextWidth : measureColumnWidth(gridRef, resizingKey);
			if (newWidth !== void 0 && newWidth !== previousWidth) onColumnResize(column, newWidth);
		}
	}
	return {
		gridTemplateColumns,
		handleColumnResize
	};
}
function measureColumnWidth(gridRef, key) {
	const selector = `[data-measuring-cell-key="${CSS.escape(key)}"]`;
	const measuringCell = gridRef.current?.querySelector(selector);
	return measuringCell?.getBoundingClientRect().width;
}

//#endregion
//#region src/hooks/useGridDimensions.ts
function useGridDimensions() {
	const gridRef = useRef(null);
	const [inlineSize, setInlineSize] = useState(1);
	const [blockSize, setBlockSize] = useState(1);
	const [horizontalScrollbarHeight, setHorizontalScrollbarHeight] = useState(0);
	useLayoutEffect(() => {
		const { ResizeObserver } = window;
		if (ResizeObserver == null) return;
		const { clientWidth, clientHeight, offsetWidth, offsetHeight } = gridRef.current;
		const { width, height } = gridRef.current.getBoundingClientRect();
		const initialHorizontalScrollbarHeight = offsetHeight - clientHeight;
		const initialWidth = width - offsetWidth + clientWidth;
		const initialHeight = height - initialHorizontalScrollbarHeight;
		setInlineSize(initialWidth);
		setBlockSize(initialHeight);
		setHorizontalScrollbarHeight(initialHorizontalScrollbarHeight);
		const resizeObserver = new ResizeObserver((entries) => {
			const size = entries[0].contentBoxSize[0];
			const { clientHeight: clientHeight$1, offsetHeight: offsetHeight$1 } = gridRef.current;
			flushSync(() => {
				setInlineSize(size.inlineSize);
				setBlockSize(size.blockSize);
				setHorizontalScrollbarHeight(offsetHeight$1 - clientHeight$1);
			});
		});
		resizeObserver.observe(gridRef.current);
		return () => {
			resizeObserver.disconnect();
		};
	}, []);
	return [
		gridRef,
		inlineSize,
		blockSize,
		horizontalScrollbarHeight
	];
}

//#endregion
//#region src/hooks/useLatestFunc.ts
function useLatestFunc(fn) {
	const ref = useRef(fn);
	useLayoutEffect(() => {
		ref.current = fn;
	});
	const callbackFn = useCallback((...args) => {
		ref.current(...args);
	}, []);
	return fn ? callbackFn : fn;
}

//#endregion
//#region src/hooks/useRovingTabIndex.ts
function useRovingTabIndex(isSelected) {
	const [isChildFocused, setIsChildFocused] = useState(false);
	if (isChildFocused && !isSelected) setIsChildFocused(false);
	function onFocus(event) {
		if (event.target === event.currentTarget) {
			const elementToFocus = event.currentTarget.querySelector("[tabindex=\"0\"]");
			if (elementToFocus !== null) {
				elementToFocus.focus({ preventScroll: true });
				setIsChildFocused(true);
			} else setIsChildFocused(false);
		} else setIsChildFocused(true);
	}
	const isFocusable = isSelected && !isChildFocused;
	return {
		tabIndex: isFocusable ? 0 : -1,
		childTabIndex: isSelected ? 0 : -1,
		onFocus: isSelected ? onFocus : void 0
	};
}

//#endregion
//#region src/hooks/useViewportColumns.ts
function useViewportColumns({ columns, colSpanColumns, rows, topSummaryRows, bottomSummaryRows, colOverscanStartIdx, colOverscanEndIdx, lastFrozenColumnIndex, rowOverscanStartIdx, rowOverscanEndIdx }) {
	const startIdx = useMemo(() => {
		if (colOverscanStartIdx === 0) return 0;
		let startIdx$1 = colOverscanStartIdx;
		const updateStartIdx = (colIdx, colSpan) => {
			if (colSpan !== void 0 && colIdx + colSpan > colOverscanStartIdx) {
				startIdx$1 = colIdx;
				return true;
			}
			return false;
		};
		for (const column of colSpanColumns) {
			const colIdx = column.idx;
			if (colIdx >= startIdx$1) break;
			if (updateStartIdx(colIdx, getColSpan(column, lastFrozenColumnIndex, { type: "HEADER" }))) break;
			for (let rowIdx = rowOverscanStartIdx; rowIdx <= rowOverscanEndIdx; rowIdx++) {
				const row$1 = rows[rowIdx];
				if (updateStartIdx(colIdx, getColSpan(column, lastFrozenColumnIndex, {
					type: "ROW",
					row: row$1
				}))) break;
			}
			if (topSummaryRows != null) {
				for (const row$1 of topSummaryRows) if (updateStartIdx(colIdx, getColSpan(column, lastFrozenColumnIndex, {
					type: "SUMMARY",
					row: row$1
				}))) break;
			}
			if (bottomSummaryRows != null) {
				for (const row$1 of bottomSummaryRows) if (updateStartIdx(colIdx, getColSpan(column, lastFrozenColumnIndex, {
					type: "SUMMARY",
					row: row$1
				}))) break;
			}
		}
		return startIdx$1;
	}, [
		rowOverscanStartIdx,
		rowOverscanEndIdx,
		rows,
		topSummaryRows,
		bottomSummaryRows,
		colOverscanStartIdx,
		lastFrozenColumnIndex,
		colSpanColumns
	]);
	return useMemo(() => {
		const viewportColumns = [];
		for (let colIdx = 0; colIdx <= colOverscanEndIdx; colIdx++) {
			const column = columns[colIdx];
			if (colIdx < startIdx && !column.frozen) continue;
			viewportColumns.push(column);
		}
		return viewportColumns;
	}, [
		startIdx,
		colOverscanEndIdx,
		columns
	]);
}

//#endregion
//#region src/hooks/useViewportRows.ts
function useViewportRows({ rows, rowHeight, clientHeight, scrollTop, enableVirtualization }) {
	const { totalRowHeight, gridTemplateRows, getRowTop, getRowHeight, findRowIdx } = useMemo(() => {
		if (typeof rowHeight === "number") return {
			totalRowHeight: rowHeight * rows.length,
			gridTemplateRows: ` repeat(${rows.length}, ${rowHeight}px)`,
			getRowTop: (rowIdx) => rowIdx * rowHeight,
			getRowHeight: () => rowHeight,
			findRowIdx: (offset) => floor(offset / rowHeight)
		};
		let totalRowHeight$1 = 0;
		let gridTemplateRows$1 = " ";
		const rowPositions = rows.map((row$1) => {
			const currentRowHeight = rowHeight(row$1);
			const position = {
				top: totalRowHeight$1,
				height: currentRowHeight
			};
			gridTemplateRows$1 += `${currentRowHeight}px `;
			totalRowHeight$1 += currentRowHeight;
			return position;
		});
		const validateRowIdx = (rowIdx) => {
			return max(0, min(rows.length - 1, rowIdx));
		};
		return {
			totalRowHeight: totalRowHeight$1,
			gridTemplateRows: gridTemplateRows$1,
			getRowTop: (rowIdx) => rowPositions[validateRowIdx(rowIdx)].top,
			getRowHeight: (rowIdx) => rowPositions[validateRowIdx(rowIdx)].height,
			findRowIdx(offset) {
				let start = 0;
				let end = rowPositions.length - 1;
				while (start <= end) {
					const middle = start + floor((end - start) / 2);
					const currentOffset = rowPositions[middle].top;
					if (currentOffset === offset) return middle;
					if (currentOffset < offset) start = middle + 1;
					else if (currentOffset > offset) end = middle - 1;
					if (start > end) return end;
				}
				return 0;
			}
		};
	}, [rowHeight, rows]);
	let rowOverscanStartIdx = 0;
	let rowOverscanEndIdx = rows.length - 1;
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
		totalRowHeight,
		gridTemplateRows,
		getRowTop,
		getRowHeight,
		findRowIdx
	};
}

//#endregion
//#region src/Cell.tsx
const cellDraggedOver = "c6ra8a37-0-0-beta-56";
const cellDraggedOverClassname = `rdg-cell-dragged-over ${cellDraggedOver}`;
function Cell({ column, colSpan, isCellSelected, isDraggedOver, row: row$1, rowIdx, className, onMouseDown, onMouseDownCapture, onMouseUpCapture, onMouseEnter, onCellMouseDown, onClick, onCellClick, onDoubleClick, onCellDoubleClick, onContextMenu, onCellContextMenu, onRowChange, selectCell, style, rangeSelectionMode,...props }) {
	const { tabIndex, childTabIndex, onFocus } = useRovingTabIndex(isCellSelected);
	const { cellClass } = column;
	className = getCellClassname(column, { [cellDraggedOverClassname]: isDraggedOver }, typeof cellClass === "function" ? cellClass(row$1) : cellClass, className);
	const isEditable = isCellEditableUtil(column, row$1);
	function selectCellWrapper(enableEditor) {
		selectCell({
			rowIdx,
			idx: column.idx
		}, { enableEditor });
	}
	function handleMouseEvent(event, eventHandler) {
		let eventHandled = false;
		if (eventHandler) {
			const cellEvent = createCellEvent(event);
			eventHandler({
				rowIdx,
				row: row$1,
				column,
				selectCell: selectCellWrapper
			}, cellEvent);
			eventHandled = cellEvent.isGridDefaultPrevented();
		}
		return eventHandled;
	}
	function handleMouseDown(event) {
		onMouseDown?.(event);
		if (!handleMouseEvent(event, onCellMouseDown) || rangeSelectionMode) selectCellWrapper();
	}
	function handleClick(event) {
		onClick?.(event);
		handleMouseEvent(event, onCellClick);
	}
	function handleDoubleClick(event) {
		onDoubleClick?.(event);
		if (!handleMouseEvent(event, onCellDoubleClick)) selectCellWrapper(true);
	}
	function handleContextMenu(event) {
		onContextMenu?.(event);
		handleMouseEvent(event, onCellContextMenu);
	}
	function handleRowChange(newRow) {
		onRowChange(column, newRow);
	}
	function getOnMouseEvent(handler) {
		function onMouseEvent(event) {
			if (handler) {
				const cellEvent = createCellEvent(event);
				handler({
					row: row$1,
					column,
					selectCell: selectCellWrapper,
					rowIdx
				}, cellEvent);
			}
		}
		return onMouseEvent;
	}
	return /* @__PURE__ */ jsx("div", {
		role: "gridcell",
		"aria-colindex": column.idx + 1,
		"aria-colspan": colSpan,
		"aria-selected": isCellSelected,
		"aria-readonly": !isEditable || void 0,
		tabIndex,
		className,
		style: {
			...getCellStyle(column, colSpan),
			...style
		},
		onClick: handleClick,
		onMouseDown: handleMouseDown,
		onMouseDownCapture: getOnMouseEvent(onMouseDownCapture),
		onMouseUpCapture: getOnMouseEvent(onMouseUpCapture),
		onMouseEnter: getOnMouseEvent(onMouseEnter),
		onDoubleClick: handleDoubleClick,
		onContextMenu: handleContextMenu,
		onFocus,
		...props,
		children: column.renderCell({
			column,
			row: row$1,
			rowIdx,
			isCellEditable: isEditable,
			tabIndex: childTabIndex,
			onRowChange: handleRowChange
		})
	});
}
const CellComponent = memo(Cell);
var Cell_default = CellComponent;
function defaultRenderCell(key, props) {
	return /* @__PURE__ */ jsx(CellComponent, { ...props }, key);
}

//#endregion
//#region src/EditCell.tsx
const canUsePostTask = typeof scheduler === "object" && typeof scheduler.postTask === "function";
const cellEditing = "cis5rrm7-0-0-beta-56";
function EditCell({ column, colSpan, row: row$1, rowIdx, onRowChange, closeEditor, onKeyDown, navigate }) {
	const captureEventRef = useRef(void 0);
	const abortControllerRef = useRef(void 0);
	const frameRequestRef = useRef(void 0);
	const commitOnOutsideClick = column.editorOptions?.commitOnOutsideClick ?? true;
	const commitOnOutsideMouseDown = useLatestFunc(() => {
		onClose(true, false);
	});
	useLayoutEffect(() => {
		if (!commitOnOutsideClick) return;
		function onWindowCaptureMouseDown(event) {
			captureEventRef.current = event;
			if (canUsePostTask) {
				const abortController = new AbortController();
				const { signal } = abortController;
				abortControllerRef.current = abortController;
				scheduler.postTask(commitOnOutsideMouseDown, {
					priority: "user-blocking",
					signal
				}).catch(() => {});
			} else frameRequestRef.current = requestAnimationFrame(commitOnOutsideMouseDown);
		}
		function onWindowMouseDown(event) {
			if (captureEventRef.current === event) commitOnOutsideMouseDown();
		}
		addEventListener("mousedown", onWindowCaptureMouseDown, { capture: true });
		addEventListener("mousedown", onWindowMouseDown);
		return () => {
			removeEventListener("mousedown", onWindowCaptureMouseDown, { capture: true });
			removeEventListener("mousedown", onWindowMouseDown);
			cancelTask();
		};
	}, [commitOnOutsideClick, commitOnOutsideMouseDown]);
	function cancelTask() {
		captureEventRef.current = void 0;
		if (abortControllerRef.current !== void 0) {
			abortControllerRef.current.abort();
			abortControllerRef.current = void 0;
		}
		if (frameRequestRef.current !== void 0) {
			cancelAnimationFrame(frameRequestRef.current);
			frameRequestRef.current = void 0;
		}
	}
	function handleKeyDown(event) {
		if (onKeyDown) {
			const cellEvent = createCellEvent(event);
			onKeyDown({
				mode: "EDIT",
				row: row$1,
				column,
				rowIdx,
				navigate() {
					navigate(event);
				},
				onClose
			}, cellEvent);
			if (cellEvent.isGridDefaultPrevented()) return;
		}
		if (event.key === "Escape") onClose();
		else if (event.key === "Enter") onClose(true);
		else if (onEditorNavigation(event)) navigate(event);
	}
	function onClose(commitChanges = false, shouldFocusCell = true) {
		if (commitChanges) onRowChange(row$1, true, shouldFocusCell);
		else closeEditor(shouldFocusCell);
	}
	function onEditorRowChange(row$2, commitChangesAndFocus = false) {
		onRowChange(row$2, commitChangesAndFocus, commitChangesAndFocus);
	}
	const { cellClass } = column;
	const className = getCellClassname(column, "rdg-editor-container", !column.editorOptions?.displayCellContent && cellEditing, typeof cellClass === "function" ? cellClass(row$1) : cellClass);
	return /* @__PURE__ */ jsx("div", {
		role: "gridcell",
		"aria-colindex": column.idx + 1,
		"aria-colspan": colSpan,
		"aria-selected": true,
		className,
		style: getCellStyle(column, colSpan),
		onKeyDown: handleKeyDown,
		onMouseDownCapture: cancelTask,
		children: column.renderEditCell != null && /* @__PURE__ */ jsxs(Fragment, { children: [column.renderEditCell({
			column,
			row: row$1,
			rowIdx,
			onRowChange: onEditorRowChange,
			onClose
		}), column.editorOptions?.displayCellContent && column.renderCell({
			column,
			row: row$1,
			rowIdx,
			isCellEditable: true,
			tabIndex: -1,
			onRowChange: onEditorRowChange
		})] })
	});
}

//#endregion
//#region src/GroupedColumnHeaderCell.tsx
function GroupedColumnHeaderCell({ column, rowIdx, isCellSelected, selectCell }) {
	const { tabIndex, onFocus } = useRovingTabIndex(isCellSelected);
	const { colSpan } = column;
	const rowSpan = getHeaderCellRowSpan(column, rowIdx);
	const index = column.idx + 1;
	function onMouseDown() {
		selectCell({
			idx: column.idx,
			rowIdx
		});
	}
	return /* @__PURE__ */ jsx("div", {
		role: "columnheader",
		"aria-colindex": index,
		"aria-colspan": colSpan,
		"aria-rowspan": rowSpan,
		"aria-selected": isCellSelected,
		tabIndex,
		className: clsx(cellClassname, column.headerCellClass),
		style: {
			...getHeaderCellStyle(column, rowIdx, rowSpan),
			gridColumnStart: index,
			gridColumnEnd: index + colSpan
		},
		onFocus,
		onMouseDown,
		children: column.name
	});
}

//#endregion
//#region src/HeaderCell.tsx
const cellSortableClassname = "c6l2wv17-0-0-beta-56";
const cellResizable = "c1kqdw7y7-0-0-beta-56";
const cellResizableClassname = `rdg-cell-resizable ${cellResizable}`;
const resizeHandleClassname = "r1y6ywlx7-0-0-beta-56";
const cellDraggableClassname = "rdg-cell-draggable";
const cellDragging = "c1bezg5o7-0-0-beta-56";
const cellDraggingClassname = `rdg-cell-dragging ${cellDragging}`;
const cellOver = "c1vc96037-0-0-beta-56";
const cellOverClassname = `rdg-cell-drag-over ${cellOver}`;
const dragImageClassname = "d8rwc9w7-0-0-beta-56";
function HeaderCell({ column, colSpan, rowIdx, isCellSelected, onColumnResize, onColumnResizeEnd, onColumnsReorder, sortColumns, onSortColumnsChange, selectCell, shouldFocusGrid, direction, draggedColumnKey, setDraggedColumnKey }) {
	const [isOver, setIsOver] = useState(false);
	const dragImageRef = useRef(null);
	const isDragging = draggedColumnKey === column.key;
	const rowSpan = getHeaderCellRowSpan(column, rowIdx);
	const { tabIndex, childTabIndex, onFocus } = useRovingTabIndex(shouldFocusGrid || isCellSelected);
	const sortIndex = sortColumns?.findIndex((sort) => sort.columnKey === column.key);
	const sortColumn = sortIndex !== void 0 && sortIndex > -1 ? sortColumns[sortIndex] : void 0;
	const sortDirection = sortColumn?.direction;
	const priority = sortColumn !== void 0 && sortColumns.length > 1 ? sortIndex + 1 : void 0;
	const ariaSort = sortDirection && !priority ? sortDirection === "ASC" ? "ascending" : "descending" : void 0;
	const { sortable, resizable, draggable } = column;
	const className = getCellClassname(column, column.headerCellClass, {
		[cellSortableClassname]: sortable,
		[cellResizableClassname]: resizable,
		[cellDraggableClassname]: draggable,
		[cellDraggingClassname]: isDragging,
		[cellOverClassname]: isOver
	});
	function onSort(ctrlClick) {
		if (onSortColumnsChange == null) return;
		const { sortDescendingFirst } = column;
		if (sortColumn === void 0) {
			const nextSort = {
				columnKey: column.key,
				direction: sortDescendingFirst ? "DESC" : "ASC"
			};
			onSortColumnsChange(sortColumns && ctrlClick ? [...sortColumns, nextSort] : [nextSort]);
		} else {
			let nextSortColumn;
			if (sortDescendingFirst === true && sortDirection === "DESC" || sortDescendingFirst !== true && sortDirection === "ASC") nextSortColumn = {
				columnKey: column.key,
				direction: sortDirection === "ASC" ? "DESC" : "ASC"
			};
			if (ctrlClick) {
				const nextSortColumns = [...sortColumns];
				if (nextSortColumn) nextSortColumns[sortIndex] = nextSortColumn;
				else nextSortColumns.splice(sortIndex, 1);
				onSortColumnsChange(nextSortColumns);
			} else onSortColumnsChange(nextSortColumn ? [nextSortColumn] : []);
		}
	}
	function handleFocus(event) {
		onFocus?.(event);
		if (shouldFocusGrid) selectCell({
			idx: 0,
			rowIdx
		});
	}
	function onMouseDown() {
		selectCell({
			idx: column.idx,
			rowIdx
		});
	}
	function onClick(event) {
		if (sortable) onSort(event.ctrlKey || event.metaKey);
	}
	function onKeyDown(event) {
		const { key } = event;
		if (sortable && (key === " " || key === "Enter")) {
			event.preventDefault();
			onSort(event.ctrlKey || event.metaKey);
		} else if (resizable && isCtrlKeyHeldDown(event) && (key === "ArrowLeft" || key === "ArrowRight")) {
			event.stopPropagation();
			const { width } = event.currentTarget.getBoundingClientRect();
			const { leftKey } = getLeftRightKey(direction);
			const offset = key === leftKey ? -10 : 10;
			const newWidth = clampColumnWidth(width + offset, column);
			if (newWidth !== width) onColumnResize(column, newWidth);
		}
	}
	function onDragStart(event) {
		flushSync(() => {
			setDraggedColumnKey(column.key);
		});
		event.dataTransfer.setDragImage(dragImageRef.current, 0, 0);
		event.dataTransfer.dropEffect = "move";
	}
	function onDragEnd() {
		setDraggedColumnKey(void 0);
	}
	function onDragOver(event) {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}
	function onDrop(event) {
		setIsOver(false);
		event.preventDefault();
		onColumnsReorder?.(draggedColumnKey, column.key);
	}
	function onDragEnter(event) {
		if (isEventPertinent(event)) setIsOver(true);
	}
	function onDragLeave(event) {
		if (isEventPertinent(event)) setIsOver(false);
	}
	let dragTargetProps;
	let dropTargetProps;
	if (draggable) {
		dragTargetProps = {
			draggable: true,
			onDragStart,
			onDragEnd
		};
		if (draggedColumnKey !== void 0 && draggedColumnKey !== column.key) dropTargetProps = {
			onDragOver,
			onDragEnter,
			onDragLeave,
			onDrop
		};
	}
	const style = {
		...getHeaderCellStyle(column, rowIdx, rowSpan),
		...getCellStyle(column, colSpan)
	};
	const content = column.renderHeaderCell({
		column,
		sortDirection,
		priority,
		tabIndex: childTabIndex
	});
	return /* @__PURE__ */ jsxs(Fragment, { children: [isDragging && /* @__PURE__ */ jsx("div", {
		ref: dragImageRef,
		style,
		className: getCellClassname(column, column.headerCellClass, dragImageClassname),
		children: content
	}), /* @__PURE__ */ jsxs("div", {
		role: "columnheader",
		"aria-colindex": column.idx + 1,
		"aria-colspan": colSpan,
		"aria-rowspan": rowSpan,
		"aria-selected": isCellSelected,
		"aria-sort": ariaSort,
		tabIndex,
		className,
		style,
		onMouseDown,
		onFocus: handleFocus,
		onClick,
		onKeyDown,
		...dragTargetProps,
		...dropTargetProps,
		children: [content, resizable && /* @__PURE__ */ jsx(ResizeHandle, {
			direction,
			column,
			onColumnResize,
			onColumnResizeEnd
		})]
	})] });
}
function ResizeHandle({ direction, column, onColumnResize, onColumnResizeEnd }) {
	const resizingOffsetRef = useRef(void 0);
	const isRtl = direction === "rtl";
	function onPointerDown(event) {
		if (event.pointerType === "mouse" && event.buttons !== 1) return;
		event.preventDefault();
		const { currentTarget, pointerId } = event;
		currentTarget.setPointerCapture(pointerId);
		const headerCell = currentTarget.parentElement;
		const { right, left } = headerCell.getBoundingClientRect();
		resizingOffsetRef.current = isRtl ? event.clientX - left : right - event.clientX;
	}
	function onPointerMove(event) {
		const offset = resizingOffsetRef.current;
		if (offset === void 0) return;
		const { width, right, left } = event.currentTarget.parentElement.getBoundingClientRect();
		let newWidth = isRtl ? right + offset - event.clientX : event.clientX + offset - left;
		newWidth = clampColumnWidth(newWidth, column);
		if (width > 0 && newWidth !== width) onColumnResize(column, newWidth);
	}
	function onLostPointerCapture() {
		onColumnResizeEnd();
		resizingOffsetRef.current = void 0;
	}
	function onDoubleClick() {
		onColumnResize(column, "max-content");
	}
	return /* @__PURE__ */ jsx("div", {
		className: resizeHandleClassname,
		onClick: stopPropagation,
		onPointerDown,
		onPointerMove,
		onLostPointerCapture,
		onDoubleClick
	});
}
function isEventPertinent(event) {
	const relatedTarget = event.relatedTarget;
	return !event.currentTarget.contains(relatedTarget);
}

//#endregion
//#region src/style/row.ts
const row = "r1upfr807-0-0-beta-56";
const rowClassname = `rdg-row ${row}`;
const rowSelected = "r190mhd37-0-0-beta-56";
const rowSelectedClassname = "rdg-row-selected";
const rowSelectedWithFrozenCell = "r139qu9m7-0-0-beta-56";
const topSummaryRowClassname = "rdg-top-summary-row";
const bottomSummaryRowClassname = "rdg-bottom-summary-row";

//#endregion
//#region src/HeaderRow.tsx
const headerRow = "h10tskcx7-0-0-beta-56";
const headerRowClassname = `rdg-header-row ${headerRow}`;
function HeaderRow({ headerRowClass, rowIdx, columns, onColumnResize, onColumnResizeEnd, onColumnsReorder, sortColumns, onSortColumnsChange, lastFrozenColumnIndex, selectedCellIdx, selectCell, shouldFocusGrid, direction }) {
	const [draggedColumnKey, setDraggedColumnKey] = useState();
	const cells = [];
	for (let index = 0; index < columns.length; index++) {
		const column = columns[index];
		const colSpan = getColSpan(column, lastFrozenColumnIndex, { type: "HEADER" });
		if (colSpan !== void 0) index += colSpan - 1;
		cells.push(/* @__PURE__ */ jsx(HeaderCell, {
			column,
			colSpan,
			rowIdx,
			isCellSelected: selectedCellIdx === column.idx,
			onColumnResize,
			onColumnResizeEnd,
			onColumnsReorder,
			onSortColumnsChange,
			sortColumns,
			selectCell,
			shouldFocusGrid: shouldFocusGrid && index === 0,
			direction,
			draggedColumnKey,
			setDraggedColumnKey
		}, column.key));
	}
	return /* @__PURE__ */ jsx("div", {
		role: "row",
		"aria-rowindex": rowIdx,
		className: clsx(headerRowClassname, { [rowSelectedClassname]: selectedCellIdx === -1 }, headerRowClass),
		children: cells
	});
}
var HeaderRow_default = memo(HeaderRow);

//#endregion
//#region src/GroupedColumnHeaderRow.tsx
function GroupedColumnHeaderRow({ rowIdx, level, columns, selectedCellIdx, selectCell }) {
	const cells = [];
	const renderedParents = /* @__PURE__ */ new Set();
	for (const column of columns) {
		let { parent } = column;
		if (parent === void 0) continue;
		while (parent.level > level) {
			if (parent.parent === void 0) break;
			parent = parent.parent;
		}
		if (parent.level === level && !renderedParents.has(parent)) {
			renderedParents.add(parent);
			const { idx } = parent;
			cells.push(/* @__PURE__ */ jsx(GroupedColumnHeaderCell, {
				column: parent,
				rowIdx,
				isCellSelected: selectedCellIdx === idx,
				selectCell
			}, idx));
		}
	}
	return /* @__PURE__ */ jsx("div", {
		role: "row",
		"aria-rowindex": rowIdx,
		className: headerRowClassname,
		children: cells
	});
}
var GroupedColumnHeaderRow_default = memo(GroupedColumnHeaderRow);

//#endregion
//#region src/Row.tsx
function Row({ className, rowIdx, gridRowStart, selectedCellIdx, selectedCellsRange, isRowSelectionDisabled, isRowSelected, draggedOverCellIdx, lastFrozenColumnIndex, row: row$1, viewportColumns, selectedCellEditor, onCellMouseDown, onCellMouseUp, onCellMouseEnter, onCellClick, onCellDoubleClick, onCellContextMenu, rowClass, onRowChange, selectCell, style, rangeSelectionMode,...props }) {
	const renderCell = useDefaultRenderers().renderCell;
	const handleRowChange = useLatestFunc((column, newRow) => {
		onRowChange(column, rowIdx, newRow);
	});
	className = clsx(rowClassname, `rdg-row-${rowIdx % 2 === 0 ? "even" : "odd"}`, { [rowSelectedClassname]: selectedCellIdx === -1 }, rowClass?.(row$1, rowIdx), className);
	const cells = [];
	for (let index = 0; index < viewportColumns.length; index++) {
		const column = viewportColumns[index];
		const { idx } = column;
		const colSpan = getColSpan(column, lastFrozenColumnIndex, {
			type: "ROW",
			row: row$1
		});
		if (colSpan !== void 0) index += colSpan - 1;
		const isCellSelected = selectedCellIdx === idx || rangeSelectionMode && isValueInBetween(idx, selectedCellsRange?.startIdx, selectedCellsRange?.endIdx);
		if (isCellSelected && selectedCellEditor) cells.push(selectedCellEditor);
		else cells.push(renderCell(column.key, {
			column,
			colSpan,
			row: row$1,
			rowIdx,
			isDraggedOver: draggedOverCellIdx === idx,
			isCellSelected,
			onCellMouseDown,
			onCellClick,
			onCellDoubleClick,
			onCellContextMenu,
			onRowChange: handleRowChange,
			onMouseDownCapture: onCellMouseDown,
			onMouseUpCapture: onCellMouseUp,
			onMouseEnter: onCellMouseEnter,
			selectCell,
			rangeSelectionMode
		}));
	}
	const selectionValue = useMemo(() => ({
		isRowSelected,
		isRowSelectionDisabled
	}), [isRowSelectionDisabled, isRowSelected]);
	return /* @__PURE__ */ jsx(RowSelectionContext, {
		value: selectionValue,
		children: /* @__PURE__ */ jsx("div", {
			role: "row",
			className,
			style: {
				...getRowStyle(gridRowStart),
				...style
			},
			...props,
			children: cells
		})
	});
}
const RowComponent = memo(Row);
var Row_default = RowComponent;
function defaultRenderRow(key, props) {
	return /* @__PURE__ */ jsx(RowComponent, { ...props }, key);
}

//#endregion
//#region src/ScrollToCell.tsx
function ScrollToCell({ scrollToPosition: { idx, rowIdx }, gridRef, setScrollToCellPosition }) {
	const ref = useRef(null);
	useLayoutEffect(() => {
		scrollIntoView(ref.current, "auto");
	});
	useLayoutEffect(() => {
		function removeScrollToCell() {
			setScrollToCellPosition(null);
		}
		const observer = new IntersectionObserver(removeScrollToCell, {
			root: gridRef.current,
			threshold: 1
		});
		observer.observe(ref.current);
		return () => {
			observer.disconnect();
		};
	}, [gridRef, setScrollToCellPosition]);
	return /* @__PURE__ */ jsx("div", {
		ref,
		style: {
			gridColumn: idx === void 0 ? "1/-1" : idx + 1,
			gridRow: rowIdx === void 0 ? "1/-1" : rowIdx + 2
		}
	});
}

//#endregion
//#region src/sortStatus.tsx
const arrow = "a3ejtar7-0-0-beta-56";
const arrowClassname = `rdg-sort-arrow ${arrow}`;
function renderSortStatus({ sortDirection, priority }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [renderSortIcon({ sortDirection }), renderSortPriority({ priority })] });
}
function renderSortIcon({ sortDirection }) {
	if (sortDirection === void 0) return null;
	return /* @__PURE__ */ jsx("svg", {
		viewBox: "0 0 12 8",
		width: "12",
		height: "8",
		className: arrowClassname,
		"aria-hidden": true,
		children: /* @__PURE__ */ jsx("path", { d: sortDirection === "ASC" ? "M0 8 6 0 12 8" : "M0 0 6 8 12 0" })
	});
}
function renderSortPriority({ priority }) {
	return priority;
}

//#endregion
//#region src/style/core.ts
const root = "rnvodz57-0-0-beta-56";
const rootClassname = `rdg ${root}`;
const viewportDragging = "vlqv91k7-0-0-beta-56";
const viewportDraggingClassname = `rdg-viewport-dragging ${viewportDragging}`;
const focusSinkClassname = "f1lsfrzw7-0-0-beta-56";
const focusSinkHeaderAndSummaryClassname = "f1cte0lg7-0-0-beta-56";

//#endregion
//#region src/SummaryCell.tsx
const summaryCellClassname = "s8wc6fl7-0-0-beta-56";
function SummaryCell({ column, colSpan, row: row$1, rowIdx, isCellSelected, selectCell }) {
	const { tabIndex, childTabIndex, onFocus } = useRovingTabIndex(isCellSelected);
	const { summaryCellClass } = column;
	const className = getCellClassname(column, summaryCellClassname, typeof summaryCellClass === "function" ? summaryCellClass(row$1) : summaryCellClass);
	function onMouseDown() {
		selectCell({
			rowIdx,
			idx: column.idx
		});
	}
	return /* @__PURE__ */ jsx("div", {
		role: "gridcell",
		"aria-colindex": column.idx + 1,
		"aria-colspan": colSpan,
		"aria-selected": isCellSelected,
		tabIndex,
		className,
		style: getCellStyle(column, colSpan),
		onMouseDown,
		onFocus,
		children: column.renderSummaryCell?.({
			column,
			row: row$1,
			tabIndex: childTabIndex
		})
	});
}
var SummaryCell_default = memo(SummaryCell);

//#endregion
//#region src/SummaryRow.tsx
const summaryRow = "skuhp557-0-0-beta-56";
const topSummaryRow = "tf8l5ub7-0-0-beta-56";
const summaryRowClassname = `rdg-summary-row ${summaryRow}`;
function SummaryRow({ rowIdx, gridRowStart, row: row$1, viewportColumns, top, bottom, lastFrozenColumnIndex, selectedCellIdx, isTop, selectCell, "aria-rowindex": ariaRowIndex }) {
	const cells = [];
	for (let index = 0; index < viewportColumns.length; index++) {
		const column = viewportColumns[index];
		const colSpan = getColSpan(column, lastFrozenColumnIndex, {
			type: "SUMMARY",
			row: row$1
		});
		if (colSpan !== void 0) index += colSpan - 1;
		const isCellSelected = selectedCellIdx === column.idx;
		cells.push(/* @__PURE__ */ jsx(SummaryCell_default, {
			column,
			colSpan,
			row: row$1,
			rowIdx,
			isCellSelected,
			selectCell
		}, column.key));
	}
	return /* @__PURE__ */ jsx("div", {
		role: "row",
		"aria-rowindex": ariaRowIndex,
		className: clsx(rowClassname, `rdg-row-${rowIdx % 2 === 0 ? "even" : "odd"}`, summaryRowClassname, {
			[rowSelectedClassname]: selectedCellIdx === -1,
			[`${topSummaryRowClassname} ${topSummaryRow}`]: isTop,
			[bottomSummaryRowClassname]: !isTop
		}),
		style: {
			...getRowStyle(gridRowStart),
			"--rdg-summary-row-top": top !== void 0 ? `${top}px` : void 0,
			"--rdg-summary-row-bottom": bottom !== void 0 ? `${bottom}px` : void 0
		},
		children: cells
	});
}
var SummaryRow_default = memo(SummaryRow);

//#endregion
//#region src/DataGrid.tsx
const initialSelectedRange = {
	startRowIdx: -1,
	startColumnIdx: -1,
	endRowIdx: -1,
	endColumnIdx: -1
};
/**
* Main API Component to render a data grid of rows and columns
*
* @example
*
* <DataGrid columns={columns} rows={rows} />
*/
function DataGrid(props) {
	const { ref, columns: rawColumns, rows, topSummaryRows, bottomSummaryRows, rowKeyGetter, onRowsChange, rowHeight: rawRowHeight, headerRowHeight: rawHeaderRowHeight, summaryRowHeight: rawSummaryRowHeight, columnWidths: columnWidthsRaw, onColumnWidthsChange: onColumnWidthsChangeRaw, selectedRows, isRowSelectionDisabled, onSelectedRowsChange, sortColumns, onSortColumnsChange, defaultColumnOptions, onCellMouseDown, onCellClick, onCellDoubleClick, onCellContextMenu, onCellKeyDown, onSelectedCellChange, onScroll, onColumnResize, onColumnsReorder, onFill, onCellCopy, onCellCut, onCellPaste, onMultiPaste, onMultiCopy, onMultiCut, enableVirtualization: rawEnableVirtualization, enableRangeSelection: rawEnableRangeSelection, renderers, className, style, rowClass, headerRowClass, direction: rawDirection, role: rawRole, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, "aria-description": ariaDescription, "aria-describedby": ariaDescribedBy, "aria-rowcount": rawAriaRowCount, "data-testid": testId, "data-cy": dataCy } = props;
	/**
	* defaults
	*/
	const defaultRenderers = useDefaultRenderers();
	const role = rawRole ?? "grid";
	const rowHeight = rawRowHeight ?? 35;
	const headerRowHeight = rawHeaderRowHeight ?? (typeof rowHeight === "number" ? rowHeight : 35);
	const summaryRowHeight = rawSummaryRowHeight ?? (typeof rowHeight === "number" ? rowHeight : 35);
	const renderRow = renderers?.renderRow ?? defaultRenderers?.renderRow ?? defaultRenderRow;
	const renderCell = renderers?.renderCell ?? defaultRenderers?.renderCell ?? defaultRenderCell;
	const renderSortStatus$1 = renderers?.renderSortStatus ?? defaultRenderers?.renderSortStatus ?? renderSortStatus;
	const renderCheckbox$1 = renderers?.renderCheckbox ?? defaultRenderers?.renderCheckbox ?? renderCheckbox;
	const noRowsFallback = renderers?.noRowsFallback ?? defaultRenderers?.noRowsFallback;
	const enableVirtualization = rawEnableVirtualization ?? true;
	const enableRangeSelection = rawEnableRangeSelection ?? false;
	const direction = rawDirection ?? "ltr";
	/**
	* states
	*/
	const [scrollTop, setScrollTop] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const [columnWidthsInternal, setColumnWidthsInternal] = useState(() => columnWidthsRaw ?? /* @__PURE__ */ new Map());
	const [isColumnResizing, setColumnResizing] = useState(false);
	const [isDragging, setDragging] = useState(false);
	const [draggedOverRowIdx, setDraggedOverRowIdx] = useState(void 0);
	const [scrollToPosition, setScrollToPosition] = useState(null);
	const [shouldFocusCell, setShouldFocusCell] = useState(false);
	const [previousRowIdx, setPreviousRowIdx] = useState(-1);
	const isColumnWidthsControlled = columnWidthsRaw != null && onColumnWidthsChangeRaw != null && !isColumnResizing;
	const columnWidths = isColumnWidthsControlled ? columnWidthsRaw : columnWidthsInternal;
	const onColumnWidthsChange = isColumnWidthsControlled ? (columnWidths$1) => {
		setColumnWidthsInternal(columnWidths$1);
		onColumnWidthsChangeRaw(columnWidths$1);
	} : setColumnWidthsInternal;
	const getColumnWidth = useCallback((column) => {
		return columnWidths.get(column.key)?.width ?? column.width;
	}, [columnWidths]);
	const [gridRef, gridWidth, gridHeight, horizontalScrollbarHeight] = useGridDimensions();
	const { columns, colSpanColumns, lastFrozenColumnIndex, headerRowsCount, colOverscanStartIdx, colOverscanEndIdx, templateColumns, layoutCssVars, totalFrozenColumnWidth } = useCalculatedColumns({
		rawColumns,
		defaultColumnOptions,
		getColumnWidth,
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
	const [selectedPosition, setSelectedPosition] = useState(() => ({
		idx: -1,
		rowIdx: minRowIdx - 1,
		mode: "SELECT"
	}));
	const [selectedRange, setSelectedRange] = useState(initialSelectedRange);
	const [copiedRange, setCopiedRange] = useState(null);
	const [isMouseRangeSelectionMode, setIsMouseRangeSelectionMode] = useState(false);
	/**
	* refs
	*/
	const focusSinkRef = useRef(null);
	/**
	* computed values
	*/
	const isTreeGrid = role === "treegrid";
	const headerRowsHeight = headerRowsCount * headerRowHeight;
	const summaryRowsHeight = summaryRowsCount * summaryRowHeight;
	const clientHeight = gridHeight - headerRowsHeight - summaryRowsHeight;
	const isSelectable = selectedRows != null && onSelectedRowsChange != null;
	const { leftKey, rightKey } = getLeftRightKey(direction);
	const ariaRowCount = rawAriaRowCount ?? headerRowsCount + rows.length + summaryRowsCount;
	const defaultGridComponents = useMemo(() => ({
		renderCheckbox: renderCheckbox$1,
		renderSortStatus: renderSortStatus$1,
		renderCell
	}), [
		renderCheckbox$1,
		renderSortStatus$1,
		renderCell
	]);
	const headerSelectionValue = useMemo(() => {
		let hasSelectedRow = false;
		let hasUnselectedRow = false;
		if (rowKeyGetter != null && selectedRows != null && selectedRows.size > 0) for (const row$1 of rows) {
			if (selectedRows.has(rowKeyGetter(row$1))) hasSelectedRow = true;
			else hasUnselectedRow = true;
			if (hasSelectedRow && hasUnselectedRow) break;
		}
		return {
			isRowSelected: hasSelectedRow && !hasUnselectedRow,
			isIndeterminate: hasSelectedRow && hasUnselectedRow
		};
	}, [
		rows,
		selectedRows,
		rowKeyGetter
	]);
	const { rowOverscanStartIdx, rowOverscanEndIdx, totalRowHeight, gridTemplateRows, getRowTop, getRowHeight, findRowIdx } = useViewportRows({
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
	const { gridTemplateColumns, handleColumnResize } = useColumnWidths(columns, viewportColumns, templateColumns, gridRef, gridWidth, columnWidths, onColumnWidthsChange, onColumnResize, setColumnResizing);
	const minColIdx = isTreeGrid ? -1 : 0;
	const maxColIdx = columns.length - 1;
	const selectedCellIsWithinSelectionBounds = isCellWithinSelectionBounds(selectedPosition);
	const selectedCellIsWithinViewportBounds = isCellWithinViewportBounds(selectedPosition);
	const scrollHeight = headerRowHeight + totalRowHeight + summaryRowsHeight + horizontalScrollbarHeight;
	/**
	* The identity of the wrapper function is stable so it won't break memoization
	*/
	const handleColumnResizeLatest = useLatestFunc(handleColumnResize);
	const handleColumnResizeEndLatest = useLatestFunc(handleColumnResizeEnd);
	const onColumnsReorderLastest = useLatestFunc(onColumnsReorder);
	const onSortColumnsChangeLatest = useLatestFunc(onSortColumnsChange);
	const onCellMouseDownLatest = useLatestFunc(onCellMouseDown);
	const onCellClickLatest = useLatestFunc(onCellClick);
	const onCellDoubleClickLatest = useLatestFunc(onCellDoubleClick);
	const onCellContextMenuLatest = useLatestFunc(onCellContextMenu);
	const selectHeaderRowLatest = useLatestFunc(selectHeaderRow);
	const selectRowLatest = useLatestFunc(selectRow);
	const handleFormatterRowChangeLatest = useLatestFunc(updateRow);
	const selectCellLatest = useLatestFunc(selectCell);
	const selectHeaderCellLatest = useLatestFunc(selectHeaderCell);
	/**
	* callbacks
	*/
	const focusCell = useCallback((shouldScroll = true) => {
		const cell$1 = getCellToScroll(gridRef.current);
		if (cell$1 === null) return;
		if (shouldScroll) scrollIntoView(cell$1);
		cell$1.focus({ preventScroll: true });
	}, [gridRef]);
	/**
	* effects
	*/
	useLayoutEffect(() => {
		if (shouldFocusCell) {
			if (focusSinkRef.current !== null && selectedPosition.idx === -1) {
				focusSinkRef.current.focus({ preventScroll: true });
				scrollIntoView(focusSinkRef.current);
			} else focusCell();
			setShouldFocusCell(false);
		}
	}, [
		shouldFocusCell,
		focusCell,
		selectedPosition.idx
	]);
	useImperativeHandle(ref, () => ({
		element: gridRef.current,
		scrollToCell({ idx, rowIdx }) {
			const scrollToIdx = idx !== void 0 && idx > lastFrozenColumnIndex && idx < columns.length ? idx : void 0;
			const scrollToRowIdx = rowIdx !== void 0 && isRowIdxWithinViewportBounds(rowIdx) ? rowIdx : void 0;
			if (scrollToIdx !== void 0 || scrollToRowIdx !== void 0) setScrollToPosition({
				idx: scrollToIdx,
				rowIdx: scrollToRowIdx
			});
		},
		selectCell,
		selectedRange
	}));
	/**
	* event handlers
	*/
	function selectHeaderRow(args) {
		if (!onSelectedRowsChange) return;
		assertIsValidKeyGetter(rowKeyGetter);
		const newSelectedRows = new Set(selectedRows);
		for (const row$1 of rows) {
			if (isRowSelectionDisabled?.(row$1) === true) continue;
			const rowKey = rowKeyGetter(row$1);
			if (args.checked) newSelectedRows.add(rowKey);
			else newSelectedRows.delete(rowKey);
		}
		onSelectedRowsChange(newSelectedRows);
	}
	function selectRow(args) {
		if (!onSelectedRowsChange) return;
		assertIsValidKeyGetter(rowKeyGetter);
		const { row: row$1, checked, isShiftClick } = args;
		if (isRowSelectionDisabled?.(row$1) === true) return;
		const newSelectedRows = new Set(selectedRows);
		const rowKey = rowKeyGetter(row$1);
		const rowIdx = rows.indexOf(row$1);
		setPreviousRowIdx(rowIdx);
		if (checked) newSelectedRows.add(rowKey);
		else newSelectedRows.delete(rowKey);
		if (isShiftClick && previousRowIdx !== -1 && previousRowIdx !== rowIdx && previousRowIdx < rows.length) {
			const step = sign(rowIdx - previousRowIdx);
			for (let i = previousRowIdx + step; i !== rowIdx; i += step) {
				const row$2 = rows[i];
				if (isRowSelectionDisabled?.(row$2) === true) continue;
				if (checked) newSelectedRows.add(rowKeyGetter(row$2));
				else newSelectedRows.delete(rowKeyGetter(row$2));
			}
		}
		onSelectedRowsChange(newSelectedRows);
	}
	function handleKeyDown(event) {
		const { idx, rowIdx, mode } = selectedPosition;
		if (mode === "EDIT") return;
		if (onCellKeyDown && isRowIdxWithinViewportBounds(rowIdx)) {
			const row$1 = rows[rowIdx];
			const cellEvent = createCellEvent(event);
			onCellKeyDown({
				mode: "SELECT",
				row: row$1,
				column: columns[idx],
				rowIdx,
				selectCell
			}, cellEvent);
			if (cellEvent.isGridDefaultPrevented()) return;
		}
		if (!(event.target instanceof Element)) return;
		const isCellEvent = event.target.closest(".rdg-cell") !== null;
		const isRowEvent = isTreeGrid && event.target === focusSinkRef.current;
		if (!isCellEvent && !isRowEvent) return;
		if (event.shiftKey) switch (event.key) {
			case "ArrowUp":
				if (selectedRange.startRowIdx > 0) setSelectedRange({
					...selectedRange,
					startRowIdx: selectedRange.startRowIdx - 1
				});
				break;
			case "ArrowDown":
				if (selectedRange.endRowIdx < rows.length - 1) setSelectedRange({
					...selectedRange,
					endRowIdx: selectedRange.endRowIdx + 1
				});
				break;
			case "ArrowRight":
				if (selectedRange.endColumnIdx < columns.length - 1) setSelectedRange({
					...selectedRange,
					endColumnIdx: selectedRange.endColumnIdx + 1
				});
				break;
			case "ArrowLeft":
				if (selectedRange.startColumnIdx > 0) setSelectedRange({
					...selectedRange,
					startColumnIdx: selectedRange.startColumnIdx - 1
				});
				break;
			default: break;
		}
		else switch (event.key) {
			case "ArrowUp":
			case "ArrowDown":
			case "ArrowLeft":
			case "ArrowRight":
			case "Tab":
			case "Home":
			case "End":
			case "PageUp":
			case "PageDown":
				navigate(event);
				break;
			default:
				handleCellInput(event);
				break;
		}
	}
	function handleScroll(event) {
		const { scrollTop: scrollTop$1, scrollLeft: scrollLeft$1 } = event.currentTarget;
		flushSync(() => {
			setScrollTop(scrollTop$1);
			setScrollLeft(abs(scrollLeft$1));
		});
		onScroll?.(event);
	}
	function updateRow(column, rowIdx, row$1) {
		if (typeof onRowsChange !== "function") return;
		if (row$1 === rows[rowIdx]) return;
		const updatedRows = rows.with(rowIdx, row$1);
		onRowsChange(updatedRows, {
			indexes: [rowIdx],
			column
		});
	}
	function commitEditorChanges() {
		if (selectedPosition.mode !== "EDIT") return;
		updateRow(columns[selectedPosition.idx], selectedPosition.rowIdx, selectedPosition.row);
	}
	function handleCellCopy(event) {
		if (!selectedCellIsWithinViewportBounds) return;
		if (enableRangeSelection) {
			setCopiedRange(selectedRange);
			const sourceRows = rows.slice(selectedRange.startRowIdx, selectedRange.endRowIdx + 1);
			const sourceColumnKeys = columns.slice(selectedRange.startColumnIdx, selectedRange.endColumnIdx + 1).map((c) => c.key);
			onMultiCopy?.({
				cellsRange: selectedRange,
				sourceRows,
				sourceColumnKeys
			}, event);
		} else {
			const { idx, rowIdx } = selectedPosition;
			onCellCopy?.({
				row: rows[rowIdx],
				column: columns[idx]
			}, event);
		}
	}
	function handleCellCut(event) {
		if (!selectedCellIsWithinViewportBounds) return;
		if (enableRangeSelection) {
			if (!onMultiCut) return;
			setCopiedRange(selectedRange);
			const sourceRows = rows.slice(selectedRange.startRowIdx, selectedRange.endRowIdx + 1);
			const sourceColumnKeys = columns.slice(selectedRange.startColumnIdx, selectedRange.endColumnIdx + 1).map((c) => c.key);
			onMultiCut?.({
				cellsRange: selectedRange,
				sourceRows,
				sourceColumnKeys
			}, event);
		} else {
			const { idx, rowIdx } = selectedPosition;
			onCellCut?.({
				row: rows[rowIdx],
				column: columns[idx]
			}, event);
		}
	}
	function handleCellPaste(event) {
		if (!onRowsChange) return;
		if (enableRangeSelection) {
			if (!onMultiPaste) return;
			const updatedRows = onMultiPaste({
				copiedRange,
				targetRange: selectedRange
			}, event);
			onRowsChange(updatedRows, {
				indexes: [],
				column: {}
			});
		} else {
			if (!onCellPaste) return;
			const { idx, rowIdx } = selectedPosition;
			const column = columns[idx];
			const updatedRow = onCellPaste({
				row: rows[rowIdx],
				column
			}, event);
			updateRow(column, rowIdx, updatedRow);
		}
	}
	function handleCellInput(event) {
		if (!selectedCellIsWithinViewportBounds) return;
		const row$1 = rows[selectedPosition.rowIdx];
		const { key, shiftKey } = event;
		if (isSelectable && shiftKey && key === " ") {
			assertIsValidKeyGetter(rowKeyGetter);
			const rowKey = rowKeyGetter(row$1);
			selectRow({
				row: row$1,
				checked: !selectedRows.has(rowKey),
				isShiftClick: false
			});
			event.preventDefault();
			return;
		}
		if (isCellEditable(selectedPosition) && isDefaultCellInput(event, onCellPaste != null)) setSelectedPosition(({ idx, rowIdx }) => ({
			idx,
			rowIdx,
			mode: "EDIT",
			row: row$1,
			originalRow: row$1
		}));
	}
	function handleColumnResizeEnd() {
		if (isColumnResizing) {
			onColumnWidthsChangeRaw?.(columnWidths);
			setColumnResizing(false);
		}
	}
	function handleDragHandlePointerDown(event) {
		event.preventDefault();
		if (event.pointerType === "mouse" && event.buttons !== 1) return;
		setDragging(true);
		event.currentTarget.setPointerCapture(event.pointerId);
	}
	function handleDragHandlePointerMove(event) {
		const gridEl = gridRef.current;
		const headerAndTopSummaryRowsHeight = headerRowsHeight + topSummaryRowsCount * summaryRowHeight;
		const offset = scrollTop - headerAndTopSummaryRowsHeight + event.clientY - gridEl.getBoundingClientRect().top;
		const overRowIdx = findRowIdx(offset);
		setDraggedOverRowIdx(overRowIdx);
		const ariaRowIndex = headerAndTopSummaryRowsCount + overRowIdx + 1;
		const el = gridEl.querySelector(`:scope > [aria-rowindex="${ariaRowIndex}"] > [aria-colindex="${selectedPosition.idx + 1}"]`);
		scrollIntoView(el);
	}
	function handleDragHandleLostPointerCapture() {
		setDragging(false);
		if (draggedOverRowIdx === void 0) return;
		const { rowIdx } = selectedPosition;
		const [startRowIndex, endRowIndex] = rowIdx < draggedOverRowIdx ? [rowIdx + 1, draggedOverRowIdx + 1] : [draggedOverRowIdx, rowIdx];
		updateRows(startRowIndex, endRowIndex);
		setDraggedOverRowIdx(void 0);
	}
	function handleDragHandleClick() {
		focusCell(false);
	}
	function handleDragHandleDoubleClick(event) {
		event.stopPropagation();
		updateRows(selectedPosition.rowIdx + 1, rows.length);
	}
	function updateRows(startRowIdx, endRowIdx) {
		if (onRowsChange == null) return;
		const { rowIdx, idx } = selectedPosition;
		const column = columns[idx];
		const sourceRow = rows[rowIdx];
		const updatedRows = [...rows];
		const indexes = [];
		for (let i = startRowIdx; i < endRowIdx; i++) if (isCellEditable({
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
		if (indexes.length > 0) onRowsChange(updatedRows, {
			indexes,
			column
		});
	}
	/**
	* utils
	*/
	function isColIdxWithinSelectionBounds(idx) {
		return idx >= minColIdx && idx <= maxColIdx;
	}
	function isRowIdxWithinViewportBounds(rowIdx) {
		return rowIdx >= 0 && rowIdx < rows.length;
	}
	function isCellWithinSelectionBounds({ idx, rowIdx }) {
		return rowIdx >= minRowIdx && rowIdx <= maxRowIdx && isColIdxWithinSelectionBounds(idx);
	}
	function isCellWithinEditBounds({ idx, rowIdx }) {
		return isRowIdxWithinViewportBounds(rowIdx) && idx >= 0 && idx <= maxColIdx;
	}
	function isCellWithinViewportBounds({ idx, rowIdx }) {
		return isRowIdxWithinViewportBounds(rowIdx) && isColIdxWithinSelectionBounds(idx);
	}
	function isCellEditable(position) {
		return isCellWithinEditBounds(position) && isSelectedCellEditable({
			columns,
			rows,
			selectedPosition: position
		});
	}
	function selectCell(position, options) {
		if (!isCellWithinSelectionBounds(position)) return;
		commitEditorChanges();
		const samePosition = isSamePosition(selectedPosition, position);
		if (options?.enableEditor && isCellEditable(position)) {
			const row$1 = rows[position.rowIdx];
			setSelectedPosition({
				...position,
				mode: "EDIT",
				row: row$1,
				originalRow: row$1
			});
		} else if (samePosition) scrollIntoView(getCellToScroll(gridRef.current));
		else {
			setShouldFocusCell(options?.shouldFocusCell === true);
			setSelectedPosition({
				...position,
				mode: "SELECT"
			});
			setSelectedRange({
				startColumnIdx: position.idx,
				startRowIdx: position.rowIdx,
				endColumnIdx: position.idx,
				endRowIdx: position.rowIdx
			});
		}
		if (onSelectedCellChange && !samePosition) onSelectedCellChange({
			rowIdx: position.rowIdx,
			row: isRowIdxWithinViewportBounds(position.rowIdx) ? rows[position.rowIdx] : void 0,
			column: columns[position.idx]
		});
	}
	function selectHeaderCell({ idx, rowIdx }) {
		selectCell({
			rowIdx: minRowIdx + rowIdx - 1,
			idx
		});
	}
	function getNextPosition(key, ctrlKey, shiftKey) {
		const { idx, rowIdx } = selectedPosition;
		const isRowSelected = selectedCellIsWithinSelectionBounds && idx === -1;
		switch (key) {
			case "ArrowUp": return {
				idx,
				rowIdx: rowIdx - 1
			};
			case "ArrowDown": return {
				idx,
				rowIdx: rowIdx + 1
			};
			case leftKey: return {
				idx: idx - 1,
				rowIdx
			};
			case rightKey: return {
				idx: idx + 1,
				rowIdx
			};
			case "Tab": return {
				idx: idx + (shiftKey ? -1 : 1),
				rowIdx
			};
			case "Home":
				if (isRowSelected) return {
					idx,
					rowIdx: minRowIdx
				};
				return {
					idx: 0,
					rowIdx: ctrlKey ? minRowIdx : rowIdx
				};
			case "End":
				if (isRowSelected) return {
					idx,
					rowIdx: maxRowIdx
				};
				return {
					idx: maxColIdx,
					rowIdx: ctrlKey ? maxRowIdx : rowIdx
				};
			case "PageUp": {
				if (selectedPosition.rowIdx === minRowIdx) return selectedPosition;
				const nextRowY = getRowTop(rowIdx) + getRowHeight(rowIdx) - clientHeight;
				return {
					idx,
					rowIdx: nextRowY > 0 ? findRowIdx(nextRowY) : 0
				};
			}
			case "PageDown": {
				if (selectedPosition.rowIdx >= rows.length) return selectedPosition;
				const nextRowY = getRowTop(rowIdx) + clientHeight;
				return {
					idx,
					rowIdx: nextRowY < totalRowHeight ? findRowIdx(nextRowY) : rows.length - 1
				};
			}
			default: return selectedPosition;
		}
	}
	function navigate(event) {
		const { key, shiftKey } = event;
		let cellNavigationMode = "NONE";
		if (key === "Tab") {
			if (canExitGrid({
				shiftKey,
				maxColIdx,
				minRowIdx,
				maxRowIdx,
				selectedPosition
			})) {
				commitEditorChanges();
				return;
			}
			cellNavigationMode = "CHANGE_ROW";
		}
		event.preventDefault();
		const ctrlKey = isCtrlKeyHeldDown(event);
		const nextPosition = getNextPosition(key, ctrlKey, shiftKey);
		if (isSamePosition(selectedPosition, nextPosition)) return;
		const nextSelectedCellPosition = getNextSelectedCellPosition({
			moveUp: key === "ArrowUp",
			moveNext: key === rightKey || key === "Tab" && !shiftKey,
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
		selectCell(nextSelectedCellPosition, { shouldFocusCell: true });
	}
	function getDraggedOverCellIdx(currentRowIdx) {
		if (draggedOverRowIdx === void 0) return;
		const { rowIdx } = selectedPosition;
		const isDraggedOver = rowIdx < draggedOverRowIdx ? rowIdx < currentRowIdx && currentRowIdx <= draggedOverRowIdx : rowIdx > currentRowIdx && currentRowIdx >= draggedOverRowIdx;
		return isDraggedOver ? selectedPosition.idx : void 0;
	}
	function getDragHandle() {
		if (onFill == null || selectedPosition.mode === "EDIT" || !isCellWithinViewportBounds(selectedPosition)) return;
		const { idx, rowIdx } = selectedPosition;
		const column = columns[idx];
		if (column.renderEditCell == null || column.editable === false) return;
		const isLastRow = rowIdx === maxRowIdx;
		const columnWidth = getColumnWidth(column);
		const colSpan = column.colSpan?.({
			type: "ROW",
			row: rows[rowIdx]
		}) ?? 1;
		const { insetInlineStart,...style$1 } = getCellStyle(column, colSpan);
		const marginEnd = "calc(var(--rdg-drag-handle-size) * -0.5 + 1px)";
		const isLastColumn = column.idx + colSpan - 1 === maxColIdx;
		const dragHandleStyle = {
			...style$1,
			gridRowStart: headerAndTopSummaryRowsCount + rowIdx + 1,
			marginInlineEnd: isLastColumn ? void 0 : marginEnd,
			marginBlockEnd: isLastRow ? void 0 : marginEnd,
			insetInlineStart: insetInlineStart ? `calc(${insetInlineStart} + ${columnWidth}px + var(--rdg-drag-handle-size) * -0.5 - 1px)` : void 0
		};
		return /* @__PURE__ */ jsx("div", {
			style: dragHandleStyle,
			className: clsx(cellDragHandleClassname, column.frozen && cellDragHandleFrozenClassname),
			onPointerDown: handleDragHandlePointerDown,
			onPointerMove: isDragging ? handleDragHandlePointerMove : void 0,
			onLostPointerCapture: isDragging ? handleDragHandleLostPointerCapture : void 0,
			onClick: handleDragHandleClick,
			onDoubleClick: handleDragHandleDoubleClick
		});
	}
	function getCellEditor(rowIdx) {
		if (selectedPosition.rowIdx !== rowIdx || selectedPosition.mode === "SELECT") return;
		if (selectedRange.endRowIdx - selectedRange.startRowIdx > 0 || selectedRange.endColumnIdx - selectedRange.startColumnIdx > 0) {
			setShouldFocusCell(true);
			setSelectedPosition(({ idx: idx$1, rowIdx: rowIdx$1 }) => ({
				idx: idx$1,
				rowIdx: rowIdx$1,
				mode: "SELECT"
			}));
			return;
		}
		const { idx, row: row$1 } = selectedPosition;
		const column = columns[idx];
		const colSpan = getColSpan(column, lastFrozenColumnIndex, {
			type: "ROW",
			row: row$1
		});
		const closeOnExternalRowChange = column.editorOptions?.closeOnExternalRowChange ?? true;
		const closeEditor = (shouldFocusCell$1) => {
			setShouldFocusCell(true);
			setSelectedPosition(({ idx: idx$1, rowIdx: rowIdx$1 }) => ({
				idx: idx$1,
				rowIdx: rowIdx$1,
				mode: "SELECT"
			}));
		};
		const onRowChange = (row$2, commitChanges, shouldFocusCell$1) => {
			setShouldFocusCell(true);
			if (commitChanges) flushSync(() => {
				updateRow(column, selectedPosition.rowIdx, row$2);
				closeEditor(shouldFocusCell$1);
			});
			else setSelectedPosition((position) => ({
				...position,
				row: row$2
			}));
		};
		if (closeOnExternalRowChange && rows[selectedPosition.rowIdx] !== selectedPosition.originalRow) closeEditor(false);
		return /* @__PURE__ */ jsx(EditCell, {
			column,
			colSpan,
			row: row$1,
			rowIdx,
			onRowChange,
			closeEditor,
			onKeyDown: onCellKeyDown,
			navigate
		}, column.key);
	}
	function getRowViewportColumns(rowIdx) {
		const selectedColumn = selectedPosition.idx === -1 ? void 0 : columns[selectedPosition.idx];
		if (selectedColumn !== void 0 && selectedPosition.rowIdx === rowIdx && !viewportColumns.includes(selectedColumn)) return selectedPosition.idx > colOverscanEndIdx ? [...viewportColumns, selectedColumn] : [
			...viewportColumns.slice(0, lastFrozenColumnIndex + 1),
			selectedColumn,
			...viewportColumns.slice(lastFrozenColumnIndex + 1)
		];
		return viewportColumns;
	}
	function getViewportRows() {
		const rowElements = [];
		const { idx: selectedIdx, rowIdx: selectedRowIdx } = selectedPosition;
		const startRowIdx = selectedCellIsWithinViewportBounds && selectedRowIdx < rowOverscanStartIdx ? rowOverscanStartIdx - 1 : rowOverscanStartIdx;
		const endRowIdx = selectedCellIsWithinViewportBounds && selectedRowIdx > rowOverscanEndIdx ? rowOverscanEndIdx + 1 : rowOverscanEndIdx;
		for (let viewportRowIdx = startRowIdx; viewportRowIdx <= endRowIdx; viewportRowIdx++) {
			const isRowOutsideViewport = viewportRowIdx === rowOverscanStartIdx - 1 || viewportRowIdx === rowOverscanEndIdx + 1;
			const rowIdx = isRowOutsideViewport ? selectedRowIdx : viewportRowIdx;
			let rowColumns = viewportColumns;
			const selectedColumn = selectedIdx === -1 ? void 0 : columns[selectedIdx];
			if (selectedColumn !== void 0) if (isRowOutsideViewport) rowColumns = [selectedColumn];
			else rowColumns = getRowViewportColumns(rowIdx);
			const row$1 = rows[rowIdx];
			const gridRowStart = headerAndTopSummaryRowsCount + rowIdx + 1;
			let key = rowIdx;
			let isRowSelected = false;
			if (typeof rowKeyGetter === "function") {
				key = rowKeyGetter(row$1);
				isRowSelected = selectedRows?.has(key) ?? false;
			}
			rowElements.push(renderRow(key, {
				"aria-rowindex": headerAndTopSummaryRowsCount + rowIdx + 1,
				"aria-selected": isSelectable ? isRowSelected : void 0,
				rowIdx,
				row: row$1,
				viewportColumns: rowColumns,
				isRowSelectionDisabled: isRowSelectionDisabled?.(row$1) ?? false,
				isRowSelected,
				onCellMouseDown: onCellMouseDownLatest,
				onCellClick: onCellClickLatest,
				onCellDoubleClick: onCellDoubleClickLatest,
				onCellContextMenu: onCellContextMenuLatest,
				rowClass,
				gridRowStart,
				selectedCellIdx: selectedRowIdx === rowIdx ? selectedIdx : void 0,
				selectedCellsRange: enableRangeSelection && isValueInBetween(rowIdx, selectedRange?.startRowIdx, selectedRange?.endRowIdx) ? {
					startIdx: selectedRange.startColumnIdx,
					endIdx: selectedRange.endColumnIdx
				} : {
					startIdx: -1,
					endIdx: -1
				},
				draggedOverCellIdx: getDraggedOverCellIdx(rowIdx),
				lastFrozenColumnIndex,
				onRowChange: handleFormatterRowChangeLatest,
				selectCell: selectCellLatest,
				rangeSelectionMode: enableRangeSelection,
				selectedCellEditor: getCellEditor(rowIdx),
				onCellMouseDown: () => setIsMouseRangeSelectionMode(true),
				onCellMouseUp: () => {
					setIsMouseRangeSelectionMode(false);
					setSelectedRange((boundValue) => ({
						startColumnIdx: Math.min(boundValue.startColumnIdx, boundValue.endColumnIdx),
						endColumnIdx: Math.max(boundValue.startColumnIdx, boundValue.endColumnIdx),
						startRowIdx: Math.min(boundValue.startRowIdx, boundValue.endRowIdx),
						endRowIdx: Math.max(boundValue.startRowIdx, boundValue.endRowIdx)
					}));
				},
				onCellMouseEnter: ({ rowIdx: rowIdx$1, column }) => {
					if (isMouseRangeSelectionMode && enableRangeSelection) setSelectedRange({
						...selectedRange,
						endRowIdx: rowIdx$1,
						endColumnIdx: column.idx
					});
				}
			}));
		}
		return rowElements;
	}
	if (selectedPosition.idx > maxColIdx || selectedPosition.rowIdx > maxRowIdx) {
		setSelectedPosition({
			idx: -1,
			rowIdx: minRowIdx - 1,
			mode: "SELECT"
		});
		setDraggedOverRowIdx(void 0);
	}
	if (isColumnWidthsControlled && columnWidthsInternal !== columnWidthsRaw) setColumnWidthsInternal(columnWidthsRaw);
	let templateRows = `repeat(${headerRowsCount}, ${headerRowHeight}px)`;
	if (topSummaryRowsCount > 0) templateRows += ` repeat(${topSummaryRowsCount}, ${summaryRowHeight}px)`;
	if (rows.length > 0) templateRows += gridTemplateRows;
	if (bottomSummaryRowsCount > 0) templateRows += ` repeat(${bottomSummaryRowsCount}, ${summaryRowHeight}px)`;
	const isGroupRowFocused = selectedPosition.idx === -1 && selectedPosition.rowIdx !== minRowIdx - 1;
	return /* @__PURE__ */ jsxs("div", {
		role,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledBy,
		"aria-description": ariaDescription,
		"aria-describedby": ariaDescribedBy,
		"aria-multiselectable": isSelectable ? true : void 0,
		"aria-colcount": columns.length,
		"aria-rowcount": ariaRowCount,
		tabIndex: -1,
		className: clsx(rootClassname, { [viewportDraggingClassname]: isDragging }, className),
		style: {
			...style,
			scrollPaddingInlineStart: selectedPosition.idx > lastFrozenColumnIndex || scrollToPosition?.idx !== void 0 ? `${totalFrozenColumnWidth}px` : void 0,
			scrollPaddingBlock: isRowIdxWithinViewportBounds(selectedPosition.rowIdx) || scrollToPosition?.rowIdx !== void 0 ? `${headerRowsHeight + topSummaryRowsCount * summaryRowHeight}px ${bottomSummaryRowsCount * summaryRowHeight}px` : void 0,
			gridTemplateColumns,
			gridTemplateRows: templateRows,
			"--rdg-header-row-height": `${headerRowHeight}px`,
			"--rdg-scroll-height": `${scrollHeight}px`,
			...layoutCssVars
		},
		dir: direction,
		ref: gridRef,
		onScroll: handleScroll,
		onKeyDown: handleKeyDown,
		onCut: handleCellCut,
		onCopy: handleCellCopy,
		onPaste: handleCellPaste,
		"data-testid": testId,
		"data-cy": dataCy,
		children: [
			/* @__PURE__ */ jsxs(DataGridDefaultRenderersContext, {
				value: defaultGridComponents,
				children: [/* @__PURE__ */ jsx(HeaderRowSelectionChangeContext, {
					value: selectHeaderRowLatest,
					children: /* @__PURE__ */ jsxs(HeaderRowSelectionContext, {
						value: headerSelectionValue,
						children: [Array.from({ length: groupedColumnHeaderRowsCount }, (_, index) => /* @__PURE__ */ jsx(GroupedColumnHeaderRow_default, {
							rowIdx: index + 1,
							level: -groupedColumnHeaderRowsCount + index,
							columns: getRowViewportColumns(minRowIdx + index),
							selectedCellIdx: selectedPosition.rowIdx === minRowIdx + index ? selectedPosition.idx : void 0,
							selectCell: selectHeaderCellLatest
						}, index)), /* @__PURE__ */ jsx(HeaderRow_default, {
							headerRowClass,
							rowIdx: headerRowsCount,
							columns: getRowViewportColumns(mainHeaderRowIdx),
							onColumnResize: handleColumnResizeLatest,
							onColumnResizeEnd: handleColumnResizeEndLatest,
							onColumnsReorder: onColumnsReorderLastest,
							sortColumns,
							onSortColumnsChange: onSortColumnsChangeLatest,
							lastFrozenColumnIndex,
							selectedCellIdx: selectedPosition.rowIdx === mainHeaderRowIdx ? selectedPosition.idx : void 0,
							selectCell: selectHeaderCellLatest,
							shouldFocusGrid: !selectedCellIsWithinSelectionBounds,
							direction
						})]
					})
				}), rows.length === 0 && noRowsFallback ? noRowsFallback : /* @__PURE__ */ jsxs(Fragment, { children: [
					topSummaryRows?.map((row$1, rowIdx) => {
						const gridRowStart = headerRowsCount + 1 + rowIdx;
						const summaryRowIdx = mainHeaderRowIdx + 1 + rowIdx;
						const isSummaryRowSelected = selectedPosition.rowIdx === summaryRowIdx;
						const top = headerRowsHeight + summaryRowHeight * rowIdx;
						return /* @__PURE__ */ jsx(SummaryRow_default, {
							"aria-rowindex": gridRowStart,
							rowIdx: summaryRowIdx,
							gridRowStart,
							row: row$1,
							top,
							bottom: void 0,
							viewportColumns: getRowViewportColumns(summaryRowIdx),
							lastFrozenColumnIndex,
							selectedCellIdx: isSummaryRowSelected ? selectedPosition.idx : void 0,
							isTop: true,
							selectCell: selectCellLatest
						}, rowIdx);
					}),
					/* @__PURE__ */ jsx(RowSelectionChangeContext, {
						value: selectRowLatest,
						children: getViewportRows()
					}),
					bottomSummaryRows?.map((row$1, rowIdx) => {
						const gridRowStart = headerAndTopSummaryRowsCount + rows.length + rowIdx + 1;
						const summaryRowIdx = rows.length + rowIdx;
						const isSummaryRowSelected = selectedPosition.rowIdx === summaryRowIdx;
						const top = clientHeight > totalRowHeight ? gridHeight - summaryRowHeight * (bottomSummaryRows.length - rowIdx) : void 0;
						const bottom = top === void 0 ? summaryRowHeight * (bottomSummaryRows.length - 1 - rowIdx) : void 0;
						return /* @__PURE__ */ jsx(SummaryRow_default, {
							"aria-rowindex": ariaRowCount - bottomSummaryRowsCount + rowIdx + 1,
							rowIdx: summaryRowIdx,
							gridRowStart,
							row: row$1,
							top,
							bottom,
							viewportColumns: getRowViewportColumns(summaryRowIdx),
							lastFrozenColumnIndex,
							selectedCellIdx: isSummaryRowSelected ? selectedPosition.idx : void 0,
							isTop: false,
							selectCell: selectCellLatest
						}, rowIdx);
					})
				] })]
			}),
			getDragHandle(),
			renderMeasuringCells(viewportColumns),
			isTreeGrid && /* @__PURE__ */ jsx("div", {
				ref: focusSinkRef,
				tabIndex: isGroupRowFocused ? 0 : -1,
				className: clsx(focusSinkClassname, {
					[focusSinkHeaderAndSummaryClassname]: !isRowIdxWithinViewportBounds(selectedPosition.rowIdx),
					[rowSelected]: isGroupRowFocused,
					[rowSelectedWithFrozenCell]: isGroupRowFocused && lastFrozenColumnIndex !== -1
				}),
				style: { gridRowStart: selectedPosition.rowIdx + headerAndTopSummaryRowsCount + 1 }
			}),
			scrollToPosition !== null && /* @__PURE__ */ jsx(ScrollToCell, {
				scrollToPosition,
				setScrollToCellPosition: setScrollToPosition,
				gridRef
			})
		]
	});
}
function getCellToScroll(gridEl) {
	return gridEl.querySelector(":scope > [role=\"row\"] > [tabindex=\"0\"]");
}
function isSamePosition(p1, p2) {
	return p1.idx === p2.idx && p1.rowIdx === p2.rowIdx;
}

//#endregion
//#region src/GroupCell.tsx
function GroupCell({ id, groupKey, childRows, isExpanded, isCellSelected, column, row: row$1, groupColumnIndex, isGroupByColumn, toggleGroup: toggleGroupWrapper }) {
	const { tabIndex, childTabIndex, onFocus } = useRovingTabIndex(isCellSelected);
	function toggleGroup() {
		toggleGroupWrapper(id);
	}
	const isLevelMatching = isGroupByColumn && groupColumnIndex === column.idx;
	return /* @__PURE__ */ jsx("div", {
		role: "gridcell",
		"aria-colindex": column.idx + 1,
		"aria-selected": isCellSelected,
		tabIndex,
		className: getCellClassname(column),
		style: {
			...getCellStyle(column),
			cursor: isLevelMatching ? "pointer" : "default"
		},
		onMouseDown: (event) => {
			event.preventDefault();
		},
		onClick: isLevelMatching ? toggleGroup : void 0,
		onFocus,
		children: (!isGroupByColumn || isLevelMatching) && column.renderGroupCell?.({
			groupKey,
			childRows,
			column,
			row: row$1,
			isExpanded,
			tabIndex: childTabIndex,
			toggleGroup
		})
	}, column.key);
}
var GroupCell_default = memo(GroupCell);

//#endregion
//#region src/GroupRow.tsx
const groupRow = "g1yxluv37-0-0-beta-56";
const groupRowClassname = `rdg-group-row ${groupRow}`;
function GroupedRow({ className, row: row$1, rowIdx, viewportColumns, selectedCellIdx, isRowSelected, selectCell, gridRowStart, groupBy, toggleGroup, isRowSelectionDisabled,...props }) {
	const idx = viewportColumns[0].key === SELECT_COLUMN_KEY ? row$1.level + 1 : row$1.level;
	function handleSelectGroup() {
		selectCell({
			rowIdx,
			idx: -1
		}, { shouldFocusCell: true });
	}
	const selectionValue = useMemo(() => ({
		isRowSelectionDisabled: false,
		isRowSelected
	}), [isRowSelected]);
	return /* @__PURE__ */ jsx(RowSelectionContext, {
		value: selectionValue,
		children: /* @__PURE__ */ jsx("div", {
			role: "row",
			"aria-level": row$1.level + 1,
			"aria-setsize": row$1.setSize,
			"aria-posinset": row$1.posInSet + 1,
			"aria-expanded": row$1.isExpanded,
			className: clsx(rowClassname, groupRowClassname, `rdg-row-${rowIdx % 2 === 0 ? "even" : "odd"}`, selectedCellIdx === -1 && rowSelectedClassname, className),
			onMouseDown: handleSelectGroup,
			style: getRowStyle(gridRowStart),
			...props,
			children: viewportColumns.map((column) => /* @__PURE__ */ jsx(GroupCell_default, {
				id: row$1.id,
				groupKey: row$1.groupKey,
				childRows: row$1.childRows,
				isExpanded: row$1.isExpanded,
				isCellSelected: selectedCellIdx === column.idx,
				column,
				row: row$1,
				groupColumnIndex: idx,
				toggleGroup,
				isGroupByColumn: groupBy.includes(column.key)
			}, column.key))
		})
	});
}
var GroupRow_default = memo(GroupedRow);

//#endregion
//#region src/TreeDataGrid.tsx
function TreeDataGrid({ columns: rawColumns, rows: rawRows, rowHeight: rawRowHeight, rowKeyGetter: rawRowKeyGetter, onCellKeyDown: rawOnCellKeyDown, onCellCopy: rawOnCellCopy, onCellPaste: rawOnCellPaste, onRowsChange, selectedRows: rawSelectedRows, onSelectedRowsChange: rawOnSelectedRowsChange, renderers, groupBy: rawGroupBy, rowGrouper, expandedGroupIds, onExpandedGroupIdsChange, groupIdGetter: rawGroupIdGetter,...props }) {
	const defaultRenderers = useDefaultRenderers();
	const rawRenderRow = renderers?.renderRow ?? defaultRenderers?.renderRow ?? defaultRenderRow;
	const headerAndTopSummaryRowsCount = 1 + (props.topSummaryRows?.length ?? 0);
	const { leftKey, rightKey } = getLeftRightKey(props.direction);
	const toggleGroupLatest = useLatestFunc(toggleGroup);
	const groupIdGetter = rawGroupIdGetter ?? defaultGroupIdGetter;
	const { columns, groupBy } = useMemo(() => {
		const columns$1 = rawColumns.toSorted(({ key: aKey }, { key: bKey }) => {
			if (aKey === SELECT_COLUMN_KEY) return -1;
			if (bKey === SELECT_COLUMN_KEY) return 1;
			if (rawGroupBy.includes(aKey)) {
				if (rawGroupBy.includes(bKey)) return rawGroupBy.indexOf(aKey) - rawGroupBy.indexOf(bKey);
				return -1;
			}
			if (rawGroupBy.includes(bKey)) return 1;
			return 0;
		});
		const groupBy$1 = [];
		for (const [index, column] of columns$1.entries()) if (rawGroupBy.includes(column.key)) {
			groupBy$1.push(column.key);
			columns$1[index] = {
				...column,
				frozen: true,
				renderCell: () => null,
				renderGroupCell: column.renderGroupCell ?? renderToggleGroup,
				editable: false
			};
		}
		return {
			columns: columns$1,
			groupBy: groupBy$1
		};
	}, [rawColumns, rawGroupBy]);
	const [groupedRows, rowsCount] = useMemo(() => {
		if (groupBy.length === 0) return [void 0, rawRows.length];
		const groupRows = (rows$1, [groupByKey, ...remainingGroupByKeys], startRowIndex) => {
			let groupRowsCount = 0;
			const groups = {};
			for (const [key, childRows] of Object.entries(rowGrouper(rows$1, groupByKey))) {
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
	}, [
		groupBy,
		rowGrouper,
		rawRows
	]);
	const [rows, isGroupRow] = useMemo(() => {
		const allGroupRows = /* @__PURE__ */ new Set();
		if (!groupedRows) return [rawRows, isGroupRow$1];
		const flattenedRows = [];
		const expandGroup = (rows$1, parentId, level) => {
			if (isReadonlyArray(rows$1)) {
				flattenedRows.push(...rows$1);
				return;
			}
			Object.keys(rows$1).forEach((groupKey, posInSet, keys) => {
				const id = groupIdGetter(groupKey, parentId);
				const isExpanded = expandedGroupIds.has(id);
				const { childRows, childGroups, startRowIndex } = rows$1[groupKey];
				const groupRow$1 = {
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
				flattenedRows.push(groupRow$1);
				allGroupRows.add(groupRow$1);
				if (isExpanded) expandGroup(childGroups, id, level + 1);
			});
		};
		expandGroup(groupedRows, void 0, 0);
		return [flattenedRows, isGroupRow$1];
		function isGroupRow$1(row$1) {
			return allGroupRows.has(row$1);
		}
	}, [
		expandedGroupIds,
		groupedRows,
		rawRows,
		groupIdGetter
	]);
	const rowHeight = useMemo(() => {
		if (typeof rawRowHeight === "function") return (row$1) => {
			if (isGroupRow(row$1)) return rawRowHeight({
				type: "GROUP",
				row: row$1
			});
			return rawRowHeight({
				type: "ROW",
				row: row$1
			});
		};
		return rawRowHeight;
	}, [isGroupRow, rawRowHeight]);
	const getParentRowAndIndex = useCallback((row$1) => {
		const rowIdx = rows.indexOf(row$1);
		for (let i = rowIdx - 1; i >= 0; i--) {
			const parentRow = rows[i];
			if (isGroupRow(parentRow) && (!isGroupRow(row$1) || row$1.parentId === parentRow.id)) return [parentRow, i];
		}
		return void 0;
	}, [isGroupRow, rows]);
	const rowKeyGetter = useCallback((row$1) => {
		if (isGroupRow(row$1)) return row$1.id;
		if (typeof rawRowKeyGetter === "function") return rawRowKeyGetter(row$1);
		const parentRowAndIndex = getParentRowAndIndex(row$1);
		if (parentRowAndIndex !== void 0) {
			const { startRowIndex, childRows } = parentRowAndIndex[0];
			const groupIndex = childRows.indexOf(row$1);
			return startRowIndex + groupIndex + 1;
		}
		return rows.indexOf(row$1);
	}, [
		getParentRowAndIndex,
		isGroupRow,
		rawRowKeyGetter,
		rows
	]);
	const selectedRows = useMemo(() => {
		if (rawSelectedRows == null) return null;
		assertIsValidKeyGetter(rawRowKeyGetter);
		const selectedRows$1 = new Set(rawSelectedRows);
		for (const row$1 of rows) if (isGroupRow(row$1)) {
			const isGroupRowSelected = row$1.childRows.every((cr) => rawSelectedRows.has(rawRowKeyGetter(cr)));
			if (isGroupRowSelected) selectedRows$1.add(row$1.id);
		}
		return selectedRows$1;
	}, [
		isGroupRow,
		rawRowKeyGetter,
		rawSelectedRows,
		rows
	]);
	function onSelectedRowsChange(newSelectedRows) {
		if (!rawOnSelectedRowsChange) return;
		assertIsValidKeyGetter(rawRowKeyGetter);
		const newRawSelectedRows = new Set(rawSelectedRows);
		for (const row$1 of rows) {
			const key = rowKeyGetter(row$1);
			if (selectedRows?.has(key) && !newSelectedRows.has(key)) if (isGroupRow(row$1)) for (const cr of row$1.childRows) newRawSelectedRows.delete(rawRowKeyGetter(cr));
			else newRawSelectedRows.delete(key);
			else if (!selectedRows?.has(key) && newSelectedRows.has(key)) if (isGroupRow(row$1)) for (const cr of row$1.childRows) newRawSelectedRows.add(rawRowKeyGetter(cr));
			else newRawSelectedRows.add(key);
		}
		rawOnSelectedRowsChange(newRawSelectedRows);
	}
	function handleKeyDown(args, event) {
		rawOnCellKeyDown?.(args, event);
		if (event.isGridDefaultPrevented()) return;
		if (args.mode === "EDIT") return;
		const { column, rowIdx, selectCell } = args;
		const idx = column?.idx ?? -1;
		const row$1 = rows[rowIdx];
		if (!isGroupRow(row$1)) return;
		if (idx === -1 && (event.key === leftKey && row$1.isExpanded || event.key === rightKey && !row$1.isExpanded)) {
			event.preventDefault();
			event.preventGridDefault();
			toggleGroup(row$1.id);
		}
		if (idx === -1 && event.key === leftKey && !row$1.isExpanded && row$1.level !== 0) {
			const parentRowAndIndex = getParentRowAndIndex(row$1);
			if (parentRowAndIndex !== void 0) {
				event.preventGridDefault();
				selectCell({
					idx,
					rowIdx: parentRowAndIndex[1]
				});
			}
		}
	}
	function handleCellCopy({ row: row$1, column }, event) {
		if (!isGroupRow(row$1)) rawOnCellCopy?.({
			row: row$1,
			column
		}, event);
	}
	function handleCellPaste({ row: row$1, column }, event) {
		return isGroupRow(row$1) ? row$1 : rawOnCellPaste({
			row: row$1,
			column
		}, event);
	}
	function handleRowsChange(updatedRows, { indexes, column }) {
		if (!onRowsChange) return;
		const updatedRawRows = [...rawRows];
		const rawIndexes = [];
		for (const index of indexes) {
			const rawIndex = rawRows.indexOf(rows[index]);
			updatedRawRows[rawIndex] = updatedRows[index];
			rawIndexes.push(rawIndex);
		}
		onRowsChange(updatedRawRows, {
			indexes: rawIndexes,
			column
		});
	}
	function toggleGroup(groupId) {
		const newExpandedGroupIds = new Set(expandedGroupIds);
		if (newExpandedGroupIds.has(groupId)) newExpandedGroupIds.delete(groupId);
		else newExpandedGroupIds.add(groupId);
		onExpandedGroupIdsChange(newExpandedGroupIds);
	}
	function renderRow(key, { row: row$1, rowClass, onCellMouseDown, onCellClick, onCellDoubleClick, onCellContextMenu, onRowChange, lastFrozenColumnIndex, draggedOverCellIdx, selectedCellEditor,...rowProps }) {
		if (isGroupRow(row$1)) {
			const { startRowIndex } = row$1;
			return /* @__PURE__ */ jsx(GroupRow_default, {
				...rowProps,
				"aria-rowindex": headerAndTopSummaryRowsCount + startRowIndex + 1,
				row: row$1,
				groupBy,
				toggleGroup: toggleGroupLatest
			}, key);
		}
		let ariaRowIndex = rowProps["aria-rowindex"];
		const parentRowAndIndex = getParentRowAndIndex(row$1);
		if (parentRowAndIndex !== void 0) {
			const { startRowIndex, childRows } = parentRowAndIndex[0];
			const groupIndex = childRows.indexOf(row$1);
			ariaRowIndex = startRowIndex + headerAndTopSummaryRowsCount + groupIndex + 2;
		}
		return rawRenderRow(key, {
			...rowProps,
			"aria-rowindex": ariaRowIndex,
			row: row$1,
			rowClass,
			onCellMouseDown,
			onCellClick,
			onCellDoubleClick,
			onCellContextMenu,
			onRowChange,
			lastFrozenColumnIndex,
			draggedOverCellIdx,
			selectedCellEditor
		});
	}
	return /* @__PURE__ */ jsx(DataGrid, {
		...props,
		role: "treegrid",
		"aria-rowcount": rowsCount + 1 + (props.topSummaryRows?.length ?? 0) + (props.bottomSummaryRows?.length ?? 0),
		columns,
		rows,
		rowHeight,
		rowKeyGetter,
		onRowsChange: handleRowsChange,
		selectedRows,
		onSelectedRowsChange,
		onCellKeyDown: handleKeyDown,
		onCellCopy: handleCellCopy,
		onCellPaste: rawOnCellPaste ? handleCellPaste : void 0,
		renderers: {
			...renderers,
			renderRow
		}
	});
}
function defaultGroupIdGetter(groupKey, parentId) {
	return parentId !== void 0 ? `${parentId}__${groupKey}` : groupKey;
}
function isReadonlyArray(arr) {
	return Array.isArray(arr);
}

//#endregion
//#region src/editors/textEditor.tsx
const textEditorInternalClassname = "t7vyx3i7-0-0-beta-56";
const textEditorClassname = `rdg-text-editor ${textEditorInternalClassname}`;
function autoFocusAndSelect(input) {
	input?.focus();
	input?.select();
}
function textEditor({ row: row$1, column, onRowChange, onClose }) {
	return /* @__PURE__ */ jsx("input", {
		className: textEditorClassname,
		ref: autoFocusAndSelect,
		value: row$1[column.key],
		onChange: (event) => onRowChange({
			...row$1,
			[column.key]: event.target.value
		}),
		onBlur: () => onClose(true, false)
	});
}

//#endregion
export { Cell_default as Cell, DataGrid, DataGridDefaultRenderersContext, Row_default as Row, SELECT_COLUMN_KEY, SelectCellFormatter, SelectColumn, ToggleGroup, TreeDataGrid, renderCheckbox, renderHeaderCell, renderSortIcon, renderSortPriority, renderToggleGroup, renderValue, textEditor, useHeaderRowSelection, useRowSelection };
//# sourceMappingURL=index.js.map