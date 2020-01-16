## canary -> pre-canary
- Remove `onCellCopyPaste` prop
- Remove `getValidFilterValues` prop
- Replace `onCellSelected` and `onCellDeSelected` with `onSelectedCellChange` prop
- Replace `cellRangeSelection.onStart/onUpdate/onEnd` props with a single `onCellRangeSelectionChange` prop
- Add `filters` and `onFiltersChange` props
- Add `enableCellCopyPaste` prop to toggle copy/paste
- Add `enableCellDragAndDrop` prop to toggle drag fill
- Remove `fromRowId`, `toRowId`, and `fromRowData` from `onGridRowsUpdated` argument
- Remove `column.getRowMetaData` prop
- Header now only render visible cells [1837](https://github.com/adazzle/react-data-grid/pull/1837)
- Replace `scrollToRowIndex` prop with `scrollToRow` method
- Row and Cell renderers no longer receive `cellMetaData` prop
- Remove `getCellActions` prop. Check [here](https://github.com/adazzle/react-data-grid/pull/1845) on how to migrate
- Remove `react-data-grid-addons` package.
- Remove subrow props (`getSubRowDetails`, `onCellExpand`, `onDeleteSubRow`, and `onAddSubRow`). Check [here](https://github.com/adazzle/react-data-grid/pull/1853) on how to migrate
- Remove `cellContentRenderer`
- `column.editor`, `rowRenderer`, and `headerRenderer` no longer support `ReactElement`
- `column.formatter` no longer receives a `value` prop.
- Remove `column.events` prop
- Replace `rowGetter` and `rowsCount` props with a single `rows` prop
- Rename `minHeight` to `height`
- Rename `minWidth` to `width`
- Rename `RowsContainer` to `rowsContainer`
- Rename `onGridSort` to `onSort`
- Rename `onGridRowsUpdated` to `onRowsUpdate`
- Added function support for `column.cellClass`:
  - `column = { ..., cellClass(row) { return string; } }`
  - `column.cellClass` does not affect header cells anymore

## next -> canary
- Column resize now resizes all the cells which means re-rendering the whole grid when resizing columns.
- Add `column.cellContentRenderer`. This is an opt-in feature, so it should not break anything. More info in [here](https://gist.github.com/nstepien/090298c3c2d94324cb332c33d82fdcfb)
- `ReactDataGrid` component is renamed to `DataGrid`
- Remove `setScrollLeft` from Row and Cell renderers. `setScrollLeft` instance method was previously required on custom Cell and Row renderers and it can be safely removed now. More info in [here](https://github.com/adazzle/react-data-grid/pull/1793)
- Drop ImmutableJS support
- Drop dynamic height row support. This was not an official feature but it was still possible to implement dynamic rows via custom Row renderer. This was a buggy feature so it has been removed.
- Remove `formatter.isScrolling` prop. `isScrolling` prop was introduced to improve performance of expensive formatters. This is no longer required as the internals of the grid were rewritten to improve performance
- Add summary rows [1773](https://github.com/adazzle/react-data-grid/pull/1773)
- Remove row reordering support. This was a buggy feature so it has been removed.
- Remove toolbar prop. Check [here](https://github.com/adazzle/react-data-grid/pull/1769) on how to migrate.
- Remove internal `sortColumn` and `sortDirection` states. Sorting is now only controlled by `sortColumn` and `sortDirection` props. Check [here](https://github.com/adazzle/react-data-grid/pull/1768) on how to migrate.
- Improve scrolling performance
- Improve frozen columns performance
- Re-implement row selection. Previous row selection API has been replaced by the new `selectedRows` and `onSelectedRowsChange` props. A new `SelectColumn` is now available to import and add a row selection column. Check [here](https://github.com/adazzle/react-data-grid/pull/1762) on how to migrate.
- Add `renderBatchSize` prop [1779](https://github.com/adazzle/react-data-grid/pull/1779)
- Remove bootstrap dependency and re-implement grid css [1780](https://github.com/adazzle/react-data-grid/pull/1780)

## master -> alpha

### react-data-grid

- **Breaking**: the stylesheets are now bundled separately:
  - `react-data-grid/dist/react-data-grid.css`
- **Breaking**: removed:
  - `ContainerEditorWrapper`
  - `EditorBase`
  - `onCellsDragged` prop
  - `onDragHandleDoubleClick` prop
  - `onRows` prop
  - `onRowUpdated` prop
  - `rowScrollTimeout` prop
- **Feature**: Added support for `forwardRef`
- **TechDebt**: Dependency updates

### react-data-grid-addons

- **Breaking**: react-data-grid-addons has no default export anymore
  - Use `import * as ReactDataGridAddons from 'react-data-grid-addons';` instead
- **Breaking**: the stylesheets are now bundled separately:
  - `react-data-grid-addons/dist/react-data-grid-addons.css`
- **Breaking**: removed:
  - `AutoComplete` editor
  - `Utils`
- **TechDebt**: Dependency updates

### react-data-grid-examples

- **Breaking**: stopped publishing this package
  - Use the website as reference, or clone the repo locally and run `npm install` + `npm start`


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
