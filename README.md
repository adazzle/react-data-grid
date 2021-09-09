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

- [React 16.14+ & 17.0+](package.json) support
- [Evergreen browsers and server-side rendering](browserslist) support
- Tree-shaking support and only [one npm dependency](package.json) to keep your bundles slim
- Great performance thanks to virtualization: columns and rows outside the viewport are not rendered
- Strictly typed with TypeScript
- [Keyboard accessibility](<(https://adazzle.github.io/react-data-grid/canary/?path=/story/demos--common-features)>)
- Light and dark mode support out of the box. The light or dark themes can be enforced using the `rdg-light` or `rdg-dark` classes.
- [Frozen columns](https://adazzle.github.io/react-data-grid/canary/?path=/story/demos--common-features)
- [Column resizing](https://adazzle.github.io/react-data-grid/canary/?path=/story/demos--common-features)
- [Multi-column sorting](https://adazzle.github.io/react-data-grid/canary/?path=/story/demos--common-features)
  - Click on a sortable column header to toggle between its ascending/descending sort order
  - Ctrl+Click / Meta+Click to sort an additional column
- [Column spanning](https://adazzle.github.io/react-data-grid/canary/?path=/story/demos--column-spanning)
- [Row selection](https://adazzle.github.io/react-data-grid/canary/?path=/story/demos--common-features)
- [Row grouping](https://adazzle.github.io/react-data-grid/canary/?path=/story/demos--grouping)
- [Summary rows](https://adazzle.github.io/react-data-grid/canary/?path=/story/demos--common-features)
- [Dynamic row heights](https://adazzle.github.io/react-data-grid/canary/?path=/story/demos--variable-row-height)
- [No rows fallback](https://adazzle.github.io/react-data-grid/canary/?path=/story/demos--no-rows)
- [Cell formatting](https://adazzle.github.io/react-data-grid/canary/?path=/story/demos--common-features)
- [Cell editing](https://adazzle.github.io/react-data-grid/canary/?path=/story/demos--common-features)
- [Cell copy / pasting](https://adazzle.github.io/react-data-grid/canary/?path=/story/demos--all-features)
- [Cell value dragging / filling](https://adazzle.github.io/react-data-grid/canary/?path=/story/demos--all-features)

## Links

- [Website](https://adazzle.github.io/react-data-grid/canary/)
  - [Source code](stories)
- [Old website for react-data-grid v5](https://adazzle.github.io/react-data-grid/)
- [Changelog](CHANGELOG.md)
- [Contributing](CONTRIBUTING.md)

## Install

```sh
npm install react-data-grid
```

react-data-grid is published as ES2020 modules, you'll probably want to transpile those down to scripts for the browsers you target using [Babel](https://babeljs.io/) and [browserslist](https://github.com/browserslist/browserslist/blob/main/README.md).

<details>
<summary>Example browserslist configuration file</summary>

```
last 2 chrome versions
last 2 edge versions
last 2 firefox versions
last 2 safari versions
```

See [documentation](https://github.com/browserslist/browserslist/blob/main/README.md)

</details>

<details>
<summary>Example babel.config.json file</summary>

```json
{
  "presets": [
    [
      "@babel/env",
      {
        "bugfixes": true,
        "shippedProposals": true,
        "corejs": 3,
        "useBuiltIns": "entry"
      }
    ]
  ]
}
```

See [documentation](https://babeljs.io/docs/en/)

- It's important that the configuration filename be `babel.config.*` instead of `.babelrc.*`, otherwise Babel might not transpile modules under `node_modules`.
- Polyfilling the [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) API is required for older browsers.
</details>

<details>
<summary>Webpack configuration with babel-loader</summary>

```js
{
  // ...
  module: {
    rules: {
      test: /\.js$/,
      exclude: /node_modules[/\\](?!react-data-grid[/\\]lib)/,
      use: 'babel-loader'
    }
  }
}
```

See [documentation](https://github.com/babel/babel-loader/blob/main/README.md)

</details>

<details>
<summary>rollup.js configuration with @rollup/plugin-babel</summary>

```js
{
  // ...
  plugins: {
    babel({
      include: ['./src/**/*', './node_modules/react-data-grid/lib/**/*']
    });
  }
}
```

See [documentation](https://github.com/rollup/plugins/blob/master/packages/babel/README.md)

</details>

## Usage

```jsx
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

###### `rows: readonly R[]`

###### `summaryRows?: Maybe<readonly SR[]>`

###### `rowKeyGetter?: Maybe<(row: R) => K>`

###### `onRowsChange?: Maybe<(rows: R[], data: RowsChangeData<R, SR>) => void>`

###### `rowHeight?: Maybe<number | ((args: RowHeightArgs<R>) => number)>`

###### `headerRowHeight?: Maybe<number>`

###### `summaryRowHeight?: Maybe<number>`

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

###### `onPaste?: Maybe<(event: PasteEvent<R>) => R>`

###### `onRowClick?: Maybe<(row: R, column: CalculatedColumn<R, SR>) => void>`

###### `onRowDoubleClick?: Maybe<(row: R, column: CalculatedColumn<R, SR>) => void>`

###### `onScroll?: Maybe<(event: React.UIEvent<HTMLDivElement>) => void>`

###### `onColumnResize?: Maybe<(idx: number, width: number) => void>`

###### `onSelectedCellChange?: Maybe<(position: Position) => void>`

###### `cellNavigationMode?: Maybe<CellNavigationMode>`

###### `enableVirtualization?: Maybe<boolean>`

###### `rowRenderer?: Maybe<React.ComponentType<RowRendererProps<R, SR>>>`

###### `noRowsFallback?: React.ReactNode`

###### `editorPortalTarget?: Maybe<Element>`

###### `rowClass?: Maybe<(row: R) => Maybe<string>>`

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

See [`RowRendererProps`](#rowrendererprops).
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
