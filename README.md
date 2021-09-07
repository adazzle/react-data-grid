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

## Documentation

- [Website](https://adazzle.github.io/react-data-grid/canary/)
  - [Source code](stories)
- [Old website for react-data-grid v5](https://adazzle.github.io/react-data-grid/)
- [Changelog](CHANGELOG.md)
- [Contributing](CONTRIBUTING.md)

## API

### Components

#### `<DataGrid />`

#### `<TextEditor />`

#### `<Row />`

#### `<SortableHeaderCell />`

#### `<ValueFormatter />`

#### `<SelectCellFormatter />`

#### `<ToggleGroupFormatter />`

### Hooks

#### `useRowSelection()`

### Other

#### `SelectColumn`

#### `SELECT_COLUMN_KEY`

### Types

#### `Column`
