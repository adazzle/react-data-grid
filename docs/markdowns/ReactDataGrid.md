`ReactDataGrid` (component)
===========================



Props
-----

### `cellNavigationMode`

type: `enum('none'|'loopOverRow'|'changeRow')`
defaultValue: `CellNavigationMode.NONE`


### `cellRangeSelection`

type: `shape[object Object]`


### `columnEquality`

type: `func`
defaultValue: `ColumnMetrics.sameColumn`


### `columns` (required)

type: `union(object|array)`


### `contextMenu`

type: `element`


### `draggableHeaderCell`

type: `func`


### `enableCellAutoFocus`

type: `bool`
defaultValue: `true`


### `enableCellSelect`

type: `bool`
defaultValue: `false`


### `enableDragAndDrop`

type: `bool`


### `enableRowSelect`

type: `custom`
defaultValue: `false`


### `getCellActions`

type: `func`


### `getValidFilterValues`

type: `func`


### `headerFiltersHeight`

type: `number`
defaultValue: `45`


### `headerRowHeight`

type: `number`


### `minColumnWidth`

type: `number`
defaultValue: `80`


### `minHeight`

type: `number`
defaultValue: `350`


### `minWidth`

type: `number`


### `onAddFilter`

type: `func`


### `onAddSubRow`

type: `func`


### `onBeforeEdit`

type: `func`
defaultValue: `() => {}`


### `onCellCopyPaste`

type: `custom`


### `onCellDeSelected`

type: `func`


### `onCellExpand`

type: `func`


### `onCellSelected`

type: `func`


### `onCellsDragged`

type: `custom`


### `onCheckCellIsEditable`

type: `func`


### `onClearFilters`

type: `func`


### `onColumnResize`

type: `func`


### `onDeleteSubRow`

type: `func`


### `onDragHandleDoubleClick`

type: `custom`


### `onFilter`

type: `func`


### `onGridKeyDown`

type: `func`


### `onGridKeyUp`

type: `func`


### `onGridRowsUpdated`

type: `func`


### `onGridSort`

type: `func`


### `onRowClick`

type: `func`


### `onRowDoubleClick`

type: `func`


### `onRowExpandToggle`

type: `func`


### `onRowSelect`

type: `func`


### `onRowUpdated`

type: `custom`


### `onScroll`

type: `func`


### `overScan`

type: `object`
defaultValue: `{
  colsStart: 2,
  colsEnd: 2,
  rowsStart: 2,
  rowsEnd: 2
}`


### `rowActionsCell`

type: `func`


### `rowGetter` (required)

type: `func`


### `rowGroupRenderer`

type: `func`


### `rowHeight`

type: `number`
defaultValue: `35`


### `rowKey`

type: `string`
defaultValue: `'id'`


### `rowScrollTimeout`

type: `custom`
defaultValue: `0`


### `rowSelection`

type: `shape[object Object]`


### `rowsCount` (required)

type: `number`


### `scrollToRowIndex`

type: `number`
defaultValue: `0`


### `selectAllRenderer`

type: `object`


### `sortColumn`

type: `string`


### `sortDirection`

type: `enumObject.keys(DEFINE_SORT)`


### `toolbar`

type: `element`

