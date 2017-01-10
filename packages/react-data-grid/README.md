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

## Extras
Asside from the grid this package exports:

name                   | source                           |
-----------------------|----------------------------------|
RowComparer            | [RowComparer](./RowComparer)     |
RowsContainer          | [RowsContainer](./RowsContainer) |
Row                    | [Row](./Row)                     |
Cell                   | [Cell](./Cell)                   |
HeaderCell             | [HeaderCell](./HeaderCell)       |
editors                | [Editors](./editors)             |
utils                  | [utils](./utils)                 |
shapes                 | [shapes](./PropTypeShapes)       |
_constants             | [_constants](./AppConstants)     |
_helpers               | [_helpers](./helpers)            |
