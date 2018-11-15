# react-data-grid

> The core of react-data-grid


## Install

```sh
npm install --save react-data-grid
```

## Usage

```sh
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
Asside from the grid this package exports:

name                   | source                                  |
-----------------------|-----------------------------------------|
RowComparer            | [RowComparer](./src/RowComparer.js)     |
RowsContainer          | [RowsContainer](./src/RowsContainer.js) |
Row                    | [Row](./src/Row.js)                     |
Cell                   | [Cell](./src/Cell.js)                   |
HeaderCell             | [HeaderCell](./src/HeaderCell.js)       |
editors                | [Editors](./src/editors)                |
formatters             | [Formatters](./src/formatters)          |
shapes                 | [shapes](./src/PropTypeShapes)          |
_constants             | [_constants](./src/AppConstants.js)     |
_helpers               | [_helpers](./src/helpers)               |
