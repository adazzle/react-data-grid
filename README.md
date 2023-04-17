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

- [React 18.0+](package.json) support
- [Evergreen browsers and server-side rendering](browserslist) support
- Tree-shaking support and only [one npm dependency](package.json) to keep your bundles slim
- Great performance thanks to virtualization: columns and rows outside the viewport are not rendered
- Strictly typed with TypeScript
- [Keyboard accessibility](<(https://adazzle.github.io/react-data-grid/#/common-features)>)
- Light and dark mode support out of the box. The light or dark themes can be enforced using the `rdg-light` or `rdg-dark` classes.
- [Frozen columns](https://adazzle.github.io/react-data-grid/#/common-features)
- [Column resizing](https://adazzle.github.io/react-data-grid/#/common-features)
- [Multi-column sorting](https://adazzle.github.io/react-data-grid/#/common-features)
  - Click on a sortable column header to toggle between its ascending/descending sort order
  - Ctrl+Click / Meta+Click to sort an additional column
- [Column spanning](https://adazzle.github.io/react-data-grid/#/column-spanning)
- [Row selection](https://adazzle.github.io/react-data-grid/#/common-features)
- [Row grouping](https://adazzle.github.io/react-data-grid/#/grouping)
- [Summary rows](https://adazzle.github.io/react-data-grid/#/common-features)
- [Dynamic row heights](https://adazzle.github.io/react-data-grid/#/variable-row-height)
- [No rows fallback](https://adazzle.github.io/react-data-grid/#/no-rows)
- [Cell formatting](https://adazzle.github.io/react-data-grid/#/common-features)
- [Cell editing](https://adazzle.github.io/react-data-grid/#/common-features)
- [Cell copy / pasting](https://adazzle.github.io/react-data-grid/#/all-features)
- [Cell value dragging / filling](https://adazzle.github.io/react-data-grid/#/all-features)
- [Customizable Renderers](https://adazzle.github.io/react-data-grid/#/customizable-renderers)
- Right-to-left (RTL) support. We recommend using Firefox as Chrome has a [bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1140374) with frozen columns, and the [`:dir` pseudo class](https://developer.mozilla.org/en-US/docs/Web/CSS/:dir) is not supported

## Links

- [Examples website](https://adazzle.github.io/react-data-grid/)
  - [Source code](website)
- [Old website for react-data-grid v6](https://adazzle.github.io/react-data-grid/old/)
- [Changelog](CHANGELOG.md)
- [Contributing](CONTRIBUTING.md)

## Install

```sh
npm install react-data-grid
```

`react-data-grid` is published as ECMAScript modules for evergreen browsers / bundlers, and CommonJS for server-side rendering / Jest.

## Quick start

```jsx
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';

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

##### Props

###### `columns: readonly Column<R, SR>[]`

See [`Column`](#column).

An array describing the grid's columns.

:warning: Passing a new `columns` array will trigger a re-render for the whole grid, avoid changing it as much as possible for optimal performance.

###### `rows: readonly R[]`

An array of rows, the rows data can be of any type.

###### `topSummaryRows?: Maybe<readonly SR[]>`

###### `bottomSummaryRows?: Maybe<readonly SR[]>`

An optional array of summary rows, usually used to display total values for example.

###### `rowKeyGetter?: Maybe<(row: R) => K>`

A function returning a unique key/identifier per row. `rowKeyGetter` is required for row selection to work.

```tsx
import DataGrid from 'react-data-grid';

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
import DataGrid from 'react-data-grid';

function MyGrid() {
  const [rows, setRows] = useState(initialRows);

  return <DataGrid columns={columns} rows={rows} onRowsChange={setRows} />;
}
```

###### `rowHeight?: Maybe<number | ((args: RowHeightArgs<R>) => number)>`

**Default:** `35` pixels

Either a number defining the height of row in pixels, or a function returning dynamic row heights.

###### `headerRowHeight?: Maybe<number>`

**Default:** `35` pixels

A number defining the height of the header row.

###### `summaryRowHeight?: Maybe<number>`

**Default:** `35` pixels

A number defining the height of summary rows.

###### `selectedRows?: Maybe<ReadonlySet<K>>`

###### `onSelectedRowsChange?: Maybe<(selectedRows: Set<K>) => void>`

###### `sortColumns?: Maybe<readonly SortColumn[]>`

###### `onSortColumnsChange?: Maybe<(sortColumns: SortColumn[]) => void>`

###### `defaultColumnOptions?: Maybe<DefaultColumnOptions<R, SR>>`

###### `groupBy?: Maybe<readonly string[]>`

###### `rowGrouper?: Maybe<(rows: readonly R[], columnKey: string) => Record<string, readonly R[]>>`

###### `expandedGroupIds?: Maybe<ReadonlySet<unknown>>`

###### `onExpandedGroupIdsChange?: Maybe<(expandedGroupIds: Set<unknown>) => void>`

###### `onFill?: Maybe<(event: FillEvent<R>) => R>`

###### `onCopy?: Maybe<(event: CopyEvent<R>) => void>`

###### `onPaste?: Maybe<(event: PasteEvent<R>) => R>`

###### `onCellClick?: Maybe<(args: CellClickArgs<R, SR>, event: CellMouseEvent) => void>`

###### `onCellDoubleClick?: Maybe<(args: CellClickArgs<R, SR>, event: CellMouseEvent) => void>`

###### `onCellContextMenu?: Maybe<(args: CellClickArgs<R, SR>, event: CellMouseEvent) => void>`

###### `onCellKeyDown?: Maybe<(args: CellKeyDownArgs<R, SR>, event: CellKeyboardEvent) => void>`

###### `onScroll?: Maybe<(event: React.UIEvent<HTMLDivElement>) => void>`

###### `onColumnResize?: Maybe<(idx: number, width: number) => void>`

###### `enableVirtualization?: Maybe<boolean>`

###### `renderers?: Maybe<Renderers<R, SR>>`

This prop can be used to override the internal renderers. The prop accepts an object of type

```tsx
interface Renderers<TRow, TSummaryRow> {
  sortStatus?: Maybe<(props: SortStatusProps) => ReactNode>;
  checkboxFormatter?: Maybe<
    (props: CheckboxFormatterProps, ref: Ref<HTMLInputElement>) => ReactNode
  >;
  rowRenderer?: Maybe<(key: Key, props: RowRendererProps<TRow, TSummaryRow>) => ReactNode>;
  noRowsFallback?: Maybe<ReactNode>;
}
```

For example, the default `<Row />` component can be wrapped via the `rowRenderer` prop to add context providers or tweak props

```tsx
import DataGrid, { Row, RowRendererProps } from 'react-data-grid';

function myRowRenderer(key: React.Key, props: RowRendererProps<Row>) {
  return (
    <MyContext.Provider key={key} value={123}>
      <Row {...props} />
    </MyContext.Provider>
  );
}

function MyGrid() {
  return <DataGrid columns={columns} rows={rows} renderers={{ rowRenderer: myRowRenderer }} />;
}
```

:warning: To prevent all rows from being unmounted on re-renders, make sure to pass a static or memoized component to `rowRenderer`.

###### `rowClass?: Maybe<(row: R) => Maybe<string>>`

##### `direction?: Maybe<'ltr' | 'rtl'>`

This property sets the text direction of the grid, it defaults to `'ltr'` (left-to-right). Setting `direction` to `'rtl'` has the following effects:

- Columns flow from right to left
- Frozen columns are pinned on the right
- Column resize handle is shown on the left edge of the column
- Scrollbar is moved to the left

###### `className?: string | undefined`

###### `style?: CSSProperties | undefined`

###### `'aria-label'?: string | undefined`

###### `'aria-labelledby'?: string | undefined`

###### `'aria-describedby'?: string | undefined`

###### `'data-testid'?: Maybe<string>`

#### `<TextEditor />`

##### Props

See [`EditorProps`](#editorprops)

#### `<Row />`

See [`renderers`](#renderers-mayberenderersr-sr)

##### Props

See [`RowRendererProps`](#rowrendererprops)

The `ref` prop is supported.

#### `<SortableHeaderCell />`

##### Props

###### `onSort: (ctrlClick: boolean) => void`

###### `sortDirection: SortDirection | undefined`

###### `priority: number | undefined`

###### `isCellSelected: boolean`

###### `children: React.ReactNode`

#### `<ValueFormatter />`

##### Props

See [`FormatterProps`](#formatterprops)

#### `<SelectCellFormatter />`

##### Props

###### `value: boolean`

###### `isCellSelected: boolean`

###### `disabled?: boolean | undefined`

###### `onChange: (value: boolean, isShiftClick: boolean) => void`

###### `onClick?: MouseEventHandler<T> | undefined`

###### `'aria-label'?: string | undefined`

###### `'aria-labelledby'?: string | undefined`

#### `<ToggleGroupFormatter />`

##### Props

See [`GroupFormatterProps`](#groupformatterprops)

### Hooks

#### `useRowSelection<R>(): [boolean, (selectRowEvent: SelectRowEvent<R>) => void]`

### Other

#### `SelectColumn: Column<any, any>`

#### `SELECT_COLUMN_KEY = 'select-row'`

### Types

#### `Column`

#### `DataGridHandle`

#### `EditorProps`

#### `FormatterProps`

#### `GroupFormatterProps`

#### `RowRendererProps`

### Generics

- `R`, `TRow`: Row type
- `SR`, `TSummaryRow`: Summary row type
- `K`: Row key type
