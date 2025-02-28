# react-data-grid

[![npm-badge]][npm-url]
[![type-badge]][npm-url]
[![size-badge]][size-url]
[![codecov-badge]][codecov-url]
[![ci-badge]][ci-url]

[npm-badge]: https://img.shields.io/npm/v/react-data-grid
[npm-url]: https://www.npmjs.com/package/react-data-grid
[size-badge]: https://img.shields.io/bundlephobia/minzip/react-data-grid
[size-url]: https://bundlephobia.com/package/react-data-grid
[type-badge]: https://img.shields.io/npm/types/react-data-grid
[codecov-badge]: https://codecov.io/gh/adazzle/react-data-grid/branch/main/graph/badge.svg?token=cvrRSWiz0Q
[codecov-url]: https://app.codecov.io/gh/adazzle/react-data-grid/branch/main
[ci-badge]: https://github.com/adazzle/react-data-grid/workflows/CI/badge.svg
[ci-url]: https://github.com/adazzle/react-data-grid/actions

## Features

- [React 19.0+](package.json) support
- [Evergreen browsers and server-side rendering](browserslist) support
- Tree-shaking support and only [one npm dependency](package.json) to keep your bundles slim
- Great performance thanks to virtualization: columns and rows outside the viewport are not rendered
- Strictly typed with TypeScript
- [Keyboard accessibility](<(https://adazzle.github.io/react-data-grid/#/CommonFeatures)>)
- Light and dark mode support out of the box. The light or dark themes can be enforced using the `rdg-light` or `rdg-dark` classes.
- [Frozen columns](https://adazzle.github.io/react-data-grid/#/CommonFeatures)
- [Column resizing](https://adazzle.github.io/react-data-grid/#/CommonFeatures)
- [Multi-column sorting](https://adazzle.github.io/react-data-grid/#/CommonFeatures)
  - Click on a sortable column header to toggle between its ascending/descending sort order
  - Ctrl+Click / Meta+Click to sort an additional column
- [Column spanning](https://adazzle.github.io/react-data-grid/#/ColumnSpanning)
- [Column grouping](https://adazzle.github.io/react-data-grid/#/ColumnGrouping)
- [Row selection](https://adazzle.github.io/react-data-grid/#/CommonFeatures)
- [Row grouping](https://adazzle.github.io/react-data-grid/#/RowGrouping)
- [Summary rows](https://adazzle.github.io/react-data-grid/#/CommonFeatures)
- [Dynamic row heights](https://adazzle.github.io/react-data-grid/#/VariableRowHeight)
- [No rows fallback](https://adazzle.github.io/react-data-grid/#/NoRows)
- [Cell formatting](https://adazzle.github.io/react-data-grid/#/CommonFeatures)
- [Cell editing](https://adazzle.github.io/react-data-grid/#/CommonFeatures)
- [Cell copy / pasting](https://adazzle.github.io/react-data-grid/#/AllFeatures)
- [Cell value dragging / filling](https://adazzle.github.io/react-data-grid/#/AllFeatures)
- [Customizable Renderers](https://adazzle.github.io/react-data-grid/#/CustomizableRenderers)
- Right-to-left (RTL) support. We recommend using Firefox as Chrome has a [bug](https://issues.chromium.org/issues/40653832) with frozen columns.

## Links

- [Examples website](https://adazzle.github.io/react-data-grid/)
  - [Source code](website)
- [Changelog](CHANGELOG.md)
- [Contributing](CONTRIBUTING.md)

## Install

```sh
npm install react-data-grid
```

`react-data-grid` is published as ECMAScript modules for evergreen browsers, bundlers, and server-side rendering.

## Quick start

```jsx
import 'react-data-grid/lib/styles.css';

import { DataGrid } from 'react-data-grid';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' }
];

const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' }
];

function App() {
  return <DataGrid columns={columns} rows={rows} />;
}
```

## API

### Components

#### `<DataGrid />`

##### DataGridProps

###### `columns: readonly Column<R, SR>[]`

See [`Column`](#column).

An array describing the grid's columns.

:warning: Passing a new `columns` array will trigger a re-render for the whole grid, avoid changing it as much as possible for optimal performance.

###### `rows: readonly R[]`

An array of rows, the rows data can be of any type.

###### `topSummaryRows?: Maybe<readonly SR[]>`

An optional array of summary rows, usually used to display total values for example. `topSummaryRows` are pinned at the top of the rows view and the vertical scroll bar will not scroll these rows.

###### `bottomSummaryRows?: Maybe<readonly SR[]>`

An optional array of summary rows, usually used to display total values for example. `bottomSummaryRows` are pinned at the bottom of the rows view and the vertical scroll bar will not scroll these rows.

###### `rowKeyGetter?: Maybe<(row: R) => K>`

A function returning a unique key/identifier per row. `rowKeyGetter` is required for row selection to work.

```tsx
import { DataGrid } from 'react-data-grid';

interface Row {
  id: number;
  name: string;
}

function rowKeyGetter(row: Row) {
  return row.id;
}

function MyGrid() {
  return <DataGrid columns={columns} rows={rows} rowKeyGetter={rowKeyGetter} />;
}
```

:bulb: While optional, setting this prop is recommended for optimal performance as the returned value is used to set the `key` prop on the row elements.

###### `onRowsChange?: Maybe<(rows: R[], data: RowsChangeData<R, SR>) => void>`

A function receiving row updates.
The first parameter is a new rows array with both the updated rows and the other untouched rows.
The second parameter is an object with an `indexes` array highlighting which rows have changed by their index, and the `column` where the change happened.

```tsx
import { useState } from 'react';
import { DataGrid } from 'react-data-grid';

function MyGrid() {
  const [rows, setRows] = useState(initialRows);

  return <DataGrid columns={columns} rows={rows} onRowsChange={setRows} />;
}
```

###### `rowHeight?: Maybe<number | ((row: R) => number)>`

**Default:** `35` pixels

Either a number defining the height of row in pixels, or a function returning dynamic row heights.

###### `headerRowHeight?: Maybe<number>`

**Default:** `35` pixels

A number defining the height of the header row.

###### `summaryRowHeight?: Maybe<number>`

**Default:** `35` pixels

A number defining the height of summary rows.

###### `selectedRows?: Maybe<ReadonlySet<K>>`

A set of selected row keys. `rowKeyGetter` is required for row selection to work.

###### `isRowSelectionDisabled?: Maybe<(row: NoInfer<R>) => boolean>`

A function used to disable row selection on certain rows.

###### `onSelectedRowsChange?: Maybe<(selectedRows: Set<K>) => void>`

A function called when row selection is changed.

```tsx
import { useState } from 'react';
import { DataGrid, SelectColumn } from 'react-data-grid';

const rows: readonly Rows[] = [...];

const columns: readonly Column<Row>[] = [
  SelectColumn,
  // other columns
];

function MyGrid() {
  const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());

  return (
    <DataGrid
      rowKeyGetter={rowKeyGetter}
      columns={columns}
      rows={rows}
      selectedRows={selectedRows}
      isRowSelectionDisabled={isRowSelectionDisabled}
      onSelectedRowsChange={setSelectedRows}
    />
  );
}

function rowKeyGetter(row: Row) {
  return row.id;
}

function isRowSelectionDisabled(row: Row) {
  return !row.isActive;
}
```

###### `sortColumns?: Maybe<readonly SortColumn[]>`

An array of sorted columns.

###### `onSortColumnsChange?: Maybe<(sortColumns: SortColumn[]) => void>`

A function called when sorting is changed

```tsx
import { useState } from 'react';
import { DataGrid, SelectColumn } from 'react-data-grid';

const rows: readonly Rows[] = [...];

const columns: readonly Column<Row>[] = [
  {
    key: 'name',
    name: 'Name',
    sortable: true
  },
  // other columns
];

function MyGrid() {
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      sortColumns={sortColumns}
      onSortColumnsChange={setSortColumns}
    />
  );
}
```

Grid can be sorted on multiple columns using `ctrl (command) + click`. To disable multiple column sorting, change the `onSortColumnsChange` function to

```tsx
onSortColumnsChange(sortColumns: SortColumn[]) {
  setSortColumns(sortColumns.slice(-1));
}
```

###### `defaultColumnOptions?: Maybe<DefaultColumnOptions<R, SR>>`

Column options that are applied to all the columns

```tsx
function MyGrid() {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      defaultColumnOptions={{
        minWidth: 100,
        resizable: true,
        sortable: true,
        draggable: true
      }}
    />
  );
}
```

###### `onFill?: Maybe<(event: FillEvent<R>) => R>`

###### `onCopy?: Maybe<(event: CopyEvent<R>) => void>`

###### `onPaste?: Maybe<(event: PasteEvent<R>) => R>`

###### `onCellClick?: Maybe<(args: CellClickArgs<R, SR>, event: CellMouseEvent) => void>`

Triggered when a cell is clicked. The default behavior is to select the cell. Call `preventGridDefault` to prevent the default behavior

```tsx
function onCellClick(args: CellClickArgs<R, SR>, event: CellMouseEvent) {
  if (args.column.key === 'id') {
    event.preventGridDefault();
  }
}

<DataGrid rows={rows} columns={columns} onCellClick={onCellClick} />;
```

This event can be used to open cell editor on single click

```tsx
function onCellClick(args: CellClickArgs<R, SR>, event: CellMouseEvent) {
  if (args.column.key === 'id') {
    event.preventGridDefault();
    args.selectCell(true);
  }
}
```

Arguments:

`args: CellClickArgs<R, SR>`

- `args.rowIdx`: `number` - row index of the currently selected cell
- `args.row`: `R` - row object of the currently selected cell
- `args.column`: `CalculatedColumn<TRow, TSummaryRow>` - column object of the currently selected cell
- `args.selectCell`: `(enableEditor?: boolean) => void` - function to manually select the cell and optionally pass `true` to start editing

`event` extends `React.MouseEvent<HTMLDivElement>`

- `event.preventGridDefault:`: `() => void`
- `event.isGridDefaultPrevented`: `boolean`

###### `onCellDoubleClick?: Maybe<(args: CellClickArgs<R, SR>, event: CellMouseEvent) => void>`

Triggered when a cell is double clicked. The default behavior is to open the editor if the cell is editable. Call `preventGridDefault` to prevent the default behavior

```tsx
function onCellDoubleClick(args: CellClickArgs<R, SR>, event: CellMouseEvent) {
  if (args.column.key === 'id') {
    event.preventGridDefault();
  }
}

<DataGrid rows={rows} columns={columns} onCellDoubleClick={onCellDoubleClick} />;
```

###### `onCellContextMenu?: Maybe<(args: CellClickArgs<R, SR>, event: CellMouseEvent) => void>`

Triggered when a cell is right clicked. The default behavior is to select the cell. Call `preventGridDefault` to prevent the default behavior

```tsx
function onCellContextMenu(args: CellClickArgs<R, SR>, event: CellMouseEvent) {
  if (args.column.key === 'id') {
    event.preventGridDefault();
  }
}

<DataGrid rows={rows} columns={columns} onCellContextMenu={onCellContextMenu} />;
```

###### `onCellKeyDown?: Maybe<(args: CellKeyDownArgs<R, SR>, event: CellKeyboardEvent) => void>`

A function called when keydown event is triggered on a cell. This event can be used to customize cell navigation and editing behavior.

**Examples**

- Prevent editing on `Enter`

```tsx
function onCellKeyDown(args: CellKeyDownArgs<R, SR>, event: CellKeyboardEvent) {
  if (args.mode === 'SELECT' && event.key === 'Enter') {
    event.preventGridDefault();
  }
}
```

- Prevent navigation on `Tab`

```tsx
function onCellKeyDown(args: CellKeyDownArgs<R, SR>, event: CellKeyboardEvent) {
  if (args.mode === 'SELECT' && event.key === 'Tab') {
    event.preventGridDefault();
  }
}
```

Check [more examples](website/routes/CellNavigation.lazy.tsx)

###### `onSelectedCellChange?: Maybe<(args: CellSelectArgs<R, SR>) => void>;`

Triggered when the selected cell is changed.

Arguments:

- `args.rowIdx`: `number` - row index
- `args.row`: `R` - row object of the currently selected cell
- `args.column`: `CalculatedColumn<TRow, TSummaryRow>` - column object of the currently selected cell

###### `onScroll?: Maybe<(event: React.UIEvent<HTMLDivElement>) => void>`

A function called when the grid is scrolled.

###### `onColumnResize?: Maybe<(column: CalculatedColumn<R, SR>, width: number) => void>`

A function called when column is resized.

###### `enableVirtualization?: Maybe<boolean>`

**Default:** `true`

This prop can be used to disable virtualization.

###### `renderers?: Maybe<Renderers<R, SR>>`

This prop can be used to override the internal renderers. The prop accepts an object of type

```tsx
interface Renderers<TRow, TSummaryRow> {
  renderCell?: Maybe<(key: Key, props: CellRendererProps<TRow, TSummaryRow>) => ReactNode>;
  renderCheckbox?: Maybe<(props: RenderCheckboxProps) => ReactNode>;
  renderRow?: Maybe<(key: Key, props: RenderRowProps<TRow, TSummaryRow>) => ReactNode>;
  renderSortStatus?: Maybe<(props: RenderSortStatusProps) => ReactNode>;
  noRowsFallback?: Maybe<ReactNode>;
}
```

For example, the default `<Row />` component can be wrapped via the `renderRow` prop to add contexts or tweak props

```tsx
import { DataGrid, RenderRowProps, Row } from 'react-data-grid';

function myRowRenderer(key: React.Key, props: RenderRowProps<Row>) {
  return (
    <MyContext key={key} value={123}>
      <Row {...props} />
    </MyContext>
  );
}

function MyGrid() {
  return <DataGrid columns={columns} rows={rows} renderers={{ renderRow: myRowRenderer }} />;
}
```

:warning: To prevent all rows from being unmounted on re-renders, make sure to pass a static or memoized component to `renderRow`.

###### `rowClass?: Maybe<(row: R, rowIdx: number) => Maybe<string>>`

A function to add a class on the row

```tsx
import { DataGrid } from 'react-data-grid';

function MyGrid() {
  return <DataGrid columns={columns} rows={rows} rowClass={rowClass} />;
}

function rowClass(row: Row, rowIdx: number) {
  return rowIdx % 2 === 0 ? 'even' : 'odd';
}
```

###### `direction?: Maybe<'ltr' | 'rtl'>`

This property sets the text direction of the grid, it defaults to `'ltr'` (left-to-right). Setting `direction` to `'rtl'` has the following effects:

- Columns flow from right to left
- Frozen columns are pinned on the right
- Column resize handle is shown on the left edge of the column
- Scrollbar is moved to the left

###### `className?: string | undefined`

custom classname

###### `style?: CSSProperties | undefined`

custom styles

###### `'aria-label'?: string | undefined`

The label of the grid. We recommend providing a label using `aria-label` or `aria-labelledby`

###### `'aria-labelledby'?: string | undefined`

The id of the element containing a label for the grid. We recommend providing a label using `aria-label` or `aria-labelledby`

###### `'aria-description'?: string | undefined`

###### `'aria-describedby'?: string | undefined`

If the grid has a caption or description, `aria-describedby` can be set on the grid element with a value referring to the element containing the description.

###### `'data-testid'?: Maybe<string>`

This prop can be used to add a testid for testing. We recommend using `role` and `name` to find the grid element

```tsx
function MyGrid() {
  return <DataGrid aria-label="my-grid" columns={columns} rows={rows} />;
}

function MyGridTest() {
  const grid = screen.getByRole('grid', { name: 'my-grid' });
}
```

#### `<TreeDataGrid />`

`TreeDataGrid` is component built on top of `DataGrid` to add row grouping. This implements the [Treegrid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/). At the moment `TreeDataGrid` does not support `onFill` and `isRowSelectionDisabled` props

##### TreeDataGridProps

###### `groupBy?: Maybe<readonly string[]>`

###### `rowGrouper?: Maybe<(rows: readonly R[], columnKey: string) => Record<string, readonly R[]>>`

###### `expandedGroupIds?: Maybe<ReadonlySet<unknown>>`

###### `onExpandedGroupIdsChange?: Maybe<(expandedGroupIds: Set<unknown>) => void>`

#### `<TextEditor />`

##### Props

See [`RenderEditCellProps`](#rendereditcellprops)

#### `<Row />`

See [`renderers`](#renderers-mayberenderersr-sr)

##### Props

See [`RenderRowProps`](#renderrowprops)

The `ref` prop is supported.

#### `<SortableHeaderCell />`

##### Props

###### `onSort: (ctrlClick: boolean) => void`

###### `sortDirection: SortDirection | undefined`

###### `priority: number | undefined`

###### `tabIndex: number`

###### `children: React.ReactNode`

#### `<ValueFormatter />`

##### Props

See [`FormatterProps`](#formatterprops)

#### `<SelectCellFormatter />`

##### Props

###### `value: boolean`

###### `tabIndex: number`

###### `disabled?: boolean | undefined`

###### `onChange: (value: boolean, isShiftClick: boolean) => void`

###### `onClick?: MouseEventHandler<T> | undefined`

###### `'aria-label'?: string | undefined`

###### `'aria-labelledby'?: string | undefined`

#### `<ToggleGroupFormatter />`

##### Props

See [`RenderGroupCellProps`](#rendergroupcellprops)

### Hooks

#### `useHeaderRowSelection<R>(): { isIndeterminate, isRowSelected, onRowSelectionChange }`

#### `useRowSelection<R>(): { isRowSelectionDisabled, isRowSelected, onRowSelectionChange }`

### Other

#### `SelectColumn: Column<any, any>`

#### `SELECT_COLUMN_KEY = 'rdg-select-column'`

### Types

#### `Column`

##### `name: string | ReactElement`

The name of the column. By default it will be displayed in the header cell

##### `key: string`

A unique key to distinguish each column

##### `width?: Maybe<number | string>`

**Default** `auto`

Width can be any valid css grid column value. If not specified, it will be determined automatically based on grid width and specified widths of other columns.

```tsx
width: 80; // pixels
width: '25%';
width: 'max-content';
width: 'minmax(100px, max-content)';
```

`max-content` can be used to expand the column to show all the content. Note that the grid is only able to calculate column width for visible rows.

##### `minWidth?: Maybe<number>`

**Default**: `50` pixels

Sets the maximum width of a column.

##### `maxWidth?: Maybe<number>`

Sets the maximum width of a column.

##### `cellClass?: Maybe<string | ((row: TRow) => Maybe<string>)>`

A function to add a class on the row

##### `headerCellClass?: Maybe<string>`

##### `summaryCellClass?: Maybe<string | ((row: TSummaryRow) => Maybe<string>)>`

##### `renderCell?: Maybe<(props: RenderCellProps<TRow, TSummaryRow>) => ReactNode>`

Render function used to render the content of cells

##### `renderHeaderCell`

Render function used to render the content of header cells

##### `renderSummaryCell`

Render function used to render the content of summary cells

#### `DataGridHandle`

#### `RenderEditCellProps`

#### `RenderCellProps`

#### `RenderGroupCellProps`

#### `RenderRowProps`

### Generics

- `R`, `TRow`: Row type
- `SR`, `TSummaryRow`: Summary row type
- `K`: Row key type
