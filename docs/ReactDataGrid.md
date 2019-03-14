Main API Component to render a data grid of rows and columns

Example code
-----

```javascript
<ReactDataGrid
  columns={columns}
  rowGetter={i => rows[i]}
  rowsCount={3} />
```

Props
-----

### `columns` (required)

An array of objects representing each column on the grid.
Can also be an ImmutableJS object

**type:** arrayOf 
  | Name | Type | Required | Description
  | --------- | ---- | ---- | ----------------------------------
  |name | node | true | The name of the column. By default it will be displayed in the header cell| 
key | string | true | A unique key to distinguish each column| 
width | number | false | Column width. If not specified, it will be determined automatically based on grid width and specified widths of other columns| 
filterable | bool | false | Enable filtering of a column| 
filterRenderer | node | false | Component to be used to filter the data of the column| 
resizable | bool | false | Enable resizing of a column| 
sortable | bool | false | Enable sorting of a column| 
sortDescendingFirst | bool | false | Sets the column sort order to be descending instead of ascending the first time the column is sorted| 
dragable | bool | false | Enable dragging of a column| 
editable | node | false | Enables cell editing. If set and no editor property specified, then a textinput will be used as the cell editor| 
editor | node | false | Editor to be rendered when cell of column is being edited. If set, then the column is automatically set to be editable| 
formatter | node | false | Formatter to be used to render the cell content| 
headerRenderer | node | false | Header renderer for each header cell| 
frozen | bool | false | Determines whether column is frozen or not| 
events | object | false | By adding an event object with callbacks for the native react events you can bind events to a specific column. That will not break the default behaviour of the grid and will run only for the specified column| 
 


### `rowGetter` (required)

A function called for each rendered row that should return a plain key/value pair object

**type:** func  


### `rowsCount` (required)

The number of rows to be rendered

**type:** number  


### `cellNavigationMode`

**type:** enum ('none'|'loopOverRow'|'changeRow') 

 **defaultValue:** `CellNavigationMode.NONE`


### `cellRangeSelection`

Object used to configure cell range selection

**type:** shape 
  | Name | Type | Required | Description
  | --------- | ---- | ---- | ----------------------------------
  |onStart | func | false | Function called whenever cell range selection begins| 
onUpdate | func | false | Function called whenever cell selection range is updated| 
onComplete | func | false | Function called whenever cell selection range has been completed| 
 


### `columnEquality`


 **defaultValue:** `ColumnMetrics.sameColumn`


### `contextMenu`

Component used to render a context menu. react-data-grid-addons provides a default context menu which may be used

**type:** element  


### `draggableHeaderCell`

Component used to render a draggable header cell

**type:** func  


### `enableCellAutoFocus`

Toggles whether cells should be autofocused

**type:** bool  

 **defaultValue:** `true`


### `enableCellSelect`

Used to toggle whether cells can be selected or not

**type:** bool  

 **defaultValue:** `false`


### `enableDragAndDrop`

Enables drag and drop on the grid

**type:** bool  


### `enableRowSelect`

Deprecated: Legacy prop to turn on row selection. Use rowSelection props instead

**type:** custom  

 **defaultValue:** `false`


### `getCellActions`

Function called on each cell render to render a list of actions for each cell

**type:** func  


### `getValidFilterValues`

**type:** func  


### `headerFiltersHeight`

The height of the header row in pixels

**type:** number  

 **defaultValue:** `45`


### `headerRowHeight`

The height of the header row in pixels

**type:** number  


### `minColumnWidth`

Minimum column width in pixels

**type:** number  

 **defaultValue:** `80`


### `minHeight`

The minimum height of the grid in pixels

**type:** number  

 **defaultValue:** `350`


### `minWidth`

The minimum width of the grid in pixels

**type:** number  


### `onAddFilter`

Callback

**type:** func  


### `onAddSubRow`

Called whenever a sub row is added to the grid

**type:** func  


### `onBeforeEdit`

Called just before a cell is about to be edited

**type:** func  

 **defaultValue:** `() => {}`


### `onCellCopyPaste`

