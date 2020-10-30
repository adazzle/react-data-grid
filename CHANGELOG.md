# Changelog

## `alpha` to `canary`
- **Added:**
  - **Props:**
    - `className`
    - `style`
    - `onRowsChange`
    - `onFill`
    - `onPaste`
    - `onSelectedCellChange`
      - ⚠️ This replaces the `onCellSelected` and `onCellDeSelected` props
    - `enableFilterRow`
      - ⚠️ This replaces the `enableHeaderFilters` and `column.filterable` props
    - `filters`
    - `onFiltersChange`
    - `rows`
      - ⚠️ This replace the `rowGetter` and `rowsCount` props
    - `rowClass`
    - `defaultColumnOptions`
      - ⚠️ This replaces the `minColumnWidth` and `defaultFormatter` props
    - `groupBy`
    - `rowGrouper`
      - More info in [#2106](https://github.com/adazzle/react-data-grid/pull/2106)
  - `column.cellClass(row)` function support:
    - `column = { ..., cellClass(row) { return string; } }`
  - `column.minWidth`
  - `column.maxWidth`
  - `column.headerCellClass`
  - `column.editor`
    - New API
  - `column.editorOptions`
    - More info in [#2102](https://github.com/adazzle/react-data-grid/pull/2102)
  - `column.groupFormatter`
    - More info in [#2106](https://github.com/adazzle/react-data-grid/pull/2106)
  - `scrollToRow` method
    - ⚠️ This replaces the `scrollToRowIndex` prop
  - Dark mode support
    - Dark mode is automatically applied following user preference
    - Light and dark modes can be forced by setting the `rdg-light` or `rdg-dark` class names.
- **Removed:**
  - **Support:**
    - ⚠️ IE11
  - **Packages:**
    - ⚠️ `react-data-grid-addons`
  - **Props:**
    - ⚠️ `width`
    - ⚠️ `height`
    - ⚠️ `cellContentRenderer`
    - ⚠️ `contextMenu`
      - Check the [Context Menu](https://adazzle.github.io/react-data-grid/canary/?path=/story/demos--context-menu) example
    - ⚠️ `enableCellSelect`
    - ⚠️ `enableCellAutoFocus`
    - ⚠️ `getValidFilterValues`
    - ⚠️ `onCellCopyPaste`
    - ⚠️ `onSelectedCellRangeChange`
    - ⚠️ `onCheckCellIsEditable`
      - Use `column.editable` instead.
    - ⚠️ `onGridKeyDown`
    - ⚠️ `onGridKeyUp`
    - ⚠️ `onRowDoubleClick`
    - ⚠️ `onRowsUpdate`
      - Use `onRowsChange`, `onFill`, and `onPaste` instead.
    - ⚠️ `onHeaderDrop`
    - ⚠️ `draggableHeaderCell`
      - Check [#2007](https://github.com/adazzle/react-data-grid/pull/2007) on how to migrate
    - ⚠️ `rowGroupRenderer`
    - ⚠️ `onRowExpandToggle`
      - Check [#2012](https://github.com/adazzle/react-data-grid/pull/2012) on how to migrate
    - ⚠️ `rowsContainer`
    - ⚠️ Subrow props: `getSubRowDetails`, `onCellExpand`, `onDeleteSubRow`, and `onAddSubRow`
      - Check [#1853](https://github.com/adazzle/react-data-grid/pull/1853) on how to migrate
    - ⚠️ `cellMetaData` (from `Row` and `Cell` props)
    - ⚠️ `value` (from `column.formatter` props)
  - **Ref handlers:**
    - ⚠️ `openCellEditor`, use `selectCell` instead.
  - ⚠️ React elements are no longer supported, please use components instead.
    - For example:
    ```diff
    const column = {
      key: 'example',
      name: 'Example',
    - formatter: <CustomFormatter length={5} />
    + formatter: (props) => <CustomFormatter {...props} length={5} />
    };
    ```
  - ⚠️ `column.events`
  - ⚠️ `column.getCellActions`
    - Check [#1845](https://github.com/adazzle/react-data-grid/pull/1845) on how to migrate
  - ⚠️ `column.getRowMetaData`
  - ⚠️ `column.minColumnWidth`
  - ⚠️ `column.filterable`
  - ⚠️ `column.draggable`
  - ⚠️ `cellRangeSelection.{onStart,onUpdate,onEnd}`
  - ⚠️ `fromRowId`, `toRowId`, and `fromRowData` from `onRowsUpdate` argument
  - ⚠️ Stopped exporting `HeaderCell`
- **Renamed:**
  - ⚠️ `minHeight` to `height`
  - ⚠️ `minWidth` to `width`
  - ⚠️ `onGridSort` to `onSort`
  - ⚠️ `emptyRowsView` to `emptyRowsRenderer`
  - ⚠️ `rowKey` to `rowKeyGetter`
  - ⚠️ `rowData` to `row`
  - ⚠️ `fromRowData` to `fromRow`
  - ⚠️ `idx` to `rowIdx` in `Row` renderer
- **Changed:**
  - ⚠️ Started publishing ES2019/ESM modules instead of ES5/CommonJS modules.
    - Using [`@babel/preset-env`](https://www.npmjs.com/package/@babel/preset-env) with [`core-js`](https://www.npmjs.com/package/core-js) is recommended to enable compatibility for the browsers your project aims to support.
  - ⚠️ Improved support for summary rows:
    - `summaryRows` types are now independent from `rows`
    - Added `column.summaryCellClass` and `column.summaryFormatter` props
    - `column.formatter` isn't used anymore to render summary row cells.
  - Only visible headers cells are now rendered. [#1837](https://github.com/adazzle/react-data-grid/pull/1837)
  - ⚠️ the `rowKeyGetter` prop is now required for row selection.
  - ⚠️ `column.cellClass` does not affect header cells anymore.
  - ⚠️ `onScroll` will directly pass the UIEvent rather than the scrollLeft and scrollRight only.

## `master` to `alpha`
- **Added:**
  - TypeScript declaration files
  - `column.cellContentRenderer`
    - More info in this [gist](https://gist.github.com/nstepien/090298c3c2d94324cb332c33d82fdcfb)
  - `summaryRows` prop [#1773](https://github.com/adazzle/react-data-grid/pull/1773)
  - `sortColumn` and `sortDirection` props
    - ⚠️ The internal sort states have been removed.
    - Check [#1768](https://github.com/adazzle/react-data-grid/pull/1768) on how to migrate.
  - `selectedRows` and `onSelectedRowsChange` props
    - ⚠️ Row selection has been reimplemented.
    - A new `SelectColumn` is now available to import and add a row selection column.
    - Check [#1762](https://github.com/adazzle/react-data-grid/pull/1762) on how to migrate.
- **Removed:**
  - **Packages:**
    - `react-data-grid-examples`
      - Use the website as reference, or clone the repo locally and run `npm install` + `npm start`
  - **Props:**
    - ⚠️ `onCellsDragged`
    - ⚠️ `onDragHandleDoubleClick`
    - ⚠️ `onRows`
    - ⚠️ `onRowUpdated`
    - ⚠️ `rowScrollTimeout`
    - ⚠️ `toolbar`
      - Check [#1769](https://github.com/adazzle/react-data-grid/pull/1769) on how to migrate
    - ⚠️ `isScrolling` (from `column.formatter` props)
  - ⚠️ `ContainerEditorWrapper`
  - ⚠️ `EditorBase`
  - ⚠️ `setScrollLeft` from `Row` and `Cell` renderers
    - `setScrollLeft` instance method was previously required on custom Cell and Row renderers and it can be safely removed now.
    - More info in [#1793](https://github.com/adazzle/react-data-grid/pull/1793)
  - ⚠️ Dropped ImmutableJS support.
  - ⚠️ Dropped dynamic height row support.
    - This was not officially supported, but it was still possible to implement dynamic rows via custom Row renderer. This was a buggy feature so it has been removed.
  - ⚠️ Removed row reordering support.
- **Renamed:**
  - `ReactDataGrid` to `DataGrid`
- **Changed:**
  - ⚠️ The stylesheets are now bundled separately:
    - `react-data-grid/dist/react-data-grid.css`
  - ⚠️ Reimplemented stylesheets, renamed various class names [#1780](https://github.com/adazzle/react-data-grid/pull/1780)
    - No longer depends on bootstrap
  - Resizing a column now immediately resizes all its cells instead of just its header.
  - Improved performance across the board.

### react-data-grid-addons

- ⚠️ `react-data-grid-addons` has no default export anymore
  - Use `import * as DataGridAddons from 'react-data-grid-addons';` instead
- ⚠️ The stylesheets are now bundled separately:
  - `react-data-grid-addons/dist/react-data-grid-addons.css`
- **Removed:**
  - ⚠️ `AutoComplete` editor
  - ⚠️ `Utils`


## 5.0.5 (Dec 6, 2018)
- **Bugfix:** fix: draggable resizing col jumps to right ([1421](https://github.com/adazzle/react-data-grid/pull/1421))
- **Bugfix:** Cell Tooltip - Focus Issues ([1422](https://github.com/adazzle/react-data-grid/pull/1422))

## 6.0.1 (Nov 30, 2018)
- **Bugfix:** Fix formatter exports ([1409](https://github.com/adazzle/react-data-grid/pull/1409))

## 6.0.0 (Nov 30, 2018)
- **Bugfix:** Fix outside click logic for committing changes ([1404](https://github.com/adazzle/react-data-grid/pull/1404))
- **TechDebt** Add ESLint Rules ([1396](https://github.com/adazzle/react-data-grid/pull/1396) [1397](https://github.com/adazzle/react-data-grid/pull/1397) [1396](https://github.com/adazzle/react-data-grid/pull/1398) [1399](https://github.com/adazzle/react-data-grid/pull/1399))
- **TechDebt:** Upgrade build tools to latest versions ([1350](https://github.com/adazzle/react-data-grid/pull/1350))
- **Feature:** Cleanup zIndex logic ([1393](https://github.com/adazzle/react-data-grid/pull/1393))
- **Breaking** Use react portals for cell editors ([1369](https://github.com/adazzle/react-data-grid/pull/1369))
- **TechDebt:** Upgrade build tools to latest versions ([1350](https://github.com/adazzle/react-data-grid/pull/1350))

## 5.0.4 (Nov 14, 2018)
- **Bugfix:** Custom Formatters Example - Styling Fix ([1364](https://github.com/adazzle/react-data-grid/pull/1364))
- **Bugfix:** Fix website publishing and remove ImmutableJS dependency ([1366](https://github.com/adazzle/react-data-grid/pull/1366))
- **Bugfix:** Remove react-data-grid dependency from the addons package ([1354](https://github.com/adazzle/react-data-grid/pull/1354))
- **Bugfix:** Fix drag fill in IE 11 ([1359](https://github.com/adazzle/react-data-grid/pull/1359))
- **Bugfix:** Ensure webpack uses correct common js external ref ([1370](https://github.com/adazzle/react-data-grid/pull/1370))
- **Feature:** Move DropTargetRowContainer static styles to CSS class for user customization ([1308](https://github.com/adazzle/react-data-grid/pull/1308))
- **Bugfix:** Replace use of i for column index which is no longer passed in ([1344](https://github.com/adazzle/react-data-grid/pull/1344))
- **Bugfix:** Remove utils from documentation as an exported module ([1374](https://github.com/adazzle/react-data-grid/pull/1374))
- **TechDebt:** Upgrade eslint packages ([1376](https://github.com/adazzle/react-data-grid/pull/1376))
- **Bugfix:** Cleanup DraggableContainer and fix styles ([1379](https://github.com/adazzle/react-data-grid/pull/1379))

## 5.0.3 (Nov 1, 2018)
- **Bugfix:** Fix frozen-columns source url ([1355](https://github.com/adazzle/react-data-grid/pull/1355))
- **TechDebt:** Defining the ref callback as a bound method ([1353](https://github.com/adazzle/react-data-grid/pull/1353))
- **Bugfix:** Fix cell focusing logic ([1352](https://github.com/adazzle/react-data-grid/pull/1352))
- **Bugfix:** RDG Tree Cell Expand Styling Issues ([1316](https://github.com/adazzle/react-data-grid/pull/1316))

## 5.0.2 (Oct 30, 2018)
- **Bugfix:** Fix grouping example ([1311](https://github.com/adazzle/react-data-grid/pull/1311))
- **Bugfix:** Remove contain layout css ([1346](https://github.com/adazzle/react-data-grid/pull/1346))
- **Bugfix:** Preserve window scroll position on cell selection ([1349](https://github.com/adazzle/react-data-grid/pull/1346))

## 5.0.1 (Oct 22, 2018)

### React-Data-Grid
- **Bugfix:** Fix CopyMask columns ([1289](https://github.com/adazzle/react-data-grid/pull/1272))


## 5.0.0 (Oct 22, 2018)

### React-Data-Grid
- **Feature:** Improve Cell navigation Performance ([1123](https://github.com/adazzle/react-data-grid/pull/1123))
- **Feature:** Scrolling improvements ([1254](https://github.com/adazzle/react-data-grid/pull/1254))
- **Feature:** Remove react-data-grid dependency from react-data-grid-addons bundle  ([1272](https://github.com/adazzle/react-data-grid/pull/1272))



## 4.0.8 (May 10, 2018)

### React-Data-Grid
- **Bugfix:** Fix editor refs ([#1183](https://github.com/adazzle/react-data-grid/pull/1183))

## 4.0.7 (April 19, 2018)

### React-Data-Grid
- **Feature:** Support `React v16` ([#1116](https://github.com/adazzle/react-data-grid/pull/1116))
- **Feature:** Set sort column and direction with props ([#649](https://github.com/adazzle/react-data-grid/pull/649))
- **Bugfix:** Filtering should ignore null values ([#1147](https://github.com/adazzle/react-data-grid/pull/1147))
- **Bugfix:** Resize column doesnt work on firefox when also draggable ([#1121](https://github.com/adazzle/react-data-grid/pull/1121))

### React-Data-Grid-Addons
- **Breaking:** Migrate to `react-context-menu 2.9.2` ([#1081](https://github.com/adazzle/react-data-grid/pull/1081))
