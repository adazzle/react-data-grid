# react-data-grid [![npm-badge]][npm-url] [![bundlesize-badge]][bundlesize-url] [![codecov-badge]][codecov-url]

[npm-badge]: https://img.shields.io/npm/v/react-data-grid/next.svg
[npm-url]: https://www.npmjs.com/package/react-data-grid
[bundlesize-badge]: https://img.shields.io/bundlephobia/minzip/react-data-grid/next.svg
[bundlesize-url]: https://bundlephobia.com/result?p=react-data-grid@next
[codecov-badge]: https://img.shields.io/codecov/c/github/adazzle/react-data-grid/next.svg
[codecov-url]: https://codecov.io/gh/adazzle/react-data-grid

## Install

```sh
npm install react-data-grid
```

## Usage

```jsx
import ReactDataGrid from 'react-data-grid';

const columns = [{ key: 'id', name: 'ID' }, { key: 'title', name: 'Title' }];
const rows = [{ id: 1, title: 'Title 1' }, ...];
const rowGetter = rowNumber => rows[rowNumber];

const Grid = () => {
  return <ReactDataGrid
    columns={columns}
    rowGetter={rowGetter}
    rowsCount={rows.length}
    minHeight={500} />);
}
```

## Exports
Aside from the grid this package exports:

name                   | source                                  |
-----------------------|-----------------------------------------|
RowComparer            | [RowComparer](./src/RowComparer.js)     |
RowsContainer          | [RowsContainer](./src/RowsContainer.js) |
Row                    | [Row](./src/Row.js)                     |
Cell                   | [Cell](./src/Cell.js)                   |
HeaderCell             | [HeaderCell](./src/HeaderCell.js)       |
shapes                 | [shapes](./src/PropTypeShapes)          |
_helpers               | [_helpers](./src/helpers)               |
