# react-data-grid [![npm-badge]][npm-url] [![ci-badge]][ci-url]

[npm-badge]: https://img.shields.io/npm/v/react-data-grid
[npm-url]: https://www.npmjs.com/package/react-data-grid
[ci-badge]: https://github.com/adazzle/react-data-grid/workflows/CI/badge.svg
[ci-url]: https://github.com/adazzle/react-data-grid/actions?query=workflow%3ACI

## Install

```sh
npm install react-data-grid
```

## Usage

```jsx
import DataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' }
];

const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' }
];

function App() {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
    />
  );
}
```

## Documentation

- [Website](https://adazzle.github.io/react-data-grid/canary/)
  - [Source code](stories)
- [Old website for react-data-grid v5](https://adazzle.github.io/react-data-grid/)
- [Changelog](CHANGELOG.md)
- [Contributing](CONTRIBUTING.md)