Deprecated: Function called when grid is updated via a copy/paste. Use onGridRowsUpdated instead

**type:** custom  


### `onCellDeSelected`

Function called whenever a cell is deselected

**type:** func  


### `onCellExpand`

Function called whenever a cell has been expanded

**type:** func  


### `onCellSelected`

Function called whenever a cell is selected

**type:** func  


### `onCellsDragged`

Deprecated: Function called when grid is updated via a cell drag. Use onGridRowsUpdated instead

**type:** custom  


### `onCheckCellIsEditable`

called before cell is set active, returns a boolean to determine whether cell is editable

**type:** func  


### `onClearFilters`

Function called whenever filters are cleared

**type:** func  


### `onColumnResize`

Called when a column is resized

**type:** func  


### `onDeleteSubRow`

Called whenever a sub row is deleted from the grid

**type:** func  


### `onDragHandleDoubleClick`

Deprecated: Function called when grid is updated via double clicking the cell drag handle. Use onGridRowsUpdated instead

**type:** custom  


### `onFilter`

Callback whenever grid is filtered via FilterableHeaderCell

**type:** func  


### `onGridKeyDown`

Function called whenever keyboard key is pressed down

**type:** func  


### `onGridKeyUp`

Function called whenever keyboard key is pressed up

**type:** func  


### `onGridRowsUpdated`

Callback called whenever row data is updated
When editing is enabled, this callback will be called for the following scenarios
1. Using the supplied editor of the column. The default editor is the [SimpleTextEditor](https://github.com/adazzle/react-data-grid/blob/master/packages/common/editors/SimpleTextEditor.js).
2. Copy/pasting the value from one cell to another <kbd>CTRL</kbd>+<kbd>C</kbd>, <kbd>CTRL</kbd>+<kbd>V</kbd>
3. Update multiple cells by dragging the fill handle of a cell up or down to a destination cell.
4. Update all cells under a given cell by double clicking the cell's fill handle.

**type:** func  


### `onGridSort`

Function called whenever grid is sorted

**type:** func  


### `onRowClick`

Function called whenever row is clicked

**type:** func  


### `onRowDoubleClick`

Function called whenever row is double clicked

**type:** func  


### `onRowExpandToggle`

**type:** func  


### `onRowSelect`

Function called whenever row is selected

**type:** func  


### `onRowUpdated`

Deprecated: Function called when grid is updated via a cell commit. Use onGridRowsUpdated instead

**type:** custom  


### `onScroll`

Called when the grid is scrolled

**type:** func  


### `overScan`


 **defaultValue:** `{
  colsStart: 2,
  colsEnd: 2,
  rowsStart: 2,
  rowsEnd: 2
}`


### `rowActionsCell`

Component to render row actions cell when present

**type:** func  


### `rowGroupRenderer`

Function called whenever keyboard key is pressed down

**type:** func  


### `rowHeight`

The height of each row in pixels

**type:** number  

 **defaultValue:** `35`


### `rowKey`

The primary key property of each row

**type:** string  

 **defaultValue:** `'id'`


### `rowScrollTimeout`

Deprecated

**type:** custom  

 **defaultValue:** `0`


### `rowSelection`

**type:** shape 
  | Name | Type | Required | Description
  | --------- | ---- | ---- | ----------------------------------
  |enableShiftSelect | bool | false | undefined| 
onRowsSelected | func | false | Function called whenever rows are selected| 
onRowsDeselected | func | false | Function called whenever rows are deselected| 
showCheckbox | bool | false | toggle whether to show a checkbox in first column to select rows| 
selectBy | union | true | Method by which rows should be selected| 
 


### `scrollToRowIndex`

When set, grid will scroll to this row index

**type:** number  

 **defaultValue:** `0`


### `selectAllRenderer`

Component to render the UI in the header row for selecting all rows

**type:** object  


### `sortColumn`

The key of the column which is currently being sorted

**type:** string  


### `sortDirection`

The direction to sort the sortColumn

**type:** enum Object.keys(DEFINE_SORT) 


### `toolbar`

Component used to render toolbar above the grid

**type:** element  

